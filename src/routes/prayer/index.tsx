import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { Calendar, Play, BookOpen, Share2, Users, Heart, ArrowRight, ShieldCheck } from "lucide-react";
import { Badge } from "../../components/ui/badge";
const eventImg = "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1200";

export const Route = createFileRoute("/prayer/")({
  component: PrayerLandingPage,
});

function PrayerLandingPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Prayer Hero */}
        <section className="relative py-32 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-gold/90 mb-8 block animate-fade-up">Global Annual Event</span>
            <h1 className="font-display text-6xl sm:text-8xl font-medium tracking-tight leading-[0.9] animate-fade-up [animation-delay:150ms]">
              Week of <span className="italic text-gold">Prayer</span> Online
            </h1>
            <p className="mt-10 mx-auto max-w-2xl text-xl text-cream/75 leading-relaxed animate-fade-up [animation-delay:300ms]">
              Seven nights of worship, biblical teaching, and guided prayer streamed live to homes, churches, and schools around the globe.
            </p>
            
            <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-up [animation-delay:450ms]">
              <Link to="/prayer/video" className="rounded-full bg-gold px-10 py-5 text-sm font-bold uppercase tracking-widest text-gold-foreground shadow-glow hover:scale-105 transition-all">
                Access Event Now
              </Link>
              <button className="rounded-full border border-cream/25 px-10 py-5 text-sm font-bold uppercase tracking-widest text-cream hover:bg-cream/10 transition-all">
                Download Promo Kit
              </button>
            </div>
          </div>
        </section>

        {/* Benefits/Features */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: Users, title: "Global Community", desc: "Pray alongside thousands of families and churches in over 100 countries." },
                { icon: BookOpen, title: "Study Guides", desc: "Detailed PDF resources for each night to deepen your experience." },
                { icon: ShieldCheck, title: "Member Dashboard", desc: "Personalized access to all past seasons and bonus materials." },
              ].map((f, i) => (
                <div key={i} className="group p-10 rounded-[2.5rem] bg-card border border-border hover:border-primary/20 hover:shadow-xl transition-all">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-foreground mb-4">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nightly Schedule */}
        <section className="py-24 bg-cream/5 border-y border-border">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <h2 className="font-display text-4xl font-medium text-foreground">Nightly <span className="italic text-primary">Encounters</span></h2>
                <p className="mt-4 text-muted-foreground">Each night focuses on a unique aspect of creation and our Creator.</p>
              </div>
              <div className="text-sm font-bold text-primary uppercase tracking-widest mt-4">7 Nights • June 14-20</div>
            </div>

            <div className="space-y-4">
              {[
                { n: "01", t: "The Architecture of Light", status: "Live Now", color: "forest" },
                { n: "02", t: "Rhythms of the Deep", status: "Coming Soon", color: "muted" },
                { n: "03", t: "Whispers in the Wind", status: "Coming Soon", color: "muted" },
                { n: "04", t: "The Soil's Secret", status: "Coming Soon", color: "muted" },
                { n: "05", t: "The Celestial Clockwork", status: "Locked", color: "muted" },
                { n: "06", t: "Life in Paradox", status: "Locked", color: "muted" },
                { n: "07", t: "The Sabbath Rest", status: "Locked", color: "muted" },
              ].map((night) => (
                <Link 
                  key={night.n} 
                  to="/prayer/video"
                  className="flex items-center justify-between p-8 rounded-3xl bg-card border border-border group hover:border-primary/40 hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-8">
                    <span className="font-display text-3xl text-muted-foreground/30 group-hover:text-primary/40 transition-colors">{night.n}</span>
                    <div>
                      <h4 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">{night.t}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Evening Session • 7:00 PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge 
                      variant={night.status === "Live Now" ? "default" : "outline"}
                      className={night.status === "Live Now" ? "bg-emerald-500 animate-pulse text-white border-none" : "opacity-50"}
                    >
                      {night.status}
                    </Badge>
                    <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-cream group-hover:border-primary transition-all shadow-sm">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Promo Materials CTA */}
        <section className="py-32 bg-forest-deep text-cream overflow-hidden relative">
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-[radial-gradient(circle_at_right,var(--gold),transparent_70%)]" />
          <div className="mx-auto max-w-7xl px-6 relative">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl sm:text-5xl font-medium leading-tight">Bring the Week of Prayer to your <span className="italic text-gold">Church</span></h2>
              <p className="mt-8 text-lg text-cream/70 leading-relaxed">
                Our Promo Kit includes everything you need: social media graphics, invitation videos, bulletin inserts, and a technical guide for group streaming.
              </p>
              <button className="mt-10 rounded-full bg-cream px-10 py-4 text-sm font-bold uppercase tracking-widest text-forest-deep hover:scale-105 transition-all">
                Download Promo Materials
              </button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
