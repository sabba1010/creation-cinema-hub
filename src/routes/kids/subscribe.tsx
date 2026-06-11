import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CheckCircle2, ShieldCheck, Heart, Users, CreditCard, Sparkles, Star, Crown, Calendar, Infinity } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const Route = createFileRoute("/kids/subscribe")({
   component: KidsSubscribePage,
});

function KidsSubscribePage() {
   const [billing, setBilling] = useState("monthly");
   const [isLoading, setIsLoading] = useState<string | null>(null);
   const [activeSlide, setActiveSlide] = useState(0);
   const [isAnimating, setIsAnimating] = useState(false);
   const [alreadySubscribed, setAlreadySubscribed] = useState(false);
   const [subscriptionType, setSubscriptionType] = useState<string | null>(null);
   const [planSettings, setPlanSettings] = useState({
      lifetimeEnabled: true, lifetimePrice: 99,
      monthlyEnabled: true, monthlyPrice: 4.99,
      yearlyEnabled: true, yearlyPrice: 49.99,
      trialDays: 7,
   });
   const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
   const navigate = useNavigate();

   // Check if already subscribed
   useEffect(() => {
      const token = localStorage.getItem("user_token");
      const userData = localStorage.getItem("user_data");
      if (token && userData) {
         try {
            const user = JSON.parse(userData);
            if (user.kidsAccess) {
               setAlreadySubscribed(true);
               setSubscriptionType(user.kidsAccessType);
            }
         } catch { }
         // Also verify with backend
         fetch(`${API_URL}/api/kids/access`, {
            headers: { Authorization: `Bearer ${token}` }
         })
            .then(r => r.json())
            .then(data => {
               if (data.hasAccess) {
                  setAlreadySubscribed(true);
                  setSubscriptionType(data.accessType);
               }
            })
            .catch(() => { });
      }

      // Load plan settings
      fetch(`${API_URL}/api/kids/plans`)
         .then(r => r.json())
         .then(data => { if (data.success) setPlanSettings(data.data); })
         .catch(() => { });
   }, []);

   const TESTIMONIALS = [
      { quote: "KidsBibleFlix has completely changed how our family does screen time. Our kids beg to watch it every night and I'm always happy to say yes!", name: "Sarah M.", role: "Mother of 3 · Subscriber since 2024", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=80", stars: 5 },
      { quote: "We use KidsBibleFlix in our Sunday School classes every week. The Connection Guides make it so easy to lead discussions. Absolutely worth every penny.", name: "Pastor James T.", role: "Children's Ministry Director · Church subscriber", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80", stars: 5 },
      { quote: "The lifetime plan was the best investment for our family. Knowing I'll never be charged again while my kids keep growing in faith — priceless.", name: "Marcus & Linda W.", role: "Parents · Lifetime members", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80", stars: 5 },
   ];

   const goToSlide = (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
   };
   const prev = () => goToSlide((activeSlide - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
   const next = () => goToSlide((activeSlide + 1) % TESTIMONIALS.length);

   useEffect(() => {
      autoplayRef.current = setInterval(next, 4500);
      return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
   }, [activeSlide]);

   const handleSubscribe = async (plan: string) => {
      const token = localStorage.getItem("user_token");
      const userData = localStorage.getItem("user_data");

      if (!token || !userData) {
         const result = await Swal.fire({
            icon: "info",
            title: "Sign In Required",
            text: "You need an account to subscribe. Would you like to log in or create one?",
            showCancelButton: true,
            confirmButtonText: "Log In",
            cancelButtonText: "Create Account",
            confirmButtonColor: "#1a2f24",
            cancelButtonColor: "#D4AF37",
         });
         if (result.isConfirmed) {
            navigate({ to: "/login", search: { redirect: "/kids/subscribe", theme: "kids" } });
         } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
            navigate({ to: "/register", search: { redirect: "/kids/subscribe", theme: "kids" } });
         }
         return;
      }

      const user = JSON.parse(userData);
      setIsLoading(plan);

      try {
         const priceMap: Record<string, string> = {
            lifetime: `$${planSettings.lifetimePrice}.00`,
            monthly: `$${planSettings.monthlyPrice}`,
            yearly: `$${planSettings.yearlyPrice}`,
         };

         const res = await fetch(`${API_URL}/api/payment/create-checkout-session`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
               type: "kids_subscription",
               plan,
               successUrl: `${window.location.origin}/payment/success`,
               cancelUrl: window.location.href,
            }),
         });

         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.message || "Failed to process subscription");
         }

         // Redirect to Stripe checkout
         window.location.href = data.url;
         return;
      } catch (err: any) {
         Swal.fire({
            icon: "error",
            title: "Subscription Failed",
            text: err.message || "Something went wrong. Please try again.",
            confirmButtonColor: "#1a2f24",
         });
      } finally {
         setIsLoading(null);
      }
   };

   // Already subscribed banner
   if (alreadySubscribed) {
      return (
         <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-grow pt-24 flex items-center justify-center px-6">
               <div className="max-w-lg w-full bg-white rounded-[3rem] p-12 text-center border border-[#EFECE3] shadow-2xl">
                  <div className="h-24 w-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-8">
                     <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                  </div>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full mb-6">
                     <Crown className="h-4 w-4" />
                     <span className="text-xs font-bold uppercase tracking-widest capitalize">{subscriptionType || "Active"} Member</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-forest-deep mb-4">You're Already In!</h1>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                     You already have an active KidsBibleFlix {subscriptionType === "lifetime" ? "lifetime" : subscriptionType} subscription.
                     Head to the library to start watching!
                  </p>
                  <Link to="/kids/library" className="block w-full py-5 rounded-3xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-forest-deep/90 transition-all text-center">
                     Go to Library →
                  </Link>
               </div>
            </main>
            <SiteFooter />
         </div>
      );
   }

   return (
      <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
         <SiteHeader />
         <main className="flex-grow pt-24">
            {/* Header */}
            <section className="py-20 text-center">
               <div className="mx-auto max-w-3xl px-6">
                  <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-8">
                     <Sparkles className="h-4 w-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Join Thousands of Families</span>
                  </div>
                  <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
                     Unlock the World of <br />
                     <span className="italic text-blue-600">Pure Wonder</span>
                  </h1>
                  <p className="text-gray-500 text-lg leading-relaxed">
                     Join thousands of families who trust KidsBibleFlix for safe, faith-building content. No ads, no hidden fees, just wonder.
                  </p>
               </div>
            </section>

            {/* Pricing Toggle */}
            <section className="pb-24">
               <div className="mx-auto max-w-7xl px-6 flex flex-col items-center">
                  <div className="bg-white border border-gray-100 p-2 rounded-3xl flex gap-2 mb-16 shadow-sm">
                     <button
                        onClick={() => setBilling("monthly")}
                        className={`px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${billing === "monthly" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400"}`}
                     >
                        Monthly
                     </button>
                     <button
                        onClick={() => setBilling("yearly")}
                        className={`px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${billing === "yearly" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400"}`}
                     >
                        Yearly <span className="ml-2 bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">Save 20%</span>
                     </button>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8 max-w-6xl w-full">
                     {/* Monthly / Yearly Plan */}
                     {planSettings.monthlyEnabled && (
                        <div className="bg-white rounded-[3rem] p-10 lg:p-12 border-2 border-blue-600 shadow-2xl relative overflow-hidden">
                           <div className="absolute top-8 right-8 opacity-10">
                              <Calendar className="h-20 w-20 text-blue-600" />
                           </div>
                           <div className="mb-10">
                              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Premium Access</h3>
                              <div className="flex items-baseline gap-2">
                                 <span className="text-4xl font-black text-gray-900">
                                    {billing === "monthly" ? `$${planSettings.monthlyPrice}` : `$${planSettings.yearlyPrice}`}
                                 </span>
                                 <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                                    {billing === "monthly" ? "/ Month" : "/ Year"}
                                 </span>
                              </div>
                           </div>
                           <ul className="space-y-5 mb-10">
                              {["Unlimited ad-free streaming", "All series & audio stories", "Weekly new releases", "Up to 5 family profiles", "Downloadable connection guides"].map((f) => (
                                 <li key={f} className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> {f}
                                 </li>
                              ))}
                           </ul>
                           <button
                              onClick={() => handleSubscribe(billing)}
                              disabled={isLoading === billing}
                              className="w-full py-5 rounded-3xl bg-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                           >
                              {isLoading === billing ? "Processing..." : `Start ${planSettings.trialDays}-Day Free Trial`}
                           </button>
                           <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest">Cancel anytime. No commitment.</p>
                        </div>
                     )}

                     {/* Lifetime Plan */}
                     {planSettings.lifetimeEnabled && (
                        <div className="bg-gradient-to-br from-forest-deep to-[#1a3827] rounded-[3rem] p-10 lg:p-12 text-white relative overflow-hidden shadow-2xl">
                           <div className="absolute top-8 right-8 opacity-20">
                              <Infinity className="h-20 w-20 text-gold" />
                           </div>
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4AF37/10,transparent_60%)]" />
                           <div className="relative z-10">
                              <div className="inline-block bg-gold/20 text-gold px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Best Value</div>
                              <div className="mb-10">
                                 <h3 className="font-display text-2xl font-bold mb-4">Lifetime Access</h3>
                                 <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black">${planSettings.lifetimePrice}</span>
                                    <span className="text-white/40 font-bold uppercase tracking-widest text-xs">One-Time</span>
                                 </div>
                                 <p className="text-white/50 text-xs mt-2 font-medium">Pay once. Watch forever.</p>
                              </div>
                              <ul className="space-y-5 mb-10">
                                 {["Everything in Premium", "Never pay again", "Access for the whole family", "All future content included", "Priority support"].map((f) => (
                                    <li key={f} className="flex items-center gap-3 font-bold text-white/90 text-sm">
                                       <Crown className="h-5 w-5 text-gold shrink-0" /> {f}
                                    </li>
                                 ))}
                              </ul>
                              <button
                                 onClick={() => handleSubscribe("lifetime")}
                                 disabled={isLoading === "lifetime"}
                                 className="w-full py-5 rounded-3xl bg-gold text-forest-deep font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                 {isLoading === "lifetime" ? "Processing..." : `Get Lifetime — $${planSettings.lifetimePrice}`}
                              </button>
                           </div>
                        </div>
                     )}

                     {/* Ministry Partner Plan */}
                     <div className="bg-gray-900 rounded-[3rem] p-10 lg:p-12 text-white relative">
                        <div className="mb-10">
                           <div className="inline-block bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Most Impactful</div>
                           <h3 className="font-display text-2xl font-bold mb-4">Ministry Partner</h3>
                           <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-black text-white">$14.99</span>
                              <span className="text-white/40 font-bold uppercase tracking-widest text-xs">/ Month</span>
                           </div>
                        </div>
                        <ul className="space-y-5 mb-10">
                           {["All Premium Access features", "Sponsor access for another family", "Early access to new productions", "Digital curriculum guides", "Quarterly mission report"].map((f) => (
                              <li key={f} className="flex items-center gap-3 font-bold text-white/90 text-sm">
                                 <Heart className="h-5 w-5 text-rose-500 shrink-0" /> {f}
                              </li>
                           ))}
                        </ul>
                        <button
                           onClick={() => handleSubscribe("monthly")}
                           disabled={isLoading === "ministry"}
                           className="w-full py-5 rounded-3xl bg-white text-gray-900 font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                        >
                           Become a Partner
                        </button>
                     </div>
                  </div>
               </div>
            </section>

            {/* Trust Badges */}
            <section className="py-24 bg-white">
               <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-12">
                  <div className="text-center">
                     <div className="mx-auto h-16 w-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                        <ShieldCheck className="h-8 w-8" />
                     </div>
                     <h4 className="font-bold text-gray-900 mb-2">Secure Checkout</h4>
                     <p className="text-sm text-gray-500">Industry-standard 256-bit SSL encryption for all transactions.</p>
                  </div>
                  <div className="text-center">
                     <div className="mx-auto h-16 w-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-6">
                        <Users className="h-8 w-8" />
                     </div>
                     <h4 className="font-bold text-gray-900 mb-2">Family Focused</h4>
                     <p className="text-sm text-gray-500">Every piece of content is hand-picked and vetted by our pastoral team.</p>
                  </div>
                  <div className="text-center">
                     <div className="mx-auto h-16 w-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                        <CreditCard className="h-8 w-8" />
                     </div>
                     <h4 className="font-bold text-gray-900 mb-2">No Surprises</h4>
                     <p className="text-sm text-gray-500">Clear pricing with no auto-renewal tricks. We'll remind you before any charge.</p>
                  </div>
               </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-forest-deep text-cream">
               <div className="mx-auto max-w-3xl px-6">
                  <div className="text-center mb-12">
                     <h2 className="font-display text-4xl font-bold">Loved by <span className="text-gold italic">Families</span></h2>
                  </div>
                  <div className="relative bg-white/5 backdrop-blur rounded-[3rem] p-12 border border-white/10">
                     <div className="flex gap-1 mb-6 justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                           <Star key={i} className="h-5 w-5 text-gold fill-gold" />
                        ))}
                     </div>
                     <p className="text-lg leading-relaxed text-cream/90 text-center italic mb-8">
                        "{TESTIMONIALS[activeSlide].quote}"
                     </p>
                     <div className="flex items-center justify-center gap-4">
                        <img src={TESTIMONIALS[activeSlide].avatar} alt={TESTIMONIALS[activeSlide].name} className="h-12 w-12 rounded-full object-cover border-2 border-gold/30" />
                        <div>
                           <div className="font-bold text-white">{TESTIMONIALS[activeSlide].name}</div>
                           <div className="text-xs text-cream/50">{TESTIMONIALS[activeSlide].role}</div>
                        </div>
                     </div>
                     <div className="flex justify-center gap-2 mt-8">
                        {TESTIMONIALS.map((_, i) => (
                           <button key={i} onClick={() => goToSlide(i)} className={`h-2 rounded-full transition-all ${i === activeSlide ? "w-8 bg-gold" : "w-2 bg-white/20"}`} />
                        ))}
                     </div>
                  </div>
               </div>
            </section>
         </main>
         <SiteFooter />
      </div>
   );
}
