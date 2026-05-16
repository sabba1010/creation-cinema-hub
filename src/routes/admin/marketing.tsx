import { createFileRoute } from "@tanstack/react-router";
import { 
  Mail, 
  Users, 
  FileText, 
  Heart, 
  Plus, 
  Send, 
  Search, 
  MoreVertical, 
  ArrowUpRight,
  UserCheck,
  ListFilter,
  MousePointer2
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

export const Route = createFileRoute("/admin/marketing")({
  component: MarketingManagement,
});

const segments = [
  { id: 1, name: "Newsletter Subscribers", count: "2,450", growth: "+12%", type: "Global" },
  { id: 2, name: "Monthly Donors", count: "124", growth: "+5%", type: "Filtered" },
  { id: 3, name: "Resource Leads", count: "842", growth: "+24%", type: "Campaign" },
  { id: 4, name: "Past Event Attendees", count: "1,560", growth: "+8%", type: "Action-based" },
];

function MarketingManagement() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Marketing & Leads</h1>
          <p className="text-muted-foreground">Manage your audience segments, newsletter subscribers, and lead capture lists.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
            <Plus className="w-4 h-4" />
            New Segment
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
            <Send className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Contacts" value="4,982" icon={Users} color="forest" />
        <StatsCard title="Email Open Rate" value="32.5%" icon={MousePointer2} color="gold" />
        <StatsCard title="New Leads" value="+42" sub="Last 24h" icon={UserCheck} color="sky" />
        <StatsCard title="Click Rate" value="4.8%" icon={ArrowUpRight} color="forest" />
      </div>

      <Tabs defaultValue="segments" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="segments" className="rounded-lg px-6">Segments</TabsTrigger>
          <TabsTrigger value="subscribers" className="rounded-lg px-6">All Subscribers</TabsTrigger>
          <TabsTrigger value="automations" className="rounded-lg px-6">Automations</TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="grid gap-6 md:grid-cols-2">
          {segments.map((s) => (
            <Card key={s.id} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elevated transition-all group cursor-pointer overflow-hidden">
               <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-muted/20 rounded-2xl group-hover:bg-forest/10 transition-colors">
                        {s.name.includes("Donor") ? <Heart className="w-6 h-6 text-forest" /> : 
                         s.name.includes("Resource") ? <FileText className="w-6 h-6 text-forest" /> : 
                         <Mail className="w-6 h-6 text-forest" />}
                     </div>
                     <div className="space-y-1">
                        <h3 className="font-display font-bold text-lg">{s.name}</h3>
                        <div className="flex items-center gap-2">
                           <Badge variant="outline" className="text-[10px] uppercase font-bold py-0">{s.type}</Badge>
                           <span className="text-xs text-muted-foreground">{s.count} Contacts</span>
                        </div>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-emerald-500 font-bold text-sm flex items-center justify-end">
                        <ArrowUpRight className="w-3.5 h-3.5" /> {s.growth}
                     </div>
                     <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mt-2"><MoreVertical className="w-4 h-4" /></Button>
                  </div>
               </div>
            </Card>
          ))}
          <button className="border-2 border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center gap-2 p-8 hover:bg-muted/10 hover:border-forest/50 transition-all group">
             <Plus className="w-6 h-6 text-muted-foreground group-hover:text-forest" />
             <span className="font-medium text-muted-foreground group-hover:text-forest">Create Custom Segment</span>
          </button>
        </TabsContent>

        <TabsContent value="subscribers">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <div className="p-4 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/10">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by email..." className="pl-10 h-10 rounded-lg bg-background" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-10 border-border/50 gap-2">
                  <ListFilter className="w-4 h-4" /> Filters
                </Button>
                <Button variant="outline" size="sm" className="h-10 border-border/50">Export CSV</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Email Address</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4].map((i) => (
                  <TableRow key={i} className="border-border/50 hover:bg-muted/5 transition-colors">
                    <TableCell className="font-medium">contact-{i}@example.com</TableCell>
                    <TableCell>
                       <Badge variant="outline" className="text-[10px] font-normal">Homepage Pop-up</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Subscribed</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">May {10+i}, 2026</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive"><MoreVertical className="w-4 h-4" /></Button>
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

function StatsCard({ title, value, sub, icon: Icon, color }: any) {
  const colorMap: any = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/10 text-gold",
    sky: "bg-sky/10 text-sky"
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
      <div className={`p-3 rounded-2xl w-fit ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-3xl font-bold font-display">{value}</div>
      <div className="space-y-0.5">
        <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">{title}</div>
        {sub && <div className="text-xs text-emerald-500 font-bold">{sub}</div>}
      </div>
    </Card>
  );
}
