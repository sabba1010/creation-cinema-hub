import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Heart, 
  Users, 
  TrendingUp,
  Search,
  Filter,
  DollarSign,
  Download,
  Mail,
  MoreVertical,
  ArrowUpRight,
  ChevronRight,
  HandHeart
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
import { Input } from "../../components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/donations")({
  component: DonationManagement,
});

const INITIAL_DONATIONS = [
  { id: 1, donor: "Johnathan Wright", email: "j.wright@example.com", amount: 50, type: "Monthly", date: "Today, 10:45 AM", status: "Completed" },
  { id: 2, donor: "Sarah Miller", email: "sarah.m@outlook.com", amount: 250, type: "One-time", date: "Yesterday, 04:20 PM", status: "Completed" },
  { id: 3, donor: "David Chen", email: "d.chen@church.org", amount: 100, type: "Monthly", date: "May 12, 2026", status: "Completed" },
  { id: 4, donor: "Maria Garcia", email: "m.garcia@gmail.com", amount: 25, type: "One-time", date: "May 11, 2026", status: "Completed" },
  { id: 5, donor: "Alex Thompson", email: "alex.t@ministry.com", amount: 500, type: "One-time", date: "May 10, 2026", status: "Completed" },
];

function DonationManagement() {
  const [donations, setDonations] = useState(INITIAL_DONATIONS);

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Donations Hub</h1>
          <p className="text-muted-foreground">Track contributions and manage ministry partnerships.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
            <Mail className="w-4 h-4" />
            Bulk Receipt
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Raised" value="$42,850" sub="This Month" icon={DollarSign} color="forest" />
        <StatsCard title="Total Donors" value="1,240" sub="+12 new today" icon={Users} color="gold" />
        <StatsCard title="Monthly Giving" value="$18,400" sub="Recurring Revenue" icon={Heart} color="sky" />
        <StatsCard title="Avg. Donation" value="$65.00" sub="Per Transaction" icon={TrendingUp} color="forest" />
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search donors or emails..." className="pl-10 h-11 rounded-xl bg-background/50 border-border/50" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl h-11 border-border/50 gap-2">
              <Filter className="w-4 h-4" />
              Filter By Type
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/50">
              <TableHead className="font-bold pl-6">Donor Information</TableHead>
              <TableHead className="font-bold">Amount</TableHead>
              <TableHead className="font-bold">Frequency</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right pr-6 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((d) => (
              <TableRow key={d.id} className="border-border/50 group hover:bg-muted/10 transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest font-bold border border-forest/10">
                      {d.donor.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-base">{d.donor}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{d.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-lg text-forest-deep">
                  ${d.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-bold text-[9px] uppercase tracking-widest px-3 ${d.type === 'Monthly' ? 'bg-gold/5 text-gold-foreground border-gold/20' : 'bg-muted/50 text-muted-foreground border-border/50'}`}>
                    {d.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                   {d.date}
                </TableCell>
                <TableCell>
                   <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] uppercase font-black">
                      {d.status}
                   </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-forest/10 hover:text-forest"><Mail className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-muted"><MoreVertical className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t border-border/50 flex items-center justify-between bg-muted/10">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Showing {donations.length} Contributions</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg h-9">Prev</Button>
            <Button variant="outline" size="sm" className="rounded-lg h-9">Next</Button>
          </div>
        </div>
      </Card>

      {/* Simple Goal Summary */}
      <div className="grid md:grid-cols-2 gap-6">
         <Card className="border-border/50 bg-forest-deep text-cream p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:rotate-0 transition-transform">
               <HandHeart className="w-48 h-48" />
            </div>
            <div className="space-y-6 relative">
               <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold italic">Monthly Goal Progress</h3>
                  <p className="text-cream/60 text-sm">We are aiming for $50k in recurring support this month.</p>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between font-bold text-sm">
                     <span>$18,400 raised</span>
                     <span className="text-gold">36%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-gold shadow-glow" style={{ width: '36%' }} />
                  </div>
               </div>
            </div>
         </Card>

         <Card className="border-border/50 bg-card p-8 rounded-[2.5rem] flex flex-col justify-between">
            <div className="space-y-4">
               <h3 className="text-2xl font-display font-bold text-forest-deep">Donor Retention</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  **78% of your donors** from last month have continued their support. This is 5% higher than the industry average!
               </p>
            </div>
            <Button variant="outline" className="w-full mt-6 rounded-xl h-11 border-forest/20 text-forest font-bold text-xs uppercase tracking-widest gap-2">
               View Retention Report <ChevronRight className="w-4 h-4" />
            </Button>
         </Card>
      </div>
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
        {sub}
      </div>
    </Card>
  );
}
