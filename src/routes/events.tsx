import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  Calendar,
  MapPin,
  Ticket,
  Clock,
  ArrowRight,
  Sparkles,
  Globe,
  Users,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  XCircle,
  Navigation,
  Car,
  Accessibility,
  ExternalLink,
} from "lucide-react";
import { INITIAL_EVENTS, type CityScreening, type Showtime } from "../data/events-data";
import { toast } from "sonner";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — One Mustard Seed" },
      { name: "description", content: "Join us for upcoming live events, workshops, and worship nights across multiple cities." },
    ],
  }),
  component: EventsPage,
});

const statusConfig = {
  available: { label: "Available", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
  limited: { label: "Limited Spots", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
  "sold-out": { label: "Sold Out", icon: XCircle, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
};

function ShowtimeCard({ showtime, onBook }: { showtime: Showtime; onBook: () => void }) {
  const cfg = statusConfig[showtime.status];
  const Icon = cfg.icon;
  const pct = Math.round((showtime.spotsLeft / showtime.totalSpots) * 100);

  return (
    <div className={`p-4 rounded-2xl border ${cfg.bg} space-y-3`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-cream/50 mb-1">{showtime.day}</div>
          <div className="font-display text-lg text-cream font-medium">{showtime.date}</div>
          <div className="flex items-center gap-2 text-sm text-cream/70 mt-1">
            <Clock className="h-3.5 w-3.5" />
            {showtime.time} {showtime.timezone}
          </div>
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
          <Icon className="h-3 w-3" />
          {cfg.label}
        </div>
      </div>

      {showtime.totalSpots < 99999 && (
        <div>
          <div className="flex justify-between text-xs text-cream/50 mb-1.5">
            <span>{showtime.spotsLeft === 0 ? "No spots remaining" : `${showtime.spotsLeft} spots left`}</span>
            <span>{pct}% available</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10">
            <div
              className={`h-1.5 rounded-full transition-all ${showtime.status === "available" ? "bg-emerald-500" : showtime.status === "limited" ? "bg-amber-500" : "bg-red-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={onBook}
        disabled={showtime.status === "sold-out"}
        className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${showtime.status === "sold-out"
          ? "bg-white/5 text-cream/30 cursor-not-allowed"
          : "bg-gold text-forest-deep hover:bg-gold/90 shadow-lg"
          }`}
      >
        {showtime.status === "sold-out" ? "Sold Out" : "Register / Book →"}
      </button>
    </div>
  );
}

function CityPanel({ city, eventId, onBookRequest }: { city: CityScreening; eventId: string; onBookRequest: (city: string, showtimeId: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  const handleBook = (showtimeId: string) => {
    onBookRequest(city.city, showtimeId);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
      {/* City Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{city.flag}</span>
          <div>
            <div className="font-display text-xl text-cream font-medium flex items-center gap-2">
              {city.city}
              {city.isOnline && (
                <span className="text-[9px] font-black uppercase tracking-[0.3em] bg-gold/20 text-gold px-2 py-0.5 rounded-full">Online</span>
              )}
            </div>
            <div className="text-sm text-cream/50 flex items-center gap-1.5 mt-0.5">
              <MapPin className="h-3.5 w-3.5" />
              {city.venue.name} · {city.country}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-sm text-cream/50">
            <div>{city.showtimes.length} showtime{city.showtimes.length > 1 ? "s" : ""}</div>
            <div className="text-xs">
              {city.showtimes.filter((s) => s.status === "available").length > 0
                ? "Spots available"
                : city.showtimes.some((s) => s.status === "limited")
                  ? "Limited spots"
                  : "Sold out"}
            </div>
          </div>
          {expanded ? <ChevronUp className="h-5 w-5 text-cream/40" /> : <ChevronDown className="h-5 w-5 text-cream/40" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/10 p-6 space-y-6">
          {/* Venue Details */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/80">Venue</div>
              <div className="space-y-2">
                <div className="font-bold text-cream">{city.venue.name}</div>
                <div className="text-sm text-cream/60 leading-relaxed">
                  {city.venue.address}<br />
                  {city.venue.city}{city.venue.state ? `, ${city.venue.state}` : ""}<br />
                  {city.venue.country}{city.venue.zipCode ? ` ${city.venue.zipCode}` : ""}
                </div>
                {!city.isOnline && (
                  <a
                    href={city.venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-bold transition-colors mt-1"
                  >
                    <Navigation className="h-3.5 w-3.5" /> Open in Maps <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-gold/80 mb-2">
                  <Car className="h-3.5 w-3.5" /> Parking
                </div>
                <p className="text-xs text-cream/60 leading-relaxed">{city.venue.parkingInfo}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-gold/80 mb-2">
                  <Accessibility className="h-3.5 w-3.5" /> Accessibility
                </div>
                <p className="text-xs text-cream/60 leading-relaxed">{city.venue.accessibilityInfo}</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          {(city.venue.phone || city.venue.email) && (
            <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
              {city.venue.email && (
                <a href={`mailto:${city.venue.email}`} className="inline-flex items-center gap-2 text-xs text-cream/60 hover:text-gold transition-colors">
                  <Mail className="h-3.5 w-3.5" /> {city.venue.email}
                </a>
              )}
              {city.venue.phone && (
                <a href={`tel:${city.venue.phone}`} className="inline-flex items-center gap-2 text-xs text-cream/60 hover:text-gold transition-colors">
                  <Phone className="h-3.5 w-3.5" /> {city.venue.phone}
                </a>
              )}
            </div>
          )}

          {/* Showtimes */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/80 mb-3">Showtimes</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {city.showtimes.map((st) => (
                <ShowtimeCard key={st.id} showtime={st} onBook={() => handleBook(st.id)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect } from "react";

function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingBookingDetails, setPendingBookingDetails] = useState<{ city: string, showtimeId: string } | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ name: "", cardNumber: "", expiry: "", cvc: "" });
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://movie-backend-drab.vercel.app/api/events");
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          const mapped = data.data.map((e: any) => ({ ...e, id: e._id }));
          setEvents(mapped);
          setSelectedEventId(mapped[0].id);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleBookRequest = (city: string, showtimeId: string) => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      toast.error("Please login first to book a ticket.");
      window.location.href = "/login";
      return;
    }
    setPendingBookingDetails({ city, showtimeId });
    setTicketQuantity(1);
    setSelectedCategoryName(selectedEvent?.categories?.[0]?.name || "");
    setIsPaymentModalOpen(true);
  };

  const handleGlobalBook = () => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      toast.error("Please login first to book a ticket.");
      window.location.href = "/login";
      return;
    }
    setPendingBookingDetails({ city: "Global", showtimeId: "General" });
    setTicketQuantity(1);
    setSelectedCategoryName(selectedEvent?.categories?.[0]?.name || "");
    setIsPaymentModalOpen(true);
  };

  const processPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("user_token");
    if (!token || !pendingBookingDetails) return;

    setIsProcessingPayment(true);

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const res = await fetch("https://movie-backend-drab.vercel.app/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId: selectedEventId,
          city: pendingBookingDetails.city,
          showtimeId: pendingBookingDetails.showtimeId,
          categoryName: selectedCategoryName,
          quantity: ticketQuantity
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Payment successful! Ticket booked! Ticket ID: ${data.data.ticketId}`);
        window.location.href = "/profile";
      } else {
        toast.error(data.message || "Failed to book ticket");
        setIsProcessingPayment(false);
      }
    } catch (err) {
      toast.error("Network error");
      setIsProcessingPayment(false);
    }
  };

  const supportIcons: Record<string, typeof Mail> = {
    email: Mail,
    phone: Phone,
    whatsapp: MessageCircle,
    chat: MessageCircle,
  };

  let ticketPriceValue = 0;
  if (selectedEvent?.categories && selectedEvent.categories.length > 0) {
    const cat = selectedEvent.categories.find((c: any) => c.name === selectedCategoryName);
    if (cat) ticketPriceValue = cat.price;
  } else {
    ticketPriceValue = parseFloat((selectedEvent?.price || "0").replace(/[^0-9.]/g, ''));
  }
  const totalDue = ticketPriceValue * ticketQuantity;
  const formattedTotal = totalDue > 0 ? `$${totalDue.toFixed(2)}` : "Free";

  return (
    <div className="bg-[#050704] min-h-screen flex flex-col text-cream selection:bg-gold/30">
      <SiteHeader />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-24 overflow-hidden">
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

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold uppercase tracking-[0.4em] text-gold backdrop-blur-md">
              <Sparkles className="w-3 h-3 animate-pulse" /> Live Events
            </div>
            <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9]">
              Live <span className="italic text-gold block sm:inline">Events</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-cream/60 font-light leading-relaxed">
              Immersive gatherings in cities around the world — and online for everyone.
            </p>
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-4 text-sm text-cream/50">
              {[
                { icon: Globe, v: `${events.reduce((acc, e) => acc + (e.cities?.length ?? 0), 0)}`, l: "Locations" },
                { icon: Calendar, v: `${events.length}`, l: "Events" },
                { icon: Users, v: `${events.reduce((acc, e) => acc + (e.ticketsSold || 0), 0).toLocaleString()}+`, l: "Registered" },
                { icon: Ticket, v: "Free – $45", l: "Ticket Range" },
              ].map(({ icon: Icon, v, l }) => (
                <div key={l} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gold/60" />
                  <span className="font-bold text-cream">{v}</span>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Selector Tabs */}
        <section className="sticky top-16 z-20 border-b border-white/10 bg-[#050704]/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-0 overflow-x-auto scrollbar-hide">
              {events.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => setSelectedEventId(ev.id)}
                  className={`flex-shrink-0 px-5 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${selectedEventId === ev.id
                    ? "border-gold text-gold"
                    : "border-transparent text-cream/40 hover:text-cream/70"
                    }`}
                >
                  {ev.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Event Detail */}
        {selectedEvent ? (
          <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">

            {/* Event Overview */}
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {/* Event Image */}
                {selectedEvent.image && selectedEvent.image !== 'no-photo.jpg' && (
                  <div className="w-full h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden border border-white/10 mb-8 shadow-2xl">
                    <img
                      src={selectedEvent.image?.startsWith('http') ? selectedEvent.image : `https://movie-backend-drab.vercel.app${selectedEvent.image}`}
                      alt={selectedEvent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedEvent.tags?.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-white/5 text-cream/60 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl font-medium text-cream">{selectedEvent.name}</h2>
                  <p className="text-gold/80 text-lg mt-2">{selectedEvent.subtitle}</p>
                  <p className="text-cream/60 mt-4 leading-relaxed">{selectedEvent.description}</p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Calendar, label: "Date", value: selectedEvent.date },
                    { icon: Clock, label: "Duration", value: selectedEvent.duration || "TBA" },
                    { icon: Users, label: "Age", value: selectedEvent.ageRating || "All Ages" },
                    { icon: Globe, label: "Language", value: selectedEvent.language || "English" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.25em] text-cream/40">
                        <Icon className="h-3.5 w-3.5 text-gold/60" /> {label}
                      </div>
                      <div className="text-sm font-bold text-cream">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ticket Card */}
              <div className="p-8 rounded-[2rem] bg-gradient-to-b from-forest-deep to-[#0a1a0a] border border-white/10 space-y-6 shadow-2xl">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.35em] text-gold/70 mb-1">From</div>
                  <div className="font-display text-5xl font-medium text-gold">{selectedEvent.price}</div>
                  <div className="text-cream/50 text-sm mt-1">per person</div>
                </div>
                {/* Show Categories and Facilities */}
                {selectedEvent.categories && selectedEvent.categories.length > 0 ? (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-gold/70">Ticket Categories</div>
                    {selectedEvent.categories.map((cat: any) => (
                      <div key={cat.name} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-bold text-cream">{cat.name}</div>
                          <div className="text-gold font-mono">${cat.price}</div>
                        </div>
                        {cat.facilities && (
                          <ul className="space-y-1.5 mt-2">
                            {cat.facilities.split(',').map((f: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-cream/70">
                                <CheckCircle className="h-3 w-3 text-gold flex-shrink-0 mt-0.5" />
                                <span>{f.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ) : selectedEvent.includes && (
                  <ul className="space-y-2 pt-4 border-t border-white/10">
                    {selectedEvent.includes.map((item: string) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-cream/70">
                        <CheckCircle className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={handleGlobalBook}
                  className="w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all active:scale-95 bg-gold text-forest-deep hover:bg-gold/90 shadow-lg"
                >
                  Buy Ticket Now →
                </button>
                {selectedEvent.cities && selectedEvent.cities.length > 0 && (
                  <div className="text-xs text-cream/40 text-center">Or select a specific city & showtime below</div>
                )}
              </div>
            </div>

            {/* Cities & Showtimes */}
            {selectedEvent.cities && selectedEvent.cities.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/70 mb-1">Select Your City</div>
                    <h3 className="font-display text-3xl text-cream">
                      {selectedEvent.cities.length} {selectedEvent.cities.length === 1 ? "Location" : "Locations"}
                    </h3>
                  </div>
                  <span className="h-px flex-grow bg-white/10" />
                </div>
                <div className="space-y-4">
                  {selectedEvent.cities.map((city: CityScreening) => (
                    <CityPanel key={city.cityId} city={city} eventId={selectedEvent.id} onBookRequest={handleBookRequest} />
                  ))}
                </div>
              </div>
            )}

            {/* Support */}
            {selectedEvent.support && selectedEvent.support.length > 0 && (
              <div className="rounded-[2rem] bg-white/5 border border-white/10 p-10">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/70 mb-2">Need Help?</div>
                <h3 className="font-display text-3xl text-cream mb-8">Event Support</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedEvent.support.map((contact: { type: string; label: string; value: string; available: string }) => {
                    const Icon = supportIcons[contact.type] || Mail;
                    const href =
                      contact.type === "email"
                        ? `mailto:${contact.value}`
                        : contact.type === "phone" || contact.type === "whatsapp"
                          ? `tel:${contact.value}`
                          : "#";
                    return (
                      <a
                        key={contact.label}
                        href={href}
                        className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-gold/5 transition-all space-y-3"
                      >
                        <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                          <Icon className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <div className="font-bold text-cream text-sm">{contact.label}</div>
                          <div className="text-xs text-cream/60 mt-0.5 break-all">{contact.value}</div>
                          <div className="text-[10px] text-cream/40 mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {contact.available}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FAQ */}
            {selectedEvent.faq && selectedEvent.faq.length > 0 && (
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/70 mb-2">FAQ</div>
                <h3 className="font-display text-3xl text-cream mb-8">Frequently Asked Questions</h3>
                <div className="space-y-3 max-w-3xl">
                  {selectedEvent.faq.map((item: { q: string; a: string }, i: number) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="font-bold text-cream text-sm pr-4">{item.q}</span>
                        {openFaq === i ? (
                          <ChevronUp className="h-4 w-4 text-gold flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-cream/40 flex-shrink-0" />
                        )}
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 text-sm text-cream/60 leading-relaxed border-t border-white/10 pt-4">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Host CTA */}
            {/* <div className="text-center py-16 space-y-6">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/70">Host a Screening</div>
              <h3 className="font-display text-4xl text-cream">Bring the Event to Your City</h3>
              <p className="text-cream/50 max-w-xl mx-auto">
                Interested in hosting a One Mustard Seed event in your city, school, or church? We partner with communities around the world.
              </p>
              <a
                href="mailto:partners@onemustardSeed.org"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold text-forest-deep font-black text-sm uppercase tracking-widest hover:bg-gold/90 active:scale-95 transition-all shadow-xl"
              >
                <Mail className="h-4 w-4" /> Contact Our Partners Team
              </a>
            </div> */}
          </div>
        ) : (
          <div className="py-32 text-center text-cream/50 flex flex-col items-center justify-center space-y-4">
            <Calendar className="w-12 h-12 text-cream/20" />
            <p>No upcoming events at this moment. Please check back later!</p>
          </div>
        )}

        {/* Payment Modal */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0a1a0a] w-full max-w-md rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-forest-deep text-cream">
                <h3 className="font-display text-2xl font-medium">Complete Purchase</h3>
                <button onClick={() => setIsPaymentModalOpen(false)} className="opacity-50 hover:opacity-100 transition-opacity">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={processPayment} className="p-6 space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                  <div className="text-xs text-cream/50 uppercase tracking-widest mb-1">Order Summary</div>
                  <div className="font-bold text-lg text-cream">{selectedEvent?.name}</div>
                  <div className="text-sm text-cream/70">{pendingBookingDetails?.city} • {pendingBookingDetails?.showtimeId}</div>

                  {selectedEvent?.categories && selectedEvent.categories.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream/50 mb-1 block">Select Category</label>
                        <select
                          value={selectedCategoryName}
                          onChange={(e) => setSelectedCategoryName(e.target.value)}
                          className="w-full h-11 bg-[#0a1a0a] border border-white/10 rounded-xl px-4 text-sm text-cream focus:outline-none focus:border-gold/50 transition-colors"
                        >
                          {selectedEvent.categories.map((c: any) => (
                            <option key={c.name} value={c.name} className="bg-forest-deep text-cream" disabled={c.available < ticketQuantity}>
                              {c.name} - ${c.price} ({c.available} available)
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedEvent.categories.find((c: any) => c.name === selectedCategoryName)?.facilities && (
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold/70 mb-1.5">Category Includes</div>
                          <ul className="space-y-1">
                            {selectedEvent.categories.find((c: any) => c.name === selectedCategoryName)?.facilities?.split(',').map((f: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-cream/80">
                                <CheckCircle className="h-3 w-3 text-gold flex-shrink-0 mt-0.5" />
                                {f.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream/50 mb-1 block">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max={selectedEvent?.categories?.find((c: any) => c.name === selectedCategoryName)?.available || selectedEvent?.capacity || 10}
                      value={ticketQuantity}
                      onChange={(e) => setTicketQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full h-11 bg-[#0a1a0a] border border-white/10 rounded-xl px-4 text-sm text-cream focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-cream">
                    <span>Total due</span>
                    <span className="font-bold text-xl text-gold">{formattedTotal}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream/50">Name on Card</label>
                    <input
                      required
                      type="text"
                      value={paymentForm.name}
                      onChange={e => setPaymentForm({ ...paymentForm, name: e.target.value })}
                      className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream/50">Card Number</label>
                    <input
                      required
                      type="text"
                      value={paymentForm.cardNumber}
                      onChange={e => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                      className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-cream font-mono tracking-widest placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream/50">Expiry</label>
                      <input
                        required
                        type="text"
                        value={paymentForm.expiry}
                        onChange={e => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-cream font-mono placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream/50">CVC</label>
                      <input
                        required
                        type="text"
                        value={paymentForm.cvc}
                        onChange={e => setPaymentForm({ ...paymentForm, cvc: e.target.value })}
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-cream font-mono placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full mt-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all active:scale-95 bg-gold text-forest-deep hover:bg-gold/90 shadow-lg disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isProcessingPayment ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>Pay {formattedTotal} →</>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
      <SiteFooter />
    </div>
  );
}
