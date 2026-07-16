import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/driver/AppHeader";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/otp")({
  component: OtpPage,
  validateSearch: (s) => z.object({ mobile: z.string().optional() }).parse(s),
});

function OtpPage() {
  const { mobile } = Route.useSearch();
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = useState(30);
  const [success, setSuccess] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function handleChange(i: number, val: string) {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
    if (next.every((d) => d)) verify(next.join(""));
  }

  function handleKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  }

  function verify(code: string) {
    if (code.length !== 6) return toast.error("Enter the full code");
    setSuccess(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 1200);
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Verify OTP" back />
      <main className="mx-auto max-w-md px-5 pb-24">
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit code to{" "}
          <span className="font-semibold text-foreground">+91 {mobile ?? "98765 43210"}</span>
        </p>

        {success ? (
          <div className="mt-16 flex flex-col items-center gap-4 animate-slide-up">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-accent/15 text-accent">
              <CheckCircle2 className="h-12 w-12" strokeWidth={2.5} />
            </div>
            <div className="text-lg font-semibold">Verified successfully</div>
            <p className="text-sm text-muted-foreground">Redirecting to your dashboard…</p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-6 gap-2">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKey(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-14 rounded-2xl border border-border bg-card text-center text-xl font-bold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Didn't get it?</span>
              {countdown > 0 ? (
                <span className="font-semibold text-muted-foreground">Resend in {countdown}s</span>
              ) : (
                <button
                  className="font-semibold text-primary"
                  onClick={() => {
                    setCountdown(30);
                    toast.success("OTP resent");
                  }}
                >
                  Resend OTP
                </button>
              )}
            </div>

            <Button
              className="mt-8 h-12 w-full rounded-2xl gradient-primary text-primary-foreground font-semibold soft-shadow"
              onClick={() => verify(digits.join(""))}
            >
              Verify & continue
            </Button>
          </>
        )}
      </main>
    </div>
  );
}