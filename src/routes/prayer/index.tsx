import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Calendar, Play, BookOpen, Globe, ArrowRight, Users, CheckCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";

export const Route = createFileRoute("/prayer/")({
  component: PrayerLandingPage,
});

function PrayerLandingPage() {
  const [seasons, setSeasons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const res = await fetch(`${API_URL}/api/prayer/seasons`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            const mappedSeasons = data.data.map((s: any) => ({
              id: s._id,
              title: s.title,
              theme: s.theme,
              description: s.description || "",
              price: s.price,
              year: s.title.match(/\d{4}/) ? s.title.match(/\d{4}/)[0] : new Date(s.createdAt).getFullYear().toString(),
              status: s.status,
              accessDays: s.accessDays || 14,
              startDate: s.startDate || "Coming Soon",
              endDate: s.endDate || "",
              bannerImage: s.bannerImage || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80",
              downloads: [] // Just for the count, the actual downloads are per-episode
            }));
            setSeasons(mappedSeasons);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch prayer seasons", err);
      }
      setIsLoading(false);
    };

    fetchSeasons();
  }, []);

  const activeSeries = seasons.filter((s) => s.status === "active" || s.status === "Published");
  const upcomingSeries = seasons.filter((s) => s.status === "upcoming" || s.status === "Draft");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-24">
        <div className="animate-spin h-10 w-10 border-4 border-forest border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">

        {/* Hero */}
        <section className="relative py-32 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--gold),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-gold/90 mb-8 block">
              Global Annual streaming library
            </span>
            <h1 className="font-display text-6xl sm:text-8xl font-medium tracking-tight leading-[0.9] mb-6">
              Week of <span className="italic text-gold">Prayer</span> Online
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-xl text-cream/75 leading-relaxed">
              Five nights of worship, biblical teaching, and guided prayer — streamed live to homes, churches, and schools around the globe.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-cream/60">
              {[
                { icon: Globe, label: "Available Everywhere" },
                { icon: Users, label: "Thousands of Viewers" },
                { icon: Play, label: "Multiple Series Available" },
                { icon: BookOpen, label: "Bible-Based, Kid Approved" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gold" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Series (Available Now) */}
        {activeSeries.length > 0 && (
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px flex-grow bg-border max-w-16" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Available Now</span>
              <span className="h-px flex-grow bg-border" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {activeSeries.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed rounded-2xl">
                  No active seasons currently available.
                </div>
              )}
              {activeSeries.map((series) => (
                <Link
                  key={series.id}
                  to="/prayer/series/$seriesId"
                  params={{ seriesId: series.id }}
                  className="group flex flex-col rounded-[2.5rem] bg-card border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={series.bannerImage}
                      alt={series.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cream bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                          {series.year}
                        </span>
                        <div className="flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Available Now
                        </div>
                      </div>
                      <h3 className="text-white font-display text-3xl font-medium tracking-tight">
                        {series.theme}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <h4 className="font-display text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                        {series.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {series.description}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-6 text-xs text-muted-foreground border-t border-b border-border/60 py-3">
                        <span className="flex items-center gap-1.5"><Play className="h-3.5 w-3.5 text-primary" /> 5 Sessions</span>
                        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {series.accessDays} Days Access</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-2xl font-bold text-primary">${series.price}</span>
                          <span className="text-muted-foreground text-xs">/ school or church</span>
                        </div>
                        <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                          Watch Series <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Series (Coming Soon) */}
        {upcomingSeries.length > 0 && (
          <section className="py-20 px-6 max-w-7xl mx-auto border-t border-border/60 pb-32">
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px flex-grow bg-border max-w-16" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Coming Soon</span>
              <span className="h-px flex-grow bg-border" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingSeries.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed rounded-2xl">
                  No upcoming seasons announced yet.
                </div>
              )}
              {upcomingSeries.map((series) => (
                <div
                  key={series.id}
                  className="group flex flex-col sm:flex-row rounded-[2rem] bg-card border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden bg-muted min-h-[160px]">
                    <img
                      src={series.bannerImage}
                      alt={series.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 sm:from-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-gold text-forest-deep text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                      Coming Soon
                    </div>
                  </div>
                  <div className="p-6 sm:w-3/5 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gold">
                          {series.startDate}
                        </span>
                        <span className="text-[10px] font-black text-muted-foreground">{series.year}</span>
                      </div>
                      <h3 className="font-display text-xl font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {series.theme}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                        {series.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-4 mt-auto">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-lg font-bold text-primary">${series.price}</span>
                        <span className="text-muted-foreground text-[10px]">pre-order</span>
                      </div>
                      <Link
                        to="/prayer/series/$seriesId"
                        params={{ seriesId: series.id }}
                        className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-forest-deep text-cream hover:bg-forest-deep/90 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow"
                      >
                        Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
