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
  Eye,
  Calendar as CalendarIcon,
  MapPin,
  DollarSign
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { INITIAL_EVENTS } from "../../data/events-data";

export const Route = createFileRoute("/admin/events")({
  component: EventsManagement,
});

const INITIAL_TICKETS = [
  { id: "TKT-1001", eventId: "EVT-001", user: "Alice Walker", status: "Paid", checkedIn: false },
  { id: "TKT-1002", eventId: "EVT-001", user: "Bob Smith", status: "Paid", checkedIn: true },
  { id: "TKT-1003", eventId: "EVT-001", user: "Charlie Brown", status: "Refunded", checkedIn: false },
  { id: "TKT-1004", eventId: "EVT-003", user: "Diana Prince", status: "Paid", checkedIn: true },
];

const INITIAL_PROMOS = [
  { id: 1, code: "EARLYBIRD", discount: "25%", expiry: "May 20, 2026", status: "Active" },
  { id: 2, code: "SUMMER25", discount: "15%", expiry: "June 15, 2026", status: "Active" },
];

const DEFAULT_FORM = {
  name: "Night of Miracles: Praise Concert",
  date: "2026-08-22",
  location: "Symphony Hall, Downtown",
  price: "35.00",
  capacity: "450",
  description: "Join us for an unforgettable night of praise and worship.",
  image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80"
};

