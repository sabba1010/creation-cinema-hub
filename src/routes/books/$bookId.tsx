import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { Star, ArrowLeft, ShoppingCart, BookOpen, Quote, ChevronRight, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/books/$bookId")({
  component: IndividualBookPage,
});

const REVIEWS = [
  { user: "John Doe", rating: 5, comment: "An absolutely transformative read. The way it connects nature with faith is profound.", date: "2 days ago" },
  { user: "Sarah Smith", rating: 4, comment: "Beautifully written and illustrated. My kids love the stories.", date: "1 week ago" },
  { user: "Michael Chen", rating: 5, comment: "A masterpiece of modern theology. Highly recommended for any library.", date: "1 month ago" },
];

function IndividualBookPage() {
  const { bookId } = Route.useParams();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Breadcrumb / Back */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link to="/books" className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:gap-3 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Library
          </Link>
        </div>

        {/* Book Main Section */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-3xl transition-all" />
                <div className="relative overflow-hidden rounded-[2rem] shadow-2xl bg-muted aspect-[3/4]">
                  <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" alt="Book Cover" className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70">Theology & Wonder</span>
                <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium tracking-tight text-foreground leading-tight">
                  The Seed of <span className="italic text-primary">Wonder</span>
                </h1>
                <p className="mt-4 text-xl text-muted-foreground font-light">By A. W. Tozer</p>
                
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gold">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-2 font-bold text-foreground">4.9</span>
                  </div>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">124 Reviews</span>
                </div>

                <p className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  A timeless exploration of the divine presence in the smallest details of creation. This book invites readers to slow down and see the world as a sacred canvas of the Creator's heart.
                </p>

                <div className="mt-12 p-8 rounded-3xl bg-cream/5 border border-border">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Hardcover Edition</p>
                      <p className="text-4xl font-bold text-foreground">$18.99</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg transition hover:bg-primary/90 hover:-translate-y-1">
                        <ShoppingCart className="h-4 w-4" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-8">
                  <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:gap-3 transition-all">
                    <BookOpen className="h-4 w-4" /> {showPreview ? 'Hide Preview' : 'Read Sample Preview'}
                  </button>
                  <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors">
                    Share Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Preview Section */}
        {showPreview && (
          <section className="py-24 bg-muted/30 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="mx-auto max-w-4xl px-6">
              <div className="relative p-12 rounded-[2.5rem] bg-background shadow-xl border border-border">
                <Quote className="absolute top-10 left-10 h-12 w-12 text-primary/10" />
                <div className="relative font-serif text-xl sm:text-2xl leading-loose text-foreground/90 italic">
                  "To the eyes of faith, every grain of sand is a testament, every morning mist a whisper of the Eternal. We do not look for God beyond the world, but through it. The seed of wonder is planted in the ordinary, waiting for the soul to wake and witness..."
                </div>
                <div className="mt-10 border-t border-border pt-10 text-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">— Excerpt from Chapter 1: The Waking Eye</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <section className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h2 className="font-display text-4xl font-medium text-foreground">Reader <span className="italic text-primary">Reviews</span></h2>
                <p className="mt-4 text-muted-foreground">Hear from those who have journeyed through these pages.</p>
              </div>
              <button className="rounded-full border border-border px-8 py-3 text-sm font-bold uppercase tracking-widest text-foreground hover:bg-muted transition-all">
                Write a Review
              </button>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {REVIEWS.map((review, i) => (
                <div key={i} className="p-8 rounded-3xl bg-card border border-border shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{review.user}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{review.comment}"</p>
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
