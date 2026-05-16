import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/pages/Home/sections/Hero";
import { FeaturedProjects } from "@/pages/Home/sections/FeaturedProjects";
import { Films } from "@/pages/Home/sections/Films";
import { Support } from "@/pages/Home/sections/Support";
import { Events } from "@/pages/Home/sections/Events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One Mustard Seed — Faith-centered media for families, churches & schools" },
      {
        name: "description",
        content:
          "One Mustard Seed (OMS) is a faith-centered multimedia ministry creating films, podcasts, events, and resources for families, churches, and schools.",
      },
      { property: "og:title", content: "One Mustard Seed — Wonder. Explore. Belong." },
      {
        property: "og:description",
        content:
          "Cinematic films, kid-safe streaming, podcasts, live events, and curriculum from One Mustard Seed Ministries.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Events />
        <FeaturedProjects />
        <Films />
        <Support />
      </main>
      <SiteFooter />
    </div>
  );
}
