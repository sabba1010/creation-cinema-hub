import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, MessageCircle, FileText, Share2, Settings, Maximize, Volume2, User, Users, Clock, ArrowLeft } from "lucide-react";
import ReactPlayer from "react-player";

export const Route = createFileRoute("/prayer/video")({
  component: VideoAccessPage,
});

function VideoAccessPage() {
  const search = Route.useSearch() as { url?: string; title?: string; day?: string; desc?: string };
  const { url, title, day, desc } = search;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24 bg-foreground"> {/* Dark background for video focus */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid lg:grid-cols-[1fr_350px] gap-8">
            {/* Video Player Area */}
            <div className="space-y-8">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl group border border-white/5">
                {url ? (
                  <ReactPlayer 
                    url={url} 
                    width="100%" 
                    height="100%" 
                    playing 
                    controls 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <p>No video URL provided for this episode.</p>
                  </div>
                )}
              </div>

              <div className="text-cream space-y-4">
                <Link to="/prayer" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 text-sm font-bold tracking-widest uppercase mb-4 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Series
                </Link>
                <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-widest">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" /> Live Now • Day {day || "01"}
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">{title || "Session Audio / Video"}</h1>
                <p className="text-cream/60 leading-relaxed max-w-3xl">
                  {desc || "Join us as we reflect on the physical and spiritual implications of divine light in our lives."}
                </p>
                
                <div className="pt-6 flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-cream hover:bg-white/20 transition">
                    <FileText className="h-4 w-4" /> Night 01 Study Guide
                  </button>
                  <button className="flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-cream hover:bg-white/20 transition">
                    <Share2 className="h-4 w-4" /> Share Stream
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar / Next Sessions & Chat */}
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-gold/80">Program Schedule</h3>
                 <div className="space-y-3">
                    {[
                      { n: "01", t: "The Architecture of Light", status: "Now Playing", active: true },
                      { n: "02", t: "Rhythms of the Deep", status: "June 15", active: false },
                      { n: "03", t: "Whispers in the Wind", status: "June 16", active: false },
                      { n: "04", t: "The Soil's Secret", status: "June 17", active: false },
                    ].map((session) => (
                      <div 
                        key={session.n} 
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${session.active ? "bg-gold text-gold-foreground border-gold" : "bg-white/5 border-white/5 text-cream/40 hover:bg-white/10"}`}
                      >
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold opacity-50">{session.n}</span>
                            <span className="text-xs font-bold truncate max-w-[120px]">{session.t}</span>
                         </div>
                         <span className="text-[8px] font-bold uppercase tracking-tighter opacity-70">{session.status}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col h-[350px]">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gold/80">Live Chat</h3>
                  <Users className="h-4 w-4 text-white/40" />
                </div>
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {[
                    { u: "Faith77", m: "Amen! Such a powerful opening." },
                    { u: "SarahE", m: "The cinematography is stunning tonight." },
                    { u: "DavidW", m: "Praying for everyone joining tonight." },
                  ].map((msg, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[11px] font-bold text-gold">{msg.u}</p>
                      <p className="text-sm text-cream/70 leading-relaxed">{msg.m}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-white/10">
                  <input type="text" placeholder="Join chat..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-cream focus:outline-none focus:border-gold/30" />
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-gold text-gold-foreground">
                <h4 className="font-display text-xl mb-3">Partner with OMS</h4>
                <p className="text-xs leading-relaxed mb-6 opacity-80">Your support helps us keep the Week of Prayer free for churches and schools worldwide.</p>
                <button className="w-full py-3 rounded-xl bg-gold-foreground text-gold font-bold text-xs uppercase tracking-widest hover:scale-105 transition">Give a Gift</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
