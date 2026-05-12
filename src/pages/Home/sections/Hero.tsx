import { Play, Compass, Heart } from "lucide-react";
import heroImg from "@/assets/hero-family.jpg";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="A family overlooking mountains at golden hour"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.95_0.12_85/0.18),transparent_50%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pt-32 pb-20 sm:pb-28">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-cream/90 backdrop-blur animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          A faith-centered media ministry
        </span>

        <h1 className="mt-6 max-w-4xl font-display text-5xl font-light leading-[1.02] text-cream sm:text-7xl lg:text-[clamp(4rem,7vw,7.5rem)] animate-fade-up [animation-delay:120ms]">
          Wonder.<br />
          <span className="italic text-gold">Explore.</span><br />
          Belong.
        </h1>

        <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-cream/85 animate-fade-up [animation-delay:240ms]">
          Faith-centered media, stories, films, and resources — created for families, churches, and schools to encounter the wonder of creation.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:360ms]">
          <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-gold-foreground shadow-glow transition hover:scale-[1.02]">
            <Compass className="h-4 w-4" /> Explore Projects
          </a>
          <a href="#watch" className="group inline-flex items-center gap-2 rounded-full bg-cream/10 px-6 py-3.5 text-sm font-semibold text-cream backdrop-blur-md ring-1 ring-cream/25 transition hover:bg-cream/20">
            <Play className="h-4 w-4 fill-cream" /> Watch Content
          </a>
          <a href="#support" className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-cream/90 transition hover:text-gold">
            <Heart className="h-4 w-4" /> Support OMS →
          </a>
        </div>

        <div className="mt-16 grid max-w-3xl grid-cols-3 gap-8 border-t border-cream/15 pt-8 animate-fade-up [animation-delay:500ms]">
          {[
            { k: "20+", v: "Original Series" },
            { k: "1M+", v: "Lives Reached" },
            { k: "100+", v: "Countries" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-3xl text-gold">{s.k}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-cream/65">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="h-10 w-6 rounded-full border border-cream/30 p-1">
          <div className="h-2 w-full rounded-full bg-cream/60 animate-float" />
        </div>
      </div>
    </section>
  );
}
