import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/driver/BottomNav";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-md">
        <Outlet />
      </div>
      <BottomNav />
      <Toaster position="top-center" richColors />
    </div>
  );
}