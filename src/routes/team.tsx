import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Mail, Linkedin, Twitter, ArrowRight, Star, Users, Film, BookOpen } from "lucide-react";

const LEADERSHIP = [
  {
    name: "Dr. Elias Thorne",
    role: "Executive Director",
    tagline: "Visionary & Theologian",
    bio: "With 20+ years in media ministry, Dr. Thorne leads OMS with a pastor's heart and a filmmaker's eye.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    quote: "Stories are the vessels God uses to carry truth.",
    color: "from-forest-deep to-forest",
    socials: { mail: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Sarah Jenkins",
    role: "Creative Director",
    tagline: "Storyteller & Designer",
    bio: "Sarah shapes the visual identity of every OMS production — ensuring beauty and truth walk hand in hand.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
    quote: "Great design clears the path for the message to land.",
    color: "from-forest to-sky",
    socials: { mail: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Pastor Mark Chen",
    role: "Spiritual Oversight",
    tagline: "Pastor & Theologian",
    bio: "Pastor Mark ensures every word and frame aligns with Scripture, serving as the spiritual anchor of our team.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    quote: "We do not just make media — we make disciples.",
    color: "from-earth to-forest-deep",
    socials: { mail: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Kids Content",
    tagline: "Educator & Producer",
    bio: "Elena champions safe, joyful, and scripture-rooted content designed to delight the youngest hearts in our audience.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    quote: "Children deserve wonder as much as wisdom.",
    color: "from-gold to-earth",
    socials: { mail: "#", linkedin: "#", twitter: "#" },
  },
];

const EXTENDED_TEAM = [
  { name: "James Whitmore", role: "Lead Cinematographer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
  { name: "Amara Osei", role: "Music Composer", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400" },
  { name: "Liam Foster", role: "Post Production Lead", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400" },
  { name: "Priya Anand", role: "Content Strategist", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400" },
  { name: "Daniel Cruz", role: "Curriculum Developer", img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=400" },
  { name: "Naomi Shaw", role: "Community Manager", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=400" },
];

const STATS = [
  { icon: Users, value: "50+", label: "Team Members" },
  { icon: Film, value: "120+", label: "Productions" },
  { icon: BookOpen, value: "100+", label: "Countries Reached" },
  { icon: Star, value: "1M+", label: "Lives Touched" },
];

export const Route = createFileRoute("/team")({
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">

        {/* ── Hero Section ── */}
        <section className="relative py-32 bg-forest-deep text-cream overflow-hidden">
          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-5 [background-image:url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.85%22%20numOctaves%3D%224%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22/%3E%3C/svg%3E')]" />

          {/* Radial glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, var(--color-sky) 0%, transparent 70%)" }} />

          <div className="relative mx-auto max-w-5xl px-6 text-center space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-[10px] font-black tracking-[0.32em] uppercase text-gold">
              Meet the Team
            </span>
            <h1 className="font-display text-6xl sm:text-7xl font-bold tracking-tight leading-[0.9]">
              The People <br />
              <span className="italic text-gold">Behind OMS</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-cream/70 font-light">
              A small, passionate crew of storytellers, educators, pastors, and producers — united by a single calling to craft faith-forward media families can trust.
            </p>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[50px] sm:h-[70px] w-full" style={{ transform: "rotate(180deg)" }}>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FAF7EE" />
            </svg>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="py-14 border-b border-forest/10">
          <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 text-center group">
                <div className="h-12 w-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center group-hover:bg-gold group-hover:text-forest-deep transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-display text-4xl font-bold text-forest-deep">{value}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-earth">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Leadership Cards ── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16 space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-earth">Our Founders</span>
              <h2 className="font-display text-4xl font-bold text-forest-deep">Leadership</h2>
              <p className="mx-auto max-w-xl text-muted-foreground font-light leading-relaxed">
                Visionary leaders who turned a simple dream into a global multimedia ministry.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {LEADERSHIP.map((member) => (
                <article
                  key={member.name}
                  className="group relative rounded-[2.5rem] overflow-hidden bg-white border border-forest/5 hover:border-gold/20 transition-all duration-500 hover:-translate-y-2 flex flex-row"
                  style={{ boxShadow: "var(--shadow-card)", minHeight: "380px" }}
                >
                  {/* Photo — left column, fixed width */}
                  <div className="relative w-[260px] shrink-0 overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="h-full w-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                    {/* Colour gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${member.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

                    {/* Quote — slides up on hover */}
                    <div className="absolute inset-0 flex items-end justify-start p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <blockquote className="text-cream text-sm font-light italic leading-relaxed drop-shadow-lg">
                        <span className="text-gold text-2xl leading-none font-display">"</span>
                        {member.quote}
                        <span className="text-gold text-2xl leading-none font-display">"</span>
                      </blockquote>
                    </div>
                  </div>

                  {/* Content — right column */}
                  <div className="flex flex-col justify-between flex-grow p-8 gap-5">
                    {/* Top: badge + name + role */}
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-forest/8 text-forest text-[10px] font-black tracking-[0.2em] uppercase border border-forest/15">
                        {member.tagline}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-forest-deep leading-tight">{member.name}</h3>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold mt-1">{member.role}</p>
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">{member.bio}</p>
                    </div>

                    {/* Bottom: socials */}
                    <div className="flex items-center gap-3 pt-2 border-t border-forest/8">
                      <a href={member.socials.mail} aria-label="Email" className="h-9 w-9 rounded-full bg-forest/8 border border-forest/15 flex items-center justify-center text-forest hover:bg-gold hover:text-forest-deep hover:border-gold transition-all duration-200">
                        <Mail className="h-4 w-4" />
                      </a>
                      <a href={member.socials.linkedin} aria-label="LinkedIn" className="h-9 w-9 rounded-full bg-forest/8 border border-forest/15 flex items-center justify-center text-forest hover:bg-gold hover:text-forest-deep hover:border-gold transition-all duration-200">
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a href={member.socials.twitter} aria-label="Twitter" className="h-9 w-9 rounded-full bg-forest/8 border border-forest/15 flex items-center justify-center text-forest hover:bg-gold hover:text-forest-deep hover:border-gold transition-all duration-200">
                        <Twitter className="h-4 w-4" />
                      </a>
                      <span className="ml-auto text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">OMS Team</span>
                    </div>
                  </div>

                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Extended Team Grid ── */}
        <section className="py-20 border-t border-forest/8 bg-cream/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16 space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-earth">The Crew</span>
              <h2 className="font-display text-4xl font-bold text-forest-deep">Extended Team</h2>
              <p className="mx-auto max-w-xl text-muted-foreground font-light leading-relaxed">
                Talented individuals who pour their gifts into every production, curriculum, and campaign.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {EXTENDED_TEAM.map((member) => (
                <article
                  key={member.name}
                  className="group flex flex-col items-center gap-4 text-center p-5 rounded-[2rem] bg-white border border-forest/5 hover:border-gold/30 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "0 2px 12px -4px oklch(0.2 0.05 145 / 0.1)" }}
                >
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden shadow-md ring-2 ring-transparent group-hover:ring-gold/40 transition-all duration-300">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-forest-deep leading-tight">{member.name}</h3>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold mt-1">{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Join the Team CTA ── */}
        <section className="py-20 mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[3.5rem] bg-forest-deep text-cream" style={{ boxShadow: "var(--shadow-elevated)" }}>
            {/* Background decor */}
            <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(circle at 70% 30%, var(--color-gold), transparent 60%)" }} />
            <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 10% 80%, var(--color-sky), transparent 60%)" }} />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-12 sm:p-20">
              <div className="space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-[10px] font-black tracking-[0.28em] uppercase text-gold">
                  Join the Story
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
                  Want to connect with our{" "}
                  <span className="italic text-gold">leadership?</span>
                </h2>
                <p className="text-cream/70 text-lg leading-relaxed font-light">
                  If you're interested in partnerships, storytelling, or ministry collaboration, our team is ready to listen.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-forest-deep hover:bg-gold/90 hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Contact the Team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/support"
                    className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-cream hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    Support Our Work
                  </Link>
                </div>
              </div>

              {/* Decorative quote card */}
              <div className="hidden lg:block">
                <div className="rounded-[2rem] border border-cream/10 bg-cream/5 backdrop-blur-sm p-10 space-y-6">
                  <Star className="h-8 w-8 text-gold" />
                  <blockquote className="font-display text-2xl font-light italic text-cream leading-snug">
                    "We are a small crew with a big calling — to plant seeds of wonder in every heart we reach."
                  </blockquote>
                  <div className="flex items-center gap-4 pt-2">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80"
                      alt="Dr. Elias Thorne"
                      className="h-12 w-12 rounded-full object-cover border-2 border-gold/40"
                    />
                    <div>
                      <p className="font-bold text-cream text-sm">Dr. Elias Thorne</p>
                      <p className="text-[11px] uppercase tracking-widest text-gold font-semibold">Executive Director</p>
                    </div>
                  </div>
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
