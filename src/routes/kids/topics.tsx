import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Heart, ShieldCheck, Sparkles, Music, Star, Sun, Cloud, Anchor, Play, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/kids/topics")({
  component: KidsTopicsPage,
});

function KidsTopicsPage() {
  const TOPICS = [
    { name: "Kindness", icon: Heart, color: "text-rose-500", bg: "bg-rose-50", desc: "Learning to love others as Jesus loves us." },
    { name: "Courage", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50", desc: "Being brave because God is with us always." },
    { name: "Creation", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-50", desc: "Exploring the wonder of God's handiwork." },
    { name: "Worship", icon: Music, color: "text-purple-500", bg: "bg-purple-50", desc: "Singing and praising with joyful hearts." },
    { name: "Honesty", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50", desc: "The value of telling the truth in all things." },
    { name: "Joy", icon: Sun, color: "text-orange-500", bg: "bg-orange-50", desc: "Finding happiness in the Lord's goodness." },
    { name: "Peace", icon: Cloud, color: "text-cyan-500", bg: "bg-cyan-50", desc: "Trusting God when things feel stormy." },
    { name: "Faith", icon: Anchor, color: "text-indigo-500", bg: "bg-indigo-50", desc: "Holding on to God's promises forever." },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-20 bg-purple-600 text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
              <Star className="absolute -top-10 -right-10 h-64 w-64" />
           </div>
           <div className="relative mx-auto max-w-7xl px-6 text-center">
              <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-6">Growing in <span className="italic text-yellow-300">Grace</span></h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">Discover stories that help kids grow in character and faith, one value at a time.</p>
           </div>
        </section>

        {/* Topics Grid */}
        <section className="py-24">
           <div className="mx-auto max-w-7xl px-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {TOPICS.map((t, i) => (
                   <div key={i} className="group p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center text-center">
                      <div className={`h-24 w-24 rounded-[2rem] ${t.bg} ${t.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                         <t.icon className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{t.desc}</p>
                      <Link to="/kids/library" className={`w-full py-4 rounded-2xl ${t.bg} ${t.color} font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:shadow-md transition-all`}>
                         Explore {t.name} <ChevronRight className="h-4 w-4" />
                      </Link>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Theme Section */}
        <section className="py-24 bg-gray-900 text-white rounded-[4rem] mx-6 mb-24 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20">
              <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=2000" alt="Topic" className="w-full h-full object-cover" />
           </div>
           <div className="relative mx-auto max-w-7xl px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                 <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs mb-4 block">Topic of the Month</span>
                 <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-8">Exploring <span className="italic text-yellow-300">Creation</span></h2>
                 <p className="text-white/60 leading-relaxed text-lg mb-8">
                    This month, we're diving deep into the wonders of God's world. From the smallest seeds to the tallest mountains, see how everything shouts His praise!
                 </p>
                 <Link to="/kids/watch" className="inline-flex items-center gap-3 bg-yellow-400 text-yellow-950 px-10 py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                    <Play className="h-5 w-5 fill-current" /> Watch Featured Story
                 </Link>
              </div>
              <div className="w-full lg:w-1/2 aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10">
                 <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" alt="Creation" className="w-full h-full object-cover" />
              </div>
           </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
