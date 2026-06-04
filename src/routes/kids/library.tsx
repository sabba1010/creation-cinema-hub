import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Search, Filter, Tv, ChevronRight, Sparkles, Mic2, FileVideo, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { LayoutGrid } from "lucide-react";

export const Route = createFileRoute("/kids/library")({
  component: KidsLibraryPage,
});

function KidsLibraryPage() {
  const [activeTab, setActiveTab] = useState("Video");
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has active subscription
    const token = localStorage.getItem("token");
    const access = localStorage.getItem("kbf_access");
    if (token && access) {
      setHasAccess(true);
    }
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch("https://movie-backend-drab.vercel.app/api/kids/series");
        if (res.ok) {
          const data = await res.json();
          setSeriesList(data);
        }
      } catch (err) {
        console.error("Failed to fetch series", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeries();
  }, []);

  // Currently, all uploaded series are considered Video content.
  // In the future, you could add a 'type' field to the Series schema to differentiate.
  const filteredContent = seriesList.filter(() => activeTab === "Video");

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
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin h-10 w-10 border-4 border-gold border-t-transparent rounded-full" />
              </div>
            ) : filteredContent.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredContent.map((s) => (
                  <Link key={s._id || s.id} to="/kids/watch/$seriesId" params={{ seriesId: (s._id || s.id).toString() }} className="group bg-white rounded-[3rem] overflow-hidden border border-cream/10 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={s.image || s.img}
                        alt={s.name || s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-forest-deep/20 group-hover:bg-transparent transition-all" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                        <div className="h-16 w-16 rounded-full bg-gold text-forest-deep flex items-center justify-center shadow-2xl">
                          <Play className="h-6 w-6 fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-3 py-1 rounded-full">
                        {s.episodeCount ?? s.episodes ?? 0} EPS
                      </div>
                    </div>
                    <div className="p-8 space-y-4 flex-grow flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{s.topic || "Series"}</span>
                        <div className="flex items-center gap-1 text-[10px] text-forest-deep/40 font-bold uppercase">
                          <Tv className="w-3 h-3" />
                          Video Content
                        </div>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-forest-deep group-hover:text-gold transition-colors">{s.name || s.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mt-2">{s.description || s.desc}</p>
                      <div className="pt-4 mt-auto flex items-center justify-between border-t border-cream/10">
                        <span className="text-xs font-bold text-forest-deep/40">Watch Now</span>
                        <ChevronRight className="h-4 w-4 text-gold group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground font-medium text-lg border-2 border-dashed border-cream/20 rounded-[2rem] bg-white/50">
                {activeTab === "Audio" ? "Audio content is coming soon!" : "No series available yet. Check back later!"}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
