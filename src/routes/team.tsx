import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const TEAM = [
  { name: "Dr. Elias Thorne", role: "Executive Director", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
  { name: "Sarah Jenkins", role: "Creative Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
  { name: "Pastor Mark Chen", role: "Spiritual Oversight", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Elena Rodriguez", role: "Head of Kids Content", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
];

export const Route = createFileRoute("/team")({
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        <section className="relative py-24 bg-forest-deep text-cream overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1515165562835-c089dd3b95c0?auto=format&fit=crop&q=80&w=2000" alt="One Mustard Seed team" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-transparent" />
          </div>
          <div className="relative mx-auto max-w-5xl px-6 text-center space-y-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Meet the team</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">The people behind <span className="italic text-gold">OMS</span></h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-cream/70">
              We are a small crew of storytellers, educators, pastors, and producers working together to craft faith-forward media that families and churches can trust.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <div key={member.name} className="group rounded-[2rem] overflow-hidden border border-cream/20 bg-white shadow-sm transition hover:shadow-xl">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={member.img} alt={member.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-forest-deep">{member.name}</h2>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-gold">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 rounded-[3rem] border border-cream/20 bg-white p-12 text-center shadow-sm">
              <h2 className="text-3xl font-display font-bold text-forest-deep">Want to connect with our leadership?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-forest-deep/70 leading-relaxed">
                If you're interested in partnerships, storytelling, or ministry collaboration, our team is ready to listen.
              </p>
              <Link to="/contact" className="inline-flex mt-8 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-forest-deep shadow-lg hover:bg-gold/90 transition">
                Contact the Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
