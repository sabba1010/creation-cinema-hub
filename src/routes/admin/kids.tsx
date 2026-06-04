import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Baby,
  Plus,
  Layers,
  Star,
  UserCheck,
  CreditCard,
  Search,
  MoreVertical,
  FolderOpen,
  LayoutGrid,
  Heart,
  ShieldCheck,
  Sparkles,
  Music,
  Tv,
  Play,
  Trash2,
  Edit,
  CloudUpload,
  UserPlus,
  Mail,
  Filter,
  FileVideo,
  Mic2,
  Settings,
  Sun,
  Cloud,
  Anchor
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "sonner";
import Swal from "sweetalert2";

export const Route = createFileRoute("/admin/kids")({
  component: KidsManagement,
});

// Synchronized with public Kids page
const INITIAL_SERIES = [
  { id: 1, name: "Friendly Forest", episodes: 12, subscribers: 1240, status: "Active", topic: "Kindness", img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&h=200&fit=crop" },
  { id: 2, name: "Star Sailors", episodes: 8, subscribers: 980, status: "Active", topic: "Courage", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=200&fit=crop" },
  { id: 3, name: "Miracle Makers", episodes: 15, subscribers: 2100, status: "Active", topic: "Worship", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&h=200&fit=crop" },
  { id: 4, name: "Bible Buddies", episodes: 24, subscribers: 3500, status: "Active", topic: "Creation", img: "https://images.unsplash.com/photo-1519340241574-211915c54970?w=400&h=200&fit=crop" },
];

const INITIAL_TOPICS = [
  { id: 1, name: "Kindness", icon: Heart, count: 12, status: "Active" },
  { id: 2, name: "Courage", icon: ShieldCheck, count: 8, status: "Active" },
  { id: 3, name: "Creation", icon: Sparkles, count: 24, status: "Active" },
  { id: 4, name: "Worship", icon: Music, count: 15, status: "Active" },
  { id: 5, name: "Honesty", icon: Star, count: 5, status: "Active" },
  { id: 6, name: "Joy", icon: Sun, count: 9, status: "Active" },
  { id: 7, name: "Peace", icon: Cloud, count: 6, status: "Active" },
  { id: 8, name: "Faith", icon: Anchor, count: 10, status: "Active" },
];

const INITIAL_CONTENT = [
  { id: 1, title: "The Lying Lion", type: "Video", series: "Friendly Forest", length: "12:45", views: 1240 },
  { id: 2, title: "Noah's Song", type: "Audio", series: "Bible Buddies", length: "03:20", views: 890 },
  { id: 3, title: "Star Gazer 101", type: "Video", series: "Star Sailors", length: "15:00", views: 450 },
];

const INITIAL_LIFETIME = [
  { id: 1, name: "James Wilson", email: "james.w@example.com", joined: "Jan 12, 2026", source: "Founder Pack" },
  { id: 2, name: "Emma Thompson", email: "emma.t@example.com", joined: "Feb 05, 2026", source: "Promo Code" },
];

function KidsManagement() {
  const [series, setSeries] = useState<any[]>([]);
  const [topics, setTopics] = useState(INITIAL_TOPICS);
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [lifetimeUsers, setLifetimeUsers] = useState(INITIAL_LIFETIME);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("series");

  // Dialog States
  const [isSeriesDialogOpen, setIsSeriesDialogOpen] = useState(false);
  const [isGrantDialogOpen, setIsGrantDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form States
  const [heroBanner, setHeroBanner] = useState("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000");
  const [seriesForm, setSeriesForm] = useState({ name: "", description: "", image: "", trailer: "", trailerTitle: "", trailerDescription: "", topic: "Kindness" });
  const [grantForm, setGrantForm] = useState({ name: "", email: "", source: "Manual Grant" });
  const [uploadForm, setUploadForm] = useState({ title: "", description: "", vimeoLink: "", seriesId: "" });
  const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);

  const fetchSeries = async () => {
    try {
      const res = await fetch("https://movie-backend-drab.vercel.app/api/kids/series");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSeries(data);
      } else {
        console.error("Expected array but got:", data);
        setSeries([]);
      }
    } catch (err) {
      console.error("Error fetching series", err);
      setSeries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("https://movie-backend-drab.vercel.app/api/kids/settings");
      const data = await res.json();
      if (data && data.value) setHeroBanner(data.value);
    } catch (err) {
      console.error("Error fetching settings", err);
    }
  };

  useEffect(() => {
    fetchSeries();
    fetchSettings();
  }, []);

  const handleAddSeries = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSeriesId
        ? `https://movie-backend-drab.vercel.app/api/kids/series/${editingSeriesId}`
        : "https://movie-backend-drab.vercel.app/api/kids/series";
      const method = editingSeriesId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: seriesForm.name,
          description: seriesForm.description,
          topic: seriesForm.topic,
          image: seriesForm.image || "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop",
          trailer: seriesForm.trailer,
          trailerTitle: seriesForm.trailerTitle,
          trailerDescription: seriesForm.trailerDescription,
          status: "Active"
        })
      });
      if (res.ok) {
        setIsSeriesDialogOpen(false);
        setSeriesForm({ name: "", description: "", image: "", trailer: "", trailerTitle: "", trailerDescription: "", topic: "Kindness" });
        setEditingSeriesId(null);
        Swal.fire({
          title: 'Success!',
          text: editingSeriesId ? 'Series has been updated successfully.' : `${seriesForm.name} has been added!`,
          icon: 'success',
          confirmButtonColor: '#2C4A3B',
          confirmButtonText: 'Great'
        });
        fetchSeries();
      }
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: editingSeriesId ? 'Failed to update series.' : 'Failed to add series.',
        icon: 'error',
        confirmButtonColor: '#2C4A3B'
      });
    }
  };

  const openEditSeries = (item: any) => {
    setEditingSeriesId(item._id || item.id);
    setSeriesForm({
      name: item.name || "",
      description: item.description || item.desc || "",
      topic: item.topic || "Kindness",
      image: item.image || item.img || "",
      trailer: item.trailer || "",
      trailerTitle: "",
      trailerDescription: ""
    });
    setIsSeriesDialogOpen(true);
  };

  const toggleSeriesStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "Active" ? "Draft" : "Active";
      await fetch(`https://movie-backend-drab.vercel.app/api/kids/series/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      fetchSeries();
      toast.success("Series status updated!");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteSeries = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#2C4A3B',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`https://movie-backend-drab.vercel.app/api/kids/series/${id}`, { method: "DELETE" });
      fetchSeries();
      Swal.fire({
        title: 'Deleted!',
        text: 'Series has been deleted.',
        icon: 'success',
        confirmButtonColor: '#2C4A3B'
      });
    } catch (err) {
      Swal.fire('Error!', 'Failed to delete series.', 'error');
    }
  };

  const toggleTopicStatus = (id: number) => {
    setTopics(topics.map(t => t.id === id ? {
      ...t,
      status: t.status === "Active" ? "Pending" : "Active"
    } : t));
    toast.success("Category status updated!");
  };

  const handleUploadContent = (e: React.FormEvent) => {
    e.preventDefault();
    const seriesName = series.find(s => (s._id || s.id).toString() === uploadForm.seriesId)?.name || "Unknown Series";
    const newC = {
      id: Date.now(),
      title: uploadForm.title,
      type: "Video",
      series: seriesName,
      length: "00:00",
      views: 0,
    };
    setContent([newC, ...content]);
    setIsUploadDialogOpen(false);
    toast.success(`Episode ${uploadForm.title} added to ${seriesName}!`);
  };

  const handleGrantLifetime = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: grantForm.name,
      email: grantForm.email,
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      source: grantForm.source
    };
    setLifetimeUsers([newUser, ...lifetimeUsers]);
    setIsGrantDialogOpen(false);
    toast.success(`Lifetime access granted to ${grantForm.name}`);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">KidsBibleFlix</h1>
          <p className="text-muted-foreground">Manage kid-safe streaming content, series, topics, and memberships.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2" onClick={() => setIsSettingsDialogOpen(true)}>
            <Settings className="w-4 h-4" />
            Page Settings
          </Button>
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2" onClick={() => setIsSeriesDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            New Series
          </Button>
          <Button className="hidden bg-forest h-11 rounded-xl gap-2 shadow-md" onClick={() => setIsUploadDialogOpen(true)}>
            <CloudUpload className="w-4 h-4" />
            Upload Content
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Series" value={(series?.length || 0).toString()} icon={Layers} color="gold" />
        <StatsCard title="Categories" value={(topics?.length || 0).toString()} icon={Heart} color="forest" />
        <StatsCard title="Total Content" value={(content?.length || 0).toString()} icon={Play} color="sky" />
        <StatsCard title="Lifetime Users" value={(lifetimeUsers?.length || 0).toString()} icon={Star} color="gold" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="series" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Series</TabsTrigger>
          <TabsTrigger value="topics" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Categories</TabsTrigger>
          <TabsTrigger value="lifetime" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Lifetime Access</TabsTrigger>
        </TabsList>

        <TabsContent value="series" className="m-0 mt-8">
          {selectedCategory && (
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-forest/5 border border-forest/20 w-fit">
              <span className="text-sm text-muted-foreground">Filtered by:</span>
              <span className="font-bold text-forest">{selectedCategory}</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1.5 ml-1 px-3 py-1 rounded-full bg-red-500/10 text-red-600 border border-red-400/30 text-xs font-bold hover:bg-red-500/20 hover:border-red-500/50 transition-all active:scale-95"
              >
                ✕ Clear filter
              </button>
            </div>
          )}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin h-10 w-10 border-4 border-forest border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <button
                onClick={() => { setEditingSeriesId(null); setSeriesForm({ name: "", description: "", image: "", trailer: "", trailerTitle: "", trailerDescription: "", topic: "Kindness" }); setIsSeriesDialogOpen(true); }}
                className="h-full min-h-[280px] rounded-[2rem] border-2 border-dashed border-[#EFECE3] flex flex-col items-center justify-center text-muted-foreground hover:bg-white/50 hover:border-forest hover:text-forest transition-all group"
              >
                <Plus className="w-8 h-8 mb-4 transition-transform group-hover:scale-110" />
                <span className="font-bold font-display tracking-wider text-sm">Add New Series</span>
              </button>
              {(series || []).filter(item => !selectedCategory || item.topic === selectedCategory).map((item) => (
                <Card key={item._id || item.id || Math.random()} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elevated transition-all group overflow-hidden flex flex-col">
                  <div className="h-32 bg-muted relative overflow-hidden">
                    <img
                      src={item.image || item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white font-display font-bold text-lg">{item.name}</div>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditSeries(item)}
                        className="bg-white/80 text-forest p-1.5 rounded-full hover:bg-white shadow-md transition-colors"
                        title="Edit Series"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSeries(item._id)}
                        className="bg-red-500/80 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md transition-colors"
                        title="Delete Series"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <CardContent className="p-4 flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.description || item.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{item.episodeCount ?? item.episodes ?? 0} Episodes</div>
                      <Badge className="bg-forest/10 text-forest border-forest/20 text-[10px]">{item.topic}</Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <UserCheck className="w-3.5 h-3.5 text-forest" />
                        {(item.subscribers || 0).toLocaleString()} Viewers
                      </div>
                      <button onClick={() => toggleSeriesStatus(item._id, item.status)} className="transition-transform hover:scale-105 active:scale-95">
                        <Badge variant="outline" className={`text-[10px] uppercase tracking-tighter cursor-pointer ${item.status === 'Active' ? 'border-forest/50 text-forest hover:bg-forest/5' : 'border-muted-foreground/50 text-muted-foreground hover:bg-muted-foreground/5'}`}>
                          {item.status}
                        </Badge>
                      </button>
                    </div>
                    <Link to="/admin/kids-series/$seriesId" params={{ seriesId: (item._id || item.id).toString() }} className="w-full block mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 text-xs border-dashed hover:border-forest/50 hover:bg-forest/5"
                      >
                        <Settings className="w-3 h-3" /> Manage Series
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>


        <TabsContent value="topics" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50">
                  <TableHead className="font-bold">Category Name</TableHead>
                  <TableHead className="font-bold">Icon</TableHead>
                  <TableHead className="font-bold">Series Count</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topics.map(t => {
                  const realCount = series.filter(s => s.topic === t.name).length;
                  return (
                    <TableRow
                      key={t.id}
                      className="border-border/50 group cursor-pointer hover:bg-muted/10 transition-colors"
                      onClick={() => { setSelectedCategory(t.name); setActiveTab("series"); }}
                    >
                      <TableCell className="font-bold text-base">{t.name}</TableCell>
                      <TableCell><t.icon className="w-5 h-5 text-forest" /></TableCell>
                      <TableCell>{realCount} Series</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Active</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>



        <TabsContent value="lifetime">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search lifetime users..." className="pl-10 h-11 rounded-xl bg-muted/20 border-border/50" />
              </div>
              <Button className="bg-gold text-forest-deep font-bold h-11 rounded-xl px-6 hover:bg-gold/90 transition-all active:scale-95 shadow-md" onClick={() => setIsGrantDialogOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Grant Lifetime Access
              </Button>
            </div>
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50">
                  <TableHead className="font-bold">User</TableHead>
                  <TableHead className="font-bold">Email</TableHead>
                  <TableHead className="font-bold">Joined Date</TableHead>
                  <TableHead className="font-bold">Source</TableHead>
                  <TableHead className="text-right font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lifetimeUsers.map((user) => (
                  <TableRow key={user.id} className="border-border/50 group hover:bg-muted/5 transition-colors">
                    <TableCell className="font-medium text-base">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold border-gold/30 text-gold-foreground bg-gold/5 uppercase text-[9px] tracking-widest">
                        {user.source}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        Revoke Access
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">KidsBibleFlix Page Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Public Hero Banner Image</Label>
              <div className="mt-2 mb-4 h-32 rounded-xl overflow-hidden bg-muted border-2 border-border/50">
                <img src={heroBanner} alt="Hero Banner Preview" className="w-full h-full object-cover" />
              </div>
              <Input
                type="file"
                accept="image/*"
                className="h-11 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-forest/10 file:text-forest hover:file:bg-forest/20 transition-all cursor-pointer"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setHeroBanner(URL.createObjectURL(file));
                    toast.success("Public hero banner updated!");
                  }
                }}
              />
              <p className="text-xs text-muted-foreground mt-2">Upload a new image from your computer to change the main car banner on the public Kids page.</p>
            </div>
            <Button className="w-full bg-forest h-11 rounded-xl" onClick={() => setIsSettingsDialogOpen(false)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSeriesDialogOpen} onOpenChange={(open) => {
        setIsSeriesDialogOpen(open);
        if (!open) {
          setEditingSeriesId(null);
          setSeriesForm({ name: "", description: "", image: "", trailer: "", trailerTitle: "", trailerDescription: "", topic: "Kindness" });
        }
      }}>
        <DialogContent className="sm:max-w-[600px] rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">{editingSeriesId ? "Edit Series" : "Create New Series"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSeries} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Series Title</Label>
                <Input
                  placeholder="e.g. Parable Pals"
                  className="h-11 rounded-xl"
                  value={seriesForm.name}
                  onChange={e => setSeriesForm({ ...seriesForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  placeholder="Brief description of the series"
                  className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={seriesForm.description}
                  onChange={e => setSeriesForm({ ...seriesForm, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Image Banner</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="h-11 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-forest/10 file:text-forest hover:file:bg-forest/20 transition-all cursor-pointer"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSeriesForm({ ...seriesForm, image: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              {seriesForm.trailer && (
                <div className="space-y-4 border-l-4 border-gold pl-4 py-2 my-4 bg-cream/10 rounded-r-xl">
                  <div className="space-y-2">
                    <Label className="text-forest-deep font-bold">Intro Video Title</Label>
                    <Input
                      placeholder="e.g. Introduction to Parable Pals"
                      className="h-11 rounded-xl"
                      value={seriesForm.trailerTitle}
                      onChange={e => setSeriesForm({ ...seriesForm, trailerTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-forest-deep font-bold">Intro Video Description</Label>
                    <textarea
                      placeholder="Brief description of this intro episode"
                      className="flex min-h-[80px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={seriesForm.trailerDescription}
                      onChange={e => setSeriesForm({ ...seriesForm, trailerDescription: e.target.value })}
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label>Category (Character Virtue)</Label>
                <Select value={seriesForm.topic} onValueChange={val => setSeriesForm({ ...seriesForm, topic: val })}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Kindness">Kindness</SelectItem>
                    <SelectItem value="Courage">Courage</SelectItem>
                    <SelectItem value="Creation">Creation</SelectItem>
                    <SelectItem value="Worship">Worship</SelectItem>
                    <SelectItem value="Honesty">Honesty</SelectItem>
                    <SelectItem value="Joy">Joy</SelectItem>
                    <SelectItem value="Peace">Peace</SelectItem>
                    <SelectItem value="Faith">Faith</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-forest h-11 rounded-xl">{editingSeriesId ? "Update Series" : "Create Series"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">Add Episode/Video</DialogTitle>
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
                <Input
                  placeholder="Brief description"
                  className="h-11 rounded-xl"
                  value={uploadForm.description}
                  onChange={e => setUploadForm({ ...uploadForm, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Vimeo Link</Label>
                <Input
                  placeholder="https://vimeo.com/..."
                  className="h-11 rounded-xl"
                  value={uploadForm.vimeoLink}
                  onChange={e => setUploadForm({ ...uploadForm, vimeoLink: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Select Series</Label>
                <Select value={uploadForm.seriesId} onValueChange={val => setUploadForm({ ...uploadForm, seriesId: val })} required>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select a series" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {(series || []).map(s => (
                      <SelectItem key={s._id || s.id || Math.random()} value={(s._id || s.id || Math.random()).toString()}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full bg-forest h-11 rounded-xl">Save Episode</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
  const colorMap: any = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/10 text-gold",
    sky: "bg-sky/10 text-sky"
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
      <div className={`p-3 rounded-2xl w-fit ${colorMap[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl font-bold font-display">{value}</div>
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">{title}</div>
    </Card>
  );
}
