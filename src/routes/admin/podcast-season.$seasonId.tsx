import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Play, Settings, Plus, Headphones, Trash2, Mic2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { toast } from "sonner";
import Swal from "sweetalert2";

export const Route = createFileRoute("/admin/podcast-season/$seasonId")({
  component: AdminPodcastSeasonPage,
});

const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";

function AdminPodcastSeasonPage() {
  const { seasonId } = Route.useParams();

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", description: "", audioUrl: "", duration: "" });
  const [editingEpId, setEditingEpId] = useState<string | null>(null);

  const [season, setSeason] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSeasonData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/podcast/seasons/${seasonId}`);
      const data = await res.json();
      if (data.success) {
        setSeason(data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch season details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeasonData();
  }, [seasonId]);

  const handleAudioUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const toastId = toast.loading("Uploading audio...");
      try {
        const res = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          const fullUrl = `${API_URL}${data.url}`;
          setUploadForm({ ...uploadForm, audioUrl: fullUrl });
          toast.success("Upload complete!", { id: toastId });
        } else {
          toast.error(data.message || "Upload failed", { id: toastId });
        }
      } catch (err) {
        toast.error("Upload error", { id: toastId });
      }
    }
  };

  const handleSaveEpisode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingEpId
        ? `${API_URL}/api/podcast/episodes/${editingEpId}`
        : `${API_URL}/api/podcast/episodes`;
      const method = editingEpId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        },
        body: JSON.stringify({
          title: uploadForm.title,
          description: uploadForm.description,
          audioUrl: uploadForm.audioUrl,
          duration: uploadForm.duration,
          seasonId: seasonId
        })
      });

      if (res.ok) {
        setIsUploadDialogOpen(false);
        setUploadForm({ title: "", description: "", audioUrl: "", duration: "" });
        setEditingEpId(null);
        fetchSeasonData();
        Swal.fire({
          title: editingEpId ? "Episode Updated!" : "Episode Added!",
          text: editingEpId ? "Your changes have been saved." : "New episode has been added to the season.",
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
      const res = await fetch(`${API_URL}/api/podcast/episodes/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("user_token")}` }
      });
      if (res.ok) {
        fetchSeasonData();
        Swal.fire({ title: "Removed!", text: "Episode has been deleted.", icon: "success", confirmButtonColor: "#2C4A3B" });
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to remove episode.", "error");
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin h-10 w-10 border-4 border-forest border-t-transparent rounded-full" />
    </div>
  );

  if (!season) return <div>Season not found</div>;

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/podcast" className="h-10 w-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">{season.title}</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mt-1">Manage Season Episodes</p>
          </div>
        </div>
        <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md" onClick={() => {
          setEditingEpId(null);
          setUploadForm({ title: "", description: "", audioUrl: "", duration: "" });
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
            <div className="absolute inset-0 w-full h-full bg-forest-deep flex flex-col items-center justify-center p-6 text-cream">
              <img
                src={season.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"}
                alt={season.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="relative z-10 flex flex-col items-center w-full max-w-md text-center">
                <Mic2 className="h-20 w-20 text-gold mb-6 opacity-90 drop-shadow-lg" />
                <h3 className="text-2xl font-bold drop-shadow-md">{season.title}</h3>
                <p className="mt-2 text-sm text-cream/70">Podcast Season Overview</p>
              </div>
            </div>
          </div>

          <div className="p-10 rounded-[3rem] bg-card border border-border/50 shadow-sm transition-all duration-500">
            <div className="mb-4">
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">Season Details</h2>
              <p className="text-forest font-bold uppercase tracking-[0.2em] text-xs">
                {season.status}
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {season.description || "No description provided."}
            </p>
            <div className="mt-8 pt-8 border-t border-border/50 flex flex-wrap gap-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Total Episodes</span>
                <span className="font-bold text-foreground">{season.episodes?.length || 0}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Total Listens</span>
                <span className="font-bold text-foreground">{season.listensCount || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Episodes List */}
        <div className="space-y-8">
          <div className="p-8 rounded-[3rem] bg-card border border-border/50 shadow-sm">
            <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
              <Headphones className="h-5 w-5 text-forest" />
              Episodes
            </h3>
            <div className="space-y-3">
              {season.episodes?.map((ep: any, index: number) => (
                <div
                  key={ep._id}
                  className="flex gap-3 group p-3 rounded-2xl transition-colors hover:bg-muted/50 border border-transparent"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0 flex items-center justify-center border-2 border-transparent group-hover:border-forest transition-all">
                    <span className="font-bold text-lg text-muted-foreground group-hover:text-forest">{index + 1}</span>
                  </div>
                  <div className="py-1 flex-grow min-w-0">
                    <h4 className="text-sm font-bold transition-colors leading-tight truncate text-foreground group-hover:text-forest">
                      {ep.title}
                    </h4>
                    {ep.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ep.description}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">{ep.duration || "00:00"}</p>
                    <div className="mt-2 flex gap-3">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setEditingEpId(ep._id);
                        setUploadForm({ title: ep.title, description: ep.description || "", audioUrl: ep.audioUrl || "", duration: ep.duration || "" });
                        setIsUploadDialogOpen(true);
                      }} className="text-xs text-forest hover:underline font-medium flex items-center gap-1">
                        <Settings className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(ep._id);
                      }} className="text-xs text-destructive hover:underline font-medium flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {(!season.episodes || season.episodes.length === 0) && (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  No episodes uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">
              {editingEpId ? "Edit Episode" : `Add Episode to ${season.title}`}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEpisode} className="space-y-6 py-4 text-left">
            <div className="space-y-4">
              <div className="grid grid-cols-[2fr_1fr] gap-4">
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
                  <Label>Duration (optional)</Label>
                  <Input
                    placeholder="e.g. 42:15"
                    className="h-11 rounded-xl"
                    value={uploadForm.duration}
                    onChange={e => setUploadForm({ ...uploadForm, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Episode Description</Label>
                <Textarea
                  placeholder="Provide a detailed description or show notes for this episode..."
                  className="rounded-xl min-h-[120px]"
                  value={uploadForm.description}
                  onChange={e => setUploadForm({ ...uploadForm, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Audio Content</Label>
                <Input
                  type="file"
                  accept="audio/*"
                  className="h-11 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-forest/10 file:text-forest hover:file:bg-forest/20 transition-all cursor-pointer"
                  onChange={handleAudioUpload}
                />
                {uploadForm.audioUrl && (
                  <p className="text-[10px] text-forest font-bold mt-2">✓ Audio uploaded successfully</p>
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
