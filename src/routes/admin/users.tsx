import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Mail, 
  Clock, 
  MoreVertical,
  Activity,
  ArrowUpRight,
  User,
  Ban,
  Trash2,
  Eye,
  CheckCircle2,
  Lock,
  Globe,
  Calendar,
  CreditCard,
  XCircle
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../../components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "../../components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: UserManagement,
});

const INITIAL_USERS = [
  { 
    id: 1, 
    name: "Alex Thompson", 
    email: "alex@example.com", 
    status: "Active", 
    membership: "Premium", 
    lastActive: "2 hours ago",
    joined: "Jan 12, 2024",
    avatar: "https://i.pravatar.cc/150?u=1",
    totalSpent: "$240.00",
    lastOrder: "ORD-5501"
  },
  { 
    id: 2, 
    name: "Sarah Miller", 
    email: "sarah.m@example.com", 
    status: "Inactive", 
    membership: "Basic", 
    lastActive: "3 days ago",
    joined: "Feb 05, 2024",
    avatar: "https://i.pravatar.cc/150?u=2",
    totalSpent: "$15.99",
    lastOrder: "ORD-4202"
  },
  { 
    id: 3, 
    name: "David Chen", 
    email: "d.chen@example.com", 
    status: "Active", 
    membership: "Lifetime", 
    lastActive: "Now",
    joined: "Mar 10, 2023",
    avatar: "https://i.pravatar.cc/150?u=3",
    totalSpent: "$499.00",
    lastOrder: "ORD-1100"
  },
  { 
    id: 4, 
    name: "Maria Garcia", 
    email: "m.garcia@example.com", 
    status: "Active", 
    membership: "Basic", 
    lastActive: "1 week ago",
    joined: "Dec 15, 2023",
    avatar: "https://i.pravatar.cc/150?u=4",
    totalSpent: "$0.00",
    lastOrder: "None"
  }
];

function UserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleBlockUser = (id: number) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const isBlocked = u.status === "Blocked";
        toast.info(isBlocked ? `Access restored for ${u.name}` : `${u.name} has been blocked`);
        return { ...u, status: isBlocked ? "Active" : "Blocked" };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: number) => {
    const user = users.find(u => u.id === id);
    setUsers(users.filter(u => u.id !== id));
    toast.error(`${user?.name}'s account has been permanently deleted`);
  };

  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Monitor activity, manage permissions, and control system access.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
            <Mail className="w-4 h-4" />
            Bulk Email
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard title="Active Users" value="2,145" icon={Activity} trend="+12%" color="forest" />
        <StatsCard title="Premium Members" value="482" icon={ShieldCheck} trend="+5%" color="gold" />
        <StatsCard title="Access Violations" value="0" icon={XCircle} trend="0%" color="destructive" />
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name, email or ID..." className="pl-10 h-11 rounded-xl bg-background/50" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl h-11 border-border/50 gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="rounded-xl h-11 border-border/50">Export CSV</Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="pl-6 py-4">User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-border/50 group hover:bg-muted/10 transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border/50">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-base flex items-center gap-2">
                        {user.name}
                        {user.status === "Blocked" && <Badge variant="destructive" className="h-4 px-1.5 text-[8px] uppercase">Blocked</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.status === "Active" ? "default" : "secondary"}
                    className={
                      user.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : 
                      user.status === "Blocked" ? "bg-rose-500/10 text-rose-600 border-rose-500/20" : ""
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">{user.membership}</span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastActive}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 w-9 p-0 hover:bg-forest/10 hover:text-forest"
                      onClick={() => handleViewProfile(user)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-9 w-9 p-0 ${user.status === "Blocked" ? "text-emerald-600 hover:bg-emerald-100" : "text-amber-600 hover:bg-amber-100"}`}
                      onClick={() => handleBlockUser(user.id)}
                    >
                      <Ban className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t border-border/50 flex items-center justify-between bg-muted/10">
          <p className="text-sm text-muted-foreground">Showing {users.length} active records</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="rounded-lg">Previous</Button>
            <Button variant="outline" size="sm" className="rounded-lg bg-background shadow-sm">Next</Button>
          </div>
        </div>
      </Card>

      {/* User Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl p-0 overflow-hidden">
          {selectedUser && (
            <>
              <div className="h-32 bg-forest relative">
                <div className="absolute -bottom-12 left-8 p-1 bg-card rounded-[2rem] shadow-xl">
                  <Avatar className="h-24 w-24 rounded-[1.8rem] border-4 border-card">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="text-3xl">{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="pt-16 px-8 pb-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">{selectedUser.name}</h2>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                  </div>
                  <Badge className={selectedUser.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}>
                    {selectedUser.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/20 rounded-2xl border border-border/50 space-y-1">
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Joined Date</span>
                     </div>
                     <p className="font-bold">{selectedUser.joined}</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-2xl border border-border/50 space-y-1">
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <CreditCard className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Total Spent</span>
                     </div>
                     <p className="font-bold">{selectedUser.totalSpent}</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-2xl border border-border/50 space-y-1">
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Membership</span>
                     </div>
                     <p className="font-bold">{selectedUser.membership}</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-2xl border border-border/50 space-y-1">
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Last Activity</span>
                     </div>
                     <p className="font-bold">{selectedUser.lastActive}</p>
                  </div>
                </div>

                <div className="space-y-3">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Account Actions</h4>
                   <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 rounded-xl gap-2 h-11"
                        onClick={() => { handleBlockUser(selectedUser.id); setIsProfileOpen(false); }}
                      >
                         <Ban className="w-4 h-4" /> {selectedUser.status === "Blocked" ? "Unblock" : "Block"}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 rounded-xl gap-2 h-11 text-destructive hover:bg-destructive/10"
                        onClick={() => { handleDeleteUser(selectedUser.id); setIsProfileOpen(false); }}
                      >
                         <Trash2 className="w-4 h-4" /> Delete Account
                      </Button>
                   </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, trend, color }: any) {
  const colorMap: any = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/10 text-gold",
    destructive: "bg-rose-500/10 text-rose-600"
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-4xl font-bold font-display">{value}</div>
          {trend !== "0%" && (
             <div className="text-emerald-500 text-sm font-medium flex items-center">
               <ArrowUpRight className="w-3 h-3" /> {trend}
             </div>
          )}
        </div>
      </div>
    </Card>
  );
}
