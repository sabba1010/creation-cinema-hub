import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Mic2, Music, Radio, ExternalLink, Headphones, Info } from "lucide-react";

export const Route = createFileRoute("/podcast/")({
  component: PodcastLandingPage,
});

const SEASONS = [
  {
    id: "1",
    title: "The Wonder of Creation",
    episodes: 12,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    desc: "Exploring the intricate details of the natural world and the Creator's handiwork.",
  },
  {
    id: "2",
    title: "Faith in the Modern Age",
    episodes: 10,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
    desc: "Navigating life, technology, and community through a biblical lens.",
  },
  {
    id: "3",
    title: "Stories of the Seed",
    episodes: 8,
    image: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&q=80&w=800",
    desc: "Personal testimonies and stories of transformation from around the globe.",
  },
];

const PLATFORMS = [
  { name: "Apple Podcasts", icon: Music, url: "#" },
  { name: "Spotify", icon: Radio, url: "#" },
  { name: "Google Podcasts", icon: Headphones, url: "#" },
  { name: "Amazon Music", icon: Radio, url: "#" },
];

function PodcastLandingPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Podcast Hero */}
        <section className="relative py-24 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_30%,var(--gold),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
                <Mic2 className="h-3 w-3" /> OMS Podcast Network
              </span>
              <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight leading-none">
                God's Great <span className="italic text-gold">Earth</span> Podcast
              </h1>
              <p className="mt-8 text-lg text-cream/75 leading-relaxed max-w-xl">
                Join us every Tuesday for deep conversations, biblical insights, and stories that celebrate the wonder of our Creator. Available on all major platforms.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-gold-foreground shadow-lg hover:scale-105 transition">
                  Latest Episode
                </button>
                <div className="flex items-center gap-3">
                  {PLATFORMS.map((p) => (
                    <a key={p.name} href={p.url} className="h-10 w-10 grid place-items-center rounded-full bg-cream/10 text-cream/60 hover:text-gold hover:bg-cream/20 transition" title={p.name}>
                      <p.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block animate-fade-up [animation-delay:200ms]">
              <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border border-cream/10">
                <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" alt="Podcast Studio" className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Currently Playing</p>
                    <p className="text-xl font-display font-medium">The Majesty of the Mountains</p>
                  </div>
                  <button className="h-14 w-14 rounded-full bg-cream text-forest-deep grid place-items-center shadow-glow">
                    <Play className="h-6 w-6 fill-forest-deep" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seasons Grid */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="font-display text-4xl font-medium text-foreground">Explore <span className="italic text-primary">Seasons</span></h2>
                <p className="mt-4 text-muted-foreground">Journey through our curated collections of faith and wonder.</p>
              </div>
              <div className="flex gap-2">
                 <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">3 Seasons Total</span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {SEASONS.map((s) => (
                <Link 
                  key={s.id} 
                  to={`/podcast/season/${s.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-muted">
                    <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold/90 mb-2">Season {s.id} • {s.episodes} Episodes</p>
                      <h3 className="font-display text-2xl font-medium text-cream group-hover:text-gold transition-colors">{s.title}</h3>
                      <p className="mt-3 text-sm text-cream/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{s.desc}</p>
                    </div>
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
