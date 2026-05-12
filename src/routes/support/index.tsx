import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Heart, Globe, Users, TrendingUp, DollarSign, Calendar, ShieldCheck, CheckCircle2, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/support/")({
  component: SupportPage,
});

function SupportPage() {
  const [givingType, setGivingType] = useState<"one-time" | "monthly">("monthly");
  const [amount, setAmount] = useState<string>("50");
  const [showSuccess, setShowSuccess] = useState(false);

  const AMOUNTS = ["10", "25", "50", "100", "250", "Custom"];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000" alt="Giving" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold mb-6 block">Fuel the Mission</span>
            <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight mb-8">
              Partner with <span className="italic text-gold">Wonder</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-cream/70 leading-relaxed">
              Your generosity enables One Mustard Seed to create cinematic media that grounds faith in the beauty of creation. Together, we can reach the next generation.
            </p>
          </div>
        </section>

        {/* Donation Hub */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <div>
                <h2 className="font-display text-4xl font-medium">Invest in the <span className="italic text-primary">Kingdom</span></h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Every dollar goes directly toward the production of high-fidelity films, podcasts, and resources for families and churches worldwide.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl bg-muted/30 border border-border">
                   <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <TrendingUp className="h-6 w-6" />
                   </div>
                   <h3 className="font-bold text-lg mb-2">Sustainable Impact</h3>
                   <p className="text-sm text-muted-foreground">Monthly giving provides the reliable funding needed for long-term production cycles.</p>
                </div>
                <div className="p-8 rounded-3xl bg-muted/30 border border-border">
                   <div className="h-12 w-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-6">
                      <Globe className="h-6 w-6" />
                   </div>
                   <h3 className="font-bold text-lg mb-2">Global Reach</h3>
                   <p className="text-sm text-muted-foreground">We distribute our content freely to mission fields and under-resourced schools globally.</p>
                </div>
              </div>
            </div>

            <div className="relative p-10 rounded-[2.5rem] bg-card border border-border shadow-2xl overflow-hidden">
              {showSuccess ? (
                <div className="absolute inset-0 bg-card z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-500">
                  <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-display font-medium mb-4">Thank You!</h3>
                  <p className="text-muted-foreground">Your contribution has been received. A receipt will be sent to your email shortly.</p>
                  <button onClick={() => setShowSuccess(false)} className="mt-8 text-xs font-bold uppercase tracking-widest text-primary">Make another gift</button>
                </div>
              ) : null}

              <div className="flex bg-muted rounded-2xl p-1 mb-10">
                <button 
                  onClick={() => setGivingType("monthly")}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${givingType === "monthly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setGivingType("one-time")}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${givingType === "one-time" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  One-time
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-10">
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`py-4 rounded-2xl border font-bold text-lg transition-all ${amount === amt ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
                  >
                    {amt === "Custom" ? amt : `$${amt}`}
                  </button>
                ))}
              </div>

              <form onSubmit={handleDonate} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                      <input required type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/40" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                      <input required type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/40" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                   <input required type="email" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/40" />
                </div>
                <button type="submit" className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                   Complete Donation <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                   <ShieldCheck className="h-3 w-3 text-emerald-500" /> Secure SSL Encrypted
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Mission & Impact */}
        <section className="py-24 bg-forest-deep text-cream">
           <div className="mx-auto max-w-7xl px-6">
              <div className="text-center mb-16">
                 <h2 className="font-display text-4xl font-medium">Mission & <span className="italic text-gold">Impact</span></h2>
                 <p className="mt-4 text-cream/60">The quantifiable fruit of your partnership.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                   { label: "Lives Impacted", val: "2.4M+", icon: Users },
                   { label: "Films Produced", val: "48", icon: DollarSign },
                   { label: "Countries Reached", val: "162", icon: Globe },
                   { label: "Years of Ministry", val: "12", icon: Calendar },
                 ].map((stat, i) => (
                   <div key={i} className="p-10 rounded-[2rem] bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all group">
                      <div className="mx-auto h-12 w-12 rounded-xl bg-gold/20 text-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                         <stat.icon className="h-6 w-6" />
                      </div>
                      <div className="text-3xl font-bold mb-2">{stat.val}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-cream/40">{stat.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Sponsorships & Campaigns */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
             <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                   <h3 className="font-display text-3xl font-medium">Active <span className="italic text-primary">Campaigns</span></h3>
                   <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        { title: "Friendly Forest Series", goal: "$45k", raised: "$28k", img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=600" },
                        { title: "Global Resource Kits", goal: "$12k", raised: "$9.5k", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600" },
                      ].map((cam, i) => (
                        <div key={i} className="group cursor-pointer">
                           <div className="relative aspect-video rounded-3xl overflow-hidden mb-4">
                              <img src={cam.img} alt={cam.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                           </div>
                           <h4 className="font-bold text-lg">{cam.title}</h4>
                           <div className="mt-4 space-y-2">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                 <span className="text-primary">{cam.raised} raised</span>
                                 <span className="text-muted-foreground">{cam.goal} goal</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                 <div className="h-full bg-primary" style={{ width: '65%' }} />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-card border border-border shadow-xl space-y-8">
                   <h3 className="font-display text-2xl font-medium">Corporate <span className="italic text-primary">Sponsorship</span></h3>
                   <p className="text-sm text-muted-foreground leading-relaxed">
                     Align your brand with world-class faith media. We offer unique sponsorship opportunities for our major film releases and live events.
                   </p>
                   <ul className="space-y-4">
                      {["Screening Credits", "Co-Branded Resources", "Live Event VIP", "Founding Partner Status"].map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm font-medium">
                           <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                        </li>
                      ))}
                   </ul>
                   <button className="w-full py-4 rounded-xl border border-border font-bold text-xs uppercase tracking-widest hover:bg-muted transition-all">Download Media Kit</button>
                </div>
             </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 text-center">
             <div className="flex justify-center gap-12 flex-wrap">
                <div className="flex items-center gap-3">
                   <Mail className="h-5 w-5 text-primary" />
                   <span className="text-sm font-bold">giving@onemustardseed.com</span>
                </div>
                <div className="flex items-center gap-3">
                   <Phone className="h-5 w-5 text-primary" />
                   <span className="text-sm font-bold">+1 (800) 555-SEED</span>
                </div>
                <div className="flex items-center gap-3">
                   <MapPin className="h-5 w-5 text-primary" />
                   <span className="text-sm font-bold">Luminara Plaza, OMS Square</span>
                </div>
             </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
