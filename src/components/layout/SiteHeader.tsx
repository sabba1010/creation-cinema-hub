import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, User, Menu, X } from "lucide-react";
import logo from "@/assets/oms-logo.png";

const NAV = [
  { label: "WATCH", href: "#watch" },
  { label: "LISTEN", href: "#listen" },
  { label: "EXPLORE", href: "#projects" },
  { label: "EVENTS", href: "/events" },
  { label: "RESOURCES", href: "#resources" },
  { label: "SHOP", href: "#shop" },
  { label: "SUPPORT", href: "#support" },
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
          ? "bg-forest-deep/90 backdrop-blur-xl shadow-elevated"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="OMS Logo" width={48} height={48} className="h-10 w-10 sm:h-11 sm:w-11" />
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#faf7ee] whitespace-nowrap">
            ONE MUSTARD SEED
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          {NAV.map((n) => {
            const isExternal = n.href.startsWith("/");
            return isExternal ? (
              <Link
                key={n.label}
                to={n.href}
                className="px-4 py-2 text-[13px] font-bold tracking-[0.15em] text-[#faf7ee]/80 hover:text-[#faf7ee] transition-colors"
              >
                {n.label}
              </Link>
            ) : (
              <a
                key={n.label}
                href={n.href}
                className="px-4 py-2 text-[13px] font-bold tracking-[0.15em] text-[#faf7ee]/80 hover:text-[#faf7ee] transition-colors"
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-[#faf7ee]/80 hover:text-[#faf7ee] transition">
            <Search className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button aria-label="Account" className="text-[#faf7ee]/80 hover:text-[#faf7ee] transition">
            <User className="h-6 w-6" strokeWidth={2} />
          </button>
          <button onClick={() => setOpen((s) => !s)} aria-label="Menu" className="lg:hidden text-[#faf7ee]">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cream/10 bg-forest-deep/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {NAV.map((n) => {
              const isExternal = n.href.startsWith("/");
              return isExternal ? (
                <Link
                  key={n.label}
                  to={n.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-[#faf7ee]/90 border-b border-cream/5 last:border-0 font-bold tracking-widest text-xs"
                >
                  {n.label}
                </Link>
              ) : (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-[#faf7ee]/90 border-b border-cream/5 last:border-0 font-bold tracking-widest text-xs"
                >
                  {n.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

