import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mic,
  Plus,
  ListMusic,
  MoreVertical,
  Trash2,
  Headphones,
  CloudUpload,
  ArrowUpRight,
  Settings,
  Edit3,
  TrendingUp
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

function StatsCard({ title, value, icon: Icon, color }: any) {
  const colorMap: any = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/10 text-gold",
    sky: "bg-sky/10 text-sky"
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2 transition-all">
      <div className={`p-3 rounded-2xl w-fit ${colorMap[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-0.5">
        <div className="text-3xl font-bold font-display">{value}</div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</div>
      </div>
      <div className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 mt-2">
        <ArrowUpRight className="w-3 h-3" />
        +5% growth
      </div>
    </Card>
  );
}

export const Route = createFileRoute("/admin/podcast")({
  component: PodcastManagement,
});

import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";

function PodcastManagement() {
  const [seasons, setSeasons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [bannerSettings, setBannerSettings] = useState({
    tag: "OMS Podcast Network",
    title: "God's Great Earth Podcast",
    description: "Join us every Tuesday for deep conversations, biblical insights, and stories that celebrate the wonder of our Creator. Available on all major platforms.",
    buttonText: "Latest Episode",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
    videoTitle: "The Majesty of the Mountains",
    videoSubtitle: "Watch Episode",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    audioTitle: "The Architecture of Light",
    audioSeasonTitle: "Season 1, Episode 1"
  });
  const [isBannerSettingsOpen, setIsBannerSettingsOpen] = useState(false);

  const [isNewSeasonOpen, setIsNewSeasonOpen] = useState(false);
  const [isEditSeasonOpen, setIsEditSeasonOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<any>(null);

  const [seasonForm, setSeasonForm] = useState({ title: "", description: "", status: "Active", image: "", spotifyUrl: "", applePodcastsUrl: "" });

  const fetchSeasons = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/podcast/seasons`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setSeasons(data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch seasons");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeasons();
    fetchBannerSettings();
  }, []);

  const fetchBannerSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("user_token")}` }
      });
      const data = await res.json();
      if (data.success && data.data.podcast_banner) {
        setBannerSettings(data.data.podcast_banner);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBannerSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        },
        body: JSON.stringify({ key: "podcast_banner", value: bannerSettings })
      });
      if (res.ok) {
        toast.success("Banner settings updated!");
        setIsBannerSettingsOpen(false);
      } else {
        toast.error("Failed to update banner settings");
      }
    } catch (err) {
      toast.error("Failed to update banner settings");
    }
  };

  const handleCreateSeason = async () => {
    try {
      const res = await fetch(`${API_URL}/api/podcast/seasons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        },
        body: JSON.stringify(seasonForm)
      });
      if (res.ok) {
        toast.success("Season created successfully!");
        setIsNewSeasonOpen(false);
        setSeasonForm({ title: "", description: "", status: "Active", image: "", spotifyUrl: "", applePodcastsUrl: "" });
        fetchSeasons();
      } else {
        toast.error("Failed to create season");
      }
    } catch (err) {
      toast.error("Failed to create season");
    }
  };

  const handleUpdateSeason = async () => {
    if (!selectedSeason) return;
    try {
      const res = await fetch(`${API_URL}/api/podcast/seasons/${selectedSeason._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        },
        body: JSON.stringify(seasonForm)
      });
      if (res.ok) {
        toast.success("Season updated successfully!");
        setIsEditSeasonOpen(false);
        setSelectedSeason(null);
        fetchSeasons();
      } else {
        toast.error("Failed to update season");
      }
    } catch (err) {
      toast.error("Failed to update season");
    }
  };

  const handleDeleteSeason = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete ${title}? All episodes will also be deleted.`)) return;
    try {
      const res = await fetch(`${API_URL}/api/podcast/seasons/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`
        }
      });
      if (res.ok) {
        toast.success(`${title} deleted.`);
        fetchSeasons();
      } else {
        toast.error("Failed to delete season");
      }
    } catch (err) {
      toast.error("Failed to delete season");
    }
  };



  const handleEditClick = (season: any) => {
    setSelectedSeason(season);
    setSeasonForm({
      title: season.title,
      description: season.description,
      status: season.status,
      image: season.image,
      spotifyUrl: season.spotifyUrl || "",
      applePodcastsUrl: season.applePodcastsUrl || ""
    });
    setIsEditSeasonOpen(true);
  };

  const handleImageUpload = async (e: any, setForm: any, formField: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const toastId = toast.loading("Uploading file...");
      try {
        const res = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          // Store the full url for images, audio, etc.
          const fullUrl = `${API_URL}${data.url}`;
          setForm((prev: any) => ({ ...prev, [formField]: fullUrl }));
          toast.success("Upload complete!", { id: toastId });
        } else {
          toast.error(data.message || "Upload failed", { id: toastId });
        }
      } catch (err) {
        toast.error("Upload error", { id: toastId });
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Podcast Management</h1>
          <p className="text-muted-foreground">Control your seasons and publish new episodes.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2" onClick={() => setIsBannerSettingsOpen(true)}>
            <Settings className="w-4 h-4" />
            Banner Settings
          </Button>
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2" onClick={() => { setSeasonForm({ title: "", description: "", status: "Active", image: "", spotifyUrl: "", applePodcastsUrl: "" }); setIsNewSeasonOpen(true); }}>
            <Plus className="w-4 h-4" />
            New Season
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {(() => {
          const totalListens = seasons.reduce((acc, s) => acc + (s.listensCount || 0), 0);
          const totalEps = seasons.reduce((acc, s) => acc + (s.episodesCount || 0), 0);
          const avgListens = totalEps > 0 ? Math.round(totalListens / totalEps) : 0;
          return (
            <>
              <StatsCard title="Total Listens" value={totalListens} icon={Headphones} color="forest" />
              <StatsCard title="Total Episodes" value={totalEps} icon={Mic} color="gold" />
              <StatsCard title="Active Seasons" value={seasons.filter(s => s.status === "Active").length} icon={ListMusic} color="sky" />
              <StatsCard title="Avg Listens/Ep" value={avgListens} icon={TrendingUp} color="forest" />
            </>
          );
        })()}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden transition-all hover:shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Headphones className="w-5 h-5 text-forest" />
              Listens per Season
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasons.map(s => ({ name: s.title, listens: s.listensCount || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in srgb, var(--border) 50%, transparent)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "color-mix(in srgb, var(--forest) 10%, transparent)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow-card)"
                  }}
                  itemStyle={{ color: "var(--forest)" }}
                />
                <Bar dataKey="listens" fill="var(--forest)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden transition-all hover:shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Mic className="w-5 h-5 text-gold" />
              Episodes per Season
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasons.map(s => ({ name: s.title, episodes: s.episodesCount || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in srgb, var(--border) 50%, transparent)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "color-mix(in srgb, var(--gold) 10%, transparent)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow-card)"
                  }}
                  itemStyle={{ color: "var(--gold)" }}
                />
                <Bar dataKey="episodes" fill="var(--gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <h2 className="text-xl font-display font-bold">Podcast Seasons</h2>
          <Badge variant="outline" className="rounded-lg">{seasons.length} Total</Badge>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-forest border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {seasons.map((season) => (
              <Card key={season._id} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card group hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
                <div className="h-40 bg-muted relative">
                  <img src={season.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"} alt={season.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <Badge className={`absolute top-4 right-4 border-none ${season.status === 'Active' ? 'bg-forest text-white' : 'bg-white/20 backdrop-blur-md text-white'}`}>
                    {season.status}
                  </Badge>
                  <div className="absolute bottom-4 left-5 text-white font-display font-bold text-xl">{season.title}</div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col gap-6">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/30 p-3 rounded-xl">
                    <span className="flex items-center gap-2"><ListMusic className="w-3 h-3 text-forest" /> {season.episodesCount || 0} Eps</span>
                    <span className="flex items-center gap-2"><Headphones className="w-3 h-3 text-gold" /> {season.listensCount || 0}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/admin/podcast-season/$seasonId" params={{ seasonId: season._id }} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-xl h-10 border-forest/20 text-forest font-bold text-[10px] uppercase tracking-widest hover:bg-forest hover:text-white transition-all gap-2"
                      >
                        <Mic className="w-3 h-3" /> Manage Episodes
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
                      onClick={() => handleEditClick(season)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                      onClick={() => handleDeleteSeason(season._id, season.title)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <button
              onClick={() => { setSeasonForm({ title: "", description: "", status: "Active", image: "", spotifyUrl: "", applePodcastsUrl: "" }); setIsNewSeasonOpen(true); }}
              className="border-2 border-dashed border-border/50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 text-muted-foreground hover:bg-forest/5 hover:border-forest/50 hover:text-forest transition-all group"
            >
              <div className="h-14 w-14 rounded-2xl bg-muted/20 flex items-center justify-center group-hover:bg-forest/10 transition-all group-hover:rotate-90">
                <Plus className="w-8 h-8" />
              </div>
              <div className="text-center">
                <span className="font-bold text-sm uppercase tracking-widest block">Create New Season</span>
                <span className="text-[10px] text-muted-foreground mt-1 block">Group your episodes together</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* New Season Dialog */}
      <Dialog open={isNewSeasonOpen} onOpenChange={setIsNewSeasonOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">New Podcast Season</DialogTitle>
            <DialogDescription>Define a new collection for your episodes.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Season Title</Label>
              <Input placeholder="e.g. Journey to the Deep" className="h-11 rounded-xl" value={seasonForm.title} onChange={e => setSeasonForm({ ...seasonForm, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Season Description</Label>
              <Textarea placeholder="Brief overview of this season..." className="rounded-xl min-h-[100px]" value={seasonForm.description} onChange={e => setSeasonForm({ ...seasonForm, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={seasonForm.status} onValueChange={v => setSeasonForm({ ...seasonForm, status: v })}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cover Art</Label>
                <Input type="file" accept="image/*" className="h-11 rounded-xl file:text-xs" onChange={e => handleImageUpload(e, setSeasonForm, 'image')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Spotify Link (Optional)</Label>
                <Input placeholder="https://open.spotify.com/..." className="h-11 rounded-xl" value={seasonForm.spotifyUrl} onChange={e => setSeasonForm({ ...seasonForm, spotifyUrl: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Apple Podcasts Link (Optional)</Label>
                <Input placeholder="https://podcasts.apple.com/..." className="h-11 rounded-xl" value={seasonForm.applePodcastsUrl} onChange={e => setSeasonForm({ ...seasonForm, applePodcastsUrl: e.target.value })} />
              </div>
            </div>
            <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px]" onClick={handleCreateSeason}>
              Create Season
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      {/* Edit Season Dialog */}
      <Dialog open={isEditSeasonOpen} onOpenChange={setIsEditSeasonOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">Edit Season</DialogTitle>
            <DialogDescription>Modify settings for "{selectedSeason?.title}"</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Season Title</Label>
              <Input value={seasonForm.title} onChange={e => setSeasonForm({ ...seasonForm, title: e.target.value })} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Season Description</Label>
              <Textarea value={seasonForm.description} onChange={e => setSeasonForm({ ...seasonForm, description: e.target.value })} className="rounded-xl min-h-[100px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current Status</Label>
                <Select value={seasonForm.status} onValueChange={v => setSeasonForm({ ...seasonForm, status: v })}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cover Art</Label>
                <Input type="file" accept="image/*" className="h-11 rounded-xl file:text-xs" onChange={e => handleImageUpload(e, setSeasonForm, 'image')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Spotify Link</Label>
                <Input placeholder="https://open.spotify.com/..." className="h-11 rounded-xl" value={seasonForm.spotifyUrl} onChange={e => setSeasonForm({ ...seasonForm, spotifyUrl: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Apple Podcasts Link</Label>
                <Input placeholder="https://podcasts.apple.com/..." className="h-11 rounded-xl" value={seasonForm.applePodcastsUrl} onChange={e => setSeasonForm({ ...seasonForm, applePodcastsUrl: e.target.value })} />
              </div>
            </div>
            <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px]" onClick={handleUpdateSeason}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Banner Settings Dialog */}
      <Dialog open={isBannerSettingsOpen} onOpenChange={setIsBannerSettingsOpen}>
        <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">Podcast Banner Settings</DialogTitle>
            <DialogDescription>Customize the header on the Podcast page.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tag (e.g. OMS Podcast Network)</Label>
                <Input className="h-11 rounded-xl" value={bannerSettings.tag} onChange={e => setBannerSettings({ ...bannerSettings, tag: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input className="h-11 rounded-xl" value={bannerSettings.buttonText} onChange={e => setBannerSettings({ ...bannerSettings, buttonText: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Main Title</Label>
              <Input className="h-11 rounded-xl" value={bannerSettings.title} onChange={e => setBannerSettings({ ...bannerSettings, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea className="rounded-xl min-h-[80px]" value={bannerSettings.description} onChange={e => setBannerSettings({ ...bannerSettings, description: e.target.value })} />
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-bold mb-4">Featured Episode Content</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Video Title (on Image)</Label>
                  <Input className="h-11 rounded-xl" value={bannerSettings.videoTitle} onChange={e => setBannerSettings({ ...bannerSettings, videoTitle: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Video Subtitle</Label>
                  <Input className="h-11 rounded-xl" value={bannerSettings.videoSubtitle} onChange={e => setBannerSettings({ ...bannerSettings, videoSubtitle: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Audio Title (in Player)</Label>
                  <Input className="h-11 rounded-xl" value={bannerSettings.audioTitle} onChange={e => setBannerSettings({ ...bannerSettings, audioTitle: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Audio Season Info</Label>
                  <Input className="h-11 rounded-xl" value={bannerSettings.audioSeasonTitle} onChange={e => setBannerSettings({ ...bannerSettings, audioSeasonTitle: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <Input type="file" accept="image/*" className="h-11 rounded-xl file:text-xs" onChange={e => handleImageUpload(e, setBannerSettings, 'image')} />
                  {bannerSettings.image && <p className="text-[10px] text-muted-foreground truncate">Current: {bannerSettings.image}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Audio File</Label>
                  <Input type="file" accept="audio/*" className="h-11 rounded-xl file:text-xs" onChange={e => handleImageUpload(e, setBannerSettings, 'audioUrl')} />
                  {bannerSettings.audioUrl && <p className="text-[10px] text-muted-foreground truncate">Current: {bannerSettings.audioUrl}</p>}
                </div>
              </div>
            </div>

            <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px] mt-4" onClick={handleUpdateBannerSettings}>
              Save Banner Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
