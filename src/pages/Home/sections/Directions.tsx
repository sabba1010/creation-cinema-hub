import { Play, Headphones, MapPin, GraduationCap, BookOpen, HandHeart } from "lucide-react";

const CARDS = [
  { Icon: Play, label: "Watch", copy: "Films, series & shorts", hue: "from-[oklch(0.32_0.06_150)] to-[oklch(0.5_0.08_145)]" },
  { Icon: Headphones, label: "Listen", copy: "Podcasts & audio stories", hue: "from-[oklch(0.45_0.06_220)] to-[oklch(0.6_0.07_210)]" },
  { Icon: MapPin, label: "Attend", copy: "Live events & gatherings", hue: "from-[oklch(0.5_0.1_55)] to-[oklch(0.68_0.13_70)]" },
  { Icon: GraduationCap, label: "Learn", copy: "Curriculum & resources", hue: "from-[oklch(0.4_0.07_145)] to-[oklch(0.55_0.08_120)]" },
  { Icon: BookOpen, label: "Read", copy: "Books & study guides", hue: "from-[oklch(0.42_0.05_60)] to-[oklch(0.58_0.07_55)]" },
  { Icon: HandHeart, label: "Support", copy: "Partner with the mission", hue: "from-[oklch(0.55_0.13_40)] to-[oklch(0.72_0.14_60)]" },
];

export function Directions() {
  return (
    <section className="relative bg-gradient-forest py-24 text-cream sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Pick your path</span>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-5xl">Where do you want to begin?</h2>
          </div>
          <p className="max-w-sm text-cream/70">Six doorways into the OMS experience â€” for families, churches, and curious explorers.</p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CARDS.map(({ Icon, label, copy, hue }) => (
            <a
              key={label}
              href="#"
              className={`group relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br ${hue} p-5 ring-1 ring-cream/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-elevated`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,oklch(1_0_0/0.25),transparent_50%)] opacity-60 transition-opacity group-hover:opacity-100" />
              <div className="relative flex h-full flex-col justify-between">
                <Icon className="h-6 w-6 text-cream/85 transition-transform duration-500 group-hover:scale-110" />
                <div>
                  <div className="font-display text-2xl">{label}</div>
                  <div className="mt-1 text-xs text-cream/70">{copy}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                    Enter â†’
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
