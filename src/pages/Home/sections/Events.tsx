import { Calendar, MapPin, Ticket } from "lucide-react";
import eventImg from "@/assets/event-live.jpg";

export function Events() {
  return (
    <section id="events" className="relative overflow-hidden bg-forest-deep py-24 text-cream sm:py-32">
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_10%_20%,var(--gold),transparent_45%),radial-gradient(circle_at_85%_75%,var(--sky),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img src={eventImg} alt="Live OMS event" width={1280} height={800} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-forest-deep/70 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" /> Featured Event
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Upcoming</span>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-5xl">
              Week of <span className="italic text-gold">Prayer</span> Online
            </h2>
            <p className="mt-4 max-w-md text-cream/75">
              Seven nights of worship, teaching, and guided prayer — streamed live to homes, churches, and small groups around the globe.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <Row icon={<Calendar className="h-4 w-4" />} label="June 14 – 20, 2026 · 7:00 PM ET" />
              <Row icon={<MapPin className="h-4 w-4" />} label="Streaming worldwide · OMS Live" />
              <Row icon={<Ticket className="h-4 w-4" />} label="Free registration · QR-code access" />
            </div>

            <div className="mt-8 grid grid-cols-4 gap-3 max-w-md">
              {[
                { v: "32", l: "Days" },
                { v: "14", l: "Hours" },
                { v: "07", l: "Min" },
                { v: "42", l: "Sec" },
              ].map((c) => (
                <div key={c.l} className="rounded-2xl border border-cream/15 bg-cream/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-2xl text-gold">{c.v}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-cream/60">{c.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-glow">Reserve seat</a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream/90 hover:border-gold hover:text-gold transition">All events →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-cream/80">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-cream/10 text-gold">{icon}</span>
      {label}
    </div>
  );
}
