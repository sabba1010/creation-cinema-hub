import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { Play, Sparkles, Tv, Music, Heart, Star, LayoutGrid, ChevronRight, CheckCircle2, ShieldCheck, Sun, Cloud, Anchor } from "lucide-react";

export const Route = createFileRoute("/kids/")({
  component: KidsLandingPage,
});

function KidsLandingPage() {
  const SERIES = [
    { title: "Friendly Forest", episodes: 12, img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=600", color: "bg-forest-deep" },
    { title: "Star Sailors", episodes: 8, img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600", color: "bg-gold" },
    { title: "Miracle Makers", episodes: 15, img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600", color: "bg-earth" },
    { title: "Bible Buddies", episodes: 24, img: "https://images.unsplash.com/photo-1519340241574-211915c54970?auto=format&fit=crop&q=80&w=600", color: "bg-sage" },
  ];

  const TOPICS = [
    { name: "Kindness", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
    { name: "Courage", icon: ShieldCheck, color: "text-forest-deep", bg: "bg-forest-deep/10" },
    { name: "Creation", icon: Sparkles, color: "text-gold", bg: "bg-gold/10" },
    { name: "Worship", icon: Music, color: "text-earth", bg: "bg-earth/10" },
    { name: "Honesty", icon: Star, color: "text-gold", bg: "bg-gold/5" },
    { name: "Joy", icon: Sun, color: "text-gold", bg: "bg-gold/10" },
    { name: "Peace", icon: Cloud, color: "text-sage", bg: "bg-sage/10" },
    { name: "Faith", icon: Anchor, color: "text-forest-deep", bg: "bg-forest-deep/5" },
  ];

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-forest-deep text-cream">
           <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-gold blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-sage blur-3xl animate-pulse delay-700" />
           </div>
           <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                 <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <Sparkles className="h-4 w-4 text-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Pure · Wonder · Faith</span>
                 </div>
                 <h1 className="font-display text-6xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
                    Where Wonder <br />
                    <span className="text-gold italic font-medium">Meets Faith</span>
                 </h1>
                 <p className="text-lg text-cream/70 max-w-lg mx-auto lg:mx-0">
                    The ultimate kid-safe streaming platform for Bible stories, character-building series, and wonder-filled adventures.
                 </p>
                 <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <Link to="/kids/subscribe" className="bg-gold text-forest-deep px-8 py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                       Start Free Trial
                    </Link>
                    <Link to="/kids/library" className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-5 rounded-3xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                       Browse Library
                    </Link>
                 </div>
              </div>
              <div className="relative aspect-square sm:aspect-video lg:aspect-square">
                 <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5 bg-forest-deep/50">
                    <img src="https://images.unsplash.com/photo-1502086223501-7ea2443054f1?auto=format&fit=crop&q=80&w=1200" alt="Kids Flix" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Link to="/kids/watch" className="h-24 w-24 rounded-full bg-gold text-forest-deep flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                          <Play className="h-10 w-10 fill-current ml-1" />
                       </Link>
                    </div>
                 </div>
                 {/* Floating Badges */}
                 <div className="absolute -top-6 -right-6 h-24 w-24 bg-gold rounded-full flex flex-col items-center justify-center text-forest-deep shadow-xl border-4 border-forest-deep animate-bounce">
                    <span className="text-xs font-black">NO</span>
                    <span className="text-[8px] font-bold uppercase tracking-tighter">ADS EVER</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Feature Navigation */}
        <section className="py-12 bg-cream/50 border-b border-cream/10">
           <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                   { label: "Series", to: "/kids/series", icon: Tv, color: "text-forest-deep", bg: "bg-forest-deep/10" },
                   { label: "Topics", to: "/kids/topics", icon: LayoutGrid, color: "text-earth", bg: "bg-earth/10" },
                   { label: "Videos", to: "/kids/library", icon: Play, color: "text-gold", bg: "bg-gold/10" },
                   { label: "Audio", to: "/kids/library", icon: Music, color: "text-sage", bg: "bg-sage/10" },
                 ].map((nav, i) => (
                   <Link key={i} to={nav.to} className="flex items-center gap-4 p-6 rounded-[2rem] hover:shadow-lg transition-all border border-transparent hover:border-cream/20 bg-white shadow-sm group">
                      <div className={`h-12 w-12 rounded-2xl ${nav.bg} ${nav.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                         <nav.icon className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-forest-deep tracking-wide">{nav.label}</span>
                   </Link>
                 ))}
              </div>
           </div>
        </section>

        {/* Browse By Series */}
        <section className="py-24">
           <div className="mx-auto max-w-7xl px-6">
              <div className="flex items-end justify-between mb-12">
                 <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2 block">Favorites</span>
                    <h2 className="font-display text-4xl font-bold text-forest-deep tracking-tight">Popular <span className="italic text-gold font-medium">Series</span></h2>
                 </div>
                 <Link to="/kids/series" className="text-sm font-bold text-forest-deep/40 hover:text-gold flex items-center gap-2 transition-colors">
                    View All <ChevronRight className="h-4 w-4" />
                 </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {SERIES.map((s, i) => (
                   <Link key={i} to="/kids/watch" className="group">
                      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-card mb-4">
                         <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                         <div className="absolute bottom-6 inset-x-6">
                            <span className={`inline-block px-3 py-1 rounded-full ${s.color} text-white text-[10px] font-bold uppercase tracking-widest mb-2 shadow-sm`}>
                               {s.episodes} Episodes
                            </span>
                            <h3 className="text-white font-bold text-xl">{s.title}</h3>
                         </div>
                      </div>
                   </Link>
                 ))}
              </div>
           </div>
        </section>

        {/* Browse By Topic */}
        <section className="py-24 bg-forest-deep/5 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-20 opacity-5">
              <Star className="h-64 w-64 text-gold" />
           </div>
           <div className="mx-auto max-w-7xl px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                 <h2 className="font-display text-4xl font-bold text-forest-deep tracking-tight mb-4">Browse by <span className="italic text-gold font-medium">Topic</span></h2>
                 <p className="text-forest-deep/60">Find stories that help grow specific character traits and values.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {TOPICS.map((t, i) => (
                   <Link key={i} to="/kids/topics" className="p-10 rounded-[3rem] bg-white border border-cream/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all text-center group">
                      <div className={`mx-auto h-16 w-16 rounded-3xl bg-cream flex items-center justify-center ${t.color} mb-6 group-hover:bg-gold group-hover:text-forest-deep transition-colors`}>
                         <t.icon className="h-8 w-8" />
                      </div>
                      <span className="font-bold text-lg text-forest-deep">{t.name}</span>
                   </Link>
                 ))}
              </div>
           </div>
        </section>

        {/* Subscription Info */}
        <section className="py-24">
           <div className="mx-auto max-w-7xl px-6">
              <div className="bg-forest-deep rounded-[3rem] p-12 lg:p-20 text-cream relative overflow-hidden shadow-2xl border border-white/5">
                 <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 text-center lg:text-left">
                       <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                          Unlimited <span className="text-gold">Wonder</span> <br />
                          for just $4.99/mo
                       </h2>
                       <ul className="space-y-4 max-w-md mx-auto lg:mx-0">
                          {["Ad-free experience", "Offline viewing", "New content every week", "Up to 5 profiles"].map((f) => (
                            <li key={f} className="flex items-center gap-4 font-bold text-cream/90">
                               <CheckCircle2 className="h-6 w-6 text-gold" /> {f}
                            </li>
                          ))}
                       </ul>
                       <Link to="/kids/subscribe" className="inline-block bg-gold text-forest-deep px-10 py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                          Start 7-Day Trial
                       </Link>
                    </div>
                    <div className="hidden lg:block relative">
                       <div className="absolute -inset-10 bg-gold/10 blur-3xl rounded-full" />
                       <img src="https://images.unsplash.com/photo-1512418490979-92798ccc1380?auto=format&fit=crop&q=80&w=800" alt="Family" className="relative rounded-[2rem] shadow-2xl rotate-3 border-4 border-white/10" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Safe Badge */}
        <section className="py-12">
           <div className="mx-auto max-w-7xl px-6 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-sage/10 text-sage flex items-center justify-center mb-6">
                 <ShieldCheck className="h-10 w-10" />
              </div>
              <h3 className="font-bold text-xl text-forest-deep mb-2">100% Kid-Safe & Parent-Approved</h3>
              <p className="text-forest-deep/40 max-w-md text-sm">No ads, no algorithms, just pure wonder-filled content rooted in Scripture.</p>
           </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
