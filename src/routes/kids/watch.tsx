import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, ArrowLeft, Maximize, Volume2, Settings, MessageSquare, Heart, Share2, ChevronRight, X, Sparkles, Star } from "lucide-react";

export const Route = createFileRoute("/kids/watch")({
  component: KidsWatchPage,
});

function KidsWatchPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-8">
          <div className="mb-8 flex items-center justify-between">
             <Link to="/kids" className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-all">
                <ArrowLeft className="h-4 w-4" /> Back to KidsFlix
             </Link>
             <div className="hidden sm:flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-yellow-400 rounded-full">New Episode</span>
                <h1 className="font-display text-xl font-bold text-gray-900">Friendly Forest: The Secret Sprout</h1>
             </div>
             <button className="h-10 w-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200 transition">
                <Heart className="h-5 w-5" />
             </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Player Area */}
            <div className="space-y-8">
              <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-gray-900 shadow-2xl border-[12px] border-white group">
                {/* Simulated Player UI */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl">
                      <Play className="h-10 w-10 fill-current ml-1" />
                   </div>
                </div>
                
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="h-3 w-full bg-white/20 rounded-full mb-6 overflow-hidden">
                      <div className="h-full w-[35%] bg-yellow-400 shadow-glow" />
                   </div>
                   <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-8">
                         <Play className="h-6 w-6 fill-current" />
                         <Volume2 className="h-6 w-6" />
                         <span className="text-sm font-bold">08:12 / 24:00</span>
                      </div>
                      <div className="flex items-center gap-8 text-white/70">
                         <Settings className="h-6 w-6 hover:text-white transition" />
                         <Maximize className="h-6 w-6 hover:text-white transition" />
                      </div>
                   </div>
                </div>
              </div>

              <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Friendly Forest</h2>
                       <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">Season 1 · Episode 4: The Secret Sprout</p>
                    </div>
                    <div className="flex gap-4">
                       <button className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition">
                          <Share2 className="h-6 w-6" />
                       </button>
                    </div>
                 </div>
                 <p className="text-gray-500 leading-relaxed max-w-3xl">
                    Barnaby the Bear finds a tiny sprout in a place where nothing ever grows. Join the forest friends as they learn about patience, care, and how God makes all things grow in His perfect time!
                 </p>
                 <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-8">
                    <div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Focus Value</span>
                       <span className="font-bold text-purple-600">Patience</span>
                    </div>
                    <div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Bible Verse</span>
                       <span className="font-bold text-emerald-600">Psalm 37:7</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Up Next Sidebar */}
            <div className="space-y-8">
              <div className="p-8 rounded-[3rem] bg-white border border-gray-100 shadow-sm">
                 <h3 className="font-bold text-gray-900 mb-8 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    More to Watch
                 </h3>
                 <div className="space-y-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-4 group cursor-pointer">
                         <div className="relative w-32 aspect-video rounded-2xl overflow-hidden bg-gray-100 shrink-0 border-2 border-transparent group-hover:border-blue-500 transition-all">
                            <img src={`https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=200&sig=${i}`} alt="Next" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <Play className="h-6 w-6 text-white fill-current" />
                            </div>
                         </div>
                         <div className="py-1">
                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">Episode {i+4}: The Great Rain</h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">24 min</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-10 py-4 rounded-2xl bg-gray-50 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">View Series Library</button>
              </div>

              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-yellow-400 to-orange-400 text-yellow-950 shadow-xl relative overflow-hidden group cursor-pointer">
                 <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                    <Star className="h-32 w-32" />
                 </div>
                 <h4 className="font-display text-2xl font-bold mb-4 italic">Parent Guide</h4>
                 <p className="text-xs font-bold text-yellow-900/70 leading-relaxed mb-6">Download the "Friendly Forest" discussion guide to talk about patience with your little ones tonight.</p>
                 <button className="w-full py-4 rounded-2xl bg-yellow-950 text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:translate-y-[-2px] transition-all">Get Guide</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
