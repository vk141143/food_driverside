import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/driver/AppHeader";
import { driver } from "@/lib/mock";
import {
  Bike, FileText, Wallet, Bell, Shield, HelpCircle,
  LogOut, ChevronRight, Star, CheckCircle2, Trophy, LifeBuoy, PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/profile")({ component: ProfilePage });

function ProfilePage() {
  const nav = useNavigate();
  return (
    <>
      <AppHeader title="Profile" />
      <div className="px-5 space-y-4">
        <div className="rounded-3xl gradient-primary text-primary-foreground p-5 soft-shadow flex items-center gap-4">
          <img src={driver.photo} alt={driver.name} className="h-16 w-16 rounded-2xl object-cover border-2 border-white/40" />
          <div className="min-w-0 flex-1">
            <div className="text-lg font-extrabold truncate">{driver.name}</div>
            <div className="text-xs opacity-80 truncate">{driver.vehicle}</div>
            <div className="mt-1 flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {driver.rating}</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {driver.acceptanceRate}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Metric label="Acceptance" value={`${driver.acceptanceRate}%`} />
          <Metric label="Completion" value={`${driver.completionRate}%`} />
          <Metric label="Rating" value={`${driver.rating}★`} />
        </div>

        <div className="rounded-3xl bg-card border border-border card-shadow overflow-hidden">
          <MenuItem icon={<Bike className="h-5 w-5" />} label="Vehicle & license" hint="Honda Activa · MH12" />
          <MenuItem icon={<FileText className="h-5 w-5" />} label="Documents" hint="4 uploaded" />
          <MenuItem icon={<Wallet className="h-5 w-5" />} label="Bank & UPI" hint="HDFC ••••4212" />
          <MenuItem icon={<Bell className="h-5 w-5" />} label="Availability & zones" hint="Anywhere · 8 km" />
          <MenuItem icon={<Trophy className="h-5 w-5" />} label="Achievements & badges" hint="6 earned" />
          <MenuItem icon={<Shield className="h-5 w-5" />} label="SOS & emergency" hint="Enabled" tone="danger" />
        </div>

        <div className="rounded-3xl bg-card border border-border card-shadow overflow-hidden">
          <MenuItem icon={<HelpCircle className="h-5 w-5" />} label="Help centre & FAQs" />
          <MenuItem icon={<LifeBuoy className="h-5 w-5" />} label="Raise a ticket" />
          <MenuItem icon={<PhoneCall className="h-5 w-5" />} label="Call support" hint="24/7" />
        </div>

        <Button
          variant="outline"
          className="h-12 w-full rounded-2xl font-semibold text-destructive border-destructive/30 hover:bg-destructive/5"
          onClick={() => nav({ to: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </Button>
      </div>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-3 text-center card-shadow">
      <div className="text-base font-extrabold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function MenuItem({ icon, label, hint, tone }: { icon: React.ReactNode; label: string; hint?: string; tone?: "danger" }) {
  return (
    <button className="flex w-full items-center gap-3 p-4 text-left border-b border-border last:border-b-0 hover:bg-secondary/40 transition">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${tone === "danger" ? "bg-destructive/10 text-destructive" : "bg-secondary text-primary"}`}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-sm truncate">{label}</div>
        {hint && <div className="text-xs text-muted-foreground truncate">{hint}</div>}
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}