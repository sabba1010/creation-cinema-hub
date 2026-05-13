import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { User, Settings, Play, Heart, LogOut, Shield, Bell, CreditCard, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("user_auth");
    toast.success("Successfully signed out");
    navigate({ to: "/login" });
  };

  const TABS = [
    { id: "overview", label: "Overview", icon: User },
    { id: "history", label: "Watch History", icon: Play },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar */}
            <aside className="lg:w-80 space-y-8">
               <div className="p-8 rounded-[2.5rem] bg-forest-deep text-cream text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <User className="h-20 w-20" />
                  </div>
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gold/20 border-4 border-gold/40 mx-auto flex items-center justify-center mb-6 overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="font-display text-2xl font-medium">David Kingdom</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mt-2">Ministry Partner</p>
                  </div>
               </div>

               <nav className="flex flex-col gap-2">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-between p-5 rounded-2xl transition-all ${activeTab === tab.id ? "bg-card border border-border shadow-md text-foreground" : "text-muted-foreground hover:bg-card/50"}`}
                    >
                      <div className="flex items-center gap-4">
                        <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "text-primary" : ""}`} />
                        <span className="text-sm font-bold tracking-wide">{tab.label}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform ${activeTab === tab.id ? "rotate-90 text-primary" : "opacity-30"}`} />
                    </button>
                  ))}
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-4 p-5 rounded-2xl text-destructive hover:bg-destructive/5 transition-all mt-8"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-bold tracking-wide">Sign Out</span>
                  </button>
               </nav>
            </aside>

            {/* Content Area */}
            <div className="flex-grow space-y-12">
               {activeTab === "overview" && (
                 <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                       <h3 className="font-display text-3xl font-medium mb-8">Account <span className="italic text-primary">Overview</span></h3>
                       <div className="grid sm:grid-cols-2 gap-6">
                          <div className="p-8 rounded-[2rem] bg-card border border-border shadow-sm">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">Subscription Status</span>
                             <div className="flex items-center justify-between">
                                <div className="text-xl font-bold">Premium Access</div>
                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">Active</span>
                             </div>
                             <p className="mt-4 text-xs text-muted-foreground leading-relaxed">Your next billing cycle begins on June 12, 2026.</p>
                          </div>
                          <div className="p-8 rounded-[2rem] bg-card border border-border shadow-sm">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-4">Ministry Impact</span>
                             <div className="text-xl font-bold">Lvl 4 Contributor</div>
                             <p className="mt-4 text-xs text-muted-foreground leading-relaxed">You've helped support 12 ministry projects this year.</p>
                          </div>
                       </div>
                    </section>

                    <section>
                       <div className="flex items-center justify-between mb-8">
                          <h3 className="font-display text-2xl font-medium italic">Recent Activity</h3>
                          <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:tracking-[0.2em] transition-all">View All Activity</button>
                       </div>
                       <div className="space-y-4">
                          {[
                            { title: "Watched: The Creation Case Ep 4", time: "2 hours ago", icon: Play },
                            { title: "Downloaded: Faith & Nature Guide", time: "Yesterday", icon: Shield },
                            { title: "Monthly Support Processed", time: "3 days ago", icon: CreditCard },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-muted/30 border border-border/50 group hover:bg-card transition-all">
                               <div className="flex items-center gap-4">
                                  <div className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-cream transition-all">
                                     <item.icon className="h-4 w-4" />
                                  </div>
                                  <div>
                                     <div className="text-sm font-bold">{item.title}</div>
                                     <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{item.time}</div>
                                  </div>
                               </div>
                               <ChevronRight className="h-4 w-4 opacity-30" />
                            </div>
                          ))}
                       </div>
                    </section>

                    <div className="p-10 rounded-[2.5rem] bg-gradient-forest text-cream flex flex-col sm:flex-row items-center justify-between gap-8">
                       <div className="space-y-2 text-center sm:text-left">
                          <h4 className="font-display text-2xl font-medium">Help the Mission Grow</h4>
                          <p className="text-sm opacity-70">Invite your church or friends to experience cinematic faith.</p>
                       </div>
                       <button className="px-8 py-4 rounded-xl bg-gold text-forest-deep font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Get Share Link</button>
                    </div>
                 </div>
               )}

               {activeTab === "settings" && (
                 <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="font-display text-3xl font-medium">Account <span className="italic text-primary">Settings</span></h3>
                    <div className="p-10 rounded-[2.5rem] bg-card border border-border space-y-10">
                       <div className="grid gap-8">
                          <div className="flex items-center justify-between pb-8 border-b border-border">
                             <div>
                                <div className="text-sm font-bold">Email Notifications</div>
                                <div className="text-xs text-muted-foreground mt-1">Receive updates on new film releases and events.</div>
                             </div>
                             <div className="h-6 w-12 bg-primary rounded-full relative">
                                <div className="absolute right-1 top-1 h-4 w-4 bg-cream rounded-full" />
                             </div>
                          </div>
                          <div className="flex items-center justify-between pb-8 border-b border-border">
                             <div>
                                <div className="text-sm font-bold">Two-Factor Authentication</div>
                                <div className="text-xs text-muted-foreground mt-1">Add an extra layer of security to your account.</div>
                             </div>
                             <button className="text-[10px] font-bold uppercase tracking-widest text-primary">Enable</button>
                          </div>
                          <div className="flex items-center justify-between">
                             <div>
                                <div className="text-sm font-bold">Display Profile to Public</div>
                                <div className="text-xs text-muted-foreground mt-1">Allow other partners to see your mission impact level.</div>
                             </div>
                             <div className="h-6 w-12 bg-muted rounded-full relative">
                                <div className="absolute left-1 top-1 h-4 w-4 bg-card rounded-full shadow-sm" />
                             </div>
                          </div>
                       </div>
                       <button className="w-full py-5 rounded-2xl bg-forest-deep text-cream font-bold text-xs uppercase tracking-widest shadow-lg">Save Settings</button>
                    </div>
                 </div>
               )}

               {activeTab !== "overview" && activeTab !== "settings" && (
                 <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                       <User className="h-10 w-10" />
                    </div>
                    <h3 className="font-display text-2xl font-medium">Coming Soon</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">We are currently building this section to provide you with the best ministry experience.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
