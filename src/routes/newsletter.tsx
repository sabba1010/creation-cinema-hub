import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useState } from "react";
import { 
  Calendar, 
  ChevronRight, 
  Play, 
  FileText, 
  ArrowRight,
  Search,
  Archive,
  Clock
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";

export const Route = createFileRoute("/newsletter")({
  component: NewsletterPage,
});

// Reusable Newsletter Block Types
type Block = 
  | { type: "text"; content: string }
  | { type: "photo"; url: string; caption?: string }
  | { type: "video"; url: string; title: string; thumbnail: string }
  | { type: "news"; title: string; excerpt: string; link?: string };

interface Newsletter {
  id: string;
  title: string;
  date: string;
  month: string;
  year: string;
  description: string;
  blocks: Block[];
  featuredImage: string;
}

const NEWSLETTERS: Newsletter[] = [
  {
    id: "1",
    title: "May 2026: New Horizons in Faith Media",
    date: "May 15, 2026",
    month: "May",
    year: "2026",
    description: "This month we explore how digital storytelling is shaping the next generation of believers.",
    featuredImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80",
    blocks: [
      { type: "text", content: "Welcome to our May update! We've been busy filming new content for KidsBibleFlix and preparing for our summer events." },
      { type: "photo", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", caption: "Behind the scenes of our latest production." },
      { type: "news", title: "Ministry Update: 500 New Schools Enrolled", excerpt: "Our faith-centered curriculum has reached a new milestone this month.", link: "/resources" },
      { type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Summer Camp Teaser", thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80" },
    ]
  },
  {
    id: "2",
    title: "April 2026: The Power of Community",
    date: "April 10, 2026",
    month: "April",
    year: "2026",
    description: "Reflecting on our community growth and the impact of our podcast series.",
    featuredImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    blocks: [
      { type: "text", content: "Community is at the heart of everything we do. This month, we've seen incredible engagement on our forums." },
      { type: "news", title: "Podcast Milestone", excerpt: "Season 3 of 'Faithful Echoes' has surpassed 10k listeners!", link: "/podcast" },
    ]
  },
  {
    id: "3",
    title: "March 2026: Springing Forward",
    date: "March 05, 2026",
    month: "March",
    year: "2026",
    description: "New project announcements and a sneak peek into our upcoming films.",
    featuredImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    blocks: [
      { type: "text", content: "Spring is here, and with it comes a fresh wave of creativity at OMS." },
    ]
  }
];

function NewsletterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(NEWSLETTERS[0]);

  const latestNewsletter = NEWSLETTERS[0];
  const archivedNewsletters = NEWSLETTERS.slice(1);

  const filteredArchive = archivedNewsletters.filter(nl => 
    nl.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nl.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nl.year.includes(searchTerm)
  );

  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />
      
      <main className="pb-20">
        {/* Cinematic Header Section */}
        <section className="pt-32 pb-24 bg-forest-deep text-cream relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(circle_at_center,var(--color-gold),transparent_70%)]" />
            <div className="absolute bottom-0 left-0 w-[40%] h-full bg-[radial-gradient(circle_at_center,var(--color-sky),transparent_70%)]" />
          </div>
          
          <div className="container px-6 mx-auto relative z-10 text-center lg:text-left">
            <div className="max-w-3xl animate-fade-up">
              <Badge className="mb-6 bg-gold/10 text-gold border-gold/20 hover:bg-gold/20 px-4 py-1.5 rounded-full transition-all tracking-[0.2em] uppercase text-[10px] font-black">
                Our Updates
              </Badge>
              <h1 className="text-5xl md:text-8xl font-display font-medium text-cream mb-8 leading-[0.9] tracking-tighter">
                Monthly <span className="italic text-gold block sm:inline">Newsletter</span>
              </h1>
              <p className="text-xl text-cream/70 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                Immersive storytelling, ministry milestones, and behind-the-scenes glimpses from the heart of One Mustard Seed.
              </p>
            </div>
          </div>
          
          {/* Elegant Wave Transition */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[40px] sm:h-[60px] lg:h-[80px] w-full" style={{ transform: "rotate(180deg)" }}>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="var(--color-background)"></path>
            </svg>
          </div>
        </section>

        <div className="container px-6 mx-auto pt-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Area - Latest Newsletter */}
            <div className="lg:col-span-8 space-y-12">
              {selectedNewsletter && (
                <div className="animate-fade-in">
                  {/* Newsletter Template */}
                  <Card className="border-none bg-card shadow-elevated rounded-[3rem] overflow-hidden group/card transition-all duration-500 hover:shadow-2xl">
                    <div className="relative aspect-[16/8] w-full overflow-hidden">
                      <img 
                        src={selectedNewsletter.featuredImage} 
                        alt={selectedNewsletter.title}
                        className="object-cover w-full h-full transition-transform duration-[3000ms] group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/20 to-transparent" />
                      <div className="absolute bottom-10 left-10 right-10">
                        <div className="flex items-center gap-3 text-gold/80 mb-3">
                          <div className="h-px w-8 bg-gold/40" />
                          <Calendar className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{selectedNewsletter.date}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-medium text-cream leading-tight">
                          {selectedNewsletter.title}
                        </h2>
                      </div>
                    </div>

                    <CardContent className="p-10 md:p-20 space-y-16">
                      {selectedNewsletter.blocks.map((block, index) => (
                        <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                          {block.type === "text" && (
                            <p className="text-xl text-muted-foreground/90 leading-relaxed font-light first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:text-forest first-letter:mr-4 first-letter:float-left first-letter:mt-1">
                              {block.content}
                            </p>
                          )}

                          {block.type === "photo" && (
                            <figure className="space-y-4">
                              <div className="rounded-[2rem] overflow-hidden shadow-2xl group/img relative">
                                <img 
                                  src={block.url} 
                                  alt={block.caption || "Newsletter Photo"} 
                                  className="w-full h-auto transition-transform duration-700 group-hover/img:scale-110"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]" />
                              </div>
                              {block.caption && (
                                <figcaption className="text-xs text-center font-bold uppercase tracking-[0.2em] text-muted-foreground/60 italic">
                                  — {block.caption}
                                </figcaption>
                              )}
                            </figure>
                          )}

                          {block.type === "news" && (
                            <div className="bg-forest/5 border border-forest/10 rounded-[2.5rem] p-10 relative overflow-hidden group/news transition-all hover:bg-forest/10 hover:border-forest/20">
                              <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform group-hover/news:scale-110 group-hover/news:rotate-6">
                                <FileText className="w-32 h-32 text-forest" />
                              </div>
                              <div className="relative z-10">
                                <Badge className="mb-6 bg-forest text-cream px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border-none">Ministry Update</Badge>
                                <h3 className="text-3xl font-display font-medium text-foreground mb-4">{block.title}</h3>
                                <p className="text-lg text-muted-foreground/80 mb-8 max-w-xl">{block.excerpt}</p>
                                {block.link && (
                                  <Button variant="link" className="p-0 h-auto text-forest font-bold group/btn text-sm uppercase tracking-widest" asChild>
                                    <a href={block.link}>
                                      Read More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}

                          {block.type === "video" && (
                            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-glow group/vid cursor-pointer">
                              <img 
                                src={block.thumbnail} 
                                alt={block.title} 
                                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover/vid:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-gold/90 text-forest-deep rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-gold">
                                  <Play className="w-10 h-10 fill-current ml-1" />
                                </div>
                              </div>
                              <div className="absolute bottom-10 left-10 text-white">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-2">Featured Experience</p>
                                <h4 className="text-2xl font-display font-medium">{block.title}</h4>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Sidebar - Archive & Search */}
            <aside className="lg:col-span-4 space-y-10">
              <div className="sticky top-28 space-y-10">
                {/* Search */}
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-forest" />
                  <Input 
                    placeholder="Search archive..." 
                    className="pl-14 h-16 rounded-[1.5rem] bg-card border-border/50 shadow-sm focus:ring-forest/20 text-sm font-medium transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Archive List */}
                <Card className="border-border/40 bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-border/40 flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-3 font-display font-medium text-xl">
                      <Archive className="w-5 h-5 text-gold" />
                      Newsletter <span className="italic">Archive</span>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      {filteredArchive.length > 0 ? (
                        filteredArchive.map((nl) => (
                          <button
                            key={nl.id}
                            onClick={() => {
                              setSelectedNewsletter(nl);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-full text-left p-5 rounded-2xl flex items-center gap-5 transition-all hover:bg-forest/5 group ${selectedNewsletter?.id === nl.id ? 'bg-forest/10 shadow-inner' : ''}`}
                          >
                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-border/40 group-hover:border-forest/20 transition-colors shadow-sm">
                              <img src={nl.featuredImage} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-bold text-sm truncate transition-colors ${selectedNewsletter?.id === nl.id ? 'text-forest' : 'text-foreground group-hover:text-forest'}`}>
                                {nl.title}
                              </h4>
                              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mt-1">
                                <Calendar className="w-3 h-3" />
                                {nl.date}
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-all duration-300 ${selectedNewsletter?.id === nl.id ? 'text-forest translate-x-1' : 'text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                          </button>
                        ))
                      ) : (
                        <div className="p-12 text-center text-muted-foreground italic text-sm">
                          No results found for "{searchTerm}"
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Re-subscription Call to Action */}
                <div className="bg-forest-deep rounded-[3rem] p-10 text-cream relative overflow-hidden shadow-elevated group/sub border border-white/5">
                  <div className="relative z-10">
                    <Badge className="mb-6 bg-gold/20 text-gold border-gold/30 px-3 py-1 text-[8px] font-black tracking-[0.3em] uppercase rounded-full">Subscribe</Badge>
                    <h3 className="text-3xl font-display font-medium mb-4 leading-tight">Don't Miss an <span className="italic text-gold">Update</span></h3>
                    <p className="text-cream/60 text-sm mb-10 leading-relaxed font-light">
                      Join 5,000+ others who receive our monthly newsletter directly in their inbox.
                    </p>
                    <div className="space-y-4">
                      <div className="relative">
                        <Input 
                          placeholder="your@email.com" 
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14 rounded-2xl focus:border-gold/50 focus:bg-white/10 transition-all pl-5"
                        />
                      </div>
                      <Button className="w-full bg-gold hover:bg-gold/90 text-forest-deep font-bold h-14 rounded-2xl shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs">
                        Subscribe Now
                      </Button>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-gold/10 rounded-full blur-[100px] transition-transform duration-1000 group-hover/sub:scale-125" />
                  <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-white/5 rounded-full blur-[80px]" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
