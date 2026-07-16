import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/driver/AppHeader";
import { IncomingOrderCard } from "@/components/driver/OrderCard";
import { Switch } from "@/components/ui/switch";
import { driver, incomingOrders, earnings } from "@/lib/mock";
import { IndianRupee, Package, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/dashboard")({ component: Dashboard });

function Dashboard() {
  const [online, setOnline] = useState(true);
  const [orders, setOrders] = useState(incomingOrders);
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <AppHeader
        title={`${greet}, ${driver.firstName}`}
        subtitle={online ? "You're online — accepting orders" : "You're offline"}
        right={
          <img src={driver.photo} alt={driver.name} className="h-11 w-11 rounded-full border-2 border-primary/30 object-cover" />
        }
      />

      <div className="px-5 space-y-5">
        <div className="flex items-center justify-between rounded-3xl bg-card border border-border p-4 card-shadow">
          <div className="flex items-center gap-3 min-w-0">
            <span className={`grid h-10 w-10 place-items-center rounded-full ${online ? "bg-accent/15 text-accent" : "bg-destructive/10 text-destructive"}`}>
              <span className={`h-3 w-3 rounded-full ${online ? "bg-accent pulse-ring" : "bg-destructive"}`} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-bold">{online ? "Online" : "Offline"}</div>
              <div className="text-xs text-muted-foreground truncate">
                {online ? "Ready to receive new orders" : "Toggle to start earning"}
              </div>
            </div>
          </div>
          <Switch checked={online} onCheckedChange={(v) => { setOnline(v); toast(v ? "You're now online" : "You've gone offline"); }} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat icon={<IndianRupee className="h-4 w-4" />} label="Today's earnings" value={`₹${earnings.today}`} tone="primary" />
          <Stat icon={<Package className="h-4 w-4" />} label="Deliveries" value={`${earnings.deliveries}`} tone="accent" />
          <Stat icon={<TrendingUp className="h-4 w-4" />} label="Weekly" value={`₹${earnings.week}`} tone="warning" />
          <Stat icon={<Star className="h-4 w-4" />} label="Rating" value={`${driver.rating}★`} tone="secondary" />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">New delivery requests</h2>
          <Link to="/orders" className="text-xs font-semibold text-primary">View all</Link>
        </div>

        {!online || orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary text-3xl">🛵</div>
            <div className="mt-3 font-semibold">No active requests</div>
            <p className="text-xs text-muted-foreground mt-1">
              {online ? "Sit tight — new orders will appear here." : "Go online to start receiving orders."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <IncomingOrderCard
                key={o.id}
                order={o}
                onAccept={(order) => {
                  toast.success(`Order ${order.id} accepted`);
                  navigate({ to: "/orders/$id", params: { id: order.id } });
                }}
                onReject={(order) => {
                  setOrders((prev) => prev.filter((x) => x.id !== order.id));
                  toast("Order rejected");
                }}
              />
            ))}
          </div>
        )}

        <div className="rounded-3xl gradient-primary text-primary-foreground p-5 soft-shadow">
          <div className="text-xs uppercase tracking-wide opacity-80">Peak hour bonus</div>
          <div className="mt-1 text-lg font-bold">Complete 3 more orders to earn ₹150</div>
          <div className="mt-3 h-2 rounded-full bg-white/25 overflow-hidden">
            <div className="h-full w-2/5 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "primary" | "accent" | "warning" | "secondary" }) {
  const styles: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    warning: "bg-warning/15 text-warning-foreground",
    secondary: "bg-secondary text-secondary-foreground",
  };
  return (
    <div className="rounded-2xl bg-card border border-border p-3.5 card-shadow">
      <div className={`grid h-8 w-8 place-items-center rounded-xl ${styles[tone]}`}>{icon}</div>
      <div className="mt-2 text-lg font-extrabold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}