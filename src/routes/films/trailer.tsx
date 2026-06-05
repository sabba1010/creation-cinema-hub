import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, ArrowLeft, Maximize, Volume2, Settings, Share2, X } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";

type SearchParams = {
  video?: string;
  title?: string;
  desc?: string;
};

export const Route = createFileRoute("/films/trailer")({
  component: TrailerPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      video: search.video as string | undefined,
      title: search.title as string | undefined,
      desc: search.desc as string | undefined,
    }
  }
});

function TrailerPage() {
  const { video, title, desc } = Route.useSearch();
  const [isPlaying, setIsPlaying] = useState(false);

  const videoUrl = video || "https://vjs.zencdn.net/v/oceans.mp4";
  const displayTitle = title || "The Seed (2024)";
  const displayDesc = desc || '"The Seed" takes you on a journey through the unseen world. Experience the documentary that critics are calling \'a visual prayer.\' Coming to the OMS Cinema Hub this fall.';

  return (
    <div className="bg-foreground min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24 flex items-center justify-center bg-black">
        <div className="mx-auto max-w-6xl px-6 w-full py-12">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/films" className="flex items-center gap-2 text-sm font-bold text-cream uppercase tracking-widest hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" /> Back to Films
            </Link>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">Official Trailer</p>
              <h1 className="font-display text-2xl text-cream">{displayTitle}</h1>
            </div>
            <Link to="/films" className="h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition">
              <X className="h-5 w-5" />
            </Link>
          </div>

          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border border-white/5 group">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  onClick={() => setIsPlaying(true)}
                  className="h-24 w-24 rounded-full bg-gold/90 text-gold-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-glow z-10"
                >
                  <Play className="h-10 w-10 fill-current ml-1" />
                </div>
                {React.createElement(ReactPlayer as any, {
                  url: videoUrl,
                  playing: true,
                  muted: true,
                  loop: true,
                  width: "100%",
                  height: "100%",
                  style: { position: 'absolute', top: 0, left: 0, opacity: 0.3, objectFit: 'cover' },
                  config: { vimeo: { playerOptions: { background: true } } }
                })}
              </div>
            ) : (
              React.createElement(ReactPlayer as any, {
                url: videoUrl,
                playing: true,
                controls: true,
                width: "100%",
                height: "100%",
                className: "outline-none"
              })
            )}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
            <p className="text-cream/60 leading-relaxed max-w-xl whitespace-pre-wrap">
              {displayDesc}
            </p>
            <div className="flex justify-end gap-4">
              <button className="rounded-full bg-primary px-10 py-5 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg hover:scale-105 transition-all">Pre-Order Now</button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
