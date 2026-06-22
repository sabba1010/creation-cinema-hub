import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Users,
  Film,
  Calendar,
  CreditCard,
  TrendingUp,
  Activity,
  Heart,
  Box,
  Flag,
  BookOpen,
  Mail,
  MessageSquare,
  PlayCircle,
  Mic,
  Sun,
  Banknote,
  Tv
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: DashboardOverview,
});

const data = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 },
  { name: "Apr", total: 2800 },
  { name: "May", total: 4500 },
  { name: "Jun", total: 5200 },
];

const revenueData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 600 },
  { name: "Thu", value: 800 },
  { name: "Fri", value: 500 },
  { name: "Sat", value: 900 },
  { name: "Sun", value: 700 },
];

function DashboardOverview() {
  const [stats, setStats] = useState({
    users: 0,
    films: 0,
    events: 0,
    revenue: 0,
    donations: 0,
    donationAmount: 0,
    products: 0,
    campaigns: 0,
    resources: 0,
    subscribers: 0,
    messages: 0,
    kidsSeries: 0,
    podcasts: 0,
    prayers: 0,
    series: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("user_token");
      if (!token) return;

      try {
        const headers = { "Authorization": `Bearer ${token}` };
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const baseUrl = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

        const fetchEndpoint = async (endpoint: string, options = {}) => {
          try {
            const res = await fetch(`${baseUrl}${endpoint}`, options);
            if (!res.ok) return [];
            const data = await res.json();
            if (Array.isArray(data)) return data;
            return data.success ? data.data || [] : data;
          } catch (e) {
            console.error(`Error fetching ${endpoint}:`, e);
            return [];
          }
        };

        const [
          usersData, eventsData, ticketsData, filmsData,
          donationsData, productsData, campaignsData, resourcesData,
          newsletterData, contactData, kidsData, podcastData, prayerData, seriesData
        ] = await Promise.all([
          fetchEndpoint("/users", { headers }),
          fetchEndpoint("/events"),
          fetchEndpoint("/tickets", { headers }),
          fetchEndpoint("/films"),
          fetchEndpoint("/donations", { headers }),
          fetchEndpoint("/products"),
          fetchEndpoint("/campaigns"),
          fetchEndpoint("/resources"),
          fetchEndpoint("/newsletter", { headers }),
          fetchEndpoint("/contact", { headers }),
          fetchEndpoint("/kids/series"),
          fetchEndpoint("/podcast/seasons"),
          fetchEndpoint("/prayer/seasons"),
          fetchEndpoint("/series")
        ]);

        let totalRevenue = 0;
        if (Array.isArray(ticketsData)) {
          ticketsData.forEach((t: any) => {
            if (t.status === 'Paid') {
              const priceStr = String(t.pricePaid || 0).replace(/[^0-9.]/g, '');
              totalRevenue += parseFloat(priceStr) || 0;
            }
          });
        }

        let totalDonationAmount = 0;
        if (Array.isArray(donationsData)) {
          donationsData.forEach((d: any) => {
            const amountStr = String(d.amount || d.totalAmount || 0).replace(/[^0-9.]/g, '');
            totalDonationAmount += parseFloat(amountStr) || 0;
          });
        }

        // Fallback checks for nested data if the endpoint structure differs
        const countData = (data: any) => Array.isArray(data) ? data.length : (data ? 1 : 0);

        setStats({
          users: countData(usersData),
          events: countData(eventsData),
          films: countData(filmsData),
          revenue: totalRevenue,
          donations: countData(donationsData),
          donationAmount: totalDonationAmount,
          products: countData(productsData),
          campaigns: countData(campaignsData),
          resources: countData(resourcesData),
          subscribers: countData(newsletterData),
          messages: countData(contactData),
          kidsSeries: countData(kidsData),
          podcasts: countData(podcastData),
          prayers: countData(prayerData),
          series: countData(seriesData),
        });

      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's your complete real-time data overview.</p>
      </div>

      <div className="space-y-12">

        {/* Core Financials & Overview */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
            <Activity className="w-5 h-5 text-gold" /> Core Financials & Overview
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Users" value={stats.users.toString()} change="Real-time" icon={Users} color="sky" />
            <StatsCard title="Ticket Revenue" value={`$${stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} change="Real-time" icon={CreditCard} color="gold" className="border-gold/30 bg-gold/5" />
            <StatsCard title="Donation Vol." value={`$${stats.donationAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} change="Real-time" icon={Banknote} color="gold" className="border-gold/30 bg-gold/5" />
            <StatsCard title="Total Donations" value={stats.donations.toString()} change="Real-time" icon={Heart} color="earth" />
          </div>
        </div>

        {/* Content Library */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
            <PlayCircle className="w-5 h-5 text-forest" /> Content Library
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Films" value={stats.films.toString()} change="Real-time" icon={Film} color="forest" />
            <StatsCard title="KidsBible" value={stats.kidsSeries.toString()} change="Real-time" icon={PlayCircle} color="forest" />
            <StatsCard title="Podcast Seasons" value={stats.podcasts.toString()} change="Real-time" icon={Mic} color="forest" />
            <StatsCard title="Prayer Seasons" value={stats.prayers.toString()} change="Real-time" icon={Sun} color="forest" />
          </div>
        </div>

        {/* Engagement & Store */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
            <Users className="w-5 h-5 text-sky" /> Engagement & Store
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatsCard title="Active Events" value={stats.events.toString()} change="Real-time" icon={Calendar} color="sky" />
            <StatsCard title="Shop Products" value={stats.products.toString()} change="Real-time" icon={Box} color="earth" />
            <StatsCard title="Campaigns" value={stats.campaigns.toString()} change="Real-time" icon={Flag} color="earth" />
            <StatsCard title="Resources" value={stats.resources.toString()} change="Real-time" icon={BookOpen} color="forest" />
            <StatsCard title="Subscribers" value={stats.subscribers.toString()} change="Real-time" icon={Mail} color="sky" />
            <StatsCard title="Messages" value={stats.messages.toString()} change="Real-time" icon={MessageSquare} color="sky" />
          </div>
        </div>

        {/* Content Analysis */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
            <PlayCircle className="w-5 h-5 text-gold" /> Content Distribution Analysis
          </h2>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <CardContent className="h-[350px] p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'KidsBible', count: stats.kidsSeries },
                  { name: 'Podcast', count: stats.podcasts },
                  { name: 'Film', count: stats.films },
                  { name: 'Event', count: stats.events },
                  { name: 'Week of Prayer', count: stats.prayers },
                ]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--border) / 0.5)" />
                  <XAxis dataKey="name" stroke="oklch(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(26, 47, 36, 0.05)" }}
                    contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", padding: "12px" }}
                    labelStyle={{ color: "#111827", fontWeight: "bold", marginBottom: "4px" }}
                    itemStyle={{ color: "#1a2f24", fontWeight: "500" }}
                  />
                  <Bar dataKey="count" fill="#1a2f24" radius={[6, 6, 0, 0]} name="Total Series/Items Showing" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-forest" />
              Monthly Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--border) / 0.5)" />
                <XAxis
                  dataKey="name"
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  cursor={{ fill: "oklch(var(--forest) / 0.1)" }}
                  contentStyle={{
                    backgroundColor: "oklch(var(--card))",
                    borderColor: "oklch(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow-card)"
                  }}
                />
                <Bar dataKey="total" fill="oklch(var(--forest))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Activity className="w-5 h-5 text-gold" />
              Weekly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(var(--gold))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(var(--gold))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--border) / 0.5)" />
                <XAxis
                  dataKey="name"
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(var(--card))",
                    borderColor: "oklch(var(--border))",
                    borderRadius: "12px"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(var(--gold))"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, icon: Icon, color = "forest", className = "" }: any) {

  const getColorClasses = (c: string) => {
    switch (c) {
      case 'gold': return 'bg-gold/10 text-gold';
      case 'sky': return 'bg-sky/10 text-sky';
      case 'earth': return 'bg-earth/10 text-earth';
      case 'forest':
      default:
        return 'bg-forest/10 text-forest';
    }
  };

  return (
    <Card className={`border-border/50 bg-card/50 backdrop-blur-sm shadow-card transition-all hover:shadow-elevated hover:scale-[1.02] ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${getColorClasses(color)}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-display">{value}</div>
        <p className="text-xs flex items-center mt-1 text-muted-foreground">
          <span className="text-emerald-500 mr-1 font-bold">{change}</span> Live Data
        </p>
      </CardContent>
    </Card>
  );
}

