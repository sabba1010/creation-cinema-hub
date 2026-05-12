import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Download, FileText, Layout, Video, GraduationCap, ArrowRight, Mail, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/resources/")({
  component: ResourcesLandingPage,
});

const RESOURCE_TYPES = [
  { id: "all", label: "All" },
  { id: "curriculum", label: "Curriculum" },
  { id: "guides", label: "Study Guides" },
  { id: "media", label: "Media Kits" },
  { id: "promo", label: "Promo Materials" },
];

const RESOURCES = [
  {
    id: "vbs-kit-2026",
    title: "VBS Summer Kit 2026",
    type: "Curriculum",
    desc: "A complete 5-day vacation Bible school program themed around the wonder of creation.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "prayer-study-guide",
    title: "Week of Prayer Study Guide",
    type: "Study Guides",
    desc: "Companion workbook for the annual Week of Prayer event series.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "social-media-bundle",
    title: "Social Media Promo Bundle",
    type: "Media Kits",
    desc: "Ready-to-use graphics and videos for your church's social media channels.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
  },
];

import { useState } from "react";

function ResourcesLandingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredResources = activeCategory === "All" 
    ? RESOURCES 
    : RESOURCES.filter(res => res.type === activeCategory || (activeCategory === "Curriculum" && res.type === "Curriculum")); 
    // Fix: the labels in the types array vs the type in the data object need to match or be mapped.
    // RESOURCE_TYPES label is what we show.
    
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5s
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Resources Hero */}
        <section className="relative py-24 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_left_bottom,var(--gold),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold/80 mb-6 block">Equipping the Saints</span>
            <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight">
              Tools for <span className="italic text-gold">Ministry</span>
            </h1>
            <p className="mt-8 mx-auto max-w-2xl text-lg text-cream/75 leading-relaxed">
              Download curriculum, study guides, and media resources designed to help your family, church, or school encounter the wonder of creation.
            </p>
          </div>
        </section>

        {/* Lead Capture Form Section */}
        <section className="py-20 bg-primary/5">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-[2.5rem] bg-background border border-border p-10 md:p-16 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] transition-all" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-medium text-foreground leading-tight">Get New Resources <span className="italic text-primary">Directly</span></h2>
                  <p className="mt-4 text-muted-foreground text-sm">Join our newsletter to receive the latest VBS kits, study guides, and media resources before anyone else.</p>
                  <ul className="mt-6 space-y-3">
                    {["Monthly free downloads", "Early access to curriculum", "Ministry leader tips"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs font-bold text-foreground/70 uppercase tracking-widest">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {isSubmitted ? (
                  <div className="p-8 rounded-2xl bg-primary/10 border border-primary/20 text-center animate-in zoom-in duration-500">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="font-display text-xl font-bold text-foreground">Welcome to the Library!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Check your inbox soon for your first set of resources.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                      <input required type="text" placeholder="John Miller" className="w-full px-5 py-3 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary/50" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                      <input required type="email" placeholder="john@church.com" className="w-full px-5 py-3 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary/50" />
                    </div>
                    <button type="submit" className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all">
                      Subscribe Now
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Resource Catalog */}
        <section className="py-24 bg-background min-h-[600px]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {RESOURCE_TYPES.map((type) => (
                  <button 
                    key={type.id} 
                    onClick={() => setActiveCategory(type.label)}
                    className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all border ${
                      activeCategory === type.label 
                        ? "bg-primary text-primary-foreground border-primary shadow-lg" 
                        : "bg-transparent text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Showing {filteredResources.length} Resources</p>
            </div>

            {filteredResources.length > 0 ? (
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-500">
                {filteredResources.map((res) => (
                  <div key={res.id} className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden transition-all hover:shadow-xl hover:border-primary/20">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={res.image} alt={res.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-primary shadow-sm">
                          {res.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="font-display text-2xl font-medium text-foreground group-hover:text-primary transition-colors">{res.title}</h3>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-grow">{res.desc}</p>
                      <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                        <Link to={`/resources/${res.id}`} className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                          View Details <ArrowRight className="h-4 w-4" />
                        </Link>
                        <button className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-muted-foreground italic">No resources found in this category.</p>
                <button 
                  onClick={() => setActiveCategory("All")}
                  className="mt-4 text-sm font-bold text-primary uppercase tracking-widest hover:underline"
                >
                  View All Resources
                </button>
              </div>
            )}

            {filteredResources.length > 0 && (
              <div className="mt-20 text-center">
                <button className="rounded-full border border-border px-10 py-4 text-sm font-bold uppercase tracking-widest text-foreground hover:bg-muted transition-all">
                  Load More Resources
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
