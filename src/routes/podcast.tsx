import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/podcast")({
  component: PodcastLayout,
});

function PodcastLayout() {
  return (
    <div className="podcast-layout">
      <Outlet />
    </div>
  );
}
