import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  Play,
  Lock,
  Download,
  BookOpen,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ArrowLeft,
  Globe,
  ChevronDown,
  ChevronUp,
  Star,
  FileText,
  Zap,
} from "lucide-react";
import { PRAYER_SERIES } from "../../../data/prayer-data";
import { toast } from "sonner";

export const Route = createFileRoute("/prayer/series/$seriesId")({
  component: PrayerSeriesPage,
});

function PrayerSeriesPage() {
  const { seriesId } = Route.useParams();
  const navigate = useNavigate();
  const series = PRAYER_SERIES.find((s) => s.id === seriesId);
  const [activeTab, setActiveTab] = useState<"videos" | "resources" | "downloads">("videos");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [hasAccess] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`prayer_access_${seriesId}`) === "true";
    }
    return false;
  });

  if (!series) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl">Series Not Found</h1>
          <Link to="/prayer" className="text-primary underline">← Back to Week of Prayer</Link>
        </div>
      </div>
    );
  }

  const unlockedVideos = series.videos.filter((v) => !v.locked || hasAccess);
  const accessedVideos = hasAccess ? series.videos : series.videos.filter((v) => !v.locked);

  const handleGetAccess = () => {
    navigate({ to: "/prayer/checkout", search: { seriesId: series.id } } as any);
  };

  const handleDemoAccess = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`prayer_access_${seriesId}`, "true");
      toast.success("Demo access granted! Refresh to unlock all content.");
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
          <img
            src={series.bannerImage}
            alt={series.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/20" />
          <div className="relative h-full flex flex-col justify-end pb-12 px-6 max-w-7xl mx-auto w-full">
            <Link
              to="/prayer"
              className="inline-flex items-center gap-2 text-cream/70 hover:text-cream text-sm font-bold tracking-widest uppercase mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Series
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full ${
                  series.status === "upcoming"
                    ? "bg-gold text-forest-deep"
                    : series.status === "active"
                    ? "bg-emerald-500 text-white"
                    : "bg-white/20 text-cream"
                }`}
              >
                {series.status === "upcoming" ? "Coming Soon" : series.status === "active" ? "Available Now" : "Archive"}
              </span>
              <span className="text-cream/60 text-sm">{series.year}</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-medium text-cream leading-tight mb-3">
              {series.theme}
            </h1>
            <p className="text-cream/75 text-lg max-w-2xl">{series.tagline}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Series Info */}
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-medium">{series.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{series.description}</p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    {series.startDate} – {series.endDate}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Play className="h-4 w-4 text-primary" />
                    5 Sessions
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    {series.accessDays} Days Access
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4 text-primary" />
                    Global Stream
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-border">
                <div className="flex gap-0">
                  {(["videos", "resources", "downloads"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
                        activeTab === tab
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab === "videos" ? "Videos" : tab === "resources" ? "Daily Resources" : "Downloads"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Videos Tab */}
              {activeTab === "videos" && (
                <div className="space-y-4">
                  {series.videos.map((video) => {
                    const isAccessible = !video.locked || hasAccess;
                    return (
                      <div
                        key={video.id}
                        className={`group flex gap-4 p-4 rounded-2xl border transition-all ${
                          isAccessible
                            ? "border-border bg-card hover:shadow-md cursor-pointer"
                            : "border-border/50 bg-card/50 opacity-75"
                        }`}
                        onClick={() => {
                          if (isAccessible) {
                            navigate({ to: "/prayer/video" } as any);
                          } else {
                            toast.error("Purchase access to unlock this session");
                          }
                        }}
                      >
                        {/* Thumbnail */}
                        <div className="relative flex-shrink-0 w-36 h-24 rounded-xl overflow-hidden bg-muted">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                          <div className={`absolute inset-0 flex items-center justify-center ${isAccessible ? "bg-black/30 group-hover:bg-black/20" : "bg-black/60"}`}>
                            {isAccessible ? (
                              <div className="h-10 w-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="h-4 w-4 text-forest-deep fill-forest-deep ml-0.5" />
                              </div>
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                <Lock className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {video.duration}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Day {video.day}</span>
                              <h3 className="font-display text-lg font-medium leading-tight mt-0.5">{video.title}</h3>
                              <p className="text-sm text-muted-foreground mt-0.5">{video.speaker}</p>
                            </div>
                            {!isAccessible && (
                              <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{video.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Resources Tab */}
              {activeTab === "resources" && (
                <div className="space-y-4">
                  {series.resources.map((resource) => {
                    const isOpen = expandedDay === resource.day;
                    const isLocked = resource.day > 2 && !hasAccess;
                    return (
                      <div key={resource.day} className={`rounded-2xl border overflow-hidden transition-all ${isLocked ? "border-border/50 opacity-70" : "border-border bg-card"}`}>
                        <button
                          onClick={() => {
                            if (isLocked) {
                              toast.error("Purchase access to unlock all daily resources");
                            } else {
                              setExpandedDay(isOpen ? null : resource.day);
                            }
                          }}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black ${isLocked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                              {isLocked ? <Lock className="h-4 w-4" /> : resource.day}
                            </div>
                            <div>
                              <div className="font-bold text-sm">{resource.title}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-xs">{resource.scripture}</div>
                            </div>
                          </div>
                          {!isLocked && (
                            isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                        {isOpen && !isLocked && (
                          <div className="px-5 pb-6 space-y-5 border-t border-border bg-muted/10">
                            <div className="pt-5">
                              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-2">
                                <BookOpen className="h-3 w-3" /> Scripture
                              </div>
                              <p className="text-sm font-medium italic text-foreground/80">{resource.scripture}</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-2">
                                <Star className="h-3 w-3" /> Devotional
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{resource.devotional}</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-3">
                                <Zap className="h-3 w-3" /> Prayer Points
                              </div>
                              <ul className="space-y-2">
                                {resource.prayerPoints.map((point, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Downloads Tab */}
              {activeTab === "downloads" && (
                <div className="space-y-4">
                  {series.downloads.map((dl) => {
                    const isAccessible = !dl.locked || hasAccess;
                    const typeColors: Record<string, string> = {
                      PDF: "bg-red-500/10 text-red-600",
                      ZIP: "bg-blue-500/10 text-blue-600",
                      MP4: "bg-purple-500/10 text-purple-600",
                      PPTX: "bg-orange-500/10 text-orange-600",
                    };
                    return (
                      <div
                        key={dl.id}
                        className={`flex items-center gap-5 p-5 rounded-2xl border transition-all ${
                          isAccessible ? "border-border bg-card hover:shadow-sm" : "border-border/50 bg-card/50 opacity-70"
                        }`}
                      >
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${typeColors[dl.type] || "bg-muted text-muted-foreground"}`}>
                          {dl.type}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="font-bold text-sm">{dl.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{dl.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">{dl.size}</div>
                        </div>
                        <button
                          onClick={() => {
                            if (isAccessible) {
                              toast.success(`Downloading ${dl.title}...`);
                            } else {
                              toast.error("Purchase access to download this material");
                            }
                          }}
                          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                            isAccessible
                              ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                          }`}
                        >
                          {isAccessible ? (
                            <><Download className="h-3.5 w-3.5" /> Download</>
                          ) : (
                            <><Lock className="h-3.5 w-3.5" /> Locked</>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar — Access Card */}
            <div className="space-y-6 sticky top-28">
              {hasAccess ? (
                <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">Full Access Active</span>
                  </div>
                  <p className="text-sm text-emerald-700/70 dark:text-emerald-400/70">
                    You have full access to all videos, resources, and downloads for this series.
                  </p>
                </div>
              ) : (
                <div className="p-8 rounded-[2rem] bg-forest-deep text-cream shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/80 block mb-2">
                      {series.status === "upcoming" ? "Pre-Order Access" : "Full Series Access"}
                    </span>
                    <div className="font-display text-5xl font-medium text-gold mb-1">${series.price}</div>
                    <div className="text-cream/60 text-sm mb-6">per school or church · {series.accessDays} days</div>

                    <ul className="space-y-3 mb-8 text-sm text-cream/80">
                      {[
                        "All 5 video sessions",
                        "Daily devotionals & prayer guides",
                        "Full download package",
                        "Children's curriculum",
                        "Church facilitator toolkit",
                        `${series.accessDays}-day access`,
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-gold flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={handleGetAccess}
                      className="w-full py-4 rounded-2xl bg-gold text-forest-deep font-black text-sm uppercase tracking-widest hover:bg-gold/90 active:scale-95 transition-all shadow-xl"
                    >
                      {series.status === "upcoming" ? "Pre-Order Now" : "Get Full Access"}
                    </button>

                    <button
                      onClick={handleDemoAccess}
                      className="w-full mt-3 py-3 rounded-2xl bg-white/10 text-cream/80 font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
                    >
                      Try Demo Access
                    </button>

                    <p className="text-center text-cream/40 text-[10px] mt-4">
                      Individual access for personal use available at lower rate. Contact us.
                    </p>
                  </div>
                </div>
              )}

              {/* What You Get */}
              <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider">Series Includes</h3>
                <div className="space-y-3">
                  {[
                    { icon: Play, label: "5 Video Sessions", sub: "HD quality, replay anytime" },
                    { icon: BookOpen, label: "Daily Devotionals", sub: "Scripture, reflection & prayer" },
                    { icon: Download, label: `${series.downloads.length} Downloads`, sub: "PDFs, slides & more" },
                    { icon: Users, label: "For Schools & Churches", sub: "Facilitator tools included" },
                    { icon: Clock, label: `${series.accessDays}-Day Access`, sub: "Watch at your own pace" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{label}</div>
                        <div className="text-xs text-muted-foreground">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
