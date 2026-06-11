import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CreditCard, Plus, Trash2, ShieldCheck, Activity } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/promo-codes")({
  component: PromoCodesManagement,
});

function PromoCodesManagement() {
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPromo, setNewPromo] = useState({ code: "", discountPercentage: "", maxUses: "" });

  const fetchPromoCodes = async () => {
    try {
      const token = localStorage.getItem("user_token");
      const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";
      const baseUrl = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

      const res = await fetch(`${baseUrl}/promocodes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setPromoCodes(data.data);
      } else {
        toast.error("Failed to load promo codes");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const handleCreatePromo = async () => {
    if (!newPromo.code || !newPromo.discountPercentage) {
      toast.error("Code and discount are required");
      return;
    }
    try {
      const token = localStorage.getItem("user_token");
      const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";
      const baseUrl = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

      const res = await fetch(`${baseUrl}/promocodes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          code: newPromo.code,
          discountPercentage: Number(newPromo.discountPercentage),
          maxUses: Number(newPromo.maxUses) || 0
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Promo code created successfully");
        setIsCreateOpen(false);
        setNewPromo({ code: "", discountPercentage: "", maxUses: "" });
        fetchPromoCodes();
      } else {
        toast.error(data.message || "Failed to create promo code");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleDeletePromo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promo code?")) return;
    try {
      const token = localStorage.getItem("user_token");
      const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";
      const baseUrl = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

      const res = await fetch(`${baseUrl}/promocodes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Promo code deleted");
        fetchPromoCodes();
      } else {
        toast.error("Failed to delete promo code");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Promo Codes</h1>
          <p className="text-muted-foreground">Manage discount codes for event ticketing.</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="h-11 rounded-xl bg-forest hover:bg-forest/90 text-white gap-2">
          <Plus className="w-4 h-4" /> Create Promo Code
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StatsCard title="Total Codes" value={promoCodes.length} icon={CreditCard} color="forest" />
        <StatsCard title="Active Codes" value={promoCodes.filter(c => c.isActive).length} icon={Activity} color="gold" />
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="pl-6 py-4">Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promoCodes.map((promo) => (
              <TableRow key={promo._id} className="border-border/50 group hover:bg-muted/10 transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="font-mono font-bold text-lg text-foreground">{promo.code}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-gold/10 text-gold border-gold/20 text-sm">
                    {promo.discountPercentage}% OFF
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      promo.isActive && (promo.maxUses === 0 || promo.usedCount < promo.maxUses)
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                    }
                  >
                    {promo.isActive && (promo.maxUses === 0 || promo.usedCount < promo.maxUses) ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">
                    {promo.usedCount} / {promo.maxUses === 0 ? "Unlimited" : promo.maxUses}
                  </span>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeletePromo(promo._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {promoCodes.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  No promo codes found. Create one to get started!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl border-border/50 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Create Promo Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Promo Code</label>
              <Input
                placeholder="e.g. SUMMER20"
                value={newPromo.code}
                onChange={e => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                className="font-mono uppercase h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Discount Percentage (%)</label>
              <Input
                type="number"
                placeholder="e.g. 20"
                min="1"
                max="100"
                value={newPromo.discountPercentage}
                onChange={e => setNewPromo({ ...newPromo, discountPercentage: e.target.value })}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Max Uses (0 = Unlimited)</label>
              <Input
                type="number"
                placeholder="e.g. 100"
                min="0"
                value={newPromo.maxUses}
                onChange={e => setNewPromo({ ...newPromo, maxUses: e.target.value })}
                className="h-11"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="rounded-xl h-11">Cancel</Button>
            <Button onClick={handleCreatePromo} className="rounded-xl h-11 bg-forest hover:bg-forest/90 text-white">Create Code</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
  const colorMap: any = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/10 text-gold",
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-4xl font-bold font-display">{value}</div>
        </div>
      </div>
    </Card>
  );
}
