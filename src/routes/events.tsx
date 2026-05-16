import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
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
        className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${
          showtime.status === "sold-out"
            ? "bg-white/5 text-cream/30 cursor-not-allowed"
            : "bg-gold text-forest-deep hover:bg-gold/90 shadow-lg"
        }`}
      >
        {showtime.status === "sold-out" ? "Sold Out" : "Register / Book →"}
      </button>
    </div>
  );
}

function CityPanel({ city, eventId }: { city: CityScreening; eventId: string }) {
  const [expanded, setExpanded] = useState(false);

  const handleBook = (showtimeId: string) => {
    toast.success(`Booking started for ${city.city} — ${showtimeId}`);
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

function EventsPage() {
  const [selectedEventId, setSelectedEventId] = useState(INITIAL_EVENTS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const selectedEvent = INITIAL_EVENTS.find((e) => e.id === selectedEventId) || INITIAL_EVENTS[0];

  const supportIcons: Record<string, typeof Mail> = {
    email: Mail,
    phone: Phone,
    whatsapp: MessageCircle,
    chat: MessageCircle,
  };

  return (
    <div className="bg-[#050704] min-h-screen flex flex-col text-cream selection:bg-gold/30">
      <SiteHeader />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={selectedEvent.heroImage || selectedEvent.image}
              className="w-full h-full object-cover opacity-25 scale-105 blur-sm transition-all duration-700"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050704]/80 via-[#050704]/40 to-[#050704]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050704] via-transparent to-[#050704]" />
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
                { icon: Globe, v: `${INITIAL_EVENTS.reduce((acc, e) => acc + (e.cities?.length ?? 0), 0)}`, l: "Locations" },
                { icon: Calendar, v: `${INITIAL_EVENTS.length}`, l: "Events" },
                { icon: Users, v: `${INITIAL_EVENTS.reduce((acc, e) => acc + e.ticketsSold, 0).toLocaleString()}+`, l: "Registered" },
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
              {INITIAL_EVENTS.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => setSelectedEventId(ev.id)}
                  className={`flex-shrink-0 px-5 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                    selectedEventId === ev.id
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
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">

          {/* Event Overview */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedEvent.tags?.map((tag) => (
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
              {selectedEvent.includes && (
                <ul className="space-y-2">
                  {selectedEvent.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-cream/70">
                      <CheckCircle className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-xs text-cream/40 text-center">Select a city & showtime below</div>
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
                {selectedEvent.cities.map((city) => (
                  <CityPanel key={city.cityId} city={city} eventId={selectedEvent.id} />
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
                {selectedEvent.support.map((contact) => {
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
                {selectedEvent.faq.map((item, i) => (
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
          <div className="text-center py-16 space-y-6">
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
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
