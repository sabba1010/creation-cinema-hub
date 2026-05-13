import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Film, 
  Plus, 
  PlaySquare, 
  Eye, 
  Clock, 
  DollarSign,
  MoreVertical,
  Edit,
  Trash2,
  Video,
  Clapperboard,
  Search,
  Filter,
  CreditCard,
  History,
  Lock,
  Globe,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/admin/films")({
  component: FilmsManagement,
});

// Synchronized with public Films page
const INITIAL_FILMS = [
  {
    id: "the-seed",
    title: "The Seed",
    year: "2024",
    duration: "1h 42m",
    rating: "9.8",
    price: "$19.99",
    rentPrice: "$5.99",
    status: "Published",
    sales: 1450,
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=120&h=67",
    trailer: "https://vimeo.com/example/1",
    purchases: 842
  },
  {
    id: "mountain-majesty",
    title: "Mountain Majesty",
    year: "2023",
    duration: "52m",
    rating: "9.5",
    price: "$14.99",
    rentPrice: "$3.99",
    status: "Published",
    sales: 2100,
    thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=120&h=67",
    trailer: "https://vimeo.com/example/2",
    purchases: 1250
  },
  {
    id: "deep-wonders",
    title: "Deep Wonders",
    year: "2022",
    duration: "1h 15m",
    rating: "9.6",
    price: "$12.99",
    rentPrice: "$4.99",
    status: "Published",
    sales: 890,
    thumbnail: "https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&q=80&w=120&h=67",
    trailer: "https://vimeo.com/example/3",
    purchases: 540
  },
  {
    id: "eternal-light",
    title: "Eternal Light",
    year: "2024",
    duration: "1h 05m",
    rating: "9.9",
    price: "$19.99",
    rentPrice: "$6.99",
    status: "Draft",
    sales: 0,
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=120&h=67",
    trailer: "https://vimeo.com/example/4",
    purchases: 0
  }
];

const INITIAL_PURCHASES = [
  { id: "ORD-9901", user: "James Wilson", film: "The Seed", type: "Buy", amount: "$19.99", date: "May 12, 2026", expires: "Lifetime" },
  { id: "ORD-9902", user: "Maria Garcia", film: "Mountain Majesty", type: "Rent", amount: "$3.99", date: "May 13, 2026", expires: "May 15, 2026 (48h)" },
  { id: "ORD-9903", user: "Robert Chen", film: "The Seed", type: "Buy", amount: "$19.99", date: "May 11, 2026", expires: "Lifetime" },
];

