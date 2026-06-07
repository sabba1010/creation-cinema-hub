import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
  HandHeart,
  Plus,
  Trash2
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
import { Textarea } from "../../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/dialog";
import { toast } from "sonner";
import Swal from 'sweetalert2';

export const Route = createFileRoute("/admin/donations")({
  component: DonationManagement,
});


function DonationManagement() {
  const [donations, setDonations] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [kidsAnalytics, setKidsAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [newCampaign, setNewCampaign] = useState({ title: '', description: '', goalAmount: '', image: '' });

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailSegment, setEmailSegment] = useState("all");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donationsRes, campaignsRes, kidsRes] = await Promise.all([
          fetch("https://movie-backend-drab.vercel.app/api/donations"),
          fetch("https://movie-backend-drab.vercel.app/api/campaigns"),
          fetch("https://movie-backend-drab.vercel.app/api/kids/analytics", {
            headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` }
          })
        ]);
        const dData = await donationsRes.json();
        const cData = await campaignsRes.json();
        const kData = await kidsRes.json();

        if (dData.success) setDonations(dData.data);
        if (cData.success) setCampaigns(cData.data);
        if (kData && !kData.message) setKidsAnalytics(kData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://movie-backend-drab.vercel.app/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newCampaign, goalAmount: Number(newCampaign.goalAmount) })
      });
      const data = await res.json();
      if (data.success) {
        setCampaigns([data.data, ...campaigns]);
        setNewCampaign({ title: '', description: '', goalAmount: '', image: '' });
        Swal.fire({
          title: 'Success!',
          text: 'Campaign created successfully.',
          icon: 'success',
          confirmButtonColor: '#1a2f24',
          confirmButtonText: 'Great!'
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create campaign.',
        icon: 'error',
        confirmButtonColor: '#1a2f24'
      });
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      const res = await fetch(`https://movie-backend-drab.vercel.app/api/campaigns/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCampaigns(campaigns.filter(c => c._id !== id));
        toast.success("Campaign deleted");
      }
    } catch (err) {
      toast.error("Failed to delete campaign");
    }
  };

  const handleExportCSV = () => {
    if (donations.length === 0) return toast.error("No donations to export");
    const headers = ["First Name", "Last Name", "Email", "Amount", "Type", "Status", "Date", "Campaign ID"];
    const rows = donations.map(d => [
      d.firstName || '', d.lastName || '', d.email, d.amount, d.type, d.status, new Date(d.createdAt).toISOString(), d.campaignId || ''
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "oms_donations_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported CSV successfully");
  };

  const handleBulkReceipt = async () => {
    try {
      toast.loading("Sending bulk receipts...", { id: "bulkReceipt" });
      const res = await fetch("https://movie-backend-drab.vercel.app/api/admin-mail/bulk-receipt", {
        method: "POST"
      });
      if (res.ok) {
        toast.success("Bulk receipts sent to recent donors!", { id: "bulkReceipt" });
      } else {
        toast.error("Failed to send bulk receipts", { id: "bulkReceipt" });
      }
    } catch (e) {
      toast.error("Network error", { id: "bulkReceipt" });
    }
  };

  const handleSendEmailUpdate = async () => {
    if (!emailSubject || !emailContent) {
      Swal.fire({ title: 'Error', text: 'Subject and content are required', icon: 'error', confirmButtonColor: '#1a2f24' });
      return;
    }
    try {
      setIsSendingEmail(true);
      const res = await fetch("https://movie-backend-drab.vercel.app/api/admin-mail/send-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segment: emailSegment, subject: emailSubject, content: emailContent })
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({
          title: 'Sent!',
          text: `Successfully sent updates to ${data.count} donors.`,
          icon: 'success',
          confirmButtonColor: '#1a2f24'
        });
        setEmailModalOpen(false);
        setEmailSubject("");
        setEmailContent("");
      } else {
        Swal.fire({ title: 'Error', text: data.message || 'Failed to send email updates', icon: 'error', confirmButtonColor: '#1a2f24' });
      }
    } catch (e) {
      Swal.fire({ title: 'Network Error', text: 'Could not connect to the server.', icon: 'error', confirmButtonColor: '#1a2f24' });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const kidsRevenue = kidsAnalytics?.totalRevenue || 0;
  const kidsMonthly = (kidsAnalytics?.monthlyCount || 0) * 4.99; // approx monthly revenue from kids

  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0) + kidsRevenue;
  const totalDonors = new Set(donations.map(d => d.email)).size + (kidsAnalytics?.totalSubscribers || 0);
  const monthlyGiving = donations.filter(d => d.type === 'Monthly').reduce((sum, d) => sum + d.amount, 0) + kidsMonthly;
  const avgDonation = donations.length > 0 ? (donations.reduce((sum, d) => sum + d.amount, 0) / donations.length) : 0;

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Donations Hub</h1>
          <p className="text-muted-foreground">Track contributions and manage ministry partnerships.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2" onClick={handleExportCSV}>
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md" onClick={handleBulkReceipt}>
            <Mail className="w-4 h-4" />
            Bulk Receipt
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Raised" value={`$${totalRaised.toLocaleString()}`} sub="Incl. KidsBibleFlix" icon={DollarSign} color="forest" />
        <StatsCard title="Total Donors" value={totalDonors.toString()} sub="Unique Supporters" icon={Users} color="gold" />
        <StatsCard title="Monthly Giving" value={`$${monthlyGiving.toLocaleString()}`} sub="Recurring Revenue" icon={Heart} color="sky" />
        <StatsCard title="KidsBibleFlix Revenue" value={`$${kidsRevenue.toLocaleString()}`} sub="Streaming Platform" icon={TrendingUp} color="forest" />
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="bg-muted/30 border border-border/50 rounded-xl p-1 h-14">
          <TabsTrigger value="transactions" className="rounded-lg h-full px-6 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="rounded-lg h-full px-6 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Giving Campaigns
          </TabsTrigger>
          <TabsTrigger value="segmentation" className="rounded-lg h-full px-6 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Donor Segmentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-0">
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
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
              ) : donations.map((d) => (
                <TableRow key={d._id} className="border-border/50 group hover:bg-muted/10 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest font-bold border border-forest/10">
                        {d.firstName ? d.firstName.charAt(0) : '?'}
                      </div>
                      <div>
                        <div className="font-bold text-base">{d.firstName} {d.lastName}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{d.email}</div>
                        <div className="text-[9px] font-medium text-muted-foreground mt-1">
                          {d.isRegisteredUser ? (
                            <span className="text-forest">Account created: {new Date(d.accountCreatedAt).toLocaleDateString()}</span>
                          ) : (
                            <span className="text-muted-foreground/60">Guest Donation</span>
                          )}
                        </div>
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
                    {new Date(d.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] uppercase font-black">
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 hover:bg-forest/10 hover:text-forest"
                        onClick={() => {
                          setEmailSegment(d.email);
                          setEmailModalOpen(true);
                        }}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
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
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6 mt-0">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden p-6">
            <h2 className="text-xl font-display font-bold mb-6">Create New Campaign</h2>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Campaign Title" required value={newCampaign.title} onChange={e => setNewCampaign({ ...newCampaign, title: e.target.value })} />
                <Input placeholder="Goal Amount ($)" type="number" required value={newCampaign.goalAmount} onChange={e => setNewCampaign({ ...newCampaign, goalAmount: e.target.value })} />
              </div>
              <Input placeholder="Image URL (Optional)" value={newCampaign.image} onChange={e => setNewCampaign({ ...newCampaign, image: e.target.value })} />
              <Textarea placeholder="Campaign Description" required value={newCampaign.description} onChange={e => setNewCampaign({ ...newCampaign, description: e.target.value })} />
              <Button type="submit" className="bg-forest">Create Campaign</Button>
            </form>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map(c => (
              <Card key={c._id} className="border-border/50 bg-card/50 shadow-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display font-bold text-lg">{c.title}</h3>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteCampaign(c._id)} className="text-destructive h-8 w-8 p-0"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{c.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Raised: ${c.raisedAmount}</span>
                      <span>Goal: ${c.goalAmount}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gold h-full rounded-full" style={{ width: `${Math.min(100, (c.raisedAmount / c.goalAmount) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="segmentation" className="mt-0">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-display font-bold">Email Segmentation</h2>
                <p className="text-muted-foreground text-sm">Target specific donor groups for updates and campaigns.</p>
              </div>
              <Button className="bg-forest gap-2" onClick={() => setEmailModalOpen(true)}>
                <Mail className="w-4 h-4" /> Compose Email Update
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border border-border/50 p-4 hover:border-gold/50 cursor-pointer transition-colors">
                <h3 className="font-bold mb-1">Monthly Partners</h3>
                <p className="text-xs text-muted-foreground">Donors with recurring giving</p>
                <div className="text-2xl font-bold mt-4 text-forest-deep">{new Set(donations.filter(d => d.type === 'Monthly' || d.type === 'Annual').map(d => d.email)).size} Donors</div>
              </Card>
              <Card className="border border-border/50 p-4 hover:border-gold/50 cursor-pointer transition-colors">
                <h3 className="font-bold mb-1">Campaign Supporters</h3>
                <p className="text-xs text-muted-foreground">Donated to specific projects</p>
                <div className="text-2xl font-bold mt-4 text-forest-deep">{new Set(donations.filter(d => d.campaignId).map(d => d.email)).size} Donors</div>
              </Card>
              <Card className="border border-border/50 p-4 hover:border-gold/50 cursor-pointer transition-colors">
                <h3 className="font-bold mb-1">Legacy Interest</h3>
                <p className="text-xs text-muted-foreground">Requested planned giving info</p>
                <div className="text-2xl font-bold mt-4 text-forest-deep">{new Set(donations.filter(d => d.isLegacy).map(d => d.email)).size} Leads</div>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
        <DialogContent className="sm:max-w-[600px] border-border/50 bg-background/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">Compose Update</DialogTitle>
            <DialogDescription>Send an email blast to a specific donor segment.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Segment</label>
              <select
                className="w-full h-11 rounded-xl bg-background border border-border/50 px-3 outline-none"
                value={emailSegment}
                onChange={(e) => setEmailSegment(e.target.value)}
              >
                <option value="all">All Donors</option>
                <option value="monthly">Monthly & Annual Partners</option>
                <option value="campaign">Campaign Supporters</option>
                <option value="legacy">Legacy Giving Interest</option>
                {emailSegment.includes('@') && (
                  <option value={emailSegment}>Individual Donor ({emailSegment})</option>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject Line</label>
              <Input placeholder="Email Subject" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Content</label>
              <Textarea placeholder="Write your update here..." className="min-h-[200px]" value={emailContent} onChange={e => setEmailContent(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailModalOpen(false)}>Cancel</Button>
            <Button className="bg-forest" onClick={handleSendEmailUpdate} disabled={isSendingEmail}>
              {isSendingEmail ? "Sending..." : "Send Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
