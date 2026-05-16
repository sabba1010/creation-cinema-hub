import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

const COLS = [
  { title: "Watch", items: ["Films", "KidsBibleFlix", "Series", "Trailers"] },
  { title: "Listen", items: ["God's Great Earth Podcast", "Sermons", "Audio Books"] },
  { title: "Engage", items: ["Events", "Newsletter", "Week of Prayer Online", "Shop"] },
  { title: "About", items: ["Mission", "Team", "Contact", "Support OMS"] },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-cream">
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_20%_20%,var(--gold),transparent_55%),radial-gradient(circle_at_80%_60%,var(--sky),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-forest-deep font-black text-lg">
                ✦
              </span>
              <div className="font-display text-xl">One Mustard Seed</div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              A faith-centered media ministry creating cinematic stories, resources, and experiences for families, churches, and schools around the world.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 hover:border-gold hover:text-gold transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold/90">{c.title}</h4>
                <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
                  {c.items.map((i) => (
                    <li key={i}><a href="#" className="hover:text-gold transition">{i}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold/90">Stay in the story</h4>
            <p className="mt-3 text-sm text-cream/70">Monthly stories, new releases, and free resources delivered with care.</p>
            <form className="mt-5 flex overflow-hidden rounded-full border border-cream/20 bg-cream/5">
              <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-cream/40 focus:outline-none" />
              <button className="bg-gradient-gold px-5 text-sm font-semibold text-gold-foreground">Join</button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/55 sm:flex-row">
          <span>© {new Date().getFullYear()} One Mustard Seed Ministries. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Contact</a>
            <a href="/admin" className="hover:text-gold">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
