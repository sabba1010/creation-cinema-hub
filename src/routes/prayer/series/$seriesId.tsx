import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
const Player = ReactPlayer as any;
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  Play,
  Lock,
  Download,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  ArrowLeft,
  Globe,
  ChevronDown,
  ChevronUp,
  Star,
  FileText,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";

export const Route = createFileRoute("/prayer/series/$seriesId")({
  component: PrayerSeriesPage,
});

function PrayerSeriesPage() {
  const { seriesId } = Route.useParams();
  const navigate = useNavigate();

  const [series, setSeries] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"videos" | "downloads">("videos");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<any>(null);
  const [hasAccess] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`prayer_access_${seriesId}`) === "true";
    }
    return false;
  });

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const [seaRes, epRes] = await Promise.all([
          fetch(`${API_URL}/api/prayer/seasons/${seriesId}`),
          fetch(`${API_URL}/api/prayer/seasons/${seriesId}/episodes`)
        ]);

        let fetchedSeries = null;
        if (seaRes.ok && epRes.ok) {
          const seaData = await seaRes.json();
          const epData = await epRes.json();
          if (seaData.success && seaData.data && epData.success) {
            const s = seaData.data;
            const eps = epData.data;

            // Map the backend episodes to the unified format the UI expects
            const videos = eps.map((ep: any) => ({
              id: ep._id,
              day: ep.day,
              title: ep.title,
              speaker: ep.speaker || "",
              description: ep.description || "",
              duration: ep.duration || "00:00",
              thumbnail: ep.thumbnail || s.thumbnail || s.bannerImage,
              videoUrl: ep.videoUrl,
              locked: ep.day > 1
            }));

            const resources = eps.filter((ep: any) => ep.resourceTitle).map((ep: any) => ({
              day: ep.day,
              title: ep.resourceTitle,
              scripture: ep.resourceScripture || "",
              devotional: ep.resourceDevotional || "",
              prayerPoints: ep.resourcePoints || []
            }));

            const downloads = eps.flatMap((ep: any) =>
              (ep.downloads || []).map((dl: any) => ({
                id: dl._id || Math.random().toString(),
                title: `[Day ${ep.day}] ${dl.title}`,
                type: dl.type || "PDF",
                size: dl.size || "Unknown",
                description: dl.description || "",
                locked: ep.day > 1,
                fileUrl: dl.fileUrl
              }))
            );

            fetchedSeries = {
              ...s,
              id: s._id,
              videos,
              resources,
              downloads
            };
          }
        }

        if (fetchedSeries) {
          setSeries(fetchedSeries);
        }
      } catch (err) {
        console.error("Failed to fetch series details", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, [seriesId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-forest border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!series) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl">Series Not Found</h1>
          <Link to="/prayer" className="text-primary underline">←  Back to Week of Prayer</Link>
        </div>
      </div>
    );
  }

  const unlockedVideos = series.videos?.filter((v: any) => !v.locked || hasAccess) || [];
  const accessedVideos = hasAccess ? series.videos : series.videos?.filter((v: any) => !v.locked) || [];

  const handleGetAccess = () => {
    navigate({ to: "/prayer/checkout", search: { seriesId: series.id } } as any);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />

      {/* Video Modal Overlay */}
      {playingVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="w-full max-w-6xl relative animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors flex items-center gap-2"
            >
              Close Video
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              {playingVideo.videoUrl && playingVideo.videoUrl.includes('vimeo.com') ? (
                <iframe
                  src={`https://player.vimeo.com/video/${playingVideo.videoUrl.split('vimeo.com/')[1]?.split('?')[0]?.split('/')[0]}?autoplay=1&title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : playingVideo.videoUrl && (playingVideo.videoUrl.includes('youtube.com') || playingVideo.videoUrl.includes('youtu.be')) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo.videoUrl.includes('v=') ? playingVideo.videoUrl.split('v=')[1]?.split('&')[0] : playingVideo.videoUrl.split('youtu.be/')[1]?.split('?')[0]}?autoplay=1`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Player
                  url={playingVideo.videoUrl}
                  width="100%"
                  height="100%"
                  playing
                  controls
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>
            <div className="mt-6 text-left">
              <span className="text-gold text-xs font-bold uppercase tracking-widest mb-2 block">
                Session {playingVideo.day}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-2">
                {playingVideo.title}
              </h3>
              <p className="text-white/60 text-sm max-w-3xl leading-relaxed">
                {playingVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden bg-black flex items-center justify-center">
          <Link
            to="/prayer"
            className="absolute top-6 left-6 z-30 inline-flex items-center gap-2 text-cream hover:text-white text-sm font-bold tracking-widest uppercase bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Series
          </Link>
          
          {isPreviewPlaying && series.samplePreviewVideo ? (
            <div className="absolute inset-0 z-20">
              {series.samplePreviewVideo.includes('vimeo.com') ? (
                <iframe
                  src={`https://player.vimeo.com/video/${series.samplePreviewVideo.split('vimeo.com/')[1]?.split('?')[0]?.split('/')[0]}?autoplay=1&background=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : series.samplePreviewVideo.includes('youtube.com') || series.samplePreviewVideo.includes('youtu.be') ? (
                <iframe
                  src={`https://www.youtube.com/embed/${series.samplePreviewVideo.includes('v=') ? series.samplePreviewVideo.split('v=')[1]?.split('&')[0] : series.samplePreviewVideo.split('youtu.be/')[1]?.split('?')[0]}?autoplay=1`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <Player
                  url={series.samplePreviewVideo}
                  width="100%"
                  height="100%"
                  playing
                  controls
                  style={{ objectFit: 'contain' }}
                />
              )}
              <button
                onClick={() => setIsPreviewPlaying(false)}
                className="absolute top-6 right-6 z-30 bg-black/60 text-white hover:bg-black/80 px-4 py-2 rounded-xl text-sm font-bold tracking-widest uppercase transition-all"
              >
                Close Video
              </button>
            </div>
          ) : (
            <div className="w-full h-full max-w-5xl mx-auto p-8 relative flex items-center justify-center">
              <img
                src={series.bannerImage || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80"}
                alt={series.title}
                className="w-full h-full object-contain"
              />
              {series.samplePreviewVideo && !isPreviewPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPreviewPlaying(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-forest-deep/80 hover:bg-forest-deep text-cream rounded-xl font-bold tracking-widest uppercase transition-all backdrop-blur-sm shadow-xl hover:scale-105 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Watch Free Preview
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Series Info */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full ${series.status === "upcoming"
                      ? "bg-gold text-forest-deep"
                      : series.status === "active"
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {series.status === "upcoming" ? "Coming Soon" : series.status === "active" ? "Available Now" : "Archive"}
                  </span>
                  <span className="text-muted-foreground text-sm font-bold">{series.year}</span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl font-medium text-foreground leading-tight mb-2">
                  {series.theme}
                </h1>
                <h2 className="font-display text-2xl font-medium text-muted-foreground">{series.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mt-4">{series.description}</p>
                <div className="flex flex-wrap gap-6 text-sm mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    {series.startDate} – {series.endDate}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Play className="h-4 w-4 text-primary" />
                    {series.videos?.length || 0} Sessions
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
                  {(["videos", "downloads"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {tab === "videos" ? "Videos" : "Downloads"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Videos Tab */}
              {activeTab === "videos" && (
                <div className="space-y-4">
                  {(!series.videos || series.videos.length === 0) && (
                    <div className="text-center py-12 text-muted-foreground border border-dashed rounded-2xl">
                      <p>No video sessions have been uploaded yet.</p>
                    </div>
                  )}
                  {series.videos?.map((video: any) => {
                    const isAccessible = !video.locked || hasAccess;
                    return (
                      <div
                        key={video.id}
                        className={`group flex gap-4 p-4 rounded-2xl border transition-all ${isAccessible
                          ? "border-border bg-card hover:shadow-md cursor-pointer"
                          : "border-border/50 bg-card/50 opacity-75"
                          }`}
                        onClick={() => {
                          if (isAccessible) {
                            if (video.videoUrl) {
                              setPlayingVideo(video);
                            } else {
                              toast.error("Video not uploaded yet.");
                            }
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


              {/* Downloads Tab */}
              {activeTab === "downloads" && (
                <div className="space-y-4">
                  {(!series.downloads || series.downloads.length === 0) && (
                    <div className="text-center py-12 text-muted-foreground border border-dashed rounded-2xl">
                      <p>No downloadable materials available yet.</p>
                    </div>
                  )}
                  {series.downloads?.map((dl: any) => {
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
                        className={`flex items-center gap-5 p-5 rounded-2xl border transition-all ${isAccessible ? "border-border bg-card hover:shadow-sm" : "border-border/50 bg-card/50 opacity-70"
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
                              if (dl.fileUrl) {
                                window.open(dl.fileUrl, '_blank');
                              } else {
                                toast.success(`Downloading ${dl.title}...`);
                              }
                            } else {
                              toast.error("Purchase access to download this material");
                            }
                          }}
                          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${isAccessible
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
                        "Five video sessions",
                        "14-day access",
                        "Daily featured Bible verse",
                        "Daily target prayer groups",
                        "Messsages designed for kids",
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
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
