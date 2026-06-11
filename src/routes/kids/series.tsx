import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Search, Filter, Tv, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";

export const Route = createFileRoute("/kids/series")({
  component: KidsSeriesPage,
});

function KidsSeriesPage() {
  const [filter, setFilter] = useState("All");

  const CATEGORIES = ["All", "Animated", "Bible Stories", "Adventure"];

  const SERIES = [
    { id: 1, title: "Friendly Forest", type: "Animated", eps: 12, img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=600", desc: "Teaching kindness through forest adventures.", color: "forest" },
    { id: 2, title: "Star Sailors", type: "Animated", eps: 8, img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600", desc: "Exploring the wonders of God's universe.", color: "gold" },
    { id: 3, title: "Miracle Makers", type: "Bible Stories", eps: 15, img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600", desc: "Re-living the incredible miracles of Jesus.", color: "earth" },
    { id: 4, title: "Bible Buddies", type: "Animated", eps: 24, img: "https://images.unsplash.com/photo-1519340241574-211915c54970?auto=format&fit=crop&q=80&w=600", desc: "Classic Bible stories for the little ones.", color: "sage" },
    { id: 5, title: "Wonder Quest", type: "Adventure", eps: 10, img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600", desc: "Nature walks and faith-building discoveries.", color: "forest" },
    { id: 6, title: "Parable Party", type: "Animated", eps: 18, img: "https://images.unsplash.com/photo-1550133730-69513a51d71f?auto=format&fit=crop&q=80&w=600", desc: "Understanding the stories Jesus told.", color: "gold" },
  ];

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-24 bg-forest-deep text-cream relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
           <div className="mx-auto max-w-7xl px-6 relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                 <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                       <Sparkles className="h-3.5 w-3.5 text-gold" />
                       <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Our Collection</span>
                    </div>
                    <h1 className="font-display text-6xl font-bold tracking-tight">Browse <span className="italic text-gold">Series</span></h1>
                    <p className="text-cream/70 text-lg max-w-md">Pick a series and start your next faith-filled adventure!</p>
                 </div>
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                    <input 
                      type="text" 
                      placeholder="Search series..." 
                      className="bg-white/5 border border-white/10 rounded-[2rem] pl-12 pr-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-gold/30 transition-all w-full md:w-[350px] backdrop-blur-md"
                    />
                 </div>
              </div>
           </div>
        </section>

        {/* Filter Section */}
        <section className="py-10 bg-white/50 border-b border-cream/10 backdrop-blur-sm sticky top-24 z-30">
           <div className="mx-auto max-w-7xl px-6 flex items-center gap-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 text-forest-deep/40 mr-4">
                 <Filter className="h-4 w-4" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Filter By:</span>
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filter === cat ? "bg-forest-deep text-white shadow-xl scale-105" : "bg-white text-forest-deep/60 hover:bg-white/80 border border-cream/10"}`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </section>

        {/* Series Grid */}
        <section className="py-24">
           <div className="mx-auto max-w-7xl px-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                 {SERIES.filter(s => filter === "All" || s.type === filter || s.type.includes(filter)).map((s) => (
                   <Link key={s.id} to="/kids/watch" className="group flex flex-col bg-white rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-cream/10">
                      <div className="relative aspect-video overflow-hidden">
                         <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                         <div className="absolute inset-0 bg-forest-deep/20 group-hover:bg-transparent transition-all" />
                         <div className="absolute top-6 left-6 h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                            <Tv className="h-6 w-6" />
                         </div>
                         <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                            <Badge className="bg-gold text-forest-deep border-none font-black text-[9px] uppercase tracking-widest py-1.5 px-4 shadow-xl">New Episodes</Badge>
                         </div>
                      </div>
                      <div className="p-10 flex-grow space-y-5">
                         <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest text-forest-deep border-forest-deep/10 px-4 py-1">{s.type}</Badge>
                            <span className="text-[10px] font-bold text-forest-deep/40 uppercase tracking-widest">{s.eps} Episodes</span>
                         </div>
                         <h3 className="text-3xl font-display font-bold text-forest-deep leading-tight group-hover:text-gold transition-colors">{s.title}</h3>
                         <p className="text-sm text-forest-deep/60 leading-relaxed line-clamp-2">{s.desc}</p>
                         
                         <div className="pt-6 flex items-center justify-between border-t border-cream/10">
                            <div className="flex items-center gap-2 text-forest-deep font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                               Start Watching <ChevronRight className="h-4 w-4 text-gold" />
                            </div>
                            <div className="h-12 w-12 rounded-full bg-cream/50 flex items-center justify-center text-forest-deep group-hover:bg-gold group-hover:text-forest-deep transition-all shadow-sm">
                               <Play className="h-5 w-5 fill-current ml-1" />
                            </div>
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
