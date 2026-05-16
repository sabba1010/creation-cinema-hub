import { Calendar, MapPin, Ticket, ArrowRight, Sparkles, Clock, Users } from "lucide-react";
import { INITIAL_EVENTS } from "@/data/events-data";

export function Events() {
  const featuredEvent = INITIAL_EVENTS.find(e => e.status === "Active") || INITIAL_EVENTS[0];
  const otherEvents = INITIAL_EVENTS.filter(e => e.id !== featuredEvent.id).slice(0, 3);

  return (
    <section id="events" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-deep shadow-elevated group">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/10 blur-[100px]" />
            <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-sky/5 blur-[100px]" />
          </div>

          <div className="relative grid items-stretch gap-0 lg:grid-cols-2 min-h-[550px]">
            
            {/* Visual Side - Fixed Height Sync */}
            <div className="relative h-full overflow-hidden">
              <img 
                src={featuredEvent.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80"} 
                alt={featuredEvent.name} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent" />
              
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-forest-deep/40 border border-cream/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cream backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" /> Featured Event
              </div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 text-cream">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-lg bg-gold/10 border border-gold/20 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  Upcoming Event
                </div>
                
                <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-light leading-[1.1] tracking-tight">
                  {featuredEvent.name.includes(':') ? (
                    featuredEvent.name.split(':').map((part, i) => (
                      <span key={i} className={i === 1 ? "italic text-gold block mt-1" : "block"}>
                        {part}{i === 0 ? ':' : ''}
                      </span>
                    ))
                  ) : (
                    <span className="block">{featuredEvent.name}</span>
                  )}
                </h2>
                
                <p className="max-w-md text-base text-cream/70 font-light leading-relaxed">
                  {featuredEvent.description || "Join us for a transformative experience that grounds your faith in the wonder of creation."}
                </p>
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-2 gap-8 mt-10 border-t border-cream/10 pt-8">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-gold/60">
                    <Calendar className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Date</span>
                  </div>
                  <div className="text-sm font-bold">{featuredEvent.date}</div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-gold/60">
                    <MapPin className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Location</span>
                  </div>
                  <div className="text-sm font-bold truncate">{featuredEvent.location}</div>
                </div>
              </div>

              {/* Countdown Card - Balanced Size */}
              <div className="mt-10 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-cream/40 text-center mb-4">Registration is Open</div>
                <div className="flex justify-around items-center gap-2">
                  <CountdownUnit value="32" label="Days" />
                  <div className="h-6 w-px bg-white/10" />
                  <CountdownUnit value="14" label="Hrs" />
                  <div className="h-6 w-px bg-white/10" />
                  <CountdownUnit value="07" label="Min" />
                  <div className="h-6 w-px bg-white/10" />
                  <CountdownUnit value="42" label="Sec" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini List synchronized with Admin Data */}
        {otherEvents.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherEvents.map((event) => (
              <MiniCard key={event.id} date={event.date} title={event.name} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CountdownUnit({ value, label }: { value: string, label: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-display font-bold text-gold leading-none mb-1">{value}</div>
      <div className="text-[8px] uppercase tracking-widest text-cream/40 font-bold">{label}</div>
    </div>
  );
}

function MiniCard({ date, title }: { date: string, title: string }) {
  const parts = date.split(' ');
  const monthDay = parts.length > 1 ? `${parts[0].substring(0, 3).toUpperCase()} ${parts[1].replace(',', '')}` : date;

  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl border border-forest/10 hover:border-gold/30 hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-md bg-white/30 backdrop-blur-sm">
      <div className="text-[10px] font-black text-forest/40 group-hover:text-gold transition-colors whitespace-nowrap">
        {monthDay}
      </div>
      <div className="h-8 w-px bg-forest/10" />
      <div className="font-bold text-sm text-forest-deep truncate flex-1">{title}</div>
      <ArrowRight className="h-3 w-3 text-forest/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
    </div>
  );
}
