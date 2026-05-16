import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/prayer")({
  component: PrayerLayout,
});

function PrayerLayout() {
  return (
    <div className="prayer-layout">
      <Outlet />
    </div>
  );
}
