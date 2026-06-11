import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Plus, Edit, Trash2, GripVertical, Video, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { toast } from "sonner";
import { Label } from "../ui/label";

export function HeroSliderManager() {
  const [sliders, setSliders] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<any>(null);
  const [formData, setFormData] = useState({
    badgeText: "OMS ORIGINAL CINEMA",
    title: "Cinema Hub",
    description: "",
    primaryButtonText: "PLAY FEATURED",
    primaryButtonLink: "",
    secondaryButtonText: "WATCH TRAILER",
    secondaryButtonLink: "",
    backgroundVideoUrl: "",
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await fetch("https://movie-backend-drab.vercel.app/api/hero-sliders/admin");
      const data = await res.json();
      if (data.success) {
        setSliders(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenDialog = (slider: any = null) => {
    if (slider) {
      setEditingSlider(slider);
      setFormData(slider);
    } else {
      setEditingSlider(null);
      setFormData({
        badgeText: "OMS ORIGINAL CINEMA",
        title: "",
        description: "",
        primaryButtonText: "PLAY FEATURED",
        primaryButtonLink: "",
        secondaryButtonText: "WATCH TRAILER",
        secondaryButtonLink: "",
        backgroundVideoUrl: "",
        order: sliders.length,
        isActive: true
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSlider
        ? `https://movie-backend-drab.vercel.app/api/hero-sliders/${editingSlider._id}`
        : "https://movie-backend-drab.vercel.app/api/hero-sliders";
      const method = editingSlider ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingSlider ? "Slider updated" : "Slider created");
        setIsDialogOpen(false);
        fetchSliders();
      } else {
        toast.error("Failed to save slider");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slider?")) return;
    try {
      const res = await fetch(`https://movie-backend-drab.vercel.app/api/hero-sliders/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setSliders(sliders.filter(s => s._id !== id));
        toast.success("Slider deleted");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`https://movie-backend-drab.vercel.app/api/hero-sliders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) {
        setSliders(sliders.map(s => s._id === id ? { ...s, isActive: !currentStatus } : s));
        toast.success("Status updated");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-display">Hero Sliders</h2>
          <p className="text-sm text-muted-foreground">Manage the landing page background videos and texts</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-forest">
          <Plus className="w-4 h-4 mr-2" /> Add Slide
        </Button>
      </div>

      <div className="grid gap-4">
        {sliders.length === 0 ? (
          <div className="p-8 text-center bg-muted/20 rounded-xl border border-border border-dashed">
            <p className="text-muted-foreground">No slides configured. Default fallback will show.</p>
          </div>
        ) : sliders.map((slide, index) => (
          <Card key={slide._id} className="flex flex-col sm:flex-row gap-4 p-4 items-center bg-card/50">
            <div className="w-full sm:w-48 aspect-video rounded-lg overflow-hidden bg-black relative shrink-0 pointer-events-none">
              <ReactPlayer
                url={slide.backgroundVideoUrl}
                playing={true}
                muted={true}
                loop={true}
                width="100%"
                height="100%"
                style={{ objectFit: 'cover', opacity: 0.5 }}
                playsinline={true}
                config={{ vimeo: { playerOptions: { background: true, muted: true, autoplay: true, playsinline: true, loop: true } } }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Video className="w-6 h-6 text-white/50" />
              </div>
            </div>
            <div className="flex-grow space-y-2 w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded">
                  {slide.badgeText}
                </span>
                {slide.isActive ? (
                  <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                ) : (
                  <span className="text-[10px] uppercase font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">Inactive</span>
                )}
              </div>
              <h3 className="font-display font-bold text-lg">{slide.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{slide.description}</p>
            </div>
            <div className="flex sm:flex-col gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => handleOpenDialog(slide)}>
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => toggleActive(slide._id, slide.isActive)}>
                {slide.isActive ? 'Disable' : 'Enable'}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(slide._id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle>{editingSlider ? "Edit Slide" : "New Slide"}</DialogTitle>
            <DialogDescription className="hidden">Configure the background video, titles, and button links for this hero slider.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Badge Text (e.g. OMS ORIGINAL CINEMA)</Label>
                  <Input
                    value={formData.badgeText}
                    onChange={e => setFormData({ ...formData, badgeText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Background Video URL (Vimeo or MP4)</Label>
                <Input
                  required
                  type="url"
                  placeholder="https://vimeo.com/... or .mp4"
                  value={formData.backgroundVideoUrl}
                  onChange={e => setFormData({ ...formData, backgroundVideoUrl: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Button Text</Label>
                  <Input
                    value={formData.primaryButtonText}
                    onChange={e => setFormData({ ...formData, primaryButtonText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Primary Button Link</Label>
                  <Input
                    placeholder="/films/some-id"
                    value={formData.primaryButtonLink}
                    onChange={e => setFormData({ ...formData, primaryButtonLink: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Secondary Button Text</Label>
                  <Input
                    value={formData.secondaryButtonText}
                    onChange={e => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Button Link</Label>
                  <Input
                    placeholder="/films/trailer"
                    value={formData.secondaryButtonLink}
                    onChange={e => setFormData({ ...formData, secondaryButtonLink: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-forest">
                {editingSlider ? "Save Changes" : "Create Slide"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
