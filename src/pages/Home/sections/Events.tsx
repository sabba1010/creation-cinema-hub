import { useState, useEffect } from "react";
import { Calendar, MapPin, Ticket, ArrowRight, Sparkles, Clock, Users } from "lucide-react";
import { INITIAL_EVENTS } from "../../../data/events-data";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setEvents(data.data.map((e: any) => ({ ...e, id: e._id })));
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const displayEvents = events.length > 0 ? events : INITIAL_EVENTS;
  // Sort displayed events by their creation time or status to put the latest uploaded at the top
  const featuredEvent = displayEvents[0];
  const otherEvents = displayEvents.slice(1, 4);

  useEffect(() => {
    if (!featuredEvent) return;

    let targetTime = 0;
    const eventDate = featuredEvent.date;

    if (featuredEvent.cities && featuredEvent.cities[0]?.showtimes && featuredEvent.cities[0].showtimes.length > 0) {
      const firstShowtime = featuredEvent.cities[0].showtimes[0];
      const parsedDate = new Date(`${firstShowtime.date} ${firstShowtime.time}`);
      if (!isNaN(parsedDate.getTime())) {
        targetTime = parsedDate.getTime();
      }
    }

    if (!targetTime && eventDate) {
      let parseableDateStr = eventDate;
      if (eventDate.includes('–')) {
        parseableDateStr = eventDate.split('–')[0].trim();
      } else if (eventDate.includes('-')) {
        parseableDateStr = eventDate.split('-')[0].trim();
      }

      let parsedDate = new Date(parseableDateStr);
      if (isNaN(parsedDate.getTime())) {
        parsedDate = new Date(`${parseableDateStr} ${new Date().getFullYear()}`);
      }

      if (!isNaN(parsedDate.getTime())) {
        targetTime = parsedDate.getTime();
      }
    }

    if (!targetTime) {
      targetTime = new Date().getTime() + 14 * 24 * 60 * 60 * 1000;
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft({ days, hours });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [featuredEvent]);

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath || imagePath === 'no-photo.jpg') {
      return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80";
    }
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    return `${API_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const formatEventDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return dateStr;
  };

  return (
    <section id="events" className="relative overflow-hidden bg-background py-12 sm:py-16">
      <div className="relative mx-auto max-w-[1440px] px-6">
        {/* Dark Cinematic Island Card */}
        <div className="relative overflow-hidden rounded-[3.5rem] bg-[#050704] shadow-elevated group border border-white/5">
          {/* Internal Cinematic Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
            <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-sky/5 blur-[120px]" />
          </div>

          <div className="relative grid items-stretch gap-0 lg:grid-cols-2 min-h-[400px]">

            {/* Visual Side */}
            <div className="relative h-full overflow-hidden">
              <img
                src={getImageUrl(featuredEvent.image)}
                alt={featuredEvent.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050704] via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050704] via-transparent to-transparent lg:hidden" />

              <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gold backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_var(--gold)]" /> Live Event
              </div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 text-cream">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1 rounded-lg bg-gold/10 border border-gold/20 text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
                  Upcoming Experience
                </div>

                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[0.95] tracking-tighter">
                  {featuredEvent.name.includes(':') ? (
                    featuredEvent.name.split(':').map((part: string, i: number) => (
                      <span key={i} className={i === 1 ? "italic text-gold block mt-2" : "block"}>
                        {part}{i === 0 ? ':' : ''}
                      </span>
                    ))
                  ) : (
                    <span className="block">{featuredEvent.name}</span>
                  )}
                </h2>

                <p className="max-w-md text-lg text-cream/50 font-light leading-relaxed">
                  {featuredEvent.description || "Step into a space where faith meets wonder. Join our global community for an immersive gathering."}
                </p>
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-2 gap-10 mt-8 border-t border-white/5 pt-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold/60">
                    <Calendar className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Date</span>
                  </div>
                  <div className="text-base font-bold tracking-tight">{formatEventDate(featuredEvent.date)}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold/60">
                    <MapPin className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Location</span>
                  </div>
                  <div className="text-base font-bold tracking-tight truncate">{featuredEvent.location}</div>
                </div>
              </div>

              {/* Countdown & CTA */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-8">
                <a
                  href={`/events?id=${featuredEvent.id}`}
                  className="group text-center block relative w-full sm:w-auto px-10 py-5 bg-gold text-[#050704] rounded-full font-bold text-sm uppercase tracking-widest shadow-glow transition-all hover:scale-105 active:scale-95"
                >
                  Reserve Spot <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-xl font-display font-bold text-gold">{timeLeft.days}</div>
                    <div className="text-[8px] uppercase font-bold text-white/30 tracking-widest">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-display font-bold text-gold">{timeLeft.hours}</div>
                    <div className="text-[8px] uppercase font-bold text-white/30 tracking-widest">Hrs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Mini Cards */}
        {otherEvents.length > 0 && (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherEvents.map((event) => (
              <MiniCard key={event.id} id={event.id} date={event.date} title={event.name} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MiniCard({ date, title, id }: { date: string, title: string, id: string }) {
  let month = "JUN";
  let day = "12";

  const d = new Date(date);
  if (!isNaN(d.getTime())) {
    month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    day = d.toLocaleDateString('en-US', { day: 'numeric' });
  } else {
    const parts = date.split(' ');
    if (parts.length > 1) {
      month = parts[0].substring(0, 3).toUpperCase();
      day = parts[1].replace(/[^0-9]/g, '');
    }
  }

  return (
    <a href={`/events?id=${id}`} className="group flex items-center gap-5 p-6 rounded-3xl border border-black/5 bg-white shadow-sm hover:bg-[#050704] hover:border-gold/20 transition-all duration-500 cursor-pointer hover:-translate-y-2">
      <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-black/5 text-black/40 group-hover:bg-gold/10 group-hover:text-gold transition-all">
        <div className="text-[8px] font-black uppercase tracking-widest leading-none">{month}</div>
        <div className="text-lg font-display font-bold leading-none mt-1">{day}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-base text-forest-deep group-hover:text-white transition-colors truncate">{title}</h4>
        <div className="text-[10px] text-black/30 group-hover:text-white/30 uppercase tracking-widest mt-1">Upcoming Engagement</div>
      </div>
      <ArrowRight className="h-4 w-4 text-black/10 group-hover:text-gold group-hover:translate-x-1 transition-all" />
    </a>
  );
}
