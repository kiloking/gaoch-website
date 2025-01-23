import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
interface VideoUploadButtonProps {
  onVideoChange: (url: string, videoId?: number) => void;
  inputId: string;
  reset: boolean;
  completedWord: string;
  isSubmitting: boolean;
  onSubmit?: () => void;
}

export default function VideoUploadButton({
  onVideoChange,
  inputId,
  reset,
  completedWord,
}: VideoUploadButtonProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate video file
    if (!file.type.startsWith("video/")) {
      toast("請上傳有效的影片檔案", { position: "top-center" });
      return;
    }

    // Limit video size to 100MB
    if (file.size > 100 * 1024 * 1024) {
      toast("影片檔案大小不能超過 100MB", { position: "top-center" });
      return;
    }

    setSelectedFile(file);
  };

  useEffect(() => {
    if (reset) {
      setSelectedFile(null);
    }
  }, [reset]);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="file"
          id="video-upload"
          accept="video/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        {selectedFile ? (
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex  items-center gap-2 w-full ">
              <div className="flex items-center gap-2 w-10/12 border rounded-md py-[5px] px-2 ">
                <div className=" whitespace-nowrap truncate">
                  {selectedFile.name}
                </div>
                <div
                  onClick={() => {
                    setSelectedFile(null);
                    // Reset input value to allow re-selecting same file
                    const input = document.getElementById(
                      inputId
                    ) as HTMLInputElement;
                    if (input) {
                      input.value = "";
                    }
                  }}
                >
                  <X />
                </div>
              </div>
              <Button variant="outline" className="w-2/12" type="button">
                上傳
              </Button>
            </div>

            {/* upload progress */}
            <Progress value={33} />
          </div>
        ) : (
          <>
            {" "}
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => document.getElementById("video-upload")?.click()}
            >
              選擇影片
              {/* del selectfile */}
            </Button>
          </>
        )}
      </div>

      <p className="text-sm text-gray-500">支援格式：MP4, MOV, AVI</p>
      <p className="text-sm text-gray-500">最大檔案大小：32MB</p>
    </div>
  );
}
