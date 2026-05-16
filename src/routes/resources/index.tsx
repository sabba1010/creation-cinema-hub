import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Download, FileText, ArrowRight, CheckCircle2, Search, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";
import { Card } from "../../components/ui/card";

export const Route = createFileRoute("/resources/")({
  component: ResourcesLandingPage,
});

const RESOURCE_TYPES = ["All", "Curriculum", "Study Guides", "Media Kits", "Coloring Sheets"];

const INITIAL_RESOURCES = [
  {
    id: "vbs-free-sampler",
    title: "VBS 2026 Sample Kit",
    type: "Curriculum",
    desc: "A free 1-day sample of our upcoming 'Seed of Wonder' vacation Bible school curriculum.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800",
    isFree: true
  },
  {
    id: "prayer-guide-free",
    title: "Guided Prayer Journal",
    type: "Study Guides",
    desc: "A downloadable PDF journal with 7 days of guided prayer focused on the beauty of creation.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    isFree: true
  },
  {
    id: "ministry-promo-kit",
    title: "Creation Hub Media Kit",
    type: "Media Kits",
    desc: "Free social media graphics and church bulletin inserts for promoting OMS content.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
    isFree: true
  },
  {
    id: "nature-coloring-vol1",
    title: "Nature Wonders Coloring Vol. 1",
    type: "Coloring Sheets",
    desc: "10 high-quality coloring pages featuring animals and landscapes from our film series.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    isFree: true
  },
];

function ResourcesLandingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredResources = useMemo(() => {
    return INITIAL_RESOURCES.filter(res => {
      const matchesCategory = activeCategory === "All" || res.type === activeCategory;
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            res.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success("Welcome to the Library! Check your inbox.");
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleDownload = (title: string) => {
    toast.info(`Preparing ${title} for download...`);
  };

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Resources Hero */}
        <section className="relative py-24 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_left_bottom,var(--gold),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center space-y-6">
            <Badge className="bg-gold text-forest-deep font-bold border-none px-4 py-1.5 uppercase tracking-widest text-[10px]">Free Resources</Badge>
            <h1 className="font-display text-6xl sm:text-7xl font-bold tracking-tight">
              The <span className="italic text-gold">Learning</span> Library
            </h1>
            <p className="mt-8 mx-auto max-w-2xl text-lg text-cream/70 leading-relaxed text-pretty">
              Equip your family or ministry with these free downloadable tools, curriculum samples, and study guides curated by the One Mustard Seed team.
            </p>
          </div>
        </section>

        {/* Search & Lead Capture */}
        <section className="py-20 -mt-10 relative z-10">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-8 items-start">
            
            <Card className="p-8 rounded-[2.5rem] bg-white shadow-xl border-cream/10 space-y-8">
               <div className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-forest-deep">Search Library</h3>
                  <div className="relative">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-deep/30" />
                     <Input 
                        placeholder="Search resources..." 
                        className="pl-11 h-12 rounded-xl bg-cream/20 border-transparent focus:bg-white transition-all"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-forest-deep/40">Resource Type</h4>
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
            </Card>

            <Card className="lg:col-span-2 p-8 sm:p-10 rounded-[2.5rem] bg-gold text-forest-deep shadow-xl border-none relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Sparkles className="w-48 h-48" />
               </div>
               <div className="relative z-10 grid sm:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                     <h2 className="text-3xl font-display font-bold leading-tight">Get New Resources <span className="italic">Instantly</span></h2>
                     <p className="text-forest-deep/70 text-sm">Sign up to receive immediate notifications when we release new free curriculum and media kits.</p>
                  </div>
                  
                  {isSubmitted ? (
                    <div className="p-6 rounded-2xl bg-forest-deep text-cream text-center animate-in zoom-in duration-500">
                       <CheckCircle2 className="mx-auto h-8 w-8 text-gold mb-2" />
                       <p className="font-bold text-sm">Access Granted!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                       <Input required type="email" placeholder="Email Address" className="h-12 rounded-xl bg-white/20 border-forest-deep/10 placeholder:text-forest-deep/40 text-forest-deep" />
                       <Button type="submit" className="w-full h-12 rounded-xl bg-forest-deep text-white font-bold text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95">
                          Join the Library
                       </Button>
                    </form>
                  )}
               </div>
            </Card>
          </div>
        </section>

        {/* Free Content Catalog */}
        <section className="pb-32 pt-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-display font-bold text-forest-deep">Free <span className="italic text-primary">Downloads</span> <span className="text-forest-deep/30 font-sans text-lg">({filteredResources.length})</span></h3>
            </div>

            {filteredResources.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((res) => (
                  <div 
                    key={res.id} 
                    className="group flex flex-col rounded-[2.5rem] border border-cream/10 bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={res.image} alt={res.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-emerald-500 text-white font-bold border-none text-[9px] px-3 py-1 uppercase tracking-widest flex items-center gap-1.5">
                           <CheckCircle2 className="w-3 h-3" /> Free Resource
                        </Badge>
                      </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">{res.type}</span>
                        <h3 className="font-display text-2xl font-bold text-forest-deep group-hover:text-gold transition-colors">{res.title}</h3>
                      </div>
                      <p className="text-sm text-forest-deep/50 leading-relaxed line-clamp-3 flex-grow">{res.desc}</p>
                      
                      <div className="pt-6 border-t border-cream/10 flex items-center justify-between">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-forest-deep/30 flex items-center gap-2 group-hover:text-forest-deep transition-colors">
                           Available Now <ArrowRight className="h-3 w-3" />
                        </div>
                        <Button 
                          size="sm"
                          className="rounded-full bg-forest-deep hover:bg-gold hover:text-forest-deep transition-all gap-2 px-5"
                          onClick={() => handleDownload(res.title)}
                        >
                          <Download className="h-3.5 w-3.5" /> Download
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
      </main>
      <SiteFooter />
    </div>
  );
}
