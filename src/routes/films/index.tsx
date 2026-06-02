import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Film, Info, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/films/")({
  component: FilmsLandingPage,
});

function FilmsLandingPage() {
  const [films, setFilms] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/films")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFilms(data.data.map((f: any) => ({ ...f, id: f._id })));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const filteredFilms = activeFilter === "All"
    ? films
    : films.filter(film => {
      if (activeFilter === "Documentaries") return true;
      if (activeFilter === "Series") return false;
      return true;
    });

  return (
    <div className="bg-[#050704] min-h-screen flex flex-col text-cream selection:bg-gold/30">
      <SiteHeader />
      <main className="flex-grow">
        {/* Cinematic Video Header */}
        <section className="relative h-[75vh] min-h-[500px] flex items-center overflow-hidden">
          {/* Loop Video Background */}
          <div className="absolute inset-0 w-full h-full bg-[#050704]">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
            >
              <source
                src="https://vjs.zencdn.net/v/oceans.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            {/* Gradient Overlays */}
            {/* Bottom Fade */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050704] to-transparent" />
            {/* Left Vignette */}
            <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 w-full z-10 pt-16">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 bg-gold/10 backdrop-blur border border-gold/20 px-3.5 py-1.5 rounded-full animate-fade-in">
                <Film className="h-4 w-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">OMS Original Cinema</span>
              </div>
              <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-cream leading-none">
                Cinema <span className="italic text-gold font-medium">Hub</span>
              </h1>
              <p className="text-base sm:text-lg text-cream/80 leading-relaxed">
                Explore the official library of original productions. High-definition documentaries and films exploring the design, majesty, and theological depth of God's great creation.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/films/$filmId"
                  params={{ filmId: "the-seed" }}
                  className="bg-gold text-forest-deep px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <Play className="h-4 w-4 fill-current animate-pulse" /> Play Featured
                </Link>
                <Link
                  to="/films/trailer"
                  className="bg-white/10 backdrop-blur border border-white/10 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Info className="h-4 w-4" /> Watch Trailer
                </Link>
              </div>
            </div>
          </div>

          {/* Sound Controls (Overlay) */}
          <div className="absolute bottom-12 right-12 z-20 flex items-center gap-4">
            <button
              onClick={toggleMute}
              className="h-12 w-12 rounded-full bg-black/40 backdrop-blur border border-white/15 text-cream flex items-center justify-center hover:bg-black/60 hover:scale-105 active:scale-95 transition-all shadow-lg"
              title={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 3.28-2.02 6.07-5 7.22v2.06c4.13-1.24 7.2-5.07 7.2-9.28 0-4.21-3.07-8.04-7.2-9.28v2.06c2.98 1.15 5 3.94 5 7.22zM5.88 12L10 16.12v-8.24L5.88 12zM3 9v6h4l5 5V4L7 9H3z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <span className="text-[10px] font-bold text-cream/40 uppercase tracking-widest hidden sm:inline-block">
              {isMuted ? "Audio Muted" : "Audio Active"}
            </span>
          </div>
        </section>

        {/* Film Catalog */}
        <section className="py-24 relative z-10 min-h-[600px]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
              <div>
                <h2 className="font-display text-3xl font-medium text-cream">Official <span className="italic text-gold">Library</span></h2>
                <p className="mt-2 text-sm text-gold/70 uppercase tracking-widest">Admin Curated Content</p>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-500">
              {filteredFilms.map((film) => (
                <Link key={film.id} to="/films/$filmId" params={{ filmId: film.id }} className="group flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    <img src={film.thumbnail || film.image || "https://images.unsplash.com/photo-1485846234645-a62644ef7467?w=800"} alt={film.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-16 w-16 rounded-full bg-cream/90 text-forest-deep flex items-center justify-center shadow-2xl">
                        <Play className="h-6 w-6 fill-current ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-display text-2xl font-medium text-cream group-hover:text-gold transition-colors">{film.title}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-gold">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-[10px] font-bold">{film.rating || "0.0"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 px-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-2">{film.year} • {film.duration}</p>
                    <p className="text-sm text-cream/60 leading-relaxed line-clamp-2">{film.desc || "A cinematic journey exploring the wonders of God's creation."}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