function FilmsManagement() {
  const [films, setFilms] = useState(INITIAL_FILMS);
  const [purchases, setPurchases] = useState(INITIAL_PURCHASES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFilm, setEditingFilm] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    year: "2026",
    duration: "1h 30m",
    price: "19.99",
    rentPrice: "4.99",
    rating: "9.5",
    trailer: "https://vimeo.com/..."
  });

  const handleSaveFilm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFilm) {
      setFilms(films.map(f => f.id === editingFilm.id ? { ...f, ...formData, price: `$${formData.price}`, rentPrice: `$${formData.rentPrice}` } : f));
      toast.success("Film updated successfully!");
    } else {
      const newFilm = {
        id: formData.title.toLowerCase().replace(/ /g, "-"),
        ...formData,
        price: `$${formData.price}`,
        rentPrice: `$${formData.rentPrice}`,
        status: "Published",
        sales: 0,
        purchases: 0,
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644ef7467?w=120&h=67"
      };
      setFilms([newFilm, ...films]);
      toast.success("New film added to library!");
    }
    setIsDialogOpen(false);
    setEditingFilm(null);
  };

  const handleEditClick = (film: any) => {
    setEditingFilm(film);
    setFormData({
      title: film.title,
      year: film.year,
      duration: film.duration,
      price: film.price.replace("$", ""),
      rentPrice: film.rentPrice.replace("$", ""),
      rating: film.rating,
      trailer: film.trailer
    });
    setIsDialogOpen(true);
  };

  const handleDeleteFilm = (id: string) => {
    setFilms(films.filter(f => f.id !== id));
    toast.error("Film removed from library");
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Films Management</h1>
          <p className="text-muted-foreground">Manage your cinematic library, trailers, and viewing permissions.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingFilm(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              Add New Film
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold">
                {editingFilm ? "Edit Film" : "Add New Film"}
              </DialogTitle>
              <DialogDescription>Enter film details and pricing for the Cinema Hub.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveFilm} className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label>Film Title</Label>
                  <Input 
                    placeholder="e.g. The Eternal Journey" 
                    className="h-11 rounded-xl"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Release Year</Label>
                  <Input 
                    value={formData.year}
                    onChange={e => setFormData({...formData, year: e.target.value})}
                    className="h-11 rounded-xl" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="h-11 rounded-xl" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Purchase Price ($)</Label>
                  <Input 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="h-11 rounded-xl" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rental Price ($)</Label>
                  <Input 
                    value={formData.rentPrice}
                    onChange={e => setFormData({...formData, rentPrice: e.target.value})}
                    className="h-11 rounded-xl" 
                    required 
                  />
                </div>
                <div className="col-span-2 space-y-4 pt-2 border-t border-border/30">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Media Uploads</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label className="text-sm">Trailer File</Label>
                       <div className="relative group">
                          <Input type="file" className="hidden" id="trailer-upload" onChange={() => toast.info("Trailer file selected")} />
                          <label 
                            htmlFor="trailer-upload" 
                            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:border-forest/50 hover:bg-forest/5 transition-all"
                          >
                             <Video className="w-6 h-6 text-muted-foreground mb-2" />
                             <span className="text-[10px] font-bold text-muted-foreground">SELECT TRAILER</span>
                          </label>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-sm">Movie File (Full)</Label>
                       <div className="relative group">
                          <Input type="file" className="hidden" id="movie-upload" onChange={() => toast.info("Movie file selected")} />
                          <label 
                            htmlFor="movie-upload" 
                            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:border-forest/50 hover:bg-forest/5 transition-all"
                          >
                             <Clapperboard className="w-6 h-6 text-muted-foreground mb-2" />
                             <span className="text-[10px] font-bold text-muted-foreground">SELECT MOVIE</span>
                          </label>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Or use Video Link (Vimeo/YouTube)</Label>
                  <div className="relative">
                     <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input 
                        className="pl-10 h-11 rounded-xl"
                        value={formData.trailer}
                        onChange={e => setFormData({...formData, trailer: e.target.value})}
                     />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-forest h-12 rounded-xl shadow-lg hover:shadow-forest/20 transition-all active:scale-95"
                >
                  {editingFilm ? "Save Changes" : "Publish to Cinema Hub"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
          <div className="p-3 bg-forest/10 rounded-2xl w-fit">
            <Clapperboard className="w-6 h-6 text-forest" />
          </div>
          <div className="text-3xl font-bold font-display">{films.length}</div>
          <div className="text-sm text-muted-foreground">Total Content Items</div>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
          <div className="p-3 bg-gold/10 rounded-2xl w-fit">
            <PlaySquare className="w-6 h-6 text-gold" />
          </div>
          <div className="text-3xl font-bold font-display">15.2K</div>
          <div className="text-sm text-muted-foreground">Total Views</div>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
          <div className="p-3 bg-sky/10 rounded-2xl w-fit">
            <Clock className="w-6 h-6 text-sky" />
          </div>
          <div className="text-3xl font-bold font-display">48h</div>
          <div className="text-sm text-muted-foreground">Rental Window (2 Days)</div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">All Films</TabsTrigger>
          <TabsTrigger value="trailers" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Trailers</TabsTrigger>
          <TabsTrigger value="purchases" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Recent Purchases</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Policy Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center gap-2">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search films..." className="pl-10 h-11 rounded-xl bg-card/50 border-border/50" />
             </div>
             <Button variant="outline" className="h-11 rounded-xl gap-2"><Filter className="w-4 h-4" /> Filter</Button>
          </div>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50">
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Film Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Purchases</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {films.map((film) => (
                  <TableRow key={film.id} className="border-border/50 group hover:bg-muted/10 transition-colors">
                    <TableCell>
                      <div className="w-20 h-12 rounded-xl bg-muted overflow-hidden border border-border/50 shadow-sm">
                        <img src={film.thumbnail} alt={film.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-bold text-base flex items-center gap-2">
                           {film.title}
                           <div className="flex items-center gap-1 text-[10px] text-gold font-bold">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              {film.rating}
                           </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{film.year} • {film.duration}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={film.status === "Published" ? "default" : "secondary"}
                        className={film.status === "Published" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}
                      >
                        {film.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">Buy: {film.price}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Rent: {film.rentPrice}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 font-medium text-sm">
                        <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                        {film.purchases.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted"><MoreVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-border/50 p-1 shadow-elevated">
                           <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleEditClick(film)}>
                              <Edit className="w-4 h-4" /> Edit Details
                           </DropdownMenuItem>
                           <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Globe className="w-4 h-4" /> View Public Page
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem className="gap-2 text-destructive cursor-pointer" onClick={() => handleDeleteFilm(film.id)}>
                              <Trash2 className="w-4 h-4" /> Remove Film
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="purchases" className="space-y-4">
           <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
             <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Film</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Expires</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                   {purchases.map(p => (
                     <TableRow key={p.id}>
                       <TableCell className="font-mono text-xs text-muted-foreground">{p.id}</TableCell>
                       <TableCell className="font-medium">{p.user}</TableCell>
                       <TableCell>{p.film}</TableCell>
                       <TableCell>
                         <Badge variant={p.type === "Buy" ? "default" : "secondary"} className={p.type === "Buy" ? "bg-forest/10 text-forest border-forest/20" : "bg-gold/10 text-gold-foreground border-gold/20"}>
                            {p.type}
                         </Badge>
                       </TableCell>
                       <TableCell className="font-bold">{p.amount}</TableCell>
                       <TableCell className="text-xs">{p.expires}</TableCell>
                     </TableRow>
                   ))}
                </TableBody>
             </Table>
           </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Access Duration Policy</CardTitle>
                <CardDescription>Configure global rental and viewing rules.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/30">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-forest" />
                      <div>
                        <div className="font-semibold">Rental Window</div>
                        <div className="text-xs text-muted-foreground">Standard duration for film rentals</div>
                      </div>
                    </div>
                    <Badge className="bg-forest">48 Hours</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/30">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-gold" />
                      <div>
                        <div className="font-semibold">First View Grace</div>
                        <div className="text-xs text-muted-foreground">Time allowed before window starts</div>
                      </div>
                    </div>
                    <Badge variant="outline">7 Days</Badge>
                  </div>
                </div>
                <Button className="w-full bg-forest shadow-md" onClick={() => toast.success("Policies updated globally")}>Update Policies</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Trailer & Preview Rules</CardTitle>
                <CardDescription>Manage how content is previewed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/20 rounded-xl space-y-3 border border-border/30">
                    <div className="font-semibold text-sm flex items-center gap-2">
                       <PlaySquare className="w-4 h-4 text-forest" />
                       Global Trailer Visibility
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-background text-xs">Hidden</Button>
                      <Button className="flex-1 bg-forest text-xs">Visible to All</Button>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-xl space-y-3 border border-border/30">
                    <div className="font-semibold text-sm flex items-center gap-2">
                       <Lock className="w-4 h-4 text-gold" />
                       DRM Protection
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-xs text-muted-foreground">Prevent screen recording</span>
                       <Badge className="bg-emerald-500">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
