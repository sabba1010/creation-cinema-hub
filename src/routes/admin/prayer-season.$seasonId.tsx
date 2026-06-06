import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Play, Settings, Plus, Video, Trash2, FileText, Download } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { toast } from "sonner";
import Swal from "sweetalert2";

export const Route = createFileRoute("/admin/prayer-season/$seasonId")({
  component: AdminPrayerSeasonPage,
});

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminPrayerSeasonPage() {
  const { seasonId } = Route.useParams();

  const [isEpisodeDialogOpen, setIsEpisodeDialogOpen] = useState(false);
  const [editingEpId, setEditingEpId] = useState<string | null>(null);

  const [episodeForm, setEpisodeForm] = useState({
    day: 1,
    title: "",
    speaker: "",
    description: "",
    videoUrl: "",
    duration: "",
    resourceTitle: "",
    resourceScripture: "",
    resourceDevotional: ""
  });

  const [season, setSeason] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Download Management
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [activeEpisodeForDownload, setActiveEpisodeForDownload] = useState<any>(null);
  const [downloadForm, setDownloadForm] = useState({ title: "", type: "PDF", fileUrl: "", description: "" });

  const fetchSeasonData = async () => {
    setIsLoading(true);
    try {
      const [seaRes, epRes] = await Promise.all([
        fetch(`${API_URL}/api/prayer/seasons/${seasonId}`),
        fetch(`${API_URL}/api/prayer/seasons/${seasonId}/episodes`)
      ]);
      const seaData = await seaRes.json();
      const epData = await epRes.json();
      if (seaData.success) setSeason(seaData.data);
      if (epData.success) setEpisodes(epData.data);
    } catch (err) {
      toast.error("Failed to fetch season details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeasonData();
  }, [seasonId]);

  const handleSaveEpisode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingEpId
        ? `${API_URL}/api/prayer/episodes/${editingEpId}`
        : `${API_URL}/api/prayer/seasons/${seasonId}/episodes`;
      const method = editingEpId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(episodeForm)
      });

      if (res.ok) {
        setIsEpisodeDialogOpen(false);
        setEditingEpId(null);
        fetchSeasonData();
        toast.success(editingEpId ? "Episode updated" : "Episode created");
      }
    } catch (err) {
      toast.error("Failed to save episode.");
    }
  };

  const handleDeleteEpisode = async (id: string) => {
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
      const res = await fetch(`${API_URL}/api/prayer/episodes/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchSeasonData();
        toast.success("Episode removed");
      }
    } catch (err) {
      toast.error("Failed to remove episode.");
    }
  };

  const handleAddDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEpisodeForDownload) return;
    try {
      const updatedDownloads = [...(activeEpisodeForDownload.downloads || []), downloadForm];
      const res = await fetch(`${API_URL}/api/prayer/episodes/${activeEpisodeForDownload._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ downloads: updatedDownloads })
      });
      if (res.ok) {
        setIsDownloadDialogOpen(false);
        setDownloadForm({ title: "", type: "PDF", fileUrl: "", description: "" });
        toast.success("Download added to episode");
        fetchSeasonData();
      }
    } catch (err) {
      toast.error("Failed to add download");
    }
  };

  const handleRemoveDownload = async (epId: string, index: number) => {
    const ep = episodes.find(e => e._id === epId);
    if (!ep) return;
    try {
      const updatedDownloads = [...ep.downloads];
      updatedDownloads.splice(index, 1);
      const res = await fetch(`${API_URL}/api/prayer/episodes/${epId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ downloads: updatedDownloads })
      });
      if (res.ok) {
        toast.success("Download removed");
        fetchSeasonData();
      }
    } catch (err) {
      toast.error("Failed to remove download");
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
          <Link to="/admin/prayer" className="h-10 w-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">{season.title}</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mt-1">Manage Season Episodes & Resources</p>
          </div>
        </div>
        <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md" onClick={() => {
          setEditingEpId(null);
          setEpisodeForm({ day: episodes.length + 1, title: "", speaker: "", description: "", videoUrl: "", duration: "", resourceTitle: "", resourceScripture: "", resourceDevotional: "" });
          setIsEpisodeDialogOpen(true);
        }} disabled={episodes.length >= 5}>
          <Plus className="w-4 h-4" />
          Add Episode (Day {episodes.length + 1})
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {episodes.map((ep: any) => (
            <div key={ep._id} className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-forest/10 flex items-center justify-center border border-forest/20 shrink-0">
                    <span className="font-display font-bold text-2xl text-forest">{ep.day}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{ep.title}</h3>
                    <p className="text-sm text-muted-foreground">Speaker: {ep.speaker || "Not specified"}</p>
                    <p className="text-xs mt-2 bg-muted inline-block px-2 py-1 rounded-md">{ep.duration} • Video: {ep.videoUrl ? "Linked" : "Missing"}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditingEpId(ep._id);
                    setEpisodeForm({
                      day: ep.day,
                      title: ep.title,
                      speaker: ep.speaker || "",
                      description: ep.description || "",
                      videoUrl: ep.videoUrl || "",
                      duration: ep.duration || "",
                      resourceTitle: ep.resourceTitle || "",
                      resourceScripture: ep.resourceScripture || "",
                      resourceDevotional: ep.resourceDevotional || ""
                    });
                    setIsEpisodeDialogOpen(true);
                  }}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteEpisode(ep._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 bg-muted/20 p-4 rounded-xl border border-border/50">
                <div>
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-primary">
                    <FileText className="w-4 h-4" /> Daily Devotional
                  </h4>
                  {ep.resourceTitle ? (
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">{ep.resourceTitle}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{ep.resourceScripture}</p>
                      <p className="text-xs text-muted-foreground line-clamp-3">{ep.resourceDevotional}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No devotional added yet.</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm flex items-center gap-2 text-primary">
                      <Download className="w-4 h-4" /> Downloads / Promo
                    </h4>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] uppercase tracking-widest bg-forest/10 text-forest hover:bg-forest/20" onClick={() => {
                      setActiveEpisodeForDownload(ep);
                      setIsDownloadDialogOpen(true);
                    }}>
                      Add File
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {ep.downloads?.map((dl: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between bg-background border border-border/50 p-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[9px] px-1 py-0">{dl.type}</Badge>
                          <span className="text-xs font-semibold truncate max-w-[120px]">{dl.title}</span>
                        </div>
                        <button className="text-destructive hover:text-red-700" onClick={() => handleRemoveDownload(ep._id, idx)}>
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {(!ep.downloads || ep.downloads.length === 0) && (
                      <p className="text-xs text-muted-foreground italic">No files attached to this episode.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {episodes.length === 0 && (
            <div className="text-center py-20 bg-card rounded-[2rem] border border-border/50 border-dashed">
              <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-bold">No Episodes Yet</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-2">Week of Prayer requires exactly 5 episodes. Add your first episode to begin building this season.</p>
            </div>
          )}
        </div>

        {/* Sidebar - Season Overview */}
        <div className="space-y-6">
          <div className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-sm">
            <h3 className="font-bold text-foreground mb-4">Season Overview</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline">{season.status}</Badge>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Total Episodes</span>
                <span className="font-bold">{episodes.length} / 5</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Price</span>
                <span className="font-bold">${season.price}</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs text-muted-foreground">
                This module allows assigning resources, study guides (PDF), and promotional materials to each specific episode. These resources will only be visible to users who purchase access to this season.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Episode Dialog */}
      <Dialog open={isEpisodeDialogOpen} onOpenChange={setIsEpisodeDialogOpen}>
        <DialogContent className="sm:max-w-[700px] rounded-[2rem] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">
              {editingEpId ? "Edit Episode" : `Add Episode (Day ${episodeForm.day})`}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEpisode} className="space-y-6 py-4">
            <div className="space-y-6">

              <div className="bg-muted/30 p-4 rounded-xl border border-border/50 space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-primary">1. Video Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Episode Title</Label>
                    <Input placeholder="e.g. Behold I am doing a new thing" value={episodeForm.title} onChange={e => setEpisodeForm({ ...episodeForm, title: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Speaker Name</Label>
                    <Input placeholder="e.g. Pastor James Osei" value={episodeForm.speaker} onChange={e => setEpisodeForm({ ...episodeForm, speaker: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-[2fr_1fr] gap-4">
                  <div className="space-y-2">
                    <Label>Video Embed URL</Label>
                    <Input placeholder="https://vimeo.com/..." value={episodeForm.videoUrl} onChange={e => setEpisodeForm({ ...episodeForm, videoUrl: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (MM:SS)</Label>
                    <Input placeholder="45:00" value={episodeForm.duration} onChange={e => setEpisodeForm({ ...episodeForm, duration: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Short Description</Label>
                  <Textarea placeholder="Episode synopsis..." className="h-20" value={episodeForm.description} onChange={e => setEpisodeForm({ ...episodeForm, description: e.target.value })} />
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-xl border border-border/50 space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-primary">2. Daily Devotional / Resources</h4>
                <div className="space-y-2">
                  <Label>Devotional Title</Label>
                  <Input placeholder="e.g. Day 1: What's New?" value={episodeForm.resourceTitle} onChange={e => setEpisodeForm({ ...episodeForm, resourceTitle: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Scripture Reference</Label>
                  <Input placeholder="e.g. Isaiah 43:19" value={episodeForm.resourceScripture} onChange={e => setEpisodeForm({ ...episodeForm, resourceScripture: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Devotional Content</Label>
                  <Textarea placeholder="Write the devotional text here..." className="h-24" value={episodeForm.resourceDevotional} onChange={e => setEpisodeForm({ ...episodeForm, resourceDevotional: e.target.value })} />
                </div>
              </div>

            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-forest h-11 rounded-xl shadow-md">
                {editingEpId ? "Save Changes" : "Save Episode"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Download File Dialog */}
      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold">
              Add Download Material
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddDownload} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>File Title</Label>
              <Input placeholder="e.g. Study Guide PDF" value={downloadForm.title} onChange={e => setDownloadForm({ ...downloadForm, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>File Type</Label>
              <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm" value={downloadForm.type} onChange={e => setDownloadForm({ ...downloadForm, type: e.target.value })}>
                <option value="PDF">PDF (Study Guide)</option>
                <option value="PDF">PDF (Leader Instructions)</option>
                <option value="ZIP">ZIP (Promo Pack)</option>
                <option value="MP4">MP4 (Video)</option>
                <option value="PPTX">PPTX (Slides)</option>
                <option value="Link">External Link</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>File URL</Label>
              <Input placeholder="https://..." value={downloadForm.fileUrl} onChange={e => setDownloadForm({ ...downloadForm, fileUrl: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Short Description (Optional)</Label>
              <Input placeholder="..." value={downloadForm.description} onChange={e => setDownloadForm({ ...downloadForm, description: e.target.value })} />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full bg-forest h-11 rounded-xl shadow-md">
                Add to Episode
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
