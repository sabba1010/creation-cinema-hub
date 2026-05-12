import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, MessageCircle, FileText, Share2, Settings, Maximize, Volume2, User, Clock } from "lucide-react";

export const Route = createFileRoute("/prayer/video")({
  component: VideoAccessPage,
});

function VideoAccessPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24 bg-foreground"> {/* Dark background for video focus */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid lg:grid-cols-[1fr_350px] gap-8">
            {/* Video Player Area */}
            <div className="space-y-8">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl group border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-gold/90 text-gold-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-glow">
                    <Play className="h-8 w-8 fill-current" />
                  </div>
                </div>
                {/* Simulated Player Controls */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-1 w-full bg-white/20 rounded-full mb-4 overflow-hidden">
                    <div className="h-full w-[35%] bg-gold" />
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-6">
                      <Play className="h-4 w-4 fill-current" />
                      <Volume2 className="h-4 w-4" />
                      <span className="text-xs font-medium">12:45 / 45:00</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <Settings className="h-4 w-4" />
                      <Maximize className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-cream space-y-4">
                <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-widest">
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" /> Live Now • Night 01
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">The Architecture of Light</h1>
                <p className="text-cream/60 leading-relaxed max-w-3xl">
                  In our opening night, we explore the first creative act: "Let there be light." Join us as we reflect on the physical and spiritual implications of divine light in our lives.
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

            {/* Sidebar / Live Chat & Materials */}
            <div className="space-y-8">
              <div className="rounded-[2rem] bg-white/5 border border-white/10 flex flex-col h-[500px]">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gold/80">Live Community</h3>
                  <Users className="h-4 w-4 text-white/40" />
                </div>
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {[
                    { u: "Faith77", m: "Amen! Such a powerful opening." },
                    { u: "ChurchLeader", m: "Greetings from South Africa! We are watching as a group." },
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
                  <input type="text" placeholder="Join the conversation..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:outline-none focus:border-gold/30" />
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
