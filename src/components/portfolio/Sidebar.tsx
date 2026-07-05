import { motion } from "framer-motion";
import { Home, Layers, Briefcase, Wrench, Mail, ChevronRight } from "lucide-react";
import { usePortfolio, type SectionId } from "@/lib/portfolio-context";

const items: { id: SectionId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Layers },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "toolkit", label: "Toolkit", icon: Wrench },
  { id: "contact", label: "Contact", icon: Mail },
];

export function Sidebar() {
  const { section, setSection, triggerZoom } = usePortfolio();
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border bg-card/80 backdrop-blur">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-border">
        <div className="h-6 w-6 rounded-md bg-primary" />
        <span className="font-mono text-xs tracking-widest text-muted-foreground">RICHA.FIG</span>
      </div>
      <div className="px-3 pt-4 pb-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        Pages
      </div>
      <nav className="flex-1 px-2">
        {items.map((it) => {
          const active = section === it.id;
          const Icon = it.icon;
          return (
            <button
              key={it.id}
              onClick={() => { setSection(it.id); triggerZoom(); }}
              className="group relative flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-foreground/80 hover:bg-accent"
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-md bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <ChevronRight className={`relative h-3 w-3 shrink-0 transition-transform ${active ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
              <Icon className="relative h-4 w-4 text-muted-foreground" />
              <span className={`relative ${active ? "font-medium text-foreground" : ""}`}>{it.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="border-t border-border px-3 py-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        ⌘K · Command
      </div>
    </aside>
  );
}
