import { createFileRoute } from "@tanstack/react-router";
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
  Edit3
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
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
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2 transition-all hover:-translate-y-1">
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

const INITIAL_SEASONS = [
  { id: 1, title: "The Wonder of Creation", episodes: 12, listens: "45.2K", status: "Completed", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop" },
  { id: 2, title: "Faith in the Modern Age", episodes: 10, listens: "32.1K", status: "Active", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=250&fit=crop" },
  { id: 3, title: "Stories of the Seed", episodes: 8, listens: "12.5K", status: "Active", img: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?w=400&h=250&fit=crop" },
];

function PodcastManagement() {
  const [seasons, setSeasons] = useState(INITIAL_SEASONS);
  const [isAddEpisodeOpen, setIsAddEpisodeOpen] = useState(false);
  const [isNewSeasonOpen, setIsNewSeasonOpen] = useState(false);
  const [isEditSeasonOpen, setIsEditSeasonOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<any>(null);

  const handleDeleteSeason = (id: number, title: string) => {
    setSeasons(seasons.filter(s => s.id !== id));
    toast.error(`${title} deleted from database`);
  };

  const handleEditClick = (season: any) => {
    setSelectedSeason(season);
    setIsEditSeasonOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Podcast Management</h1>
          <p className="text-muted-foreground">Control your seasons and publish new episodes.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2" onClick={() => setIsNewSeasonOpen(true)}>
            <Plus className="w-4 h-4" />
            New Season
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md" onClick={() => setIsAddEpisodeOpen(true)}>
            <Mic className="w-4 h-4" />
            Add Episode
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Listens" value="89.8K" icon={Headphones} color="forest" />
        <StatsCard title="Total Episodes" value="30" icon={Mic} color="gold" />
        <StatsCard title="Active Seasons" value="2" icon={ListMusic} color="sky" />
        <StatsCard title="Avg. Listen Time" value="18m" icon={Settings} color="forest" />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
           <h2 className="text-xl font-display font-bold">Podcast Seasons</h2>
           <Badge variant="outline" className="rounded-lg">{seasons.length} Total</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seasons.map((season) => (
            <Card key={season.id} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card group hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
               <div className="h-40 bg-muted relative">
                  <img src={season.img} alt={season.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <Badge className={`absolute top-4 right-4 border-none ${season.status === 'Active' ? 'bg-forest' : 'bg-white/20 backdrop-blur-md text-white'}`}>
                     {season.status}
                  </Badge>
                  <div className="absolute bottom-4 left-5 text-white font-display font-bold text-xl">{season.title}</div>
               </div>
               <CardContent className="p-6 flex-grow flex flex-col gap-6">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/30 p-3 rounded-xl">
                     <span className="flex items-center gap-2"><ListMusic className="w-3 h-3 text-forest" /> {season.episodes} Eps</span>
                     <span className="flex items-center gap-2"><Headphones className="w-3 h-3 text-gold" /> {season.listens}</span>
                  </div>
                  <div className="flex gap-2">
                     <Button 
                       variant="outline" 
                       size="sm" 
                       className="flex-1 rounded-xl h-10 border-forest/20 text-forest font-bold text-[10px] uppercase tracking-widest hover:bg-forest hover:text-white transition-all gap-2"
                       onClick={() => handleEditClick(season)}
                     >
                        <Edit3 className="w-3 h-3" /> Edit Season
                     </Button>
                     <Button 
                       variant="ghost" 
                       size="icon" 
                       className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10 transition-colors" 
                       onClick={() => handleDeleteSeason(season.id, season.title)}
                     >
                        <Trash2 className="w-4 h-4" />
                     </Button>
                  </div>
               </CardContent>
            </Card>
          ))}
          
          <button 
            onClick={() => setIsNewSeasonOpen(true)}
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
      </div>

      {/* --- FAKE FUNCTIONALITY DIALOGS --- */}

      {/* New Season Dialog */}
      <Dialog open={isNewSeasonOpen} onOpenChange={setIsNewSeasonOpen}>
         <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
            <DialogHeader>
               <DialogTitle className="text-2xl font-display font-bold">New Podcast Season</DialogTitle>
               <DialogDescription>Define a new collection for your episodes.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
               <div className="space-y-2">
                  <Label>Season Title</Label>
                  <Input placeholder="e.g. Journey to the Deep" className="h-11 rounded-xl" />
               </div>
               <div className="space-y-2">
                  <Label>Season Description</Label>
                  <Input placeholder="Brief overview of this season..." className="h-11 rounded-xl" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label>Status</Label>
                     <Select defaultValue="Active">
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
                     <Button variant="outline" className="w-full h-11 rounded-xl border-dashed gap-2">
                        <CloudUpload className="w-4 h-4" /> Upload
                     </Button>
                  </div>
               </div>
               <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px]" onClick={() => { toast.success("New season created successfully!"); setIsNewSeasonOpen(false); }}>
                  Create Season
               </Button>
            </div>
         </DialogContent>
      </Dialog>

      {/* Add Episode Dialog */}
      <Dialog open={isAddEpisodeOpen} onOpenChange={setIsAddEpisodeOpen}>
         <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
            <DialogHeader>
               <DialogTitle className="text-2xl font-display font-bold">Upload Episode</DialogTitle>
               <DialogDescription>Add a new audio file to an existing season.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
               <div className="border-2 border-dashed border-border rounded-3xl p-10 text-center hover:bg-forest/5 hover:border-forest/50 transition-all cursor-pointer group">
                  <CloudUpload className="w-10 h-10 text-muted-foreground group-hover:text-forest mx-auto mb-3" />
                  <div className="font-bold text-sm">Select Audio File</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">MP3, WAV or M4A (Max 100MB)</div>
               </div>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <Label>Episode Title</Label>
                     <Input placeholder="e.g. Episode 04: The Hidden Life" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <Label>Target Season</Label>
                     <Select defaultValue="2">
                        <SelectTrigger className="h-11 rounded-xl">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                           {seasons.map(s => (
                              <SelectItem key={s.id} value={s.id.toString()}>{s.title}</SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px]" onClick={() => { toast.success("Episode is being processed..."); setIsAddEpisodeOpen(false); }}>
                  Publish Episode
               </Button>
            </div>
         </DialogContent>
      </Dialog>

      {/* Edit Season Dialog */}
      <Dialog open={isEditSeasonOpen} onOpenChange={setIsEditSeasonOpen}>
         <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
            <DialogHeader>
               <DialogTitle className="text-2xl font-display font-bold">Edit Season</DialogTitle>
               <DialogDescription>Modify settings for "{selectedSeason?.title}"</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
               <div className="space-y-2">
                  <Label>Season Title</Label>
                  <Input defaultValue={selectedSeason?.title} className="h-11 rounded-xl" />
               </div>
               <div className="space-y-2">
                  <Label>Current Status</Label>
                  <Select defaultValue={selectedSeason?.status}>
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
               <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px]" onClick={() => { toast.success("Season updates saved!"); setIsEditSeasonOpen(false); }}>
                  Save Changes
               </Button>
            </div>
         </DialogContent>
      </Dialog>
    </div>
  );
}
