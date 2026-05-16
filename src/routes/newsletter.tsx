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
      
      <main className="pt-24 pb-20">
        <div className="container px-4 mx-auto">
          {/* Header Section */}
          <div className="max-w-3xl mb-12 animate-fade-up">
            <Badge className="mb-4 bg-forest/10 text-forest border-forest/20 hover:bg-forest/20 px-3 py-1 rounded-full transition-colors">
              Our Updates
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Monthly <span className="text-forest">Newsletter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stay connected with the latest from One Mustard Seed. From ministry updates to behind-the-scenes glimpses, 
              find it all in our monthly digest.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Area - Latest Newsletter */}
            <div className="lg:col-span-8 space-y-12">
              {selectedNewsletter && (
                <div className="animate-fade-in">
                  {/* Newsletter Template */}
                  <Card className="border-none bg-card shadow-xl rounded-[2.5rem] overflow-hidden">
                    <div className="relative aspect-[21/9] w-full overflow-hidden">
                      <img 
                        src={selectedNewsletter.featuredImage} 
                        alt={selectedNewsletter.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-center gap-3 text-white/80 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium uppercase tracking-wider">{selectedNewsletter.date}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                          {selectedNewsletter.title}
                        </h2>
                      </div>
                    </div>

                    <CardContent className="p-8 md:p-12 space-y-10">
                      {selectedNewsletter.blocks.map((block, index) => (
                        <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                          {block.type === "text" && (
                            <p className="text-lg text-muted-foreground leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-forest first-letter:mr-2">
                              {block.content}
                            </p>
                          )}

                          {block.type === "photo" && (
                            <figure className="space-y-3">
                              <div className="rounded-2xl overflow-hidden shadow-lg group">
                                <img 
                                  src={block.url} 
                                  alt={block.caption || "Newsletter Photo"} 
                                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                              {block.caption && (
                                <figcaption className="text-sm text-center italic text-muted-foreground">
                                  {block.caption}
                                </figcaption>
                              )}
                            </figure>
                          )}

                          {block.type === "news" && (
                            <div className="bg-forest/5 border border-forest/10 rounded-3xl p-8 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-4 opacity-10">
                                <FileText className="w-24 h-24 text-forest" />
                              </div>
                              <div className="relative z-10">
                                <Badge className="mb-4 bg-forest text-white">Ministry Update</Badge>
                                <h3 className="text-2xl font-display font-bold text-foreground mb-3">{block.title}</h3>
                                <p className="text-muted-foreground mb-6">{block.excerpt}</p>
                                {block.link && (
                                  <Button variant="link" className="p-0 h-auto text-forest font-bold group" asChild>
                                    <a href={block.link}>
                                      Read More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}

                          {block.type === "video" && (
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                              <img 
                                src={block.thumbnail} 
                                alt={block.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-transform duration-300 group-hover:scale-110">
                                  <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-6 left-6 text-white">
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Featured Video</p>
                                <h4 className="text-xl font-display font-bold">{block.title}</h4>
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
            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-24 space-y-8">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search archive..." 
                    className="pl-12 h-14 rounded-2xl bg-card border-border/50 shadow-sm focus:ring-forest/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Archive List */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
                  <div className="p-6 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-display font-bold text-lg">
                      <FileText className="w-5 h-5 text-forest" />
                      Newsletter Archive
                    </div>
                  </div>
                  <CardContent className="p-2">
                    <div className="space-y-1">
                      {filteredArchive.length > 0 ? (
                        filteredArchive.map((nl) => (
                          <button
                            key={nl.id}
                            onClick={() => {
                              setSelectedNewsletter(nl);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-forest/5 group ${selectedNewsletter?.id === nl.id ? 'bg-forest/10' : ''}`}
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-border/50">
                              <img src={nl.featuredImage} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-bold truncate transition-colors ${selectedNewsletter?.id === nl.id ? 'text-forest' : 'text-foreground'}`}>
                                {nl.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {nl.date}
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedNewsletter?.id === nl.id ? 'text-forest' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}`} />
                          </button>
                        ))
                      ) : (
                        <div className="p-8 text-center text-muted-foreground italic">
                          No results found for "{searchTerm}"
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Re-subscription Call to Action */}
                <div className="bg-gradient-forest rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-glow">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold mb-3">Don't Miss an Update</h3>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      Join 5,000+ others who receive our monthly newsletter directly in their inbox.
                    </p>
                    <div className="space-y-3">
                      <Input 
                        placeholder="your@email.com" 
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-xl"
                      />
                      <Button className="w-full bg-gold hover:bg-gold/90 text-forest font-bold h-12 rounded-xl">
                        Subscribe Now
                      </Button>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-white/5 rounded-full blur-3xl" />
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
