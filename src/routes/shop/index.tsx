import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Star, Search, Tag, Shirt, Book, ExternalLink, ShoppingBag, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/")({
  component: ShopLandingPage,
});

const CATEGORIES = [
  { id: "all", label: "All Collections", icon: Tag },
  { id: "books", label: "Books", icon: Book },
  { id: "apparel", label: "Apparel", icon: Shirt },
];



function ShopLandingPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://movie-backend-drab.vercel.app/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesTab = activeTab === "all" || p.category === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    const currentCart = JSON.parse(localStorage.getItem('oms_cart') || '[]');
    const existingIndex = currentCart.findIndex((p: any) => p.id === product._id);
    if (existingIndex >= 0) {
      currentCart[existingIndex].quantity += 1;
    } else {
      currentCart.push({
        id: product._id,
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
        category: product.category
      });
    }
    localStorage.setItem('oms_cart', JSON.stringify(currentCart));
    toast.success(`${product.title} added to cart!`);
    window.dispatchEvent(new Event('cart_updated'));
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Store Hero - More Immersive with Video Background */}
        <section className="relative py-28 overflow-hidden bg-[#050704] text-cream">
          <div className="absolute inset-0 z-0 bg-[#050704]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 scale-105 transition-opacity duration-1000"
            >
              <source
                src="https://vjs.zencdn.net/v/oceans.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#050704]/30 via-transparent to-[#050704]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050704]/30 via-transparent to-[#050704]/30" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 flex flex-col items-center text-center z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 text-[10px] font-bold tracking-[0.3em] text-gold uppercase backdrop-blur-sm mb-8 animate-fade-up">
              <ShoppingBag className="w-3 h-3" /> Supporting the Mission
            </div>

            <h1 className="font-display text-6xl sm:text-8xl font-medium tracking-tight animate-fade-up [animation-delay:100ms]">
              The OMS <span className="italic text-gold">Store</span>
            </h1>

            <p className="mt-8 mx-auto max-w-2xl text-lg sm:text-xl text-cream/70 font-light leading-relaxed animate-fade-up [animation-delay:200ms]">
              Discover our curated collections on Amazon and Etsy. Every purchase helps us create more faith-building content for the next generation.
            </p>

            <div className="mt-12 w-full max-w-xl animate-fade-up [animation-delay:300ms]">
              <div className="relative flex items-center rounded-2xl bg-cream/5 border border-cream/10 p-1.5 backdrop-blur-md focus-within:ring-2 focus-within:ring-gold/30 transition-all">
                <Search className="ml-4 h-5 w-5 text-cream/30" />
                <input
                  type="text"
                  placeholder="Search the collections..."
                  className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none placeholder:text-cream/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="sticky top-24 z-40 bg-background/80 backdrop-blur-md border-b border-border py-4">
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-center gap-2 sm:gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`group flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === cat.id
                  ? "bg-forest-deep text-white shadow-lg shadow-forest-deep/20"
                  : "text-muted-foreground hover:text-forest-deep hover:bg-muted/50"
                  }`}
              >
                <cat.icon className={`h-3.5 w-3.5 transition-colors ${activeTab === cat.id ? "text-gold" : "text-muted-foreground group-hover:text-forest-deep"}`} />
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid - Premium Vertical Cards */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-16 border-b border-border pb-8">
              <div>
                <h2 className="font-display text-4xl font-medium text-foreground">Official <span className="italic text-primary">Library</span></h2>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Premium Marketplace Listings</p>
              </div>
              <div className="text-xs font-bold text-muted-foreground">{filteredProducts.length} Results</div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="group flex flex-col relative"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-muted shadow-card transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-elevated">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />

                      {/* Marketplace Badge */}
                      <div className="absolute top-6 left-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur shadow-sm border border-white/20">
                          <ShoppingBag className="w-3 h-3 text-gold" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-forest-deep">{product.storeName}</span>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute inset-x-6 bottom-6 flex flex-col gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                          <div className="flex items-center gap-1 text-gold">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-[10px] font-bold text-white/80">{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full">
                           <button 
                             onClick={(e) => handleAddToCart(e, product)}
                             className="flex-1 py-4 rounded-2xl bg-gold text-forest-deep text-[10px] font-bold uppercase tracking-[0.2em] text-center shadow-lg transition-transform active:scale-95"
                           >
                             Add to Cart
                           </button>
                           {product.externalLink && product.externalLink !== "#" && (
                             <a 
                               href={product.externalLink}
                               target="_blank"
                               rel="noopener noreferrer"
                               onClick={(e) => e.stopPropagation()}
                               className="flex-1 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-center shadow-lg transition-transform hover:bg-white/20 flex items-center justify-center active:scale-95"
                             >
                               {product.storeName || "Buy"}
                             </a>
                           )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 px-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-primary/60">{product.category}</span>
                        <div className="h-1 w-8 bg-border rounded-full transition-all group-hover:w-12 group-hover:bg-gold" />
                      </div>
                      <h3 className="font-display text-2xl font-medium text-foreground group-hover:text-primary transition-colors">{product.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.desc}</p>

                      <div className="pt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all">
                        View Details <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border-2 border-dashed border-border rounded-[3rem]">
                <p className="text-muted-foreground italic">No products match your current filters.</p>
                <button
                  onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
                  className="mt-4 text-sm font-bold text-primary uppercase tracking-widest hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
