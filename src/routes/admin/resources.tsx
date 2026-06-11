import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  FileText, Plus, Download, Mail, Search, MoreVertical,
  HardDrive, FileDown, Users, Trash2, Edit, CloudUpload, Lock, Filter, TrendingUp, Trophy
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "sonner";
import { Switch } from "../../components/ui/switch";
import Swal from "sweetalert2";

export const Route = createFileRoute("/admin/resources")({
  component: ResourceManagement,
});

const API = "http://localhost:5000";

function ResourceManagement() {
  const [resources, setResources] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("files");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    isFeatured: false,
    isActive: true,
  });
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const fetchResources = async () => {
    try {
      const r = await fetch(`${API}/api/resources`);
      const d = await r.json();
      setResources(d);
    } catch (e) { console.error(e); }
  };

  const fetchLeads = async () => {
    try {
      const r = await fetch(`${API}/api/resources/leads/all`);
      const d = await r.json();
      setLeads(d);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchResources();
    fetchLeads();
  }, []);

  const fileToBase64 = (f: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleEdit = (resource: any) => {
    setFormData({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      isFeatured: resource.isFeatured || false,
      isActive: resource.isActive !== false,
    });
    setEditingId(resource._id);
    setFile(null);
    setImage(null);
    setIsUploadOpen(true);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && !file) {
      toast.error("Please select a resource file to upload.");
      return;
    }

    toast.loading(editingId ? "Updating resource..." : "Uploading resource...");
    try {
      let fileUrl = undefined;
      if (file) {
        fileUrl = await fileToBase64(file);
      }
      let featuredImage = undefined;
      if (image) {
        featuredImage = await fileToBase64(image);
      }

      const payload: any = {
        ...formData,
      };
      if (fileUrl) payload.fileUrl = fileUrl;
      if (featuredImage) payload.featuredImage = featuredImage;

      const url = editingId ? `${API}/api/resources/${editingId}` : `${API}/api/resources`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.dismiss();
        toast.success(editingId ? "Resource updated!" : `${formData.title} uploaded successfully!`);
        setIsUploadOpen(false);
        setEditingId(null);
        setFormData({ title: "", description: "", category: "General", isFeatured: false, isActive: true });
        setFile(null);
        setImage(null);
        fetchResources();
      } else {
        toast.dismiss();
        toast.error("Failed to save resource");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Network error");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await Swal.fire({ title: "Delete Resource?", text: "This cannot be undone.", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", cancelButtonColor: "#2C4A3B", confirmButtonText: "Delete" });
    if (!res.isConfirmed) return;

    await fetch(`${API}/api/resources/${id}`, { method: "DELETE" });
    fetchResources();
    toast.success("Resource removed");
  };

  const exportLeads = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Name,Email,Phone,Resource,Date\n"
      + leads.map(e => `${e.name},${e.email},${e.phone || ''},"${e.resourceTitle}",${new Date(e.createdAt).toLocaleDateString()}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Resource Management</h1>
          <p className="text-muted-foreground">Manage downloadable guides, curricula, and digital assets.</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={(open) => {
          setIsUploadOpen(open);
          if (!open) {
            setEditingId(null);
            setFormData({ title: "", description: "", category: "General", isFeatured: false, isActive: true });
            setFile(null);
            setImage(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md hover:shadow-forest/20 transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold">{editingId ? "Edit Resource" : "Upload New Asset"}</DialogTitle>
              <DialogDescription>{editingId ? "Update the details of this resource." : "Add a new file to the ministry resource library."}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Resource Name</Label>
                  <Input
                    placeholder="e.g. Family Devotional Guide"
                    className="h-11 rounded-xl"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea
                    placeholder="Brief summary..."
                    className="w-full min-h-[80px] p-3 rounded-xl border border-input bg-transparent text-sm"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      list="categories"
                      className="h-11 rounded-xl"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Type or select..."
                    />
                    <datalist id="categories">
                      <option value="Parents" />
                      <option value="Teachers" />
                      <option value="Pastors" />
                      <option value="Youth Leaders" />
                      <option value="General" />
                    </datalist>
                  </div>
                  <div className="space-y-2">
                    <Label>Available to Download</Label>
                    <div className="h-11 flex items-center px-4 rounded-xl border border-input bg-background">
                      <Switch checked={formData.isActive} onCheckedChange={checked => setFormData({ ...formData, isActive: checked })} />
                      <span className="ml-3 text-sm">{formData.isActive ? "Yes, Active" : "No, Hidden"}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Resource File (PDF, ZIP, etc) {editingId && <span className="text-muted-foreground font-normal">(Leave blank to keep current)</span>}</Label>
                  <Input type="file" required={!editingId} onChange={e => setFile(e.target.files?.[0] || null)} className="h-11 rounded-xl file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-forest/10 file:text-forest cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <Label>Featured Cover Image (Optional)</Label>
                  <Input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="h-11 rounded-xl file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-forest/10 file:text-forest cursor-pointer" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-forest h-12 rounded-xl shadow-lg">{editingId ? "Save Changes" : "Publish Resource"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Files" value={resources.length.toString()} icon={FileText} color="forest" />
        <StatsCard title="Active Files" value={resources.filter(r => r.isActive !== false).length.toString()} icon={HardDrive} color="gold" />
        <StatsCard title="Total Leads" value={leads.length.toString()} icon={Mail} color="sky" />
        <StatsCard title="Total Downloads" value={resources.reduce((a, b) => a + (b.downloadsCount || 0), 0).toString()} icon={Download} color="forest" />
      </div>

      <Tabs defaultValue="files" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="files" className="rounded-lg px-8 data-[state=active]:bg-forest data-[state=active]:text-white transition-all">Files & Assets</TabsTrigger>
          <TabsTrigger value="leads" className="rounded-lg px-8 data-[state=active]:bg-forest data-[state=active]:text-white transition-all">Lead Generation</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg px-8 data-[state=active]:bg-forest data-[state=active]:text-white transition-all flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50">
                  <TableHead className="font-bold pl-6">Resource Name</TableHead>
                  <TableHead className="font-bold">Category</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold text-center">Downloads</TableHead>
                  <TableHead className="text-right font-bold pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((file) => (
                  <TableRow key={file._id} className="border-border/50 group hover:bg-muted/10 transition-colors">
                    <TableCell className="font-medium pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center border border-forest/10 overflow-hidden">
                          {file.featuredImage ? <img src={file.featuredImage} className="w-full h-full object-cover" alt="" /> : <FileText className="w-5 h-5 text-forest" />}
                        </div>
                        <div>
                          <div className="font-bold text-base">{file.title}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{new Date(file.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-widest px-3">{file.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`font-bold text-[9px] uppercase tracking-widest px-3 ${file.isActive !== false ? 'bg-forest text-white hover:bg-forest/90 border-transparent' : 'bg-muted text-muted-foreground hover:bg-muted/90 border-transparent'}`}>{file.isActive !== false ? 'Active' : 'Inactive'}</Badge>
                    </TableCell>
                    <TableCell className="text-center font-bold">{file.downloadsCount || 0}</TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-forest/10 hover:text-forest" onClick={() => handleEdit(file)}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(file._id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50">
                  <TableHead className="font-bold pl-6">Lead Information</TableHead>
                  <TableHead className="font-bold">Resource Accessed</TableHead>
                  <TableHead className="font-bold">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map(lead => (
                  <TableRow key={lead._id} className="border-border/50">
                    <TableCell className="pl-6">
                      <div className="flex flex-col">
                        <span className="font-bold">{lead.name}</span>
                        <span className="text-xs text-muted-foreground">{lead.email}</span>
                        {lead.phone && <span className="text-xs text-muted-foreground">{lead.phone}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-muted/20 text-[10px] font-bold">{lead.resourceTitle}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="h-16 w-16 bg-forest/10 rounded-[1.5rem] flex items-center justify-center shadow-sm">
                <Mail className="w-8 h-8 text-forest" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold">Lead Analytics</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">You've captured {leads.length} emails through resource gates.</p>
              </div>
            </div>
            <Button onClick={exportLeads} className="w-full mt-10 bg-forest h-12 rounded-xl shadow-lg gap-2">
              <FileDown className="w-4 h-4" /> Export All Leads
            </Button>
          </Card>
        </TabsContent>

        {/* ── Analytics Tab ── */}
        <TabsContent value="analytics" className="space-y-8">
          {/* Top Resources Chart */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-forest/10 flex items-center justify-center">
                  <Download className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <CardTitle className="text-lg font-display">Most Downloaded Resources</CardTitle>
                  <CardDescription className="text-xs">Total downloads per resource file</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {resources.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <TrendingUp className="w-10 h-10 mb-3 opacity-20" />
                  <p className="text-sm">No download data yet. Upload a resource to get started!</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[...resources].sort((a, b) => (b.downloadsCount || 0) - (a.downloadsCount || 0))} margin={{ top: 20, right: 30, left: -16, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="title" tick={{ fontSize: 11, fontWeight: 600 }} tickLine={false} axisLine={false} tickFormatter={(v) => v.length > 15 ? v.slice(0, 15) + '…' : v} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} formatter={(v: any) => [`${v.toLocaleString()} downloads`, 'Downloads']} />
                    <Bar dataKey="downloadsCount" radius={[8, 8, 0, 0]}>
                      {resources.map((_, idx) => (
                        <Cell key={idx} fill={idx === 0 ? '#2C4A3B' : idx === 1 ? '#4a7c5e' : idx === 2 ? '#C9A84C' : '#94a3b8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Ranked Leaderboard */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> Resource Leaderboard
              </CardTitle>
              <CardDescription>Top resources ranked by popularity</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="border-border/50">
                    <TableHead className="font-bold w-12 pl-6">#</TableHead>
                    <TableHead className="font-bold">Resource Name</TableHead>
                    <TableHead className="font-bold">Category</TableHead>
                    <TableHead className="font-bold text-right pr-6">Downloads</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...resources].sort((a, b) => (b.downloadsCount || 0) - (a.downloadsCount || 0)).map((file, idx) => (
                    <TableRow key={file._id} className="border-border/50 hover:bg-muted/5 transition-colors">
                      <TableCell className="pl-6 font-black text-lg">
                        {idx === 0 ? <span className="text-amber-500">🥇</span> : idx === 1 ? <span className="text-slate-400">🥈</span> : idx === 2 ? <span className="text-amber-700">🥉</span> : <span className="text-muted-foreground text-sm font-bold">{idx + 1}</span>}
                      </TableCell>
                      <TableCell className="font-semibold">{file.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[9px] uppercase tracking-widest">{file.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                          <Download className="w-3.5 h-3.5 text-blue-500" />
                          {file.downloadsCount || 0}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {resources.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground italic">No resources available.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
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
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">{title}</div>
    </Card>
  );
}
