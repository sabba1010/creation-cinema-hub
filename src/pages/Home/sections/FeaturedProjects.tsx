import { Play } from "lucide-react";
import earth from "@/assets/project-earth.jpg";
import kidsflix from "@/assets/project-kidsflix.jpg";
import prayer from "@/assets/project-prayer.jpg";
import creationcase from "@/assets/project-creationcase.jpg";
import forest from "@/assets/project-friendlyforest.jpg";
import vbs from "@/assets/project-vbs.jpg";

const PROJECTS = [
  { img: earth, tag: "Podcast", title: "God's Great Earth", desc: "A weekly journey through creation, science, and Scripture.", cta: "Listen" },
  { img: kidsflix, tag: "Kids · Streaming", title: "KidsBibleFlix", desc: "Safe, wonder-filled Bible stories for the whole family.", cta: "Stream Now" },
  { img: prayer, tag: "Live Event", title: "Week of Prayer Online", desc: "Join thousands worldwide for 7 nights of guided prayer.", cta: "Join Free" },
  { img: creationcase, tag: "Film", title: "The Creation Case", desc: "A feature-length documentary on evidence for creation.", cta: "Watch Trailer" },
  { img: forest, tag: "Series · Kids", title: "Friendly Forest", desc: "Animated adventures teaching kindness and courage.", cta: "Explore" },
  { img: vbs, tag: "Curriculum", title: "VBS Resources", desc: "Turn-key vacation Bible school kits for any size church.", cta: "Get Kit" },
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-earth">Featured</span>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight text-forest-deep sm:text-5xl">
              Discover our <span className="italic text-forest">projects</span>
            </h2>
          </div>
          <a href="#" className="text-sm font-semibold text-forest hover:text-gold transition">View all →</a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.title} className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-forest-deep shadow-card transition-all duration-700 hover:shadow-elevated">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={1024}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-card-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/10 to-transparent" />

              <div className="absolute right-5 top-5">
                <span className="rounded-full bg-cream/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream backdrop-blur">{p.tag}</span>
              </div>

              <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-cream/10 backdrop-blur-md ring-1 ring-cream/30 transition-transform duration-500 group-hover:scale-110">
                <Play className="h-5 w-5 fill-cream text-cream" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-cream/75 line-clamp-2">{p.desc}</p>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs font-semibold text-gold-foreground opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                  {p.cta} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
