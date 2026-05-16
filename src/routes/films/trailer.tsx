import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { Play, ArrowLeft, Maximize, Volume2, Settings, Share2, X } from "lucide-react";

export const Route = createFileRoute("/films/trailer")({
  component: TrailerPage,
});

function TrailerPage() {
  return (
    <div className="bg-foreground min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24 flex items-center justify-center bg-black">
        <div className="mx-auto max-w-6xl px-6 w-full py-12">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/films" className="flex items-center gap-2 text-sm font-bold text-cream uppercase tracking-widest hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" /> Back to Films
            </Link>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">Official Trailer</p>
              <h1 className="font-display text-2xl text-cream">The Seed (2024)</h1>
            </div>
            <Link to="/films" className="h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition">
              <X className="h-5 w-5" />
            </Link>
          </div>

          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-muted shadow-2xl border border-white/5 group">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-gold/90 text-gold-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-glow">
                  <Play className="h-10 w-10 fill-current ml-1" />
                </div>
             </div>
             {/* Simulated Player UI */}
             <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-1 w-full bg-white/20 rounded-full mb-6 overflow-hidden">
                  <div className="h-full w-[15%] bg-gold" />
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-8">
                    <Play className="h-5 w-5 fill-current" />
                    <Volume2 className="h-5 w-5" />
                    <span className="text-sm font-medium">0:24 / 2:45</span>
                  </div>
                  <div className="flex items-center gap-8">
                    <Share2 className="h-5 w-5" />
                    <Settings className="h-5 w-5" />
                    <Maximize className="h-5 w-5" />
                  </div>
                </div>
             </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
            <p className="text-cream/60 leading-relaxed max-w-xl">
              "The Seed" takes you on a journey through the unseen world. Experience the documentary that critics are calling 'a visual prayer.' Coming to the OMS Cinema Hub this fall.
            </p>
            <div className="flex justify-end gap-4">
               <button className="rounded-full bg-primary px-10 py-5 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg hover:scale-105 transition-all">Pre-Order Now</button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
