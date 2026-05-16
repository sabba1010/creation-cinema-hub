import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Film, Info, Calendar, Clock, Star, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/films/")({
  component: FilmsLandingPage,
});

const FILMS = [
  {
    id: "the-seed",
    title: "The Seed",
    year: "2024",
    duration: "1h 42m",
    rating: "9.8",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    desc: "A cinematic journey into the microscopic wonder of creation.",
  },
  {
    id: "mountain-majesty",
    title: "Mountain Majesty",
    year: "2023",
    duration: "52m",
    rating: "9.5",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
    desc: "Exploring the peaks where earth meets the heavens.",
  },
  {
    id: "deep-wonders",
    title: "Deep Wonders",
    year: "2022",
    duration: "1h 15m",
    rating: "9.6",
    image: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&q=80&w=800",
    desc: "The unseen architecture of the ocean's depths.",
  },
  {
    id: "eternal-light",
    title: "Eternal Light",
    year: "2024",
    duration: "1h 05m",
    rating: "9.9",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
    desc: "A documentary on the first day of creation.",
  },
  {
    id: "breath-of-life",
    title: "Breath of Life",
    year: "2021",
    duration: "45m",
    rating: "9.4",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
    desc: "The invisible rhythms that sustain every living thing.",
  },
];

import { useState } from "react";

function FilmsLandingPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredFilms = activeFilter === "All"
    ? FILMS
    : FILMS.filter(film => {
      if (activeFilter === "Documentaries") return true;
      if (activeFilter === "Series") return false;
      return true;
    });

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Cinema Hub Header */}
        <section className="py-20 bg-forest-deep text-cream">
          <div className="mx-auto max-w-7xl px-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold/80 mb-6 block">The OMS Collection</span>
            <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight">
              Cinema <span className="italic text-gold">Hub</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-cream/70 leading-relaxed">
              Explore the official library of original productions curated by the One Mustard Seed team. Cinematic stories built to ground your faith in the wonder of creation.
            </p>
          </div>
        </section>

        {/* Film Catalog */}
        <section className="py-24 bg-background min-h-[600px]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-16 border-b border-border pb-8">
              <div>
                <h2 className="font-display text-3xl font-medium text-foreground">Official <span className="italic text-primary">Library</span></h2>
                <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">Admin Curated Content</p>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-500">
              {FILMS.map((film) => (
                <Link key={film.id} to={`/films/${film.id}`} className="group flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-muted shadow-card transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-elevated">
                    <img src={film.image} alt={film.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
                          <span className="text-[10px] font-bold">{film.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 px-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{film.year} • {film.duration}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{film.desc}</p>
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
