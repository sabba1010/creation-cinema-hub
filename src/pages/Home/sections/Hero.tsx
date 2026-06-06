import { useState, useEffect } from "react";
import { Play, Compass } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { HERO_CONTENT } from "../../../data/home-data";

import heroImg from "@/assets/hero-family.jpg";

export function Hero() {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings");
        const data = await res.json();
        if (data.success && data.data.home_hero_media) {
          setMediaUrl(data.data.home_hero_media);
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };
    fetchSettings();
  }, []);

  const isVideo = mediaUrl?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden flex flex-col justify-center">
      {/* Background Image / Video */}
      {isVideo ? (
        <video
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={mediaUrl || heroImg}
          alt="A family overlooking mountains at golden hour"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Sophisticated Overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_80%)]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 text-center">
        <div className="mx-auto max-w-4xl pt-8">
          <span className="inline-block px-4 py-1.5 mb-8 rounded-full border border-cream/20 bg-cream/5 text-[10px] font-bold tracking-[0.3em] text-cream/80 uppercase backdrop-blur-sm animate-fade-up">
            {HERO_CONTENT.subtitle}
          </span>

          <h1 className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-medium leading-[1] tracking-tight text-cream drop-shadow-xl">
            <span className="block animate-fade-up [animation-delay:150ms]">{HERO_CONTENT.title}</span>
          </h1>

          <div className="mt-8 mx-auto max-w-xl space-y-8 animate-fade-up [animation-delay:400ms]">
            <p className="text-lg sm:text-xl font-light leading-relaxed text-cream/90 text-balance italic">
              {HERO_CONTENT.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
              <a
                href={HERO_CONTENT.primaryCTA.href}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#5A6F3E] px-9 py-3.5 text-[13px] font-bold tracking-[0.2em] text-cream uppercase transition-all duration-300 hover:bg-[#4A5F2E] hover:scale-105"
              >
                <span className="relative z-10">{HERO_CONTENT.primaryCTA.label}</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </a>
              <a
                href={HERO_CONTENT.secondaryCTA.href}
                className="inline-flex items-center justify-center rounded-full border border-cream/40 px-9 py-3.5 text-[13px] font-bold tracking-[0.2em] text-cream uppercase transition-all duration-300 hover:bg-cream hover:text-forest-deep hover:scale-105"
              >
                {HERO_CONTENT.secondaryCTA.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-up [animation-delay:1000ms] z-20">
        <span className="text-[9px] font-bold tracking-[0.4em] text-cream/40 uppercase">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-cream/40 to-transparent" />
      </div>

      {/* Elegant Wave Edge */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[40px] sm:h-[60px] lg:h-[85px] w-full"
          style={{ transform: "rotate(180deg)" }}
        >
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="var(--cream)"
          ></path>
        </svg>
      </div>
    </section>
  );
}


