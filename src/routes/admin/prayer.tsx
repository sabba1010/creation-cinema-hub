import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Video, 
  Plus, 
  Clock, 
  Shield, 
  ShieldAlert, 
  UserPlus, 
  History,
  MoreHorizontal,
  CloudUpload,
  Play,
  Trash2,
  Edit,
  Mail,
  User,
  Calendar as CalendarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/admin/prayer")({
  component: PrayerManagement,
});

const INITIAL_VIDEOS = [
  { id: 1, title: "Night 1: The Architecture of Light", duration: "45:00", uploads: "June 14, 2026", views: 1240, status: "Live" },
  { id: 2, title: "Night 2: Rhythms of the Deep", duration: "38:20", uploads: "June 15, 2026", views: 980, status: "Published" },
  { id: 3, title: "Night 3: Whispers in the Wind", duration: "42:15", uploads: "June 16, 2026", views: 450, status: "Published" },
  { id: 4, title: "Night 4: The Soil's Secret", duration: "40:00", uploads: "June 17, 2026", views: 0, status: "Published" },
  { id: 5, title: "Night 5: The Celestial Clockwork", duration: "44:10", uploads: "June 18, 2026", views: 0, status: "Scheduled" },
  { id: 6, title: "Night 6: Life in Paradox", duration: "39:50", uploads: "June 19, 2026", views: 0, status: "Scheduled" },
  { id: 7, title: "Night 7: The Sabbath Rest", duration: "55:00", uploads: "June 20, 2026", views: 0, status: "Scheduled" },
];

const INITIAL_USERS = [
  { id: 1, name: "Sarah Jenkins", email: "sarah@example.com", status: "Active", expires: "June 30, 2026", progress: 65 },
  { id: 2, name: "Michael Ross", email: "m.ross@example.com", status: "Expired", expires: "June 10, 2026", progress: 100 },
  { id: 3, name: "David Miller", email: "dmiller@example.com", status: "Active", expires: "July 05, 2026", progress: 20 },
];

