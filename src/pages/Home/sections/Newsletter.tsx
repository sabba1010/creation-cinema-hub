import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function Newsletter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <section id="resources" className="relative bg-gradient-warm py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-10 shadow-elevated sm:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-gold opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-gradient-forest opacity-15 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-earth">Free resources</span>
              <h2 className="mt-3 font-display text-4xl font-light leading-tight text-forest-deep sm:text-5xl">
                Join our<br /><span className="italic text-forest">growing family.</span>
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Get free family devotionals, classroom kits, and the latest releases — crafted for parents, teachers, churches, and youth leaders.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-forest-deep/85">
                {["Monthly story drop", "Free curriculum samples", "Early event invites"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center items-center h-full">
              {!isLoggedIn && (
                <div className="space-y-4 w-full">
                  <Link to="/register" className="flex w-full justify-center rounded-full bg-gradient-forest px-6 py-4 text-sm font-semibold text-cream shadow-card transition hover:shadow-elevated">
                    Join / Register
                  </Link>
                  <p className="text-center text-[11px] text-muted-foreground">
                    Already have an account? <Link to="/login" className="text-forest underline">Log in here</Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-forest-deep/70">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-sm shadow-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}
