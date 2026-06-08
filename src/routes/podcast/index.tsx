import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Play, Mic2 } from "lucide-react";
import { usePodcast } from "../podcast";

import applePodcastsLogo from "@/assets/logo/Apple Podcasts.png";
import spotifyLogo from "@/assets/logo/Spotify.png";
import youtubeMusicLogo from "@/assets/logo/YouTube Music.png";
import overcastLogo from "@/assets/logo/Overcast.png";
import pocketCastsLogo from "@/assets/logo/Pocket Casts.png";
import castboxLogo from "@/assets/logo/Castbox.jpg";
import castroLogo from "@/assets/logo/Castro.png";
import downcastLogo from "@/assets/logo/Downcast.png";

export const Route = createFileRoute("/podcast/")({
  component: PodcastLandingPage,
});

import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";

const PLATFORMS = [
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com",
    icon: applePodcastsLogo,
    color: "hover:bg-[#872ec4] hover:text-white hover:border-[#872ec4]",
  },
  {
    name: "Spotify",
    url: "https://spotify.com",
    icon: spotifyLogo,
    color: "hover:bg-[#1ed760] hover:text-black hover:border-[#1ed760]",
  },
  {
    name: "YouTube Music",
    url: "https://music.youtube.com",
    icon: youtubeMusicLogo,
    color: "hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000]",
  },
  {
    name: "Overcast",
    url: "https://overcast.fm",
    icon: overcastLogo,
    color: "hover:bg-[#fc7e0f] hover:text-white hover:border-[#fc7e0f]",
  },
  {
    name: "Pocket Casts",
    url: "https://pocketcasts.com",
    icon: pocketCastsLogo,
    color: "hover:bg-[#f43e37] hover:text-white hover:border-[#f43e37]",
  },
  {
    name: "Castbox",
    url: "https://castbox.fm",
    icon: castboxLogo,
    color: "hover:bg-[#f55b23] hover:text-white hover:border-[#f55b23]",
  },
  {
    name: "Castro",
    url: "https://castro.fm",
    icon: castroLogo,
    color: "hover:bg-[#00b269] hover:text-white hover:border-[#00b269]",
  },
  {
    name: "Downcast",
    url: "https://downcastapp.com",
    icon: downcastLogo,
    color: "hover:bg-[#1c3c5c] hover:text-white hover:border-[#1c3c5c]",
  }
];

const DEFAULT_BANNER = {
  tag: "OMS Podcast Network",
  title: "God's Great Earth Podcast",
  description: "Join us every Tuesday for deep conversations, biblical insights, and stories that celebrate the wonder of our Creator. Available on all major platforms.",
  buttonText: "Latest Episode",
  image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
  videoTitle: "The Majesty of the Mountains",
  videoSubtitle: "Watch Episode",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  audioTitle: "The Architecture of Light",
  audioSeasonTitle: "Season 1, Episode 1"
};

