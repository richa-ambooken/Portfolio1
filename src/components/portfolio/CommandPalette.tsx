import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CornerDownLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { usePortfolio, type SectionId } from "@/lib/portfolio-context";
import { PROJECTS } from "@/lib/portfolio-data";

type Item = { id: string; label: string; group: string; run: () => void };

export function CommandPalette() {
  const p = usePortfolio();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (p.cmdOpen) { setQ(""); setI(0); setTimeout(() => ref.current?.focus(), 40); }
  }, [p.cmdOpen]);

  const items = useMemo<Item[]>(() => {
    const sections: SectionId[] = ["home", "work", "experience", "toolkit", "contact"];
    const navItems: Item[] = sections.map((s) => ({
      id: `nav-${s}`, group: "Navigate", label: s[0].toUpperCase() + s.slice(1),
      run: () => { p.setSection(s); p.triggerZoom(); p.setCmdOpen(false); },
    }));
    const projItems: Item[] = PROJECTS.map((pr) => ({
      id: `proj-${pr.id}`, group: "Projects", label: pr.title,
      run: () => { p.setCmdOpen(false); navigate({ to: "/project/$id", params: { id: pr.id } }); },
    }));
    const actions: Item[] = [
      { id: "act-rotate", group: "Actions", label: "Rotate canvas", run: () => { p.toggleRotate(); p.setCmdOpen(false); } },
      { id: "act-proto",  group: "Actions", label: p.prototype ? "Switch to Design mode" : "Switch to Prototype mode", run: () => { p.setPrototype(!p.prototype); p.setCmdOpen(false); } },
    ];
    return [...navItems, ...projItems, ...actions];
  }, [p]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => it.label.toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => { setI(0); }, [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(v + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
    if (e.key === "Enter")     { e.preventDefault(); filtered[i]?.run(); }
  };

  const grouped = filtered.reduce<Record<string, Item[]>>((acc, it) => {
    (acc[it.group] ||= []).push(it); return acc;
  }, {});

  return (
    <AnimatePresence>
      {p.cmdOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/40 p-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => p.setCmdOpen(false)}
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={ref}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Jump to a page, project, or action…"
                className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">No matches</div>
              )}
              {Object.entries(grouped).map(([group, list]) => (
                <div key={group} className="mb-2">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{group}</div>
                  {list.map((it) => {
                    const active = filtered[i]?.id === it.id;
                    return (
                      <button
                        key={it.id}
                        onMouseEnter={() => setI(filtered.indexOf(it))}
                        onClick={it.run}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm ${active ? "bg-accent" : ""}`}
                      >
                        <span>{it.label}</span>
                        {active && <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
