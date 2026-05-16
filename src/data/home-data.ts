import earth from "@/assets/project-earth.jpg";
import kidsflix from "@/assets/project-kidsflix.jpg";
import prayer from "@/assets/project-prayer.jpg";
import creationcase from "@/assets/project-creationcase.jpg";
import eventImg from "@/assets/event-live.jpg";

export const FEATURED_PROJECTS = [
  { 
    id: "podcast",
    img: earth, 
    tag: "Podcast", 
    title: "God's Great Earth", 
    desc: "A weekly journey through creation, science, and Scripture.", 
    cta: "Listen Now",
    to: "/podcast"
  },
  { 
    id: "films",
    img: kidsflix, 
    tag: "Streaming", 
    title: "One Mustard Seed Hub", 
    desc: "Safe, wonder-filled Bible stories and documentaries.", 
    cta: "Stream Now",
    to: "/films"
  },
  { 
    id: "prayer",
    img: prayer, 
    tag: "Live Event", 
    title: "Week of Prayer Online", 
    desc: "Join thousands worldwide for 7 nights of guided prayer.", 
    cta: "Join Free",
    to: "/prayer"
  },
  { 
    id: "film-doc",
    img: creationcase, 
    tag: "Film", 
    title: "The Creation Case", 
    desc: "A feature-length documentary on evidence for creation.", 
    cta: "Watch Trailer",
    to: "/films/trailer"
  },
  { 
    id: "events",
    img: eventImg, 
    tag: "Events", 
    title: "OMS Live Events", 
    desc: "Experience faith-building live events in your local community.", 
    cta: "View Events",
    to: "/events"
  },
];

export const HERO_CONTENT = {
  subtitle: "A faith-centered media ministry",
  title: "Wonder. Explore. Belong.",
  description: "Discover the Creator through His creation.",
  primaryCTA: { label: "Watch Now", href: "/films" },
  secondaryCTA: { label: "Explore More", href: "#projects" }
};
