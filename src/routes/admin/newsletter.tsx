import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, FileText, Eye, ArrowUp, ArrowDown, GripVertical, Type, Image as ImageIcon, Video as VideoIcon, X, MessageSquare, CheckCircle, XCircle, Reply } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "sonner";
import Swal from "sweetalert2";

export const Route = createFileRoute("/admin/newsletter")({ component: NewsletterManagement });

const API = "http://localhost:5000";
const CATEGORIES = ["Ministry Update", "Community", "Events", "Kids", "Podcast", "Announcement"];

function getVimeoEmbed(url: string) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}?title=0&byline=0&portrait=0` : url;
}

function NewsletterManagement() {
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", description: "", category: "Ministry Update", date: "", status: "Draft", featuredImage: "" });
  const [featuredFile, setFeaturedFile] = useState<File | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState("");
  const [search, setSearch] = useState("");

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [activeNewsletter, setActiveNewsletter] = useState<any>(null);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  const fetchAll = async () => {
    try {
      const r = await fetch(`${API}/api/newsletter`);
      const d = await r.json();
      setNewsletters(Array.isArray(d) ? d : []);
    } catch { setNewsletters([]); }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const resetEditor = () => {
    setForm({ title: "", description: "", category: "Ministry Update", date: "", status: "Draft", featuredImage: "" });
    setBlocks([]);
    setEditingId(null);
    setFeaturedFile(null);
    setFeaturedPreview("");
  };

  const openNew = () => { resetEditor(); setIsEditorOpen(true); };

  const openEdit = (nl: any) => {
    setEditingId(nl._id);
    setForm({ title: nl.title, description: nl.description, category: nl.category, date: nl.date, status: nl.status, featuredImage: nl.featuredImage || "" });
    // Handle all image types: base64, full http URL, or old /uploads path
    setFeaturedPreview(nl.featuredImage || "");
    setBlocks(nl.blocks || []);
    setIsEditorOpen(true);
  };

  const addBlock = (type: string) => {
    const base: any = { id: Date.now().toString(), type };
    if (type === "text") base.content = "";
    if (type === "photo") { base.url = ""; base.caption = ""; base._file = null; }
    if (type === "video") { base.vimeoUrl = ""; base.videoTitle = ""; base.videoDescription = ""; }
    if (type === "news") { base.title = ""; base.excerpt = ""; base.link = ""; }
    setBlocks(p => [...p, base]);
  };

  const upd = (id: string, field: string, val: any) => setBlocks(p => p.map(b => b.id === id ? { ...b, [field]: val } : b));
  const removeBlock = (id: string) => setBlocks(p => p.filter(b => b.id !== id));
  const moveBlock = (i: number, dir: "up" | "down") => {
    const arr = [...blocks];
    const t = dir === "up" ? i - 1 : i + 1;
    if (t >= 0 && t < arr.length) { [arr[i], arr[t]] = [arr[t], arr[i]]; setBlocks(arr); }
  };

  const handlePhotoFile = (id: string, file: File) => {
    const url = URL.createObjectURL(file);
    setBlocks(p => p.map(b => b.id === id ? { ...b, _file: file, url } : b));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const uploadBlockImage = async (file: File): Promise<string> => {
    // Return base64 string directly to be stored in MongoDB
    return await fileToBase64(file);
  };

  const handleSave = async () => {
    if (!form.title || !form.date) { toast.error("Title and date are required"); return; }

    const processedBlocks = await Promise.all(blocks.map(async b => {
      if (b.type === "photo" && b._file) {
        const serverUrl = await uploadBlockImage(b._file);
        const { _file, ...rest } = b;
        return { ...rest, url: serverUrl };
      }
      const { _file, ...rest } = b;
      return rest;
    }));

    const payload = { ...form, blocks: processedBlocks };
    if (featuredFile) {
      payload.featuredImage = await fileToBase64(featuredFile);
    }

    const url = editingId ? `${API}/api/newsletter/${editingId}` : `${API}/api/newsletter`;
    const method = editingId ? "PUT" : "POST";

    try {
      // We wrap the payload inside { data: JSON.stringify(payload) } 
      // if the backend still strictly expects req.body.data to be parsed.
      // However, it's safer to send FormData with the data field to keep backend compatibility,
      // OR update backend to handle direct JSON. The backend has: const data = JSON.parse(req.body.data || '{}');
      // So let's send it as a JSON string inside a JSON body? No, backend expects FormData for req.body.data IF multer is used.
      // Wait, if multer is configured `upload.fields(...)`, it can parse FormData. Let's still use FormData but don't send files.
      const fd = new FormData();
      fd.append("data", JSON.stringify(payload));

      const r = await fetch(url, { method, body: fd });
      if (r.ok) {
        toast.success(editingId ? "Newsletter updated!" : "Newsletter created!");
        setIsEditorOpen(false);
        resetEditor();
        fetchAll();
      } else { toast.error("Save failed"); }
    } catch { toast.error("Network error"); }
  };

  const handleDelete = async (id: string) => {
    const res = await Swal.fire({ title: "Delete newsletter?", text: "This cannot be undone.", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", cancelButtonColor: "#2C4A3B", confirmButtonText: "Delete" });
    if (!res.isConfirmed) return;
    await fetch(`${API}/api/newsletter/${id}`, { method: "DELETE" });
    fetchAll();
    toast.success("Deleted");
  };

  const handleUpdateCommentStatus = async (newsletterId: string, commentId: string, status: string, adminReply?: string) => {
    try {
      const payload: any = { status };
      if (adminReply !== undefined) payload.adminReply = adminReply;

      const r = await fetch(`${API}/api/newsletter/${newsletterId}/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (r.ok) {
        const updatedComments = await r.json();
        setActiveNewsletter((prev: any) => ({ ...prev, comments: updatedComments }));
        setNewsletters(prev => prev.map(n => n._id === newsletterId ? { ...n, comments: updatedComments } : n));
        toast.success(`Comment ${status}`);
        if (adminReply !== undefined) {
          setReplyTextMap(p => ({ ...p, [commentId]: "" }));
        }
      }
    } catch {
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (newsletterId: string, commentId: string) => {
    const res = await Swal.fire({
      title: "Delete comment?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#2C4A3B",
      confirmButtonText: "Delete",
      target: document.getElementById("comments-dialog") || document.body
    });
    if (!res.isConfirmed) return;
    try {
      const r = await fetch(`${API}/api/newsletter/${newsletterId}/comments/${commentId}`, { method: "DELETE" });
      if (r.ok) {
        const updatedComments = await r.json();
        setActiveNewsletter((prev: any) => ({ ...prev, comments: updatedComments }));
        setNewsletters(prev => prev.map(n => n._id === newsletterId ? { ...n, comments: updatedComments } : n));
        toast.success("Comment deleted");
      }
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const openComments = (nl: any) => {
    setActiveNewsletter(nl);
    setIsCommentsOpen(true);
  };

  const filtered = newsletters.filter(n => n.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Newsletter Manager</h1>
          <p className="text-muted-foreground">Create rich newsletters with images, videos, and ministry updates.</p>
        </div>
        <Button onClick={openNew} className="bg-forest text-white gap-2 h-11 rounded-xl shadow-md">
          <Plus className="w-4 h-4" /> New Newsletter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total", val: newsletters.length, color: "bg-forest/10 text-forest", icon: FileText },
          { label: "Published", val: newsletters.filter(n => n.status === "Published").length, color: "bg-emerald-500/10 text-emerald-600", icon: FileText },
          { label: "Drafts", val: newsletters.filter(n => n.status === "Draft").length, color: "bg-amber-500/10 text-amber-600", icon: FileText },
          { label: "Total Views", val: newsletters.reduce((acc, nl) => acc + (nl.views || 0), 0), color: "bg-blue-500/10 text-blue-600", icon: Eye },
        ].map(s => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-border/50 bg-card/50 shadow-card p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${s.color}`}><Icon className="w-6 h-6" /></div>
              <div><div className="text-2xl font-bold font-display">{s.val}</div><div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{s.label}</div></div>
            </Card>
          )
        })}
      </div>

      {/* Table */}
      <Card className="border-border/50 bg-card/50 shadow-card overflow-hidden">
        <div className="p-4 border-b border-border/50 flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-10 rounded-xl" />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/50">
              <TableHead className="font-bold pl-6">Title</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold text-center">Views</TableHead>
              <TableHead className="text-right pr-6 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(nl => (
              <TableRow key={nl._id} className="border-border/50 group hover:bg-muted/10">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    {nl.featuredImage ? (
                      <img
                        src={
                          nl.featuredImage.startsWith("data:") || nl.featuredImage.startsWith("http")
                            ? nl.featuredImage
                            : `${API}${nl.featuredImage}`
                        }
                        className="w-10 h-10 rounded-xl object-cover border border-border/30" alt=""
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center"><FileText className="w-5 h-5 text-forest/40" /></div>
                    )}
                    <div>
                      <div className="font-bold">{nl.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{nl.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="outline" className="text-[10px] uppercase tracking-widest">{nl.category}</Badge></TableCell>
                <TableCell>
                  <Badge className={`text-[10px] uppercase tracking-widest ${nl.status === "Published" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}`}>{nl.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {nl.date ? new Date(nl.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                </TableCell>
                <TableCell className="text-center font-bold text-muted-foreground">{nl.views || 0}</TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-forest/10 hover:text-forest relative" onClick={() => openComments(nl)}>
                      <MessageSquare className="w-4 h-4" />
                      {(nl.comments?.filter((c: any) => c.status === 'pending').length > 0) && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-forest/10 hover:text-forest" onClick={() => openEdit(nl)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(nl._id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!loading && filtered.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground italic">No newsletters yet. Click "New Newsletter" to create one.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={o => { if (!o) { setIsEditorOpen(false); resetEditor(); } }}>
        <DialogContent className="sm:max-w-[900px] max-h-[92vh] overflow-y-auto rounded-[2rem] border-border/50 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">{editingId ? "Edit Newsletter" : "Create Newsletter"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Core fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. May 2026: New Horizons in Faith" className="h-11 rounded-xl" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Description / Excerpt *</Label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief summary shown on listing page..." className="w-full min-h-[160px] p-3 rounded-xl border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  placeholder="e.g. Ministry Update, Events, Kids..."
                  list="category-suggestions"
                  className="h-11 rounded-xl"
                />
                <datalist id="category-suggestions">
                  {CATEGORIES.map(c => <option key={c} value={c} />)}
                </datalist>
              </div>
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v }))}>
                  <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <Input type="file" accept="image/*" className="h-11 rounded-xl file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-forest/10 file:text-forest cursor-pointer"
                  onChange={e => { const f = e.target.files?.[0]; if (f) { setFeaturedFile(f); setFeaturedPreview(URL.createObjectURL(f)); } }} />
                {featuredPreview && <img src={featuredPreview} className="h-28 w-full object-cover rounded-xl mt-2 border border-border/30" alt="preview" />}
              </div>
            </div>

            <div className="border-t border-border/50 pt-4">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base font-bold">Content Blocks</Label>
                <div className="flex gap-2 flex-wrap">
                  {[["text", "Text", Type], ["photo", "Image", ImageIcon], ["video", "Video (Vimeo)", VideoIcon], ["news", "News Update", FileText]].map(([t, label, Icon]: any) => (
                    <Button key={t} size="sm" variant="outline" onClick={() => addBlock(t)} className="gap-1.5 rounded-lg text-xs">
                      <Icon className="w-3.5 h-3.5" /> {label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 min-h-[80px] p-4 rounded-2xl bg-muted/20 border border-dashed border-border/50">
                {blocks.length === 0 && <div className="text-center py-6 text-muted-foreground italic text-sm">No blocks yet. Add content above.</div>}
                {blocks.map((block, i) => (
                  <div key={block.id} className="relative group bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="h-6 w-6 rounded-md" onClick={() => moveBlock(i, "up")} disabled={i === 0}><ArrowUp className="w-3 h-3" /></Button>
                      <Button size="icon" variant="secondary" className="h-6 w-6 rounded-md" onClick={() => moveBlock(i, "down")} disabled={i === blocks.length - 1}><ArrowDown className="w-3 h-3" /></Button>
                    </div>
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground/40 mt-1 shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="uppercase text-[9px] tracking-widest font-bold">{block.type} block</Badge>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeBlock(block.id)}><X className="w-4 h-4" /></Button>
                        </div>

                        {block.type === "text" && (
                          <textarea className="w-full min-h-[100px] p-3 rounded-xl border border-input bg-background resize-none text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="Enter your paragraph text here..." value={block.content || ""}
                            onChange={e => upd(block.id, "content", e.target.value)} />
                        )}

                        {block.type === "photo" && (
                          <div className="space-y-2">
                            {/* Show existing saved image as current preview */}
                            {block.url && !block._file && (
                              <div className="space-y-1">
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Current Image (will be kept if no new file chosen)</p>
                                <img
                                  src={block.url.startsWith('data:') || block.url.startsWith('http') ? block.url : `${API}${block.url}`}
                                  className="h-40 w-full object-cover rounded-xl border border-border/30"
                                  alt="current"
                                />
                              </div>
                            )}
                            {/* Show new file preview when a new image is chosen */}
                            {block._file && block.url && (
                              <div className="space-y-1">
                                <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-widest">New image selected ✓</p>
                                <img src={block.url} className="h-40 w-full object-cover rounded-xl border border-emerald-300" alt="new preview" />
                              </div>
                            )}
                            <Input type="file" accept="image/*" className="h-10 rounded-xl file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-forest/10 file:text-forest cursor-pointer"
                              onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoFile(block.id, f); }} />
                            <Input placeholder="Caption (optional)" value={block.caption || ""} onChange={e => upd(block.id, "caption", e.target.value)} className="h-10 rounded-xl" />
                          </div>
                        )}

                        {block.type === "video" && (
                          <div className="space-y-2">
                            <Input placeholder="Vimeo URL — e.g. https://vimeo.com/123456789" value={block.vimeoUrl || ""} onChange={e => upd(block.id, "vimeoUrl", e.target.value)} className="h-10 rounded-xl" />
                            {block.vimeoUrl && (
                              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                                <iframe src={getVimeoEmbed(block.vimeoUrl)} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen title="preview" />
                              </div>
                            )}
                            <Input placeholder="Video Title" value={block.videoTitle || ""} onChange={e => upd(block.id, "videoTitle", e.target.value)} className="h-10 rounded-xl" />
                            <textarea className="w-full min-h-[60px] p-3 rounded-xl border border-input bg-background resize-none text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              placeholder="Additional description below video (optional)" value={block.videoDescription || ""}
                              onChange={e => upd(block.id, "videoDescription", e.target.value)} />
                          </div>
                        )}

                        {block.type === "news" && (
                          <div className="space-y-2">
                            <Input placeholder="Update Title" value={block.title || ""} onChange={e => upd(block.id, "title", e.target.value)} className="h-10 rounded-xl" />
                            <textarea className="w-full min-h-[80px] p-3 rounded-xl border border-input bg-background resize-none text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              placeholder="Short excerpt / description..." value={block.excerpt || ""}
                              onChange={e => upd(block.id, "excerpt", e.target.value)} />
                            <Input placeholder="Link (optional) — e.g. /podcast" value={block.link || ""} onChange={e => upd(block.id, "link", e.target.value)} className="h-10 rounded-xl" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>

          <DialogFooter className="gap-3 mt-4 flex-wrap">
            <Button variant="ghost" onClick={() => { setIsEditorOpen(false); resetEditor(); }} className="rounded-xl">Cancel</Button>
            <Button variant="outline" onClick={() => setIsPreviewOpen(true)} className="gap-2 rounded-xl border-forest/30 text-forest hover:bg-forest/5">
              <Eye className="w-4 h-4" /> Preview
            </Button>
            <Button onClick={handleSave} className="bg-forest text-white rounded-xl px-8">{editingId ? "Update" : "Publish"} Newsletter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[760px] max-h-[90vh] overflow-y-auto rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Blog Post Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-8 py-4">
            {featuredPreview && <img src={featuredPreview} className="w-full h-56 object-cover rounded-2xl" alt="featured" />}
            <div>
              <Badge className="mb-3 bg-forest text-cream text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg">{form.category}</Badge>
              <h2 className="text-3xl font-display font-bold mt-2">{form.title || "Newsletter Title"}</h2>
              <p className="text-muted-foreground mt-2">{form.description}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{form.date}</p>
            </div>
            <hr className="border-border/40" />
            {blocks.map((block, i) => (
              <div key={block.id || i}>
                {block.type === "text" && <p className="text-lg leading-relaxed text-muted-foreground first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-forest first-letter:mr-3 first-letter:float-left">{block.content}</p>}
                {block.type === "photo" && block.url && (
                  <figure className="space-y-2">
                    <img src={block.url} className="w-full rounded-2xl" alt={block.caption} />
                    {block.caption && <figcaption className="text-xs text-center text-muted-foreground italic">— {block.caption}</figcaption>}
                  </figure>
                )}
                {block.type === "video" && block.vimeoUrl && (
                  <div className="space-y-2">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                      <iframe src={getVimeoEmbed(block.vimeoUrl)} className="w-full h-full" frameBorder="0" allowFullScreen title={block.videoTitle} />
                    </div>
                    {block.videoTitle && <p className="font-bold">{block.videoTitle}</p>}
                    {block.videoDescription && <p className="text-sm text-muted-foreground">{block.videoDescription}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Comments Moderation Dialog */}
      <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <DialogContent id="comments-dialog" className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Comment Moderation</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <h3 className="font-bold text-lg">{activeNewsletter?.title}</h3>

            {(!activeNewsletter?.comments || activeNewsletter.comments.length === 0) && (
              <div className="text-center py-12 text-muted-foreground italic">No comments on this newsletter yet.</div>
            )}

            <div className="space-y-4">
              {activeNewsletter?.comments?.map((comment: any) => (
                <div key={comment._id} className="bg-muted/20 border border-border/50 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{comment.user}</span>
                        <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString()}</span>
                        <Badge variant="outline" className={`ml-2 text-[10px] uppercase tracking-widest ${comment.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : comment.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                          {comment.status || 'pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground/80">{comment.text}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {(comment.status === 'pending' || !comment.status || comment.status === 'rejected') && (
                        <Button size="sm" variant="outline" className="h-8 gap-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50" onClick={() => handleUpdateCommentStatus(activeNewsletter._id, comment._id, 'approved')}>
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </Button>
                      )}
                      {(comment.status === 'pending' || !comment.status || comment.status === 'approved') && (
                        <Button size="sm" variant="outline" className="h-8 gap-1 border-amber-200 text-amber-700 hover:bg-amber-50" onClick={() => handleUpdateCommentStatus(activeNewsletter._id, comment._id, 'rejected')}>
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-red-200 text-red-700 hover:bg-red-50" onClick={() => handleDeleteComment(activeNewsletter._id, comment._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {comment.adminReply ? (
                    <div className="bg-forest/5 border-l-2 border-forest p-3 rounded-r-xl">
                      <div className="text-xs font-bold text-forest uppercase tracking-widest mb-1">Admin Reply</div>
                      <p className="text-sm">{comment.adminReply}</p>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center pt-2 border-t border-border/40">
                      <Input
                        placeholder="Write a reply..."
                        value={replyTextMap[comment._id] || ""}
                        onChange={e => setReplyTextMap(p => ({ ...p, [comment._id]: e.target.value }))}
                        className="h-9 text-sm"
                      />
                      <Button size="sm" onClick={() => handleUpdateCommentStatus(activeNewsletter._id, comment._id, comment.status || 'approved', replyTextMap[comment._id])} disabled={!replyTextMap[comment._id]?.trim()} className="h-9 gap-1 bg-forest text-white">
                        <Reply className="w-3.5 h-3.5" /> Reply
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
