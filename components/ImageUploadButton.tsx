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

  useEffect(() => {
    if (reset) {
      setUploadedImage("");
    }
  }, [reset]);
  const getSignedUrl = api.upload.getSignedUrl.useMutation();
  const createImage = api.upload.createImage.useMutation();

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1.5, // 最大檔案大小
      maxWidthOrHeight: composeSize ? composeSize : 1920, // 最大寬度或高度
      useWebWorker: true, // 使用 Web Worker 提升性能
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

    try {
      const file = files[0];
      const error = validateFile(file);
      if (error) {
        toast.error(error);
        return;
      }

      // 壓縮圖片
      const imageName = generateImageName();
      const compressedFile = await compressImage(file);
      const size = compressedFile.size;
      // 獲取預簽名 URL
      const signedUrl = await getSignedUrl.mutateAsync({
        key: "web/goach/upload/" + imageName,
        size,
      });

      if (!signedUrl) {
        throw new Error("Failed to get signed URL");
      }
      console.log("signedUrl", signedUrl);

      // 直接上傳到 R2
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: compressedFile,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload to R2");
      }

      // 創建圖片記錄
      const createPayload = {
        url: "https://web.forestdev.work/web/goach/upload/" + imageName,
        name: imageName,
      };
      const imageResult = await createImage.mutateAsync(createPayload);

      if (imageResult.url) {
        setUploadedImage(imageResult.url);
        onImagesChange(imageResult.url, imageResult.id);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("圖片上傳失敗");
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
          accept="image/*"
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
