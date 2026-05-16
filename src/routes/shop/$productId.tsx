import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { ShoppingCart, Star, ArrowLeft, Check, Minus, Plus, Share2, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/shop/$productId")({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:gap-3 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </Link>
        </div>

        {/* Product Layout */}
        <section className="pb-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Product Imagery */}
              <div className="space-y-6">
                <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-muted shadow-2xl border border-border">
                  <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1200" alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-muted border border-border overflow-hidden cursor-pointer hover:border-primary transition-all">
                      <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200" alt="Thumbnail" className="w-full h-full object-cover opacity-60 hover:opacity-100" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70">OMS Collection</span>
                  <h1 className="mt-4 font-display text-5xl font-medium tracking-tight text-foreground leading-tight">The Seed of <span className="italic text-primary">Wonder</span></h1>
                  <div className="mt-6 flex items-center gap-6">
                    <p className="text-3xl font-bold text-foreground">$18.99</p>
                    <div className="flex items-center gap-1 text-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-2 text-sm font-bold text-foreground/70">4.9 (124 Reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  A premium resource designed to inspire and ground your faith through the lens of creation. Each detail is crafted with care to provide lasting value for your ministry or home.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center rounded-full border border-border bg-muted/30 p-1">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 rounded-full flex items-center justify-center hover:bg-background transition-all"><Minus className="h-4 w-4" /></button>
                      <span className="w-12 text-center font-bold text-lg">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="h-12 w-12 rounded-full flex items-center justify-center hover:bg-background transition-all"><Plus className="h-4 w-4" /></button>
                    </div>
                    <button 
                      onClick={handleAddToCart}
                      className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg transition-all ${
                        added ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:scale-[1.02]"
                      }`}
                    >
                      {added ? <><Check className="h-5 w-5" /> Added to Cart</> : <><ShoppingCart className="h-5 w-5" /> Add to Cart</>}
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><Truck className="h-5 w-5" /></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Free Shipping Over $50</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><ShieldCheck className="h-5 w-5" /></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Secure Checkout</span>
                  </div>
                </div>

                {/* Additional Info Tabs Placeholder */}
                <div className="space-y-4 pt-10 border-t border-border">
                  {["Details", "Shipping", "Returns"].map((tab) => (
                    <button key={tab} className="w-full flex items-center justify-between py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground/70 border-b border-border/50 hover:text-primary transition-all">
                      {tab} <Plus className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
