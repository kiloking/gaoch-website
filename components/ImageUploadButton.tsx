import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import imageCompression from "browser-image-compression";
import { generateImageName } from "@/lib/utils";

interface ImageUploadButtonProps {
  onImagesChange: (url: string, imageId?: number) => void;
  inputId: string;
  disabled?: boolean;
  currentImage?: string;
  reset?: boolean;
  completedWord?: string;
  composeSize?: number;
}

export function ImageUploadButton({
  onImagesChange,
  inputId,
  disabled = false,
  currentImage,
  reset = false,
  completedWord,
  composeSize,
}: ImageUploadButtonProps) {
  const [uploadedImage, setUploadedImage] = useState<string>(
    currentImage || ""
  );
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (reset) {
      setUploadedImage("");
      onImagesChange("", undefined);
      setErrorMessage("");
    }
  }, [reset, onImagesChange]);
  const getSignedUrl = api.upload.getSignedUrl.useMutation();
  const createImage = api.upload.createImage.useMutation();

  // 測試網路連線
  const testNetworkConnection = async () => {
    try {
      const response = await fetch("/api/trpc/upload.getSignedUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: "test",
          size: 1024,
        }),
      });
      return response.ok;
    } catch (error) {
      console.error("Network test failed:", error);
      return false;
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1.5, // 最大檔案大小
      maxWidthOrHeight: composeSize ? composeSize : 1920, // 最大寬度或高度
      useWebWorker: false, // 在手機上禁用 Web Worker，避免兼容性問題
      fileType: file.type, // 保持原始檔案類型
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("壓縮失敗:", error);
      throw error;
    }
  };

  // 驗證檔案
  const validateFile = (file: File): string | null => {
    // 檢查檔案類型
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return "只接受 JPG、PNG 格式的圖片";
    }

    // 檢查檔案大小（原始檔案大於 10MB 就拒絕）
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return "圖片大小不能超過 10MB";
    }

    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      // 先測試網路連線
      const networkOk = await testNetworkConnection();
      if (!networkOk) {
        throw new Error("網路連線異常，請檢查網路設定");
      }

      const file = files[0];
      console.log("File info:", {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      });

      const error = validateFile(file);
      if (error) {
        toast.error(error);
        setErrorMessage(error);
        return;
      }

      // 壓縮圖片
      const imageName = generateImageName();
      let compressedFile;

      try {
        compressedFile = await compressImage(file);
        console.log("Compression result:", {
          originalSize: file.size,
          compressedSize: compressedFile.size,
          compressionRatio:
            (((file.size - compressedFile.size) / file.size) * 100).toFixed(2) +
            "%",
        });
      } catch (compressError) {
        console.error("壓縮失敗，使用原始檔案:", compressError);
        // 如果壓縮失敗，使用原始檔案
        compressedFile = file;
      }

      const size = compressedFile.size;

      // 獲取預簽名 URL
      console.log("Getting signed URL for:", imageName, "size:", size);
      const signedUrl = await getSignedUrl.mutateAsync({
        key: "web/goach/upload/" + imageName,
        size,
      });

      if (!signedUrl) {
        throw new Error("Failed to get signed URL");
      }
      console.log("signedUrl", signedUrl);

      // 直接上傳到 R2
      console.log("Uploading to R2...");
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: compressedFile,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Upload failed:", uploadResponse.status, errorText);
        throw new Error(`Upload failed: ${uploadResponse.status} ${errorText}`);
      }

      console.log("Upload successful, creating image record...");

      // 創建圖片記錄
      const createPayload = {
        url: "https://web.forestdev.work/web/goach/upload/" + imageName,
        name: imageName,
      };
      const imageResult = await createImage.mutateAsync(createPayload);

      if (imageResult.url) {
        setUploadedImage(imageResult.url);
        onImagesChange(imageResult.url, imageResult.id);
        toast.success("圖片上傳成功");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        `圖片上傳失敗: ${error instanceof Error ? error.message : "未知錯誤"}`
      );
      setErrorMessage(error instanceof Error ? error.message : "未知錯誤");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setUploadedImage("");
    onImagesChange("", undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleFileChange}
          disabled={disabled || isUploading || !!uploadedImage}
          className="hidden"
          id={inputId}
        />
        <Button
          type="button"
          variant="outline"
          disabled={disabled || isUploading || !!uploadedImage}
          onClick={() => document.getElementById(inputId)?.click()}
          className="w-full"
        >
          {isUploading
            ? "上傳中..."
            : uploadedImage
            ? "已選擇圖片"
            : "選擇圖片"}
        </Button>
      </div>

      {uploadedImage && (
        <Card className="relative">
          <CardContent className="p-2">
            {completedWord && (
              <p className="text-sm text-gray-500">{completedWord}</p>
            )}
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full object-cover rounded"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 bg-white/80 hover:bg-white"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
          <div className="text-red-800 text-sm font-medium mb-1">上傳失敗</div>
          <div className="text-red-600 text-xs">{errorMessage}</div>
          <div className="text-red-500 text-xs mt-1">
            請檢查網路連線或稍後再試
          </div>
          <button
            onClick={() => {
              setErrorMessage("");
              document.getElementById(inputId)?.click();
            }}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
          >
            重新嘗試
          </button>
        </div>
      )}
    </div>
  );
}
