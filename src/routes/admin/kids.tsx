import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  Mic2
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
  { id: 5, name: "Faith", icon: Star, count: 10, status: "Active" },
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
  const [series, setSeries] = useState(INITIAL_SERIES);
  const [topics, setTopics] = useState(INITIAL_TOPICS);
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [lifetimeUsers, setLifetimeUsers] = useState(INITIAL_LIFETIME);
  
  // Dialog States
  const [isSeriesDialogOpen, setIsSeriesDialogOpen] = useState(false);
  const [isGrantDialogOpen, setIsGrantDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Form States
  const [seriesForm, setSeriesForm] = useState({ name: "", episodes: "0", topic: "Kindness" });
  const [grantForm, setGrantForm] = useState({ name: "", email: "", source: "Manual Grant" });

  const handleAddSeries = (e: React.FormEvent) => {
    e.preventDefault();
    const newS = {
      id: Date.now(),
      name: seriesForm.name,
      episodes: parseInt(seriesForm.episodes),
      subscribers: 0,
      status: "Active",
      topic: seriesForm.topic,
      img: "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop"
    };
    setSeries([newS, ...series]);
    setIsSeriesDialogOpen(false);
    toast.success(`${seriesForm.name} added to series list!`);
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
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2" onClick={() => setIsSeriesDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            New Series
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md" onClick={() => setIsUploadDialogOpen(true)}>
            <CloudUpload className="w-4 h-4" />
            Upload Content
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Series" value={series.length.toString()} icon={Layers} color="gold" />
        <StatsCard title="Topics" value={topics.length.toString()} icon={Heart} color="forest" />
        <StatsCard title="Total Content" value={content.length.toString()} icon={Play} color="sky" />
        <StatsCard title="Lifetime Users" value={lifetimeUsers.length.toString()} icon={Star} color="gold" />
      </div>

      <Tabs defaultValue="series" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="series" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Series</TabsTrigger>
          <TabsTrigger value="topics" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Topics</TabsTrigger>
          <TabsTrigger value="library" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Library (Video/Audio)</TabsTrigger>
          <TabsTrigger value="lifetime" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Lifetime Access</TabsTrigger>
        </TabsList>

        <TabsContent value="series" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {series.map((item) => (
            <Card key={item.id} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elevated transition-all group overflow-hidden flex flex-col">
              <div className="h-32 bg-muted relative">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white font-display font-bold text-lg">{item.name}</div>
              </div>
              <CardContent className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                   <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{item.episodes} Episodes</div>
                   <Badge className="bg-forest/10 text-forest border-forest/20 text-[10px]">{item.topic}</Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-forest" />
                    {item.subscribers.toLocaleString()} Viewers
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-tighter">{item.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          <button 
            onClick={() => setIsSeriesDialogOpen(true)}
            className="border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center gap-2 p-8 hover:bg-muted/10 hover:border-forest/50 transition-all group"
          >
            <div className="p-3 bg-muted/20 rounded-full group-hover:bg-forest/10 transition-colors">
              <Plus className="w-6 h-6 text-muted-foreground group-hover:text-forest" />
            </div>
            <span className="font-medium text-muted-foreground group-hover:text-forest text-sm">Add New Series</span>
          </button>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
           <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
              <Table>
                 <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/50">
                       <TableHead className="font-bold">Topic Name</TableHead>
                       <TableHead className="font-bold">Icon</TableHead>
                       <TableHead className="font-bold">Series Count</TableHead>
                       <TableHead className="font-bold">Status</TableHead>
                       <TableHead className="text-right font-bold">Actions</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {topics.map(t => (
                      <TableRow key={t.id} className="border-border/50 group">
                         <TableCell className="font-bold text-base">{t.name}</TableCell>
                         <TableCell><t.icon className="w-5 h-5 text-forest" /></TableCell>
                         <TableCell>{t.count} Series</TableCell>
                         <TableCell><Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">{t.status}</Badge></TableCell>
                         <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"><Edit className="w-4 h-4" /></Button>
                         </TableCell>
                      </TableRow>
                    ))}
                 </TableBody>
              </Table>
           </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
           <div className="flex items-center gap-2">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input placeholder="Search library..." className="pl-10 h-11 rounded-xl bg-card/50 border-border/50" />
              </div>
              <Button variant="outline" className="h-11 rounded-xl gap-2"><Filter className="w-4 h-4" /> Filter</Button>
           </div>
           <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
              <Table>
                 <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/50">
                       <TableHead className="font-bold">Title</TableHead>
                       <TableHead className="font-bold">Type</TableHead>
                       <TableHead className="font-bold">Series</TableHead>
                       <TableHead className="font-bold">Duration</TableHead>
                       <TableHead className="font-bold text-right">Views</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {content.map(c => (
                      <TableRow key={c.id} className="border-border/50">
                         <TableCell className="font-bold">{c.title}</TableCell>
                         <TableCell>
                            <Badge variant="outline" className="gap-1.5 font-bold uppercase text-[9px] tracking-widest">
                               {c.type === "Video" ? <FileVideo className="w-3 h-3" /> : <Mic2 className="w-3 h-3" />}
                               {c.type}
                            </Badge>
                         </TableCell>
                         <TableCell className="text-muted-foreground text-sm">{c.series}</TableCell>
                         <TableCell className="font-mono text-xs">{c.length}</TableCell>
                         <TableCell className="text-right font-medium">{c.views.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
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
      <Dialog open={isSeriesDialogOpen} onOpenChange={setIsSeriesDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">Create New Series</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSeries} className="space-y-6 py-4">
             <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Series Name</Label>
                  <Input 
                    placeholder="e.g. Parable Pals" 
                    className="h-11 rounded-xl"
                    value={seriesForm.name}
                    onChange={e => setSeriesForm({...seriesForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Main Topic</Label>
                  <Select value={seriesForm.topic} onValueChange={val => setSeriesForm({...seriesForm, topic: val})}>
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
                <Button type="submit" className="w-full bg-forest h-11 rounded-xl">Create Series</Button>
             </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">Upload Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4 text-center">
             <div className="border-2 border-dashed border-border rounded-3xl p-12 hover:bg-forest/5 hover:border-forest/50 transition-all cursor-pointer group">
                <CloudUpload className="w-12 h-12 text-muted-foreground group-hover:text-forest mx-auto mb-4" />
                <div className="font-bold text-sm">Select Video or Audio File</div>
             </div>
             <div className="space-y-4 text-left">
                <div className="space-y-2">
                   <Label>Content Type</Label>
                   <Select defaultValue="Video">
                      <SelectTrigger className="h-11 rounded-xl">
                         <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                         <SelectItem value="Video">Video Episode</SelectItem>
                         <SelectItem value="Audio">Audio / Song</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
             </div>
             <Button className="w-full bg-forest h-11 rounded-xl" onClick={() => { toast.success("Upload started"); setIsUploadDialogOpen(false); }}>Start Upload</Button>
          </div>
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
