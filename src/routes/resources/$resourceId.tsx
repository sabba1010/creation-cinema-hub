import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Download, FileText, CheckCircle2, ArrowLeft, Share2, Info, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/resources/$resourceId")({
  component: ResourceDetailsPage,
});

function ResourceDetailsPage() {
  const { resourceId } = Route.useParams();

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:gap-3 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
        </div>

        {/* Resource Details Header */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
              <div className="space-y-10">
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-muted border border-border">
                  <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200" alt="Resource Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="space-y-6">
                  <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-foreground leading-tight">
                    VBS Summer Kit <span className="italic text-primary">2026</span>
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    Our most comprehensive vacation Bible school curriculum yet. Designed for churches of any size, this kit provides a turn-key solution for a transformational 5-day event.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 pt-6">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">What's Included</h4>
                    <ul className="space-y-3">
                      {["Full Teaching Curriculum", "Daily Activity Guides", "Music & Video Assets", "Promo Templates", "Volunteer Training Manual"].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Resource Info</h4>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-sm text-foreground/80">
                        <FileText className="h-4 w-4 text-muted-foreground" /> Format: ZIP / PDF / MP4
                      </li>
                      <li className="flex items-center gap-3 text-sm text-foreground/80">
                        <Info className="h-4 w-4 text-muted-foreground" /> Last Updated: May 2026
                      </li>
                      <li className="flex items-center gap-3 text-sm text-foreground/80">
                        <Share2 className="h-4 w-4 text-muted-foreground" /> License: Ministry Use Only
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Download Card */}
              <div className="sticky top-40 space-y-8">
                <div className="p-10 rounded-[2.5rem] bg-card border border-border shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Ready to Download</span>
                    <span className="text-xs font-bold text-muted-foreground">850MB</span>
                  </div>
                  <h3 className="font-display text-2xl font-medium text-foreground mb-6">Start Equipping Your Team</h3>
                  <button className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3 mb-4">
                    <Download className="h-5 w-5" /> Download Full Kit
                  </button>
                  <p className="text-[10px] text-center text-muted-foreground uppercase tracking-[0.2em]">High Speed Server Access</p>
                  
                  <div className="mt-10 pt-8 border-t border-border">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Related Resources</h4>
                    <div className="space-y-3">
                      {["Youth Ministry Guide", "Volunteer Handouts"].map((item) => (
                        <button key={item} className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted transition-all group">
                          <span className="text-xs font-bold text-foreground/70 uppercase tracking-widest">{item}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-forest-deep text-cream text-center">
                  <h4 className="font-display text-xl mb-3">Need Technical Help?</h4>
                  <p className="text-xs text-cream/60 leading-relaxed mb-6">Our support team is available to help you set up your streaming or printing systems.</p>
                  <button className="w-full py-3 rounded-xl border border-cream/20 text-cream font-bold text-xs uppercase tracking-widest hover:bg-cream/10 transition-all">Contact Support</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
