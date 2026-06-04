import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Download, FileText, ArrowRight, CheckCircle2, Search, Sparkles, Phone, User, Mail, Link as LinkIcon } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";
import { Card } from "../../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";

export const Route = createFileRoute("/resources/")({
  component: ResourcesLandingPage,
});

const RESOURCE_TYPES = ["All", "Parents", "Teachers", "Pastors", "Youth Leaders", "General"];
const API = "https://movie-backend-drab.vercel.app";

function ResourcesLandingPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Lead Capture Modal State
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [successLink, setSuccessLink] = useState("");

  useEffect(() => {
    fetch(`${API}/api/resources`)
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(err => console.error("Failed to fetch resources:", err));
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesCategory = activeCategory === "All" || res.category === activeCategory;
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, resources]);

  const handleDownloadClick = (resource: any) => {
    setSelectedResource(resource);
    setSuccessLink("");
    setFormData({ name: "", email: "", phone: "" });
    setIsModalOpen(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Unlocking your resource...");
    try {
      const res = await fetch(`${API}/api/resources/download/${selectedResource._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        toast.dismiss();
        toast.success("Success! Your resource is ready.");
        setSuccessLink(data.fileUrl);
        // Optional: automatically trigger download or open in new tab
        // window.open(data.fileUrl, '_blank');
      } else {
        toast.dismiss();
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTriggerDownload = () => {
    if (successLink.startsWith('data:')) {
      const a = document.createElement("a");
      a.href = successLink;
      a.download = `${selectedResource?.title || 'resource'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.location.href = successLink;
    }
  };

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Resources Hero with Blurred Background Image */}
        <section className="relative py-32 overflow-hidden bg-forest-deep text-cream">
          {/* Blurred Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200"
              alt="Blurred background"
              className="w-full h-full object-cover blur-lg scale-110 opacity-30 select-none pointer-events-none"
            />
            {/* Dark vignette overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-forest-deep/60 to-forest-deep" />
            <div className="absolute inset-0 bg-radial-gradient(circle_at_center, transparent_20%, rgba(0,0,0,0.4)_100%)" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 text-center space-y-6 z-10">
            <Badge className="bg-gold text-forest-deep font-bold border-none px-4 py-1.5 uppercase tracking-widest text-[10px]">Free Resources</Badge>
            <h1 className="font-display text-6xl sm:text-7xl font-bold tracking-tight">
              The <span className="italic text-gold">Learning</span> Library
            </h1>
            <p className="mt-8 mx-auto max-w-2xl text-lg text-cream/80 leading-relaxed text-pretty">
              Equip your family or ministry with these free downloadable tools, curriculum samples, and study guides curated by the One Mustard Seed team.
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="pt-20 pb-8 -mt-10 relative z-10">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-8 items-start">

            <Card className="p-8 rounded-[2.5rem] bg-white shadow-xl border-cream/10 space-y-8 lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-forest-deep">Search Library</h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-deep/30" />
                    <Input
                      placeholder="Search by title or keyword..."
                      className="pl-11 h-12 rounded-xl bg-cream/20 border-transparent focus:bg-white transition-all"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-deep/40">Filter by Audience</h4>
                  <div className="flex flex-wrap gap-2">
                    {RESOURCE_TYPES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? "bg-forest-deep text-white shadow-lg" : "bg-cream/50 text-forest-deep/50 hover:bg-cream"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Free Content Catalog */}
        <section className="pb-10 pt-2">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-display font-bold text-forest-deep">Free <span className="italic text-primary">Downloads</span> <span className="text-forest-deep/30 font-sans text-lg">({filteredResources.length})</span></h3>
            </div>

            {filteredResources.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((res) => (
                  <div
                    key={res._id}
                    className="group flex flex-col rounded-[2.5rem] border border-cream/10 bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  >
                    <div className="relative aspect-video overflow-hidden bg-forest/5 flex items-center justify-center">
                      {res.featuredImage ? (
                        <img src={res.featuredImage} alt={res.title} className={`w-full h-full object-cover transition-transform duration-1000 ${res.isActive !== false ? 'group-hover:scale-110' : 'opacity-50 grayscale'}`} />
                      ) : (
                        <FileText className={`w-16 h-16 text-forest/20 ${res.isActive === false ? 'opacity-50 grayscale' : ''}`} />
                      )}
                      {res.isActive === false && (
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                          <Badge variant="secondary" className="bg-white text-forest-deep font-bold border-none shadow-sm">Not Available</Badge>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-emerald-500 text-white font-bold border-none text-[9px] px-3 py-1 uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3" /> Free
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">{res.category}</span>
                        <h3 className="font-display text-2xl font-bold text-forest-deep group-hover:text-gold transition-colors">{res.title}</h3>
                      </div>
                      <p className="text-sm text-forest-deep/50 leading-relaxed line-clamp-3 flex-grow">{res.description}</p>

                      <div className="pt-6 border-t border-cream/10 flex items-center justify-between">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-forest-deep/30 flex items-center gap-2 group-hover:text-forest-deep transition-colors">
                          {res.isActive === false ? "Currently Unavailable" : <><span className="hidden sm:inline">Available Now</span> <ArrowRight className="h-3 w-3" /></>}
                        </div>
                        <Button
                          size="sm"
                          disabled={res.isActive === false}
                          className="rounded-full bg-forest-deep hover:bg-gold hover:text-forest-deep transition-all gap-2 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleDownloadClick(res)}
                        >
                          <Download className="h-3.5 w-3.5" /> {res.isActive === false ? "Unavailable" : "Download"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center space-y-6">
                <div className="p-6 bg-cream/30 rounded-full w-fit mx-auto">
                  <Search className="h-12 w-12 text-forest-deep/20" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-forest-deep">No results</h4>
                  <p className="text-muted-foreground text-sm">Try another search term or category.</p>
                </div>
                <Button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} variant="outline" className="rounded-xl">Reset Filters</Button>
              </div>
            )}
          </div>
        </section>

        {/* Importance of Quality Materials Text Section */}
        <section className="pb-32 pt-8 bg-[#FAF7EE]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="bg-white rounded-[3rem] p-10 sm:p-16 border border-[#EFECE3] shadow-sm grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
              <div className="space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Our Educational Philosophy</span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-forest-deep tracking-tight">
                  Why <span className="italic text-gold font-medium">Quality Media</span> Matters for Kids
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  In a world saturated with low-effort digital noise, we believe children and families deserve materials crafted with excellence. High-quality media is more than just screen entertainment—it shapes worldview, captivates imagination, and acts as a bridge for conversations between parents and children.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Every printable card, discussion guide, and curriculum package in our library is designed by professionals, vetted by theologians, and tested in active ministry environments. We do not compromise on illustrations, typography, or theological rigor, because we know that the seeds planted in young hearts require rich, nutritious soil to flourish.
                </p>
              </div>
              <div className="bg-[#FAF7EE] rounded-[2.5rem] p-8 border border-[#EFECE3] space-y-6">
                <h4 className="font-display font-bold text-lg text-forest-deep">Our Three Quality Pillars</h4>
                <div className="space-y-4">
                  {[
                    { title: "Theological Integrity", desc: "No watering down. We anchor every message in the historical truths of scripture." },
                    { title: "Aesthetic Excellence", desc: "Vibrant illustrations and clean layouts that command respect and spark creativity." },
                    { title: "Relational Design", desc: "Every sheet contains interactive prompts to facilitate authentic face-to-face family bonding." }
                  ].map((pillar, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="h-8 w-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 font-bold text-sm">
                        0{index + 1}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-forest-deep">{pillar.title}</h5>
                        <p className="text-muted-foreground text-xs leading-relaxed mt-0.5">{pillar.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* Lead Capture Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] bg-white border-none shadow-2xl">
          <DialogHeader className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center mb-2">
              <Download className="w-6 h-6 text-forest" />
            </div>
            <DialogTitle className="text-2xl font-display text-forest-deep">
              {successLink ? "Resource Ready!" : "Unlock this Resource"}
            </DialogTitle>
            <DialogDescription className="text-forest-deep/60">
              {successLink
                ? "Your download is ready. We've also sent a copy to your email."
                : `Enter your details to get instant access to "${selectedResource?.title}".`}
            </DialogDescription>
          </DialogHeader>

          {successLink ? (
            <div className="py-6 space-y-4">
              <Button onClick={handleTriggerDownload} className="w-full bg-gold hover:bg-gold/90 text-forest-deep h-14 rounded-xl text-base font-bold shadow-lg flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" /> Download Now
              </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="w-full">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-forest-deep/60">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-deep/40" />
                    <Input
                      required
                      className="pl-10 h-12 rounded-xl border-forest/20 focus-visible:ring-forest bg-forest/5"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-forest-deep/60">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-deep/40" />
                    <Input
                      required
                      type="email"
                      className="pl-10 h-12 rounded-xl border-forest/20 focus-visible:ring-forest bg-forest/5"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-forest-deep/60">Phone Number (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-deep/40" />
                    <Input
                      type="tel"
                      className="pl-10 h-12 rounded-xl border-forest/20 focus-visible:ring-forest bg-forest/5"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-forest-deep hover:bg-forest h-14 rounded-xl text-white font-bold text-sm tracking-widest uppercase shadow-xl"
              >
                {isSubmitting ? "Unlocking..." : "Get Free Access"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
