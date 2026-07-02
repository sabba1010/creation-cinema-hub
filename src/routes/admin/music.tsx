import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Edit3, Trash2, Music, Disc3, ListMusic, AudioLines, Headphones, ArrowUpRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/admin/music")({
  component: AdminMusic,
});

function StatsCard({ title, value, icon: Icon, color }: any) {
  const colorMap: any = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/10 text-gold",
    sky: "bg-sky/10 text-sky"
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2 transition-all hover:shadow-elevated">
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

// Mock Initial Data
const INITIAL_ALBUMS = [
  {
    id: "1",
    title: "Deborah",
    description: "The courageous story of Deborah, brought to life through dynamic beats and uplifting melodies.",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    songCount: 10,
    listensCount: 45200,
    status: "Active",
    createdAt: "2026-06-15",
  },
  {
    id: "2",
    title: "Abraham",
    description: "Follow the father of faith on his incredible journey, with songs that inspire trust and obedience.",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop",
    songCount: 12,
    listensCount: 61000,
    status: "Active",
    createdAt: "2026-06-20",
  },
  {
    id: "3",
    title: "Samuel",
    description: "Hear the call of Samuel in this beautiful collection of worship and listening to God's voice.",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    songCount: 9,
    listensCount: 28400,
    status: "Active",
    createdAt: "2026-06-25",
  }
];

function AdminMusic() {
  const [albums, setAlbums] = useState(INITIAL_ALBUMS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cover: "",
    status: "Active",
    songs: [{ title: "", audioFile: null as File | null }]
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAlbum) {
      toast.success("Album updated successfully (Mock)");
      setAlbums(albums.map(a => a.id === editingAlbum.id ? { 
        ...a, 
        title: formData.title, 
        description: formData.description,
        cover: formData.cover || a.cover, 
        status: formData.status,
        songCount: formData.songs.length 
      } : a));
    } else {
      toast.success("New album created successfully (Mock)");
      setAlbums([
        {
          id: Math.random().toString(),
          title: formData.title || "New Album",
          description: formData.description,
          cover: formData.cover || "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
          songCount: formData.songs.length,
          listensCount: 0,
          status: formData.status,
          createdAt: new Date().toISOString().split('T')[0],
        },
        ...albums
      ]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingAlbum(null);
    setFormData({
      title: "",
      description: "",
      cover: "",
      status: "Active",
      songs: [{ title: "", audioFile: null }]
    });
  };

  const handleEditClick = (album: any) => {
    setEditingAlbum(album);
    setFormData({
      title: album.title,
      description: album.description || "",
      cover: album.cover,
      status: album.status,
      songs: Array.from({ length: album.songCount }).map((_, i) => ({ title: `Track ${i+1}`, audioFile: null }))
    });
    setIsDialogOpen(true);
  };

  const handleDeleteAlbum = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete ${title}? All tracks will also be deleted.`)) {
      setAlbums(albums.filter(a => a.id !== id));
      toast.success("Album deleted (Mock)");
    }
  };

  const addSongField = () => {
    setFormData(prev => ({
      ...prev,
      songs: [...prev.songs, { title: "", audioFile: null }]
    }));
  };

  const removeSongField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      songs: prev.songs.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Music Management</h1>
          <p className="text-muted-foreground">Manage Kids' Bible Beats albums, tracklists, and cover art.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
            <Plus className="w-4 h-4" />
            New Album
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        {(() => {
          const totalListens = albums.reduce((acc, s) => acc + (s.listensCount || 0), 0);
          const totalEps = albums.reduce((acc, s) => acc + (s.songCount || 0), 0);
          const avgListens = totalEps > 0 ? Math.round(totalListens / totalEps) : 0;
          return (
            <>
              <StatsCard title="Total Listens" value={totalListens.toLocaleString()} icon={Headphones} color="forest" />
              <StatsCard title="Total Tracks" value={totalEps} icon={Music} color="gold" />
              <StatsCard title="Active Albums" value={albums.filter(s => s.status === "Active").length} icon={Disc3} color="sky" />
              <StatsCard title="Avg Listens/Track" value={avgListens.toLocaleString()} icon={TrendingUp} color="forest" />
            </>
          );
        })()}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden transition-all hover:shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Headphones className="w-5 h-5 text-forest" />
              Listens per Album
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={albums.map(a => ({ name: a.title, listens: a.listensCount || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in srgb, var(--border) 50%, transparent)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "color-mix(in srgb, var(--forest) 10%, transparent)" }}
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}
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
              <Music className="w-5 h-5 text-gold" />
              Tracks per Album
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={albums.map(a => ({ name: a.title, tracks: a.songCount || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in srgb, var(--border) 50%, transparent)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "color-mix(in srgb, var(--gold) 10%, transparent)" }}
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "12px", boxShadow: "var(--shadow-card)" }}
                  itemStyle={{ color: "var(--gold)" }}
                />
                <Bar dataKey="tracks" fill="var(--gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Albums Grid (Matching Podcast Style) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <h2 className="text-xl font-display font-bold">Music Albums</h2>
          <Badge variant="outline" className="rounded-lg">{albums.length} Total</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <Card key={album.id} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card group hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
              <div className="h-48 bg-muted relative">
                <img src={album.cover} alt={album.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <Badge className={`absolute top-4 right-4 border-none ${album.status === 'Active' ? 'bg-forest text-white' : 'bg-white/20 backdrop-blur-md text-white'}`}>
                  {album.status}
                </Badge>
                <div className="absolute bottom-4 left-5 text-white font-display font-bold text-2xl">{album.title}</div>
              </div>
              <CardContent className="p-6 flex-grow flex flex-col gap-6">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/30 p-3 rounded-xl">
                  <span className="flex items-center gap-2"><ListMusic className="w-3 h-3 text-forest" /> {album.songCount} Tracks</span>
                  <span className="flex items-center gap-2"><Headphones className="w-3 h-3 text-gold" /> {(album.listensCount || 0).toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl h-10 border-forest/20 text-forest font-bold text-[10px] uppercase tracking-widest hover:bg-forest hover:text-white transition-all gap-2 flex-1"
                    onClick={() => handleEditClick(album)}
                  >
                    <ListMusic className="w-3 h-3" /> Manage Tracks
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
                    onClick={() => handleEditClick(album)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => handleDeleteAlbum(album.id, album.title)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <button
            onClick={() => { resetForm(); setIsDialogOpen(true); }}
            className="border-2 border-dashed border-border/50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 text-muted-foreground hover:bg-forest/5 hover:border-forest/50 hover:text-forest transition-all group"
          >
            <div className="h-14 w-14 rounded-2xl bg-muted/20 flex items-center justify-center group-hover:bg-forest/10 transition-all group-hover:rotate-90">
              <Plus className="w-8 h-8" />
            </div>
            <div className="text-center">
              <span className="font-bold text-sm uppercase tracking-widest block">Create New Album</span>
              <span className="text-[10px] text-muted-foreground mt-1 block">Group your tracks together</span>
            </div>
          </button>
        </div>
      </div>

      {/* Album Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
        <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">
              {editingAlbum ? "Edit Album" : "Create New Album"}
            </DialogTitle>
            <DialogDescription>
              Define your album details and upload audio tracks.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="space-y-8 py-4">
            {/* Album Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Album Title</Label>
                  <Input 
                    placeholder="e.g. Samuel" 
                    className="h-11 rounded-xl"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={v => setFormData({ ...formData, status: v })}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="Enter a brief description for this album..." 
                  className="rounded-xl min-h-[100px] bg-background border-border/50 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Square Cover Image</Label>
                <div className="flex gap-4 items-center">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    className="h-11 rounded-xl flex-1 pt-2.5 file:text-xs"
                  />
                  {formData.cover && (
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-border shrink-0">
                      <img src={formData.cover} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tracklist Management */}
            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2"><ListMusic className="w-5 h-5 text-forest" /> Tracklist ({formData.songs.length})</h3>
                <Button type="button" variant="outline" size="sm" onClick={addSongField} className="rounded-lg gap-2">
                  <Plus className="w-4 h-4" /> Add Track
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.songs.map((song, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-4 bg-muted/20 rounded-xl border border-border/50 relative group">
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center font-bold text-sm shrink-0 border border-border">
                      {idx + 1}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Track Title</Label>
                        <Input 
                          placeholder={`Track ${idx + 1} Title`} 
                          value={song.title}
                          onChange={(e) => {
                            const newSongs = [...formData.songs];
                            newSongs[idx].title = e.target.value;
                            setFormData({...formData, songs: newSongs});
                          }}
                          className="h-10 rounded-lg"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-1"><AudioLines className="w-3 h-3"/> Audio File (MP3)</Label>
                        <Input 
                          type="file" 
                          accept="audio/*" 
                          className="h-10 rounded-lg pt-1.5 file:text-xs"
                        />
                      </div>
                    </div>
                    {formData.songs.length > 1 && (
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeSongField(idx)}
                        className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity absolute -right-2 -top-2 bg-background shadow-md rounded-full w-6 h-6 border border-border"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px]"
            >
              {editingAlbum ? "Save Album Changes" : "Create Album"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
