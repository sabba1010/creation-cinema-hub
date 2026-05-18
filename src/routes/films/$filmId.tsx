import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, FileText, Download, Share2, Info, Star, Clock, Calendar, ChevronRight, User, MessageCircle, Film } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/films/$filmId")({
  component: IndividualFilmPage,
});

function IndividualFilmPage() {
  const { filmId } = Route.useParams();
  const [purchaseStatus, setPurchaseStatus] = useState<null | "buy" | "rent">(null);
  const [comments, setComments] = useState([
    { id: 1, user: "Sarah Jenkins", text: "This cinematography is absolutely breathtaking. The macro shots of the seeds are incredible!", date: "2 hours ago" },
    { id: 2, user: "Pastor Mark", text: "A wonderful resource for our youth group. The spiritual parallels are so clear.", date: "5 hours ago" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handlePurchase = (type: "buy" | "rent") => {
    setPurchaseStatus(type);
    setTimeout(() => setPurchaseStatus(null), 3000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment = { id: Date.now(), user: "Guest User", text: newComment, date: "Just now" };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="bg-[#050704] min-h-screen flex flex-col text-cream selection:bg-gold/30">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Film Header / Banner */}
        <section className="relative h-[60vh] flex items-end pb-20 overflow-hidden bg-[#050704]">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" alt="Film Banner" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050704] via-[#050704]/60 to-transparent" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 w-full">
            <div className="flex flex-col md:flex-row items-end gap-12">
              <div className="hidden md:block w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" alt="Poster" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow pb-4">
                <div className="flex items-center gap-4 mb-6">
                   <span className="px-3 py-1 rounded bg-gold text-forest-deep text-[10px] font-bold uppercase tracking-widest">Featured Documentary</span>
                   <div className="flex items-center gap-1 text-gold"><Star className="h-4 w-4 fill-current" /> <span className="text-sm font-bold text-cream">9.8</span></div>
                </div>
                <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight text-cream leading-none">The <span className="italic text-gold">Seed</span></h1>
                <div className="mt-8 flex flex-wrap gap-8 text-sm font-bold text-cream/50 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> 2024</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 1h 42m</span>
                  <span className="flex items-center gap-2">Nature / Theology</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-[2fr_1fr] gap-16 border-b border-white/10">
          {/* Main Content */}
          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-medium text-cream">Synopsis</h2>
              <p className="text-lg text-cream/70 leading-relaxed">
                Take a breathtaking journey into the microscopic architecture of life. "The Seed" explores the profound complexity found within a single unit of nature, drawing spiritual parallels between biological growth and the kingdom of God. Filmed over three years using advanced macro-cinematography techniques.
              </p>
            </div>

            {/* Video Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Link to="/films/watch" className="flex flex-col p-8 rounded-3xl bg-gold text-forest-deep shadow-lg hover:scale-[1.02] transition-all group">
                <Play className="h-8 w-8 mb-6 fill-current" />
                <span className="text-xl font-display font-medium">Watch Full Film</span>
                <span className="text-xs uppercase tracking-widest opacity-70 mt-2">Streaming Access Included</span>
              </Link>
              <Link to="/films/trailer" className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/30 hover:shadow-xl transition-all">
                <Film className="h-8 w-8 mb-6 text-gold" />
                <span className="text-xl font-display font-medium text-cream">Watch Trailer</span>
                <span className="text-xs uppercase tracking-widest text-cream/50 mt-2">2:45 Official Preview</span>
              </Link>
            </div>

            {/* Film Resources */}
            <div className="space-y-8">
              <h2 className="font-display text-3xl font-medium text-cream">Film <span className="italic text-gold">Resources</span></h2>
              <div className="grid gap-4">
                {[
                  { title: "Discussion Guide for Small Groups", size: "4.2 MB" },
                  { title: "Technical Setup for Church Screening", size: "1.8 MB" },
                  { title: "High-Res Promotional Posters", size: "15.0 MB" },
                ].map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-gold/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-cream">{res.title}</h4>
                        <p className="text-xs text-cream/50 uppercase tracking-widest">{res.size} • PDF</p>
                      </div>
                    </div>
                    <button className="h-10 w-10 rounded-full border border-white/10 text-cream flex items-center justify-center hover:bg-gold hover:text-forest-deep hover:border-gold transition-all">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-xl">
              <h3 className="font-display text-2xl font-medium mb-6 text-cream">Own the Film</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-cream/50 mb-1">Digital HD</p>
                    <p className="text-xl font-bold text-cream">$14.99</p>
                  </div>
                  <button 
                    onClick={() => handlePurchase("buy")}
                    className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-md transition-all ${
                      purchaseStatus === "buy" ? "bg-emerald-500 text-white" : "bg-gold text-forest-deep"
                    }`}
                  >
                    {purchaseStatus === "buy" ? "Added!" : "Buy Now"}
                  </button>
                </div>
                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-cream/50 mb-1">Rent 48h</p>
                    <p className="text-xl font-bold text-cream">$4.99</p>
                  </div>
                  <button 
                    onClick={() => handlePurchase("rent")}
                    className={`px-6 py-3 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest ${
                      purchaseStatus === "rent" ? "bg-emerald-500 text-white border-emerald-500" : "border-white/10 text-cream hover:bg-white/5"
                    }`}
                  >
                    {purchaseStatus === "rent" ? "Rented!" : "Rent"}
                  </button>
                </div>
              </div>
              <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40">Supported on all devices</p>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gold">Key Cast & Crew</h4>
              <div className="space-y-4">
                {[
                  { name: "Julian Smith", role: "Director / Cinematographer" },
                  { name: "Elena Rossi", role: "Producer" },
                  { name: "Marcus Thorne", role: "Music Composer" },
                ].map((person, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-bold text-cream text-sm">{person.name}</span>
                    <span className="text-xs text-cream/50">{person.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Community Discussion Section */}
        <section className="py-24 bg-[#0a1a0a] border-t border-white/5">
          <div className="mx-auto max-w-3xl px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-3xl font-medium text-cream">Community <span className="italic text-gold">Discussion</span></h2>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream/50">
                <MessageCircle className="h-4 w-4" /> {comments.length} Thoughts
              </div>
            </div>

            <form onSubmit={handlePostComment} className="mb-16">
              <div className="relative p-2 rounded-[2rem] bg-white/5 border border-white/10 shadow-sm focus-within:border-gold/30 transition-all">
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts on the film..." 
                  className="w-full bg-transparent p-6 text-sm text-cream placeholder:text-cream/40 focus:outline-none min-h-[120px] resize-none"
                />
                <div className="flex justify-end p-2">
                  <button type="submit" className="rounded-full bg-gold px-8 py-3 text-xs font-bold uppercase tracking-widest text-forest-deep shadow-lg hover:scale-105 transition-all">
                    Post Comment
                  </button>
                </div>
              </div>
            </form>

            <div className="space-y-10">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 border border-gold/5">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-cream text-sm">{comment.user}</span>
                      <span className="text-[10px] uppercase tracking-widest text-cream/50">{comment.date}</span>
                    </div>
                    <p className="text-sm text-cream/70 leading-relaxed">{comment.text}</p>
                    <div className="flex gap-4 pt-2">
                      <button className="text-[10px] font-bold uppercase tracking-widest text-gold hover:underline">Reply</button>
                      <button className="text-[10px] font-bold uppercase tracking-widest text-cream/40 hover:text-gold transition">Like</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
