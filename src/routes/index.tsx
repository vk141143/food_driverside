import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bike, Phone, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"mobile" | "email">("mobile");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "mobile") {
      if (mobile.length < 10) return toast.error("Enter a valid mobile number");
      navigate({ to: "/otp", search: { mobile } });
    } else {
      if (!email || !password) return toast.error("Enter email and password");
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="gradient-primary text-primary-foreground px-6 pt-16 pb-14 rounded-b-[2.5rem] soft-shadow">
        <div className="mx-auto max-w-md">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur mb-6">
            <Bike className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-extrabold leading-tight">Welcome back, Partner</h1>
          <p className="text-sm text-primary-foreground/80 mt-1">Sign in to start earning today.</p>
        </div>
      </div>

      <main className="mx-auto -mt-8 w-full max-w-md flex-1 px-5">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-card p-5 card-shadow border border-border animate-slide-up"
        >
          <div className="mb-4 grid grid-cols-2 gap-1 rounded-2xl bg-secondary p-1">
            <button
              type="button"
              onClick={() => setMode("mobile")}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${mode === "mobile" ? "bg-card text-foreground card-shadow" : "text-muted-foreground"}`}
            >
              Mobile + OTP
            </button>
            <button
              type="button"
              onClick={() => setMode("email")}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${mode === "email" ? "bg-card text-foreground card-shadow" : "text-muted-foreground"}`}
            >
              Email
            </button>
          </div>

          {mode === "mobile" ? (
            <div className="space-y-2">
              <Label>Mobile number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  inputMode="numeric"
                  placeholder="98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="h-12 rounded-2xl pl-10 text-base"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-2xl pl-10 text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-2xl pl-10 text-base"
                  />
                </div>
              </div>
              <div className="text-right">
                <button type="button" className="text-xs font-semibold text-primary">Forgot password?</button>
              </div>
            </div>
          )}

          <Button type="submit" className="mt-5 h-12 w-full rounded-2xl gradient-primary text-primary-foreground font-semibold soft-shadow">
            {mode === "mobile" ? "Send OTP" : "Sign in"}
          </Button>

          <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or continue with
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-2xl font-semibold"
            onClick={() => toast("Google sign-in coming soon")}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.7 2.7 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.5 13.3 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.6z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.7-2.9-.7-4.6s.3-3.2.7-4.6l-7.9-6.1C1 16.9 0 20.3 0 24s1 7.1 2.6 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.8l-7.6-5.9c-2.1 1.4-4.8 2.2-8.4 2.2-6.2 0-11.5-3.8-13.5-9.4l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>
            Continue with Google
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          New partner?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Register now
          </Link>
        </p>
      </main>
    </div>
  );
}
