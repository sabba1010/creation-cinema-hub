import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useEffect, useState } from "react";
import { Calendar, ArrowLeft, FileText, ExternalLink, Eye, MessageSquare, Send, UserCircle } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import Swal from "sweetalert2";

export const Route = createFileRoute("/newsletter/$id")({
  component: NewsletterDetailPage,
});

const API = "http://localhost:5000";

function getVimeoEmbedUrl(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=0&title=0&byline=0&portrait=0` : url;
}

function NewsletterDetailPage() {
  const { id } = Route.useParams();
  const [nl, setNl] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/newsletter/${id}`)
      .then(r => r.json())
      .then(data => { setNl(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API}/api/newsletter/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: commentName || "Anonymous", text: commentText })
      });
      if (res.ok) {
        const updatedComments = await res.json();
        setNl({ ...nl, comments: updatedComments });
        setCommentText("");
        setCommentName("");

        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Your comment has been submitted and will appear after moderation.",
          confirmButtonColor: "#2C4A3B", // forest green
          confirmButtonText: "Close"
        });
      }
    } catch (err) {
      console.error("Failed to post comment", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#050704] min-h-screen">
        <SiteHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-gold/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!nl || nl.message) {
    return (
      <div className="bg-[#050704] min-h-screen text-cream">
        <SiteHeader />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <FileText className="w-16 h-16 text-gold/30" />
          <p className="text-gold/60 text-xl font-display">This newsletter issue is unavailable.</p>
          <Link to="/newsletter">
            <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 rounded-full px-8">
              ← Back to Archive
            </Button>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const imageBase = nl.featuredImage?.startsWith("http") ? nl.featuredImage : `${API}${nl.featuredImage}`;

  const approvedComments = nl.comments?.filter((c: any) => !c.status || c.status === 'approved') || [];

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-gold/30">
      <SiteHeader />

      {/* ── Hero Banner ── */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#050704]">
        <div className="absolute inset-0 z-0">
          {nl.featuredImage ? (
            <img
              src={imageBase}
              alt={nl.title}
              className="w-full h-full object-cover opacity-60 scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-forest-deep to-[#050704]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050704]/60 via-[#050704]/20 to-[#050704]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050704]/50 via-transparent to-[#050704]/50" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center animate-fade-up">
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 text-xs font-bold uppercase tracking-widest mb-10 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Newsletter
          </Link>

          <Badge className="mb-6 bg-gold text-forest-deep border-none px-5 py-2 rounded-full tracking-[0.25em] uppercase text-[10px] font-black">
            {nl.category || "Ministry Update"}
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-cream mb-10 leading-[1.1] tracking-tight drop-shadow-2xl max-w-4xl">
            {nl.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-gold" />
              <span className="uppercase tracking-widest text-[10px] font-bold text-cream">
                By {nl.author || "OMS Team"}
              </span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gold/50 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="uppercase tracking-widest text-[10px] font-bold text-cream">{nl.date}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gold/50 hidden sm:block" />
            <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <Eye className="w-4 h-4 text-gold" />
              <span className="uppercase tracking-widest text-[10px] font-bold text-cream">{nl.views || 0} Views</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="bg-background">
        {/* Wide wrapper — matches site header max-width */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">

          {/* Centered reading column */}
          <div className="max-w-5xl mx-auto">

            {/* Description Area */}
            {nl.description && (
              <div className="animate-fade-up mb-16">
                <div className="prose prose-lg md:prose-xl lg:prose-2xl prose-slate max-w-none prose-p:text-foreground/80 prose-p:leading-[2.2]">
                  {nl.description.split('\n').map((para: string, idx: number) => {
                    if (!para.trim()) return <br key={idx} />;
                    return (
                      <p key={idx} className={idx === 0 ? "text-2xl md:text-3xl font-display text-gold leading-relaxed font-medium mb-10" : "text-xl md:text-[1.35rem]"}>
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content blocks — photo blocks are grouped into gallery grids */}
            {(() => {
              const blocks: any[] = nl.blocks || [];
              const rendered: React.ReactNode[] = [];
              let i = 0;
              while (i < blocks.length) {
                const block = blocks[i];

                // ── Group consecutive photo blocks into a gallery ──
                if (block.type === "photo" && block.url) {
                  const photoGroup: any[] = [];
                  while (i < blocks.length && blocks[i].type === "photo" && blocks[i].url) {
                    photoGroup.push(blocks[i]);
                    i++;
                  }
                  const count = photoGroup.length;
                  const gridCols =
                    count === 1 ? "grid-cols-1" :
                      count === 2 ? "grid-cols-1 sm:grid-cols-2" :
                        count === 3 ? "grid-cols-1 sm:grid-cols-3" :
                          "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

                  rendered.push(
                    <div key={`gallery-${i}`} className={`my-12 grid ${gridCols} gap-4 items-start`}>
                      {photoGroup.map((p: any, pIdx: number) => {
                        const src = p.url.startsWith("data:") || p.url.startsWith("http") ? p.url : `${API}${p.url}`;
                        return (
                          <figure key={pIdx} className="group/img rounded-2xl shadow-xl border border-border/30 bg-card overflow-hidden">
                            {/* No forced aspect-ratio — image shows at its full natural height/width */}
                            <div className="overflow-hidden">
                              <img
                                src={src}
                                alt={p.caption || `Photo ${pIdx + 1}`}
                                className="w-full h-auto block transition-transform duration-700 group-hover/img:scale-[1.04]"
                              />
                            </div>
                            {p.caption && (
                              <figcaption className="py-3 px-4 text-center flex items-center justify-center gap-2">
                                <div className="h-px w-6 bg-gold/40" />
                                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{p.caption}</span>
                                <div className="h-px w-6 bg-gold/40" />
                              </figcaption>
                            )}
                          </figure>
                        );
                      })}
                    </div>
                  );
                  continue;
                }

                // ── Text block ──
                if (block.type === "text") {
                  rendered.push(
                    <div key={block._id || i} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="prose prose-lg md:prose-xl lg:prose-2xl prose-slate max-w-none prose-p:text-foreground/80 prose-p:leading-[2.2]">
                        {block.content.split('\n').map((para: string, pIdx: number) => {
                          if (!para.trim()) return <br key={pIdx} />;
                          return <p key={pIdx} className="text-xl md:text-[1.35rem]">{para}</p>;
                        })}
                      </div>
                    </div>
                  );
                }

                // ── Video block ──
                if (block.type === "video" && block.vimeoUrl) {
                  rendered.push(
                    <div key={block._id || i} className="animate-fade-up my-12 rounded-2xl overflow-hidden shadow-xl border border-border/30 bg-card" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="relative aspect-video bg-black">
                        <iframe
                          src={getVimeoEmbedUrl(block.vimeoUrl)}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={block.videoTitle || "Video"}
                        />
                      </div>
                      {block.videoTitle && (
                        <div className="p-6">
                          <Badge className="mb-3 bg-gold/15 text-amber-700 border-gold/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                            Featured Video
                          </Badge>
                          <h4 className="font-bold text-xl font-display text-foreground">{block.videoTitle}</h4>
                          {block.videoDescription && (
                            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{block.videoDescription}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                // ── News block ──
                if (block.type === "news") {
                  rendered.push(
                    <div key={block._id || i} className="animate-fade-up my-12 bg-gradient-to-br from-forest/5 to-gold/5 border border-forest/15 rounded-2xl p-8 md:p-10 relative overflow-hidden group/news transition-all hover:-translate-y-1 hover:shadow-lg" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover/news:scale-110 transition-transform duration-700 pointer-events-none">
                        <FileText className="w-48 h-48 text-forest" />
                      </div>
                      <div className="relative z-10">
                        <Badge className="mb-5 bg-forest text-white px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border-none">
                          Ministry Update
                        </Badge>
                        <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground mb-4 leading-tight">{block.title}</h3>
                        <p className="text-muted-foreground mb-8 leading-relaxed">{block.excerpt}</p>
                        {block.link && (
                          <a href={block.link} className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:gap-4 hover:bg-forest-deep transition-all shadow-md">
                            Read Full Story <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                }

                i++;
              }
              return <div className="space-y-12">{rendered}</div>;
            })()}

          </div>{/* end reading column */}

          {/* Comments — uses full width of 7xl wrapper */}
          <section className="pt-20 border-t border-border/50 mt-20">
            <div className="flex items-center gap-3 mb-12 animate-fade-up">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                <MessageSquare className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                Community <span className="italic text-gold">Thoughts</span>
                <span className="text-muted-foreground/40 text-xl ml-2 font-normal">({approvedComments.length})</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Comment list */}
              <div className="md:col-span-7 space-y-5 order-2 md:order-1">
                {approvedComments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-muted-foreground italic bg-muted/40 border border-border/50 p-12 rounded-2xl text-center">
                    <MessageSquare className="w-10 h-10 mb-4 text-muted-foreground/30" />
                    <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {approvedComments.map((comment: any, idx: number) => (
                      <div key={idx} className="bg-card border border-border/50 p-6 rounded-2xl shadow-sm flex gap-4 hover:shadow-md transition-shadow" style={{ animationDelay: `${idx * 80}ms` }}>
                        <div className="shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                            <UserCircle className="w-6 h-6 text-gold/60" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-foreground text-sm">{comment.user}</h4>
                            <span className="text-[10px] text-muted-foreground/60 font-medium">
                              {new Date(comment.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-sm">{comment.text}</p>
                          {comment.adminReply && (
                            <div className="mt-4 bg-muted/50 p-4 rounded-xl border-l-2 border-gold/50">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Admin Reply</span>
                              </div>
                              <p className="text-sm text-foreground/80">{comment.adminReply}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Comment form */}
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="bg-card border border-border/60 p-7 rounded-2xl sticky top-28 shadow-sm">
                  <div className="mb-6">
                    <h4 className="font-display font-semibold text-xl text-foreground mb-1">Leave a Reply</h4>
                    <p className="text-xs font-medium uppercase tracking-widest text-gold">Join the conversation</p>
                  </div>
                  <form onSubmit={handlePostComment} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name (Optional)</label>
                      <Input
                        placeholder="How should we call you?"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        className="rounded-xl h-11 bg-background border-border focus:border-gold/60 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Your Comment</label>
                      <Textarea
                        placeholder="Share your thoughts..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="rounded-xl min-h-[130px] bg-background border-border focus:border-gold/60 transition-all resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !commentText.trim()}
                      className="w-full bg-forest hover:bg-forest-deep text-white rounded-xl h-12 font-bold uppercase tracking-widest text-xs gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                    >
                      {isSubmitting ? "Posting..." : "Post Comment"}
                      {!isSubmitting && <Send className="w-4 h-4" />}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Back link */}
          <div className="max-w-3xl mx-auto pt-16 pb-6 mt-16 border-t border-border/50 flex justify-start">
            <Link to="/newsletter">
              <Button variant="outline" className="rounded-full gap-2 px-6 py-5 border-border text-muted-foreground hover:text-forest hover:border-forest uppercase tracking-widest text-xs font-bold transition-all">
                <ArrowLeft className="w-4 h-4" /> Back to Archive
              </Button>
            </Link>
          </div>

        </div>{/* end max-w-7xl */}
      </main>

      <SiteFooter />
    </div>
  );
}