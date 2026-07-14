import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Music } from "lucide-react";
import applePodcastsLogo from "@/assets/logo/Apple Podcasts.png";
import spotifyLogo from "@/assets/logo/Spotify.png";
import youtubeMusicLogo from "@/assets/logo/YouTube Music.png";
import logoImg from "@/assets/logo2/image1.png";

export const Route = createFileRoute("/music/")({
  component: MusicPage,
});

const ALBUMS = [
  { id: "1", title: "Deborah", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop", description: "The courageous story of Deborah, brought to life through dynamic beats and uplifting melodies.", songs: Array.from({length: 10}, (_, i) => ({ id: `deb-${i}`, title: `Song of Deborah Track ${i+1}`, duration: "3:45" })) },
  { id: "2", title: "Abraham", cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=800&fit=crop", description: "Follow the father of faith on his incredible journey, with songs that inspire trust and obedience.", songs: Array.from({length: 12}, (_, i) => ({ id: `abr-${i}`, title: `Journey to the Promise Track ${i+1}`, duration: "4:10" })) },
  { id: "3", title: "Samuel", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop", description: "Hear the call of Samuel in this beautiful collection of worship and listening to God's voice.", songs: Array.from({length: 9}, (_, i) => ({ id: `sam-${i}`, title: `Here I Am Track ${i+1}`, duration: "2:55" })) },
  { id: "4", title: "Abigail", cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5291b?w=800&h=800&fit=crop", description: "A musical exploration of wisdom, peace, and stepping in to do what is right.", songs: Array.from({length: 8}, (_, i) => ({ id: `abi-${i}`, title: `Wisdom and Peace Track ${i+1}`, duration: "3:20" })) },
  { id: "5", title: "Zacchaeus", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop", description: "Come down from the tree and dance to the story of a changed heart and grace.", songs: Array.from({length: 14}, (_, i) => ({ id: `zac-${i}`, title: `Come Down Track ${i+1}`, duration: "3:15" })) },
  { id: "6", title: "Titus", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=800&fit=crop", description: "Sound doctrine made fun! Catchy tunes that teach foundational truths to young minds.", songs: Array.from({length: 11}, (_, i) => ({ id: `tit-${i}`, title: `Sound Doctrine Track ${i+1}`, duration: "4:00" })) },
  { id: "7", title: "Joshua", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=800&fit=crop", description: "Be strong and courageous with anthems of victory, marching, and crossing over into the promise.", songs: Array.from({length: 10}, (_, i) => ({ id: `jos-${i}`, title: `Be Strong Track ${i+1}`, duration: "3:50" })) },
];

const PLATFORMS = [
  { name: "Apple Music", url: "https://music.apple.com", icon: applePodcastsLogo, color: "hover:bg-[#fa243c] hover:text-white" },
  { name: "Spotify", url: "https://spotify.com", icon: spotifyLogo, color: "hover:bg-[#1ed760] hover:text-black" },
  { name: "YouTube Music", url: "https://music.youtube.com", icon: youtubeMusicLogo, color: "hover:bg-[#ff0000] hover:text-white" },
];

function MusicPage() {
  const featuredAlbum = ALBUMS[0]; // Deborah as featured

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <main className="flex-grow pt-24">
        {/* Music Hero (Matching Podcast Hero Style) */}
        <section className="relative py-24 overflow-hidden bg-forest-deep text-cream">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_30%,var(--gold),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
                <Music className="h-3 w-3" /> Kids' Bible Beats
              </span>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-none" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                Welcome to Kids’ Bible Beats!
              </h1>
              <p className="mt-8 text-lg text-cream/75 leading-relaxed max-w-xl" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                Each album is packed with original music about a Bible character, helping kids learn their story through fresh lyrics, dynamic beats, and uplifting melodies that point hearts to God.
              </p>
            </div>

            <div className="relative hidden lg:flex justify-center items-center animate-fade-up [animation-delay:200ms]">
              <img src={logoImg} alt="Kids' Bible Beats Logo" className="w-full max-w-md h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </section>

        {/* Albums Grid (Matching Explore Seasons) */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-medium text-foreground" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>Explore <span className="italic text-primary">Albums</span></h2>
                <p className="mt-4 text-muted-foreground text-[18px]">Music That Gets Kids Singing, Moving, and Loving God!</p>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">{ALBUMS.length} Albums Total</span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ALBUMS.map((album, index) => (
                <Link
                  key={album.id}
                  to="/music/$albumId"
                  params={{ albumId: album.id }}
                  className="group cursor-pointer block"
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-square bg-muted">
                    <img src={album.cover} alt={album.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold/90 mb-2">Album {index + 1} • {album.songs.length} Tracks</p>
                      <h3 className="text-2xl font-medium text-cream group-hover:text-gold transition-colors" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>{album.title}</h3>
                      <p className="mt-3 text-sm text-cream/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{album.description}</p>
                    </div>
                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100`}>
                      <div className="w-16 h-16 rounded-full bg-gold text-gold-foreground flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Play className="w-6 h-6 ml-1 fill-current" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
