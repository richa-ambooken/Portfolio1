import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SectionId = "home" | "work" | "experience" | "toolkit" | "contact";
export type FontChoice = "sans" | "serif" | "display";
export type PaletteId = "lavender" | "butter" | "sky" | "charcoal";

export const PALETTES: Record<PaletteId, { name: string; primary: string; ring: string; accent: string; swatch: string }> = {
  lavender: { name: "Lavender", primary: "oklch(0.72 0.14 300)", ring: "oklch(0.72 0.14 300)", accent: "oklch(0.94 0.03 300)", swatch: "#B8A6E8" },
  butter:   { name: "Butter",   primary: "oklch(0.82 0.15 90)",  ring: "oklch(0.82 0.15 90)",  accent: "oklch(0.96 0.05 90)",  swatch: "#F3D97A" },
  sky:      { name: "Sky",      primary: "oklch(0.72 0.14 235)", ring: "oklch(0.72 0.14 235)", accent: "oklch(0.94 0.03 235)", swatch: "#7CC0F0" },
  charcoal: { name: "Charcoal", primary: "oklch(0.28 0.02 260)", ring: "oklch(0.28 0.02 260)", accent: "oklch(0.93 0.005 260)",swatch: "#2A2A2E" },
};

export const FONT_LABEL: Record<FontChoice, string> = {
  sans: "Modern Sans",
  serif: "Elegant Serif",
  display: "Creative Display",
};

type Ctx = {
  section: SectionId;
  setSection: (s: SectionId) => void;
  font: FontChoice;
  setFont: (f: FontChoice) => void;
  palette: PaletteId;
  setPalette: (p: PaletteId) => void;
  rotated: boolean;
  toggleRotate: () => void;
  prototype: boolean;
  setPrototype: (b: boolean) => void;
  zoomKey: number;
  triggerZoom: () => void;
  cmdOpen: boolean;
  setCmdOpen: (b: boolean) => void;
  openProject: string | null;
  setOpenProject: (id: string | null) => void;
};

const PortfolioCtx = createContext<Ctx | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [section, setSection] = useState<SectionId>("home");
  const [font, setFont] = useState<FontChoice>("display");
  const [palette, setPalette] = useState<PaletteId>("lavender");
  const [rotated, setRotated] = useState(false);
  const [prototype, setPrototype] = useState(false);
  const [zoomKey, setZoomKey] = useState(0);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [openProject, setOpenProject] = useState<string | null>(null);

  useEffect(() => {
    const p = PALETTES[palette];
    const root = document.documentElement;
    root.style.setProperty("--primary", p.primary);
    root.style.setProperty("--ring", p.ring);
    root.style.setProperty("--accent", p.accent);
  }, [palette]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
        setOpenProject(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<Ctx>(() => ({
    section, setSection,
    font, setFont,
    palette, setPalette,
    rotated, toggleRotate: () => setRotated((r) => !r),
    prototype, setPrototype,
    zoomKey, triggerZoom: () => setZoomKey((k) => k + 1),
    cmdOpen, setCmdOpen,
    openProject, setOpenProject,
  }), [section, font, palette, rotated, prototype, zoomKey, cmdOpen, openProject]);

  return <PortfolioCtx.Provider value={value}>{children}</PortfolioCtx.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioCtx);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}
