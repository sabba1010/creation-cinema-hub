import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { CheckCircle2, ShieldCheck, Heart, Users, CreditCard, Sparkles, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/kids/subscribe")({
  component: KidsSubscribePage,
});

function KidsSubscribePage() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Header */}
        <section className="py-20 text-center">
           <div className="mx-auto max-w-3xl px-6">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-8">
                 <Sparkles className="h-4 w-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Limited Time Offer</span>
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

              <div className="grid lg:grid-cols-2 gap-12 max-w-5xl w-full">
                 {/* Main Plan */}
                 <div className="bg-white rounded-[3rem] p-12 lg:p-16 border-2 border-blue-600 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-10 right-10 opacity-10">
                       <Star className="h-24 w-24 text-blue-600" />
                    </div>
                    <div className="mb-12">
                       <h3 className="font-display text-3xl font-bold text-gray-900 mb-4 tracking-tight">Premium Access</h3>
                       <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black text-gray-900">{billing === "monthly" ? "$4.99" : "$49.99"}</span>
                          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{billing === "monthly" ? "/ Month" : "/ Year"}</span>
                       </div>
                    </div>
                    <ul className="space-y-6 mb-12">
                       {[
                         "Unlimited ad-free streaming",
                         "Download & watch offline",
                         "Weekly new show releases",
                         "Up to 5 family profiles",
                         "Parental control dashboard"
                       ].map((f) => (
                         <li key={f} className="flex items-center gap-4 font-bold text-gray-700">
                            <CheckCircle2 className="h-6 w-6 text-emerald-500" /> {f}
                         </li>
                       ))}
                    </ul>
                    <button className="w-full py-6 rounded-3xl bg-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                       Start 7-Day Free Trial
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">Cancel anytime. No commitment.</p>
                 </div>

                 {/* Ministry Partner Plan */}
                 <div className="bg-gray-900 rounded-[3rem] p-12 lg:p-16 text-white relative">
                    <div className="mb-12">
                       <div className="inline-block bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Most Impactful</div>
                       <h3 className="font-display text-3xl font-bold mb-4 tracking-tight">Ministry Partner</h3>
                       <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black text-white">$14.99</span>
                          <span className="text-white/40 font-bold uppercase tracking-widest text-xs">/ Month</span>
                       </div>
                    </div>
                    <ul className="space-y-6 mb-12">
                       {[
                         "All Premium Access features",
                         "Sponsor access for another family",
                         "Early access to new productions",
                         "Digital curriculum guides",
                         "Quarterly mission report"
                       ].map((f) => (
                         <li key={f} className="flex items-center gap-4 font-bold text-white/90">
                            <Heart className="h-6 w-6 text-rose-500" /> {f}
                         </li>
                       ))}
                    </ul>
                    <button className="w-full py-6 rounded-3xl bg-white text-gray-900 font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
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
      </main>
      <SiteFooter />
    </div>
  );
}
