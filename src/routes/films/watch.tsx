import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { Play, ArrowLeft, Maximize, Volume2, Settings, MessageSquare, List, Info, ChevronRight, User } from "lucide-react";

export const Route = createFileRoute("/films/watch")({
  component: WatchPage,
});

import { useState } from "react";

function WatchPage() {
  const [comments, setComments] = useState([
    { id: 1, user: "Sarah Jenkins", text: "This cinematography is absolutely breathtaking. The macro shots of the seeds are incredible!", date: "2 hours ago" },
    { id: 2, user: "Pastor Mark", text: "A wonderful resource for our youth group. The spiritual parallels are so clear.", date: "5 hours ago" },
    { id: 3, user: "David Chen", text: "I've watched this three times now. Every time I find something new to wonder at.", date: "1 day ago" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: "Current User",
      text: newComment,
      date: "Just now"
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="bg-foreground min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-24 bg-black">
        <div className="mx-auto max-w-[1600px] px-6 py-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Primary Player Area */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-muted shadow-2xl border border-white/5 group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-glow">
                      <Play className="h-10 w-10 fill-current ml-1" />
                    </div>
                  </div>
                  {/* Simulated Player UI */}
                  <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-1 w-full bg-white/20 rounded-full mb-6 overflow-hidden">
                      <div className="h-full w-[45%] bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                    </div>
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-8">
                        <Play className="h-5 w-5 fill-current" />
                        <Volume2 className="h-5 w-5" />
                        <span className="text-sm font-medium">42:12 / 1:42:05</span>
                      </div>
                      <div className="flex items-center gap-8 text-white/70">
                        <MessageSquare className="h-5 w-5 hover:text-white transition" />
                        <Settings className="h-5 w-5 hover:text-white transition" />
                        <Maximize className="h-5 w-5 hover:text-white transition" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-cream">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="font-display text-4xl font-medium tracking-tight">The Seed</h1>
                      <p className="mt-2 text-cream/50 text-sm uppercase tracking-[0.2em]">Chapter 04: The Architecture of Dormancy</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="h-12 w-12 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition border border-white/10">
                        <Info className="h-5 w-5" />
                      </button>
                      <button className="h-12 w-12 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition border border-white/10">
                        <List className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="h-px w-full bg-white/10 my-8" />
                  <div className="grid md:grid-cols-2 gap-12">
                    <p className="text-cream/60 leading-relaxed">
                      In this chapter, we delve into the remarkable design of seeds that remain dormant for years, waiting for the precise environmental triggers to awaken. 
                    </p>
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                            <Play className="h-5 w-5 fill-current" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Next Episode</p>
                            <p className="font-medium text-cream">Chapter 05: The First Sprout</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-white/30 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="space-y-10 pt-10 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-3xl text-cream">Community <span className="italic text-primary">Thoughts</span></h2>
                  <span className="text-xs font-bold uppercase tracking-widest text-cream/40">{comments.length} Comments</span>
                </div>

                <form onSubmit={handlePostComment} className="relative group">
                  <input 
                    type="text" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-cream placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
                  />
                  <button type="submit" className="absolute right-3 top-3 bottom-3 px-6 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
                    Post
                  </button>
                </form>

                <div className="space-y-8">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-6 animate-in slide-in-from-left-4 duration-500">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-primary shrink-0 border border-white/5">
                        <User className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-cream">{comment.user}</span>
                          <span className="text-[10px] uppercase tracking-widest text-white/30">{comment.date}</span>
                        </div>
                        <p className="text-sm text-cream/70 leading-relaxed">{comment.text}</p>
                        <div className="flex gap-4 pt-2">
                          <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-primary transition">Like</button>
                          <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-primary transition">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gold mb-8">Up Next</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="relative w-32 aspect-video rounded-xl overflow-hidden bg-muted shrink-0 border border-white/5">
                        <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=200" alt="Next" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <Play className="h-4 w-4 text-white fill-current" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-cream group-hover:text-gold transition-colors leading-snug">Chapter 0{i+4}: The Majesty of Growth</h4>
                        <p className="text-[10px] text-cream/40 uppercase tracking-widest mt-1">12:45 remaining</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-primary/10 border border-primary/20">
                <h4 className="font-display text-xl text-cream mb-4 italic">Reflect Together</h4>
                <p className="text-xs text-cream/60 leading-relaxed mb-6">Download tonight's reflection guide to discuss with your family or small group.</p>
                <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all">Download Guide</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
