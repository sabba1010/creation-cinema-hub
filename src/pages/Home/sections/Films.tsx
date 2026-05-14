import { Play, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";

const FILMS = [
  { 
    id: "creation-case",
    title: "The Creation Case", 
    year: "2025", 
    runtime: "98 min", 
    genre: "Documentary",
    img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: "great-earth",
    title: "Great Earth", 
    year: "2024", 
    runtime: "84 min", 
    genre: "Nature · Faith",
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: "rise-pray",
    title: "Rise & Pray", 
    year: "2025", 
    runtime: "62 min", 
    genre: "Spiritual",
    img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=800" 
  },
];

export function Films() {
  return (
    <section id="watch" className="relative bg-forest-deep py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Cinema</span>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-5xl">
              Films that <span className="italic text-gold">stir the soul.</span>
            </h2>
          </div>
          <Link to="/films" className="text-sm font-semibold text-cream/80 hover:text-gold transition">All films &rarr;</Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FILMS.map((f, idx) => (
            <Link
              key={f.title}
              to="/films/watch"
              className={`group relative block overflow-hidden rounded-3xl ring-1 ring-cream/10 transition-all duration-700 hover:ring-gold/40 ${idx === 0 ? "md:col-span-1 md:row-span-2 md:aspect-[3/4]" : "aspect-[3/4]"}`}
            >
              <article className="h-full w-full">
                <img src={f.img} alt={f.title} loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent" />

                <div className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-cream/15 backdrop-blur-md ring-1 ring-cream/40 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold">
                  <Play className="h-6 w-6 fill-cream text-cream group-hover:fill-gold-foreground group-hover:text-gold-foreground" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-gold/90">{f.genre}</div>
                  <h3 className="mt-1.5 font-display text-2xl">{f.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-cream/65">
                    <span>{f.year}</span>
                    <span className="h-1 w-1 rounded-full bg-cream/40" />
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {f.runtime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
