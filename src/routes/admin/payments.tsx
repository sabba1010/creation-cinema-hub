import { createFileRoute } from "@tanstack/react-router";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Wallet
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

export const Route = createFileRoute("/admin/payments")({
  component: PaymentManagement,
});

const transactions = [
  { id: "TXN-8452", user: "John Doe", type: "Film Purchase", amount: "$12.99", status: "Success", date: "Today, 10:24 AM" },
  { id: "TXN-8451", user: "Sarah Miller", type: "Event Ticket", amount: "$45.00", status: "Pending", date: "Today, 09:15 AM" },
  { id: "TXN-8450", user: "Michael Ross", type: "Donation", amount: "$100.00", status: "Success", date: "Yesterday, 06:45 PM" },
  { id: "TXN-8449", user: "Emma Wilson", type: "Film Rental", amount: "$4.99", status: "Refunded", date: "May 11, 2026" },
];

function PaymentManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Payment Management</h1>
          <p className="text-muted-foreground">Monitor transactions, process refunds, and manage subscription revenue.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
            <Download className="w-4 h-4" />
            Payout Report
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
            <RefreshCcw className="w-4 h-4" />
            Sync Gateway
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Net Volume" value="$12,482" trend="+14%" icon={Wallet} color="forest" />
        <StatsCard title="Transactions" value="842" trend="+8%" icon={CreditCard} color="sky" />
        <StatsCard title="Refunds" value="$245" trend="-2%" icon={RefreshCcw} color="rose" />
        <StatsCard title="Subscriptions" value="$4,200" trend="+22%" icon={Clock} color="gold" />
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg px-6">All Transactions</TabsTrigger>
          <TabsTrigger value="refunds" className="rounded-lg px-6">Refund Requests</TabsTrigger>
          <TabsTrigger value="subscriptions" className="rounded-lg px-6">Subscriptions</TabsTrigger>
          <TabsTrigger value="payouts" className="rounded-lg px-6">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <div className="p-4 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/10">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by transaction ID or user..." className="pl-10 h-10 rounded-lg bg-background" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-10 border-border/50 gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} className="border-border/50 hover:bg-muted/5 transition-colors">
                    <TableCell className="font-mono text-xs font-bold">{tx.id}</TableCell>
                    <TableCell className="font-medium">{tx.user}</TableCell>
                    <TableCell>
                       <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{tx.type}</span>
                    </TableCell>
                    <TableCell className="font-bold">{tx.amount}</TableCell>
                    <TableCell>
                      <Badge className={
                        tx.status === "Success" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                        tx.status === "Pending" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                        "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      }>
                        <div className="flex items-center gap-1.5">
                           {tx.status === "Success" ? <CheckCircle2 className="w-3 h-3" /> : 
                            tx.status === "Pending" ? <Clock className="w-3 h-3" /> : 
                            <XCircle className="w-3 h-3" />}
                           {tx.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tx.date}</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="refunds">
           <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-12 text-center">
              <div className="max-w-md mx-auto space-y-6 flex flex-col items-center">
                 <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center">
                    <RefreshCcw className="w-10 h-10 text-rose-500" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold">No Pending Refunds</h3>
                    <p className="text-muted-foreground">All refund requests have been processed. New requests will appear here for your approval.</p>
                 </div>
                 <Button variant="outline" className="border-border/50 h-11 px-8 rounded-xl">View Refund History</Button>
              </div>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({ title, value, trend, icon: Icon, color }: any) {
  const colorMap: any = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/10 text-gold",
    sky: "bg-sky/10 text-sky",
    rose: "bg-rose-500/10 text-rose-500"
  };

  const isPositive = trend.startsWith("+");

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
      <div className={`p-3 rounded-2xl w-fit ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-3xl font-bold font-display">{value}</div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">{title}</div>
        <div className={`text-xs font-bold flex items-center ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
           {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
           {trend}
        </div>
      </div>
    </Card>
  );
}
