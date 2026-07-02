import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Search, User, Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import logoImg from "@/assets/one_mustard_seed_logo_transparent_highres.png";

const NAV_GROUPS = [
  {
    label: "WATCH",
    links: [
      { label: "Movies", href: "/films" },
      { label: "KidsBibleFlix", href: "/kids" },
      { label: "Week of Prayer Online", href: "/prayer" },
    ]
  },
  {
    label: "LISTEN",
    links: [
      { label: "Podcast", href: "/podcast" },
      { label: "Music", href: "/music" },
    ]
  },
  {
    label: "RESOURCES",
    href: "/resources"
  },
  { label: "EVENTS", href: "/events" },
  { label: "NEWSLETTER", href: "/newsletter" },
  { label: "STORE", href: "/shop" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAuth = localStorage.getItem("user_auth") === "true";
      const adminAuth = localStorage.getItem("admin_auth") === "true";
      setIsLoggedIn(userAuth || adminAuth);
      setIsAdmin(adminAuth);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const stored = localStorage.getItem('oms_cart');
      if (stored) {
        const items = JSON.parse(stored);
        const count = items.reduce((acc: number, item: any) => acc + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart_updated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart_updated', updateCartCount);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${!isHome || scrolled
          ? "bg-forest-deep/95 backdrop-blur-xl shadow-elevated border-b border-cream/5"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream p-1.5 transition-all duration-300 group-hover:scale-105 shadow-md">
            <img src={logoImg} alt="ONE MUSTARD SEED Logo" className="h-full w-full object-contain" />
          </div>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#faf7ee] whitespace-nowrap">
            ONE MUSTARD SEED
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-4">
          {NAV_GROUPS.map((group) => {
            const isGroupActive = group.links?.some(link => location.pathname.startsWith(link.href)) || 
                                 (group.href && location.pathname.startsWith(group.href));
            
            return (
              <div 
                key={group.label} 
                className="relative group/nav"
                onMouseEnter={() => setActiveGroup(group.label)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                {group.links ? (
                  <>
                    <button className={`flex flex-col items-center gap-0.5 px-4 py-2 text-[11px] font-bold tracking-[0.2em] transition-all ${isGroupActive ? "text-gold" : "text-[#faf7ee]/70 hover:text-[#faf7ee]"}`}>
                      <span className="flex items-center gap-1">
                        {group.label}
                        <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover/nav:rotate-180" strokeWidth={2.5} />
                      </span>
                      {isGroupActive && <div className="h-0.5 w-4 bg-gold rounded-full" />}
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300">
                      <div className="bg-forest-deep border border-cream/10 rounded-2xl p-3 shadow-2xl min-w-[200px]">
                        {group.links.map((link) => {
                          const isLinkActive = location.pathname.startsWith(link.href);
                          const isExternal = link.href.startsWith("http");
                          return isExternal ? (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`block px-4 py-3 text-[11px] font-bold tracking-widest rounded-xl transition-all ${isLinkActive ? "text-gold bg-white/5" : "text-[#faf7ee]/60 hover:text-gold hover:bg-white/5"}`}
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              key={link.label}
                              to={link.href}
                              className={`block px-4 py-3 text-[11px] font-bold tracking-widest rounded-xl transition-all ${isLinkActive ? "text-gold bg-white/5" : "text-[#faf7ee]/60 hover:text-gold hover:bg-white/5"}`}
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
                    const isActive = group.href && location.pathname.startsWith(group.href);
                    return isExternal ? (
                      <a
                        href={group.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-0.5 px-4 py-2 text-[11px] font-bold tracking-[0.2em] transition-all ${isActive ? "text-gold" : "text-[#faf7ee]/70 hover:text-[#faf7ee]"}`}
                      >
                        {group.label}
                        {isActive && <div className="h-0.5 w-4 bg-gold rounded-full" />}
                      </a>
                    ) : (
                      <Link
                        to={group.href!}
                        className={`flex flex-col items-center gap-0.5 px-4 py-2 text-[11px] font-bold tracking-[0.2em] transition-all ${isActive ? "text-gold" : "text-[#faf7ee]/70 hover:text-[#faf7ee]"}`}
                      >
                        {group.label}
                        {isActive && <div className="h-0.5 w-4 bg-gold rounded-full" />}
                      </Link>
                    );
                  })()
                )}
              </div>
            );
          })}
          <Link 
            to="/support" 
            className={`ml-4 px-6 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg ${location.pathname.startsWith('/support') ? "bg-[#faf7ee] text-forest-deep" : "bg-gold text-forest-deep"}`}
          >
            SUPPORT
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-[#faf7ee]/80 hover:text-[#faf7ee] transition">
            <Search className="h-5 w-5" strokeWidth={2.5} />
          </button>
          
          <Link 
            to="/cart" 
            aria-label="Cart" 
            className="relative text-[#faf7ee]/80 hover:text-[#faf7ee] transition group"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-gold text-forest-deep text-[8px] font-black flex items-center justify-center border-2 border-forest-deep group-hover:scale-110 transition-transform">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <Link 
              to={isAdmin ? "/admin" : "/profile"} 
              aria-label="Account" 
              className="hidden sm:block text-[#faf7ee]/80 hover:text-[#faf7ee] transition"
            >
              <User className="h-6 w-6" strokeWidth={2} />
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link 
                to="/login"
                className="text-[10px] font-bold tracking-[0.2em] text-[#faf7ee]/80 hover:text-[#faf7ee] transition px-2"
              >
                LOGIN
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#faf7ee] text-[10px] font-bold tracking-[0.2em] transition-all border border-white/10 whitespace-nowrap"
              >
                SIGN UP
              </Link>
            </div>
          )}

          <button onClick={() => setOpen((s) => !s)} aria-label="Menu" className="lg:hidden text-[#faf7ee]">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cream/10 bg-forest-deep/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
          <nav className="mx-auto flex max-w-[1440px] flex-col px-6 py-6 space-y-6">
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

