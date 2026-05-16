import { Film, Mic, Calendar, Baby, GraduationCap, BookOpen, Tv, Church } from "lucide-react";

const ITEMS = [
  { Icon: Film, label: "Films", desc: "Original documentaries & features" },
  { Icon: Mic, label: "Podcasts", desc: "Conversations on faith & creation" },
  { Icon: Calendar, label: "Live Events", desc: "Gatherings & worship online" },
  { Icon: Baby, label: "Kids Content", desc: "Safe, wonder-filled stories" },
  { Icon: GraduationCap, label: "Education", desc: "Resources for teachers" },
  { Icon: BookOpen, label: "Books", desc: "Printed and audio editions" },
  { Icon: Tv, label: "Streaming", desc: "Watch anywhere, anytime" },
  { Icon: Church, label: "Church & School", desc: "Tools for ministry leaders" },
];

export function MediaHub() {
  return (
    <section className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-earth">What we do</span>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-light leading-tight text-forest-deep sm:text-5xl">
            One ministry. <span className="italic text-forest">Many ways</span> to encounter wonder.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            A multimedia ecosystem of films, podcasts, events, and learning â€” built for the modern family of faith.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {ITEMS.map(({ Icon, label, desc }, i) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-warm opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-forest text-cream shadow-sm transition-transform duration-500 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg text-forest-deep">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
