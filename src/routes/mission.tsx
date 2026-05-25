import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Heart, Globe, Users, Sparkles, Sprout } from "lucide-react";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Our Mission — One Mustard Seed" },
      { name: "description", content: "Learn about the mission and vision behind One Mustard Seed." },
    ],
  }),
  component: MissionPage,
});

function MissionPage() {
  return (
    <div className="bg-[#050704] min-h-screen flex flex-col text-cream selection:bg-gold/30">
      <SiteHeader />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-24 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[#050704]">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050704]/40 via-[#050704]/80 to-[#050704]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center space-y-6 mt-12">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold uppercase tracking-[0.4em] text-gold backdrop-blur-md">
              <Sparkles className="w-3 h-3 animate-pulse" /> Our Purpose
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1]">
              Faith-Centered <span className="italic text-gold block sm:inline">Storytelling</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-cream/70 font-light leading-relaxed mt-6">
              A faith-centered media ministry creating cinematic stories, resources, and experiences for families, churches, and schools around the world.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Heart className="w-12 h-12 text-gold mx-auto mb-8 opacity-80" />
            <h2 className="font-display text-3xl sm:text-5xl font-medium text-cream mb-8 leading-tight">
              To plant seeds of faith that grow into a <span className="text-gold italic">global impact</span>.
            </h2>
            <p className="text-cream/60 text-lg leading-relaxed max-w-3xl mx-auto">
              We believe that storytelling is a powerful tool to inspire, educate, and transform lives. Through compelling media, we aim to share messages of hope, love, and faith that resonate across generations and cultures. Like a mustard seed, small beginnings can lead to extraordinary growth and impact.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-24 bg-white/[0.02] border-y border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: Globe,
                  title: "Global Reach",
                  desc: "Creating content that transcends borders and languages, bringing messages of faith to diverse communities worldwide."
                },
                {
                  icon: Users,
                  title: "Community First",
                  desc: "Empowering families, churches, and schools with resources that foster connection, spiritual growth, and shared values."
                },
                {
                  icon: Sprout,
                  title: "Lasting Impact",
                  desc: "Planting seeds of truth and inspiration that take root in hearts and minds, yielding lifelong spiritual transformation."
                }
              ].map((pillar, i) => (
                <div key={i} className="text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto border border-gold/20">
                    <pillar.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-cream font-medium">{pillar.title}</h3>
                  <p className="text-cream/60 leading-relaxed text-sm">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/70">Join the Mission</div>
            <h2 className="font-display text-4xl sm:text-5xl text-cream">Partner with Us</h2>
            <p className="text-cream/60 max-w-2xl mx-auto text-lg">
              Your support helps us continue creating impactful stories and resources. Together, we can reach more hearts and minds.
            </p>
            <div className="pt-8">
              <a href="/support" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold text-forest-deep font-bold hover:bg-gold/90 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Support the Ministry
              </a>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
