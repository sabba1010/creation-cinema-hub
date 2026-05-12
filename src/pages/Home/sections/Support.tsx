import { Heart, Globe, Users, BookOpenCheck } from "lucide-react";
import support from "@/assets/support-family.jpg";

const STATS = [
  { Icon: BookOpenCheck, k: "20+", l: "Original Series" },
  { Icon: Users, k: "1M+", l: "Lives Reached" },
  { Icon: Globe, k: "100+", l: "Countries" },
  { Icon: Heart, k: "One", l: "Mission" },
];

export function Support() {
  return (
    <section id="support" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-deep text-cream shadow-elevated">
          <img src={support} alt="Father reading the Bible with his son" width={1600} height={1024} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest-deep/30" />

          <div className="relative grid gap-12 p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr] lg:p-20">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Support the mission</span>
              <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
                Every seed planted<br /><span className="italic text-gold">grows a generation.</span>
              </h2>
              <p className="mt-5 max-w-lg text-cream/80">
                OMS is funded by families and churches who believe wonder, truth, and beauty belong together. Your gift sends stories into homes and classrooms worldwide.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#" className="rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-bold text-gold-foreground shadow-glow transition hover:scale-[1.02]">Give once</a>
                <a href="#" className="rounded-full bg-cream px-6 py-3.5 text-sm font-bold text-forest-deep transition hover:scale-[1.02]">Give monthly</a>
                <a href="#" className="rounded-full border border-cream/25 px-6 py-3.5 text-sm font-semibold text-cream/90 hover:border-gold hover:text-gold transition">Learn more →</a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 self-center">
              {STATS.map(({ Icon, k, l }) => (
                <div key={l} className="rounded-2xl border border-cream/15 bg-cream/5 p-6 backdrop-blur-md">
                  <Icon className="h-5 w-5 text-gold" />
                  <div className="mt-3 font-display text-4xl text-cream">{k}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-cream/65">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
