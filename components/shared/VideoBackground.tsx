import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoId: string;
}

export default function VideoBackground({ videoId }: VideoBackgroundProps) {
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 載入 YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // 初始化 YouTube Player
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(playerRef.current!, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1,
          modestbranding: 1,
          mute: 1,
          playlist: videoId, // 需要設定 playlist 才能循環播放
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    };
  }, [videoId]);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {/* black gradient bg  */}
      <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b via-black/30 from-black/80 "></div>
      <div className="relative w-full h-full">
        <iframe
          ref={playerRef}
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] min-w-[100vw] min-h-[100vh] transform -translate-x-1/2 -translate-y-1/2 scale-150"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* 添加遮罩層，可以調整透明度來控制影片亮度 */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </div>
  );
}
