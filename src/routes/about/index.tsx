import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { 
  Sparkles, 
  History, 
  Heart, 
  Target, 
  Compass, 
  Users, 
  BookOpen, 
  Film, 
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Us — One Mustard Seed" },
      {
        name: "description",
        content:
          "Discover the history, vision, and mission of One Mustard Seed (OMS) Ministries. Learn how we began and how we are growing a generation of faith.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const VALUES = [
    {
      Icon: Compass,
      title: "Scripture & Wonder",
      desc: "We believe discovering the Creator through His creation should be filled with awe, curiosity, and deep biblical truth."
    },
    {
      Icon: Heart,
      title: "Family Centered",
      desc: "Creating content and experiences that bring families, classrooms, and churches closer together in shared faith."
    },
    {
      Icon: ShieldCheck,
      title: "Pure Integrity",
      desc: "100% kid-safe and parent-approved. Free from harmful ads, data trackers, or agenda-driven content."
    },
    {
      Icon: Award,
      title: "Cinematic Excellence",
      desc: "Faith-centered media deserves the highest standards of visual, musical, and narrative craft."
    }
  ];

  const MILESTONES = [
    {
      year: "2020",
      title: "The Tiny Seed",
      desc: "A small team of passionate filmmakers, educators, and pastors gathered with a unified dream: to create faith-centered media that inspires wonder rather than just passive viewing. One Mustard Seed was born.",
      icon: Sparkles
    },
    {
      year: "2022",
      title: "The First Harvest",
      desc: "We released our flagship feature-length documentary, 'The Creation Case.' Over 100,000 families watched it in the first six months, leading to invitations to host community events across North America.",
      icon: Film
    },
    {
      year: "2024",
      title: "A Home for Little Hearts",
      desc: "Recognizing the critical need for safe streaming for children, we launched KidsBibleFlix. An ad-free, wonder-filled portal with dozens of scripture-rooted animated series and songs.",
      icon: Users
    },
    {
      year: "2026",
      title: "Deep Roots, Broad Branches",
      desc: "Expanding into live experiences, curriculum, and interactive family devotions. Today, OMS reaches over a million lives across 100+ countries, always staying true to the simple seed of faith.",
      icon: History
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />
      
      <main className="pb-20">
        {/* Cinematic Header Section */}
        <section className="pt-32 pb-24 bg-forest-deep text-cream relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(circle_at_center,var(--color-gold),transparent_70%)]" />
            <div className="absolute bottom-0 left-0 w-[40%] h-full bg-[radial-gradient(circle_at_center,var(--color-sky),transparent_70%)]" />
          </div>
          
          <div className="container px-6 mx-auto relative z-10 text-center lg:text-left">
            <div className="max-w-3xl animate-fade-up">
              <Badge className="mb-6 bg-gold/10 text-gold border-gold/20 hover:bg-gold/20 px-4 py-1.5 rounded-full transition-all tracking-[0.2em] uppercase text-[10px] font-black">
                Our History
              </Badge>
              <h1 className="text-5xl md:text-8xl font-display font-medium text-cream mb-8 leading-[0.9] tracking-tighter">
                Growing A <span className="italic text-gold block sm:inline">Generation</span> Of Faith
              </h1>
              <p className="text-xl text-cream/70 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                Discover the story, the heart, and the global vision of One Mustard Seed Ministries.
              </p>
            </div>
          </div>
          
          {/* Elegant Wave Transition */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[40px] sm:h-[60px] lg:h-[80px] w-full" style={{ transform: "rotate(180deg)" }}>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="var(--color-background)"></path>
            </svg>
          </div>
        </section>

        {/* Narrative Vision Section */}
        <section className="py-20 container px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-earth">The Dream</span>
              <h2 className="font-display text-4xl font-light text-forest-deep leading-tight">
                Faith as small as a <span className="italic text-forest">mustard seed</span> can move mountains.
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                One Mustard Seed (OMS) began with a simple but radical premise: that faith, science, and beautiful art do not have to be strangers. In a world of hurried feeds and screen-driven noise, we wanted to build a sanctuary of media that inspires children and adults to look up, wonder, and belong.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                As a multimedia ministry, we construct films, podcasts, books, and curriculum designed to nourish deep roots. We partner with parents, pastors, and educators in over 100 countries to plant seeds of trust and curiosity that grow into trees of lifelong conviction.
              </p>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-card bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200" 
                alt="Family studying together in joy" 
                className="w-full h-auto object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-cream">
                <p className="text-[9px] uppercase tracking-widest font-black text-gold mb-1">Our Heartbeat</p>
                <h4 className="font-display text-xl">Connecting Hearts Across Generations</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Timeline Section */}
        <section className="py-24 bg-cream/30 border-y border-cream/10">
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-earth">Our Timeline</span>
              <h2 className="mt-3 font-display text-4xl font-light text-forest-deep">The Journey of the Seed</h2>
              <p className="mt-4 text-muted-foreground">From a quiet kitchen table discussion to a global multimedia ecosystem.</p>
            </div>

            <div className="relative border-l-2 border-forest/20 ml-4 md:ml-32 space-y-16">
              {MILESTONES.map((milestone, idx) => (
                <div key={milestone.year} className="relative pl-8 md:pl-16 group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[17px] top-1.5 h-8 w-8 rounded-full bg-cream border-2 border-forest flex items-center justify-center shadow-md group-hover:bg-gold group-hover:border-gold transition-colors duration-300">
                    <milestone.icon className="h-4 w-4 text-forest group-hover:text-forest-deep" />
                  </div>
                  
                  <div className="grid md:grid-cols-[120px_1fr] gap-4">
                    <div className="font-display text-3xl font-bold text-forest">{milestone.year}</div>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-semibold text-forest-deep">{milestone.title}</h3>
                      <p className="text-muted-foreground leading-relaxed font-light text-lg max-w-3xl">{milestone.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 container px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-earth">What Guides Us</span>
            <h2 className="mt-3 font-display text-4xl font-light text-forest-deep">Our Core Values</h2>
            <p className="mt-4 text-muted-foreground">The pillars that keep our roots firm and our branches growing true.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ Icon, title, desc }) => (
              <Card key={title} className="border border-border/50 bg-card p-8 rounded-[2.5rem] shadow-sm hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0 space-y-5">
                  <div className="h-12 w-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl text-forest-deep">{title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 container px-6 mx-auto">
          <div className="relative overflow-hidden rounded-[3.5rem] bg-forest-deep text-cream shadow-elevated">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_20%,var(--color-gold),transparent_60%)]" />
            <div className="relative z-10 p-12 sm:p-20 text-center space-y-8 max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-[10px] font-black tracking-widest uppercase text-gold">Be a Part of the Story</span>
              <h2 className="font-display text-4xl sm:text-6xl font-light leading-tight">
                Let’s sow more <br /><span className="italic text-gold">seeds of wonder.</span>
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed font-light">
                Whether you’re a parent watching with your children, a teacher using our curricula, or a donor standing with our mission, we thank you. Together, we are building a shelter of faith.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link to="/support" className="bg-gold text-forest-deep px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-gold/20">
                  Support Our Mission
                </Link>
                <Link to="/contact" className="border border-cream/30 hover:border-gold hover:text-gold px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
