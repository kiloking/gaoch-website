import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface VideoBackgroundProps {
  videoId: string;
}

export default function VideoBackground({ videoId }: VideoBackgroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (!iframeRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // 計算視窗比例
      const windowRatio = width / height;
      // YouTube 標準比例 16:9
      const videoRatio = 16 / 9;

      let scale = 1;
      if (windowRatio > videoRatio) {
        // 如果視窗比影片寬，以寬度為基準
        scale = (width / height) * 0.8;
      } else {
        // 如果視窗比影片窄，以高度為基準
        scale = (height / width) * 2;
      }

      iframeRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        {/* 調整漸層遮罩的透明度 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent z-10" />

        {/* YouTube iframe */}
        <div className="relative w-full h-full">
          <iframe
            ref={iframeRef}
            className="absolute top-1/2 left-1/2 w-full h-full min-w-[100vw] min-h-[100vh]"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&controls=0&mute=1&playlist=${videoId}&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&iv_load_policy=3&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 調整額外遮罩層的透明度 */}
        <div className="absolute inset-0 bg-black/30 z-20" />
      </div>

      {/* 新增 Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="fixed bottom-8 right-8 z-30 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 hidden ">
            觀看影片
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[800px]  p-0 bg-black border-none ">
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
