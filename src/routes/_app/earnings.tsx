import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/driver/AppHeader";
import { earnings } from "@/lib/mock";
import { IndianRupee, TrendingUp, Wallet, Gift, ArrowUpRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/earnings")({ component: EarningsPage });

function EarningsPage() {
  const max = Math.max(...earnings.chart);
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <>
      <AppHeader title="Earnings" subtitle="Track today, weekly and monthly" />
      <div className="px-5 space-y-5">
        <div className="rounded-3xl gradient-primary text-primary-foreground p-5 soft-shadow">
          <div className="text-xs uppercase tracking-wide opacity-80">Today</div>
          <div className="mt-1 flex items-baseline gap-1">
            <IndianRupee className="h-6 w-6" strokeWidth={2.5} />
            <span className="text-4xl font-extrabold">{earnings.today}</span>
          </div>
          <div className="mt-1 text-xs opacity-80">{earnings.deliveries} deliveries · avg ₹{earnings.avgPerOrder}</div>

          <div className="mt-5 flex items-end justify-between gap-1.5 h-24">
            {earnings.chart.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-white/80"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <div className="text-[10px] opacity-80">{days[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Small label="Week" value={`₹${earnings.week}`} icon={<TrendingUp className="h-4 w-4" />} />
          <Small label="Month" value={`₹${earnings.month}`} icon={<TrendingUp className="h-4 w-4" />} />
          <Small label="Pending" value={`₹${earnings.pending}`} icon={<Wallet className="h-4 w-4" />} />
        </div>

        <div className="rounded-3xl bg-card border border-border p-5 card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Wallet balance</div>
              <div className="mt-1 text-2xl font-extrabold">₹{earnings.pending}</div>
            </div>
            <Button className="h-11 rounded-2xl gradient-primary text-primary-foreground font-semibold" onClick={() => toast.success("Withdrawal requested")}>
              <ArrowUpRight className="mr-1 h-4 w-4" /> Withdraw
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-secondary p-3">
            <Building2 className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <div className="font-semibold">HDFC Bank ••••4212</div>
              <div className="text-xs text-muted-foreground">Primary payout account</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border p-5 card-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Bonuses & tips</h3>
            <Gift className="h-4 w-4 text-warning-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Row label="Peak hour bonus" value={`₹${earnings.bonus}`} />
            <Row label="Customer tips" value={`₹${earnings.tips}`} />
          </div>
        </div>
      </div>
    </>
  );
}

function Small({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-3 card-shadow">
      <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <div className="mt-2 text-sm font-extrabold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-lg font-extrabold">{value}</div>
    </div>
  );
}