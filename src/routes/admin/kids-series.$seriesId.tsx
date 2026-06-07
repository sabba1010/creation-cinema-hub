import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Play, Settings, Plus, FileVideo, Trash2, Mic2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import Swal from "sweetalert2";

export const Route = createFileRoute("/admin/kids-series/$seriesId")({
  component: AdminSeriesPage,
});

function AdminSeriesPage() {
  const { seriesId } = Route.useParams();

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", description: "", vimeoLink: "", audioLink: "" });
  const [editingEpId, setEditingEpId] = useState<string | null>(null);
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null);

  const [series, setSeries] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

  const fetchSeriesData = async () => {
    try {
      const res = await fetch(`https://movie-backend-drab.vercel.app/api/kids/series/${seriesId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        const seriesObj = {
          ...data,
          id: data._id,
          desc: data.description,
          img: data.image
        };
        setSeries(seriesObj);
        return seriesObj; // return so fetchEpisodes can use the image
      }
    } catch (err) {
      console.error("Failed to fetch series details", err);
    }
    return null;
  };

  const fetchEpisodes = async (seriesImg?: string) => {
    try {
      const res = await fetch(`https://movie-backend-drab.vercel.app/api/kids/series/${seriesId}/episodes`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        const fallbackImg = seriesImg || "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=800&h=400&fit=crop";
        setEpisodes(data.map((ep: any) => ({
          ...ep,
          id: ep._id,
          title: ep.title,
          description: ep.description,
          img: ep.image || fallbackImg,
          link: ep.vimeoLink || ep.trailer || "",
          audioLink: ep.audioLink || ""
        })));
      }
    } catch (err) {
      console.error("Failed to fetch episodes", err);
    }
  };

  useEffect(() => {
    if (seriesId) {
      fetchSeriesData().then((s) => {
        if (s) fetchEpisodes(s.img);
        else fetchEpisodes();
      });
    }
  }, [seriesId]);

  const handleUploadContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingEpId ? "PUT" : "POST";
      const url = editingEpId
        ? `https://movie-backend-drab.vercel.app/api/kids/episodes/${editingEpId}`
        : `https://movie-backend-drab.vercel.app/api/kids/series/${seriesId}/episodes`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        },
        body: JSON.stringify({
          title: uploadForm.title,
          description: uploadForm.description,
          vimeoLink: uploadForm.vimeoLink,
          audioLink: uploadForm.audioLink,
          length: "00:00",
          image: series?.img || ""
        })
      });

      if (res.ok) {
        setIsUploadDialogOpen(false);
        setUploadForm({ title: "", description: "", vimeoLink: "", audioLink: "" });
        setEditingEpId(null);
        await fetchEpisodes(series?.img);
        Swal.fire({
          title: editingEpId ? "Episode Updated!" : "Episode Added!",
          text: editingEpId ? "Your episode has been updated successfully." : "New episode has been added to the series.",
          icon: "success",
          confirmButtonColor: "#2C4A3B",
          confirmButtonText: "Great"
        });
      }
    } catch (err) {
      Swal.fire({ title: "Error!", text: "Failed to save episode.", icon: "error", confirmButtonColor: "#2C4A3B" });
    }
  };

  const handleRemove = async (id: string) => {
    const result = await Swal.fire({
      title: "Remove episode?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#2C4A3B",
      confirmButtonText: "Yes, remove it!"
    });
    if (!result.isConfirmed) return;
    try {
      await fetch(`https://movie-backend-drab.vercel.app/api/kids/episodes/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        }
      });
      await fetchEpisodes(series?.img);
      if (activeEpisodeId === id) setActiveEpisodeId(null);
      Swal.fire({ title: "Removed!", text: "Episode has been deleted.", icon: "success", confirmButtonColor: "#2C4A3B" });
    } catch (err) {
      Swal.fire("Error!", "Failed to remove episode.", "error");
    }
  };

  if (!series) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin h-10 w-10 border-4 border-forest border-t-transparent rounded-full" />
    </div>
  );

  const activeEp = episodes.find(e => e.id === activeEpisodeId);
  const displayTitle = activeEp ? activeEp.title : series.name;
  const displayDesc = activeEp ? activeEp.description : series.desc;
  const videoSrc = activeEp?.link || series.trailer;
  const audioSrc = activeEp?.audioLink || series.audioLink;

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/kids" className="h-10 w-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">{series.name}</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mt-1">Manage Series Episodes</p>
          </div>
        </div>
        <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md" onClick={() => {
          setEditingEpId(null);
          setUploadForm({ title: "", description: "", vimeoLink: "", audioLink: "" });
          setIsUploadDialogOpen(true);
        }}>
          <Plus className="w-4 h-4" />
          Add Episode
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Main Content Area */}
        <div className="space-y-8">
          <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-gray-900 shadow-xl border-8 border-card">
            {videoSrc ? (
              <iframe
                src={videoSrc.replace("vimeo.com", "player.vimeo.com/video").replace(/\?.*/, "")}
                title={displayTitle}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : audioSrc ? (
              <div className="absolute inset-0 w-full h-full bg-forest-deep flex flex-col items-center justify-center p-6 text-cream">
                <img
                  src={series.img}
                  alt={series.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10 flex flex-col items-center w-full max-w-md">
                  <Mic2 className="h-20 w-20 text-gold mb-6 opacity-90 drop-shadow-lg" />
                  <h3 className="text-2xl font-bold mb-8 text-center drop-shadow-md">{displayTitle}</h3>
                  <audio controls src={audioSrc} className="w-full shadow-2xl rounded-full" />
                </div>
              </div>
            ) : (
              <>
                <img
                  src={series.img}
                  alt={series.name}
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=800&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="h-24 w-24 rounded-full bg-forest text-white flex items-center justify-center shadow-2xl">
                    <Play className="h-10 w-10 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/60 px-4 py-2 rounded-xl text-white/80 font-bold text-sm">
                  No Video Link Provided
                </div>
              </>
            )}
          </div>

          {/* Dynamic Title & Description Panel */}
          <div className="p-10 rounded-[3rem] bg-card border border-border/50 shadow-sm transition-all duration-500">
            <div className="mb-4">
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">{displayTitle}</h2>
              <p className="text-forest font-bold uppercase tracking-[0.2em] text-xs">
                {activeEp ? "Now Playing" : "Series Information"}
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {displayDesc || "No description provided."}
            </p>
            <div className="mt-8 pt-8 border-t border-border/50 flex flex-wrap gap-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Focus Virtue</span>
                <span className="font-bold text-forest">{series.topic}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Total Episodes</span>
                <span className="font-bold text-foreground">{episodes.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Episodes List */}
        <div className="space-y-8">
          <div className="p-8 rounded-[3rem] bg-card border border-border/50 shadow-sm">
            <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
              <FileVideo className="h-5 w-5 text-forest" />
              Episodes
            </h3>
            <div className="space-y-3">
              {episodes.map((ep) => (
                <div
                  key={ep.id}
                  className={`flex gap-3 group cursor-pointer p-3 rounded-2xl transition-colors ${activeEpisodeId === ep.id ? 'bg-forest/10 border border-forest/20' : 'hover:bg-muted/50 border border-transparent'}`}
                  onClick={() => setActiveEpisodeId(ep.id)}
                >
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-muted shrink-0 border-2 border-transparent group-hover:border-forest transition-all">
                    <img
                      src={ep.img}
                      alt={ep.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = series?.img || "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop";
                      }}
                    />
                    {activeEpisodeId === ep.id && (
                      <div className="absolute inset-0 bg-forest/20 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="py-1 flex-grow min-w-0">
                    <h4 className={`text-sm font-bold transition-colors leading-tight truncate ${activeEpisodeId === ep.id ? 'text-forest' : 'text-foreground group-hover:text-forest'}`}>
                      {ep.title}
                    </h4>
                    <div className="mt-2 flex gap-3">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setEditingEpId(ep.id);
                        setUploadForm({ title: ep.title, description: ep.description || "", vimeoLink: ep.link, audioLink: ep.audioLink || "" });
                        setIsUploadDialogOpen(true);
                      }} className="text-xs text-forest hover:underline font-medium flex items-center gap-1">
                        <Settings className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(ep.id);
                      }} className="text-xs text-destructive hover:underline font-medium flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {episodes.length === 0 && (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  No episodes uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">
              {editingEpId ? "Edit Episode" : `Add Episode to ${series.name}`}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Fill out episode details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUploadContent} className="space-y-6 py-4 text-left">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Episode Title</Label>
                <Input
                  placeholder="Episode title"
                  className="h-11 rounded-xl"
                  value={uploadForm.title}
                  onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Small Description</Label>
                <textarea
                  placeholder="Brief description"
                  className="flex min-h-[100px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={uploadForm.description}
                  onChange={e => setUploadForm({ ...uploadForm, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Vimeo Link (Video)</Label>
                <Input
                  placeholder="https://vimeo.com/..."
                  className="h-11 rounded-xl"
                  value={uploadForm.vimeoLink}
                  onChange={e => setUploadForm({ ...uploadForm, vimeoLink: e.target.value })}
                  disabled={!!uploadForm.audioLink}
                />
              </div>
              <div className="space-y-2">
                <Label>Audio Content (Optional)</Label>
                <Input
                  type="file"
                  accept="audio/*"
                  className="h-11 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-forest/10 file:text-forest hover:file:bg-forest/20 transition-all cursor-pointer disabled:opacity-50"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setUploadForm({ ...uploadForm, audioLink: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  disabled={!!uploadForm.vimeoLink}
                />
                {uploadForm.audioLink && (
                  <button
                    type="button"
                    className="text-xs text-red-500 hover:underline font-bold"
                    onClick={() => setUploadForm({ ...uploadForm, audioLink: "" })}
                  >
                    Remove Selected Audio
                  </button>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full bg-forest h-11 rounded-xl">
              {editingEpId ? "Save Changes" : "Save Episode"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
