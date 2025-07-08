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

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1.5, // 最大檔案大小
      maxWidthOrHeight: composeSize ? composeSize : 1920, // 最大寬度或高度
      useWebWorker: false, // 在手機上禁用 Web Worker，避免兼容性問題
      fileType: file.type, // 保持原始檔案類型
      onProgress: (progress: number) => {
        console.log("Compression progress:", progress);
      },
    };

    try {
      console.log(
        "Starting compression for file:",
        file.name,
        "size:",
        file.size
      );
      const compressedFile = await imageCompression(file, options);
      console.log("Compression successful:", {
        originalSize: file.size,
        compressedSize: compressedFile.size,
        compressionRatio:
          (((file.size - compressedFile.size) / file.size) * 100).toFixed(2) +
          "%",
      });
      return compressedFile;
    } catch (error) {
      console.error("壓縮失敗:", error);
      // 如果壓縮失敗，返回原始檔案
      console.log("Using original file due to compression failure");
      console.log("File info:", {
        fileSize: file.size,
        fileType: file.type,
        fileName: file.name,
      });
      return file;
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
        console.log("error", error);
        return;
      }

      // 壓縮圖片
      const imageName = generateImageName();
      let compressedFile = file; // 預設使用原始檔案

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
        // 壓縮失敗時使用原始檔案
      }

      const size = compressedFile.size;

      // 獲取預簽名 URL
      console.log("Getting signed URL for:", imageName, "size:", size);
      const signedUrl = await getSignedUrl.mutateAsync({
        key: "goach/upload/" + imageName,
        size,
      });

      if (!signedUrl) {
        throw new Error("無法獲取上傳連結，請檢查網路連線");
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
        throw new Error(`上傳失敗 (${uploadResponse.status}): ${errorText}`);
      }

      console.log("Upload successful, creating image record...");

      // 創建圖片記錄
      const createPayload = {
        url: "https://web.forestdev.work/goach/upload/" + imageName,
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

      // 根據錯誤類型提供更具體的錯誤信息
      let errorMsg = "未知錯誤";
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMsg = "網路連線失敗，請檢查網路設定";
        } else if (error.message.includes("timeout")) {
          errorMsg = "上傳超時，請稍後再試";
        } else if (error.message.includes("413")) {
          errorMsg = "檔案太大，請選擇較小的圖片";
        } else if (
          error.message.includes("401") ||
          error.message.includes("403")
        ) {
          errorMsg = "權限錯誤，請重新整理頁面";
        } else {
          errorMsg = error.message;
        }
      }

      toast.error(`圖片上傳失敗: ${errorMsg}`);
      setErrorMessage(errorMsg);
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
    </div>
  );
}
