import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoId: string; // YouTube 影片 ID
}

export default function VideoBackground({ videoId }: VideoBackgroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 調整 iframe 大小以覆蓋整個視窗
    const handleResize = () => {
      if (!iframeRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale =
        Math.max(width / (width * 0.5625), height / (height * 0.5625)) * 1.5;
      iframeRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {/* 漸層遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-10" />

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

      {/* 額外的遮罩層 */}
      <div className="absolute inset-0 bg-black/30 z-20" />
    </div>
  );
}
