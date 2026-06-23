import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Crown, Ticket, ShoppingBag, ArrowRight, Heart, Film } from "lucide-react";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { SiteFooter } from "../../components/layout/SiteFooter";

const API_URL = import.meta.env.VITE_API_URL || "https://movie-backend-drab.vercel.app";

export const Route = createFileRoute("/payment/success")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => {
    return {
      session_id: search.session_id as string | undefined,
    };
  },
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const { session_id } = useSearch({ from: "/payment/success" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutType, setCheckoutType] = useState<string | null>(null);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    if (!session_id) {
      setError("No session ID found.");
      setLoading(false);
      return;
    }

    const verifySession = async () => {
      try {
        const res = await fetch(`${API_URL}/api/payment/verify-session?sessionId=${session_id}`);
        const data = await res.json();

        if (data.success) {
          setCheckoutType(data.type);
          setDetails(data);

          if (data.type === "kids_subscription") {
            // Update local user data
            const storedUser = localStorage.getItem("user_data");
            if (storedUser) {
              const user = JSON.parse(storedUser);
              user.kidsAccess = true;
              user.kidsAccessType = data.purchase.plan;
              user.kidsAccessExpiry = data.purchase.expiresAt;
              localStorage.setItem("user_data", JSON.stringify(user));
            }
          } else if (data.type === "cart_checkout") {
            // Clear local cart
            localStorage.removeItem("oms_cart");
            window.dispatchEvent(new Event("cart_updated"));
          } else if (data.type === "prayer_access") {
            localStorage.setItem(`prayer_access_${data.seasonId}`, "true");
          } else if (data.type === "film_purchase") {
            const storedUser = localStorage.getItem("user_data");
            let userId = "guest";
            if (storedUser) {
              try { userId = JSON.parse(storedUser)._id || JSON.parse(storedUser).id || "guest"; } catch (e) { }
            }
            const userKey = `cinema_access_${userId}_${data.filmId}`;
            const accessData = {
              type: data.purchaseType,
              expiresAt: data.expiresAt ? new Date(data.expiresAt).getTime() : null
            };
            localStorage.setItem(userKey, JSON.stringify(accessData));
          }
        } else {
          setError(data.message || "Failed to verify payment session.");
        }
      } catch (err) {
        console.error(err);
        setError("Network error. Could not verify payment.");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [session_id]);

  return (
    <div className="bg-[#FAF7EE] min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-32 pb-24 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white rounded-[3rem] p-12 text-center border border-[#EFECE3] shadow-2xl relative overflow-hidden">
          {loading ? (
            <div className="space-y-6 py-12">
              <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto"></div>
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest animate-pulse">Verifying Payment...</p>
            </div>
          ) : error ? (
            <div className="space-y-6">
              <div className="h-24 w-24 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <span className="text-rose-500 text-4xl">✕</span>
              </div>
              <h1 className="font-display text-3xl font-bold text-gray-900">Verification Failed</h1>
              <p className="text-muted-foreground leading-relaxed">{error}</p>
              <Link to="/" className="block w-full py-4 rounded-2xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-forest-deep/90 transition-all text-center">
                Back to Safety
              </Link>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="h-24 w-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
              </div>

              {checkoutType === "kids_subscription" && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100">
                    <Crown className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest capitalize">{details?.purchase?.plan} Member</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-forest-deep">Welcome to the Family!</h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Your subscription of <strong>{details?.purchase?.amount}</strong> is now active. You have full access to the KidsBibleFlix library.
                  </p>
                  <Link to="/kids/library" className="block w-full py-5 rounded-3xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                    Start Watching <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {checkoutType === "event_ticket" && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full border border-gold/20">
                    <Ticket className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Ticket Confirmed</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-forest-deep">Registration Successful!</h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Your ticket for <strong>{details?.ticket?.category} Admission</strong> has been confirmed. Ticket ID: <code className="bg-muted px-2 py-1 rounded text-sm font-mono font-bold text-forest-deep">{details?.ticket?.ticketId}</code>
                  </p>
                  <Link to="/profile" className="block w-full py-5 rounded-3xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                    View My Tickets <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {checkoutType === "cart_checkout" && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100">
                    <ShoppingBag className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Order Confirmed</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-forest-deep">Thank You For Your Order!</h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Your transaction was completed successfully. You will receive an email confirmation with your shipment tracking details shortly.
                  </p>
                  <Link to="/shop" className="block w-full py-5 rounded-3xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                    Continue Shopping <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {checkoutType === "prayer_access" && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100">
                    <Crown className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Access Granted</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-forest-deep">Registration Successful!</h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Your access to <strong>{details?.seasonTitle || 'the Week of Prayer season'}</strong> is now active.
                  </p>
                  <Link to="/prayer" className="block w-full py-5 rounded-3xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                    Start Watching <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {checkoutType === "film_purchase" && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full border border-gold/20">
                    <Film className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">{details?.purchaseType === 'buy' ? 'Purchased' : 'Rented'}</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-forest-deep">Payment Successful!</h1>
                  <p className="text-muted-foreground leading-relaxed">
                    You now have access to watch <strong>{details?.filmTitle || 'the film'}</strong>.
                  </p>
                  <Link to={`/films/${details?.filmId}`} className="block w-full py-5 rounded-3xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                    Watch Film Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {checkoutType === "donation" && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full border border-rose-100">
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="text-xs font-bold uppercase tracking-widest">Donation Received</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-forest-deep">Thank You For Your Support!</h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Your generous donation of <strong>${details?.amount || '0'}</strong> has been received. Your stewardship fuels the production of faith-building media.
                  </p>
                  <Link to="/support" className="block w-full py-5 rounded-3xl bg-forest-deep text-cream font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                    Back to Support <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
