import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { Heart, ShieldCheck, Sparkles, Music, Star, Sun, Cloud, Anchor, Play, ChevronRight } from "lucide-react";
import { Badge } from "../../components/ui/badge";

export const Route = createFileRoute("/kids/topics")({
  component: KidsTopicsPage,
});

function KidsTopicsPage() {
  const TOPICS = [
    { name: "Kindness", icon: Heart, color: "text-rose-500", bg: "bg-rose-50", desc: "Learning to love others as Jesus loves us." },
    { name: "Courage", icon: ShieldCheck, color: "text-forest-deep", bg: "bg-forest-deep/10", desc: "Being brave because God is with us always." },
    { name: "Creation", icon: Sparkles, color: "text-gold", bg: "bg-gold/10", desc: "Exploring the wonder of God's handiwork." },
    { name: "Worship", icon: Music, color: "text-earth", bg: "bg-earth/10", desc: "Singing and praising with joyful hearts." },
    { name: "Honesty", icon: Star, color: "text-gold", bg: "bg-gold/5", desc: "The value of telling the truth in all things." },
    { name: "Joy", icon: Sun, color: "text-gold", bg: "bg-gold/10", desc: "Finding happiness in the Lord's goodness." },
    { name: "Peace", icon: Cloud, color: "text-sage", bg: "bg-sage/10", desc: "Trusting God when things feel stormy." },
    { name: "Faith", icon: Anchor, color: "text-forest-deep", bg: "bg-forest-deep/5", desc: "Holding on to God's promises forever." },
  ];

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-24 bg-forest-deep text-cream relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
           <div className="relative mx-auto max-w-7xl px-6 text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-8 backdrop-blur-md">
                 <Sparkles className="h-4 w-4 text-gold" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Character Building</span>
              </div>
              <h1 className="font-display text-6xl sm:text-7xl font-bold tracking-tight mb-6">Growing in <span className="italic text-gold">Grace</span></h1>
              <p className="text-cream/70 text-lg max-w-2xl mx-auto">Discover stories that help kids grow in character and faith, one value at a time.</p>
           </div>
        </section>

        {/* Topics Grid */}
        <section className="py-24">
           <div className="mx-auto max-w-7xl px-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {TOPICS.map((t, i) => (
                   <div key={i} className="group p-10 rounded-[3.5rem] bg-white border border-cream/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center">
                      <div className={`h-24 w-24 rounded-[2.5rem] ${t.bg} ${t.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                         <t.icon className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-forest-deep mb-4 group-hover:text-gold transition-colors">{t.name}</h3>
                      <p className="text-forest-deep/60 text-sm leading-relaxed mb-8 flex-grow">{t.desc}</p>
                      <Link to="/kids/library" className={`w-full py-4 rounded-2xl ${t.bg} ${t.color} font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:shadow-md transition-all`}>
                         Explore {t.name} <ChevronRight className="h-4 w-4" />
                      </Link>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Theme Section */}
        <section className="py-24 bg-forest-deep text-cream rounded-[4rem] mx-6 mb-24 relative overflow-hidden shadow-2xl border border-white/5">
           <div className="absolute inset-0 opacity-20">
              <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=2000" alt="Topic" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-forest-deep/80" />
           </div>
           <div className="relative mx-auto max-w-7xl px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left space-y-8">
                 <div className="space-y-2">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Topic of the Month</span>
                    <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">Exploring <span className="italic text-gold font-medium">Creation</span></h2>
                 </div>
                 <p className="text-cream/60 leading-relaxed text-lg">
                    This month, we're diving deep into the wonders of God's world. From the smallest seeds to the tallest mountains, see how everything shouts His praise!
                 </p>
                 <Link to="/kids/watch" className="inline-flex items-center gap-3 bg-gold text-forest-deep px-10 py-5 rounded-3xl font-bold text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-all">
                    <Play className="h-5 w-5 fill-current" /> Watch Featured Story
                 </Link>
              </div>
              <div className="w-full lg:w-1/2 aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 rotate-2">
                 <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" alt="Creation" className="w-full h-full object-cover" />
              </div>
           </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