function PrayerManagement() {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [users, setUsers] = useState(INITIAL_USERS);
  
  // Dialog States
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isGrantDialogOpen, setIsGrantDialogOpen] = useState(false);

  // Form States
  const [videoForm, setVideoForm] = useState({ title: "Day 4: Spiritual Warfare", duration: "40:00" });
  const [grantForm, setGrantForm] = useState({ name: "John Doe", email: "john@example.com" });

  const handleUploadVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const newVideo = {
      id: Date.now(),
      title: videoForm.title,
      duration: videoForm.duration,
      uploads: new Date().toLocaleDateString(),
      views: 0
    };
    setVideos([...videos, newVideo]);
    setIsVideoDialogOpen(false);
    toast.success("Video uploaded successfully!");
  };

  const handleGrantAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 14); // 2-week expiration
    
    const newUser = {
      id: Date.now(),
      name: grantForm.name,
      email: grantForm.email,
      status: "Active",
      expires: expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      progress: 0
    };
    setUsers([newUser, ...users]);
    setIsGrantDialogOpen(false);
    toast.success(`Access granted to ${grantForm.name}`);
  };

  const handleRevoke = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: "Expired" } : u));
    toast.error("Access revoked");
  };

  const handleExtend = (id: number) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const current = new Date(u.expires);
        current.setDate(current.getDate() + 7);
        return { ...u, status: "Active", expires: current.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
      }
      return u;
    }));
    toast.success("Access extended by 7 days");
  };

  const handleDeleteVideo = (id: number) => {
    setVideos(videos.filter(v => v.id !== id));
    toast.error("Video removed from program");
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Week Of Prayer</h1>
          <p className="text-muted-foreground">Manage video content and access control for the prayer program.</p>
        </div>
        <div className="flex gap-2">
          {/* Manual Grant Dialog */}
          <Dialog open={isGrantDialogOpen} onOpenChange={setIsGrantDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
                <UserPlus className="w-4 h-4" />
                Manual Grant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">Grant Program Access</DialogTitle>
                <DialogDescription>Manually add a user to the program with a 2-week expiration.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleGrantAccess} className="space-y-6 py-4">
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="John Doe" 
                          className="pl-10 h-11 rounded-xl"
                          value={grantForm.name}
                          onChange={e => setGrantForm({...grantForm, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="email"
                          placeholder="john@example.com" 
                          className="pl-10 h-11 rounded-xl"
                          value={grantForm.email}
                          onChange={e => setGrantForm({...grantForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                 </div>
                 <DialogFooter>
                    <Button type="submit" className="w-full bg-forest h-11 rounded-xl shadow-md">Grant 14-Day Access</Button>
                 </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Upload Video Dialog */}
          <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
                <CloudUpload className="w-4 h-4" />
                Upload Video
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">Upload Program Video</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUploadVideo} className="space-y-6 py-4">
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Video Title</Label>
                      <div className="relative">
                        <Video className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Day 4: Spiritual Warfare" 
                          className="pl-10 h-11 rounded-xl"
                          value={videoForm.title}
                          onChange={e => setVideoForm({...videoForm, title: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Duration (MM:SS)</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="40:00" 
                          className="pl-10 h-11 rounded-xl"
                          value={videoForm.duration}
                          onChange={e => setVideoForm({...videoForm, duration: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                 </div>
                 <DialogFooter>
                    <Button type="submit" className="w-full bg-forest h-11 rounded-xl shadow-md">Start Upload</Button>
                 </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Video className="w-5 h-5 text-forest" />
              Program Content
            </CardTitle>
            <Badge className="bg-forest/10 text-forest border-forest/20">2-Week Expiration Enabled</Badge>
          </CardHeader>
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/50">
                <TableHead>Video Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id} className="border-border/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 bg-muted rounded-md flex items-center justify-center relative group cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-4 h-4 text-forest fill-forest" />
                        </div>
                        <Video className="w-4 h-4 text-muted-foreground" />
                      </div>
                      {video.title}
                    </div>
                  </TableCell>
                  <TableCell>{video.duration}</TableCell>
                  <TableCell>{video.views}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={video.status === "Live" ? "default" : "secondary"}
                      className={video.status === "Live" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 animate-pulse" : ""}
                    >
                      {video.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl border-border/50">
                        <DropdownMenuItem className="gap-2 cursor-pointer"><Edit className="w-4 h-4" /> Edit Info</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive cursor-pointer" onClick={() => handleDeleteVideo(video.id)}>
                          <Trash2 className="w-4 h-4" /> Delete Video
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              Access Policy
            </CardTitle>
            <CardDescription>Default settings for new purchases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
              <div className="space-y-0.5">
                <div className="font-semibold text-sm">Expiration Period</div>
                <div className="text-xs text-muted-foreground">Standard 14-day access</div>
              </div>
              <Badge variant="outline">14 Days</Badge>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Active Users</span>
                  <span className="font-semibold">842</span>
                </div>
                <Progress value={84} className="h-2 bg-muted" />
              </div>
              <div className="pt-4 border-t border-border/30">
                <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 h-10 rounded-xl" onClick={() => toast.success("Policy updated for all active sessions")}>Extend All Access</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-display">Recent Access Grants</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/50">
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Expires On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-border/50">
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.status === "Active" ? "default" : "secondary"}
                    className={user.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-8">{user.progress}%</span>
                    <Progress value={user.progress} className="h-1.5 w-24 bg-muted" />
                  </div>
                </TableCell>
                <TableCell className="text-sm font-mono">{user.expires}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-3 rounded-lg text-xs gap-1 border-border/50 transition-all active:scale-95"
                    onClick={() => handleExtend(user.id)}
                  >
                    <History className="w-3 h-3" /> Extend
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-all active:scale-95"
                    onClick={() => handleRevoke(user.id)}
                  >
                    <ShieldAlert className="w-3 h-3" /> Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
