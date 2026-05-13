import { createFileRoute } from "@tanstack/react-router";
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  ShieldCheck, 
  Mail, 
  Clock, 
  MoreVertical,
  Activity,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/admin/users")({
  component: UserManagement,
});

const users = [
  { 
    id: 1, 
    name: "Alex Thompson", 
    email: "alex@example.com", 
    status: "Active", 
    membership: "Premium", 
    lastActive: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  { 
    id: 2, 
    name: "Sarah Miller", 
    email: "sarah.m@example.com", 
    status: "Inactive", 
    membership: "Basic", 
    lastActive: "3 days ago",
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  { 
    id: 3, 
    name: "David Chen", 
    email: "d.chen@example.com", 
    status: "Active", 
    membership: "Lifetime", 
    lastActive: "Now",
    avatar: "https://i.pravatar.cc/150?u=3"
  },
  { 
    id: 4, 
    name: "Maria Garcia", 
    email: "m.garcia@example.com", 
    status: "Active", 
    membership: "Basic", 
    lastActive: "1 week ago",
    avatar: "https://i.pravatar.cc/150?u=4"
  }
];

function UserManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts, memberships, and system access.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
            <Mail className="w-4 h-4" />
            Bulk Email
          </Button>
          <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
            <UserPlus className="w-4 h-4" />
            Create User
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users className="w-24 h-24" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Active Users</span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold font-display">2,145</div>
              <div className="text-emerald-500 text-sm font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3" /> 12%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Currently browsing the hub</p>
          </div>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-24 h-24" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Premium Members</span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold font-display">482</div>
              <div className="text-emerald-500 text-sm font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3" /> 5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Monthly and Annual subscribers</p>
          </div>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Clock className="w-24 h-24" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Pending Revokes</span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold font-display">12</div>
              <div className="text-amber-500 text-sm font-medium flex items-center">
                <Clock className="w-3 h-3" /> Today
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Access expiring in the next 24 hours</p>
          </div>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name, email or ID..." className="pl-10 h-11 rounded-xl bg-background/50 focus:ring-forest/30" />
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
                    <Avatar className="h-10 w-10 border border-border/50 ring-2 ring-transparent group-hover:ring-forest/20 transition-all">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-base flex items-center gap-2">
                        {user.name}
                        {user.membership === "Lifetime" && <Badge className="h-4 px-1.5 text-[8px] bg-gold text-gold-foreground">VIP</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
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
                    <span className="text-sm font-medium">{user.membership}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastActive}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-muted rounded-lg">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl p-1 border-border/50 shadow-elevated">
                      <DropdownMenuItem className="rounded-lg cursor-pointer">View Full Profile</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg cursor-pointer">Manage Access Rights</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg cursor-pointer">Extend Membership</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">Revoke Access</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t border-border/50 flex items-center justify-between bg-muted/10">
          <p className="text-sm text-muted-foreground">Showing 1 to 4 of 2,854 users</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="rounded-lg">Previous</Button>
            <Button variant="outline" size="sm" className="rounded-lg bg-background shadow-sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Reusing some component names but making sure they are isolated within files or common.
// For now, I'll just keep the structure clean.

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
