import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Search, Filter, Tv, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/kids/series")({
  component: KidsSeriesPage,
});

function KidsSeriesPage() {
  const [filter, setFilter] = useState("All");

  const CATEGORIES = ["All", "Animated", "Live Action", "Bible Stories", "Adventure"];

  const SERIES = [
    { id: 1, title: "Friendly Forest", type: "Animated", eps: 12, img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=600", desc: "Teaching kindness through forest adventures." },
    { id: 2, title: "Star Sailors", type: "Animated", eps: 8, img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600", desc: "Exploring the wonders of God's universe." },
    { id: 3, title: "Miracle Makers", type: "Live Action", eps: 15, img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600", desc: "Re-living the incredible miracles of Jesus." },
    { id: 4, title: "Bible Buddies", type: "Animated", eps: 24, img: "https://images.unsplash.com/photo-1519340241574-211915c54970?auto=format&fit=crop&q=80&w=600", desc: "Classic Bible stories for the little ones." },
    { id: 5, title: "Wonder Quest", type: "Adventure", eps: 10, img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600", desc: "Nature walks and faith-building discoveries." },
    { id: 6, title: "Parable Party", type: "Animated", eps: 18, img: "https://images.unsplash.com/photo-1550133730-69513a51d71f?auto=format&fit=crop&q=80&w=600", desc: "Understanding the stories Jesus told." },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-16 bg-blue-600 text-white">
           <div className="mx-auto max-w-7xl px-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                 <div>
                    <h1 className="font-display text-5xl font-bold tracking-tight mb-4">Browse <span className="italic text-yellow-300">Series</span></h1>
                    <p className="text-white/80 text-lg">Pick a series and start your next adventure!</p>
                 </div>
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input 
                      type="text" 
                      placeholder="Search series..." 
                      className="bg-white/10 border border-white/20 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all w-full md:w-[300px]"
                    />
                 </div>
              </div>
           </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b border-gray-100">
           <div className="mx-auto max-w-7xl px-6 flex items-center gap-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 text-gray-400 mr-4">
                 <Filter className="h-4 w-4" />
                 <span className="text-xs font-bold uppercase tracking-widest">Filter:</span>
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </section>

        {/* Series Grid */}
        <section className="py-20">
           <div className="mx-auto max-w-7xl px-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                 {SERIES.filter(s => filter === "All" || s.type === filter || s.type.includes(filter)).map((s) => (
                   <Link key={s.id} to="/kids/watch" className="group flex flex-col bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
                      <div className="relative aspect-video overflow-hidden">
                         <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                         <div className="absolute top-4 left-4 h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                            <Tv className="h-5 w-5" />
                         </div>
                         <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">New Episodes</span>
                         </div>
                      </div>
                      <div className="p-8 flex-grow space-y-4">
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{s.type}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.eps} Episodes</span>
                         </div>
                         <h3 className="text-2xl font-bold text-gray-900 leading-tight">{s.title}</h3>
                         <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{s.desc}</p>
                         <div className="pt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                               Start Watching <ChevronRight className="h-4 w-4" />
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                               <Play className="h-5 w-5 fill-current" />
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
