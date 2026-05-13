import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Search, Filter, Tv, ChevronRight, Sparkles, Mic2, FileVideo, Clock, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/kids/library")({
  component: KidsLibraryPage,
});

function KidsLibraryPage() {
  const [activeTab, setActiveTab] = useState("Video");

  const CONTENT = [
    { id: 1, title: "The Lying Lion", type: "Video", series: "Friendly Forest", length: "12:45", img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&h=250&fit=crop" },
    { id: 2, title: "Noah's Song", type: "Audio", series: "Bible Buddies", length: "03:20", img: "https://images.unsplash.com/photo-1519340241574-211915c54970?w=400&h=250&fit=crop" },
    { id: 3, title: "Star Gazer 101", type: "Video", series: "Star Sailors", length: "15:00", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop" },
    { id: 4, title: "Miracle Melodies", type: "Audio", series: "Miracle Makers", length: "04:15", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&h=250&fit=crop" },
    { id: 5, title: "Forest Rhythms", type: "Audio", series: "Friendly Forest", length: "02:50", img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&h=250&fit=crop" },
    { id: 6, title: "Giant Slayer", type: "Video", series: "Bible Buddies", length: "18:20", img: "https://images.unsplash.com/photo-1519340241574-211915c54970?w=400&h=250&fit=crop" },
  ];

  const filteredContent = CONTENT.filter(c => c.type === activeTab);

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-20 bg-forest-deep text-cream relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
           <div className="relative mx-auto max-w-7xl px-6 text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-8 backdrop-blur-md">
                 <LayoutGrid className="h-4 w-4 text-gold" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Wonder Library</span>
              </div>
              <h1 className="font-display text-6xl font-bold tracking-tight mb-6">Explore the <span className="italic text-gold">Vault</span></h1>
              <p className="text-cream/70 text-lg max-w-2xl mx-auto">Access every video and audio adventure in the KidsBibleFlix collection.</p>
           </div>
        </section>

        {/* Tab Selection */}
        <section className="py-12 border-b border-cream/10 sticky top-24 z-30 bg-[#FAF7EE]/80 backdrop-blur-md">
           <div className="mx-auto max-w-7xl px-6 flex justify-center">
              <div className="bg-white p-2 rounded-[2.5rem] border border-cream/10 flex gap-2 shadow-xl">
                 {["Video", "Audio"].map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`flex items-center gap-3 px-10 py-4 rounded-[2rem] font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab ? "bg-forest-deep text-white shadow-glow scale-105" : "text-forest-deep/40 hover:bg-cream/50"}`}
                   >
                      {tab === "Video" ? <FileVideo className="h-4 w-4" /> : <Mic2 className="h-4 w-4" />}
                      {tab}s
                   </button>
                 ))}
              </div>
           </div>
        </section>

        {/* Library Grid */}
        <section className="py-24">
           <div className="mx-auto max-w-7xl px-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                 {filteredContent.map((c) => (
                   <Link key={c.id} to="/kids/watch" className="group bg-white rounded-[3rem] overflow-hidden border border-cream/10 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                         <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-forest-deep/20 group-hover:bg-transparent transition-all" />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                            <div className="h-16 w-16 rounded-full bg-gold text-forest-deep flex items-center justify-center shadow-2xl">
                               {c.type === "Video" ? <Play className="h-6 w-6 fill-current ml-1" /> : <Mic2 className="h-6 w-6" />}
                            </div>
                         </div>
                         <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-3 py-1 rounded-full">
                            {c.length}
                         </div>
                      </div>
                      <div className="p-8 space-y-4">
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{c.series}</span>
                            <div className="flex items-center gap-1 text-[10px] text-forest-deep/40 font-bold">
                               <Clock className="w-3 h-3" /> 
                               {c.type} Content
                            </div>
                         </div>
                         <h3 className="text-2xl font-display font-bold text-forest-deep group-hover:text-gold transition-colors">{c.title}</h3>
                         <div className="pt-4 flex items-center justify-between border-t border-cream/10">
                            <span className="text-xs font-bold text-forest-deep/40">Watch Now</span>
                            <ChevronRight className="h-4 w-4 text-gold group-hover:translate-x-1 transition-transform" />
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

import { LayoutGrid } from "lucide-react";
