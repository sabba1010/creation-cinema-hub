import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Sparkles,
  Tv,
  Music,
  Heart,
  Star,
  LayoutGrid,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ShieldCheck,
  Sun,
  Cloud,
  Anchor,
  BookOpen,
  Download,
  Info
} from "lucide-react";

export const Route = createFileRoute("/kids/")({
  component: KidsLandingPage,
});

function KidsLandingPage() {
  const [activeTopic, setActiveTopic] = useState("Kindness");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [heroBanner, setHeroBanner] = useState("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchKidsData = async () => {
      try {
        const seriesRes = await fetch("https://movie-backend-drab.vercel.app/api/kids/series");
        const seriesData = await seriesRes.json();
        if (Array.isArray(seriesData)) {
          setSeriesList(seriesData.filter((s: any) => s.status === 'Active'));
        } else {
          setSeriesList([]);
        }

        const settingsRes = await fetch("https://movie-backend-drab.vercel.app/api/kids/settings");
        const settingsData = await settingsRes.json();
        if (settingsData && settingsData.value) {
          setHeroBanner(settingsData.value);
        }
      } catch (error) {
        console.error("Error fetching kids data:", error);
      }
    };
    fetchKidsData();
  }, []);

  const TOPIC_DETAILS: Record<string, {
    name: string;
    icon: any;
    color: string;
    bg: string;
    tagline: string;
    description: string;
    scripture: string;
    verse: string;
    featuredStory: string;
    storyDesc: string;
    storyImg: string;
  }> = {
    Kindness: {
      name: "Kindness",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50",
      tagline: "Spreading Christ's love through actions.",
      description: "Through character-driven stories, children learn the value of empathy, helping others, and understanding how small acts of kindness reflect God's love to the world.",
      scripture: "Ephesians 4:32",
      verse: "'Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.'",
      featuredStory: "Barnaby's Big Basket",
      storyDesc: "When Barnaby the Bear's neighbor loses his winter supply, Barnaby shares his own basket, teaching kids the joy of sacrificial giving.",
      storyImg: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=600"
    },
    Courage: {
      name: "Courage",
      icon: ShieldCheck,
      color: "text-forest-deep",
      bg: "bg-forest-deep/10",
      tagline: "Standing strong in faith and truth.",
      description: "Whether facing fear of the dark or standing up for what is right, our videos show children that they are never alone because God is always with them.",
      scripture: "Joshua 1:9",
      verse: "'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.'",
      featuredStory: "The Brave Little Lantern",
      storyDesc: "Lumi the Lantern must guide the way through a dark storm, discovering that courage isn't the absence of fear, but trusting God's path.",
      storyImg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600"
    },
    Creation: {
      name: "Creation",
      icon: Sparkles,
      color: "text-gold",
      bg: "bg-gold/10",
      tagline: "Discovering the beauty of God's world.",
      description: "From the solar system to the deep blue sea, these science-meets-faith videos foster a sense of awe, wonder, and stewardship for the Earth God created.",
      scripture: "Psalm 19:1",
      verse: "'The heavens declare the glory of God; the skies proclaim the work of his hands.'",
      featuredStory: "Star Sailors: Galaxy Quest",
      storyDesc: "An animated voyage through the cosmos, exploring the scale of stars and the marvel of a Creator who knows each star by name.",
      storyImg: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600"
    },
    Worship: {
      name: "Worship",
      icon: Music,
      color: "text-earth",
      bg: "bg-earth/10",
      tagline: "Praising God with joyful songs.",
      description: "Sing-along videos and music adventures that make praising God fun, active, and a natural part of a child's daily routine.",
      scripture: "Psalm 100:2",
      verse: "'Worship the Lord with gladness; come before him with joyful songs.'",
      featuredStory: "Miracle Melodies: Joyful Noises",
      storyDesc: "Sing-along tracks with animated forest animals teaching children how to praise God in all circumstances.",
      storyImg: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600"
    },
    Honesty: {
      name: "Honesty",
      icon: Star,
      color: "text-gold",
      bg: "bg-gold/5",
      tagline: "Living truthfully in word and deed.",
      description: "Stories that highlight the peace that comes from telling the truth, even when it's hard, and building trust in relationships.",
      scripture: "Proverbs 12:22",
      verse: "'The Lord detests lying lips, but he delights in people who are trustworthy.'",
      featuredStory: "The Broken Toy Tale",
      storyDesc: "When a favorite toy gets broken, Toby the Turtle learns that confessing the truth brings forgiveness and restoration.",
      storyImg: "https://images.unsplash.com/photo-1537655780520-1e392edd816a?auto=format&fit=crop&q=80&w=600"
    },
    Joy: {
      name: "Joy",
      icon: Sun,
      color: "text-gold",
      bg: "bg-gold/10",
      tagline: "Finding happiness in God's presence.",
      description: "Focusing on gratitude, laughter, and spiritual happiness, these videos help kids choose joy even on rainy or difficult days.",
      scripture: "Nehemiah 8:10",
      verse: "'Do not grieve, for the joy of the Lord is your strength.'",
      featuredStory: "Sunshine Samba",
      storyDesc: "An upbeat musical journey showing children how gratitude transforms ordinary moments into celebration.",
      storyImg: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600"
    },
    Peace: {
      name: "Peace",
      icon: Cloud,
      color: "text-sage",
      bg: "bg-sage/10",
      tagline: "Resting in God's protective care.",
      description: "Soothe anxiety and fear with peaceful bedtime stories, calming animations, and prayers that remind kids of God's protection.",
      scripture: "Philippians 4:7",
      verse: "'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'",
      featuredStory: "Quiet Canopy Bedtime",
      storyDesc: "A slow-paced, beautifully scored bedtime narrative that guides kids to restful sleep in the comfort of God's love.",
      storyImg: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=600"
    },
    Faith: {
      name: "Faith",
      icon: Anchor,
      color: "text-forest-deep",
      bg: "bg-forest-deep/5",
      tagline: "Trusting God with all our hearts.",
      description: "Help kids understand biblical faith through stories of heroes like Noah, Abraham, and Daniel, showing how God is always faithful.",
      scripture: "Hebrews 11:1",
      verse: "'Now faith is confidence in what we hope for and assurance about what we do not see.'",
      featuredStory: "Bible Buddies: Noah's Voyage",
      storyDesc: "Follow Noah and the animals on the ark in an epic adventure of obedience, trust, and God's rainbow promise.",
      storyImg: "https://images.unsplash.com/photo-1519340241574-211915c54970?auto=format&fit=crop&q=80&w=600"
    }
  };

  const FAQS = [
    {
      q: "What age group is Kids Bible Flix designed for?",
      a: "Our content is curated for children aged 2 to 11. We offer preschool content that focuses on simple virtues and music, and more narrative-driven content for older kids to explore biblical history and character building."
    },
    {
      q: "Is the content biblically sound?",
      a: "Absolutely. All our scripts, stories, and educational materials are reviewed by theologians, children's ministry directors, and parents before production. Our mission is to stick close to Scripture while making it engaging for children."
    },
    {
      q: "Are there tools for parents and teachers?",
      a: "Yes! Every single video on our platform has a downloadable 'Connection Guide' containing discussion prompts, a memory verse card, and a family activity sheet. Teachers and homeschoolers love these for classroom lessons."
    },
    {
      q: "How does the subscription work?",
      a: "You start with a 7-day free trial. If you decide to stay, it is just $4.99/month. You can cancel at any time with a single click from your profile settings. There are no commitments and no hidden fees."
    },
    {
      q: "Can I watch offline on mobile devices?",
      a: "Yes! With our mobile app, parents can download videos and audio tracks directly to their device. This is perfect for road trips, flights, or anywhere without a reliable internet connection."
    }
  ];

  const currentTopic = TOPIC_DETAILS[activeTopic];

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-gold blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-sage blur-3xl animate-pulse delay-700" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Sparkles className="h-4 w-4 text-gold animate-spin-slow" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Pure · Wonder · Faith</span>
              </div>
              <h1 className="font-display text-6xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
                Where Wonder <br />
                <span className="text-gold italic font-medium">Meets Faith</span>
              </h1>
              <p className="text-lg text-cream/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                The ultimate kid-safe streaming library of wholesome Bible stories, character-building adventures, and faith-based animation that parents trust.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/kids/subscribe" className="bg-gold text-forest-deep px-8 py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-gold/90 hover:scale-102 active:scale-98 transition-all">
                  Start Free Trial
                </Link>
                <Link to="/kids/library" className="bg-white/5 backdrop-blur-md border border-white/15 px-8 py-5 rounded-3xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                  Browse Library Preview
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/10 rounded-[3rem] blur-xl" />
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white/5 bg-forest-deep/50">
                <img src={heroBanner} alt="Kids Flix" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  {seriesList.length > 0 ? (
                    <Link to="/kids/watch/$seriesId" params={{ seriesId: (seriesList[0]._id || seriesList[0].id).toString() }} className="h-20 w-20 rounded-full bg-gold text-forest-deep flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 ml-2 fill-current" />
                    </Link>
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gold/50 text-forest-deep/50 flex items-center justify-center shadow-xl">
                      <Play className="h-8 w-8 ml-2 fill-current" />
                    </div>
                  )}
                </div>
              </div>
              {/* Floating Badges */}
              <div className="absolute -top-6 -right-6 h-20 w-20 bg-gold rounded-full flex flex-col items-center justify-center text-forest-deep shadow-xl border-4 border-forest-deep transform rotate-6">
                <span className="text-xs font-black">NO</span>
                <span className="text-[8px] font-bold uppercase tracking-tighter">ADS EVER</span>
              </div>
            </div>
          </div>
        </section>

        {/* Informational Intro Block */}
        <section className="py-20 bg-white border-b border-[#EFECE3]">
          <div className="mx-auto max-w-5xl px-6 text-center space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">A Sanctuary of Screen Time</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-forest-deep tracking-tight">
              Grow Virtues, Nourish <span className="italic text-gold font-medium">Faith</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Kids Bible Flix isn't just another entertainment service. We design each animated episode and audio adventure to act as a catalyst for deep conversations at home or in the classroom, helping children apply biblical truths to their everyday lives.
            </p>
          </div>
        </section>

        {/* Feature Grid (More text & space) */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "100% Kid-Safe Sanctuary",
                  desc: "We have completely eliminated advertising, external tracking, and auto-play algorithms. Your child enjoys a clean space focused solely on character-building content.",
                  icon: ShieldCheck,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50"
                },
                {
                  title: "Biblically Vetted Material",
                  desc: "Every script and story outline is reviewed by trusted educators and children's directors to ensure it aligns perfectly with scripture and remains highly engaging.",
                  icon: Sparkles,
                  color: "text-gold",
                  bg: "bg-gold/10"
                },
                {
                  title: "Parental Connection Guides",
                  desc: "Access printable discussion guides, reflection cards, and memory verse activities for every single video, allowing you to bridge the gap between media and real life.",
                  icon: BookOpen,
                  color: "text-rose-600",
                  bg: "bg-rose-50"
                }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col gap-5 p-8 bg-white rounded-[2.5rem] border border-[#EFECE3] shadow-sm">
                  <div className={`h-12 w-12 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-forest-deep">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Topic Browser (Browse Topics & Themes) */}
        <section className="py-24 bg-white border-t border-b border-[#EFECE3]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Interactive Preview</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-forest-deep tracking-tight">
                Browse by <span className="italic text-gold font-medium">Character Virtues</span>
              </h2>
              <p className="text-muted-foreground">Select a trait below to discover how we teach it and preview matching stories.</p>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
              {/* Sidebar Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-3">
                {Object.keys(TOPIC_DETAILS).map((topicKey) => {
                  const topic = TOPIC_DETAILS[topicKey];
                  const Icon = topic.icon;
                  const isActive = activeTopic === topicKey;
                  return (
                    <button
                      key={topicKey}
                      onClick={() => setActiveTopic(topicKey)}
                      className={`flex items-center gap-4 p-5 rounded-[1.8rem] transition-all text-left border ${isActive
                          ? "bg-forest-deep text-cream border-forest-deep shadow-lg scale-[1.02]"
                          : "bg-white border-[#EFECE3] text-forest-deep hover:bg-[#FAF7EE]"
                        }`}
                    >
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isActive ? "bg-white/10 text-gold" : `${topic.bg} ${topic.color}`
                        }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-sm tracking-wide">{topic.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Info Panel */}
              <div className="bg-[#FAF7EE] rounded-[3rem] p-8 sm:p-12 border border-[#EFECE3] grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gold uppercase tracking-widest">{currentTopic.tagline}</span>
                    <h3 className="font-display text-4xl font-bold text-forest-deep">{currentTopic.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{currentTopic.description}</p>

                  {/* Scripture Box */}
                  <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-[#EFECE3] space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-forest-deep/60">
                      <BookOpen className="h-3.5 w-3.5 text-primary" /> Key Scripture • {currentTopic.scripture}
                    </div>
                    <p className="text-xs italic font-medium text-forest-deep/90">{currentTopic.verse}</p>
                  </div>
                </div>

                {/* Series for this topic */}
                <div className="mt-6 md:mt-0 w-full overflow-hidden">
                  <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-4 snap-x pl-1 pr-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {seriesList.filter(s => s.topic === activeTopic).length > 0 ? (
                      seriesList.filter(s => s.topic === activeTopic).map(s => (
                        <div key={s._id || s.id} className="shrink-0 w-[280px] sm:w-[320px] bg-white rounded-[2rem] overflow-hidden border border-[#EFECE3] shadow-sm hover:shadow-md group transition-all snap-start">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={s.image || s.img}
                              alt={s.name || s.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop";
                              }}
                            />
                            <div className="absolute inset-0 bg-black/5" />
                          </div>
                          <div className="p-6 space-y-4">
                            <h4 className="font-display text-xl font-bold text-forest-deep group-hover:text-gold transition-colors leading-tight">{s.name || s.title}</h4>
                            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{s.description || s.desc}</p>
                            <Link to="/kids/watch/$seriesId" params={{ seriesId: (s._id || s.id).toString() }} className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-deep hover:text-gold transition-colors pt-2">
                              Preview Video <Play className="h-3 w-3 fill-current" />
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full py-12 text-center bg-white/50 rounded-[2rem] border border-[#EFECE3] border-dashed">
                        <p className="text-muted-foreground text-sm font-medium">More series coming soon for {activeTopic}!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Series Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-2 block">Our Shows</span>
                <h2 className="font-display text-4xl font-bold text-forest-deep tracking-tight">
                  Explore Popular <span className="italic text-gold font-medium">Series & Animation</span>
                </h2>
              </div>
              <Link to="/kids/library" className="text-sm font-bold text-forest-deep/60 hover:text-gold flex items-center gap-2 transition-colors shrink-0">
                Browse Complete Library <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {seriesList.length === 0 && (
                <div className="col-span-full py-16 text-center text-muted-foreground/70 text-lg font-medium">
                  Exciting new series are coming soon! Stay tuned.
                </div>
              )}
              {seriesList.map((s, i) => (
                <div key={s._id || i} className="group bg-white rounded-[2.5rem] border border-[#EFECE3] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={s.image || s.img}
                      alt={s.name || s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1502086223501-7ea2443054f1?w=400&h=200&fit=crop";
                      }}
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full ${s.color || 'bg-forest-deep text-cream'} text-[10px] font-bold uppercase tracking-widest shadow-sm`}>
                        {s.episodeCount ?? s.episodes ?? 0} Episodes
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-display font-bold text-forest-deep group-hover:text-gold transition-colors">{s.name || s.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">{s.description || s.desc}</p>
                    </div>
                    <Link to="/kids/watch/$seriesId" params={{ seriesId: (s._id || s.id).toString() }} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-gold transition-colors mt-auto border-t border-cream/30 pt-4">
                      View Episodes <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources & Printables Section (New informational space) */}
        <section className="py-24 bg-forest-deep text-cream">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <BookOpen className="h-4 w-4 text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Beyond the Screen</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Printable Guides & <br />
                <span className="text-gold italic font-medium">Family Activations</span>
              </h2>
              <p className="text-cream/70 leading-relaxed text-sm sm:text-base">
                We believe video is only the beginning. That's why every episode on Kids Bible Flix comes packed with teacher-vetted educational worksheets, memory verse coloring pages, and hands-on family connection prompts designed to take lesson materials off-screen and into everyday conversation.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Discussion Cards", desc: "Open-ended questions tailored for dinner table chat or class lessons." },
                  { title: "Crafts & Coloring", desc: "Age-appropriate activity pages reinforcing the scripture focus." },
                  { title: "Memory Verses", desc: "Printable cards for memorizing verses in fun, interactive ways." },
                  { title: "Sunday School Kits", desc: "Simple guides for churches or homeschool groups to run lessons." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{item.title}</h4>
                      <p className="text-cream/50 text-xs mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-gold/5 blur-3xl rounded-full" />
              <div className="relative bg-white/5 backdrop-blur rounded-[3rem] p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div>
                    <h3 className="font-display text-lg text-white">Connection Guide Sample</h3>
                    <p className="text-xs text-cream/40">Friendly Forest • Episode 4</p>
                  </div>
                  <button className="h-10 w-10 bg-gold rounded-full flex items-center justify-center text-forest-deep shadow hover:scale-105 transition-transform">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4 text-sm text-cream/80">
                  <div className="p-4 bg-white/5 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider">Bible Focus</span>
                    <p className="text-xs italic">"But the fruit of the Spirit is love, joy, peace, forbearance, kindness..." — Galatians 5:22</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">Conversation Starters</span>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-cream/60">
                      <li>Why was Barnaby worried about sharing his supply?</li>
                      <li>Can you name a time when someone shared something with you?</li>
                      <li>How does God help us feel secure when we give?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section (New informational space) */}
        <section className="py-24 bg-white border-b border-[#EFECE3]">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Got Questions?</span>
              <h2 className="font-display text-4xl font-bold text-forest-deep tracking-tight">
                Frequently Asked <span className="italic text-gold font-medium">Questions</span>
              </h2>
              <p className="text-muted-foreground">Clear answers to help you make the best decision for your family or classroom.</p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-[#EFECE3] rounded-2xl bg-[#FAF7EE] overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left font-bold text-forest-deep text-base sm:text-lg hover:bg-cream/20 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="h-5 w-5 text-gold shrink-0 ml-4" /> : <ChevronDown className="h-5 w-5 text-gold shrink-0 ml-4" />}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed border-t border-cream/30 pt-4 bg-white/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing / Trial Box */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="bg-forest-deep rounded-[3rem] p-12 lg:p-20 text-cream relative overflow-hidden shadow-2xl border border-white/5">
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 text-center lg:text-left">
                  <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                    Unlimited <span className="text-gold">Wonder</span> <br />
                    for just $4.99/mo
                  </h2>
                  <ul className="space-y-4 max-w-md mx-auto lg:mx-0">
                    {["100% Ad-free experience", "Offline download support", "Weekly new releases", "Printable Connection Guides included"].map((f) => (
                      <li key={f} className="flex items-center gap-4 font-bold text-cream/90 text-sm sm:text-base justify-center lg:justify-start">
                        <CheckCircle2 className="h-5 w-5 text-gold shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/kids/subscribe" className="inline-block bg-gold text-forest-deep px-10 py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-gold/90 transition-all hover:scale-102 active:scale-98">
                    Start 7-Day Free Trial
                  </Link>
                </div>
                <div className="hidden lg:block relative">
                  <div className="absolute -inset-10 bg-gold/10 blur-3xl rounded-full" />
                  <img src="https://images.unsplash.com/photo-1512418490979-92798ccc1380?auto=format&fit=crop&q=80&w=800" alt="Family" className="relative rounded-[2rem] shadow-2xl rotate-3 border-4 border-white/10" />
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
