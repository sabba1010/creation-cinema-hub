import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { 
  ShoppingBag, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Package,
  Star,
  ArrowUpRight,
  ShoppingCart,
  Tag,
  Cpu,
  Shirt,
  Book,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export const Route = createFileRoute("/admin/shop")({
  component: ShopManagement,
});

// Synchronized with public Shop page
const INITIAL_PRODUCTS = [
  { id: 1, title: "The Seed of Wonder", category: "Books", price: 18.99, stock: 45, rating: 4.9, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop" },
  { id: 2, title: "OMS Signature Hoodie", category: "Apparel", price: 45.00, stock: 12, rating: 4.8, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" },
  { id: 3, title: "Prayer Meditation Album", category: "Digital", price: 12.00, stock: 999, rating: 5.0, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop" },
  { id: 4, title: "Creation Story Tee", category: "Apparel", price: 28.00, stock: 24, rating: 4.7, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
  { id: 5, title: "Nature Study Workbook", category: "Books", price: 22.50, stock: 18, rating: 4.9, img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop" },
  { id: 6, title: "Ministry Digital Bundle", category: "Digital", price: 99.00, stock: 999, rating: 4.8, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop" },
];

function ShopManagement() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleDelete = (id: number, title: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.error(`${title} removed from inventory`);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Shop Hub</h1>
          <p className="text-muted-foreground">Manage your product catalog and track inventory.</p>
        </div>
        <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md hover:shadow-forest/20 transition-all" onClick={() => setIsAddProductOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatsCard title="Total Products" value="12" icon={Package} color="forest" />
        <StatsCard title="Active Categories" value="3" icon={Tag} color="gold" />
        <StatsCard title="Monthly Sales" value="$4,280" icon={ShoppingCart} color="sky" />
        <StatsCard title="Average Rating" value="4.8" icon={Star} color="forest" />
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search inventory..." className="pl-10 h-11 rounded-xl bg-background/50 border-border/50" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl h-11 border-border/50 gap-2">
              <Filter className="w-4 h-4" />
              Category
            </Button>
          </div>
        </div>

        <div className="p-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div key={p.id} className="group relative bg-background border border-border/50 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
                   <div className="aspect-square relative overflow-hidden bg-muted">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 left-4">
                         <Badge className="bg-white/90 backdrop-blur text-forest-deep font-bold border-none text-[9px] uppercase tracking-widest px-3">
                            {p.category}
                         </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                         <div className="flex gap-2 w-full">
                            <Button variant="secondary" className="flex-1 rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest gap-2" onClick={() => handleEdit(p)}>
                               <Edit3 className="w-3 h-3" /> Edit
                            </Button>
                            <Button variant="destructive" size="icon" className="h-10 w-10 rounded-xl" onClick={() => handleDelete(p.id, p.title)}>
                               <Trash2 className="w-4 h-4" />
                            </Button>
                         </div>
                      </div>
                   </div>
                   <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                         <div className="flex justify-between items-start mb-1">
                            <h3 className="font-display font-bold text-lg text-forest-deep">{p.title}</h3>
                            <span className="font-bold text-forest-deep">${p.price.toFixed(2)}</span>
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <span className={p.stock < 20 ? "text-amber-500" : "text-emerald-500"}>{p.stock} in stock</span>
                            <span className="h-1 w-1 rounded-full bg-border" />
                            <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-gold text-gold" /> {p.rating}</span>
                         </div>
                      </div>
                   </div>
                </div>
              ))}

              <button 
                onClick={() => setIsAddProductOpen(true)}
                className="border-2 border-dashed border-border/50 rounded-[2rem] aspect-square flex flex-col items-center justify-center gap-4 text-muted-foreground hover:bg-forest/5 hover:border-forest/50 hover:text-forest transition-all group"
              >
                 <div className="h-16 w-16 rounded-2xl bg-muted/20 flex items-center justify-center group-hover:bg-forest/10 transition-all group-hover:rotate-90">
                    <Plus className="w-10 h-10" />
                 </div>
                 <div className="text-center">
                    <span className="font-bold text-sm uppercase tracking-widest block">Add New Product</span>
                    <span className="text-[10px] text-muted-foreground mt-1 block">Expand your catalog</span>
                 </div>
              </button>
           </div>
        </div>
      </Card>

      {/* --- FAKE FUNCTIONALITY DIALOGS --- */}

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
         <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
            <DialogHeader>
               <DialogTitle className="text-2xl font-display font-bold">New Product Listing</DialogTitle>
               <DialogDescription>Add a new item to your online store.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label>Product Name</Label>
                     <Input placeholder="e.g. Creator's Journal" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <Label>Category</Label>
                     <Select>
                        <SelectTrigger className="h-11 rounded-xl">
                           <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                           <SelectItem value="Books">Books</SelectItem>
                           <SelectItem value="Apparel">Apparel</SelectItem>
                           <SelectItem value="Digital">Digital</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label>Price ($)</Label>
                     <Input type="number" placeholder="0.00" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <Label>Initial Stock</Label>
                     <Input type="number" placeholder="0" className="h-11 rounded-xl" />
                  </div>
               </div>
               <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:bg-muted/50 transition-all cursor-pointer">
                     <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                     <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Upload JPG/PNG</span>
                  </div>
               </div>
               <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px]" onClick={() => { toast.success("Product listed successfully!"); setIsAddProductOpen(false); }}>
                  Create Listing
               </Button>
            </div>
         </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
         <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
            <DialogHeader>
               <DialogTitle className="text-2xl font-display font-bold">Edit Product</DialogTitle>
               <DialogDescription>Update details for "{selectedProduct?.title}"</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
               <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input defaultValue={selectedProduct?.title} className="h-11 rounded-xl" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label>Price ($)</Label>
                     <Input defaultValue={selectedProduct?.price} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <Label>Stock Level</Label>
                     <Input defaultValue={selectedProduct?.stock} className="h-11 rounded-xl" />
                  </div>
               </div>
               <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px]" onClick={() => { toast.success("Inventory updated!"); setIsEditProductOpen(false); }}>
                  Save Changes
               </Button>
            </div>
         </DialogContent>
      </Dialog>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color }: any) {
  const colorMap: any = {
    forest: "bg-forest/10 text-forest",
    gold: "bg-gold/10 text-gold",
    sky: "bg-sky/10 text-sky"
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card p-6 flex flex-col gap-2 transition-all hover:-translate-y-1">
      <div className={`p-3 rounded-2xl w-fit ${colorMap[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-0.5">
        <div className="text-3xl font-bold font-display">{value}</div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</div>
      </div>
      <div className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 mt-2">
        <ArrowUpRight className="w-3 h-3" />
        +12% sales
      </div>
    </Card>
  );
}
