import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, FileText, Download, Share2, Info, Star, Clock, Calendar, ChevronRight, User, MessageCircle, Film, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/films/$filmId")({
  component: IndividualFilmPage,
});

function IndividualFilmPage() {
  const { filmId } = Route.useParams();
  const [film, setFilm] = useState<any>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<null | "buy" | "rent">(null);
  const [ratingInput, setRatingInput] = useState(5);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const handlePurchase = (type: "buy" | "rent") => {
    setPurchaseStatus(type);
    setTimeout(() => setPurchaseStatus(null), 3000);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/films/${filmId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFilm(data.data);
          if (data.data.reviews) {
             setReviews(data.data.reviews);
          }
        }
      })
      .catch(err => console.error(err));
  }, [filmId]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
       const res = await fetch(`http://localhost:5000/api/films/${filmId}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
             text: newComment,
             rating: ratingInput,
             user: "Current User" // In a real app, this would be from Auth context
          })
       });
       const data = await res.json();
       if (data.success) {
          setReviews(data.data.reviews);
          setFilm(data.data); // Update film rating as well
          setNewComment("");
          setRatingInput(5);
       }
    } catch (err) {
       console.error("Failed to post review", err);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.split("v=")[1] || url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId?.split("&")[0]}`;
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  if (!film) {
    return <div className="bg-[#050704] min-h-screen flex items-center justify-center text-gold font-display text-2xl">Loading...</div>;
  }

  return (
    <div className="bg-[#050704] min-h-screen flex flex-col text-cream selection:bg-gold/30">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Film Header / Banner */}
        <section className="relative h-[60vh] flex items-end pb-20 overflow-hidden bg-[#050704]">
          <div className="absolute inset-0">
            <img src={film.thumbnail || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"} alt="Film Banner" className="w-full h-full object-cover opacity-40 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050704] via-[#050704]/60 to-transparent" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 w-full">
            <div className="flex flex-col md:flex-row items-end gap-12">
              <div className="hidden md:block w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
                <img src={film.thumbnail || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"} alt="Poster" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow pb-4">
                <div className="flex items-center gap-4 mb-6">
                   <span className="px-3 py-1 rounded bg-gold text-forest-deep text-[10px] font-bold uppercase tracking-widest">Featured</span>
                   <div className="flex items-center gap-1 text-gold"><Star className="h-4 w-4 fill-current" /> <span className="text-sm font-bold text-cream">{film.rating || "0.0"}</span></div>
                </div>
                <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight text-cream leading-none">{film.title}</h1>
                <div className="mt-8 flex flex-wrap gap-8 text-sm font-bold text-cream/50 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {film.year}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {film.duration}</span>
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
              <button onClick={() => setShowMovie(true)} className="flex flex-col p-8 rounded-3xl bg-gold text-forest-deep shadow-lg hover:scale-[1.02] transition-all group text-left">
                <Play className="h-8 w-8 mb-6 fill-current" />
                <span className="text-xl font-display font-medium">Watch Full Film</span>
                <span className="text-xs uppercase tracking-widest opacity-70 mt-2">Streaming Access Included</span>
              </button>
              <button onClick={() => setShowTrailer(true)} className="flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/30 hover:shadow-xl transition-all text-left">
                <Film className="h-8 w-8 mb-6 text-gold" />
                <span className="text-xl font-display font-medium text-cream">Watch Trailer</span>
                <span className="text-xs uppercase tracking-widest text-cream/50 mt-2">Official Preview</span>
              </button>
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
                    <p className="text-xl font-bold text-cream">{film.price || "$14.99"}</p>
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
                    <p className="text-xl font-bold text-cream">{film.rentPrice || "$4.99"}</p>
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

        {/* Reviews & Ratings Section */}
        <section className="py-24 bg-[#0a1a0a] border-t border-white/5">
          <div className="mx-auto max-w-3xl px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-3xl font-medium text-cream">Reviews & <span className="italic text-gold">Ratings</span></h2>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream/50">
                <Star className="h-4 w-4 text-gold fill-gold" /> {reviews.length} Reviews
              </div>
            </div>

            <form onSubmit={handlePostComment} className="mb-16">
              <div className="relative p-2 rounded-[2rem] bg-white/5 border border-white/10 shadow-sm focus-within:border-gold/30 transition-all">
                <div className="px-6 pt-4 pb-2 border-b border-white/5 flex items-center gap-4">
                  <span className="text-sm font-bold text-cream/60">Your Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        type="button"
                        onClick={() => setRatingInput(star)}
                        className="transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star className={`h-6 w-6 ${ratingInput >= star ? 'text-gold fill-gold' : 'text-white/20'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your review on this film..." 
                  className="w-full bg-transparent p-6 text-sm text-cream placeholder:text-cream/40 focus:outline-none min-h-[120px] resize-none"
                />
                <div className="flex justify-end p-2">
                  <button type="submit" className="rounded-full bg-gold px-8 py-3 text-xs font-bold uppercase tracking-widest text-forest-deep shadow-lg hover:scale-105 transition-all">
                    Submit Review
                  </button>
                </div>
              </div>
            </form>

            <div className="space-y-10">
              {reviews.map((review: any) => (
                <div key={review._id || Math.random()} className="flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 border border-gold/5">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-cream text-sm">{review.user}</span>
                      <span className="text-[10px] uppercase tracking-widest text-cream/50">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-3.5 w-3.5 ${review.rating >= star ? 'text-gold fill-gold' : 'text-white/20'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-cream/70 leading-relaxed">{review.text}</p>
                    <div className="flex gap-4 pt-2">
                      <button className="text-[10px] font-bold uppercase tracking-widest text-gold hover:underline">Helpful</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* Trailer Modal */}
      <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">Watch Trailer</DialogTitle>
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button onClick={() => setShowTrailer(false)} className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-gold hover:text-black text-white rounded-full transition-colors backdrop-blur-md">
               <X className="w-5 h-5" />
            </button>
            {film.trailer ? (
              <iframe
                src={getEmbedUrl(film.trailer)}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex h-full items-center justify-center text-white/50">No trailer available</div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Movie Modal */}
      <Dialog open={showMovie} onOpenChange={setShowMovie}>
        <DialogContent className="max-w-6xl p-0 bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">Watch Full Movie</DialogTitle>
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button onClick={() => setShowMovie(false)} className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-gold hover:text-black text-white rounded-full transition-colors backdrop-blur-md">
               <X className="w-5 h-5" />
            </button>
            {film.movieLink ? (
              <iframe
                src={getEmbedUrl(film.movieLink)}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex h-full items-center justify-center text-white/50">Movie not available</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
