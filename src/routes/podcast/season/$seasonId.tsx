import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Download, BookOpen, Share2, ArrowLeft, Clock, Calendar } from "lucide-react";
import { usePodcast } from "../../podcast";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/podcast/season/$seasonId")({
  component: SeasonDetailsPage,
});

const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";

const RESOURCES = [
  { title: "Study Guide PDF", type: "Document", size: "2.4 MB" },
  { title: "Visual Meditation Gallery", type: "Media", size: "12 Assets" },
  { title: "Biblical References Index", type: "Reference", size: "8 Pages" },
];

function SeasonDetailsPage() {
  const { seasonId } = Route.useParams();
  const { playEpisode } = usePodcast();
  const [season, setSeason] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Email capture state
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState("");
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const handleShare = async (title: string, text: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDownloadResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadEmail || !selectedResource) return;

    try {
      const res = await fetch(`${API_URL}/api/podcast/seasons/${seasonId}/resources/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: downloadEmail, fileUrl: selectedResource.fileUrl })
      });
      const data = await res.json();
      if (data.success) {
        setIsDownloadOpen(false);
        // Trigger download
        const link = document.createElement('a');
        link.href = data.url;
        link.download = selectedResource.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download started!");
      } else {
        toast.error("Download failed");
      }
    } catch (err) {
      toast.error("Error downloading resource");
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/api/podcast/seasons/${seasonId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSeason(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [seasonId]);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!season) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow pt-24 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-display">Season Not Found</h1>
          <Link to="/podcast" className="mt-4 text-primary hover:underline">Go back to Podcast</Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Season Header */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <Link to="/podcast" className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest mb-10 hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" /> Back to Podcast
            </Link>

            <div className="grid lg:grid-cols-[1.2fr_2fr] gap-12 items-end">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                <img src={season.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"} alt="Season Cover" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"; }} />
              </div>
              <div className="pb-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70">Podcast Season</span>
                <h1 className="mt-4 font-display text-5xl sm:text-7xl font-medium tracking-tight text-foreground" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                  {season.title}
                </h1>
                <p className="mt-4 text-muted-foreground text-lg">{season.description}</p>
                <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-muted-foreground">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(season.createdAt).getFullYear()}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {season.episodesCount || 0} Episodes</span>
                  <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-foreground">{season.status}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-[2fr_1fr] gap-16">
          {/* Episode List */}
          <div className="space-y-12">
            <h2 className="font-display text-3xl font-medium text-foreground">Episodes</h2>
            <div className="space-y-4">
              {season.episodes?.length > 0 ? (
                season.episodes.map((ep: any, index: number) => (
                  <div key={ep._id} className="group flex items-center justify-between p-6 rounded-3xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => {
                          playEpisode({
                            id: ep._id,
                            title: ep.title,
                            duration: ep.duration,
                            date: new Date(ep.createdAt).toLocaleDateString(),
                            audioUrl: ep.audioUrl,
                            seasonTitle: season.title,
                            coverImage: season.image
                          });
                          // Record the listen
                          fetch(`${API_URL}/api/podcast/episodes/${ep._id}/listen`, { method: 'POST' }).catch(console.error);
                        }}
                        className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all cursor-pointer"
                      >
                        <Play className="h-5 w-5 fill-current" />
                      </button>
                      <div>
                        <h4 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">{index + 1}. {ep.title}</h4>
                        {ep.description && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 max-w-2xl">{ep.description}</p>
                        )}
                        <p className="mt-1 text-sm text-muted-foreground">{new Date(ep.createdAt).toLocaleDateString()} • {ep.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href={ep.audioUrl} download target="_blank" rel="noreferrer" className="h-10 w-10 grid place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer">
                        <Download className="h-5 w-5" />
                      </a>
                      <button
                        onClick={() => handleShare(ep.title, `Listen to ${ep.title} from ${season.title}`, window.location.href)}
                        className="h-10 w-10 grid place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No episodes available yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar / Bonus Resources */}
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-3xl font-medium text-foreground mb-8">Bonus <span className="italic text-primary">Resources</span></h2>
              <div className="space-y-4">
                {season.resources?.length > 0 ? (
                  season.resources.map((res: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-cream/5 border border-border group hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 grid place-items-center rounded-xl bg-primary/5 text-primary">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-foreground">{res.title}</h4>
                          <p className="text-xs text-muted-foreground">{res.size || 'Attachment'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedResource(res);
                          setIsDownloadOpen(true);
                        }}
                        className="text-primary hover:text-primary/70 h-8 w-8 grid place-items-center rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No resources available for this season.</p>
                )}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-forest-deep text-cream">
              <h4 className="font-display text-xl mb-4">Never miss an episode</h4>
              <p className="text-sm text-cream/70 leading-relaxed mb-6">Get the latest stories and study materials delivered directly to your inbox.</p>
              <form className="space-y-3">
                <input type="email" placeholder="Your email" className="w-full px-5 py-3 rounded-xl bg-cream/10 border border-cream/10 text-sm focus:outline-none focus:border-gold/50" />
                <button className="w-full py-3 rounded-xl bg-gold text-gold-foreground font-bold text-sm uppercase tracking-widest hover:scale-105 transition">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isDownloadOpen} onOpenChange={setIsDownloadOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">Download Resource</DialogTitle>
            <DialogDescription>
              Enter your email to download "{selectedResource?.title}". We'll keep you updated on future resources.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDownloadResource} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={downloadEmail}
                onChange={(e) => setDownloadEmail(e.target.value)}
                required
                className="h-12 rounded-xl"
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest hover:bg-primary/90">
              Get Download Link
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <SiteFooter />
    </div>
  );
}
