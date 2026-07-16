import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/driver/AppHeader";
import { incomingOrders, history } from "@/lib/mock";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, Star } from "lucide-react";

export const Route = createFileRoute("/_app/orders")({ component: OrdersPage });

function OrdersPage() {
  return (
    <>
      <AppHeader title="Orders" subtitle="Active, incoming and completed" />
      <div className="px-5">
        <Tabs defaultValue="active">
          <TabsList className="w-full rounded-2xl bg-secondary p-1 h-11">
            <TabsTrigger value="active" className="rounded-xl">Active</TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl">History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4 space-y-3">
            {incomingOrders.map((o) => (
              <Link
                key={o.id}
                to="/orders/$id"
                params={{ id: o.id }}
                className="block rounded-2xl bg-card border border-border p-4 card-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">{o.restaurant.name}</div>
                  <div className="text-xs font-semibold text-accent">₹{o.earnings}</div>
                </div>
                <div className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" /> {o.customer.address}
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{o.items} items · {o.estMinutes} min</span>
                  <span className="font-semibold text-primary">Continue →</span>
                </div>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="history" className="mt-4 space-y-3">
            {history.map((h) => (
              <div key={h.id} className="rounded-2xl bg-card border border-border p-4 card-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">{h.restaurant.name}</div>
                    <div className="text-xs text-muted-foreground">{h.id} · {h.completedAt}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">₹{h.earnings}</div>
                    <div className="flex items-center justify-end gap-0.5 text-xs text-warning-foreground">
                      {Array.from({ length: h.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-warning stroke-warning" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}