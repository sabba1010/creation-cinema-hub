import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, ArrowLeft, ChevronRight, Sparkles, Star, Lock, Mic2, Eye, Crown } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const Route = createFileRoute("/kids/watch/$seriesId")({
  component: KidsWatchPage,
});

function KidsWatchPage() {
  const { seriesId } = Route.useParams();

  const [series, setSeries] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [accessType, setAccessType] = useState<string | null>(null);
  // tracks views: { episodeId -> viewCount }
  const [episodeViews, setEpisodeViews] = useState<Record<string, number>>({});
  // session dedup so re-selecting same episode doesn't re-count
  const viewedThisSession = useRef<Set<string>>(new Set());

  // Real backend access check
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (!token) { setCheckingAccess(false); return; }

    // Quick local check
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.kidsAccess) { setHasAccess(true); setAccessType(user.kidsAccessType); }
      } catch { }
    }

    fetch(`${API_URL}/api/kids/access`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        setHasAccess(data.hasAccess || false);
        setAccessType(data.accessType || null);
      })
      .catch(() => { })
      .finally(() => setCheckingAccess(false));
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const headers: HeadersInit = token ? { "Authorization": `Bearer ${token}` } : {};
        
        // Step 1: Fetch series FIRST to get banner image for episode thumbnail fallback
        const seriesRes = await fetch(`${API_URL}/api/kids/series/${seriesId}`, { headers });
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
        const epRes = await fetch(`${API_URL}/api/kids/series/${seriesId}/episodes`, { headers });
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

  // Track a view whenever the active episode changes
  useEffect(() => {
    if (!activeEpisodeId || viewedThisSession.current.has(activeEpisodeId)) return;
    viewedThisSession.current.add(activeEpisodeId);

    fetch(`${API_URL}/api/kids/episodes/${activeEpisodeId}/view`, { method: 'POST' })
      .then(r => r.json())
      .then(data => {
        if (typeof data.views === 'number') {
          setEpisodeViews(prev => ({ ...prev, [activeEpisodeId]: data.views }));
        }
      })
      .catch(() => {/* silent */ });
  }, [activeEpisodeId]);

  // Seed initial view counts from fetched episodes
  useEffect(() => {
    if (episodes.length === 0) return;
    const initial: Record<string, number> = {};
    episodes.forEach(ep => { initial[ep.id] = ep.views || 0; });
    setEpisodeViews(initial);
  }, [episodes]);

  if (checkingAccess || !series) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow pt-32 pb-20 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">{checkingAccess ? "Verifying Access..." : "Loading Adventure..."}</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // No access — show paywall overlay
  if (!hasAccess) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow pt-24">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <Link to="/kids/library" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-forest-deep transition-all mb-12">
              <ArrowLeft className="h-4 w-4" /> Back to Library
            </Link>
            {/* Blurred series preview */}
            <div className="relative rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
              <img src={series.img || series.image} alt={series.name} className="w-full aspect-video object-cover blur-md opacity-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-forest-deep/60">
                <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mb-6 border border-white/20">
                  <Lock className="h-10 w-10 text-gold" />
                </div>
                <h1 className="text-white font-display text-3xl font-bold mb-2">{series.name}</h1>
                <p className="text-white/60 text-sm">{series.topic} Series · {series.episodeCount || 0} Episodes</p>
              </div>
            </div>
            <div className="bg-white rounded-[3rem] p-12 border border-[#EFECE3] shadow-xl">
              <Crown className="h-12 w-12 text-gold mx-auto mb-6" />
              <h2 className="font-display text-3xl font-bold text-forest-deep mb-4">Unlock This Series</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                Subscribe to KidsBibleFlix to watch <strong>{series.name}</strong> and access the full library of kid-safe Bible content.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Link to="/kids/subscribe" className="block py-5 rounded-3xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-forest-deep/90 transition-all text-center">
                  View Plans →
                </Link>
                <Link to="/kids/subscribe" className="block py-5 rounded-3xl bg-gold text-forest-deep font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-gold/90 transition-all text-center">
                  Get Lifetime — $99
                </Link>
              </div>
              <p className="text-xs text-muted-foreground">Already subscribed? <Link to="/login" search={{ redirect: `/kids/watch/${seriesId}`, theme: "kids" }} className="text-gold font-bold hover:underline">Sign in</Link></p>
            </div>
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
  const currentAudio = activeEpisode?.audioLink || series.audioLink;

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-8">
          <div className="mb-8 relative flex items-center justify-center min-h-[40px]">
            <Link to="/kids/library" className="absolute left-0 flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-all">
              <ArrowLeft className="h-4 w-4" /> Back to Library
            </Link>
            <div className="hidden sm:flex items-center justify-center gap-4 w-full max-w-[60%]">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-yellow-400 rounded-full shrink-0">Now Playing</span>
              <h1 className="font-display text-xl font-bold text-gray-900 truncate">
                {series.name}{series.name !== currentTitle ? `: ${currentTitle}` : ''}
              </h1>
            </div>
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
                ) : currentAudio ? (
                  <div className="absolute inset-0 w-full h-full bg-forest-deep flex flex-col items-center justify-center p-6 text-cream">
                    <img
                      src={activeEpisode?.img || series.img}
                      alt={currentTitle}
                      className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />
                    <div className="relative z-10 flex flex-col items-center w-full max-w-md">
                      <Mic2 className="h-20 w-20 text-gold mb-6 opacity-90 drop-shadow-lg" />
                      <h3 className="text-2xl font-bold mb-8 text-center drop-shadow-md">{currentTitle}</h3>
                      <audio controls src={currentAudio} className="w-full shadow-2xl rounded-full" />
                    </div>
                  </div>
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
                        Content Unavailable
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
                    {/* <button className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition">
                      <Share2 className="h-6 w-6" />
                    </button> */}
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
                  {activeEpisode && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Episode Views</span>
                      <span className="font-bold text-blue-500 flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {(episodeViews[activeEpisode.id] ?? activeEpisode.views ?? 0).toLocaleString()}
                      </span>
                    </div>
                  )}
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
                        <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <Eye className="h-3 w-3" />
                          {(episodeViews[ep.id] ?? ep.views ?? 0).toLocaleString()} views
                        </span>
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
                <button
                  onClick={() => window.open(`${API_URL}/api/kids/sample-guide?series=${encodeURIComponent(series.name)}`, '_blank')}
                  className="w-full py-4 rounded-2xl bg-yellow-950 text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:translate-y-[-2px] transition-all">
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