function EventsManagement() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [promos, setPromos] = useState(INITIAL_PROMOS);
  const [activeTab, setActiveTab] = useState("all-events");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [promoForm, setPromoForm] = useState({ code: "", discount: "", expiry: "2026-12-31" });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(events.map(ev =>
        ev.id === editingEvent.id
          ? {
              ...ev,
              name: formData.name,
              date: formData.date,
              location: formData.location,
              price: `$${formData.price}`,
              capacity: parseInt(formData.capacity) || ev.capacity,
              description: formData.description,
              image: formData.image,
            }
          : ev
      ));
      toast.success("Event updated successfully!");
      setEditingEvent(null);
    } else {
      const newEvent = {
        id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
        name: formData.name,
        date: formData.date,
        location: formData.location,
        status: "Active" as const,
        ticketsSold: 0,
        capacity: parseInt(formData.capacity) || 0,
        price: `$${formData.price}`,
        description: formData.description,
        image: formData.image,
      };
      setEvents([newEvent, ...events]);
      toast.success("Event created successfully!");
    }
    setIsDialogOpen(false);
    setFormData(DEFAULT_FORM);
  };

  const handleEditClick = (event: any) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      date: event.date,
      location: event.location,
      price: event.price.replace("$", ""),
      capacity: String(event.capacity),
      description: event.description || "",
      image: event.image || ""
    });
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    toast.error("Event deleted");
  };

  const handleCheckIn = (ticketId: string) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, checkedIn: true } : t));
    toast.success("Attendee checked in!");
  };

  const handleRefund = (ticketId: string) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: "Refunded" } : t));
    toast.info("Ticket refunded successfully");
  };

  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const newPromo = {
      id: Date.now(),
      code: promoForm.code.toUpperCase(),
      discount: promoForm.discount + (promoForm.discount.includes("%") ? "" : "%"),
      expiry: promoForm.expiry,
      status: "Active"
    };
    setPromos([newPromo, ...promos]);
    setPromoForm({ code: "", discount: "", expiry: "2026-12-31" });
    toast.success("Promo code added!");
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Events Management</h1>
          <p className="text-muted-foreground">Manage your upcoming events, tickets, and check-ins.</p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              const names = [
                "Creation Discovery Workshop",
                "Youth Media Bootcamp",
                "Regional Meetup: Austin",
                "Faith & Science Symposium",
                "Worship in the Wild"
              ];
              const locations = ["Community Center", "OMS Studio B", "Grace Plaza", "Online (Zoom)", "National Park Annex"];
              const newEvent = {
                id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
                name: names[Math.floor(Math.random() * names.length)],
                date: "August 10, 2026",
                location: locations[Math.floor(Math.random() * locations.length)],
                status: "Active" as const,
                ticketsSold: Math.floor(Math.random() * 100),
                capacity: 200,
                price: "$25.00",
                description: "A specially curated session focusing on the intersection of faith and creativity.",
                image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&q=80"
              };
              setEvents([newEvent, ...events]);
              toast.success("Fake event generated for testing!");
            }}
            className="border-forest/20 text-forest hover:bg-forest/5 h-11 rounded-xl"
          >
            Generate Fake Event
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingEvent(null);
          }}>
            <DialogTrigger asChild>
              <Button className="bg-forest hover:bg-forest/90 text-white gap-2 h-11 rounded-xl shadow-md transition-all active:scale-95">
                <Plus className="w-4 h-4" />
                Create New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateEvent} className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Event Name</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="e.g. Summer Bible Camp"
                        className="pl-10 h-11 rounded-xl bg-background/50"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="text"
                        placeholder="July 15, 2026"
                        className="h-11 rounded-xl bg-background/50"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Ticket Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          placeholder="25.00"
                          className="pl-10 h-11 rounded-xl bg-background/50"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Physical address or Online"
                        className="pl-10 h-11 rounded-xl bg-background/50"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Total Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="200"
                      className="h-11 rounded-xl bg-background/50"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Event Description</Label>
                    <textarea
                      id="description"
                      placeholder="Short description of the event..."
                      className="w-full min-h-[80px] p-3 rounded-xl border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Featured Image URL</Label>
                    <Input
                      id="image"
                      placeholder="https://images.unsplash.com/..."
                      className="h-11 rounded-xl bg-background/50"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl">Cancel</Button>
                  <Button type="submit" className="bg-forest hover:bg-forest/90 rounded-xl px-8 shadow-md">
                    {editingEvent ? "Save Changes" : "Create Event"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
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
                            style={{ width: `${Math.min(100, (event.ticketsSold / event.capacity) * 100)}%` }}
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
                          <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer" onClick={() => handleEditClick(event)}>
                            <Edit className="w-4 h-4" /> Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer" onClick={() => setActiveTab("tickets")}>
                            <Ticket className="w-4 h-4" /> Manage Tickets
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="rounded-lg gap-2 text-destructive focus:text-destructive cursor-pointer"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
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

        <TabsContent value="tickets" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Attendee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                    <TableCell className="font-medium">{t.user}</TableCell>
                    <TableCell>
                      <Badge variant={t.status === "Paid" ? "default" : "secondary"}>{t.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {t.checkedIn ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Checked In</Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-rose-500 hover:bg-rose-500/10"
                        onClick={() => handleRefund(t.id)}
                        disabled={t.status === "Refunded"}
                      >
                        Refund
                      </Button>
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
                Scan ticket QR codes to quickly check-in attendees.
              </p>
            </div>
            <div className="space-y-4 w-full max-w-sm">
              <div className="font-bold text-sm text-left">Quick Search by Ticket ID:</div>
              <div className="flex gap-2">
                <Input placeholder="TKT-1001" id="checkin-input" />
                <Button className="bg-forest" onClick={() => {
                  const val = (document.getElementById("checkin-input") as HTMLInputElement).value;
                  if (tickets.find(t => t.id === val)) {
                    handleCheckIn(val);
                  } else {
                    toast.error("Ticket not found");
                  }
                }}>Check-In</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="promo">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Create Promo Code</CardTitle>
              </CardHeader>
              <form onSubmit={handleAddPromo}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Code Name</label>
                    <Input
                      placeholder="SUMMER25"
                      className="bg-muted/20 border-border/50"
                      value={promoForm.code}
                      onChange={e => setPromoForm({ ...promoForm, code: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discount Value (%)</label>
                    <Input
                      placeholder="20"
                      className="bg-muted/20 border-border/50"
                      value={promoForm.discount}
                      onChange={e => setPromoForm({ ...promoForm, discount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input
                      type="date"
                      className="bg-muted/20 border-border/50"
                      value={promoForm.expiry}
                      onChange={e => setPromoForm({ ...promoForm, expiry: e.target.value })}
                      required
                    />
                  </div>
                  <Button className="w-full bg-forest">Generate Code</Button>
                </CardContent>
              </form>
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
                  {promos.map((promo) => (
                    <div key={promo.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/30">
                      <div>
                        <div className="font-bold text-forest">{promo.code}</div>
                        <div className="text-xs text-muted-foreground">{promo.discount} OFF &bull; Valid until {promo.expiry}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setPromos(promos.filter(p => p.id !== promo.id))}>
                          <Trash2 className="w-4 h-4 text-rose-500" />
                        </Button>
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
