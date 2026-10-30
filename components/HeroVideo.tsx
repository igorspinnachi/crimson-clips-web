"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Looping muted video layered above the fallback image.
 * It stays invisible until the file actually loads, so a missing
 * file simply leaves the image in place.
 */
export default function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) ref.current?.pause();
  }, [ready]);

  return (
    <video
      ref={ref}
      className={`hero-video${ready ? " ready" : ""}`}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onCanPlay={() => setReady(true)}
      aria-hidden="true"
    />
  );
}

