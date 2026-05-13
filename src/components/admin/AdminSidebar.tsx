import {
  Calendar,
  LayoutDashboard,
  Film,
  Video,
  Users,
  Heart,
  FileText,
  Mic,
  ShoppingBag,
  CreditCard,
  Mail,
  ChevronRight,
  LogOut,
  Settings,
  Baby
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "Events", icon: Calendar, path: "/admin/events" },
  { title: "Week Of Prayer", icon: Video, path: "/admin/prayer" },
  { title: "Films", icon: Film, path: "/admin/films" },
  { title: "KidsBibleFlix", icon: Baby, path: "/admin/kids" },
  { title: "Users", icon: Users, path: "/admin/users" },
  { title: "Donations", icon: Heart, path: "/admin/donations" },
  { title: "Resources", icon: FileText, path: "/admin/resources" },
  { title: "Podcast", icon: Mic, path: "/admin/podcast" },
  { title: "Shop", icon: ShoppingBag, path: "/admin/shop" },
  { title: "Payments", icon: CreditCard, path: "/admin/payments" },
  // { title: "Marketing", icon: Mail, path: "/admin/marketing" },
];

export function AdminSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    window.location.href = "/login";
  };

  return (
    <Sidebar className="border-r border-border/50 bg-card/50 backdrop-blur-md">
      <SidebarHeader className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-forest p-2 rounded-lg shadow-md">
            <Settings className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <div>
            <h2 className="font-display font-bold text-foreground">OMS Admin</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Management Hub</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    className="h-11 px-4 rounded-xl transition-all duration-200 hover:bg-forest/10 hover:text-forest active:scale-[0.98] data-[active=true]:bg-forest data-[active=true]:text-white data-[active=true]:shadow-md group"
                  >
                    <Link to={item.path} className="flex items-center gap-3 w-full">
                      <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                      <span className="font-medium">{item.title}</span>
                      {location.pathname === item.path && (
                        <ChevronRight className="ml-auto w-4 h-4 opacity-70" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors duration-200 group font-medium"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
