import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

const INITIAL_ITEMS = [
  {
    id: 1,
    name: "The Creation Case Box Set",
    price: 49.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300",
    category: "DVD & Digital"
  },
  {
    id: 2,
    name: "Faith & Science Study Guide",
    price: 24.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300",
    category: "Books"
  }
];

function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-12 w-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
               <h1 className="font-display text-4xl font-medium italic">Your Collection</h1>
               <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mt-1">{items.length} Items in cart</p>
            </div>
          </div>

          {items.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-16 items-start">
              <div className="lg:col-span-2 space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-8 p-8 rounded-[2rem] bg-card border border-border shadow-sm group hover:shadow-md transition-all">
                    <div className="h-32 w-32 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-grow space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1 block">{item.category}</span>
                          <h3 className="font-display text-xl font-medium text-foreground">{item.name}</h3>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="h-8 w-8 rounded-lg hover:bg-card flex items-center justify-center transition-colors">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="h-8 w-8 rounded-lg hover:bg-card flex items-center justify-center transition-colors">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-8 sticky top-32">
                <div className="p-10 rounded-[2.5rem] bg-forest-deep text-cream shadow-2xl">
                  <h3 className="font-display text-2xl font-medium mb-8">Order Summary</h3>
                  <div className="space-y-4 text-sm font-medium opacity-80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-bold opacity-100 text-gold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full mt-10 py-5 rounded-2xl bg-gold text-forest-deep font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                    Checkout Now <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/50">
                      <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                         <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                         Secure Checkout with <br/><span className="text-foreground">SSL Encryption</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/50">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                         <Truck className="h-5 w-5" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                         Free Shipping on <br/><span className="text-foreground">Orders Over $100</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-32 bg-card rounded-[3rem] border border-dashed border-border">
              <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="font-display text-3xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-10 max-w-sm mx-auto">Explore our resource hub to find cinematic media and educational tools for your journey.</p>
              <Link to="/shop" className="inline-flex py-4 px-10 rounded-2xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
