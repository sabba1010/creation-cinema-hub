import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, User, Menu, X } from "lucide-react";
import logo from "@/assets/oms-logo.png";

const NAV = [
  { label: "Watch", href: "#watch" },
  { label: "Listen", href: "#listen" },
  { label: "Explore", href: "#projects" },
  { label: "Events", href: "#events" },
  { label: "Resources", href: "#resources" },
  { label: "Shop", href: "#shop" },
  { label: "Support", href: "#support" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-forest-deep/85 backdrop-blur-xl shadow-elevated"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
      style={{ ['--tw-bg-opacity' as never]: undefined }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-cream/95 shadow-card transition-transform group-hover:rotate-[-6deg]">
            <img src={logo} alt="" width={28} height={28} className="h-7 w-7" />
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-wide text-cream">One Mustard Seed</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold/90">Faith · Story · Wonder</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="px-4 py-2 text-sm font-medium text-cream/85 hover:text-gold transition-colors relative group"
            >
              {n.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button aria-label="Search" className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-cream/85 hover:bg-cream/10 hover:text-cream transition">
            <Search className="h-4.5 w-4.5" strokeWidth={2} />
          </button>
          <button aria-label="Account" className="hidden sm:flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-sm font-medium text-cream/90 hover:border-gold hover:text-gold transition">
            <User className="h-4 w-4" /> Sign in
          </button>
          <button onClick={() => setOpen((s) => !s)} aria-label="Menu" className="lg:hidden grid h-10 w-10 place-items-center rounded-full text-cream hover:bg-cream/10">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cream/10 bg-forest-deep/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="py-3 text-cream/90 border-b border-cream/5 last:border-0">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
