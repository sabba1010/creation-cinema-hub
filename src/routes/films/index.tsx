import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Film, Info, Calendar, Clock, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ReactPlayer from "react-player";
import image5 from "@/assets/logo2/image5.png";
import { HostMovieNight, PremierePartner } from "@/pages/Films/sections/HostScreening";

export const Route = createFileRoute("/films/")({
  component: FilmsLandingPage,
});

function FilmsLandingPage() {
  const [films, setFilms] = useState<any[]>([]);
  const [sliders, setSliders] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMuted, setIsMuted] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [filmsHeroVimeo, setFilmsHeroVimeo] = useState("https://vimeo.com/1209490802");
  const [filmsHeroTitle, setFilmsHeroTitle] = useState("Explore the official library of original productions. High-definition documentaries and films exploring the design, majesty, and theological depth of God\u2019s great creation.");

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    fetch("https://movie-backend-drab.vercel.app/api/films")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFilms(data.data.map((f: any) => ({ ...f, id: f._id })));
        }
      })
      .catch(err => console.error(err));

    fetch("https://movie-backend-drab.vercel.app/api/films/hero-sliders")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSliders(data.data.filter((s: any) => s.isActive).sort((a: any, b: any) => a.order - b.order));
        }
      })
      .catch(err => console.error(err));

    // Load page settings
    fetch("https://movie-backend-drab.vercel.app/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.data.films_hero_vimeo) setFilmsHeroVimeo(data.data.films_hero_vimeo);
          if (data.data.films_hero_title) setFilmsHeroTitle(data.data.films_hero_title);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const featuredFilm = films[0];

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
        <section className="relative h-[75vh] min-h-[500px] flex items-center overflow-hidden bg-[#050704]">
          <div className="absolute inset-0 z-0" ref={emblaRef}>
            <div className="flex h-full w-full">
              {sliders.length > 0 ? sliders.map((slide, index) => (
                <div key={slide._id || index} className="relative flex-[0_0_100%] h-full w-full min-w-0">
                  {/* Loop Video Background */}
                  <div className="absolute inset-0 w-full h-full bg-[#050704] pointer-events-none">
                    {React.createElement(ReactPlayer as any, {
                      url: slide.backgroundVideoUrl,
                      playing: true,
                      muted: isMuted,
                      loop: true,
                      width: "100%",
                      height: "100%",
                      style: { objectFit: 'cover', opacity: 0.5 },
                      playsinline: true,
                      config: { vimeo: { playerOptions: { controls: false, autoplay: true, playsinline: true, loop: true, autopause: false } } }
                    })}
                    {/* Gradient Overlays */}
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050704] to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                  </div>

                  <div className="relative mx-auto max-w-7xl px-6 w-full h-full flex flex-col justify-center z-10 pt-16">
                    <div className="max-w-2xl space-y-6">
                      <div className="inline-flex items-center gap-2 bg-gold/10 backdrop-blur border border-gold/20 px-3.5 py-1.5 rounded-full animate-fade-in">
                        <Film className="h-4 w-4 text-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{slide.badgeText}</span>
                      </div>
                      <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-cream leading-none">
                        {slide.title}
                      </h1>
                      <p className="text-base sm:text-lg text-cream/80 leading-relaxed">
                        {slide.description}
                      </p>

                      <div className="flex flex-wrap gap-4 pt-4">
                        {slide.primaryButtonLink && (
                          <Link
                            to={(slide.primaryButtonLink.trim() === "/films/$filmId" && featuredFilm ? "/films/$filmId" : slide.primaryButtonLink.trim()) as any}
                            params={(slide.primaryButtonLink.trim() === "/films/$filmId" && featuredFilm ? { filmId: featuredFilm.id } : {}) as any}
                            search={(slide.primaryButtonLink.trim().includes("/films/trailer") ? { video: slide.backgroundVideoUrl, title: slide.title, desc: slide.description } : undefined) as any}
                            className="bg-gold text-forest-deep px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                          >
                            <Play className="h-4 w-4 fill-current animate-pulse" /> {slide.primaryButtonText}
                          </Link>
                        )}
                        {slide.secondaryButtonLink && (
                          <Link
                            to={slide.secondaryButtonLink.trim() as any}
                            search={(slide.secondaryButtonLink.trim().includes("/films/trailer") ? { video: slide.backgroundVideoUrl, title: slide.title, desc: slide.description } : undefined) as any}
                            className="bg-white/10 backdrop-blur border border-white/10 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"
                          >
                            <Info className="h-4 w-4" /> {slide.secondaryButtonText}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="relative flex-[0_0_100%] h-full w-full min-w-0">
                  <div className="absolute inset-0 w-full h-full bg-[#050704] pointer-events-none">
                    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-50">
                      {filmsHeroVimeo.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video
                          src={filmsHeroVimeo}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                        />
                      ) : (
                        <iframe
                          key={isMuted ? 'muted' : 'unmuted'}
                          src={`https://player.vimeo.com/video/${filmsHeroVimeo.match(/vimeo\.com\/(\d+)/i)?.[1] || '1209490802'}?autoplay=1&loop=1&byline=0&title=0&muted=${isMuted ? 1 : 0}&controls=0&autopause=0`}
                          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          frameBorder="0"
                          allow="autoplay; fullscreen"
                        />
                      )}
                    </div>
                    {/* Gradient Overlays */}
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050704] to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
                  </div>

                  <div className="relative mx-auto max-w-7xl px-6 w-full h-full flex flex-col justify-center z-10 pt-16">
                    <div className="max-w-2xl space-y-6">
                      <div className="inline-flex items-center gap-2 bg-gold/10 backdrop-blur border border-gold/20 px-3.5 py-1.5 rounded-full animate-fade-in mb-4">
                        <Film className="h-4 w-4 text-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">OMS Original Cinema</span>
                      </div>
                      <img src={image5} alt="OMS Films Logo" className="w-auto h-24 md:h-32 lg:h-40 object-contain drop-shadow-2xl hover:bg-white rounded-3xl p-4 transition-all duration-300" />
                      <p className="text-base sm:text-lg text-cream/80 leading-relaxed max-w-xl">
                        {filmsHeroTitle}
                      </p>
                    </div>
                  </div>
                </div>
              )}
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

        <HostMovieNight />

        {/* Film Catalog */}
        <section className="py-12 relative z-10 min-h-[600px]">
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
        
        <PremierePartner />
      </main>
      <SiteFooter />
    </div>
  );
}
