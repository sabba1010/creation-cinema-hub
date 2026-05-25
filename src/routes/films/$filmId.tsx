import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, FileText, Download, Share2, Info, Star, Clock, Calendar, ChevronRight, User, MessageCircle, Film, X, CreditCard, CheckCircle2, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/films/$filmId")({
  component: IndividualFilmPage,
});

function IndividualFilmPage() {
  const { filmId } = Route.useParams();
  const [film, setFilm] = useState<any>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<null | "buy" | "rent">(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");
  const [paymentType, setPaymentType] = useState<"buy" | "rent" | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessInfo, setAccessInfo] = useState<{type: "buy" | "rent", expiresAt: number | null} | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [checkoutName, setCheckoutName] = useState(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        return JSON.parse(userData).name || "";
      } catch (e) {}
    }
    return "";
  });
  const [globalRentDuration, setGlobalRentDuration] = useState("48");
  const [ratingInput, setRatingInput] = useState(5);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const handlePurchase = (type: "buy" | "rent") => {
    setPaymentType(type);
    setPaymentStatus("idle");
    setShowPaymentModal(true);
  };

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus("processing");
    // Simulate API call to payment gateway
    setTimeout(async () => {
      const globalRentHours = parseInt(localStorage.getItem("global_rent_duration") || "48", 10) || 48;
      
      const accessData = {
        type: paymentType as "buy" | "rent",
        expiresAt: paymentType === "rent" ? Date.now() + globalRentHours * 60 * 60 * 1000 : null
      };
      const getUserKey = () => {
        const userDataStr = localStorage.getItem("user_data");
        if (userDataStr) {
          try {
            const user = JSON.parse(userDataStr);
            return `cinema_access_${user._id || user.id || "guest"}_${filmId}`;
          } catch(e) {}
        }
        return `cinema_access_guest_${filmId}`;
      };

      localStorage.setItem(getUserKey(), JSON.stringify(accessData));
      
      // Save purchase to backend
      try {
        await fetch(`http://localhost:5000/api/purchases`, {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
              filmId: film._id,
              type: paymentType === "buy" ? "Buy" : "Rent",
              amount: paymentType === "buy" ? film.price : film.rentPrice,
              user: checkoutName || "Guest User",
              customExpiresAt: accessData.expiresAt
           })
        });
      } catch (err) {
        console.error("Failed to save purchase to backend", err);
      }

      setPaymentStatus("success");
      setAccessInfo(accessData);
      setHasAccess(true);
      setPurchaseStatus(paymentType);
      setTimeout(() => {
        setShowPaymentModal(false);
      }, 2000);
    }, 2500);
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

    // Check LocalStorage for existing access
    const checkAccess = () => {
      const getUserKey = () => {
        const userDataStr = localStorage.getItem("user_data");
        if (userDataStr) {
          try {
            const user = JSON.parse(userDataStr);
            return `cinema_access_${user._id || user.id || "guest"}_${filmId}`;
          } catch(e) {}
        }
        return `cinema_access_guest_${filmId}`;
      };

      const userKey = getUserKey();
      const stored = localStorage.getItem(userKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.type === "buy") {
          setAccessInfo(parsed);
          setHasAccess(true);
        } else if (parsed.type === "rent") {
          if (parsed.expiresAt > Date.now()) {
            setAccessInfo(parsed);
            setHasAccess(true);
          } else {
            // Expired
            localStorage.removeItem(userKey);
            setAccessInfo(null);
            setHasAccess(false);
          }
        }
      }
    };
    checkAccess();
    
    // Initial load
    fetch("http://localhost:5000/api/settings")
      .then(res => res.json())
      .then(data => {
         if (data.success && data.data.global_rent_duration) {
            setGlobalRentDuration(data.data.global_rent_duration);
            localStorage.setItem("global_rent_duration", data.data.global_rent_duration);
         } else {
            setGlobalRentDuration(localStorage.getItem("global_rent_duration") || "48");
         }
      })
      .catch(() => {
         setGlobalRentDuration(localStorage.getItem("global_rent_duration") || "48");
      });

    // Listen for cross-tab updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "global_rent_duration") {
        setGlobalRentDuration(e.newValue || "48");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [filmId]);

  // Timer for Rental Expiration
  useEffect(() => {
    if (accessInfo?.type === "rent" && accessInfo.expiresAt) {
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = accessInfo.expiresAt! - now;
        if (diff <= 0) {
          clearInterval(interval);
          setHasAccess(false);
          setAccessInfo(null);
          const getUserKey = () => {
            const userDataStr = localStorage.getItem("user_data");
            if (userDataStr) {
              try {
                const user = JSON.parse(userDataStr);
                return `cinema_access_${user._id || user.id || "guest"}_${filmId}`;
              } catch(e) {}
            }
            return `cinema_access_guest_${filmId}`;
          };
          localStorage.removeItem(getUserKey());
        } else {
          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${h}h ${m}m ${s}s`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [accessInfo, filmId]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
       const userData = localStorage.getItem("user_data");
       let authorName = "Guest User";
       if (userData) {
         try { authorName = JSON.parse(userData).name || "Guest User"; } catch(e){}
       }

       const res = await fetch(`http://localhost:5000/api/films/${filmId}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
             text: newComment,
             rating: ratingInput,
             user: authorName
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
              <button 
                onClick={() => hasAccess ? setShowMovie(true) : handlePurchase("buy")} 
                className={`flex flex-col p-8 rounded-3xl shadow-lg hover:scale-[1.02] transition-all group text-left ${hasAccess ? 'bg-gold text-forest-deep' : 'bg-white/5 border border-white/10'}`}
              >
                {hasAccess ? <Play className="h-8 w-8 mb-6 fill-current" /> : <Lock className="h-8 w-8 mb-6 text-cream/40" />}
                <span className={`text-xl font-display font-medium ${hasAccess ? '' : 'text-cream/80'}`}>Watch Full Film</span>
                <span className={`text-xs uppercase tracking-widest mt-2 ${hasAccess ? 'opacity-70 font-bold text-forest-deep' : 'text-cream/40'}`}>
                  {hasAccess ? (
                    accessInfo?.type === "buy" ? 'Lifetime Access' : `Rent Expires in: ${timeLeft}`
                  ) : 'Requires Purchase or Rent'}
                </span>
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
                  {accessInfo?.type === "buy" ? (
                    <span className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Purchased</span>
                  ) : (
                    <button 
                      onClick={() => handlePurchase("buy")}
                      className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-md transition-all ${
                        purchaseStatus === "buy" ? "bg-emerald-500 text-white" : "bg-gold text-forest-deep"
                      }`}
                    >
                      {purchaseStatus === "buy" ? "Added!" : "Buy Now"}
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-cream/50 mb-1">Rent {globalRentDuration}h</p>
                    <p className="text-xl font-bold text-cream">{film.rentPrice || "$4.99"}</p>
                  </div>
                  {accessInfo?.type === "rent" ? (
                    <div className="text-right">
                       <span className="block px-4 py-1.5 mb-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Active</span>
                       <span className="text-[9px] text-cream/40 uppercase tracking-widest">{timeLeft}</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handlePurchase("rent")}
                      disabled={accessInfo?.type === "buy"}
                      className={`px-6 py-3 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest ${
                        accessInfo?.type === "buy" ? "opacity-50 cursor-not-allowed border-white/5 text-white/20" :
                        purchaseStatus === "rent" ? "bg-emerald-500 text-white border-emerald-500" : "border-white/10 text-cream hover:bg-white/5"
                      }`}
                    >
                      {purchaseStatus === "rent" ? "Rented!" : "Rent"}
                    </button>
                  )}
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

      {/* Payment Checkout Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md bg-[#0a1a0a] border-white/10 text-cream p-0 overflow-hidden shadow-2xl rounded-2xl">
          <DialogTitle className="sr-only">Complete Checkout</DialogTitle>
          <DialogDescription className="sr-only">Enter payment details to buy or rent this film.</DialogDescription>
          
          <div className="p-8 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-24 shrink-0 rounded bg-black overflow-hidden shadow-lg border border-white/10">
                <img src={film.thumbnail || film.image} alt={film.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium">{film.title}</h3>
                <p className="text-xs uppercase tracking-widest text-gold mt-1">
                   {paymentType === "buy" ? "Digital HD Purchase" : `${globalRentDuration}-Hour Rental`}
                </p>
                <p className="text-2xl font-bold mt-2">
                   {paymentType === "buy" ? (film.price || "$14.99") : (film.rentPrice || "$4.99")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {paymentStatus === "idle" && (
              <form onSubmit={processPayment} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-cream/50 font-bold">Name on Card</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cream/30" />
                      <input 
                        type="text" 
                        required
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        placeholder="John Doe" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-11 text-cream placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-cream/50 font-bold">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cream/30" />
                      <input 
                        type="text" 
                        required
                        placeholder="•••• •••• •••• ••••" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-11 text-cream placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-cream/50 font-bold">Expiry</label>
                      <input type="text" required placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-cream placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-cream/50 font-bold">CVC</label>
                      <input type="text" required placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-cream placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full bg-gold text-forest-deep font-bold uppercase tracking-widest text-sm p-4 rounded-xl shadow-lg hover:bg-gold/90 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Pay Securely
                </button>
              </form>
            )}

            {paymentStatus === "processing" && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-gold/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin"></div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-cream">Processing Payment</h3>
                  <p className="text-sm text-cream/50 mt-2">Connecting to secure gateway...</p>
                </div>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium text-cream">Payment Successful!</h3>
                  <p className="text-sm text-cream/70 mt-2 max-w-[250px] mx-auto">
                    You now have access to watch <span className="text-gold font-bold">{film.title}</span>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
