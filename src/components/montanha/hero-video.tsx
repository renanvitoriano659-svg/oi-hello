import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { siteConfig } from "@/config/site";

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const sync = () => {
      if (preference.matches || connection?.saveData) media.pause();
      else {
        media.src = siteConfig.MEDIA.heroVideo;
        media.play().catch(() => setPlaying(false));
      }
    };
    sync();
    preference.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) media.pause();
        else if (!preference.matches && !connection?.saveData && !media.dataset["pausedByUser"])
          media.play().catch(() => {});
      },
      { threshold: 0.1 },
    );
    observer.observe(media);
    return () => {
      preference.removeEventListener("change", sync);
      observer.disconnect();
      media.pause();
    };
  }, []);

  return (
    <>
      <video
        ref={video}
        className="hero-video"
        poster={siteConfig.MEDIA.heroPoster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onCanPlay={() => setAvailable(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setAvailable(false)}
      />
      {available && (
        <button
          type="button"
          className="video-control"
          aria-label={playing ? "Pausar vídeo de fundo" : "Reproduzir vídeo de fundo"}
          onClick={() => {
            if (!video.current) return;
            if (playing) {
              video.current.pause();
              video.current.dataset["pausedByUser"] = "true";
            } else {
              delete video.current.dataset["pausedByUser"];
              video.current.play().catch(() => {});
            }
          }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          <span>{playing ? "Pausar" : "Reproduzir"}</span>
        </button>
      )}
    </>
  );
}
