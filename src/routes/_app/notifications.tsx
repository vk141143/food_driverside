import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/driver/AppHeader";
import { notifications } from "@/lib/mock";
import { Package, Gift, CreditCard, Info } from "lucide-react";

export const Route = createFileRoute("/_app/notifications")({ component: NotifPage });

const iconMap = {
  order: { icon: Package, color: "bg-primary/10 text-primary" },
  bonus: { icon: Gift, color: "bg-warning/20 text-warning-foreground" },
  payment: { icon: CreditCard, color: "bg-accent/15 text-accent" },
  system: { icon: Info, color: "bg-secondary text-secondary-foreground" },
} as const;

function NotifPage() {
  return (
    <>
      <AppHeader title="Notifications" subtitle="All updates and alerts" />
      <div className="px-5 space-y-2">
        {notifications.map((n) => {
          const { icon: Icon, color } = iconMap[n.type];
          return (
            <div key={n.id} className="flex items-start gap-3 rounded-2xl bg-card border border-border p-4 card-shadow">
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-sm truncate">{n.title}</div>
                  <div className="text-[11px] text-muted-foreground shrink-0">{n.time}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{n.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}