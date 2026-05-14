import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Book, Star, ChevronRight, Search, Filter } from "lucide-react";

export const Route = createFileRoute("/books/")({
  component: BooksLandingPage,
});

const CATEGORIES = ["All", "Theology", "Nature", "Family", "Children", "Devotionals"];

const BOOKS = [
  {
    id: "the-seed-of-wonder",
    title: "The Seed of Wonder",
    author: "A. W. Tozer",
    category: "Theology",
    price: "$18.99",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "mountain-echoes",
    title: "Mountain Echoes",
    author: "Elizabeth Elliot",
    category: "Nature",
    price: "$24.50",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "the-creators-canvas",
    title: "The Creator's Canvas",
    author: "C. S. Lewis",
    category: "Nature",
    price: "$22.00",
    rating: 5.0,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "faith-for-little-hearts",
    title: "Faith for Little Hearts",
    author: "Sarah Edwards",
    category: "Children",
    price: "$14.99",
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1476081718509-d5d0b661a376?auto=format&fit=crop&q=80&w=800",
  },
];

import { useState } from "react";

function BooksLandingPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBooks = activeCategory === "All" 
    ? BOOKS 
    : BOOKS.filter(book => book.category === activeCategory);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Books Hero */}
        <section className="relative py-20 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_20%,var(--gold),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold/80 mb-6 block">OMS Library</span>
            <h1 className="font-display text-5xl sm:text-7xl font-medium tracking-tight">
              Stories that <span className="italic text-gold">Root</span> the Soul
            </h1>
            <p className="mt-8 mx-auto max-w-2xl text-lg text-cream/75 leading-relaxed">
              Explore our collection of cinematic literature, children's stories, and theological resources designed to inspire wonder and faith.
            </p>
            
            <div className="mt-12 flex max-w-md mx-auto items-center rounded-full bg-cream/10 border border-cream/20 p-2 backdrop-blur-md">
              <Search className="ml-4 h-5 w-5 text-cream/40" />
              <input type="text" placeholder="Search for titles, authors..." className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none placeholder:text-cream/30" />
              <button className="rounded-full bg-gold px-6 py-2 text-xs font-bold uppercase tracking-widest text-gold-foreground">Search</button>
            </div>
          </div>
        </section>

        {/* Categories & Filter */}
        <section className="sticky top-24 z-40 bg-background/80 backdrop-blur-md border-b border-border py-4">
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-muted ${
                    activeCategory === cat 
                      ? "bg-primary text-primary-foreground shadow-lg" 
                      : "bg-transparent text-muted-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-border text-xs font-bold uppercase tracking-widest hover:bg-muted">
              <Filter className="h-4 w-4" /> Filter
            </button>
          </div>
        </section>

        {/* Books Grid */}
        <section className="py-20 bg-background min-h-[600px]">
          <div className="mx-auto max-w-7xl px-6">
            {filteredBooks.length > 0 ? (
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in duration-500">
                {filteredBooks.map((book) => (
                  <Link key={book.id} to={`/books/${book.id}`} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted shadow-card transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-elevated">
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-6 left-6 right-6 flex justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                        <button className="rounded-full bg-cream px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-forest-deep shadow-lg">View Details</button>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70">{book.category}</p>
                      <h3 className="mt-2 font-display text-xl font-medium text-foreground group-hover:text-primary transition-colors">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="mt-3 flex items-center justify-center gap-3">
                        <span className="font-bold text-foreground">{book.price}</span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <div className="flex items-center gap-1 text-gold">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-[11px] font-bold text-foreground/70">{book.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-muted-foreground italic">No books found in this category.</p>
                <button 
                  onClick={() => setActiveCategory("All")}
                  className="mt-4 text-sm font-bold text-primary uppercase tracking-widest hover:underline"
                >
                  View All Books
                </button>
              </div>
            )}
            
            {filteredBooks.length > 0 && (
              <div className="mt-20 text-center">
                <button className="rounded-full border border-border px-10 py-4 text-sm font-bold uppercase tracking-widest text-foreground hover:bg-muted transition-all">
                  Load More Books
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
