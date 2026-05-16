import { Play, Shield, Infinity as InfinityIcon, Sparkles } from "lucide-react";
const promo = "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80&w=1200";

export function KidsFlix() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-deep shadow-elevated">
          <img src={promo} alt="Children watching KidsBibleFlix" width={1600} height={1024} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,oklch(0.78_0.13_85/0.35),transparent_55%)]" />

          <div className="relative grid gap-10 p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr] lg:p-20">
            <div className="text-cream">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur ring-1 ring-gold/40">
                <Sparkles className="h-3 w-3" /> KidsBibleFlix
              </div>
              <h2 className="mt-5 font-display text-5xl font-light leading-[1.02] sm:text-6xl lg:text-7xl">
                A streaming home<br /><span className="italic text-gold">for little hearts.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-cream/80">
                Hundreds of safe, beautifully crafted Bible stories, songs, and adventures — handpicked for kids and trusted by parents.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-bold text-forest-deep shadow-glow transition hover:scale-[1.03]">
                  <Play className="h-4 w-4 fill-forest-deep" /> Start watching
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-sm font-semibold text-cream hover:border-gold hover:text-gold transition">
                  Browse series →
                </a>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-xs">
                {[
                  { Icon: Shield, l: "100% kid-safe" },
                  { Icon: InfinityIcon, l: "Lifetime access" },
                  { Icon: Sparkles, l: "New each week" },
                ].map(({ Icon, l }) => (
                  <div key={l} className="rounded-xl border border-cream/15 bg-cream/5 p-3 text-center backdrop-blur">
                    <Icon className="mx-auto h-4 w-4 text-gold" />
                    <div className="mt-1.5 text-cream/85">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
