import { createFileRoute } from "@tanstack/react-router";
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
  Clapperboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const Route = createFileRoute("/admin/films")({
  component: FilmsManagement,
});

const films = [
  {
    id: 1,
    title: "The Narrow Path",
    year: "2024",
    duration: "1h 45m",
    price: "$12.99",
    rentPrice: "$4.99",
    status: "Published",
    sales: 1240,
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644ef7467?w=120&h=67&fit=crop"
  },
  {
    id: 2,
    title: "Light in the Shadows",
    year: "2023",
    duration: "1h 22m",
    price: "$9.99",
    rentPrice: "$3.99",
    status: "Archive",
    sales: 3500,
    thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=120&h=67&fit=crop"
  },
  {
    id: 3,
    title: "Seeds of Hope",
    year: "2025",
    duration: "2h 10m",
    price: "$14.99",
    rentPrice: "$5.99",
    status: "Draft",
    sales: 0,
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=120&h=67&fit=crop"
  }
];

function FilmsManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Films Management</h1>
          <p className="text-muted-foreground">Manage your cinematic library, trailers, and viewing permissions.</p>
        </div>
        <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
          <Plus className="w-4 h-4" />
          Add New Film
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
          <div className="p-3 bg-forest/10 rounded-2xl w-fit">
            <Clapperboard className="w-6 h-6 text-forest" />
          </div>
          <div className="text-3xl font-bold font-display">24</div>
          <div className="text-sm text-muted-foreground">Published Films</div>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
          <div className="p-3 bg-gold/10 rounded-2xl w-fit">
            <PlaySquare className="w-6 h-6 text-gold" />
          </div>
          <div className="text-3xl font-bold font-display">15.2K</div>
          <div className="text-sm text-muted-foreground">Total Rentals</div>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
          <div className="p-3 bg-sky/10 rounded-2xl w-fit">
            <Clock className="w-6 h-6 text-sky" />
          </div>
          <div className="text-3xl font-bold font-display">48h</div>
          <div className="text-sm text-muted-foreground">Standard Rental Window</div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg px-6">All Films</TabsTrigger>
          <TabsTrigger value="trailers" className="rounded-lg px-6">Trailers</TabsTrigger>
          <TabsTrigger value="purchases" className="rounded-lg px-6">Purchases</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg px-6">Access Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50">
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Film Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {films.map((film) => (
                  <TableRow key={film.id} className="border-border/50 group">
                    <TableCell>
                      <div className="w-20 h-12 rounded-lg bg-muted overflow-hidden">
                        <img src={film.thumbnail} alt={film.title} className="w-full h-full object-crop transition-transform group-hover:scale-110" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-bold text-base">{film.title}</div>
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
                      <div className="flex items-center gap-1.5 font-medium">
                        <DollarSign className="w-3 h-3 text-muted-foreground" />
                        {film.sales.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-forest/10 hover:text-forest">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
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
                <Button className="w-full bg-forest">Update Policies</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Trailer Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/20 rounded-xl space-y-3">
                    <div className="font-semibold text-sm">Global Trailer Visibility</div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-background">Hidden</Button>
                      <Button className="flex-1 bg-forest">Visible</Button>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-xl space-y-3">
                    <div className="font-semibold text-sm">Trailer Auto-play</div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-background text-foreground">Enabled</Button>
                      <Button variant="outline" className="flex-1 bg-background text-foreground">Muted</Button>
                      <Button className="flex-1 bg-forest">Disabled</Button>
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
