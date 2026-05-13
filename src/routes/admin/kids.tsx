import { createFileRoute } from "@tanstack/react-router";
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
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export const Route = createFileRoute("/admin/kids")({
  component: KidsManagement,
});

const series = [
  { id: 1, name: "Tales of the Prophets", episodes: 12, subscribers: 450, status: "Active" },
  { id: 2, name: "Tiny Parables", episodes: 8, subscribers: 320, status: "Active" },
  { id: 3, name: "Bible Heroes", episodes: 15, subscribers: 890, status: "Active" },
];

const lifetimeUsers = [
  { id: 1, name: "James Wilson", email: "james.w@example.com", joined: "Jan 12, 2026", source: "Founder Pack" },
  { id: 2, name: "Emma Thompson", email: "emma.t@example.com", joined: "Feb 05, 2026", source: "Promo Code" },
  { id: 3, name: "Robert Davis", email: "rdavis@example.com", joined: "Mar 20, 2026", source: "Donation Reward" },
];

function KidsManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">KidsBibleFlix</h1>
          <p className="text-muted-foreground">Manage kid-safe streaming content, series, and lifetime memberships.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
            <Plus className="w-4 h-4" />
            New Series
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
            <Plus className="w-4 h-4" />
            Upload Content
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Episodes" value="142" icon={Baby} color="forest" />
        <StatsCard title="Series" value="12" icon={Layers} color="gold" />
        <StatsCard title="Lifetime Users" value="84" icon={Star} color="sky" />
        <StatsCard title="Monthly Goal" value="85%" icon={CreditCard} color="forest" />
      </div>

      <Tabs defaultValue="series" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="series" className="rounded-lg px-6">Series & Topics</TabsTrigger>
          <TabsTrigger value="content" className="rounded-lg px-6">All Content</TabsTrigger>
          <TabsTrigger value="lifetime" className="rounded-lg px-6">Lifetime Access</TabsTrigger>
          <TabsTrigger value="subscriptions" className="rounded-lg px-6">Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="series" className="grid gap-6 md:grid-cols-3">
          {series.map((item) => (
            <Card key={item.id} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elevated transition-all group overflow-hidden">
              <div className="h-32 bg-muted relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-display font-bold text-lg">{item.name}</div>
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/20 backdrop-blur-md border-white/10 hover:bg-white/40"><FolderOpen className="w-4 h-4 text-white" /></Button>
                   <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/20 backdrop-blur-md border-white/10 hover:bg-white/40"><MoreVertical className="w-4 h-4 text-white" /></Button>
                </div>
              </div>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{item.episodes} Episodes</div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-forest" />
                    {item.subscribers} Viewers
                  </div>
                </div>
                <Badge className="bg-forest/10 text-forest border-forest/20">{item.status}</Badge>
              </CardContent>
            </Card>
          ))}
          <button className="border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center gap-2 p-8 hover:bg-muted/10 hover:border-forest/50 transition-all group">
            <div className="p-3 bg-muted/20 rounded-full group-hover:bg-forest/10 transition-colors">
              <Plus className="w-6 h-6 text-muted-foreground group-hover:text-forest" />
            </div>
            <span className="font-medium text-muted-foreground group-hover:text-forest">Add New Series</span>
          </button>
        </TabsContent>

        <TabsContent value="lifetime">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <div className="p-4 border-b border-border/50 flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search lifetime users..." className="pl-10 h-10 rounded-lg bg-muted/20" />
              </div>
              <Button size="sm" className="bg-gold text-gold-foreground font-semibold">Grant Lifetime Access</Button>
            </div>
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50">
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lifetimeUsers.map((user) => (
                  <TableRow key={user.id} className="border-border/50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal border-gold/30 text-gold-foreground bg-gold/5">
                        {user.source}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">Revoke</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-12 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center shadow-glow">
              <Star className="w-10 h-10 text-gold" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold">Subscription Support (Coming Soon)</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Future support for monthly and annual subscriptions is being prepared. You'll be able to manage pricing, trials, and churn here.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-forest">Q4 2026 Roadmap</Badge>
              <Badge variant="outline">Development Phase</Badge>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
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
      <div className="text-sm text-muted-foreground">{title}</div>
    </Card>
  );
}