function PodcastLandingPage() {
  const { playEpisode } = usePodcast();
  const [activeForm, setActiveForm] = useState<"welcome" | "shoutout" | "brainTeaser" | "joke">("welcome");
  const [seasons, setSeasons] = useState<any[]>([]);

  const [bannerData, setBannerData] = useState(DEFAULT_BANNER);

  useEffect(() => {
    fetch(`${API_URL}/api/podcast/seasons`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSeasons(data.data.filter((s: any) => s.status === 'Active' || s.status === 'Completed'));
        }
      })
      .catch(console.error);

    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.podcast_banner) {
          setBannerData({ ...DEFAULT_BANNER, ...data.data.podcast_banner });
        }
      })
      .catch(console.error);
  }, []);

  const resolveUrl = (url: string) => !url ? '' : url.startsWith('http') || url.startsWith('data:') ? url : `${API_URL}${url.startsWith('/') ? '' : '/'}${url}`;

  const featuredEpisode = {
    id: "featured",
    title: bannerData.audioTitle,
    duration: "00:00",
    date: new Date().toLocaleDateString(),
    audioUrl: resolveUrl(bannerData.audioUrl),
    coverImage: resolveUrl(bannerData.image),
    seasonTitle: bannerData.audioSeasonTitle,
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24">
        {/* Podcast Hero */}
        <section className="relative py-24 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_30%,var(--gold),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
                <Mic2 className="h-3 w-3" /> {bannerData.tag}
              </span>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-none" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                {bannerData.title}
              </h1>
              <p className="mt-8 text-lg text-cream/75 leading-relaxed max-w-xl" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                {bannerData.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button
                  onClick={() => playEpisode(featuredEpisode)}
                  className="rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-gold-foreground shadow-lg hover:scale-105 transition cursor-pointer inline-block"
                >
                  {bannerData.buttonText}
                </button>
                <div className="flex items-center gap-3">
                  {PLATFORMS.slice(0, 4).map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 grid place-items-center rounded-full bg-cream/10 hover:bg-cream/25 transition cursor-pointer"
                      title={`Listen on ${p.name}`}
                    >
                      <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
                        <img src={p.icon} alt={p.name} className="h-4 w-4 object-contain" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-up [animation-delay:200ms]">
              <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border border-cream/10">
                <img src={resolveUrl(bannerData.image)} alt="Podcast Studio" className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold">{bannerData.videoSubtitle}</p>
                    <p className="text-xl font-medium" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>{bannerData.videoTitle}</p>
                  </div>
                  <button
                    onClick={() => playEpisode(featuredEpisode)}
                    className="h-14 w-14 rounded-full bg-cream text-forest-deep grid place-items-center shadow-glow hover:scale-105 hover:bg-gold hover:text-gold-foreground transition cursor-pointer"
                  >
                    <Play className="h-6 w-6 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listen & Subscribe Platforms */}
        <section className="py-16 bg-card border-y border-border">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-[48px] font-medium text-foreground mb-4" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>Listen & Subscribe</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-[18px]">
              Tune in and follow our podcast on your favorite app. Available on all major platforms:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {PLATFORMS.map((p) => {
                let dynamicUrl = p.url;
                if (seasons.length > 0) {
                  if (p.name === "Spotify" && seasons[0].spotifyUrl) dynamicUrl = seasons[0].spotifyUrl;
                  if (p.name === "Apple Podcasts" && seasons[0].applePodcastsUrl) dynamicUrl = seasons[0].applePodcastsUrl;
                }

                return (
                  <a
                    key={p.name}
                    href={dynamicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border border-border bg-background transition-all duration-300 hover:scale-[1.03] hover:shadow-md cursor-pointer ${p.color}`}
                  >
                    <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center p-1 shadow-sm flex-shrink-0">
                      <img src={p.icon} alt={p.name} className="h-5 w-5 object-contain" />
                    </div>
                    <span className="font-semibold text-sm">{p.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Seasons Grid */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-medium text-foreground" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>Explore <span className="italic text-primary">Seasons</span></h2>
                <p className="mt-4 text-muted-foreground text-[18px]">Journey through our curated collections of faith and wonder.</p>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">{seasons.length} Seasons Total</span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {seasons.map((s, index) => (
                <Link
                  key={s._id}
                  to="/podcast/season/$seasonId"
                  params={{ seasonId: s._id }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-[4/5] bg-muted">
                    <img src={s.image ? resolveUrl(s.image) : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold/90 mb-2">Season {index + 1} • {s.episodesCount || 0} Episodes</p>
                      <h3 className="text-2xl font-medium text-cream group-hover:text-gold transition-colors" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>{s.title}</h3>
                      <p className="mt-3 text-sm text-cream/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{s.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* Submit Your Thoughts */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-[48px] font-medium text-foreground" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>Submit Your <span className="italic text-primary">Thoughts</span></h2>
              <p className="mt-4 text-muted-foreground text-[18px]">Share your voice, jokes, and brain teasers with the OMS Podcast Network!</p>
            </div>

            {/* Tab Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {[
                { id: "welcome", label: "Welcome Clip" },
                { id: "shoutout", label: "Shoutout" },
                { id: "brainTeaser", label: "Brain Teaser" },
                { id: "joke", label: "Joke" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveForm(tab.id as any)}
                  className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${activeForm === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-background border border-border text-foreground hover:bg-muted"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="w-full grid lg:grid-cols-2 gap-16 items-start transition-opacity duration-500">
              {/* Dynamic Copy */}
              <div className="animate-fade-up" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                {activeForm === "welcome" && (
                  <>
                    <h3 className="text-4xl sm:text-5xl font-medium leading-tight mb-6" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                      Send us your <br /><span className="text-primary uppercase">Welcome Clip</span><br /> here!
                    </h3>
                    <div className="space-y-4 text-muted-foreground text-[18px] leading-relaxed">
                      <p>We're trying something new! Your kids will now do the WELCOME for each episode!</p>
                      <p>All you have to do is record your child enthusiastically saying this:</p>
                      <p className="font-bold text-foreground italic">"Hello! My name is [FIRST NAME], from [CITY AND STATE/PROVINCE/COUNTRY], welcome to God's Great Earth!"</p>
                      <p className="text-xs mt-4">INSTRUCTIONS:<br />Record it with any <strong>audio recorder</strong> on your phone, or even a <strong>video recording</strong> if that's easier. Make sure your child is close to the microphone to get a high-quality recording. Pick your one best recording and send it to us using this form.</p>
                    </div>
                  </>
                )}
                {activeForm === "shoutout" && (
                  <>
                    <h3 className="text-4xl sm:text-5xl font-medium leading-tight mb-6" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                      Submit your <br /><span className="text-primary uppercase">Shoutout</span><br /> request here!
                    </h3>
                    <div className="space-y-4 text-muted-foreground text-[18px] leading-relaxed">
                      <p>Submit a request for a shout-out for your child from Rich! You can submit your child's FIRST NAME and LAST NAME INITIAL, plus their LOCATION, and we will give kids a special "SHOUT OUT" during a new segment on the show each week!</p>
                    </div>
                  </>
                )}
                {activeForm === "brainTeaser" && (
                  <>
                    <h3 className="text-4xl sm:text-5xl font-medium leading-tight mb-6" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                      Submit your <br /><span className="text-primary uppercase">Brain Teasers</span><br /> here!
                    </h3>
                    <div className="space-y-4 text-muted-foreground text-[18px] leading-relaxed">
                      <p>We need your brain teasers! Send them to us right here!</p>
                    </div>
                  </>
                )}
                {activeForm === "joke" && (
                  <>
                    <h3 className="text-4xl sm:text-5xl font-medium leading-tight mb-6" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                      Submit your <br /><span className="text-primary uppercase">Jokes</span><br /> here!
                    </h3>
                    <div className="space-y-4 text-muted-foreground text-[18px] leading-relaxed">
                      <p>Yes! We're looking for all those squeaky-clean jokes! Send them in here!</p>
                    </div>
                  </>
                )}
              </div>

              {/* Dynamic Form */}
              <div className="bg-card border border-border rounded-3xl p-8 shadow-sm animate-fade-up" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                <h4 className="text-xl font-medium mb-6 text-foreground">Please fill out this form</h4>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Parent's name" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50" />
                  <input type="email" placeholder="Parent's email" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50" />
                  <input type="text" placeholder="Child's First name and last name initial (ex: Rich A.)" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50" />
                  <input type="text" placeholder="City and State/Province/Country" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50" />

                  {activeForm === "welcome" && (
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Upload file here!</label>
                      <input type="file" className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" />
                    </div>
                  )}
                  {activeForm === "brainTeaser" && (
                    <textarea placeholder="Enter your BRAIN TEASER here!" rows={3} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none"></textarea>
                  )}
                  {activeForm === "joke" && (
                    <textarea placeholder="Enter your JOKE here!" rows={3} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none"></textarea>
                  )}

                  <button type="submit" className="w-full py-4 mt-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-md">
                    {activeForm === "welcome" && "Send It In!"}
                    {activeForm === "shoutout" && "Send Your Shout Out!"}
                    {activeForm === "brainTeaser" && "Send That Brain Teaser!"}
                    {activeForm === "joke" && "Send Me Funny Stuff"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
