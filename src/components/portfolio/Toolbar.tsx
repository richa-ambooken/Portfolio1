import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crop, Type, Palette, RotateCw, MousePointer2, Search } from "lucide-react";
import { usePortfolio, PALETTES, FONT_LABEL, type PaletteId, type FontChoice } from "@/lib/portfolio-context";

function Popover({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded-xl border border-border bg-popover p-2 shadow-2xl"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToolBtn({
  active, onClick, title, children,
}: { active?: boolean; onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}

export function Toolbar() {
  const p = usePortfolio();
  const [open, setOpen] = useState<null | "font" | "color">(null);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 24 }}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-card/95 p-1.5 shadow-xl backdrop-blur">
        <ToolBtn title="Zoom to section" onClick={() => p.triggerZoom()}>
          <Crop className="h-4 w-4" />
        </ToolBtn>

        <div className="relative">
          <ToolBtn active={open === "font"} title="Name font" onClick={() => setOpen(open === "font" ? null : "font")}>
            <Type className="h-4 w-4" />
          </ToolBtn>
          <Popover open={open === "font"}>
            <div className="w-56">
              {(Object.keys(FONT_LABEL) as FontChoice[]).map((f) => (
                <button
                  key={f}
                  onClick={() => { p.setFont(f); setOpen(null); }}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-accent ${p.font === f ? "bg-accent" : ""}`}
                >
                  <span
                    className={
                      f === "sans" ? "font-sans" :
                      f === "serif" ? "font-serif italic" :
                      "font-display font-medium tracking-tight"
                    }
                    style={{ fontFamily: f === "serif" ? "var(--font-serif)" : f === "display" ? "var(--font-display)" : "var(--font-sans)" }}
                  >
                    Richa
                  </span>
                  <span className="text-xs text-muted-foreground">{FONT_LABEL[f]}</span>
                </button>
              ))}
            </div>
          </Popover>
        </div>

        <div className="relative">
          <ToolBtn active={open === "color"} title="Palette" onClick={() => setOpen(open === "color" ? null : "color")}>
            <Palette className="h-4 w-4" />
          </ToolBtn>
          <Popover open={open === "color"}>
            <div className="flex gap-2 p-1">
              {(Object.keys(PALETTES) as PaletteId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => { p.setPalette(id); setOpen(null); }}
                  title={PALETTES[id].name}
                  className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${p.palette === id ? "border-foreground" : "border-border"}`}
                  style={{ background: PALETTES[id].swatch }}
                />
              ))}
            </div>
          </Popover>
        </div>

        <ToolBtn active={p.rotated} title="Rotate canvas" onClick={p.toggleRotate}>
          <RotateCw className="h-4 w-4" />
        </ToolBtn>

        <div className="mx-1 h-6 w-px bg-border" />

        <button
          onClick={() => p.setPrototype(!p.prototype)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium hover:bg-accent"
        >
          <span className={`${p.prototype ? "text-muted-foreground" : "text-foreground"}`}>Design</span>
          <span className={`relative h-4 w-7 rounded-full transition-colors ${p.prototype ? "bg-primary" : "bg-muted"}`}>
            <motion.span
              className="absolute top-0.5 h-3 w-3 rounded-full bg-white shadow"
              animate={{ x: p.prototype ? 14 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </span>
          <span className={`flex items-center gap-1 ${p.prototype ? "text-foreground" : "text-muted-foreground"}`}>
            <MousePointer2 className="h-3 w-3" /> Prototype
          </span>
        </button>

        <div className="mx-1 h-6 w-px bg-border" />

        <button
          onClick={() => p.setCmdOpen(true)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent"
        >
          <Search className="h-3.5 w-3.5" />
          <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
        </button>
      </div>
    </motion.div>
  );
}
