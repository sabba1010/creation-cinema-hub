import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  QrCode, 
  Ticket,
  TicketPercent,
  RefreshCw,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/events")({
  component: EventsManagement,
});

const events = [
  {
    id: "EVT-001",
    name: "Summer Bible Camp 2026",
    date: "July 15, 2026",
    location: "Grace Cathedral",
    status: "Active",
    ticketsSold: 145,
    capacity: 200,
    price: "$45.00"
  },
  {
    id: "EVT-002",
    name: "Worship Night: Echoes of Grace",
    date: "June 02, 2026",
    location: "City Park Arena",
    status: "Draft",
    ticketsSold: 0,
    capacity: 500,
    price: "$20.00"
  },
  {
    id: "EVT-003",
    name: "Leadership Summit",
    date: "May 28, 2026",
    location: "Online",
    status: "Completed",
    ticketsSold: 320,
    capacity: 1000,
    price: "$15.00"
  }
];

function EventsManagement() {
  const [activeTab, setActiveTab] = useState("all-events");

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Events Management</h1>
          <p className="text-muted-foreground">Manage your upcoming events, tickets, and check-ins.</p>
        </div>
        <Button className="bg-forest hover:bg-forest/90 text-white gap-2 h-11 rounded-xl shadow-md transition-all active:scale-95">
          <Plus className="w-4 h-4" />
          Create New Event
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur-md border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="all-events" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">All Events</TabsTrigger>
          <TabsTrigger value="tickets" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Tickets & Sales</TabsTrigger>
          <TabsTrigger value="check-in" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Check-in</TabsTrigger>
          <TabsTrigger value="promo" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white">Promo Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="all-events" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-10 bg-card/50 border-border/50 h-11 rounded-xl focus:ring-forest/30" />
            </div>
            <Button variant="outline" className="h-11 rounded-xl gap-2 border-border/50">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-border/50">
                  <TableHead className="font-bold">Event Name</TableHead>
                  <TableHead className="font-bold">Date</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold">Tickets Sold</TableHead>
                  <TableHead className="font-bold">Price</TableHead>
                  <TableHead className="text-right font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id} className="border-border/50 hover:bg-muted/10 transition-colors">
                    <TableCell className="font-medium">
                      <div>
                        {event.name}
                        <div className="text-xs text-muted-foreground font-normal">{event.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={event.status === "Active" ? "default" : event.status === "Draft" ? "secondary" : "outline"}
                        className={event.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm">{event.ticketsSold} / {event.capacity}</span>
                        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-forest" 
                            style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{event.price}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-elevated border-border/50">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                            <Eye className="w-4 h-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                            <Edit className="w-4 h-4" /> Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                            <Ticket className="w-4 h-4" /> Manage Tickets
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-lg gap-2 text-destructive focus:text-destructive cursor-pointer">
                            <Trash2 className="w-4 h-4" /> Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="check-in">
           <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-12 text-center flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-forest/10 rounded-3xl flex items-center justify-center shadow-glow animate-pulse">
                <QrCode className="w-12 h-12 text-forest" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold">QR Ticket Check-in</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Scan ticket QR codes to quickly check-in attendees. You can also manually search by name or ticket ID.
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-forest h-12 px-8 rounded-xl shadow-md">Open Scanner</Button>
                <Button variant="outline" className="h-12 px-8 rounded-xl border-border/50">Manual Search</Button>
              </div>
           </Card>
        </TabsContent>

        <TabsContent value="promo">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Create Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Code Name</label>
                  <Input placeholder="SUMMER25" className="bg-muted/20 border-border/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Type</label>
                  <Input placeholder="Percentage (%)" className="bg-muted/20 border-border/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Value</label>
                  <Input placeholder="20" className="bg-muted/20 border-border/50" />
                </div>
                <Button className="w-full bg-forest">Generate Code</Button>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TicketPercent className="w-5 h-5 text-gold" />
                  Active Promo Codes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/30">
                      <div>
                        <div className="font-bold text-forest">EARLYBIRD</div>
                        <div className="text-xs text-muted-foreground">25% OFF • Valid until May 20</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
