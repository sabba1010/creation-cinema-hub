import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Video,
  Plus,
  Shield,
  ShieldAlert,
  UserPlus,
  History,
  MoreHorizontal,
  Edit,
  Mail,
  User,
  Trash2,
  Settings
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
import { Progress } from "../../components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";

export const Route = createFileRoute("/admin/prayer")({
  component: PrayerManagement,
});

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function PrayerManagement() {
  const [seasons, setSeasons] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Dialog States
  const [isSeasonDialogOpen, setIsSeasonDialogOpen] = useState(false);
  const [isGrantDialogOpen, setIsGrantDialogOpen] = useState(false);

  // Form States
  const [seasonForm, setSeasonForm] = useState({ title: "", theme: "", description: "", price: 29, samplePreviewVideo: "", bannerImage: "", status: "active" });
  const [grantForm, setGrantForm] = useState({ name: "", email: "" });

  const fetchData = async () => {
    try {
      const [seaRes, usrRes] = await Promise.all([
        fetch(`${API_URL}/api/prayer/seasons`),
        fetch(`${API_URL}/api/prayer/users`)
      ]);
      const seaData = await seaRes.json();
      const usrData = await usrRes.json();
      if (seaData.success) setSeasons(seaData.data);
      if (usrData.success) setUsers(usrData.data);
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSeason = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/prayer/seasons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seasonForm)
      });
      if (res.ok) {
        setIsSeasonDialogOpen(false);
        setSeasonForm({ title: "", theme: "", description: "", price: 29, samplePreviewVideo: "", bannerImage: "", status: "active" });
        toast.success("Season created successfully!");
        fetchData();
      } else {
        toast.error("Failed to create season");
      }
    } catch (err) {
      toast.error("Error creating season");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append("image", file);

    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formDataObj,
      });
      const data = await res.json();
      if (data.success) {
        const fullUrl = `${API_URL}${data.url}`;
        setSeasonForm(prev => ({ ...prev, bannerImage: fullUrl }));
        toast.success("Image uploaded to server!");
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      toast.error("Network error during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 14); // 2-week expiration

    try {
      const res = await fetch(`${API_URL}/api/prayer/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: grantForm.name,
          email: grantForm.email,
          status: "Active",
          expires: expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        })
      });
      if (res.ok) {
        setIsGrantDialogOpen(false);
        setGrantForm({ name: "", email: "" });
        toast.success(`Access granted to ${grantForm.name}`);
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to grant access");
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/prayer/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Expired" })
      });
      toast.error("Access revoked");
      fetchData();
    } catch (err) {
      toast.error("Failed to revoke access");
    }
  };

  const handleExtend = async (user: any) => {
    try {
      const current = new Date(user.expires);
      current.setDate(current.getDate() + 7);
      await fetch(`${API_URL}/api/prayer/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Active",
          expires: current.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        })
      });
      toast.success("Access extended by 7 days");
      fetchData();
    } catch (err) {
      toast.error("Failed to extend access");
    }
  };

  const handleDeleteSeason = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/prayer/seasons/${id}`, { method: "DELETE" });
      toast.error("Season deleted");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete season");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-forest border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Week Of Prayer</h1>
          <p className="text-muted-foreground">Manage Week of Prayer seasons, episodes, and access control.</p>
        </div>
        <div className="flex gap-2">
          {/* Manual Grant Dialog */}
          <Dialog open={isGrantDialogOpen} onOpenChange={setIsGrantDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
                <UserPlus className="w-4 h-4" />
                Manual Grant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">Grant Program Access</DialogTitle>
                <DialogDescription>Manually add a user to the program with a 2-week expiration.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleGrantAccess} className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="John Doe"
                        className="pl-10 h-11 rounded-xl"
                        value={grantForm.name}
                        onChange={e => setGrantForm({ ...grantForm, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 h-11 rounded-xl"
                        value={grantForm.email}
                        onChange={e => setGrantForm({ ...grantForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full bg-forest h-11 rounded-xl shadow-md">Grant 14-Day Access</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Create Season Dialog */}
          <Dialog open={isSeasonDialogOpen} onOpenChange={setIsSeasonDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
                <Plus className="w-4 h-4" />
                Create Season
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">Create New Season</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateSeason} className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Season Title</Label>
                    <Input
                      placeholder="Week of Prayer 2026"
                      className="h-11 rounded-xl"
                      value={seasonForm.title}
                      onChange={e => setSeasonForm({ ...seasonForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Input
                      placeholder="e.g. Rooted in Him"
                      className="h-11 rounded-xl"
                      value={seasonForm.theme}
                      onChange={e => setSeasonForm({ ...seasonForm, theme: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Short Description</Label>
                    <textarea 
                      placeholder="About this season..." 
                      className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                      value={seasonForm.description}
                      onChange={e => setSeasonForm({ ...seasonForm, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <select 
                      className="flex h-11 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm"
                      value={seasonForm.status}
                      onChange={e => setSeasonForm({ ...seasonForm, status: e.target.value })}
                    >
                      <option value="active">Active (Available Now)</option>
                      <option value="upcoming">Upcoming (Coming Soon)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Banner Image Upload</Label>
                    <div className="flex gap-4 items-center">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="h-11 rounded-xl flex-1 pt-2.5"
                        disabled={isUploading}
                      />
                      {seasonForm.bannerImage && (
                        <img src={seasonForm.bannerImage} alt="Preview" className="h-11 w-11 object-cover rounded-md border border-border" />
                      )}
                    </div>
                    {isUploading && <p className="text-xs text-muted-foreground">Uploading image...</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Price ($)</Label>
                    <Input
                      type="number"
                      className="h-11 rounded-xl"
                      value={seasonForm.price}
                      onChange={e => setSeasonForm({ ...seasonForm, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sample Preview Video URL</Label>
                    <Input
                      placeholder="https://vimeo.com/..."
                      className="h-11 rounded-xl"
                      value={seasonForm.samplePreviewVideo}
                      onChange={e => setSeasonForm({ ...seasonForm, samplePreviewVideo: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full bg-forest h-11 rounded-xl shadow-md">Create Season</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Video className="w-5 h-5 text-forest" />
              Prayer Seasons
            </CardTitle>
          </CardHeader>
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/50">
                <TableHead>Season / Theme</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seasons.map((season) => (
                <TableRow key={season._id} className="border-border/50">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-bold text-foreground">{season.title}</div>
                      <div className="text-xs text-muted-foreground">{season.theme}</div>
                    </div>
                  </TableCell>
                  <TableCell>${season.price}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{season.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Link to={`/admin/prayer-season/${season._id}`}>
                      <Button variant="outline" size="sm" className="h-8 rounded-lg gap-2">
                        <Settings className="w-4 h-4" /> Manage Episodes
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl border-border/50">
                        <DropdownMenuItem className="gap-2 cursor-pointer"><Edit className="w-4 h-4" /> Edit Info</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive cursor-pointer" onClick={() => handleDeleteSeason(season._id)}>
                          <Trash2 className="w-4 h-4" /> Delete Season
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {seasons.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">No seasons created yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              Access Policy
            </CardTitle>
            <CardDescription>Default settings for new purchases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
              <div className="space-y-0.5">
                <div className="font-semibold text-sm">Expiration Period</div>
                <div className="text-xs text-muted-foreground">Standard 14-day access</div>
              </div>
              <Badge variant="outline">14 Days</Badge>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Active Users</span>
                  <span className="font-semibold">{users.filter(u => u.status === 'Active').length}</span>
                </div>
                <Progress value={Math.min(100, (users.filter(u => u.status === 'Active').length / (users.length || 1)) * 100)} className="h-2 bg-muted" />
              </div>
              <div className="pt-4 border-t border-border/30">
                <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 h-10 rounded-xl" onClick={() => toast.success("Policy updated for all active sessions")}>Extend All Access</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-display">Recent Purchases & Grants</CardTitle>
          <CardDescription>Member account access area for purchased content</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/50">
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Expires On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} className="border-border/50">
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
                    className={user.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-8">{user.progress}%</span>
                    <Progress value={user.progress} className="h-1.5 w-24 bg-muted" />
                  </div>
                </TableCell>
                <TableCell className="text-sm font-mono">{user.expires}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 rounded-lg text-xs gap-1 border-border/50 transition-all active:scale-95"
                    onClick={() => handleExtend(user)}
                  >
                    <History className="w-3 h-3" /> Extend
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-all active:scale-95"
                    onClick={() => handleRevoke(user._id)}
                  >
                    <ShieldAlert className="w-3 h-3" /> Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No recent grants.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
