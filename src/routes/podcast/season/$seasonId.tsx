import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Download, BookOpen, Share2, ArrowLeft, Clock, Calendar } from "lucide-react";
import { usePodcast } from "../../podcast";


export const Route = createFileRoute("/podcast/season/$seasonId")({
  component: SeasonDetailsPage,
});

const EPISODES = [
  { id: "1", title: "The Architecture of Light", duration: "42:15", date: "May 12, 2026", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "2", title: "Rhythms of the Deep", duration: "38:40", date: "May 19, 2026", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "3", title: "Whispers in the Wind", duration: "45:10", date: "May 26, 2026", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "4", title: "The Soil's Secret Language", duration: "40:05", date: "June 02, 2026", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

const RESOURCES = [
  { title: "Study Guide PDF", type: "Document", size: "2.4 MB" },
  { title: "Visual Meditation Gallery", type: "Media", size: "12 Assets" },
  { title: "Biblical References Index", type: "Reference", size: "8 Pages" },
];

function SeasonDetailsPage() {
  const { seasonId } = Route.useParams();
  const { playEpisode } = usePodcast();


  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Season Header */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <Link to="/podcast" className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest mb-10 hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" /> Back to Podcast
            </Link>
            
            <div className="grid lg:grid-cols-[1.2fr_2fr] gap-12 items-end">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" alt="Season Cover" className="w-full h-full object-cover" />
              </div>
              <div className="pb-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70">Series One</span>
                <h1 className="mt-4 font-display text-5xl sm:text-7xl font-medium tracking-tight text-foreground">
                  The Wonder of <span className="italic text-primary">Creation</span>
                </h1>
                <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-muted-foreground">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Season {seasonId} • 2026</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 12 Episodes</span>
                  <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-foreground">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-[2fr_1fr] gap-16">
          {/* Episode List */}
          <div className="space-y-12">
            <h2 className="font-display text-3xl font-medium text-foreground">Episodes</h2>
            <div className="space-y-4">
              {EPISODES.map((ep) => (
                <div key={ep.id} className="group flex items-center justify-between p-6 rounded-3xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-6">
                    <a 
                      href="https://godsgreatearth.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all cursor-pointer"
                    >
                      <Play className="h-5 w-5 fill-current" />
                    </a>
                    <div>
                      <h4 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">{ep.id}. {ep.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{ep.date} • {ep.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="h-10 w-10 grid place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="h-10 w-10 grid place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-2xl bg-muted/50 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:bg-muted transition">
              Load More Episodes
            </button>
          </div>

          {/* Sidebar / Bonus Resources */}
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-3xl font-medium text-foreground mb-8">Bonus <span className="italic text-primary">Resources</span></h2>
              <div className="space-y-4">
                {RESOURCES.map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-cream/5 border border-border group hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 grid place-items-center rounded-xl bg-primary/5 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">{res.title}</h4>
                        <p className="text-xs text-muted-foreground">{res.type} • {res.size}</p>
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary/70">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-forest-deep text-cream">
              <h4 className="font-display text-xl mb-4">Never miss an episode</h4>
              <p className="text-sm text-cream/70 leading-relaxed mb-6">Get the latest stories and study materials delivered directly to your inbox.</p>
              <form className="space-y-3">
                <input type="email" placeholder="Your email" className="w-full px-5 py-3 rounded-xl bg-cream/10 border border-cream/10 text-sm focus:outline-none focus:border-gold/50" />
                <button className="w-full py-3 rounded-xl bg-gold text-gold-foreground font-bold text-sm uppercase tracking-widest hover:scale-105 transition">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
