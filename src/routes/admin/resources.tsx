import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Download, 
  Mail, 
  Search, 
  MoreVertical, 
  Share2, 
  HardDrive,
  FileDown,
  Users,
  ExternalLink,
  Trash2,
  Edit,
  CloudUpload,
  Lock,
  Globe,
  LayoutGrid,
  GraduationCap,
  BookOpen,
  Image as ImageIcon,
  CheckCircle2,
  Filter
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/resources")({
  component: ResourceManagement,
});

// Synchronized with public Resources page
const INITIAL_RESOURCES = [
  { id: 1, name: "VBS Summer Kit 2026", type: "Curriculum", format: "ZIP", size: "128 MB", downloads: 450, status: "Public", date: "May 10, 2026" },
  { id: 2, name: "Week of Prayer Study Guide", type: "Study Guides", format: "PDF", size: "4.2 MB", downloads: 1240, status: "Gated", date: "May 12, 2026" },
  { id: 3, name: "Social Media Promo Bundle", type: "Media Kits", format: "ZIP", size: "45 MB", downloads: 890, status: "Public", date: "May 11, 2026" },
  { id: 4, name: "Kids Coloring Sheets", type: "Promo", format: "PDF", size: "2.1 MB", downloads: 3500, status: "Public", date: "May 08, 2026" },
];

const INITIAL_LEADS = [
  { id: 1, email: "john.doe@gmail.com", name: "John Doe", resource: "Week of Prayer Study Guide", date: "May 13, 2026", time: "10:45 AM" },
  { id: 2, email: "martha.stew@outlook.com", name: "Martha Stewart", resource: "VBS Summer Kit 2026", date: "May 13, 2026", time: "09:20 AM" },
  { id: 3, email: "p.collins@church.org", name: "Pastor Collins", resource: "Social Media Promo Bundle", date: "May 12, 2026", time: "04:15 PM" },
];

