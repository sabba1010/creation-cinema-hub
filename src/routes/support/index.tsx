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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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

        {/* Removed Fake Live Impact and Testimonials */}
      </main>
      <SiteFooter />
    </div>
  );
}
