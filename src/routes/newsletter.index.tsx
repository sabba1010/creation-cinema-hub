import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useState, useEffect } from "react";
import {
  Calendar, Search, Archive, ArrowRight, FileText, Play, ExternalLink
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import logoImg from "@/assets/logo2/image9.png";

export const Route = createFileRoute("/newsletter/")({
  component: NewsletterPage,
});

const API = "https://movie-backend-drab.vercel.app";

function getVimeoEmbed(url: string) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}?title=0&byline=0&portrait=0` : url;
}

function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`${API}/api/newsletter`)
      .then(r => r.json())
      .then(data => {
        const pub = (Array.isArray(data) ? data : []).filter((n: any) => n.status === "Published");
        setNewsletters(pub);
        if (pub.length > 0) setSelected(pub[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = newsletters.filter(nl =>
    nl.title?.toLowerCase().includes(search.toLowerCase()) ||
    nl.date?.includes(search)
  ).slice(0, 8);

  const imgSrc = (url: string) => {
    if (!url) return "";
    if (url.startsWith("data:")) return url;         // base64
    if (url.startsWith("http")) return url;           // full URL
    return `${API}${url}`;                            // /uploads/... path
  };

  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />

      {/* Cinematic Hero */}
      <section className="min-h-[650px] flex flex-col justify-end bg-[#050704] text-cream relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-50 scale-105">
            <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050704]/40 via-transparent to-[#050704]/90" />
        </div>
        <div className="container px-6 mx-auto relative z-10 pt-36 pb-24">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-gold/10 backdrop-blur border border-gold/20 px-3.5 py-1.5 rounded-full animate-fade-in mb-6">
              <FileText className="h-4 w-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold"> OMS Newsletter</span>
            </div>
            <img 
              src={logoImg} 
              alt="OMS Newsletter" 
              className="w-auto h-24 md:h-32 lg:h-40 object-contain drop-shadow-2xl hover:bg-white rounded-3xl p-4 transition-all duration-300 mb-6" 
            />
            <p className="text-base sm:text-lg text-cream/80 leading-relaxed max-w-xl">
              Immersive storytelling, ministry milestones, and behind-the-scenes glimpses
              from the heart of One Mustard Seed.
            </p>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none"
            className="relative block h-[50px] sm:h-[70px] w-full"
            style={{ transform: "rotate(180deg)" }}>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="var(--color-background)" />
          </svg>
        </div>
      </section>

      <main className="pb-24">
        <div className="container px-6 mx-auto pt-10">

          {loading && (
            <div className="flex justify-center py-24">
              <div className="animate-spin h-12 w-12 border-4 border-forest border-t-transparent rounded-full" />
            </div>
          )}

          {!loading && newsletters.length === 0 && (
            <div className="text-center py-24 text-muted-foreground italic">
              No newsletters published yet. Check back soon!
            </div>
          )}

          {!loading && newsletters.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* ── LEFT: Main Newsletter Content ── */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 gap-8 animate-fade-in">
                  {filtered.map((nl) => (
                    <Card key={nl._id} className="border-none shadow-elevated rounded-[2.5rem] overflow-hidden group">
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        {nl.featuredImage ? (
                          <img
                            src={imgSrc(nl.featuredImage)}
                            alt={nl.title}
                            className="object-cover w-full h-full transition-transform duration-[3000ms] group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-forest/20 to-gold/10 flex items-center justify-center">
                            <Archive className="w-24 h-24 text-forest/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/40 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          {/* Date badge */}
                          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gold/30 rounded-full px-3 py-1 mb-3">
                            <Calendar className="w-3 h-3 text-gold" />
                            <span className="text-gold text-[10px] font-black uppercase tracking-[0.25em]">
                              {nl.date}
                            </span>
                          </div>

                          <h2 className="text-3xl md:text-4xl font-display font-medium text-cream leading-tight mb-2">
                            {nl.title}
                          </h2>

                          {nl.description && (
                            <p className="text-cream text-sm leading-relaxed line-clamp-2 mb-4 max-w-xl font-medium drop-shadow">
                              {nl.description}
                            </p>
                          )}

                          <Link
                            to="/newsletter/$id"
                            params={{ id: nl._id }}
                            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-forest-deep font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-all hover:gap-3 active:scale-95 shadow-md mt-2"
                          >
                            Read More <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination / Load More Placeholder */}
                {newsletters.length > 8 && (
                  <div className="mt-12 flex justify-center animate-fade-in">
                    <Button variant="outline" className="border-border/40 text-foreground font-bold tracking-widest uppercase text-xs gap-3 rounded-full px-8 h-12 hover:bg-forest/5 hover:text-forest transition-colors">
                      Load Next Page <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* ── RIGHT: Sidebar ── */}
              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-8">

                  {/* Subscribe (Moved to Top) */}
                  <div className="bg-forest-deep rounded-[2.5rem] p-9 text-cream relative overflow-hidden shadow-elevated group/sub border border-white/5">
                    <div className="relative z-10">
                      <Badge className="mb-5 bg-gold/20 text-gold border-gold/30 px-3 py-1 text-[8px] font-black tracking-[0.3em] uppercase rounded-full">
                        Subscribe
                      </Badge>
                      <h3 className="text-2xl font-display font-medium mb-3 leading-tight">
                        Don't Miss an <span className="italic text-gold">Update</span>
                      </h3>
                      <p className="text-cream/60 text-sm mb-7 leading-relaxed font-light">
                        Sign up now to stay up to date with our newsletter sent directly into your inbox!
                      </p>
                      <div className="space-y-3">
                        <Input
                          placeholder="your@email.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-2xl focus:border-gold/50 focus:bg-white/10 transition-all"
                        />
                        <Button className="w-full bg-gold hover:bg-gold/90 text-forest-deep font-bold h-12 rounded-2xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs">
                          Subscribe Now
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-[-10%] right-[-10%] w-52 h-52 bg-gold/10 rounded-full blur-[100px] transition-transform duration-1000 group-hover/sub:scale-125" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-36 h-36 bg-white/5 rounded-full blur-[80px]" />
                  </div>

                  {/* Search */}
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-forest" />
                    <Input
                      placeholder="Search archive..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="pl-12 h-14 rounded-[1.5rem] bg-card border-border/50 shadow-sm text-sm font-medium"
                    />
                  </div>

                  {/* Archive */}
                  <Card className="border-border/40 bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="p-7 border-b border-border/40 flex items-center gap-3 bg-muted/30">
                      <Archive className="w-4 h-4 text-gold" />
                      <span className="font-display font-medium text-lg">
                        Newsletter <span className="italic">Archive</span>
                      </span>
                    </div>
                    <CardContent className="p-3">
                      <div className="space-y-1">
                        {filtered.length > 0 ? (
                          filtered.map(nl => (
                            <button
                              key={nl._id}
                              onClick={() => {
                                setSelected(nl);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-forest/5 group ${selected?._id === nl._id ? "bg-forest/10 shadow-inner" : ""}`}
                            >
                              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-border/40 group-hover:border-forest/20 transition-colors shadow-sm">
                                {nl.featuredImage ? (
                                  <img src={imgSrc(nl.featuredImage)} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-forest/5 flex items-center justify-center">
                                    <Archive className="w-5 h-5 text-forest/30" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-bold text-sm truncate transition-colors ${selected?._id === nl._id ? "text-forest" : "text-foreground group-hover:text-forest"}`}>
                                  {nl.title}
                                </h4>
                                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mt-1">
                                  <Calendar className="w-3 h-3" />
                                  {nl.date}
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="p-10 text-center text-muted-foreground italic text-sm">
                            {search ? `No results for "${search}"` : "No other issues yet."}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>


                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
