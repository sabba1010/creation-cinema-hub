import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Search, User, Menu, X } from "lucide-react";
import logo from "@/assets/oms-logo.png";

const NAV_GROUPS = [
  {
    label: "WATCH",
    links: [
      { label: "Movies", href: "https://adventistmovies.com/" },
      { label: "KidsBibleFlix", href: "https://kidsbibleflix.com/" },
      { label: "Week of Prayer Online", href: "/prayer" },
    ]
  },
  { label: "PODCAST", href: "https://godsgreatearth.com/" },
  {
    label: "RESOURCES",
    links: [
      { label: "Books", href: "/books" },
      { label: "Resource Hub", href: "/resources" },
    ]
  },
  {
    label: "CONNECT",
    links: [
      { label: "Events", href: "https://thecreationcase.com/" },
      { label: "About Us", href: "https://onemustardseed.com/team" },
      { label: "Contact", href: "/contact" },
    ]
  },
  { label: "SHOP", href: "/shop" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${!isHome || scrolled
          ? "bg-forest-deep/95 backdrop-blur-xl shadow-elevated border-b border-cream/5"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#faf7ee] whitespace-nowrap">
            ONE MUSTARD SEED
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-4">
          {NAV_GROUPS.map((group) => (
            <div 
              key={group.label} 
              className="relative group/nav"
              onMouseEnter={() => setActiveGroup(group.label)}
              onMouseLeave={() => setActiveGroup(null)}
            >
              {group.links ? (
                <>
                  <button className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-[#faf7ee]/70 hover:text-[#faf7ee] transition-colors">
                    {group.label}
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300">
                    <div className="bg-forest-deep border border-cream/10 rounded-2xl p-3 shadow-2xl min-w-[200px]">
                      {group.links.map((link) => {
                        const isExternal = link.href.startsWith("http");
                        return isExternal ? (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 text-[11px] font-bold tracking-widest text-[#faf7ee]/60 hover:text-gold hover:bg-white/5 rounded-xl transition-all"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            key={link.label}
                            to={link.href}
                            className="block px-4 py-3 text-[11px] font-bold tracking-widest text-[#faf7ee]/60 hover:text-gold hover:bg-white/5 rounded-xl transition-all"
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                (() => {
                  const isExternal = group.href?.startsWith("http");
                  return isExternal ? (
                    <a
                      href={group.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-[#faf7ee]/70 hover:text-[#faf7ee] transition-colors"
                    >
                      {group.label}
                    </a>
                  ) : (
                    <Link
                      to={group.href!}
                      className="px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-[#faf7ee]/70 hover:text-[#faf7ee] transition-colors"
                    >
                      {group.label}
                    </Link>
                  );
                })()
              )}
            </div>
          ))}
          <Link 
            to="/support" 
            className="ml-4 px-6 py-2.5 rounded-full bg-gold text-forest-deep text-[10px] font-bold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            SUPPORT
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-[#faf7ee]/80 hover:text-[#faf7ee] transition">
            <Search className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button aria-label="Account" className="hidden sm:block text-[#faf7ee]/80 hover:text-[#faf7ee] transition">
            <User className="h-6 w-6" strokeWidth={2} />
          </button>
          <button onClick={() => setOpen((s) => !s)} aria-label="Menu" className="lg:hidden text-[#faf7ee]">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cream/10 bg-forest-deep/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-6 space-y-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="space-y-3">
                <div className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase opacity-50">{group.label}</div>
                <div className="flex flex-col gap-1 pl-2">
                  {group.links ? (
                    group.links.map((link) => {
                      const isExternal = link.href.startsWith("http");
                      return isExternal ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="py-3 text-[#faf7ee] font-bold tracking-widest text-sm border-b border-cream/5 last:border-0"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          key={link.label}
                          to={link.href}
                          onClick={() => setOpen(false)}
                          className="py-3 text-[#faf7ee] font-bold tracking-widest text-sm border-b border-cream/5 last:border-0"
                        >
                          {link.label}
                        </Link>
                      );
                    })
                  ) : (
                    (() => {
                      const isExternal = group.href?.startsWith("http");
                      return isExternal ? (
                        <a
                          href={group.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="py-3 text-[#faf7ee] font-bold tracking-widest text-sm border-b border-cream/5 last:border-0"
                        >
                          {group.label}
                        </a>
                      ) : (
                        <Link
                          to={group.href!}
                          onClick={() => setOpen(false)}
                          className="py-3 text-[#faf7ee] font-bold tracking-widest text-sm border-b border-cream/5 last:border-0"
                        >
                          {group.label}
                        </Link>
                      );
                    })()
                  )}
                </div>
              </div>
            ))}
            <Link 
              to="/support" 
              onClick={() => setOpen(false)}
              className="w-full py-5 rounded-2xl bg-gold text-forest-deep text-center font-bold tracking-[0.2em] text-xs shadow-xl"
            >
              SUPPORT THE MISSION
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

