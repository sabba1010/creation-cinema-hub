import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/films")({
  component: FilmsLayout,
});

function FilmsLayout() {
  return (
    <div className="films-layout">
      <Outlet />
    </div>
  );
}
