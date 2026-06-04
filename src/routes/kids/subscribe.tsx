import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CheckCircle2, ShieldCheck, Heart, Users, CreditCard, Sparkles, Star, Infinity, Zap, Crown, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

export const Route = createFileRoute("/kids/subscribe")({
  component: KidsSubscribePage,
});

function KidsSubscribePage() {
  const [billing, setBilling] = useState("monthly");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const TESTIMONIALS = [
    {
      quote: "KidsBibleFlix has completely changed how our family does screen time. Our kids beg to watch it every night and I'm always happy to say yes!",
      name: "Sarah M.",
      role: "Mother of 3 · Subscriber since 2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=80",
      stars: 5,
    },
    {
      quote: "We use KidsBibleFlix in our Sunday School classes every week. The Connection Guides make it so easy to lead discussions. Absolutely worth every penny.",
      name: "Pastor James T.",
      role: "Children's Ministry Director · Church subscriber",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80",
      stars: 5,
    },
    {
      quote: "My daughter used to fight screen time limits. Now she actually chooses KidsBibleFlix over other shows. The content is beautiful and meaningful.",
      name: "Priya K.",
      role: "Homeschool parent · Subscriber since 2023",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80",
      stars: 5,
    },
    {
      quote: "The lifetime plan was the best investment for our family. Knowing I'll never be charged again while my kids keep growing in faith — priceless.",
      name: "Marcus & Linda W.",
      role: "Parents · Lifetime members",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80",
      stars: 5,
    },
    {
      quote: "I was skeptical at first, but after the free trial our whole family was hooked. The Bible Buddies series is our 5-year-old's absolute favorite.",
      name: "Rachel O.",
      role: "Stay-at-home mom · Monthly subscriber",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80",
      stars: 5,
    },
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


  const handleSubscribe = async (plan: string, price: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
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
        navigate({ to: "/login" });
      } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
        navigate({ to: "/register" });
      }
      return;
    }

    setIsLoading(plan);
    await new Promise(r => setTimeout(r, 1500)); // Simulate checkout redirect

    Swal.fire({
      icon: "success",
      title: plan === "lifetime" ? "🎉 Lifetime Access Unlocked!" : "🎉 Subscription Active!",
      html: plan === "lifetime"
        ? `<p>You now have <strong>forever access</strong> to all KidsBibleFlix content for a one-time payment of <strong>${price}</strong>. Welcome to the family!</p>`
        : `<p>Your <strong>${billing === "monthly" ? "monthly" : "annual"} subscription</strong> of <strong>${price}</strong> is now active. Enjoy unlimited wonder!</p>`,
      confirmButtonColor: "#D4AF37",
      confirmButtonText: "Start Watching →",
    }).then(() => {
      // Grant access in localStorage for demo
      localStorage.setItem("kbf_access", plan === "lifetime" ? "lifetime" : billing);
      navigate({ to: "/kids/library" });
    });

    setIsLoading(null);
  };

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Header */}
        <section className="py-20 bg-forest-deep text-cream relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-8 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Kid-Safe Streaming</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Choose Your <span className="italic text-gold">Plan</span>
            </h1>
            <p className="text-cream/70 text-lg leading-relaxed">
              Join thousands of families. No ads, no algorithms — just pure, faith-filled content your kids will love.
            </p>
          </div>
        </section>

        {/* Pricing Toggle */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 flex flex-col items-center">
            <div className="bg-white border border-cream/20 p-2 rounded-3xl flex gap-2 mb-16 shadow-xl">
              {["monthly", "yearly"].map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${billing === b ? "bg-forest-deep text-white shadow-lg" : "text-forest-deep/40 hover:text-forest-deep"}`}
                >
                  {b === "monthly" ? "Monthly" : <>Yearly <span className="ml-2 bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">Save 20%</span></>}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8 w-full max-w-6xl">
              
              {/* Monthly/Yearly Plan */}
              <div className="bg-white rounded-[3rem] p-10 border-2 border-forest/20 shadow-xl relative flex flex-col">
                <div className="mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-forest/10 text-forest flex items-center justify-center mb-6">
                    <Zap className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-forest-deep mb-2">Premium Access</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-forest-deep">{billing === "monthly" ? "$4.99" : "$47.99"}</span>
                    <span className="text-forest-deep/40 font-bold uppercase tracking-widest text-xs">/ {billing === "monthly" ? "Month" : "Year"}</span>
                  </div>
                  {billing === "yearly" && <p className="text-emerald-600 text-xs font-bold mt-2">That's just $3.99/mo — save $12/year!</p>}
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {[
                    "Unlimited ad-free streaming",
                    "Download & watch offline",
                    "Weekly new releases",
                    "Up to 5 family profiles",
                    "Parental connection guides",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-forest-deep/80 text-sm font-medium">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe("monthly", billing === "monthly" ? "$4.99/mo" : "$47.99/yr")}
                  disabled={isLoading === "monthly"}
                  className="w-full py-5 rounded-2xl bg-forest-deep text-gold font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
                >
                  {isLoading === "monthly" ? "Processing..." : "Start 7-Day Free Trial"}
                </button>
                <p className="text-center text-[10px] text-forest-deep/40 mt-4 font-bold uppercase tracking-widest">Cancel anytime. No commitment.</p>
              </div>

              {/* Lifetime Plan — FEATURED */}
              <div className="bg-forest-deep rounded-[3rem] p-10 border-2 border-gold shadow-2xl relative flex flex-col">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gold/10 blur-3xl" />
                {/* Best Value badge inside the card */}
                <div className="flex justify-center mb-6">
                  <span className="bg-gold text-forest-deep text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">Best Value</span>
                </div>
                <div className="mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-gold/20 text-gold flex items-center justify-center mb-6">
                    <Infinity className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Lifetime Access</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-gold">$99</span>
                    <span className="text-cream/40 font-bold uppercase tracking-widest text-xs">One-time</span>
                  </div>
                  <p className="text-gold/80 text-xs font-bold mt-2">Pay once. Access forever. Never pay again.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {[
                    "Everything in Premium",
                    "Lifetime streaming access",
                    "All future content included",
                    "Priority support",
                    "Exclusive founder badge",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-cream/80 text-sm font-medium">
                      <CheckCircle2 className="h-5 w-5 text-gold shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe("lifetime", "$99")}
                  disabled={isLoading === "lifetime"}
                  className="w-full py-5 rounded-2xl bg-gold text-forest-deep font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
                >
                  {isLoading === "lifetime" ? "Processing..." : "Get Lifetime Access — $99"}
                </button>
                <p className="text-center text-[10px] text-cream/30 mt-4 font-bold uppercase tracking-widest">One-time payment. No subscriptions.</p>
              </div>

              {/* Ministry Partner Plan */}
              <div className="bg-white rounded-[3rem] p-10 border-2 border-cream/30 shadow-xl relative flex flex-col">
                <div className="mb-8">
                  <div className="h-14 w-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-6">
                    <Crown className="h-7 w-7" />
                  </div>
                  <div className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Most Impactful</div>
                  <h3 className="font-display text-2xl font-bold text-forest-deep mb-2">Ministry Partner</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-forest-deep">$14.99</span>
                    <span className="text-forest-deep/40 font-bold uppercase tracking-widest text-xs">/ Month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {[
                    "All Premium features",
                    "Sponsor access for another family",
                    "Early access to new productions",
                    "Digital curriculum guides",
                    "Quarterly mission report",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-forest-deep/80 text-sm font-medium">
                      <Heart className="h-5 w-5 text-rose-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe("ministry", "$14.99/mo")}
                  disabled={isLoading === "ministry"}
                  className="w-full py-5 rounded-2xl bg-forest-deep/5 text-forest-deep border border-forest/20 font-bold text-sm uppercase tracking-widest hover:bg-forest-deep hover:text-white hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
                >
                  {isLoading === "ministry" ? "Processing..." : "Become a Partner"}
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Trust & Guarantee Section */}
        <section className="relative bg-forest-deep overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl translate-x-1/2 translate-y-1/2" />

          {/* Stats Row */}
          <div className="relative border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 grid sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {[
                { stat: "10,000+", label: "Happy Families", sub: "joined this year" },
                { stat: "100%", label: "Ad-Free Guarantee", sub: "zero ads, zero tracking" },
                { stat: "30-Day", label: "Money Back Promise", sub: "no questions asked" },
              ].map((item, i) => (
                <div key={i} className="text-center py-8 sm:py-0 sm:px-12 first:pl-0 last:pr-0">
                  <div className="font-display text-5xl font-black text-gold mb-2">{item.stat}</div>
                  <div className="font-bold text-white text-base mb-1">{item.label}</div>
                  <div className="text-cream/40 text-xs uppercase tracking-widest font-bold">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badge Cards */}
          <div className="relative mx-auto max-w-7xl px-6 py-20">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Our Promise to You</span>
              <h2 className="font-display text-4xl font-bold text-white mt-3">
                Built on <span className="italic text-gold font-medium">Trust</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Secure Checkout",
                  desc: "Every transaction is protected with industry-standard 256-bit SSL encryption. Your payment details are never stored on our servers.",
                  badge: "SSL Protected",
                },
                {
                  icon: Users,
                  title: "Family First, Always",
                  desc: "Every video, song, and story is hand-reviewed by our pastoral and educational teams. We never publish content that hasn't passed our strict Bible-alignment review.",
                  badge: "Pastor Approved",
                },
                {
                  icon: CreditCard,
                  title: "Zero Hidden Fees",
                  desc: "What you see is what you pay. No auto-renewal surprises — we send a reminder email before every charge. Cancel anytime from your dashboard in seconds.",
                  badge: "Cancel Anytime",
                },
              ].map((item, i) => (
                <div key={i} className="group bg-white/5 backdrop-blur border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 hover:border-gold/30 transition-all duration-500">
                  <div className="h-16 w-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-forest-deep transition-colors duration-300">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <span className="inline-block text-[9px] font-black uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-4">{item.badge}</span>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div
            className="relative border-t border-white/10 bg-white/5 overflow-hidden"
            onMouseEnter={() => { if (autoplayRef.current) clearInterval(autoplayRef.current); }}
            onMouseLeave={() => { autoplayRef.current = setInterval(next, 4500); }}
          >
            <div className="mx-auto max-w-4xl px-6 py-16">
              {/* Quote icon */}
              <div className="flex justify-center mb-8">
                <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Quote className="h-5 w-5 text-gold" />
                </div>
              </div>

              {/* Slide content */}
              <div
                key={activeSlide}
                className="text-center transition-all duration-500 animate-fade-in"
                style={{ animation: "fadeSlideUp 0.5s ease forwards" }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-8">
                  {Array.from({ length: TESTIMONIALS[activeSlide].stars }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-xl sm:text-2xl font-display italic text-cream/90 leading-relaxed max-w-3xl mx-auto mb-10">
                  "{TESTIMONIALS[activeSlide].quote}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={TESTIMONIALS[activeSlide].avatar}
                    alt={TESTIMONIALS[activeSlide].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold/50"
                  />
                  <div className="text-left">
                    <p className="text-white font-bold">{TESTIMONIALS[activeSlide].name}</p>
                    <p className="text-cream/40 text-xs uppercase tracking-widest font-bold">{TESTIMONIALS[activeSlide].role}</p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mt-12">
                <button
                  onClick={prev}
                  className="h-10 w-10 rounded-full border border-white/20 text-cream/60 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`transition-all duration-300 rounded-full ${
                        activeSlide === i
                          ? "w-8 h-2 bg-gold"
                          : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="h-10 w-10 rounded-full border border-white/20 text-cream/60 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <style>{`
              @keyframes fadeSlideUp {
                from { opacity: 0; transform: translateY(16px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
