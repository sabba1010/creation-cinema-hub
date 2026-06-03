import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, ArrowLeft, Share2, ChevronRight, Sparkles, Star } from "lucide-react";

export const Route = createFileRoute("/kids/watch/$seriesId")({
  component: KidsWatchPage,
});

function KidsWatchPage() {
  const { seriesId } = Route.useParams();

  const [series, setSeries] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Step 1: Fetch series FIRST to get banner image for episode thumbnail fallback
        const seriesRes = await fetch(`https://movie-backend-drab.vercel.app/api/kids/series/${seriesId}`);
        if (!seriesRes.ok) return;
        const seriesData = await seriesRes.json();
        const seriesObj = {
          ...seriesData,
          id: seriesData._id,
          desc: seriesData.description,
          img: seriesData.image
        };
        setSeries(seriesObj);

        // Step 2: THEN fetch episodes, using series banner image as fallback thumbnail
        const epRes = await fetch(`https://movie-backend-drab.vercel.app/api/kids/series/${seriesId}/episodes`);
        if (epRes.ok) {
          const data = await epRes.json();
          const mappedEpisodes = data.map((ep: any) => ({
            ...ep,
            id: ep._id,
            img: ep.image || seriesData.image || "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=800&h=400&fit=crop",
            link: ep.vimeoLink || ep.trailer || ""
          }));
          setEpisodes(mappedEpisodes);
          if (mappedEpisodes.length > 0) {
            setActiveEpisodeId(mappedEpisodes[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch watch data", err);
      }
    };

    if (seriesId) fetchAll();
  }, [seriesId]);

  if (!series) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow pt-32 pb-20 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">Loading Adventure...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const activeEpisode = episodes.find(e => e.id === activeEpisodeId) || episodes[0] || null;
  const currentTitle = activeEpisode?.title || series.name;
  const currentDesc = activeEpisode?.description || series.desc;
  const currentLink = activeEpisode?.link || series.trailer;

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
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-yellow-400 rounded-full">Now Playing</span>
              <h1 className="font-display text-xl font-bold text-gray-900">{series.name}: {currentTitle}</h1>
            </div>
            <button className="h-10 w-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200 transition">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Player Area */}
            <div className="space-y-8">
              <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-gray-900 shadow-2xl border-[12px] border-white group">
                {currentLink ? (
                  <iframe
                    src={currentLink.replace("vimeo.com", "player.vimeo.com/video").replace(/\?.*/, "")}
                    title={currentTitle}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={activeEpisode?.img || series.img}
                      alt={currentTitle}
                      className="w-full h-full object-cover opacity-50"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=800&h=400&fit=crop"; }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 px-6 py-3 rounded-full text-white font-bold tracking-widest uppercase text-sm">
                        Video Unavailable
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">{series.name}</h2>
                    <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">{currentTitle}</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition">
                      <Share2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed max-w-3xl whitespace-pre-wrap">
                  {currentDesc}
                </p>
                <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-8">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Focus Virtue</span>
                    <span className="font-bold text-purple-600">{series.topic}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Total Episodes</span>
                    <span className="font-bold text-emerald-600">{episodes.length}</span>
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
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {episodes.map((ep) => (
                    <div
                      key={ep.id}
                      className={`flex gap-4 group cursor-pointer p-3 rounded-2xl transition-all ${activeEpisodeId === ep.id ? 'bg-blue-50/80 ring-1 ring-blue-100' : 'hover:bg-gray-50'}`}
                      onClick={() => setActiveEpisodeId(ep.id)}
                    >
                      <div className={`relative w-32 aspect-video rounded-2xl overflow-hidden bg-gray-100 shrink-0 border-2 transition-all ${activeEpisodeId === ep.id ? 'border-blue-500 shadow-md' : 'border-transparent group-hover:border-blue-300'}`}>
                        <img
                          src={ep.img}
                          alt={ep.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = series?.img || "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop";
                          }}
                        />
                        {activeEpisodeId !== ep.id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-6 w-6 text-white fill-current" />
                          </div>
                        )}
                        {activeEpisodeId === ep.id && (
                          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                            <Play className="h-5 w-5 text-blue-600 fill-current" />
                          </div>
                        )}
                      </div>
                      <div className="py-1">
                        <h4 className={`text-sm font-bold transition-colors leading-tight ${activeEpisodeId === ep.id ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-500'}`}>
                          {ep.title}
                        </h4>
                        {ep.description && (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{ep.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {episodes.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No episodes available.
                    </div>
                  )}
                </div>
                <Link to="/kids/library" className="w-full mt-8 py-4 rounded-2xl bg-gray-50 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  View Full Series <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-yellow-400 to-orange-400 text-yellow-950 shadow-xl relative overflow-hidden group cursor-pointer">
                <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                  <Star className="h-32 w-32" />
                </div>
                <h4 className="font-display text-2xl font-bold mb-4 italic">Parent Guide</h4>
                <p className="text-xs font-bold text-yellow-900/70 leading-relaxed mb-6">
                  Download the "{series.name}" discussion guide to talk about {series.topic} with your little ones tonight.
                </p>
                <button className="w-full py-4 rounded-2xl bg-yellow-950 text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:translate-y-[-2px] transition-all">
                  Get Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
