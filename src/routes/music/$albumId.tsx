import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Pause, ArrowLeft, Volume2, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMusic } from "../music";

export const Route = createFileRoute("/music/$albumId")({
  component: AlbumDetailsPage,
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

function AlbumDetailsPage() {
  const { albumId } = Route.useParams();
  const album = ALBUMS.find(a => a.id === albumId) || ALBUMS[0];
  const { playSong, currentSong, isPlaying, setIsPlaying } = useMusic();

  const togglePlay = (song: any) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      playSong({
        id: song.id,
        title: song.title,
        duration: song.duration,
        albumTitle: album.title,
        coverImage: album.cover
      });
    }
  };

  return (
    <div className="bg-[#fcfbf7] min-h-full flex flex-col">
      <main className="flex-grow pb-32">
        
        {/* Immersive Hero Section */}
        <div className="relative pt-32 pb-20 bg-forest-deep text-cream overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_70%_50%,var(--gold),transparent_70%)]" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_80%,white,transparent_50%)]" />
          
          <div className="relative mx-auto max-w-6xl px-6">
            <Link to="/music" className="inline-flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-widest mb-12 hover:gap-3 transition-all opacity-90 hover:opacity-100">
              <ArrowLeft className="h-4 w-4" /> Back to Albums
            </Link>

            <div className="flex flex-col md:flex-row gap-12 md:items-end">
              <div className="relative w-64 md:w-80 shrink-0 aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-cream/10 animate-fade-up">
                <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="pb-4 animate-fade-up [animation-delay:150ms]">
                <span className="inline-flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Music className="h-3 w-3" /> Kids' Bible Beats
                </span>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-6" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>
                  {album.title}
                </h1>
                <p className="text-cream/80 text-lg max-w-2xl leading-relaxed mb-10">
                  {album.description}
                </p>
                <button
                  onClick={() => togglePlay(album.songs[0])}
                  className="rounded-full bg-gold px-10 py-5 text-sm font-bold uppercase tracking-widest text-gold-foreground shadow-[0_10px_30px_rgba(234,179,8,0.2)] hover:scale-105 hover:bg-white hover:text-forest-deep hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all cursor-pointer inline-flex items-center gap-3"
                >
                  <Play className="w-5 h-5 fill-current" /> Play Album
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tracklist Matching Screenshot */}
        <div className="pt-24">
          <h2 className="text-3xl font-medium text-foreground mb-10 text-center" style={{ fontFamily: 'HelveticaNeue, Arial, "Open Sans"' }}>Album Tracklist</h2>
          
          <div className="bg-[#f9f8f3] rounded-3xl p-6 md:p-10 border border-[#e8e6df] shadow-sm max-w-3xl mx-auto animate-fade-up [animation-delay:300ms]">
            {/* Tracklist Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e6df] mb-4">
              <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] ml-4">Track</div>
              <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mr-4">
                <Volume2 className="w-4 h-4"/>
              </div>
            </div>
            
            {/* Tracks */}
            <div className="space-y-1">
              {album.songs.map((song, index) => {
                const isCurrentSong = currentSong?.id === song.id;
                const isSongPlaying = isCurrentSong && isPlaying;
                
                return (
                  <div 
                    key={song.id} 
                    className={`group flex items-center p-3 rounded-2xl transition-all cursor-pointer ${
                      isCurrentSong 
                        ? 'bg-[#edf1e5] border border-transparent' 
                        : 'hover:bg-black/5 border border-transparent'
                    }`}
                    onClick={() => togglePlay(song)}
                  >
                    {/* Number / Playing Indicator */}
                    <div className="w-12 text-center font-bold text-[#4f5c44] flex justify-center items-center text-sm">
                      {isSongPlaying ? (
                        <div className="flex gap-[3px] h-4 items-end">
                          <div className="w-1.5 bg-[#4f5c44] rounded-full animate-[bounce_1s_infinite] h-2" />
                          <div className="w-1.5 bg-[#4f5c44] rounded-full animate-[bounce_1.2s_infinite] h-4" />
                          <div className="w-1.5 bg-[#4f5c44] rounded-full animate-[bounce_0.8s_infinite] h-3" />
                        </div>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    
                    {/* Track Title */}
                    <div className={`flex-1 pl-2 font-bold text-[15px] transition-colors ${isCurrentSong ? 'text-[#4f5c44]' : 'text-[#1a1a1a]'}`}>
                      {song.title}
                    </div>
                    
                    {/* Duration & Action Button */}
                    <div className="flex items-center gap-4 mr-2">
                      <div className="text-[#8c8c8c] text-[13px] font-medium tabular-nums">
                        {song.duration}
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCurrentSong 
                          ? 'bg-[#4f5c44] text-[#edf1e5] shadow-sm' 
                          : 'bg-transparent text-[#8c8c8c] opacity-0 group-hover:opacity-100 hover:bg-black/10'
                      }`}>
                        {isSongPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 ml-0.5 fill-current" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
