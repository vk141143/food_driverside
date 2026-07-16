import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/driver/AppHeader";
import { Button } from "@/components/ui/button";
import { incomingOrders } from "@/lib/mock";
import {
  Store, User2, Navigation, Phone, MessageCircle, MapPin, IndianRupee,
  CheckCircle2, ShieldAlert, QrCode, Clock, AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/orders/$id")({ component: OrderDetail });

type Phase = "navigate_pickup" | "at_pickup" | "navigate_customer" | "at_customer" | "done";

function OrderDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const order = incomingOrders.find((o) => o.id === id) ?? incomingOrders[0];
  const [phase, setPhase] = useState<Phase>("navigate_pickup");
  const [pickupCode, setPickupCode] = useState("");
  const [deliveryCode, setDeliveryCode] = useState("");

  function goto(p: Phase) { setPhase(p); }

  return (
    <>
      <AppHeader
        title={`Order ${order.id}`}
        subtitle={order.paymentMethod + " · " + order.items + " items"}
        back
      />

      <div className="px-5 space-y-4">
        <PhaseStepper phase={phase} />

        <div className="rounded-3xl bg-card border border-border card-shadow overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-primary/15 to-accent/15 relative grid place-items-center">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]" />
            <div className="text-center">
              <Navigation className="mx-auto h-8 w-8 text-primary" />
              <div className="mt-1 text-sm font-semibold">Live map preview</div>
              <div className="text-xs text-muted-foreground">GPS integration ready</div>
            </div>
          </div>
          <div className="p-4 grid grid-cols-3 gap-3 text-center">
            <MiniMeta icon={<Clock className="h-4 w-4" />} label="ETA" value={`${order.estMinutes}m`} />
            <MiniMeta icon={<MapPin className="h-4 w-4" />} label="Distance" value={`${(order.restaurant.distanceKm + order.customer.distanceKm).toFixed(1)} km`} />
            <MiniMeta icon={<IndianRupee className="h-4 w-4" />} label="Earnings" value={`₹${order.earnings}`} />
          </div>
        </div>

        {(phase === "navigate_pickup" || phase === "at_pickup") && (
          <PartyCard
            role="Pickup"
            icon={<Store className="h-5 w-5" />}
            name={order.restaurant.name}
            address={order.restaurant.address}
            distance={order.restaurant.distanceKm}
          />
        )}
        {(phase === "navigate_customer" || phase === "at_customer") && (
          <PartyCard
            role="Deliver to"
            icon={<User2 className="h-5 w-5" />}
            name={order.customer.name}
            address={order.customer.address}
            distance={order.customer.distanceKm}
          />
        )}

        {phase === "navigate_pickup" && (
          <ActionBlock>
            <Button className="h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold soft-shadow"
              onClick={() => toast("Opening maps…")}>
              <Navigation className="mr-2 h-4 w-4" /> Navigate to restaurant
            </Button>
            <Button variant="outline" className="h-12 rounded-2xl font-semibold" onClick={() => goto("at_pickup")}>
              I've arrived at pickup
            </Button>
          </ActionBlock>
        )}

        {phase === "at_pickup" && (
          <div className="rounded-3xl bg-card border border-border p-5 card-shadow space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">Pickup OTP</div>
              <div className="text-sm text-muted-foreground">Ask the restaurant for the 4-digit code.</div>
            </div>
            <input
              value={pickupCode}
              onChange={(e) => setPickupCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="w-full h-14 text-center text-2xl tracking-[0.5em] font-bold rounded-2xl border border-border bg-background focus:border-primary focus:outline-none"
              placeholder="••••"
              inputMode="numeric"
            />
            <div className="rounded-2xl bg-secondary p-3 text-xs text-muted-foreground">
              Demo OTP: <span className="font-bold text-foreground">{order.pickupOtp}</span>
            </div>
            <Button
              className="h-12 w-full rounded-2xl gradient-primary text-primary-foreground font-semibold soft-shadow"
              disabled={pickupCode !== order.pickupOtp}
              onClick={() => { toast.success("Pickup confirmed"); goto("navigate_customer"); }}
            >
              Confirm pickup
            </Button>
          </div>
        )}

        {phase === "navigate_customer" && (
          <>
            <ContactRow phone={order.customer.phone} />
            <ActionBlock>
              <Button className="h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold soft-shadow"
                onClick={() => toast("Opening maps…")}>
                <Navigation className="mr-2 h-4 w-4" /> Navigate to customer
              </Button>
              <Button variant="outline" className="h-12 rounded-2xl font-semibold" onClick={() => goto("at_customer")}>
                I've reached the customer
              </Button>
            </ActionBlock>
          </>
        )}

        {phase === "at_customer" && (
          <div className="rounded-3xl bg-card border border-border p-5 card-shadow space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">Delivery OTP</div>
              <div className="text-sm text-muted-foreground">Enter the customer's OTP or scan the QR.</div>
            </div>
            <input
              value={deliveryCode}
              onChange={(e) => setDeliveryCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="w-full h-14 text-center text-2xl tracking-[0.5em] font-bold rounded-2xl border border-border bg-background focus:border-primary focus:outline-none"
              placeholder="••••"
              inputMode="numeric"
            />
            <button className="flex w-full items-center justify-between rounded-2xl border border-dashed border-border p-3 text-sm hover:border-primary">
              <span className="flex items-center gap-2"><QrCode className="h-4 w-4 text-primary" /> Scan QR instead</span>
              <span className="text-xs text-muted-foreground">Camera</span>
            </button>
            <div className="rounded-2xl bg-secondary p-3 text-xs text-muted-foreground">
              Demo OTP: <span className="font-bold text-foreground">{order.deliveryOtp}</span>
            </div>
            <Button
              className="h-12 w-full rounded-2xl gradient-primary text-primary-foreground font-semibold soft-shadow"
              disabled={deliveryCode !== order.deliveryOtp}
              onClick={() => { toast.success("Delivery complete · ₹" + order.earnings + " added"); goto("done"); }}
            >
              Confirm delivery
            </Button>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button className="flex items-center justify-center gap-1 rounded-xl border border-border p-2 text-muted-foreground">
                <ShieldAlert className="h-3.5 w-3.5" /> Customer not available
              </button>
              <button className="flex items-center justify-center gap-1 rounded-xl border border-border p-2 text-muted-foreground">
                <AlertTriangle className="h-3.5 w-3.5" /> Wrong address
              </button>
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="rounded-3xl bg-card border border-border p-8 text-center card-shadow animate-slide-up">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent/15 text-accent">
              <CheckCircle2 className="h-12 w-12" strokeWidth={2.5} />
            </div>
            <h2 className="mt-4 text-xl font-extrabold">Delivered!</h2>
            <p className="text-sm text-muted-foreground mt-1">₹{order.earnings} added to today's earnings.</p>
            <Button
              className="mt-6 h-12 w-full rounded-2xl gradient-primary text-primary-foreground font-semibold"
              onClick={() => navigate({ to: "/dashboard" })}
            >
              Back to dashboard
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function PhaseStepper({ phase }: { phase: Phase }) {
  const order: Phase[] = ["navigate_pickup", "at_pickup", "navigate_customer", "at_customer", "done"];
  const step = order.indexOf(phase);
  const labels = ["To pickup", "Pickup", "To customer", "Deliver", "Done"];
  return (
    <div className="flex items-center gap-1.5">
      {labels.map((l, i) => (
        <div key={l} className="flex-1">
          <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />
          <div className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wide ${i === step ? "text-primary" : "text-muted-foreground"}`}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function MiniMeta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-secondary text-primary">{icon}</div>
      <div className="mt-1.5 text-sm font-bold">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}

function PartyCard({ role, icon, name, address, distance }: { role: string; icon: React.ReactNode; name: string; address: string; distance: number }) {
  return (
    <div className="rounded-3xl bg-card border border-border p-4 card-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{role}</span>
        <span className="text-xs font-semibold">{distance} km</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">{icon}</div>
        <div className="min-w-0">
          <div className="truncate font-bold">{name}</div>
          <div className="truncate text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {address}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ phone }: { phone: string }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <a href={`tel:${phone}`} className="rounded-2xl bg-card border border-border p-3 text-center card-shadow">
        <Phone className="mx-auto h-4 w-4 text-primary" />
        <div className="mt-1 text-xs font-semibold">Call</div>
      </a>
      <a href={`sms:${phone}`} className="rounded-2xl bg-card border border-border p-3 text-center card-shadow">
        <MessageCircle className="mx-auto h-4 w-4 text-primary" />
        <div className="mt-1 text-xs font-semibold">Message</div>
      </a>
      <a href={`https://wa.me/${phone.replace(/\D/g, "")}`} className="rounded-2xl bg-card border border-border p-3 text-center card-shadow">
        <MessageCircle className="mx-auto h-4 w-4 text-accent" />
        <div className="mt-1 text-xs font-semibold">WhatsApp</div>
      </a>
    </div>
  );
}

function ActionBlock({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3">{children}</div>;
}