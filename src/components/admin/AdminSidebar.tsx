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
  Baby,
  Globe,
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "../ui/button";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin/" },
  { title: "Events", icon: Calendar, path: "/admin/events" },
  { title: "Week Of Prayer", icon: Video, path: "/admin/prayer" },
  { title: "Films", icon: Film, path: "/admin/films" },
  { title: "KidsBibleFlix", icon: Baby, path: "/admin/kids" },
  { title: "Users", icon: Users, path: "/admin/users" },
  { title: "Donations", icon: Heart, path: "/admin/donations" },
  { title: "Resources", icon: FileText, path: "/admin/resources" },
  { title: "Podcast", icon: Mic, path: "/admin/podcast" },
  { title: "Shop", icon: ShoppingBag, path: "/admin/shop" },
  { title: "Newsletter", icon: Mail, path: "/admin/newsletter" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

export function AdminSidebar() {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    window.location.href = "/login";
  };

  return (
    <Sidebar className="border-r border-border/50 bg-card/50 backdrop-blur-md overflow-x-hidden box-border">
      <SidebarHeader className="p-6 border-b border-border/50">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="h-10 w-10 bg-forest rounded-2xl flex items-center justify-center shadow-lg shadow-forest/20">
            <Globe className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight text-foreground">OMS Admin</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Management Hub</p>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="p-4 space-y-6 overflow-x-hidden box-border">
        <div className="space-y-1">
          <p className="px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-2">Main Menu</p>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path === "/admin/" && location.pathname === "/admin");
              
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`h-11 rounded-xl transition-all duration-300 w-full overflow-hidden ${
                      isActive 
                        ? "bg-forest text-white shadow-md shadow-forest/20" 
                        : "hover:bg-forest/10 hover:text-forest text-muted-foreground"
                    }`}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link to={item.path} className="flex items-center gap-3 w-full">
                      <item.icon className={`h-4.5 w-4.5 ${isActive ? "text-white" : ""}`} />
                      <span className="font-medium">{item.title}</span>
                      {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-70" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>

      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-border/50">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 h-12 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="font-bold uppercase tracking-widest text-[11px]">Sign Out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
