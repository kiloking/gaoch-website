import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import imageCompression from "browser-image-compression";
import { generateImageName } from "@/lib/utils";

interface UploadedImage {
  id: number;
  url: string;
}

interface MultipleImageUploadProps {
  onImagesChange: (images: UploadedImage[]) => void;
  inputId: string;
  disabled?: boolean;
  currentImages?: UploadedImage[];
}

export function MultipleImageUpload({
  onImagesChange,
  inputId,
  disabled = false,
  currentImages = [],
}: MultipleImageUploadProps) {
  const [uploadedImages, setUploadedImages] =
    useState<UploadedImage[]>(currentImages);
  const [isUploading, setIsUploading] = useState(false);

  const getSignedUrl = api.upload.getSignedUrl.useMutation();
  const createImage = api.upload.createImage.useMutation();

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 960, // 較小的尺寸，適合作品集圖片
      useWebWorker: true,
      fileType: file.type,
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("壓縮失敗:", error);
      throw error;
    }
  };

  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return "只接受 JPG、PNG 格式的圖片";
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return "圖片大小不能超過 2MB";
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

      const imageName = generateImageName();
      const compressedFile = await compressImage(file);
      const size = compressedFile.size;

      const signedUrl = await getSignedUrl.mutateAsync({
        key: "web/goach/upload/" + imageName,
        size,
      });

      if (!signedUrl) {
        throw new Error("Failed to get signed URL");
      }

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

      const createPayload = {
        url: "https://web.forestdev.work/web/goach/upload/" + imageName,
        name: imageName,
      };
      const imageResult = await createImage.mutateAsync(createPayload);

      if (imageResult.url && imageResult.id) {
        const newImage = { id: imageResult.id, url: imageResult.url };
        const updatedImages = [...uploadedImages, newImage];
        setUploadedImages(updatedImages);
        onImagesChange(updatedImages);

        // 清除 input 的值，這樣同一個檔案可以再次上傳
        e.target.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("圖片上傳失敗");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (imageId: number) => {
    const updatedImages = uploadedImages.filter((img) => img.id !== imageId);
    setUploadedImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled || isUploading}
          className="hidden"
          id={inputId}
        />
        <Button
          type="button"
          variant="outline"
          disabled={disabled || isUploading}
          onClick={() => document.getElementById(inputId)?.click()}
          className="w-full"
        >
          {isUploading ? "上傳中..." : "新增圖片"}
        </Button>
      </div>

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {uploadedImages.map((image) => (
            <Card key={image.id} className="relative">
              <CardContent className="p-2">
                <img
                  src={image.url}
                  alt="Uploaded"
                  className="w-full h-48 object-cover rounded"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 bg-white/80 hover:bg-white"
                  onClick={() => removeImage(image.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
