import { createFileRoute } from "@tanstack/react-router";
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
  ExternalLink
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

export const Route = createFileRoute("/admin/resources")({
  component: ResourceManagement,
});

const resources = [
  { id: 1, name: "Family Prayer Guide", type: "PDF", size: "2.4 MB", downloads: 842, status: "Public" },
  { id: 2, name: "Church Curriculum: Genesis", type: "ZIP", size: "128 MB", downloads: 156, status: "Locked" },
  { id: 3, name: "Kids Coloring Sheets", type: "PDF", size: "1.2 MB", downloads: 2105, status: "Public" },
  { id: 4, name: "Easter Planning Kit", type: "DOCX", size: "0.8 MB", downloads: 342, status: "Archived" },
];

const leads = [
  { id: 1, email: "john.doe@gmail.com", resource: "Family Prayer Guide", date: "2 mins ago" },
  { id: 2, email: "martha.stew@outlook.com", resource: "Kids Coloring Sheets", date: "15 mins ago" },
  { id: 3, email: "p.collins@church.org", resource: "Church Curriculum: Genesis", date: "1 hour ago" },
];

function ResourceManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Resource Management</h1>
          <p className="text-muted-foreground">Upload and manage downloadable guides, curricula, and digital assets.</p>
        </div>
        <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
          <Plus className="w-4 h-4" />
          Upload Resource
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Files" value="48" icon={FileText} />
        <StatsCard title="Downloads" value="12.5k" icon={Download} />
        <StatsCard title="Capture Rate" value="34%" icon={Mail} />
        <StatsCard title="Storage" value="2.8 GB" icon={HardDrive} />
      </div>

      <Tabs defaultValue="files" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="files" className="rounded-lg px-6">Files & Assets</TabsTrigger>
          <TabsTrigger value="leads" className="rounded-lg px-6">Lead Generation</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg px-6">Gate Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/10">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search resources..." className="pl-10 h-10 rounded-lg bg-background" />
              </div>
              <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="h-10 border-border/50 bg-background"><FileDown className="w-4 h-4 mr-2" /> Bulk Action</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((file) => (
                  <TableRow key={file.id} className="border-border/50 hover:bg-muted/5">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        {file.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-[10px]">{file.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{file.size}</TableCell>
                    <TableCell>
                      <Badge className={
                        file.status === "Public" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                        file.status === "Locked" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                        "bg-muted text-muted-foreground"
                      }>
                        {file.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{file.downloads}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Share2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical className="w-4 h-4" /></Button>
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
            <CardHeader className="border-b border-border/50 flex flex-row items-center justify-between py-4">
              <CardTitle className="text-lg">Recent Lead Captures</CardTitle>
              <Button size="sm" variant="outline" className="h-8 text-xs gap-1 border-border/50">
                <FileDown className="w-3.5 h-3.5" /> Export leads.csv
              </Button>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 bg-muted/10">
                  <TableHead>Email Address</TableHead>
                  <TableHead>Resource Accessed</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="border-border/50">
                    <TableCell className="font-medium">{lead.email}</TableCell>
                    <TableCell className="text-sm">{lead.resource}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{lead.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col justify-between">
            <div className="space-y-4">
               <div className="p-4 bg-forest/10 rounded-2xl w-fit">
                  <Mail className="w-6 h-6 text-forest" />
               </div>
               <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg">Lead Generation Stats</h3>
                  <p className="text-sm text-muted-foreground">Performance of email capture gates</p>
               </div>
               <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-3 bg-muted/20 rounded-xl">
                     <div className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">New Leads</div>
                     <div className="text-xl font-bold">142</div>
                     <div className="text-[10px] text-emerald-500 font-bold">+18% this week</div>
                  </div>
                  <div className="p-3 bg-muted/20 rounded-xl">
                     <div className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Conv. Rate</div>
                     <div className="text-xl font-bold">4.2%</div>
                     <div className="text-[10px] text-rose-500 font-bold">-0.5% vs avg</div>
                  </div>
               </div>
            </div>
            <Button className="w-full mt-8 bg-forest shadow-md gap-2">
               Configure Email Gate <ExternalLink className="w-3 h-3" />
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon }: any) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
      <div className="p-3 bg-muted/20 rounded-2xl w-fit">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="text-3xl font-bold font-display">{value}</div>
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">{title}</div>
    </Card>
  );
}
