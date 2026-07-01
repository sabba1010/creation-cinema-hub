import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoImg from "@/assets/one_mustard_seed_logo_transparent_highres.png";

const COLS = [
  { title: "Watch", items: [{label: "Films", to: "/films"}, {label: "KidsBibleFlix", to: "/kids"}, {label: "Trailers", to: "#"}] },
  { title: "Listen", items: [{label: "God's Great Earth Podcast", to: "/podcast"}, {label: "Audio Books", to: "/books"}] },
  { title: "Engage", items: [{label: "Events", to: "/events"}, {label: "Newsletter", to: "/newsletter"}, {label: "Week of Prayer Online", to: "/prayer"}, {label: "Shop", to: "/shop"}] },
  { title: "About", items: [{label: "Mission", to: "/mission"}, {label: "Team", to: "/team"}, {label: "Contact", to: "/contact"}, {label: "Support OMS", to: "/support"}] },
];

export function SiteFooter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAuth = localStorage.getItem("user_auth") === "true";
      const adminAuth = localStorage.getItem("admin_auth") === "true";
      setIsLoggedIn(userAuth || adminAuth);
    }
  }, []);

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-cream">
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_20%_20%,var(--gold),transparent_55%),radial-gradient(circle_at_80%_60%,var(--sky),transparent_50%)]" />
      <div className="relative mx-auto max-w-[1440px] px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream p-1.5 shadow-md">
                <img src={logoImg} alt="One Mustard Seed Logo" className="h-full w-full object-contain" />
              </div>
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
                    <li key={i.label}>
                      {i.to !== "#" ? (
                        <Link to={i.to as any} className="hover:text-gold transition">{i.label}</Link>
                      ) : (
                        <a href={i.to} className="hover:text-gold transition">{i.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold/90">Stay in the story</h4>
            <p className="mt-3 text-sm text-cream/70">Monthly stories, new releases, and free resources delivered with care.</p>
            {!isLoggedIn && (
              <div className="mt-5">
                <Link to="/login" className="inline-flex items-center justify-center bg-gradient-gold px-8 py-3 rounded-full text-sm font-semibold text-gold-foreground transition-transform hover:scale-105 active:scale-95">
                  Login / Register
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/55 sm:flex-row">
          <span>© {new Date().getFullYear()} One Mustard Seed Ministries. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <Link to="/contact" className="px-3 py-1 -my-1 rounded-full bg-white/5 border border-white/10 hover:bg-gold hover:text-forest-deep transition-all font-medium">Contact</Link>
            <a href="/admin" className="hover:text-gold">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
