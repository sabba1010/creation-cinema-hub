import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Mimic API call
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "123456") {
        localStorage.setItem("admin_auth", "true");
        toast.success("Welcome to the Admin Portal");
        onLogin();
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 100);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-forest p-4 grain relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-forest-deep/30 rounded-full blur-3xl" />
      
      <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl shadow-elevated animate-fade-up relative z-10">
        <CardHeader className="text-center space-y-1">
          <div className="mx-auto bg-gold/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-glow">
            <ShieldCheck className="w-8 h-8 text-gold" />
          </div>
          <CardTitle className="text-3xl font-display text-white">Admin Portal</CardTitle>
          <CardDescription className="text-white/60">
            Enter your credentials to access the management hub
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <p className="text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-semibold h-12 transition-all active:scale-[0.98]" 
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login to Dashboard"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
