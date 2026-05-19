import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Mic2 } from "lucide-react";
import { usePodcast } from "../podcast";

import applePodcastsLogo from "@/assets/logo/Apple Podcasts.png";
import spotifyLogo from "@/assets/logo/Spotify.png";
import youtubeMusicLogo from "@/assets/logo/YouTube Music.png";
import overcastLogo from "@/assets/logo/Overcast.png";
import pocketCastsLogo from "@/assets/logo/Pocket Casts.png";
import castboxLogo from "@/assets/logo/Castbox.jpg";
import castroLogo from "@/assets/logo/Castro.png";
import downcastLogo from "@/assets/logo/Downcast.png";

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
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com",
    icon: applePodcastsLogo,
    color: "hover:bg-[#872ec4] hover:text-white hover:border-[#872ec4]",
  },
  {
    name: "Spotify",
    url: "https://spotify.com",
    icon: spotifyLogo,
    color: "hover:bg-[#1ed760] hover:text-black hover:border-[#1ed760]",
  },
  {
    name: "YouTube Music",
    url: "https://music.youtube.com",
    icon: youtubeMusicLogo,
    color: "hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000]",
  },
  {
    name: "Overcast",
    url: "https://overcast.fm",
    icon: overcastLogo,
    color: "hover:bg-[#fc7e0f] hover:text-white hover:border-[#fc7e0f]",
  },
  {
    name: "Pocket Casts",
    url: "https://pocketcasts.com",
    icon: pocketCastsLogo,
    color: "hover:bg-[#f43e37] hover:text-white hover:border-[#f43e37]",
  },
  {
    name: "Castbox",
    url: "https://castbox.fm",
    icon: castboxLogo,
    color: "hover:bg-[#f55b23] hover:text-white hover:border-[#f55b23]",
  },
  {
    name: "Castro",
    url: "https://castro.fm",
    icon: castroLogo,
    color: "hover:bg-[#00b269] hover:text-white hover:border-[#00b269]",
  },
  {
    name: "Downcast",
    url: "https://downcastapp.com",
    icon: downcastLogo,
    color: "hover:bg-[#1c3c5c] hover:text-white hover:border-[#1c3c5c]",
  }
];


const LATEST_EPISODE = {
  id: "1",
  title: "The Architecture of Light",
  duration: "42:15",
  date: "May 12, 2026",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
  seasonTitle: "Season 1, Episode 1",
};

function PodcastLandingPage() {
  const { playEpisode } = usePodcast();

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
              
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a 
                  href="https://godsgreatearth.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-gold-foreground shadow-lg hover:scale-105 transition cursor-pointer inline-block"
                >
                  Latest Episode
                </a>
                <div className="flex items-center gap-3">
                  {PLATFORMS.slice(0, 4).map((p) => (
                    <a 
                      key={p.name} 
                      href={p.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 grid place-items-center rounded-full bg-cream/10 hover:bg-cream/25 transition cursor-pointer" 
                      title={`Listen on ${p.name}`}
                    >
                      <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
                        <img src={p.icon} alt={p.name} className="h-4 w-4 object-contain" />
                      </div>
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
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Watch Episode</p>
                    <p className="text-xl font-display font-medium">The Majesty of the Mountains</p>
                  </div>
                  <a 
                    href="https://godsgreatearth.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 w-14 rounded-full bg-cream text-forest-deep grid place-items-center shadow-glow hover:scale-105 hover:bg-gold hover:text-gold-foreground transition cursor-pointer"
                  >
                    <Play className="h-6 w-6 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listen & Subscribe Platforms */}
        <section className="py-16 bg-card border-y border-border">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">Listen & Subscribe</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-sm">
              Tune in and follow our podcast on your favorite app. Available on all major platforms:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {PLATFORMS.map((p) => (
                <a 
                  key={p.name} 
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border border-border bg-background transition-all duration-300 hover:scale-[1.03] hover:shadow-md cursor-pointer ${p.color}`}
                >
                  <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center p-1 shadow-sm flex-shrink-0">
                    <img src={p.icon} alt={p.name} className="h-5 w-5 object-contain" />
                  </div>
                  <span className="font-semibold text-sm">{p.name}</span>
                </a>
              ))}
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
                  to="/podcast/season/$seasonId"
                  params={{ seasonId: s.id }}
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
