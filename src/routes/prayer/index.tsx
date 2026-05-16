import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Calendar, Play, BookOpen, Download, Globe, ArrowRight, Users, CheckCircle } from "lucide-react";
import { PRAYER_SERIES } from "../../data/prayer-data";

export const Route = createFileRoute("/prayer/")({
  component: PrayerLandingPage,
});

function PrayerLandingPage() {
  const activeSeries = PRAYER_SERIES.find((s) => s.status === "active");
  const upcomingSeries = PRAYER_SERIES.find((s) => s.status === "upcoming");
  const archivedSeries = PRAYER_SERIES.filter((s) => s.status === "archived");

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">

        {/* Hero */}
        <section className="relative py-32 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-gold/90 mb-8 block">
              Global Annual Event
            </span>
            <h1 className="font-display text-6xl sm:text-8xl font-medium tracking-tight leading-[0.9] mb-6">
              Week of <span className="italic text-gold">Prayer</span> Online
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-xl text-cream/75 leading-relaxed">
              Five nights of worship, biblical teaching, and guided prayer â€” streamed live to homes, churches, and schools around the globe.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-cream/60">
              {[
                { icon: Globe, label: "68 Countries" },
                { icon: Users, label: "40,000+ Viewers" },
                { icon: Play, label: "3 Series" },
                { icon: BookOpen, label: "15 Sessions" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gold" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Series */}
        {upcomingSeries && (
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px flex-grow bg-border max-w-16" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Coming Soon</span>
              <span className="h-px flex-grow bg-border" />
            </div>
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3 relative rounded-[2.5rem] overflow-hidden aspect-video shadow-2xl group">
                <img
                  src={upcomingSeries.bannerImage}
                  alt={upcomingSeries.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent flex items-end p-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold bg-gold/10 px-3 py-1 rounded-full mb-3 inline-block">
                      {upcomingSeries.startDate}
                    </span>
                    <h2 className="font-display text-3xl text-cream">{upcomingSeries.theme}</h2>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.35em] text-gold block mb-3">{upcomingSeries.year}</span>
                  <h2 className="font-display text-4xl font-medium">{upcomingSeries.title}</h2>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{upcomingSeries.description}</p>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    `${upcomingSeries.startDate} â€” ${upcomingSeries.endDate}`,
                    "5 video sessions + daily devotionals",
                    `Full access for ${upcomingSeries.accessDays} days`,
                    "School & church facilitator pack",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    to="/prayer/series/$seriesId"
                    params={{ seriesId: upcomingSeries.id }}
                    className="inline-flex items-center gap-2 py-4 px-8 rounded-2xl bg-forest-deep text-cream font-black text-xs uppercase tracking-widest hover:bg-forest-deep/90 transition-all active:scale-95 shadow-lg"
                  >
                    Pre-Order â€” ${upcomingSeries.price} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/prayer/series/$seriesId"
                    params={{ seriesId: upcomingSeries.id }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Active Series */}
        {activeSeries && (
          <section className="py-16 px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px flex-grow bg-border max-w-16" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Available Now</span>
              <span className="h-px flex-grow bg-border" />
            </div>
            <Link
              to="/prayer/series/$seriesId"
              params={{ seriesId: activeSeries.id }}
              className="group grid sm:grid-cols-2 gap-8 p-8 rounded-[2.5rem] bg-card border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <img
                  src={activeSeries.bannerImage}
                  alt={activeSeries.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                  <div className="flex items-center gap-2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Available Now
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">{activeSeries.year}</span>
                <h2 className="font-display text-4xl font-medium group-hover:text-primary transition-colors">{activeSeries.theme}</h2>
                <p className="text-muted-foreground leading-relaxed line-clamp-3">{activeSeries.description}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Play className="h-3.5 w-3.5" /> 5 Sessions</span>
                  <span className="flex items-center gap-1.5"><Download className="h-3.5 w-3.5" /> {activeSeries.downloads.length} Downloads</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {activeSeries.accessDays} days</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-medium text-primary">${activeSeries.price}</span>
                  <span className="text-muted-foreground text-sm">/ school or church</span>
                </div>
                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                  View Series <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Archive */}
        <section className="py-16 px-6 max-w-7xl mx-auto pb-32">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px flex-grow bg-border max-w-16" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Archive</span>
            <span className="h-px flex-grow bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedSeries.map((s) => (
              <Link
                key={s.id}
                to="/prayer/series/$seriesId"
                params={{ seriesId: s.id }}
                className="group flex flex-col rounded-[2rem] bg-card border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={s.thumbnail}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
                    <span className="text-white font-display text-2xl">{s.theme}</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{s.year}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-full">Archive</span>
                  </div>
                  <h3 className="font-display text-lg font-medium group-hover:text-primary transition-colors">{s.tagline}</h3>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-auto pt-2">
                    <span className="flex items-center gap-1"><Play className="h-3 w-3" /> 5 Sessions</span>
                    <span className="flex items-center gap-1"><Download className="h-3 w-3" /> {s.downloads.length} Files</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-lg text-primary">${s.price}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                      View <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
