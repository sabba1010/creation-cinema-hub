import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Type, 
  Newspaper,
  Eye,
  Calendar as CalendarIcon,
  ChevronRight,
  GripVertical,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/admin/newsletter")({
  component: NewsletterManagement,
});

const INITIAL_NEWSLETTERS = [
  {
    id: "NL-001",
    title: "May 2026: New Horizons in Faith Media",
    date: "2026-05-15",
    status: "Published",
    author: "OMS Team",
    views: 1240,
    blocksCount: 4
  },
  {
    id: "NL-002",
    title: "April 2026: The Power of Community",
    date: "2026-04-10",
    status: "Published",
    author: "OMS Team",
    views: 950,
    blocksCount: 2
  },
  {
    id: "NL-003",
    title: "June 2026: Summer Kickoff",
    date: "2026-06-01",
    status: "Draft",
    author: "OMS Team",
    views: 0,
    blocksCount: 1
  }
];

function NewsletterManagement() {
  const [newsletters, setNewsletters] = useState(INITIAL_NEWSLETTERS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    featuredImage: ""
  });

  const [blocks, setBlocks] = useState<any[]>([]);

  const handleCreateNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNewsletter) {
      setNewsletters(newsletters.map(nl => nl.id === editingNewsletter.id ? { ...nl, ...formData } : nl));
      toast.success("Newsletter updated successfully!");
      setEditingNewsletter(null);
    } else {
      const newNewsletter = {
        id: `NL-${Math.floor(100 + Math.random() * 900)}`,
        title: formData.title,
        date: formData.date,
        status: "Draft",
        author: "OMS Admin",
        views: 0,
        blocksCount: blocks.length
      };
      setNewsletters([newNewsletter, ...newsletters]);
      toast.success("Newsletter draft created!");
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", date: new Date().toISOString().split('T')[0], description: "", featuredImage: "" });
    setBlocks([]);
    setEditingNewsletter(null);
  };

  const handleEditClick = (nl: any) => {
    setEditingNewsletter(nl);
    setFormData({
      title: nl.title,
      date: nl.date,
      description: "Monthly update for the OMS community.",
      featuredImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80"
    });
    setBlocks([
      { type: "text", content: "Welcome to our update!" },
      { type: "photo", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", caption: "BTS" }
    ]);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setNewsletters(newsletters.filter(n => n.id !== id));
    toast.error("Newsletter deleted");
  };

  const addBlock = (type: string) => {
    const newBlock = { id: Date.now(), type, content: "", url: "", title: "", caption: "", thumbnail: "" };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newBlocks.length) {
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Newsletter System</h1>
          <p className="text-muted-foreground">Create and manage your monthly updates and archive.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-forest hover:bg-forest/90 text-white gap-2 h-11 rounded-xl shadow-md transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              New Newsletter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[2rem] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold">
                {editingNewsletter ? "Edit Newsletter" : "Create New Newsletter"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleCreateNewsletter} className="space-y-8 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Newsletter Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g. May 2026: New Horizons" 
                      className="h-11 rounded-xl bg-background/50"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Publish Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      className="h-11 rounded-xl bg-background/50"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="featuredImage">Featured Image URL</Label>
                    <Input 
                      id="featuredImage" 
                      placeholder="https://images.unsplash.com/..." 
                      className="h-11 rounded-xl bg-background/50"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Briefly describe this update..." 
                      className="rounded-xl bg-background/50 resize-none h-11"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    Content Blocks
                    <Badge variant="outline" className="ml-2">{blocks.length}</Badge>
                  </h3>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" className="rounded-lg h-9 gap-1" onClick={() => addBlock('text')}>
                      <Type className="w-3.5 h-3.5" /> Text
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="rounded-lg h-9 gap-1" onClick={() => addBlock('photo')}>
                      <ImageIcon className="w-3.5 h-3.5" /> Photo
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="rounded-lg h-9 gap-1" onClick={() => addBlock('video')}>
                      <VideoIcon className="w-3.5 h-3.5" /> Video
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="rounded-lg h-9 gap-1" onClick={() => addBlock('news')}>
                      <Newspaper className="w-3.5 h-3.5" /> News
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {blocks.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-2xl text-muted-foreground italic">
                      No blocks added yet. Click a button above to add content.
                    </div>
                  ) : (
                    blocks.map((block, index) => (
                      <Card key={block.id} className="relative group border-border/50 bg-background/30 hover:bg-background/50 transition-colors rounded-xl overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-forest opacity-50 group-hover:opacity-100 transition-opacity" />
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex flex-col gap-1 shrink-0 pt-2">
                              <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveBlock(index, 'up')} disabled={index === 0}>
                                <ArrowUp className="w-3 h-3" />
                              </Button>
                              <div className="flex items-center justify-center cursor-grab active:cursor-grabbing">
                                <GripVertical className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}>
                                <ArrowDown className="w-3 h-3" />
                              </Button>
                            </div>

                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge className="bg-muted text-foreground border-none px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest">
                                  {block.type} Block
                                </Badge>
                                <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10" onClick={() => removeBlock(block.id)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>

                              {block.type === 'text' && (
                                <Textarea placeholder="Enter your text update..." className="min-h-[100px] bg-background/50 border-border/50" />
                              )}
                              
                              {(block.type === 'photo' || block.type === 'video') && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <Input placeholder={block.type === 'photo' ? "Image URL" : "Video URL (YouTube/Vimeo)"} className="bg-background/50 border-border/50" />
                                  <Input placeholder={block.type === 'photo' ? "Caption (Optional)" : "Video Title"} className="bg-background/50 border-border/50" />
                                </div>
                              )}

                              {block.type === 'news' && (
                                <div className="space-y-2">
                                  <Input placeholder="News Title" className="bg-background/50 border-border/50" />
                                  <Textarea placeholder="News Summary/Content" className="h-20 bg-background/50 border-border/50" />
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-border/50">
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl">Cancel</Button>
                <Button type="submit" className="bg-forest hover:bg-forest/90 rounded-xl px-8 shadow-md">
                  {editingNewsletter ? "Update Newsletter" : "Publish Draft"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total Newsletters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newsletters.length}</div>
            <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
              <Plus className="w-3 h-3" /> 1 this month
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total Reads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,190</div>
            <p className="text-xs text-emerald-500 mt-1">↑ 12% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5,432</div>
            <p className="text-xs text-emerald-500 mt-1">+84 this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search newsletters..." className="pl-10 bg-card/50 border-border/50 h-11 rounded-xl focus:ring-forest/30" />
        </div>
        <Button variant="outline" className="h-11 rounded-xl gap-2 border-border/50">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/50">
              <TableHead className="font-bold">Title</TableHead>
              <TableHead className="font-bold">Publish Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Blocks</TableHead>
              <TableHead className="font-bold">Views</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsletters.map((nl) => (
              <TableRow key={nl.id} className="border-border/50 hover:bg-muted/10 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center">
                      <Newspaper className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      {nl.title}
                      <div className="text-xs text-muted-foreground font-normal">ID: {nl.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{nl.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={nl.status === "Published" ? "default" : "secondary"}
                    className={nl.status === "Published" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}
                  >
                    {nl.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className="rounded-md font-mono">{nl.blocksCount}</Badge>
                    <span className="text-xs text-muted-foreground">blocks</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    {nl.views.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-elevated border-border/50">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                        <Eye className="w-4 h-4" /> View Public
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer" onClick={() => handleEditClick(nl)}>
                        <Edit className="w-4 h-4" /> Edit Content
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="rounded-lg gap-2 text-destructive focus:text-destructive cursor-pointer"
                        onClick={() => handleDelete(nl.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
