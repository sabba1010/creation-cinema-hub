import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  Users, 
  Film, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
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
  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Users" 
          value="2,854" 
          change="+12.5%" 
          trend="up" 
          icon={Users} 
        />
        <StatsCard 
          title="Film Views" 
          value="45.2K" 
          change="+8.2%" 
          trend="up" 
          icon={Film} 
        />
        <StatsCard 
          title="Active Events" 
          value="12" 
          change="-2" 
          trend="down" 
          icon={Calendar} 
        />
        <StatsCard 
          title="Revenue" 
          value="$12,450" 
          change="+18.7%" 
          trend="up" 
          icon={CreditCard} 
        />
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
                    <stop offset="5%" stopColor="oklch(var(--gold))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="oklch(var(--gold))" stopOpacity={0}/>
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

function StatsCard({ title, value, change, trend, icon: Icon }: any) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card transition-all hover:shadow-elevated hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-forest/10 rounded-lg">
          <Icon className="h-4 w-4 text-forest" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-display">{value}</div>
        <p className="text-xs flex items-center mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="w-3 h-3 text-emerald-500 mr-1" />
          ) : (
            <ArrowDownRight className="w-3 h-3 text-rose-500 mr-1" />
          )}
          <span className={trend === "up" ? "text-emerald-500" : "text-rose-500"}>{change}</span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </p>
      </CardContent>
    </Card>
  );
}
