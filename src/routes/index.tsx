import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { Toolbar } from "@/components/portfolio/Toolbar";
import { Canvas } from "@/components/portfolio/Canvas";
import { CommandPalette } from "@/components/portfolio/CommandPalette";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[color:var(--canvas)]">
      <Sidebar />
      <Toolbar />
      <Canvas />
      <CommandPalette />
    </div>
  );
}
