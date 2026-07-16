import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppHeader } from "@/components/driver/AppHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Become a partner" subtitle="Fill in your details to get started" back />
      <form
        className="mx-auto max-w-md px-5 pb-24 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!agree) return toast.error("Please accept the terms");
          toast.success("Registration submitted!");
          navigate({ to: "/otp", search: {} });
        }}
      >
        <Section title="Personal">
          <Field label="Full name"><Input required className="input-tall" placeholder="John Miller" /></Field>
          <Field label="Mobile number"><Input required inputMode="numeric" className="input-tall" placeholder="98765 43210" /></Field>
          <Field label="Email"><Input required type="email" className="input-tall" placeholder="you@example.com" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Password"><Input required type="password" className="input-tall" /></Field>
            <Field label="Confirm"><Input required type="password" className="input-tall" /></Field>
          </div>
          <Field label="Emergency contact"><Input required className="input-tall" placeholder="+91…" /></Field>
        </Section>

        <Section title="Vehicle">
          <Field label="Vehicle type">
            <select className="input-tall w-full rounded-2xl border border-border bg-card px-3">
              <option>Bike</option>
              <option>Scooter</option>
              <option>Bicycle</option>
              <option>Car</option>
            </select>
          </Field>
          <Field label="Vehicle number"><Input required className="input-tall" placeholder="MH 12 AB 1234" /></Field>
          <Field label="Driving license number"><Input required className="input-tall" /></Field>
        </Section>

        <Section title="Documents">
          <UploadRow label="Driving license" />
          <UploadRow label="Vehicle RC" />
          <UploadRow label="Insurance" />
          <UploadRow label="Profile photo" />
        </Section>

        <Section title="Payout">
          <Field label="Bank account"><Input className="input-tall" placeholder="Account number" /></Field>
          <Field label="IFSC"><Input className="input-tall" placeholder="HDFC0001234" /></Field>
          <Field label="UPI ID"><Input className="input-tall" placeholder="name@upi" /></Field>
        </Section>

        <label className="flex items-start gap-3 rounded-2xl bg-card border border-border p-4">
          <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
          <span className="text-sm text-muted-foreground">
            I accept the <span className="font-semibold text-primary">Terms & Conditions</span> and the partner code of conduct.
          </span>
        </label>

        <Button type="submit" className="h-12 w-full rounded-2xl gradient-primary text-primary-foreground font-semibold soft-shadow">
          Create account
        </Button>
      </form>
      <style>{`.input-tall{height:3rem;border-radius:1rem}`}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border p-4 card-shadow">
      <div className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function UploadRow({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-2xl border border-dashed border-border bg-background px-4 py-3 text-left text-sm hover:border-primary transition"
    >
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">Tap to upload · PDF, JPG, PNG</div>
      </div>
      <Upload className="h-4 w-4 text-primary" />
    </button>
  );
}