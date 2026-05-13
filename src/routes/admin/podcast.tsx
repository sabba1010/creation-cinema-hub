import { createFileRoute } from "@tanstack/react-router";
import { 
  Mic, 
  Plus, 
  ListMusic, 
  Share2, 
  ExternalLink, 
  MoreVertical, 
  Edit, 
  Trash2, 
  BarChart2,
  Headphones,
  Music2,
  FilePlus
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

export const Route = createFileRoute("/admin/podcast")({
  component: PodcastManagement,
});

const seasons = [
  { id: 1, title: "Season 1: Deep Roots", episodes: 12, listens: "45.2K", status: "Completed" },
  { id: 2, title: "Season 2: Walking by Faith", episodes: 8, listens: "32.1K", status: "Active" },
  { id: 3, title: "Season 3: The Mustard Seed", episodes: 0, listens: "0", status: "Draft" },
];

const links = [
  { platform: "Apple Podcasts", url: "https://podcasts.apple.com/...", status: "Active" },
  { platform: "Spotify", url: "https://open.spotify.com/...", status: "Active" },
  { platform: "Google Podcasts", url: "https://podcasts.google.com/...", status: "Active" },
  { platform: "Amazon Music", url: "https://music.amazon.com/...", status: "Inactive" },
];

function PodcastManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Podcast Management</h1>
          <p className="text-muted-foreground">Manage seasons, episodes, bonus resources, and platform links.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
            <Plus className="w-4 h-4" />
            New Season
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
            <Mic className="w-4 h-4" />
            Add Episode
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Listens" value="77.3K" icon={Headphones} />
        <StatsCard title="Episodes" value="20" icon={Music2} />
        <StatsCard title="Platforms" value="4" icon={Share2} />
        <StatsCard title="Bonus Files" value="15" icon={FilePlus} />
      </div>

      <Tabs defaultValue="seasons" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="seasons" className="rounded-lg px-6">Seasons</TabsTrigger>
          <TabsTrigger value="platforms" className="rounded-lg px-6">Platforms</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg px-6">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="seasons" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seasons.map((season) => (
            <Card key={season.id} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card group hover:shadow-elevated transition-all overflow-hidden">
               <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                     <div className="p-3 bg-forest/10 rounded-2xl">
                        <ListMusic className="w-6 h-6 text-forest" />
                     </div>
                     <Badge className={season.status === "Active" ? "bg-forest" : "bg-muted text-muted-foreground"}>
                        {season.status}
                     </Badge>
                  </div>
                  <div className="space-y-1">
                     <h3 className="font-display font-bold text-xl">{season.title}</h3>
                     <p className="text-sm text-muted-foreground">{season.episodes} Episodes • {season.listens} Listens</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button size="sm" variant="outline" className="flex-1 rounded-lg h-9 border-border/50 bg-background/50">Edit</Button>
                     <Button size="sm" variant="outline" className="flex-1 rounded-lg h-9 border-border/50 bg-background/50">Bonus Assets</Button>
                     <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg border border-border/50 bg-background/50 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
               </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="platforms">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-xl font-display">Distribution Channels</CardTitle>
                  <CardDescription>Manage your podcast RSS distribution links</CardDescription>
               </div>
               <Button size="sm" className="bg-forest">Add Platform</Button>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Platform</TableHead>
                  <TableHead>RSS / External URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.platform} className="border-border/50">
                    <TableCell className="font-bold">{link.platform}</TableCell>
                    <TableCell className="max-w-[300px] truncate font-mono text-xs text-muted-foreground">
                      {link.url}
                    </TableCell>
                    <TableCell>
                      <Badge variant={link.status === "Active" ? "default" : "secondary"}>{link.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ExternalLink className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon }: any) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
      <div className="p-3 bg-muted/20 rounded-2xl w-fit">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="text-3xl font-bold font-display">{value}</div>
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">{title}</div>
    </Card>
  );
}
