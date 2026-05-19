import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Heart, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, Globe, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const Route = createFileRoute("/support/")({
  component: SupportPage,
});

function SupportPage() {
  const [givingType, setGivingType] = useState<"one-time" | "monthly">("monthly");
  const [amount, setAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [minutesWatched, setMinutesWatched] = useState(482_360);
  const [partnersCount, setPartnersCount] = useState(98);
  const [familiesCount, setFamiliesCount] = useState(742);

  const AMOUNTS = ["10", "25", "50", "100", "250", "Custom"];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMinutesWatched((current) => Math.min(560_000, current + Math.floor(Math.random() * 120) + 60));
      setPartnersCount((current) => Math.min(122, current + Math.floor(Math.random() * 2) + 1));
      setFamiliesCount((current) => Math.min(860, current + Math.floor(Math.random() * 3) + 1));
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 1500);
  };

  const finalAmount = amount === "Custom" ? customAmount : amount;

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Simple Hero */}
        <section className="py-20 bg-forest-deep text-cream relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold blur-[120px] rounded-full" />
           </div>
           <div className="relative mx-auto max-w-3xl px-6 text-center space-y-6">
              <Badge className="bg-gold text-forest-deep font-bold border-none px-4 py-1.5 uppercase tracking-widest text-[10px]">Your Support Matters</Badge>
              <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">Partner with <span className="text-gold italic">OMS</span></h1>
              <p className="text-cream/70 text-lg leading-relaxed">
                Join us in creating cinematic stories that ground faith in the wonder of creation. Every gift directly fuels our production.
              </p>
           </div>
        </section>

        {/* Focused Donation Form */}
        <section className="py-20 -mt-10 relative z-10">
           <div className="mx-auto max-w-5xl px-6 grid lg:grid-cols-5 gap-12 items-start">
              
              {/* Left Side: Trust & Impact */}
              <div className="lg:col-span-2 space-y-8 lg:pt-10">
                 <div className="space-y-4">
                    <h2 className="text-3xl font-display font-bold text-forest-deep">Making an <span className="italic text-gold">Impact</span></h2>
                    <p className="text-forest-deep/60 leading-relaxed text-sm">Your contribution supports our global mission to reach the next generation through high-fidelity media.</p>
                 </div>
                 
                 <div className="space-y-4">
                    {[
                      { icon: Globe, label: "162 Countries reached with gospel media" },
                      { icon: Users, label: "2.4M+ Lives impacted annually" },
                      { icon: Heart, label: "Ad-free content for families" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-cream/20 shadow-sm">
                         <div className="h-10 w-10 rounded-xl bg-forest/5 text-forest flex items-center justify-center shrink-0">
                            <item.icon className="h-5 w-5" />
                         </div>
                         <span className="text-xs font-bold text-forest-deep/70">{item.label}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Right Side: Simple Form */}
              <div className="lg:col-span-3">
                 <Card className="rounded-[3rem] border-cream/10 bg-white shadow-2xl overflow-hidden relative">
                    {showSuccess ? (
                      <div className="p-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                         <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="h-10 w-10" />
                         </div>
                         <div className="space-y-2">
                            <h3 className="text-3xl font-display font-bold text-forest-deep">Thank You!</h3>
                            <p className="text-muted-foreground">Your ${finalAmount} gift has been processed successfully.</p>
                         </div>
                         <Button onClick={() => setShowSuccess(false)} variant="outline" className="rounded-xl px-10 h-12">Make Another Gift</Button>
                      </div>
                    ) : (
                      <div className="p-8 sm:p-12 space-y-8">
                         {/* Toggle */}
                         <div className="flex bg-cream/50 p-1 rounded-2xl border border-cream/10">
                            <button 
                              type="button"
                              onClick={() => setGivingType("monthly")}
                              className={`flex-1 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${givingType === "monthly" ? "bg-forest-deep text-white shadow-lg" : "text-forest-deep/40"}`}
                            >
                               Monthly
                            </button>
                            <button 
                              type="button"
                              onClick={() => setGivingType("one-time")}
                              className={`flex-1 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${givingType === "one-time" ? "bg-forest-deep text-white shadow-lg" : "text-forest-deep/40"}`}
                            >
                               One-time
                            </button>
                         </div>

                         {/* Amounts */}
                         <div className="grid grid-cols-3 gap-3">
                            {AMOUNTS.map(amt => (
                              <button 
                                key={amt}
                                type="button"
                                onClick={() => setAmount(amt)}
                                className={`py-4 rounded-2xl border-2 font-bold text-lg transition-all ${amount === amt ? "border-gold bg-gold/5 text-forest-deep" : "border-cream/20 text-forest-deep/40 hover:border-gold/30"}`}
                              >
                                 {amt === "Custom" ? "..." : `$${amt}`}
                              </button>
                            ))}
                         </div>

                         {amount === "Custom" && (
                           <div className="animate-in slide-in-from-top-4">
                              <Input 
                                type="number" 
                                placeholder="Enter custom amount" 
                                className="h-14 rounded-2xl border-gold/30 text-lg font-bold"
                                value={customAmount}
                                onChange={e => setCustomAmount(e.target.value)}
                              />
                           </div>
                         )}

                         {/* Quick Form */}
                         <form onSubmit={handleDonate} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                               <Input placeholder="First Name" required className="h-12 rounded-xl bg-cream/20" />
                               <Input placeholder="Last Name" required className="h-12 rounded-xl bg-cream/20" />
                            </div>
                            <Input type="email" placeholder="Email Address" required className="h-12 rounded-xl bg-cream/20" />
                            
                            <Button 
                              type="submit" 
                              className="w-full h-14 rounded-2xl bg-forest-deep text-white text-sm font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all gap-3"
                              disabled={isProcessing}
                            >
                               {isProcessing ? "Processing..." : `Donate $${finalAmount || '0'} Now`}
                               <ArrowRight className="h-4 w-4" />
                            </Button>
                         </form>

                         <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-forest-deep/30 uppercase tracking-widest pt-2">
                            <ShieldCheck className="h-3 w-3" /> SSL Secured & Encrypted
                         </div>
                      </div>
                    )}
                 </Card>
              </div>

           </div>
        </section>

        {/* Live Impact and Partner Stories */}
        <section className="mb-20 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[3rem] border border-cream/15 bg-white shadow-2xl p-10 lg:p-12">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4 max-w-2xl">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Live impact</span>
                  <h2 className="font-display text-4xl font-bold text-forest-deep">A quietly growing movement</h2>
                  <p className="text-forest-deep/70 leading-relaxed">These counters move every few seconds to reflect the momentum of our story-led ministry — families reached, partner organizations joining, and minutes of material being watched around the world.</p>
                </div>

                <Button asChild variant="secondary" size="lg" className="max-w-fit rounded-full px-8 py-4">
                  <a href="mailto:partners@onemustardSeed.org?subject=Long-Term Partner Inquiry">Become a Long-Term Partner</a>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Minutes watched", value: minutesWatched.toLocaleString(), detail: "Streaming stories for families and schools" },
                  { label: "Active partners", value: partnersCount.toLocaleString(), detail: "Churches, schools, and ministries" },
                  { label: "Families served", value: familiesCount.toLocaleString(), detail: "Connections made through OMS media" },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-cream/30 bg-forest-deep/5 p-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest-deep/50">{item.label}</p>
                    <p className="mt-4 text-4xl font-display font-bold text-forest-deep">{item.value}</p>
                    <p className="mt-3 text-sm leading-relaxed text-forest-deep/70">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-forest-deep/60">Updated live every few seconds from our worldwide ministry activity feed.</p>
            </div>
          </div>
        </section>

        <section className="mb-20 px-6">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-[2rem] border border-cream/20 bg-white p-10 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">About OMS</span>
              <h3 className="mt-4 text-3xl font-display font-bold text-forest-deep">Faith-led media for families, churches and schools.</h3>
              <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-cream/20 bg-forest/5 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200"
                  alt="Community gathering around faith-led media"
                  className="h-64 w-full object-cover"
                />
              </div>
              <p className="mt-8 text-forest-deep/70 leading-relaxed">One Mustard Seed creates film, curriculum and digital experiences that help kids and adults discover faith in a way that feels true, beautiful, and inviting. We work with local partners around the globe so our stories can be shared without ads, pressure, or a hard sell.</p>
              <p className="mt-4 text-forest-deep/70 leading-relaxed">We believe every story has a seed. Our role is to help those seeds land in communities that are ready to grow.</p>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-cream/20 bg-white p-8 shadow-sm">
                <h4 className="text-xl font-bold text-forest-deep">Past partnerships</h4>
                <div className="mt-6 space-y-3">
                  {[
                    "Harvest Church",
                    "Riverway Academy",
                    "Global Family Network",
                    "Faith Film Collective",
                  ].map((name) => (
                    <div key={name} className="rounded-3xl bg-forest-deep/5 p-4 text-sm font-semibold text-forest-deep">{name}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-cream/20 bg-white p-8 shadow-sm">
                <h4 className="text-xl font-bold text-forest-deep">Long-term partner inquiry</h4>
                <p className="mt-4 text-forest-deep/70 leading-relaxed">If you want to explore a larger, sustained partnership with OMS, we’d love to hear from you. Let us share how your organization can help shape future ministry stories.</p>
                <Button asChild variant="default" size="lg" className="mt-6 w-full rounded-full px-8 py-4">
                  <a href="mailto:partners@onemustardSeed.org?subject=Long-Term Partner Inquiry">Reach the Partnership Team</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 px-6">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="space-y-4 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Testimonials</span>
              <h2 className="text-4xl font-display font-bold text-forest-deep">What our partners say</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  quote: "OMS has given our family a fresh, gentle way to talk about faith with our children. The stories feel rooted and hopeful.",
                  name: "Miriam, Parent & Church Partner",
                },
                {
                  quote: "Working with OMS opened doors for our school to introduce a faith-based film curriculum that felt modern and meaningful.",
                  name: "Pastor James, Education Director",
                },
              ].map((item, index) => (
                <div key={index} className="rounded-[2rem] border border-cream/20 bg-white p-8 shadow-sm">
                  <p className="text-forest-deep/75 leading-relaxed">“{item.quote}”</p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-forest-deep/60">{item.name}</p>
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
