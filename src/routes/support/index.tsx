import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Heart, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, Globe, Users, BookOpen, Quote, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Progress } from "../../components/ui/progress";

export const Route = createFileRoute("/support/")({
   component: SupportPage,
});

function SupportPage() {
   const [givingType, setGivingType] = useState<"one-time" | "monthly" | "annual">("monthly");
   const [amount, setAmount] = useState<string>("50");
   const [customAmount, setCustomAmount] = useState<string>("");
   const [showSuccess, setShowSuccess] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);

   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");

   const [campaigns, setCampaigns] = useState<any[]>([]);
   const [selectedCampaign, setSelectedCampaign] = useState<string>("");
   const [isLegacy, setIsLegacy] = useState(false);

   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

   const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
   }, [emblaApi]);

   const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
   }, [emblaApi]);

   const testimonials = [
      { quote: "The quality of the films produced by OMS has given our family a trustworthy, ad-free environment to explore faith. Partnering with them was the easiest decision we made this year.", name: "Sarah & James W.", title: "Monthly Partners since 2022", initials: "S.W" },
      { quote: "We are thrilled to be part of a mission that prioritizes God's creation. The films are breathtaking and our kids love them.", name: "The Miller Family", title: "Project Supporters", initials: "M.F" },
      { quote: "Knowing my monthly gift goes directly toward producing high-quality Gospel media gives me immense joy. The transparency is unmatched.", name: "David L.", title: "Legacy Partner", initials: "D.L" }
   ];

   useEffect(() => {
      fetch("http://localhost:5000/api/campaigns")
         .then(res => res.json())
         .then(data => {
            if (data.success) {
               setCampaigns(data.data);
            }
         })
         .catch(err => console.error(err));
   }, []);

   const AMOUNTS = ["10", "25", "50", "100", "250", "Custom"];

   const handleDonate = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessing(true);

      const finalAmount = amount === "Custom" ? customAmount : amount;

      try {
         const res = await fetch("http://localhost:5000/api/donations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               firstName,
               lastName,
               email,
               amount: finalAmount,
               type: givingType,
               campaignId: selectedCampaign || null,
               isLegacy
            }),
         });

         if (res.ok) {
            setShowSuccess(true);
         } else {
            console.error("Donation failed");
         }
      } catch (error) {
         console.error("Error submitting donation:", error);
      } finally {
         setIsProcessing(false);
      }
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
               <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-5 gap-12 lg:gap-24 items-start">

                  {/* Left Side: Trust & Impact */}
                  <div className="lg:col-span-2 space-y-8 lg:pt-10">
                     <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-forest-deep">Making an <span className="italic text-gold">Impact</span></h2>
                        <p className="text-forest-deep/70 leading-relaxed text-base lg:text-lg">Your contribution supports our global mission to reach the next generation through high-fidelity media.</p>
                     </div>

                     <div className="space-y-5 mt-6">
                        {[
                           { icon: Globe, label: "162 Countries reached with gospel media" },
                           { icon: Users, label: "2.4M+ Lives impacted annually" },
                           { icon: Heart, label: "Ad-free content for families" },
                        ].map((item, i) => (
                           <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-cream/20 shadow-sm">
                              <div className="h-12 w-12 rounded-xl bg-forest/5 text-forest flex items-center justify-center shrink-0">
                                 <item.icon className="h-6 w-6" />
                              </div>
                              <span className="text-sm font-bold text-forest-deep/80">{item.label}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Right Side: Simple Form */}
                  <div className="lg:col-span-3">
                     <Card className="w-full max-w-xl mx-auto lg:ml-auto rounded-[3rem] border-cream/10 bg-white shadow-2xl overflow-hidden relative">
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
                                    className={`flex-1 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${givingType === "monthly" ? "bg-forest-deep text-white shadow-lg" : "text-forest-deep/40 hover:text-forest-deep"}`}
                                 >
                                    Monthly
                                 </button>
                                 <button
                                    type="button"
                                    onClick={() => setGivingType("annual")}
                                    className={`flex-1 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${givingType === "annual" ? "bg-forest-deep text-white shadow-lg" : "text-forest-deep/40 hover:text-forest-deep"}`}
                                 >
                                    Annual
                                 </button>
                                 <button
                                    type="button"
                                    onClick={() => setGivingType("one-time")}
                                    className={`flex-1 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${givingType === "one-time" ? "bg-forest-deep text-white shadow-lg" : "text-forest-deep/40 hover:text-forest-deep"}`}
                                 >
                                    One-time
                                 </button>
                              </div>

                              {campaigns.length > 0 && (
                                 <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-forest-deep/60">Direct My Gift To</label>
                                    <select
                                       className="w-full h-12 rounded-xl bg-cream/20 border-cream/50 text-forest-deep font-medium px-4 outline-none focus:ring-2 focus:ring-gold/50"
                                       value={selectedCampaign}
                                       onChange={(e) => setSelectedCampaign(e.target.value)}
                                    >
                                       <option value="">General Fund (Greatest Need)</option>
                                       {campaigns.map(c => (
                                          <option key={c._id} value={c._id}>{c.title}</option>
                                       ))}
                                    </select>
                                 </div>
                              )}

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
                                    <Input placeholder="First Name" required className="h-12 rounded-xl bg-cream/20" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    <Input placeholder="Last Name" required className="h-12 rounded-xl bg-cream/20" value={lastName} onChange={e => setLastName(e.target.value)} />
                                 </div>
                                 <Input type="email" placeholder="Email Address" required className="h-12 rounded-xl bg-cream/20" value={email} onChange={e => setEmail(e.target.value)} />

                                 <Button
                                    type="submit"
                                    className="w-full h-14 rounded-2xl bg-forest-deep text-white text-sm font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all gap-3"
                                    disabled={isProcessing}
                                 >
                                    {isProcessing ? "Processing..." : `Donate $${finalAmount || '0'} Now`}
                                    <ArrowRight className="h-4 w-4" />
                                 </Button>

                                 <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" id="legacy" className="rounded text-gold focus:ring-gold" checked={isLegacy} onChange={e => setIsLegacy(e.target.checked)} />
                                    <label htmlFor="legacy" className="text-xs text-forest-deep/60 cursor-pointer">I am interested in legacy or planned giving options.</label>
                                 </div>
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

            {/* Current Needs & Projected Goals (Campaigns) */}
            {campaigns.length > 0 && (
               <section className="py-20 bg-cream relative z-10 border-t border-forest/5">
                  <div className="mx-auto max-w-7xl px-6 space-y-12">
                     <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-[50px] leading-tight font-display font-bold text-forest-deep">Current <span className="italic text-gold">Needs</span></h2>
                        <p className="text-forest-deep/60 md:text-lg">Help us reach our funding goals for these specific projects and campaigns.</p>
                     </div>

                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campaigns.map(campaign => {
                           const percent = campaign.goalAmount > 0 ? Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)) : 0;
                           return (
                              <Card key={campaign._id} className="rounded-[2rem] border-none shadow-xl overflow-hidden bg-white">
                                 {campaign.image && (
                                    <div className="h-48 w-full bg-muted overflow-hidden">
                                       <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                                    </div>
                                 )}
                                 <CardHeader>
                                    <CardTitle className="text-[30px] leading-tight font-display text-forest-deep">{campaign.title}</CardTitle>
                                    <CardDescription className="line-clamp-2 text-base mt-2">{campaign.description}</CardDescription>
                                 </CardHeader>
                                 <CardContent className="space-y-4 pb-8">
                                    <div className="space-y-2">
                                       <div className="flex justify-between text-sm font-bold text-forest-deep">
                                          <span>${campaign.raisedAmount.toLocaleString()} raised</span>
                                          <span className="text-forest-deep/50">Goal: ${campaign.goalAmount.toLocaleString()}</span>
                                       </div>
                                       <Progress value={percent} className="h-2 bg-cream" indicatorColor="bg-gold" />
                                    </div>
                                    <Button
                                       variant="outline"
                                       className="w-full rounded-xl border-gold/50 text-gold hover:bg-gold/10"
                                       onClick={() => {
                                          setSelectedCampaign(campaign._id);
                                          window.scrollTo({ top: 0, behavior: 'smooth' });
                                       }}
                                    >
                                       Support this Project
                                    </Button>
                                 </CardContent>
                              </Card>
                           );
                        })}
                     </div>
                  </div>
               </section>
            )}

            {/* Financial Transparency & Testimonials */}
            <section className="py-24 bg-forest text-cream">
               <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                  <div className="space-y-8">
                     <Badge className="bg-white/10 text-cream font-bold border-none px-4 py-1.5 uppercase tracking-widest text-[10px]">Transparency</Badge>
                     <h2 className="text-4xl lg:text-5xl font-display font-bold">Financial <span className="italic text-gold">Stewardship</span></h2>
                     <p className="text-cream/70 leading-relaxed text-base lg:text-lg">
                        We are committed to full financial transparency. Over 85% of all donations go directly to our cinematic productions and gospel distributions. The remaining covers essential operations to keep the mission moving forward.
                     </p>
                     <div className="space-y-6 pt-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                           <span className="font-bold text-lg">Content Production</span>
                           <span className="text-gold font-bold text-xl">60%</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                           <span className="font-bold text-lg">Global Distribution</span>
                           <span className="text-gold font-bold text-xl">25%</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                           <span className="font-bold text-lg">Operations & Support</span>
                           <span className="text-gold font-bold text-xl">15%</span>
                        </div>
                     </div>
                  </div>

                  <div className="relative">
                     <div className="absolute inset-0 bg-gold/5 rounded-[3rem] -rotate-3 transform scale-105" />
                     <Card className="relative bg-[#050704] border-white/10 rounded-[3rem] p-10 text-cream shadow-2xl overflow-hidden">
                        <Quote className="h-10 w-10 text-gold/30 mb-6" />

                        <div className="overflow-hidden" ref={emblaRef}>
                           <div className="flex">
                              {testimonials.map((t, idx) => (
                                 <div key={idx} className="flex-[0_0_100%] min-w-0 pr-4">
                                    <p className="text-xl leading-relaxed italic mb-8">
                                       "{t.quote}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                       <div className="h-12 w-12 rounded-full bg-cream/10 flex items-center justify-center font-bold text-gold">
                                          {t.initials}
                                       </div>
                                       <div>
                                          <div className="font-bold">{t.name}</div>
                                          <div className="text-xs text-cream/50">{t.title}</div>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Slider Controls */}
                        <div className="absolute bottom-10 right-10 flex items-center gap-2">
                           <button onClick={scrollPrev} className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                              <ChevronLeft className="h-5 w-5 text-gold" />
                           </button>
                           <button onClick={scrollNext} className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                              <ChevronRight className="h-5 w-5 text-gold" />
                           </button>
                        </div>
                     </Card>
                  </div>
               </div>
            </section>

            {/* Donor Events & Sponsorships */}
            <section className="py-20 bg-forest-deep text-cream text-center border-t border-white/10">
               <div className="mx-auto max-w-3xl px-6 space-y-8">
                  <Sparkles className="h-12 w-12 text-gold mx-auto" />
                  <h2 className="text-3xl font-display font-bold">Donor Events & <span className="italic text-gold">Sponsorships</span></h2>
                  <p className="text-cream/70 leading-relaxed">
                     Are you a business owner or major donor looking to sponsor an upcoming premiere or partner with us for a specific event? We host exclusive donor update calls and events to show our appreciation.
                  </p>
                  <Link to="/contact">
                     <Button className="bg-gold text-forest-deep rounded-xl px-8 h-12 font-bold hover:bg-gold/90">
                        Contact Major Giving Team
                     </Button>
                  </Link>
               </div>
            </section>

         </main>
         <SiteFooter />
      </div>
   );
}
