import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ShoppingCart, Star, Filter, Search, Tag, Cpu, Shirt, Book } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/shop/")({
  component: ShopLandingPage,
});

const CATEGORIES = [
  { id: "all", label: "All Products", icon: Tag },
  { id: "books", label: "Books", icon: Book },
  { id: "apparel", label: "Apparel", icon: Shirt },
  { id: "digital", label: "Digital", icon: Cpu },
];

const PRODUCTS = [
  {
    id: "seed-of-wonder-book",
    title: "The Seed of Wonder",
    category: "books",
    price: 18.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    desc: "A timeless exploration of divine presence in creation.",
  },
  {
    id: "oms-signature-hoodie",
    title: "OMS Signature Hoodie",
    category: "apparel",
    price: 45.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    desc: "Premium heavyweight organic cotton with embroidered logo.",
  },
  {
    id: "prayer-meditation-album",
    title: "Prayer Meditation Album",
    category: "digital",
    price: 12.00,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    desc: "Digital download of 12 atmospheric worship tracks.",
  },
  {
    id: "creation-story-tee",
    title: "Creation Story Tee",
    category: "apparel",
    price: 28.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    desc: "Soft-wash cotton tee featuring hand-drawn artwork.",
  },
  {
    id: "nature-study-workbook",
    title: "Nature Study Workbook",
    category: "books",
    price: 22.50,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    desc: "Interactive guide for kids and families.",
  },
  {
    id: "ministry-bundle-2026",
    title: "Ministry Digital Bundle",
    category: "digital",
    price: 99.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    desc: "Full year of curriculum and media assets.",
  },
];

function ShopLandingPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesTab = activeTab === "all" || p.category === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Shop Hero */}
        <section className="relative py-20 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_right_bottom,var(--gold),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 flex flex-col items-center text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold/80 mb-6 block">Support the Ministry</span>
            <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight">
              The OMS <span className="italic text-gold">Shop</span>
            </h1>
            <p className="mt-8 mx-auto max-w-2xl text-lg text-cream/75 leading-relaxed">
              Every purchase directly supports our mission to create faith-centered media for families around the world.
            </p>
            
            <div className="mt-12 flex w-full max-w-md items-center rounded-full bg-cream/10 border border-cream/20 p-2 backdrop-blur-md">
              <Search className="ml-4 h-5 w-5 text-cream/40" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none placeholder:text-cream/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="sticky top-24 z-40 bg-background/80 backdrop-blur-md border-b border-border py-6">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-3 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === cat.id 
                      ? "bg-primary text-primary-foreground shadow-lg" 
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <cat.icon className="h-4 w-4" /> {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-20 bg-background min-h-[600px]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-2xl font-medium text-foreground capitalize">{activeTab} Products</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{filteredProducts.length} Results</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <Link 
                    key={product.id} 
                    to={`/shop/${product.id}`}
                    className="group"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-muted shadow-card transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-elevated">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                        <button className="rounded-full bg-cream p-4 text-forest-deep shadow-lg hover:scale-110 transition">
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                        <span className="rounded-full bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-gold-foreground">View Product</span>
                      </div>
                    </div>
                    <div className="mt-8 text-center px-4">
                      <h3 className="font-display text-2xl font-medium text-foreground group-hover:text-primary transition-colors">{product.title}</h3>
                      <div className="mt-3 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1 text-gold">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs font-bold text-foreground/70">{product.rating}</span>
                        </div>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span className="font-bold text-lg text-foreground">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-border rounded-[3rem]">
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
