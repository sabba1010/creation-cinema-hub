import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutLayout,
});

function AboutLayout() {
  return (
    <div className="about-layout">
      <Outlet />
    </div>
  );
}
