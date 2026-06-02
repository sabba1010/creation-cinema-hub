import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Mail, Lock, ChevronLeft, Github, Globe } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.user.role === "admin") {
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("user_token", data.token);
          localStorage.setItem("user_data", JSON.stringify(data.user));
          toast.success("Welcome to the Admin Portal");
          navigate({ to: "/admin/" });
        } else {
          localStorage.setItem("user_auth", "true");
          localStorage.setItem("user_token", data.token);
          localStorage.setItem("user_data", JSON.stringify(data.user));
          toast.success("Welcome back to One Mustard Seed!");
          navigate({ to: "/profile" });
        }
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-forest/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-3xl" />

      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold tracking-widest text-muted-foreground hover:text-primary transition-all group"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        BACK TO HUB
      </Link>

      <div className="w-full max-w-[450px] space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-2">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-forest-deep text-cream shadow-xl mb-4">
            <Globe className="h-8 w-8" />
          </div>
          <h1 className="font-display text-4xl font-medium">Welcome <span className="italic text-primary">Back</span></h1>
          <p className="text-muted-foreground">Sign in to your One Mustard Seed account</p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl rounded-[2.5rem] p-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>Enter your email and password to access your profile</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 h-12 rounded-xl bg-background/50 border-border/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 rounded-xl bg-background/50 border-border/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-forest-deep text-cream font-bold uppercase tracking-widest shadow-lg hover:shadow-forest/20 transition-all active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Continue"}
              </Button>

              <div className="relative w-full py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground font-bold tracking-widest">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" className="h-12 rounded-xl border-border/50 gap-2">
                  <Globe className="h-4 w-4" /> Google
                </Button>
                <Button variant="outline" className="h-12 rounded-xl border-border/50 gap-2">
                  <Github className="h-4 w-4" /> GitHub
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-primary hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
