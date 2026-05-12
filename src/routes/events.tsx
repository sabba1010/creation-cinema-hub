import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Calendar, MapPin, Ticket, Clock, ArrowRight } from "lucide-react";
import eventImg from "@/assets/event-live.jpg";

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
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Events Hero */}
        <section className="relative py-20 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold/80">Experience Together</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-medium tracking-tight">
              Upcoming <span className="italic text-gold">Events</span>
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-cream/70">
              From worldwide streaming worship nights to local community workshops, find your next encounter with the wonder of creation.
            </p>
          </div>
        </section>

        {/* Featured Event Section */}
        <section className="py-24 bg-cream/5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gold/10 rounded-[2.5rem] blur-2xl transition-all group-hover:bg-gold/20" />
                <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                  <img src={eventImg} alt="Live OMS event" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-foreground">
                      Featured Event
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-4xl font-medium text-foreground leading-tight sm:text-5xl">
                  Week of <span className="italic text-primary">Prayer</span> Online
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Join a global community for seven nights of deep worship, biblical teaching, and guided prayer. Designed for families and small groups to grow together in faith.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Date & Time</h4>
                      <p className="text-muted-foreground">June 14 – 20, 2026 • 7:00 PM ET</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Location</h4>
                      <p className="text-muted-foreground">Streaming worldwide via OMS Live</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Ticket className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Registration</h4>
                      <p className="text-muted-foreground">Free for all participants. QR-code access provided.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <button className="rounded-full bg-primary px-10 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg transition hover:bg-primary/90 hover:-translate-y-0.5">
                    Reserve Your Seat
                  </button>
                  <button className="rounded-full border border-border px-10 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition hover:bg-muted">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Events Grid */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h2 className="font-display text-4xl font-medium text-foreground">Other <span className="italic text-primary">Engagements</span></h2>
                <p className="mt-4 text-muted-foreground">Browse our full calendar of upcoming gatherings.</p>
              </div>
              <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:gap-3 transition-all">
                View Calendar <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Storytellers Workshop", date: "Aug 12", type: "Workshop" },
                { title: "Youth Media Camp", date: "July 05", type: "Education" },
                { title: "Regional Meetup: Dallas", date: "Sept 22", type: "Gathering" },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-xl hover:border-primary/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/70">{item.type}</span>
                    <span className="text-xs font-bold text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-display text-2xl font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-foreground/60 uppercase tracking-widest group-hover:text-foreground transition-colors">
                    Details <ArrowRight className="h-4 w-4" />
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
