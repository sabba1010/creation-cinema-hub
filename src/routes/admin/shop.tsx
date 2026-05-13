import { createFileRoute } from "@tanstack/react-router";
import { 
  ShoppingBag, 
  Plus, 
  ExternalLink, 
  Star, 
  ShoppingBasket, 
  MoreVertical,
  Edit,
  Trash2,
  Package,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/shop")({
  component: ShopManagement,
});

const products = [
  { id: 1, name: "The Mustard Seed Devotional", platform: "Amazon", price: "$24.99", status: "Featured", clicks: 1240 },
  { id: 2, name: "Kids Bible Stickers", platform: "Etsy", price: "$8.50", status: "Active", clicks: 856 },
  { id: 3, name: "Prayer Journal (Linen)", platform: "Shopify", price: "$32.00", status: "Active", clicks: 432 },
  { id: 4, name: "Faith Over Fear Hoodie", platform: "Etsy", price: "$45.00", status: "Draft", clicks: 0 },
];

function ShopManagement() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Shop Management</h1>
          <p className="text-muted-foreground">Manage product listings, affiliate links, and featured collections.</p>
        </div>
        <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Products" value="12" icon={Package} />
        <StatsCard title="Featured" value="3" icon={Star} />
        <StatsCard title="Total Clicks" value="2.5k" icon={ArrowUpRight} />
        <StatsCard title="Conversion" value="3.2%" icon={ShoppingBasket} />
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="products" className="rounded-lg px-6">Products</TabsTrigger>
          <TabsTrigger value="featured" className="rounded-lg px-6">Featured Collection</TabsTrigger>
          <TabsTrigger value="platforms" className="rounded-lg px-6">External Shops</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 bg-muted/10">
                  <TableHead className="py-4">Product Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Click-throughs</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="border-border/50 hover:bg-muted/5 transition-colors">
                    <TableCell className="font-bold py-4">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-border/50 bg-background/50 font-normal">
                        {product.platform}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.price}</TableCell>
                    <TableCell>
                      <Badge className={
                        product.status === "Featured" ? "bg-gold text-gold-foreground" :
                        product.status === "Active" ? "bg-forest text-white" :
                        "bg-muted text-muted-foreground"
                      }>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <div className="flex items-center gap-1.5 text-sm">
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                          {product.clicks.toLocaleString()}
                       </div>
                    </TableCell>
                    <TableCell className="text-right">
                       <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ExternalLink className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical className="w-4 h-4" /></Button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="featured" className="grid gap-6 md:grid-cols-2">
           <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-6 border-dashed border-2 flex flex-col items-center justify-center text-center gap-4 group hover:bg-muted/10 transition-all cursor-pointer">
              <div className="p-4 bg-muted/20 rounded-full group-hover:bg-gold/10 transition-colors">
                 <Star className="w-8 h-8 text-muted-foreground group-hover:text-gold" />
              </div>
              <div className="space-y-1">
                 <h3 className="font-bold">Add to Featured</h3>
                 <p className="text-sm text-muted-foreground">Select products to show on the main homepage carousel</p>
              </div>
           </Card>
           {products.filter(p => p.status === "Featured").map(p => (
              <Card key={p.id} className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden flex">
                 <div className="w-32 bg-muted flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />
                 </div>
                 <CardContent className="p-4 flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                       <Badge className="bg-gold text-gold-foreground">Featured</Badge>
                       <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    <div className="font-bold text-lg">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.platform} • {p.price}</div>
                 </CardContent>
              </Card>
           ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon }: any) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2">
      <div className="p-3 bg-muted/20 rounded-2xl w-fit">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="text-3xl font-bold font-display">{value}</div>
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest text-[10px]">{title}</div>
    </Card>
  );
}
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
