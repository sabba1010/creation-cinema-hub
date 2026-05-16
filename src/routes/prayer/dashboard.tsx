import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { User, LayoutDashboard, Film, FileText, Download, Settings, LogOut, ChevronRight, Bell, Star, Play } from "lucide-react";

export const Route = createFileRoute("/prayer/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid lg:grid-cols-[250px_1fr] gap-12">
            {/* Sidebar Navigation */}
            <aside className="space-y-8">
              <div className="flex items-center gap-4 p-4 rounded-3xl bg-card border border-border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">John Miller</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Premium Member</p>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { icon: LayoutDashboard, label: "Overview", active: true },
                  { icon: Film, label: "My Library", active: false },
                  { icon: FileText, label: "Resources", active: false },
                  { icon: Bell, label: "Notifications", active: false },
                  { icon: Settings, label: "Account Settings", active: false },
                ].map((item) => (
                  <button key={item.label} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${item.active ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                    <item.icon className="h-4 w-4" /> {item.label}
                  </button>
                ))}
                <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 transition-all mt-4">
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </nav>
            </aside>

            {/* Dashboard Content */}
            <div className="space-y-10">
              {/* Header Stats */}
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { label: "Nights Watched", value: "04 / 07", icon: Film },
                  { label: "Resources Saved", value: "12 Assets", icon: Star },
                  { label: "Community Status", value: "Contributor", icon: User },
                ].map((stat, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-card border border-border shadow-sm flex flex-col justify-between">
                    <stat.icon className="h-6 w-6 text-primary mb-6" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Watching */}
              <div className="p-10 rounded-[2.5rem] bg-forest-deep text-cream overflow-hidden relative group">
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_right,var(--gold),transparent_70%)]" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80 mb-3 block">Next Up</span>
                    <h3 className="font-display text-3xl font-medium mb-4">Night 05: The Earth's Renewal</h3>
                    <p className="text-sm text-cream/70 leading-relaxed mb-6">You're making great progress! Continue your journey through the creation story.</p>
                    <Link to="/prayer/video" className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-gold-foreground transition hover:scale-105">
                      Resume Now <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="relative aspect-video w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                    <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800" alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="h-10 w-10 text-white fill-current" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Materials Download Area */}
              <div>
                <h3 className="font-display text-3xl font-medium text-foreground mb-8">Promo <span className="italic text-primary">Materials</span></h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { title: "Social Media Bundle", type: "ZIP • 45MB", icon: Download },
                    { title: "Church Presentation Deck", type: "PPTX • 12MB", icon: Download },
                    { title: "Printable Posters (Hi-Res)", type: "PDF • 28MB", icon: Download },
                    { title: "Invitation Video (HD)", type: "MP4 • 120MB", icon: Download },
                  ].map((mat, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-card border border-border group hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-5">
                        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
                          <mat.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{mat.title}</h4>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">{mat.type}</p>
                        </div>
                      </div>
                      <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
