import { useState, useRef, useEffect, createContext, useContext } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Play, Pause, X, Volume2, VolumeX } from "lucide-react";

export interface Episode {
  id: string;
  title: string;
  duration: string;
  date: string;
  audioUrl: string;
  coverImage?: string;
  seasonTitle?: string;
}

export interface PodcastContextType {
  playEpisode: (episode: Episode) => void;
  currentEpisode: Episode | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const PodcastContext = createContext<PodcastContextType | null>(null);

export function usePodcast() {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error("usePodcast must be used within a PodcastProvider");
  }
  return context;
}

export const Route = createFileRoute("/podcast")({
  component: PodcastLayout,
});


function PodcastLayout() {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Audio play failed", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentEpisode]);

  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      audioRef.current.muted = vol === 0;
      setIsMuted(vol === 0);
    }
  };

  return (
    <PodcastContext.Provider value={{ playEpisode, currentEpisode, isPlaying, setIsPlaying } satisfies PodcastContextType}>
      <div className="podcast-layout relative min-h-screen">
        <Outlet />

        {/* Floating Audio Player */}
        {currentEpisode && (
          <div className="fixed bottom-6 left-6 right-6 z-50 animate-fade-up">
            <div className="mx-auto max-w-5xl rounded-[2rem] border border-cream/15 bg-forest-deep/95 px-6 py-4 text-cream shadow-elevated backdrop-blur-md grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1.2fr] items-center gap-4">
              {/* Episode Info */}
              <div className="flex items-center gap-4">
                <img 
                  src={currentEpisode.coverImage || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800"} 
                  alt={currentEpisode.title} 
                  className="h-14 w-14 rounded-2xl object-cover border border-cream/10 flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{currentEpisode.seasonTitle || "OMS Podcast"}</span>
                  <h4 className="font-display font-medium text-sm text-cream truncate mt-0.5" title={currentEpisode.title}>{currentEpisode.title}</h4>
                </div>
              </div>

              {/* Controls & Timeline */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={togglePlay}
                    className="h-10 w-10 rounded-full bg-cream text-forest-deep grid place-items-center hover:scale-105 hover:bg-gold hover:text-gold-foreground transition cursor-pointer"
                  >
                    {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                  </button>
                </div>
                <div className="flex items-center gap-3 text-xs text-cream/70 w-full">
                  <span className="w-10 text-right">{formatTime(currentTime)}</span>
                  <input 
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-cream/20 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                  <span className="w-10 text-left">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume & Close */}
              <div className="flex items-center justify-end gap-6">
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} className="text-cream/70 hover:text-cream cursor-pointer">
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-cream/20 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                </div>
                <button 
                  onClick={() => setCurrentEpisode(null)}
                  className="h-8 w-8 rounded-full bg-cream/10 text-cream/70 hover:text-cream grid place-items-center cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <audio 
                ref={audioRef}
                src={currentEpisode.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleAudioEnded}
              />
            </div>
          </div>
        )}
      </div>
    </PodcastContext.Provider>
  );
}

