import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";

export const Route = createFileRoute("/prayer/checkout")({
  validateSearch: (search: Record<string, unknown>): { seriesId?: string } => {
    return {
      seriesId: search.seriesId as string | undefined,
    };
  },
  component: PrayerCheckoutPage,
});

function PrayerCheckoutPage() {
  const { seriesId } = Route.useSearch();
  const navigate = useNavigate();
  const [series, setSeries] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!seriesId) {
      toast.error("Invalid series selection");
      navigate({ to: "/prayer" });
      return;
    }

    const fetchSeries = async () => {
      try {
        const res = await fetch(`${API_URL}/api/prayer/seasons/${seriesId}`);
        const data = await res.json();
        if (data.success) {
          setSeries(data.data);
        } else {
          toast.error("Failed to load series details");
        }
      } catch (err) {
        console.error("Error fetching series", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, [seriesId, navigate]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("user_token");
      if (!token) {
        toast.error("Please login to proceed with purchase.");
        navigate({ to: "/login", search: { redirect: window.location.pathname + window.location.search } } as any);
        return;
      }

      const res = await fetch(`${API_URL}/api/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          type: "prayer_access",
          seriesId: seriesId,
          successUrl: `${window.location.origin}/payment/success`,
          cancelUrl: window.location.href
        })
      });

      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to initiate payment session");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-forest border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!series) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Series not found</h1>
          <Link to="/prayer" className="text-forest underline">Back to Week of Prayer</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col text-forest-deep">
      <SiteHeader />
      <main className="flex-grow pt-32 pb-24 flex items-center justify-center px-6">
        <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-[3rem] border border-[#EFECE3] shadow-2xl overflow-hidden">
          {/* Left Column: Details */}
          <div className="p-12 bg-forest-deep text-cream flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {series.bannerImage && (
                <img src={series.bannerImage} alt="" className="w-full h-full object-cover blur-sm" />
              )}
            </div>
            <div className="relative z-10 space-y-8">
              <div>
                <span className="bg-gold text-forest-deep font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">Week of Prayer</span>
                <h1 className="font-display text-4xl font-bold mt-4 leading-tight">{series.title}</h1>
                <p className="text-gold italic text-lg mt-2 font-display">{series.theme}</p>
              </div>

              <div className="space-y-4">
                <p className="text-cream/70 text-sm leading-relaxed line-clamp-4">
                  {series.description || "Unlock all daily episodes, video materials, study guides, and companion resources for this season of prayer."}
                </p>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <span>Access to all {series.accessDays || 14} days of devotional video content</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <span>Accompanying study guides & handouts</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <span>Watch anywhere on your favorite devices</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-8 border-t border-white/10 flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-widest text-cream/50">One-Time Purchase</span>
              <span className="text-3xl font-bold text-gold">${series.price || 29}</span>
            </div>
          </div>

          {/* Right Column: Checkout Confirmation */}
          <div className="p-12 flex flex-col justify-between bg-white">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-bold">Secure checkout</h2>
                <p className="text-muted-foreground text-sm">Complete your registration to unlock instant access.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF7EE] border border-[#EFECE3] space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Registration Fee</span>
                  <span className="font-bold">${series.price || 29}.00</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-[#EFECE3] font-bold text-lg">
                  <span>Total Due</span>
                  <span>${series.price || 29}.00</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full h-14 bg-forest-deep hover:bg-forest text-cream font-bold uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  {isProcessing ? "Redirecting..." : "Pay via Stripe"}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest">
                  Payments are secure & encrypted by Stripe.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground/50 mt-12">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted Transaction</span>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
