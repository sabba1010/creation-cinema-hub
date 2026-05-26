import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
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
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";

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

function FilmsManagement() {
  const [films, setFilms] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFilm, setEditingFilm] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [rentDuration, setRentDuration] = useState("48");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    year: "2026",
    duration: "1h 30m",
    price: "19.99",
    rentPrice: "4.99",
    rating: "9.5",
    trailer: "https://vimeo.com/...",
    movieLink: "https://vimeo.com/...",
    thumbnail: ""
  });

  useEffect(() => {
    fetchFilms();
    fetchPurchases();
    fetch("https://movie-backend-drab.vercel.app/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.global_rent_duration) {
          setRentDuration(data.data.global_rent_duration);
          localStorage.setItem("global_rent_duration", data.data.global_rent_duration);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const fetchFilms = async () => {
    try {
      const res = await fetch("https://movie-backend-drab.vercel.app/api/films");
      const data = await res.json();
      if (data.success) {
        setFilms(data.data.map((f: any) => ({ ...f, id: f._id })));
      }
    } catch (err) {
      console.error("Error fetching films:", err);
    }
  };

  const fetchPurchases = async () => {
    try {
      const res = await fetch("https://movie-backend-drab.vercel.app/api/purchases");
      const data = await res.json();
      if (data.success) {
        setPurchases(data.data.map((p: any) => ({
          id: p._id,
          user: p.user,
          film: p.filmTitle,
          type: p.type,
          amount: p.amount,
          date: new Date(p.createdAt).toLocaleDateString(),
          expires: p.expiresAt ? new Date(p.expiresAt).toLocaleDateString() : "Lifetime"
        })));
      }
    } catch (err) {
      console.error("Error fetching purchases:", err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await fetch("https://movie-backend-drab.vercel.app/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, thumbnail: `https://movie-backend-drab.vercel.app${data.url}` });
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Network error during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveFilm = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("user_token");
    try {
      const payload = {
        ...formData,
        price: formData.price.startsWith("$") ? formData.price : `$${formData.price}`,
        rentPrice: formData.rentPrice.startsWith("$") ? formData.rentPrice : `$${formData.rentPrice}`,
      };

      if (editingFilm) {
        const res = await fetch(`https://movie-backend-drab.vercel.app/api/films/${editingFilm.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setFilms(films.map(f => f.id === editingFilm.id ? { ...data.data, id: data.data._id } : f));
          toast.success("Film updated successfully!");
        } else toast.error(data.message);
      } else {
        const res = await fetch("https://movie-backend-drab.vercel.app/api/films", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setFilms([{ ...data.data, id: data.data._id }, ...films]);
          toast.success("New film added to library!");
        } else toast.error(data.message);
      }
      setIsDialogOpen(false);
      setEditingFilm(null);
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleEditClick = (film: any) => {
    setEditingFilm(film);
    setFormData({
      title: film.title || "",
      year: film.year || "",
      duration: film.duration || "",
      price: (film.price || "").replace("$", ""),
      rentPrice: (film.rentPrice || "").replace("$", ""),
      rating: film.rating || "",
      trailer: film.trailer || "",
      movieLink: film.movieLink || "",
      thumbnail: film.thumbnail || ""
    });
    setIsDialogOpen(true);
  };

  const handleDeleteFilm = async (id: string) => {
    if (!confirm("Delete this film?")) return;
    const token = localStorage.getItem("user_token");
    try {
      const res = await fetch(`https://movie-backend-drab.vercel.app/api/films/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setFilms(films.filter(f => f.id !== id));
        toast.error("Film removed from library");
      }
    } catch (err) {
      toast.error("Network error");
    }
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
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Release Year</Label>
                  <Input
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="h-11 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    className="h-11 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Purchase Price ($)</Label>
                  <Input
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="h-11 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rental Price ($)</Label>
                  <Input
                    value={formData.rentPrice}
                    onChange={e => setFormData({ ...formData, rentPrice: e.target.value })}
                    className="h-11 rounded-xl"
                    required
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Film Poster / Thumbnail Image</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="h-11 rounded-xl flex-1 pt-2.5"
                      disabled={isUploading}
                    />
                    {formData.thumbnail && (
                      <img src={formData.thumbnail} alt="Preview" className="h-11 w-11 object-cover rounded-md border border-border" />
                    )}
                  </div>
                  {isUploading && <p className="text-xs text-muted-foreground">Uploading image...</p>}
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Trailer Link (Vimeo/YouTube)</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 h-11 rounded-xl"
                      value={formData.trailer}
                      onChange={e => setFormData({ ...formData, trailer: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Full Movie Link (Vimeo/YouTube)</Label>
                  <div className="relative">
                    <Video className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 h-11 rounded-xl"
                      value={formData.movieLink}
                      onChange={e => setFormData({ ...formData, movieLink: e.target.value })}
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
          <div className="text-3xl font-bold font-display">{rentDuration}h</div>
          <div className="text-sm text-muted-foreground">Rental Window</div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">All Films</TabsTrigger>
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
                        <img src={film.thumbnail || "https://images.unsplash.com/photo-1485846234645-a62644ef7467?w=120&h=67"} alt={film.title || "Film"} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
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
                        <span className="text-sm font-semibold">Buy: {film.price || "$0.00"}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Rent: {film.rentPrice || "$0.00"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 font-medium text-sm">
                        <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                        {(film.purchases || 0).toLocaleString()}
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
                        <div className="font-semibold">Rental Window (Hours)</div>
                        <div className="text-xs text-muted-foreground">Standard duration for film rentals</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={rentDuration}
                        onChange={(e) => setRentDuration(e.target.value)}
                        className="w-20 bg-background h-8"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full bg-forest shadow-md"
                  onClick={async () => {
                    try {
                      const res = await fetch("https://movie-backend-drab.vercel.app/api/settings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ key: "global_rent_duration", value: rentDuration })
                      });
                      const data = await res.json();
                      if (data.success) {
                        localStorage.setItem("global_rent_duration", rentDuration);
                        window.dispatchEvent(new StorageEvent('storage', { key: 'global_rent_duration', newValue: rentDuration }));
                        toast.success("Policies updated globally in database");
                      } else {
                        toast.error(data.message);
                      }
                    } catch (err) {
                      toast.error("Network error saving policy");
                    }
                  }}
                >
                  Update Policies
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
