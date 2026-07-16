import type { DriverOrder } from "@/lib/mock";
import { MapPin, Store, User2, Clock, IndianRupee, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function IncomingOrderCard({
  order,
  onAccept,
  onReject,
}: {
  order: DriverOrder;
  onAccept: (o: DriverOrder) => void;
  onReject: (o: DriverOrder) => void;
}) {
  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <div className="animate-slide-up rounded-3xl bg-card p-4 card-shadow border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="grid h-2.5 w-2.5 place-items-center rounded-full bg-accent pulse-ring" />
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">New request</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
          <Clock className="h-3.5 w-3.5" />
          {seconds}s
        </div>
      </div>

      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="text-3xl font-extrabold flex items-center">
            <IndianRupee className="h-6 w-6" strokeWidth={2.5} />
            {order.earnings}
          </div>
          <div className="text-xs text-muted-foreground">est. earnings · {order.estMinutes} min</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{(order.restaurant.distanceKm + order.customer.distanceKm).toFixed(1)} km</div>
          <div className="text-xs text-muted-foreground">total trip</div>
        </div>
      </div>

      <div className="space-y-3">
        <Row icon={<Store className="h-4 w-4 text-primary" />} title={order.restaurant.name} subtitle={order.restaurant.address} distance={`${order.restaurant.distanceKm} km`} />
        <div className="ml-4 h-4 border-l-2 border-dashed border-border" />
        <Row icon={<User2 className="h-4 w-4 text-accent" />} title={order.customer.name} subtitle={order.customer.address} distance={`${order.customer.distanceKm} km`} />
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-secondary/60 px-3 py-2 text-xs text-secondary-foreground">
        <span className="flex items-center gap-1"><Package className="h-3.5 w-3.5" /> {order.items} items</span>
        <span>Order ₹{order.orderValue}</span>
        <span>{order.paymentMethod}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12 rounded-2xl font-semibold" onClick={() => onReject(order)}>
          Reject
        </Button>
        <Button className="h-12 rounded-2xl font-semibold gradient-primary text-primary-foreground soft-shadow" onClick={() => onAccept(order)}>
          Accept
        </Button>
      </div>
    </div>
  );
}

function Row({
  icon,
  title,
  subtitle,
  distance,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  distance: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{title}</div>
        <div className="truncate text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3 shrink-0" />
          {subtitle}
        </div>
      </div>
      <div className="shrink-0 text-xs font-semibold text-foreground">{distance}</div>
    </div>
  );
}