"use client";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { CLIPS, type Clip } from "../lib/clips";

function ClipCard({ clip, index }: { clip: Clip; index: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  function start() {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void video.current?.play().catch(() => {});
  }
  function stop() {
    const v = video.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }

  return (
    <article
      className={`clip clip-${index + 1}`}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      tabIndex={0}
      aria-label={`${clip.title} by ${clip.author}`}
    >
      <span className="clip-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <video
        ref={video}
        className={`clip-video${ready ? " ready" : ""}`}
        src={clip.src}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setReady(true)}
        aria-hidden="true"
      />
      <span className="clip-play" aria-hidden="true">
        <Play size={16} fill="currentColor" />
      </span>
      <span className="clip-time">{clip.duration}</span>
      <div className="clip-meta">
        <h3>{clip.title}</h3>
        <p>
          {clip.author} · {clip.game}
        </p>
      </div>
    </article>
  );
}

export default function ClipWall() {
  return (
    <div className="clip-wall">
      {CLIPS.map((clip, i) => (
        <ClipCard key={clip.src} clip={clip} index={i} />
      ))}
    </div>
  );
}

