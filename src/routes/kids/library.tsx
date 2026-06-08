import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Search, Tv, ChevronRight, Mic2, FileVideo, Lock, Crown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { LayoutGrid } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";

export const Route = createFileRoute("/kids/library")({
  component: KidsLibraryPage,
});

const TOPICS = ["All", "Kindness", "Courage", "Creation", "Worship", "Honesty", "Joy", "Peace", "Faith"];

function KidsLibraryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeTopic, setActiveTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessType, setAccessType] = useState<string | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const navigate = useNavigate();

  // Real access check against backend
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const userData = localStorage.getItem("user_data");

    if (!token) {
      setCheckingAccess(false);
      return;
    }

    // Quick local check first
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.kidsAccess) {
          setHasAccess(true);
          setAccessType(user.kidsAccessType);
        }
      } catch { }
    }

    // Then verify with backend
    fetch(`${API_URL}/api/kids/access`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        setHasAccess(data.hasAccess || false);
        setAccessType(data.accessType || null);
        // Sync local user data
        if (userData) {
          try {
            const user = JSON.parse(userData);
            const updated = { ...user, kidsAccess: data.hasAccess, kidsAccessType: data.accessType };
            localStorage.setItem("user_data", JSON.stringify(updated));
          } catch { }
        }
      })
      .catch(() => { })
      .finally(() => setCheckingAccess(false));
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(`${API_URL}/api/kids/series`);
        if (res.ok) {
          const data = await res.json();
          setSeriesList(Array.isArray(data) ? data.filter((s: any) => s.status === 'Active') : []);
        }
      } catch (err) {
        console.error("Failed to fetch series", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeries();
  }, []);

  const filteredContent = seriesList.filter((s) => {
    // Tab filter
    const type = s.contentType || "Live-action";
    if (activeTab !== "All" && type !== activeTab) return false;

    // Topic filter
    if (activeTopic !== "All" && s.topic !== activeTopic) return false;

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!(s.name || "").toLowerCase().includes(q) && !(s.description || "").toLowerCase().includes(q) && !(s.topic || "").toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });

  if (checkingAccess) {
    return (
      <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow pt-32 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin h-10 w-10 border-4 border-gold border-t-transparent rounded-full" />
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">Checking Access...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // No access — paywall
  if (!hasAccess) {
    return (
      <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow pt-24">
          {/* Blurred preview */}
          <section className="py-20 bg-forest-deep text-cream relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
            <div className="relative mx-auto max-w-7xl px-6 text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-8 backdrop-blur-md">
                <Lock className="h-4 w-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Premium Content</span>
              </div>
              <h1 className="font-display text-6xl font-bold tracking-tight mb-6">Explore the <span className="italic text-gold">Vault</span></h1>
              <p className="text-cream/70 text-lg max-w-2xl mx-auto">Subscribe to unlock the full KidsBibleFlix library of video and audio adventures.</p>
            </div>
          </section>

          {/* Paywall Card */}
          <section className="py-24">
            <div className="mx-auto max-w-2xl px-6">
              <div className="bg-white rounded-[3rem] p-12 text-center border border-[#EFECE3] shadow-2xl">
                <div className="h-20 w-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8">
                  <Lock className="h-10 w-10 text-gold" />
                </div>
                <h2 className="font-display text-4xl font-bold text-forest-deep mb-4">Unlock Full Access</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Get unlimited access to all series, audio stories, Creation Case episodes, and OMS kids resources.
                  Start your <strong>{7}-day free trial</strong> today or get lifetime access for just <strong>$99</strong>.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {["100% Ad-free content", "All series & audio stories", "Creation Case episodes", "Downloadable guides", "New content added regularly", "Cancel anytime"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm font-medium text-forest-deep">
                      <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <svg className="h-3 w-3 text-emerald-600" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/kids/subscribe" className="block w-full py-5 rounded-3xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-forest-deep/90 transition-all">
                  View Plans & Subscribe →
                </Link>
                <p className="text-xs text-muted-foreground mt-4">Already subscribed? <Link to="/login" search={{ redirect: "/kids/library", theme: "kids" }} className="text-gold font-bold underline-offset-2 hover:underline">Sign in</Link></p>
              </div>
            </div>
          </section>

          {/* Blurred preview of series */}
          <section className="py-12 pb-24">
            <div className="mx-auto max-w-7xl px-6">
              <h3 className="font-display text-2xl font-bold text-forest-deep text-center mb-10">Preview What's Inside</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                {seriesList.slice(0, 6).map((s) => (
                  <div key={s._id || s.id} className="group bg-white rounded-[3rem] overflow-hidden border border-cream/10 shadow-sm flex flex-col relative">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={s.image || s.img} alt={s.name || s.title} className="w-full h-full object-cover blur-sm opacity-60" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop"; }} />
                      <div className="absolute inset-0 bg-forest-deep/40 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white opacity-80" />
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{s.topic}</p>
                      <h3 className="text-lg font-display font-bold text-forest-deep">{s.name || s.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-20 bg-forest-deep text-cream relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-6 backdrop-blur-md">
              <Crown className="h-4 w-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest capitalize">{accessType || "Premium"} Member</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-8 backdrop-blur-md ml-2">
              <LayoutGrid className="h-4 w-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Wonder Library</span>
            </div>
            <h1 className="font-display text-6xl font-bold tracking-tight mb-6">Explore the <span className="italic text-gold">Vault</span></h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto">Access every video and audio adventure in the KidsBibleFlix collection.</p>
          </div>
        </section>

        {/* Search + Filters */}
        <section className="py-6 border-b border-cream/20 bg-[#FAF7EE]/90 backdrop-blur-xl sticky top-20 z-30 shadow-sm transition-all">
          <div className="mx-auto max-w-7xl px-6 space-y-5">

            {/* Top Row: Search & Type */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 bg-white p-2 rounded-[2rem] shadow-sm border border-[#EFECE3] transition-all focus-within:ring-4 focus-within:ring-forest/5 focus-within:border-forest/20">
              {/* Search */}
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-forest-deep/40" />
                <input
                  type="text"
                  placeholder="Find a story, series, or topic..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-transparent text-sm font-medium text-forest-deep placeholder:text-forest-deep/40 focus:outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-forest-deep/40 hover:text-forest-deep transition-colors bg-[#FAF7EE] p-1.5 rounded-full">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Separator on desktop */}
              <div className="hidden md:block w-px h-8 bg-[#EFECE3] self-center" />

              {/* Content Type Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar px-2 pb-2 md:pb-0 md:px-0">
                {["All", "Live-action", "Audio Story", "Creation Case", "OMS Resource"].map((tab) => {
                  const valMap: any = { "Audio Story": "Audio", "OMS Resource": "OMS" };
                  const val = valMap[tab] || tab;
                  const isActive = activeTab === val;

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(val)}
                      className={`whitespace-nowrap flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-[10px] sm:text-[11px] uppercase tracking-widest transition-all duration-300 ${isActive ? "bg-forest-deep text-gold shadow-md scale-100" : "bg-transparent text-forest-deep/50 hover:bg-[#FAF7EE] hover:text-forest-deep active:scale-95"}`}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bottom Row: Topics Scroll */}
            <div className="flex items-center overflow-x-auto hide-scrollbar pb-2 pt-1 px-1 -mx-2 sm:mx-0 sm:px-0">
              <div className="flex items-center gap-2 px-2 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest-deep/40 mr-2 flex items-center gap-1.5 shrink-0 hidden sm:flex">
                  <LayoutGrid className="w-3.5 h-3.5" /> Topics
                </span>
                {TOPICS.map(topic => {
                  const isActive = activeTopic === topic;
                  return (
                    <button
                      key={topic}
                      onClick={() => setActiveTopic(topic)}
                      className={`shrink-0 px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border ${isActive ? "bg-gold text-forest-deep border-gold shadow-sm scale-105" : "bg-white text-forest-deep/60 border-[#EFECE3] hover:border-gold/50 hover:bg-gold/10 hover:text-forest-deep active:scale-95"}`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* Library Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted-foreground font-medium">
                {filteredContent.length} {filteredContent.length === 1 ? "series" : "series"} found
              </p>
              {(searchQuery || activeTopic !== "All" || activeTab !== "All") && (
                <button
                  onClick={() => { setSearchQuery(""); setActiveTopic("All"); setActiveTab("All"); }}
                  className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-forest-deep transition-colors"
                >
                  <X className="h-3.5 w-3.5" /> Clear filters
                </button>
              )}
            </div>

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
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop"; }}
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
                      {s.audioLink && (
                        <div className="absolute top-4 left-4 bg-gold/90 text-forest-deep text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                          <Mic2 className="h-3 w-3" /> Audio
                        </div>
                      )}
                    </div>
                    <div className="p-8 space-y-4 flex-grow flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{s.topic || "Series"}</span>
                        <div className="flex items-center gap-1 text-[10px] text-forest-deep/40 font-bold uppercase">
                          {s.audioLink ? <><Mic2 className="w-3 h-3" /> Audio</> : <><Tv className="w-3 h-3" /> Video</>}
                        </div>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-forest-deep group-hover:text-gold transition-colors">{s.name || s.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mt-2">{s.description || s.desc}</p>
                      <div className="pt-4 mt-auto flex items-center justify-between border-t border-cream/10">
                        <span className="text-xs font-bold text-forest-deep/40">
                          {s.audioLink ? "Listen Now" : "Watch Now"}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gold group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground font-medium text-lg border-2 border-dashed border-cream/20 rounded-[2rem] bg-white/50">
                {searchQuery ? `No series found for "${searchQuery}"` : activeTab === "Audio" ? "Audio content is coming soon!" : "No series available yet. Check back later!"}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
