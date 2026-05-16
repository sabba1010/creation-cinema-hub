import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  FileText, 
  Video as VideoIcon, 
  Type, 
  Eye,
  Calendar as CalendarIcon,
  ChevronRight,
  GripVertical,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";
import { Separator } from "../../components/ui/separator";

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
    blocksCount: 5
  },
  {
    id: "NL-002",
    title: "April 2026: The Power of Community",
    date: "2026-04-10",
    status: "Published",
    author: "OMS Team",
    views: 950,
    blocksCount: 3
  },
  {
    id: "NL-003",
    title: "March 2026: Springing Forward",
    date: "2026-03-05",
    status: "Published",
    author: "OMS Team",
    views: 820,
    blocksCount: 2
  },
  {
    id: "NL-004",
    title: "February 2026: Love & Compassion",
    date: "2026-02-14",
    status: "Published",
    author: "OMS Team",
    views: 1100,
    blocksCount: 2
  },
  {
    id: "NL-005",
    title: "January 2026: New Beginnings",
    date: "2026-01-01",
    status: "Published",
    author: "OMS Team",
    views: 1560,
    blocksCount: 1
  }
];

function NewsletterManagement() {
  const [newsletters, setNewsletters] = useState(INITIAL_NEWSLETTERS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNL, setEditingNL] = useState<any>(null);
  const [blocks, setBlocks] = useState<any[]>([]);

  // Form states
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Draft");

  const resetForm = () => {
    setTitle("");
    setDate("");
    setStatus("Draft");
    setBlocks([]);
    setEditingNL(null);
  };

  const addBlock = (type: string) => {
    const newBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === "text" ? "" : undefined,
      url: (type === "photo" || type === "video") ? "" : undefined,
      title: (type === "video" || type === "news") ? "" : undefined,
      excerpt: type === "news" ? "" : undefined,
      thumbnail: type === "video" ? "" : undefined,
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, field: string, value: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const removeBlock = (id: string) => {
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

  const handleSave = () => {
    if (!title || !date) {
      toast.error("Please fill in title and date");
      return;
    }

    const newsletterData = {
      id: editingNL?.id || `NL-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      date,
      status,
      author: "OMS Team",
      views: editingNL?.views || 0,
      blocksCount: blocks.length
    };

    if (editingNL) {
      setNewsletters(newsletters.map(n => n.id === editingNL.id ? newsletterData : n));
      toast.success("Newsletter updated successfully!");
    } else {
      setNewsletters([newsletterData, ...newsletters]);
      toast.success("Newsletter created successfully!");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (nl: any) => {
    setEditingNL(nl);
    setTitle(nl.title);
    setDate(nl.date);
    setStatus(nl.status);
    // In a real app, you'd fetch blocks here
    setBlocks([
      { id: '1', type: 'text', content: 'Sample text content for editing.' }
    ]);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this newsletter?")) {
      setNewsletters(newsletters.filter(n => n.id !== id));
      toast.success("Newsletter deleted");
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Newsletter Manager</h1>
          <p className="text-muted-foreground">Create and manage your monthly updates and archive.</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => {
              const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              const randomMonth = months[Math.floor(Math.random() * months.length)];
              const newNL = {
                id: `NL-${Math.floor(1000 + Math.random() * 9000)}`,
                title: `${randomMonth} 2026: Special Update`,
                date: `2026-${String(months.indexOf(randomMonth) + 1).padStart(2, '0')}-01`,
                status: Math.random() > 0.5 ? "Published" : "Draft",
                author: "OMS Team",
                views: Math.floor(Math.random() * 2000),
                blocksCount: Math.floor(Math.random() * 5) + 1
              };
              setNewsletters([newNL, ...newsletters]);
              toast.success("Fake newsletter generated!");
            }}
            className="border-forest/20 text-forest hover:bg-forest/5 h-11 rounded-xl"
          >
            Generate Fake Data
          </Button>
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
                  {editingNL ? "Edit Newsletter" : "Create New Newsletter"}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Newsletter Title</Label>
                    <Input 
                      id="title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. May 2026: New Horizons" 
                      className="rounded-xl border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Publish Date</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={date} 
                      onChange={(e) => setDate(e.target.value)}
                      className="rounded-xl border-border/50"
                    />
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-bold">Newsletter Blocks</Label>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => addBlock("text")} className="rounded-lg gap-1">
                        <Type className="w-3.5 h-3.5" /> Text
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => addBlock("photo")} className="rounded-lg gap-1">
                        <FileText className="w-3.5 h-3.5" /> Photo
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => addBlock("video")} className="rounded-lg gap-1">
                        <VideoIcon className="w-3.5 h-3.5" /> Video
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => addBlock("news")} className="rounded-lg gap-1">
                        <FileText className="w-3.5 h-3.5" /> News
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 min-h-[100px] p-4 rounded-2xl bg-muted/30 border border-dashed border-border/50">
                    {blocks.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground italic">
                        No blocks added yet. Click above to add content.
                      </div>
                    ) : (
                      blocks.map((block, index) => (
                        <div key={block.id} className="relative group bg-card border border-border/50 rounded-2xl p-4 shadow-sm animate-fade-up">
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" className="h-6 w-6 rounded-md" onClick={() => moveBlock(index, 'up')} disabled={index === 0}>
                              <ArrowUp className="w-3 h-3" />
                            </Button>
                            <Button size="icon" variant="secondary" className="h-6 w-6 rounded-md" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}>
                              <ArrowDown className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="mt-1">
                              <GripVertical className="w-4 h-4 text-muted-foreground/50" />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="uppercase text-[10px] tracking-widest font-bold">
                                  {block.type} Block
                                </Badge>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removeBlock(block.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>

                              {block.type === "text" && (
                                <textarea 
                                  className="w-full min-h-[100px] p-3 rounded-xl border border-border/50 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-forest/20"
                                  placeholder="Enter your content here..."
                                  value={block.content}
                                  onChange={(e) => updateBlock(block.id, "content", e.target.value)}
                                />
                              )}

                              {(block.type === "photo" || block.type === "video") && (
                                <div className="grid gap-3">
                                  <Input 
                                    placeholder={block.type === "photo" ? "Image URL" : "Video URL (YouTube/Vimeo)"} 
                                    value={block.url}
                                    onChange={(e) => updateBlock(block.id, "url", e.target.value)}
                                    className="rounded-xl"
                                  />
                                  <Input 
                                    placeholder={block.type === "photo" ? "Caption (Optional)" : "Video Title"} 
                                    value={block.type === "photo" ? block.caption : block.title}
                                    onChange={(e) => updateBlock(block.id, block.type === "photo" ? "caption" : "title", e.target.value)}
                                    className="rounded-xl"
                                  />
                                </div>
                              )}

                              {block.type === "news" && (
                                <div className="grid gap-3">
                                  <Input 
                                    placeholder="Update Title" 
                                    value={block.title}
                                    onChange={(e) => updateBlock(block.id, "title", e.target.value)}
                                    className="rounded-xl"
                                  />
                                  <textarea 
                                    className="w-full min-h-[80px] p-3 rounded-xl border border-border/50 bg-background resize-none"
                                    placeholder="Short excerpt..."
                                    value={block.excerpt}
                                    onChange={(e) => updateBlock(block.id, "excerpt", e.target.value)}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 gap-3">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl">Cancel</Button>
                <Button onClick={handleSave} className="bg-forest hover:bg-forest/90 text-white rounded-xl px-8">
                  {editingNL ? "Update Newsletter" : "Publish Newsletter"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display">{newsletters.length}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Newsletters</div>
          </div>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display">
              {newsletters.reduce((acc, curr) => acc + curr.views, 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Reads</div>
          </div>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-sky/10 flex items-center justify-center text-sky">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-display">5,240</div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Subscribers</div>
          </div>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search newsletters..." className="pl-10 h-11 rounded-xl bg-background/50 border-border/50" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl h-11 border-border/50 gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/50">
              <TableHead className="font-bold pl-6">Newsletter Title</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold text-center">Blocks</TableHead>
              <TableHead className="font-bold text-center">Views</TableHead>
              <TableHead className="text-right pr-6 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsletters.map((nl) => (
              <TableRow key={nl.id} className="border-border/50 group hover:bg-muted/10 transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest font-bold border border-forest/10">
                      <FileText className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <div className="font-bold text-base">{nl.title}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">By {nl.author}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`font-bold text-[9px] uppercase tracking-widest px-3 ${nl.status === 'Published' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}>
                    {nl.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                   {nl.date}
                </TableCell>
                <TableCell className="text-center">
                   <Badge variant="outline" className="text-[10px]">{nl.blocksCount} blocks</Badge>
                </TableCell>
                <TableCell className="text-center font-bold text-muted-foreground">
                   {nl.views.toLocaleString()}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-forest/10 hover:text-forest" onClick={() => handleEdit(nl)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-muted"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(nl.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
