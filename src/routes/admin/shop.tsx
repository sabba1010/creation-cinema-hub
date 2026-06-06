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
   Image as ImageIcon,
   ExternalLink
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

import { useEffect } from "react";

// Initial state removed in favor of dynamic fetch

function ShopManagement() {
   const [products, setProducts] = useState<any[]>([]);
   const [isAddProductOpen, setIsAddProductOpen] = useState(false);
   const [isEditProductOpen, setIsEditProductOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState<any>(null);

   // Form state
   const [title, setTitle] = useState("");
   const [category, setCategory] = useState("books");
   const [price, setPrice] = useState("");
   const [stock, setStock] = useState("");
   const [desc, setDesc] = useState("");
   const [externalLink, setExternalLink] = useState("");
   const [image, setImage] = useState("");
   const [storeName, setStoreName] = useState("Amazon");

   const fetchProducts = async () => {
      try {
         const res = await fetch("http://localhost:5000/api/products");
         const data = await res.json();
         if (data.success) {
            setProducts(data.data);
         }
      } catch (error) {
         console.error("Error fetching products", error);
      }
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   const handleDelete = async (id: string, title: string) => {
      try {
         await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
         setProducts(products.filter(p => p._id !== id));
         toast.error(`${title} removed from inventory`);
      } catch (error) {
         toast.error("Failed to delete product");
      }
   };

   const handleEdit = (product: any) => {
      setSelectedProduct(product);
      setTitle(product.title);
      setCategory(product.category);
      setPrice(product.price);
      setStock(product.stock);
      setDesc(product.desc);
      setExternalLink(product.externalLink);
      setImage(product.image);
      setStoreName(product.storeName);
      setIsEditProductOpen(true);
   };

   const handleAddSubmit = async () => {
      try {
         const res = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, category, price, stock, desc, externalLink, image, storeName })
         });
         if (res.ok) {
            toast.success("Product listed successfully!");
            setIsAddProductOpen(false);
            fetchProducts();
         }
      } catch (error) {
         toast.error("Failed to add product");
      }
   };

   const handleEditSubmit = async () => {
      try {
         const res = await fetch(`http://localhost:5000/api/products/${selectedProduct._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, category, price, stock, desc, externalLink, image, storeName })
         });
         if (res.ok) {
            toast.success("Inventory updated!");
            setIsEditProductOpen(false);
            fetchProducts();
         }
      } catch (error) {
         toast.error("Failed to update product");
      }
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
            <StatsCard title="Total Products" value={products.length.toString()} icon={Package} color="forest" />
            <StatsCard title="Active Categories" value={new Set(products.map(p => p.category)).size.toString()} icon={Tag} color="gold" />
            <StatsCard title="Total Inventory" value={products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0).toString()} icon={ShoppingCart} color="sky" />
            <StatsCard title="Average Rating" value={products.length > 0 ? (products.reduce((acc, p) => acc + (Number(p.rating) || 5), 0) / products.length).toFixed(1) : "0.0"} icon={Star} color="forest" />
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
                     <div key={p._id} className="group relative bg-background border border-border/50 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
                        <div className="aspect-square relative overflow-hidden bg-muted">
                           <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
                                 <Button variant="destructive" size="icon" className="h-10 w-10 rounded-xl" onClick={() => handleDelete(p._id, p.title)}>
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
                              {p.externalLink && p.externalLink !== "#" && (
                                 <div className="mt-2 text-[10px] text-primary/60 truncate max-w-[200px]">
                                    <a href={p.externalLink} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                                       <ExternalLink className="w-3 h-3" /> {p.storeName || "Store"}
                                    </a>
                                 </div>
                              )}
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
            <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
               <DialogHeader>
                  <DialogTitle className="text-2xl font-display font-bold">New Product Listing</DialogTitle>
                  <DialogDescription>Add a new item to your online store.</DialogDescription>
               </DialogHeader>
               <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Creator's Journal" className="h-11 rounded-xl" />
                     </div>
                     <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                           <SelectTrigger className="h-11 rounded-xl">
                              <SelectValue placeholder="Select..." />
                           </SelectTrigger>
                           <SelectContent className="rounded-xl">
                              <SelectItem value="books">Books</SelectItem>
                              <SelectItem value="apparel">Apparel</SelectItem>
                              <SelectItem value="digital">Digital</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="0.00" className="h-11 rounded-xl" />
                     </div>
                     <div className="space-y-2">
                        <Label>Initial Stock</Label>
                        <Input value={stock} onChange={e => setStock(e.target.value)} type="number" placeholder="0" className="h-11 rounded-xl" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label>Description</Label>
                     <Input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Product description..." className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <Label>Product Image URL</Label>
                     <Input value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." className="h-11 rounded-xl" />
                     {image && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-border/50 bg-muted/50 h-32 w-32 relative">
                           <img src={image} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                     )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>External Link</Label>
                        <Input value={externalLink} onChange={e => setExternalLink(e.target.value)} placeholder="https://amazon.com/..." className="h-11 rounded-xl" />
                     </div>
                     <div className="space-y-2">
                        <Label>Store Name</Label>
                        <Input value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="e.g. Amazon, Etsy" className="h-11 rounded-xl" />
                     </div>
                  </div>
                  <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px] mt-4" onClick={handleAddSubmit}>
                     Create Listing
                  </Button>
               </div>
            </DialogContent>
         </Dialog>

         {/* Edit Product Dialog */}
         <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
            <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] border-border/50 bg-card/95 backdrop-blur-xl">
               <DialogHeader>
                  <DialogTitle className="text-2xl font-display font-bold">Edit Product</DialogTitle>
                  <DialogDescription>Update details for "{selectedProduct?.title}"</DialogDescription>
               </DialogHeader>
               <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input value={title} onChange={e => setTitle(e.target.value)} className="h-11 rounded-xl" />
                     </div>
                     <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                           <SelectTrigger className="h-11 rounded-xl">
                              <SelectValue placeholder="Select..." />
                           </SelectTrigger>
                           <SelectContent className="rounded-xl">
                              <SelectItem value="books">Books</SelectItem>
                              <SelectItem value="apparel">Apparel</SelectItem>
                              <SelectItem value="digital">Digital</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input value={price} onChange={e => setPrice(e.target.value)} type="number" className="h-11 rounded-xl" />
                     </div>
                     <div className="space-y-2">
                        <Label>Stock Level</Label>
                        <Input value={stock} onChange={e => setStock(e.target.value)} type="number" className="h-11 rounded-xl" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label>Description</Label>
                     <Input value={desc} onChange={e => setDesc(e.target.value)} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <Label>Product Image URL</Label>
                     <Input value={image} onChange={e => setImage(e.target.value)} className="h-11 rounded-xl" />
                     {image && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-border/50 bg-muted/50 h-32 w-32 relative">
                           <img src={image} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                     )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label>External Link</Label>
                        <Input value={externalLink} onChange={e => setExternalLink(e.target.value)} className="h-11 rounded-xl" />
                     </div>
                     <div className="space-y-2">
                        <Label>Store Name</Label>
                        <Input value={storeName} onChange={e => setStoreName(e.target.value)} className="h-11 rounded-xl" />
                     </div>
                  </div>
                  <Button className="w-full bg-forest h-12 rounded-xl shadow-lg font-bold uppercase tracking-widest text-[11px] mt-4" onClick={handleEditSubmit}>
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