function ResourceManagement() {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("files");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "Curriculum",
    format: "PDF",
    status: "Public"
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      format: formData.format,
      size: "0.0 MB",
      downloads: 0,
      status: formData.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setResources([newRes, ...resources]);
    setIsUploadOpen(false);
    toast.success(`${formData.name} uploaded successfully!`);
  };

  const handleDelete = (id: number) => {
    setResources(resources.filter(r => r.id !== id));
    toast.error("Resource removed");
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Resource Management</h1>
          <p className="text-muted-foreground">Manage downloadable guides, curricula, and digital assets.</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md hover:shadow-forest/20 transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
             <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">Upload New Asset</DialogTitle>
                <DialogDescription>Add a new file to the ministry resource library.</DialogDescription>
             </DialogHeader>
             <form onSubmit={handleUpload} className="space-y-6 py-4">
                <div className="space-y-4">
                   <div className="border-2 border-dashed border-border rounded-3xl p-10 text-center hover:bg-forest/5 hover:border-forest/50 transition-all cursor-pointer group">
                      <CloudUpload className="w-10 h-10 text-muted-foreground group-hover:text-forest mx-auto mb-3" />
                      <div className="font-bold text-sm">Drop file here or click to upload</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">PDF, ZIP, DOCX up to 500MB</div>
                   </div>
                   <div className="space-y-2">
                      <Label>Resource Name</Label>
                      <Input 
                        placeholder="e.g. Family Devotional Guide" 
                        className="h-11 rounded-xl"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <Label>Resource Type</Label>
                         <Select value={formData.type} onValueChange={val => setFormData({...formData, type: val})}>
                            <SelectTrigger className="h-11 rounded-xl">
                               <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                               <SelectItem value="Curriculum">Curriculum</SelectItem>
                               <SelectItem value="Study Guides">Study Guides</SelectItem>
                               <SelectItem value="Media Kits">Media Kits</SelectItem>
                               <SelectItem value="Promo">Promo Material</SelectItem>
                            </SelectContent>
                         </Select>
                      </div>
                      <div className="space-y-2">
                         <Label>Access Status</Label>
                         <Select value={formData.status} onValueChange={val => setFormData({...formData, status: val})}>
                            <SelectTrigger className="h-11 rounded-xl">
                               <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                               <SelectItem value="Public">Public Access</SelectItem>
                               <SelectItem value="Gated">Email Gated</SelectItem>
                               <SelectItem value="Locked">Premium Only</SelectItem>
                            </SelectContent>
                         </Select>
                      </div>
                   </div>
                </div>
                <DialogFooter>
                   <Button type="submit" className="w-full bg-forest h-12 rounded-xl shadow-lg">Publish Resource</Button>
                </DialogFooter>
             </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Files" value={resources.length.toString()} icon={FileText} color="forest" />
        <StatsCard title="Total Downloads" value="5,622" icon={Download} color="gold" />
        <StatsCard title="Lead Conversion" value="42%" icon={Mail} color="sky" />
        <StatsCard title="Storage Used" value="1.2 GB" icon={HardDrive} color="forest" />
      </div>

      <Tabs defaultValue="files" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="files" className="rounded-lg px-8 data-[state=active]:bg-forest data-[state=active]:text-white transition-all">Files & Assets</TabsTrigger>
          <TabsTrigger value="leads" className="rounded-lg px-8 data-[state=active]:bg-forest data-[state=active]:text-white transition-all">Lead Generation</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg px-8 data-[state=active]:bg-forest data-[state=active]:text-white transition-all">Gate Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          <div className="flex items-center gap-2">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search resources..." className="pl-10 h-11 rounded-xl bg-card/50 border-border/50" />
             </div>
             <Button variant="outline" className="h-11 rounded-xl gap-2"><Filter className="w-4 h-4" /> Filter</Button>
          </div>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50">
                  <TableHead className="font-bold">Resource Name</TableHead>
                  <TableHead className="font-bold">Type</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold text-center">Downloads</TableHead>
                  <TableHead className="text-right font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((file) => (
                  <TableRow key={file.id} className="border-border/50 group hover:bg-muted/10 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center border border-forest/10">
                          <FileText className="w-5 h-5 text-forest" />
                        </div>
                        <div>
                           <div className="font-bold text-base">{file.name}</div>
                           <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{file.format} • {file.size}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-widest px-3">{file.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        file.status === "Public" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                        file.status === "Gated" ? "bg-gold/10 text-gold-foreground border-gold/20" :
                        "bg-muted text-muted-foreground"
                      }>
                        {file.status === "Gated" && <Lock className="w-3 h-3 mr-1.5" />}
                        {file.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-bold">{file.downloads.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-forest/10 hover:text-forest"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(file.id)}><Trash2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0"><MoreVertical className="w-4 h-4" /></Button>
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
                       <TableHead className="font-bold">Lead Information</TableHead>
                       <TableHead className="font-bold">Resource Accessed</TableHead>
                       <TableHead className="font-bold">Date & Time</TableHead>
                       <TableHead className="text-right font-bold">Actions</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {leads.map(lead => (
                      <TableRow key={lead.id} className="border-border/50">
                         <TableCell>
                            <div className="flex flex-col">
                               <span className="font-bold">{lead.name}</span>
                               <span className="text-xs text-muted-foreground">{lead.email}</span>
                            </div>
                         </TableCell>
                         <TableCell>
                            <Badge variant="secondary" className="bg-muted/20 text-[10px] font-bold">{lead.resource}</Badge>
                         </TableCell>
                         <TableCell>
                            <div className="flex flex-col">
                               <span className="text-sm">{lead.date}</span>
                               <span className="text-[10px] text-muted-foreground uppercase">{lead.time}</span>
                            </div>
                         </TableCell>
                         <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-forest/10 hover:text-forest"><Mail className="w-4 h-4" /></Button>
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
                    <p className="text-sm text-muted-foreground leading-relaxed">You've captured **142 new emails** this month through resource gates.</p>
                 </div>
                 <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between p-4 bg-white/40 border border-border/50 rounded-2xl">
                       <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Conv. Rate</span>
                       <span className="text-xl font-bold text-forest">12.4%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/40 border border-border/50 rounded-2xl">
                       <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Top File</span>
                       <span className="text-sm font-bold truncate max-w-[100px]">Prayer Guide</span>
                    </div>
                 </div>
              </div>
              <Button className="w-full mt-10 bg-forest h-12 rounded-xl shadow-lg gap-2">
                 <FileDown className="w-4 h-4" /> Export All Leads
              </Button>
           </Card>
        </TabsContent>

        <TabsContent value="settings">
           <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle className="text-xl font-display">Email Gate Settings</CardTitle>
                    <CardDescription>Configure how users access gated resources.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-4 bg-white/40 border border-border/50 rounded-2xl">
                          <div className="space-y-1">
                             <div className="text-sm font-bold">Automatic Delivery</div>
                             <div className="text-[10px] text-muted-foreground uppercase">Email file immediately after signup</div>
                          </div>
                          <Switch checked />
                       </div>
                       <div className="flex items-center justify-between p-4 bg-white/40 border border-border/50 rounded-2xl">
                          <div className="space-y-1">
                             <div className="text-sm font-bold">Double Opt-in</div>
                             <div className="text-[10px] text-muted-foreground uppercase">Require email confirmation</div>
                          </div>
                          <Switch />
                       </div>
                    </div>
                    <Button className="w-full bg-forest h-11 rounded-xl" onClick={() => toast.success("Gate policies updated")}>Update Policies</Button>
                 </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle className="text-xl font-display">Global Library Rules</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="p-6 bg-forest/5 border border-forest/10 rounded-3xl space-y-4">
                       <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-forest" />
                          <div className="font-bold text-sm">Organization Access</div>
                       </div>
                       <p className="text-xs text-muted-foreground leading-relaxed">
                          Currently, all resources are limited to individual users. Enable organization sharing to allow church-wide accounts.
                       </p>
                       <Button variant="outline" className="w-full h-10 border-forest/20 text-forest font-bold text-[10px] uppercase tracking-widest">Enable Org Sharing</Button>
                    </div>
                 </CardContent>
              </Card>
           </div>
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
