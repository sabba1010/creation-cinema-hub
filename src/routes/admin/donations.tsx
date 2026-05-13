import { createFileRoute } from "@tanstack/react-router";
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Calendar, 
  Target,
  ArrowUpRight,
  MoreHorizontal,
  HandHeart,
  BadgeDollarSign,
  Search,
  Filter
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
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export const Route = createFileRoute("/admin/donations")({
  component: DonationManagement,
});

const donationTrend = [
  { day: "Mon", amount: 450 },
  { day: "Tue", amount: 890 },
  { day: "Wed", amount: 1200 },
  { day: "Thu", amount: 950 },
  { day: "Fri", amount: 1800 },
  { day: "Sat", amount: 2400 },
  { day: "Sun", amount: 2100 },
];

const activeCampaigns = [
  { id: 1, name: "New Studio Equipment", goal: 25000, raised: 18450, donors: 156 },
  { id: 2, name: "KidsBibleFlix Expansion", goal: 50000, raised: 12000, donors: 84 },
  { id: 3, name: "Mission: Africa Outreach", goal: 10000, raised: 9200, donors: 210 },
];

function DonationManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Donation Management</h1>
          <p className="text-muted-foreground">Track contributions, manage campaigns, and engage with sponsors.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
            <Calendar className="w-4 h-4" />
            Tax Reports
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
            <Target className="w-4 h-4" />
            Launch Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Raised" value="$42,850" sub="This Month" icon={Heart} color="rose" />
        <StatsCard title="Monthly Donors" value="124" sub="+5 new today" icon={Users} color="forest" />
        <StatsCard title="Avg. Gift" value="$85.20" sub="All-time" icon={BadgeDollarSign} color="gold" />
        <StatsCard title="Retention" value="78%" sub="+2.4% vs LY" icon={TrendingUp} color="sky" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-forest" />
              Donation Velocity
            </CardTitle>
            <CardDescription>Real-time contribution tracking across all channels</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donationTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--border) / 0.5)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} stroke="oklch(var(--muted-foreground))" />
                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="oklch(var(--muted-foreground))" tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "oklch(var(--card))", borderRadius: "12px", border: "1px solid oklch(var(--border))" }} 
                />
                <Line type="monotone" dataKey="amount" stroke="oklch(var(--forest))" strokeWidth={3} dot={{ r: 4, fill: "oklch(var(--forest))" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Target className="w-5 h-5 text-gold" />
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {activeCampaigns.map((c) => (
              <div key={c.id} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="font-bold text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.donors} Donors</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm">${c.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground text-xs ml-1">/ ${c.goal/1000}k</span>
                  </div>
                </div>
                <Progress value={(c.raised / c.goal) * 100} className="h-2 bg-muted">
                  <div className="bg-forest h-full" />
                </Progress>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs uppercase tracking-widest font-bold text-muted-foreground hover:bg-muted/10">View All Campaigns</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/30">
          <CardTitle className="text-xl font-display">Recent Contributions</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input placeholder="Search donors..." className="pl-9 pr-4 py-1.5 text-sm rounded-lg bg-muted/20 border border-border/30 focus:outline-none" />
            </div>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 border border-border/30"><Filter className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 bg-muted/10">
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i} className="border-border/50 hover:bg-muted/10 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-xs">J</div>
                    <div>
                      <div className="font-bold text-sm">Johnathan Wright</div>
                      <div className="text-[10px] text-muted-foreground">j.wright@provider.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-forest">$150.00</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold border-forest/20">Stripe</Badge>
                </TableCell>
                <TableCell className="text-sm">Today, 10:45 AM</TableCell>
                <TableCell>
                  <Badge className="bg-gold/10 text-gold-foreground border-gold/20 font-medium">Monthly</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function StatsCard({ title, value, sub, icon: Icon, color }: any) {
  const colorMap: any = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/10 text-gold",
    sky: "bg-sky/10 text-sky",
    rose: "bg-rose-500/10 text-rose-500"
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2 transition-all hover:scale-[1.02] cursor-default">
      <div className={`p-3 rounded-2xl w-fit ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-0.5">
        <div className="text-3xl font-bold font-display">{value}</div>
        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{title}</div>
      </div>
      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
        {sub}
      </div>
    </Card>
  );
}
