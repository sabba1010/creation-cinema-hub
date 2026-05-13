import { createFileRoute } from "@tanstack/react-router";
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
  Play
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

export const Route = createFileRoute("/admin/prayer")({
  component: PrayerManagement,
});

const videos = [
  { id: 1, title: "Day 1: The Foundation", duration: "45:00", uploads: "May 10, 2026", views: 1240 },
  { id: 2, title: "Day 2: Walking in Light", duration: "38:20", uploads: "May 11, 2026", views: 980 },
  { id: 3, title: "Day 3: The Power of Prayer", duration: "42:15", uploads: "May 12, 2026", views: 450 },
];

const users = [
  { id: 1, name: "Sarah Jenkins", email: "sarah@example.com", status: "Active", expires: "May 25, 2026", progress: 65 },
  { id: 2, name: "Michael Ross", email: "m.ross@example.com", status: "Expired", expires: "May 10, 2026", progress: 100 },
  { id: 3, name: "David Miller", email: "dmiller@example.com", status: "Active", expires: "May 30, 2026", progress: 20 },
];

function PrayerManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Week Of Prayer</h1>
          <p className="text-muted-foreground">Manage video content and access control for the prayer program.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
            <UserPlus className="w-4 h-4" />
            Manual Grant
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
            <CloudUpload className="w-4 h-4" />
            Upload Video
          </Button>
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
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
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
                <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 h-10 rounded-xl">Extend All Access</Button>
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
                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>
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
                  <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg text-xs gap-1 border-border/50">
                    <History className="w-3 h-3" /> Extend
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-xs text-destructive hover:bg-destructive/10">
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
