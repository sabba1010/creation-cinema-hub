import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
  DollarSign,
  Clock,
  Navigation,
  Globe,
  Settings,
  ShieldCheck,
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { type Event, type CityScreening, type Showtime } from "../../data/events-data";

export const Route = createFileRoute("/admin/events")({
  component: EventsManagement,
});

const INITIAL_TICKETS: any[] = [];

function EventsManagement() {
  const [events, setEvents] = useState<any[]>([]);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [promos, setPromos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all-events");

  // Dialog States
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false);
  const [isPromoDialogOpen, setIsPromoDialogOpen] = useState(false);

  // Selection States
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Form States
  const [eventForm, setEventForm] = useState<{
    name: string;
    subtitle: string;
    date: string;
    location: string;
    price: string;
    capacity: string;
    generalFacilities: string;
    description: string;
    image: string;
    gallery: string[];
    categories: { name: string; price: number; available: number; facilities: string }[];
  }>({
    name: "",
    subtitle: "",
    date: "",
    location: "",
    price: "",
    capacity: "500",
    generalFacilities: "",
    description: "",
    image: "",
    gallery: [],
    categories: [],
  });

  const [promoForm, setPromoForm] = useState({ code: "", discount: "", expiry: "2026-12-31" });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setEventForm({ ...eventForm, image: reader.result as string });
      setIsUploading(false);
      toast.success("Image attached successfully!");
    };
    reader.onerror = () => {
      toast.error("Failed to process image");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages: string[] = [];

    const readAsDataURL = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    try {
      for (let i = 0; i < files.length; i++) {
        const result = await readAsDataURL(files[i]);
        newImages.push(result);
      }
      setEventForm(prev => ({ ...prev, gallery: [...prev.gallery, ...newImages] }));
      toast.success(`${newImages.length} images added to gallery!`);
    } catch (err) {
      toast.error("Failed to process gallery images");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        if (data.success) {
          setEvents(data.data.map((e: any) => ({ ...e, id: e._id })));
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    const fetchTickets = async () => {
      const token = localStorage.getItem("user_token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/tickets", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setTickets(data.data.map((t: any) => ({
            id: t.ticketId,
            eventId: t.event?._id,
            eventName: t.event?.name,
            user: t.user?.name,
            status: t.status,
            checkedIn: t.checkedIn,
            city: t.city,
            category: t.category,
            _id: t._id
          })));
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    const fetchPromos = async () => {
      const token = localStorage.getItem("user_token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/promocodes", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setPromos(data.data.map((p: any) => ({
            id: p._id,
            code: p.code,
            discount: `${p.discountPercentage}%`,
            expiry: "N/A", // or format p.createdAt
            status: p.isActive ? "Active" : "Inactive"
          })));
        }
      } catch (err) {
        console.error("Error fetching promos:", err);
      }
    };
    fetchEvents();
    fetchTickets();
    fetchPromos();
  }, []);

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("user_token");

    const priceNum = parseFloat(eventForm.price.replace("$", "")) || 0;
    const capacityNum = parseInt(eventForm.capacity) || 0;
    const fullCategories = [
      { name: "General", price: priceNum, available: capacityNum, facilities: eventForm.generalFacilities },
      ...eventForm.categories.filter(c => c.name !== "General")
    ];

    try {
      if (editingEvent) {
        const payload = { ...eventForm, categories: fullCategories };
        const res = await fetch(`http://localhost:5000/api/events/${editingEvent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setEvents(events.map(ev => ev.id === editingEvent.id ? { ...data.data, id: data.data._id } : ev));
          toast.success("Event updated successfully!");
        } else {
          toast.error(data.message || "Failed to update event");
        }
      } else {
        const payload = {
          ...eventForm,
          price: eventForm.price.startsWith("$") ? eventForm.price : `$${eventForm.price}`,
          capacity: capacityNum,
          categories: fullCategories
        };
        const res = await fetch(`http://localhost:5000/api/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setEvents([{ ...data.data, id: data.data._id }, ...events]);
          toast.success("New event created!");
        } else {
          toast.error(data.message || "Failed to create event");
        }
      }
      setIsEventDialogOpen(false);
      setEditingEvent(null);
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    const generalCat = event.categories?.find(c => c.name === "General");
    const extraCats = event.categories?.filter(c => c.name !== "General") || [];
    setEventForm({
      name: event.name,
      subtitle: event.subtitle || "",
      date: event.date,
      location: event.location,
      price: generalCat ? String(generalCat.price) : event.price.replace("$", ""),
      capacity: generalCat ? String(generalCat.available) : String(event.capacity),
      generalFacilities: generalCat ? (generalCat.facilities || "") : "",
      description: event.description || "",
      image: event.image || "",
      gallery: event.gallery || [],
      categories: extraCats.map(c => ({ ...c, facilities: c.facilities || "" })),
    });
    setIsEventDialogOpen(true);
  };

  const handleAddPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoForm.code || !promoForm.discount) {
      toast.error("Code and discount are required");
      return;
    }
    try {
      const token = localStorage.getItem("user_token");
      const res = await fetch("http://localhost:5000/api/promocodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          code: promoForm.code,
          discountPercentage: Number(promoForm.discount.replace('%', ''))
        })
      });
      const data = await res.json();
      if (data.success) {
        const p = data.data;
        setPromos([{
          id: p._id,
          code: p.code,
          discount: `${p.discountPercentage}%`,
          expiry: "N/A",
          status: p.isActive ? "Active" : "Inactive"
        }, ...promos]);
        setIsPromoDialogOpen(false);
        setPromoForm({ code: "", discount: "", expiry: "2026-12-31" });
        toast.success("Promo code created!");
      } else {
        toast.error(data.message || "Failed to create promo code");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleDeletePromo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promo code?")) return;
    try {
      const token = localStorage.getItem("user_token");
      const res = await fetch(`http://localhost:5000/api/promocodes/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setPromos(promos.filter(p => p.id !== id));
        toast.success("Promo code deleted");
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Events Engine</h1>
          <p className="text-muted-foreground">Manage multi-city screenings, showtimes, and global registrations.</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="h-11 rounded-xl border-border/50 gap-2"
            onClick={() => setIsPromoDialogOpen(true)}
          >
            <TicketPercent className="w-4 h-4" />
            Promo Codes
          </Button>
          <Button
            className="bg-forest h-11 rounded-xl gap-2 shadow-md transition-all active:scale-95"
            onClick={() => {
              setEditingEvent(null);
              setEventForm({
                name: "",
                subtitle: "",
                date: "",
                location: "",
                price: "",
                capacity: "500",
                generalFacilities: "",
                description: "",
                image: "",
                gallery: [],
                categories: [],
              });
              setIsEventDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur-md border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="all-events" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white transition-all">All Events</TabsTrigger>
          <TabsTrigger value="registrations" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white transition-all">Registrations</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg px-6 data-[state=active]:bg-forest data-[state=active]:text-white transition-all">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all-events" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="group border-border/50 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elevated transition-all overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={event.image?.startsWith('http') || event.image?.startsWith('data:') ? event.image : `http://localhost:5000${event.image?.startsWith('/') ? '' : '/'}${event.image}`}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-forest/90 backdrop-blur text-white border-none">{event.status}</Badge>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full bg-white/90 shadow-lg">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl border-border/50 p-1 shadow-elevated">
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleEditEvent(event)}>
                          <Edit className="w-4 h-4" /> Edit Branding
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => setSelectedEvent(event)}>
                          <Settings className="w-4 h-4" /> Manage Showtimes
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive cursor-pointer" onClick={async () => {
                          if (confirm("Are you sure you want to delete this event?")) {
                            try {
                              const token = localStorage.getItem("user_token");
                              const res = await fetch(`http://localhost:5000/api/events/${event.id}`, {
                                method: "DELETE",
                                headers: { "Authorization": `Bearer ${token}` }
                              });
                              const data = await res.json();
                              if (data.success) {
                                setEvents(events.filter(e => e.id !== event.id));
                                toast.success("Event deleted");
                              } else {
                                toast.error(data.message || "Failed to delete");
                              }
                            } catch (err) {
                              toast.error("Network error");
                            }
                          }
                        }}>
                          <Trash2 className="w-4 h-4" /> Delete Event
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-xl leading-tight">{event.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{event.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarIcon className="h-3.5 w-3.5 text-gold" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-gold" />
                      {event.cities?.length || 0} Cities
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/30 grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-0.5">Price</div>
                      <div className="font-display font-bold text-lg text-forest">{event.price}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-0.5">Sold</div>
                      <div className="font-bold text-lg text-forest">{event.ticketsSold || 0}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-0.5">Available</div>
                      <div className="font-bold text-forest text-lg">{Math.max(0, event.capacity - (event.ticketsSold || 0))}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="registrations">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <div className="p-6 border-b border-border/30 bg-muted/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by name, email or ticket ID..." className="pl-10 h-11 rounded-xl bg-background border-border/50" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-11 rounded-xl border-border/50 gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </Button>
                <Button variant="outline" className="h-11 rounded-xl border-border/50">Export PDF</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 bg-muted/20">
                  <TableHead className="font-bold">Attendee</TableHead>
                  <TableHead className="font-bold">Event</TableHead>
                  <TableHead className="font-bold">City</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="text-right font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((t) => (
                  <TableRow key={t.id} className="border-border/30 hover:bg-muted/10 transition-colors">
                    <TableCell>
                      <div className="font-bold">{t.user}</div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">{t.id}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {t.eventName || t.eventId}
                      {t.category && <div className="text-[10px] text-muted-foreground">Cat: {t.category}</div>}
                    </TableCell>
                    <TableCell className="text-sm">{t.city}</TableCell>
                    <TableCell>
                      <Badge
                        variant={t.status === "Paid" ? "default" : "secondary"}
                        className={t.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}
                      >
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            Manage <MoreVertical className="ml-2 w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl w-48 border-border/50 shadow-elevated">
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            disabled={t.checkedIn || t.status !== "Paid"}
                            onClick={async () => {
                              try {
                                const token = localStorage.getItem("user_token");
                                const res = await fetch(`http://localhost:5000/api/tickets/${t._id}/checkin`, {
                                  method: 'PUT',
                                  headers: { 'Authorization': `Bearer ${token}` }
                                });
                                const data = await res.json();
                                if (data.success) {
                                  setTickets(tickets.map(tk => tk.id === t.id ? { ...tk, checkedIn: true } : tk));
                                  toast.success(`Attendee ${t.user} checked in!`);
                                } else {
                                  toast.error(data.message || "Failed to check in");
                                }
                              } catch (err) {
                                toast.error("Network error");
                              }
                            }}
                          >
                            <span className={t.checkedIn ? "opacity-50" : "text-emerald-500 font-medium"}>
                              {t.checkedIn ? "Checked In" : "Mark as Checked In"}
                            </span>
                          </DropdownMenuItem>

                          {t.status === "Paid" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="gap-2 cursor-pointer"
                                onClick={async () => {
                                  if (!confirm("Are you sure you want to cancel this ticket? This will restore capacity.")) return;
                                  try {
                                    const token = localStorage.getItem("user_token");
                                    const res = await fetch(`http://localhost:5000/api/tickets/${t._id}/status`, {
                                      method: 'PUT',
                                      headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify({ status: 'Cancelled' })
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                      setTickets(tickets.map(tk => tk.id === t.id ? { ...tk, status: 'Cancelled' } : tk));
                                      toast.success("Ticket Cancelled successfully");
                                    } else toast.error(data.message);
                                  } catch (err) { toast.error("Network error"); }
                                }}
                              >
                                <span className="text-amber-500 font-medium">Cancel Ticket</span>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="gap-2 cursor-pointer"
                                onClick={async () => {
                                  if (!confirm("Are you sure you want to mark this ticket as Refunded? This will restore capacity.")) return;
                                  try {
                                    const token = localStorage.getItem("user_token");
                                    const res = await fetch(`http://localhost:5000/api/tickets/${t._id}/status`, {
                                      method: 'PUT',
                                      headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify({ status: 'Refunded' })
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                      setTickets(tickets.map(tk => tk.id === t.id ? { ...tk, status: 'Refunded' } : tk));
                                      toast.success("Ticket Refunded successfully");
                                    } else toast.error(data.message);
                                  } catch (err) { toast.error("Network error"); }
                                }}
                              >
                                <span className="text-destructive font-medium">Refund Ticket</span>
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Event Edit Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-[2rem] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">
              {editingEvent ? "Update Event Branding" : "Create New Event"}
            </DialogTitle>
            <DialogDescription>Set the main identity and featured content for this event.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveEvent} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label>Event Name</Label>
                <Input
                  value={eventForm.name}
                  onChange={e => setEventForm({ ...eventForm, name: e.target.value })}
                  placeholder="e.g. Worship Night 2026"
                  className="h-11 rounded-xl" required
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Tagline / Subtitle</Label>
                <Input
                  value={eventForm.subtitle}
                  onChange={e => setEventForm({ ...eventForm, subtitle: e.target.value })}
                  placeholder="e.g. A global experience of faith"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Display Date Range</Label>
                <Input
                  value={eventForm.date}
                  onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                  placeholder="Aug 18 - 22"
                  className="h-11 rounded-xl" required
                />
              </div>
              <div className="space-y-2">
                <Label>Base Ticket Price ($)</Label>
                <Input
                  value={eventForm.price}
                  onChange={e => setEventForm({ ...eventForm, price: e.target.value })}
                  placeholder="25.00"
                  className="h-11 rounded-xl" required
                />
              </div>
              <div className="col-span-1 space-y-2">
                <Label>Total Seats (Capacity)</Label>
                <Input
                  type="number"
                  value={eventForm.capacity}
                  onChange={e => setEventForm({ ...eventForm, capacity: e.target.value })}
                  placeholder="e.g. 500"
                  className="h-11 rounded-xl" required
                />
              </div>
              <div className="col-span-1 space-y-2">
                <Label>Ticket Facilities</Label>
                <Input
                  value={eventForm.generalFacilities}
                  onChange={e => setEventForm({ ...eventForm, generalFacilities: e.target.value })}
                  placeholder="e.g. Entry, Basic Seating"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Featured Image Upload</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="h-11 rounded-xl flex-1 pt-2.5"
                    disabled={isUploading}
                  />
                  {eventForm.image && (
                    <img src={eventForm.image.startsWith('http') || eventForm.image.startsWith('/') ? eventForm.image : `http://localhost:5000${eventForm.image}`} alt="Preview" className="h-11 w-11 object-cover rounded-md border border-border" />
                  )}
                </div>
                {isUploading && <p className="text-xs text-muted-foreground">Uploading image...</p>}
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Photo Gallery</Label>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="h-11 rounded-xl pt-2.5"
                    disabled={isUploading}
                  />
                  {eventForm.gallery.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {eventForm.gallery.map((img, idx) => (
                        <div key={idx} className="relative group w-16 h-16 rounded-lg border border-border overflow-hidden">
                          <img
                            src={img.startsWith('http') || img.startsWith('/') || img.startsWith('data:') ? img : `http://localhost:5000${img}`}
                            alt={`Gallery ${idx}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newGallery = [...eventForm.gallery];
                              newGallery.splice(idx, 1);
                              setEventForm({ ...eventForm, gallery: newGallery });
                            }}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Full Description</Label>
                <textarea
                  value={eventForm.description}
                  onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full min-h-[100px] p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-forest/30 outline-none"
                  placeholder="Tell your audience about the event..."
                />
              </div>
              <div className="col-span-2 space-y-4 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">Additional Categories (Optional)</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => setEventForm({
                    ...eventForm,
                    categories: [...eventForm.categories, { name: "", price: 0, available: 0, facilities: "" }]
                  })}>
                    <Plus className="w-4 h-4 mr-1" /> Add Category
                  </Button>
                </div>
                {eventForm.categories.map((cat, idx) => (
                  <div key={idx} className="flex flex-col gap-3 bg-muted/10 p-3 rounded-xl border border-border/50">
                    <div className="flex gap-2 items-end">
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-muted-foreground">Category Name</Label>
                        <Input
                          value={cat.name}
                          onChange={(e) => {
                            const newCats = [...eventForm.categories];
                            newCats[idx].name = e.target.value;
                            setEventForm({ ...eventForm, categories: newCats });
                          }}
                          placeholder="e.g. VIP"
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="w-24 space-y-1">
                        <Label className="text-xs text-muted-foreground">Price ($)</Label>
                        <Input
                          type="number"
                          value={cat.price}
                          onChange={(e) => {
                            const newCats = [...eventForm.categories];
                            newCats[idx].price = Number(e.target.value);
                            setEventForm({ ...eventForm, categories: newCats });
                          }}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="w-24 space-y-1">
                        <Label className="text-xs text-muted-foreground">Available</Label>
                        <Input
                          type="number"
                          value={cat.available}
                          onChange={(e) => {
                            const newCats = [...eventForm.categories];
                            newCats[idx].available = Number(e.target.value);
                            setEventForm({ ...eventForm, categories: newCats });
                          }}
                          className="h-9 text-sm"
                        />
                      </div>
                      <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 text-destructive mb-[2px]" onClick={() => {
                        const newCats = [...eventForm.categories];
                        newCats.splice(idx, 1);
                        setEventForm({ ...eventForm, categories: newCats });
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Facilities (comma separated)</Label>
                      <Input
                        value={cat.facilities || ""}
                        onChange={(e) => {
                          const newCats = [...eventForm.categories];
                          newCats[idx].facilities = e.target.value;
                          setEventForm({ ...eventForm, categories: newCats });
                        }}
                        placeholder="e.g. VIP Seating, Free Drinks, Front Row"
                        className="h-9 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold">
                {editingEvent ? "Save Branding Changes" : "Initialize Event Engine"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Promo Code Dialog */}
      <Dialog open={isPromoDialogOpen} onOpenChange={setIsPromoDialogOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold text-center">Promo Management</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              {promos.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/50">
                  <div>
                    <div className="font-black text-forest tracking-wider">{p.code}</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">{p.discount} OFF • EXP: {p.expiry}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => handleDeletePromo(p.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border/30 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="CODE"
                  className="uppercase font-bold"
                  value={promoForm.code}
                  onChange={e => setPromoForm({ ...promoForm, code: e.target.value })}
                />
                <Input
                  placeholder="DISC %"
                  value={promoForm.discount}
                  onChange={e => setPromoForm({ ...promoForm, discount: e.target.value })}
                />
              </div>
              <Input
                type="date"
                value={promoForm.expiry}
                onChange={e => setPromoForm({ ...promoForm, expiry: e.target.value })}
              />
              <Button onClick={handleAddPromo} className="w-full bg-forest rounded-xl shadow-md h-11">Generate Promo Code</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Multi-City / Showtime Detail View */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <Card className="w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col rounded-[2.5rem] shadow-elevated border-border/50 bg-card">
            <div className="p-6 border-b border-border/30 flex items-center justify-between bg-muted/10">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                  <Settings className="w-6 h-6 text-forest" />
                  Manage: {selectedEvent.name}
                </h2>
                <p className="text-sm text-muted-foreground">Configure cities, venues, and specific screening times.</p>
              </div>
              <Button variant="ghost" className="h-12 w-12 rounded-full" onClick={() => setSelectedEvent(null)}>
                <Trash2 className="w-6 h-6 rotate-45" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-8 space-y-8">
              {selectedEvent.cities?.map((city) => (
                <div key={city.cityId} className="space-y-4 border-l-4 border-gold pl-6 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{city.flag}</span>
                      <div>
                        <h4 className="font-bold text-lg">{city.city}, {city.country}</h4>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {city.venue.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-9 rounded-lg gap-2">
                        <Plus className="w-3 h-3" /> Add Showtime
                      </Button>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {city.showtimes.map(st => (
                      <div key={st.id} className="p-4 bg-muted/20 rounded-xl border border-border/30 group">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-gold/10 text-gold border-gold/20 text-[10px]">{st.day}</Badge>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="font-bold text-sm">{st.date}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {st.time} ({st.timezone})
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className={st.status === "sold-out" ? "text-rose-500" : "text-emerald-500"}>{st.status}</span>
                          <span className="text-muted-foreground">{st.spotsLeft} / {st.totalSpots}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button className="w-full py-12 border-2 border-dashed border-border/50 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-forest/5 hover:border-forest/40 transition-all group">
                <div className="p-4 bg-muted/20 rounded-2xl group-hover:bg-forest/10 transition-colors">
                  <Globe className="w-8 h-8 text-muted-foreground group-hover:text-forest" />
                </div>
                <div>
                  <div className="font-bold text-foreground group-hover:text-forest">Add New City Screening</div>
                  <p className="text-xs text-muted-foreground">Select a new location to expand this event.</p>
                </div>
              </button>
            </div>
            <div className="p-6 border-t border-border/30 bg-muted/5 flex justify-end">
              <Button className="bg-forest h-12 rounded-xl px-12 shadow-md font-bold" onClick={() => setSelectedEvent(null)}>Done Managing Showtimes</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
