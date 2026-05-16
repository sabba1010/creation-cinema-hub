import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Calendar, MapPin, Ticket, Clock, ArrowRight, Sparkles, Share2 } from "lucide-react";
const eventImg = "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1200";
import { INITIAL_EVENTS } from "../data/events-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — One Mustard Seed" },
      { name: "description", content: "Join us for upcoming live events, workshops, and worship nights." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const featuredEvent = INITIAL_EVENTS.find(e => e.status === "Active") || INITIAL_EVENTS[0];
  const upcomingEvents = INITIAL_EVENTS.filter(e => e.id !== featuredEvent.id);

  return (
    <div className="bg-[#050704] min-h-screen flex flex-col text-cream selection:bg-gold/30">
      <SiteHeader />
      <main className="flex-grow">
        
        {/* Cinematic Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-24 overflow-hidden">
          {/* Immersive Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src={featuredEvent.image || eventImg} 
              className="w-full h-full object-cover opacity-30 scale-105 blur-sm" 
              alt="" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050704]/80 via-[#050704]/40 to-[#050704]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050704] via-transparent to-[#050704]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold uppercase tracking-[0.4em] text-gold backdrop-blur-md">
              <Sparkles className="w-3 h-3 animate-pulse" /> Live Experience
            </div>
            
            <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9]">
              Live <span className="italic text-gold block sm:inline">Events</span>
            </h1>
            
            <p className="mt-8 mx-auto max-w-2xl text-lg sm:text-xl text-cream/60 font-light leading-relaxed text-pretty">
              Step into a space where faith meets wonder. Join our global community for immersive gatherings designed to ground your life in the beauty of creation.
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <div className="h-12 w-px bg-gradient-to-b from-gold/50 to-transparent" />
            </div>
          </div>
        </section>

        {/* Featured Event - Dark Cinematic Layout */}
        <section className="relative py-32 bg-[#050704]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="relative overflow-hidden rounded-[3.5rem] bg-forest-deep/10 border border-cream/5 shadow-2xl group">
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,var(--gold),transparent_60%)]" />
              </div>

              <div className="relative grid lg:grid-cols-2 gap-0">
                {/* Visual side */}
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <img 
                    src={featuredEvent.image || eventImg} 
                    alt={featuredEvent.name} 
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050704] via-transparent to-transparent hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050704] via-transparent to-transparent lg:hidden" />
                </div>

                {/* Content side */}
                <div className="p-8 sm:p-16 lg:p-20 space-y-10 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-10 bg-gold/50" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Featured Event</span>
                    </div>
                    
                    <h2 className="font-display text-5xl sm:text-6xl font-light leading-[1.1]">
                      {featuredEvent.name.includes(':') ? (
                        featuredEvent.name.split(':').map((part, i) => (
                          <span key={i} className={i === 1 ? "italic text-gold block" : "block"}>
                            {part}{i === 0 ? ':' : ''}
                          </span>
                        ))
                      ) : (
                        featuredEvent.name
                      )}
                    </h2>
                    
                    <p className="text-lg text-cream/50 font-light leading-relaxed">
                      {featuredEvent.description || "Join thousands worldwide for a transformative week of prayer, worship, and biblical teaching."}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8 py-8 border-y border-cream/5">
                    <EventDetail icon={<Calendar className="w-5 h-5" />} label="Date" value={featuredEvent.date} />
                    <EventDetail icon={<MapPin className="w-5 h-5" />} label="Location" value={featuredEvent.location} />
                    <EventDetail icon={<Clock className="w-5 h-5" />} label="Daily Time" value="7:00 PM EST" />
                    <EventDetail icon={<Ticket className="w-5 h-5" />} label="Admission" value={featuredEvent.price} />
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-4">
                    <button className="px-10 py-4 rounded-full bg-gold text-gold-foreground font-bold text-sm uppercase tracking-widest shadow-glow hover:scale-105 active:scale-95 transition-all">
                      Reserve Your Spot
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream/40 hover:text-gold transition-colors">
                      <Share2 className="w-4 h-4" /> Share Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Grid - Dark Cinematic */}
        <section className="py-32 bg-[#050704]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-20">
              <div className="space-y-4">
                <div className="h-1 w-12 bg-gold rounded-full" />
                <h2 className="font-display text-4xl sm:text-5xl font-medium">Upcoming <span className="italic text-gold">Calendar</span></h2>
              </div>
              <div className="hidden sm:block text-xs font-bold uppercase tracking-widest text-cream/30">Explore {upcomingEvents.length} Gatherings</div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="group relative rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-10 transition-all hover:bg-white/[0.05] hover:border-gold/20 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-10">
                    <div className="px-3 py-1 rounded-lg bg-gold/10 text-[9px] font-bold uppercase tracking-widest text-gold border border-gold/20">
                       {event.status}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/30">{event.date.split(',')[0]}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-medium mb-4 group-hover:text-gold transition-colors">{event.name}</h3>
                  <p className="text-sm text-cream/40 leading-relaxed line-clamp-2 mb-8">{event.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cream/60">
                       <MapPin className="w-3.5 h-3.5 text-gold" /> {event.location}
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-gold-foreground transition-all">
                       <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
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

function EventDetail({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-2xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-widest text-cream/30">{label}</div>
        <div className="text-sm font-bold text-cream/90">{value}</div>
      </div>
    </div>
  );
}
