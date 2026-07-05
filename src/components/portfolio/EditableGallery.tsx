import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Upload, Copy, Trash2, GripVertical, X, ChevronLeft, ChevronRight, Plus, ImagePlus,
} from "lucide-react";

export type GalleryItem = { id: string; label: string; url?: string };

function makeItems(labels: string[], color: string): GalleryItem[] {
  return labels.map((label, i) => ({ id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`, label }));
}

export function EditableGallery({
  initialLabels,
  accent,
}: {
  initialLabels: string[];
  accent: string;
}) {
  const [items, setItems] = useState<GalleryItem[]>(() => makeItems(initialLabels, accent));
  const [dragId, setDragId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      items.forEach((it) => it.url?.startsWith("blob:") && URL.revokeObjectURL(it.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (id: string, patch: Partial<GalleryItem>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const remove = (id: string) =>
    setItems((prev) => {
      const gone = prev.find((it) => it.id === id);
      if (gone?.url?.startsWith("blob:")) URL.revokeObjectURL(gone.url);
      return prev.filter((it) => it.id !== id);
    });

  const duplicate = (id: string) =>
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      if (idx < 0) return prev;
      const src = prev[idx];
      const copy: GalleryItem = {
        ...src,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        label: `${src.label} (copy)`,
      };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });

  const add = () =>
    setItems((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, label: "New Image" },
    ]);

  const onFile = (id: string, file?: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const prev = items.find((it) => it.id === id);
    if (prev?.url?.startsWith("blob:")) URL.revokeObjectURL(prev.url);
    update(id, { url });
  };

  const onDragStart = (id: string) => setDragId(id);
  const onDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    if (!dragId || dragId === overId) return;
    setItems((prev) => {
      const from = prev.findIndex((it) => it.id === dragId);
      const to = prev.findIndex((it) => it.id === overId);
      if (from < 0 || to < 0) return prev;
      const next = [...prev];
      const [m] = next.splice(from, 1);
      next.splice(to, 0, m);
      return next;
    });
  };

  const onCardDrop = (e: React.DragEvent, id: string) => {
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      e.preventDefault();
      onFile(id, file);
    }
    setDragId(null);
  };

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const nextLb = () => setLightbox((v) => (v === null ? v : (v + 1) % items.length));
  const prevLb = () => setLightbox((v) => (v === null ? v : (v - 1 + items.length) % items.length));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLb();
      if (e.key === "ArrowLeft") prevLb();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            Design Journey Gallery
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag to reorder · drop an image on a card to replace · rename any label.
          </p>
        </div>
        <button
          onClick={add}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
        >
          <Plus className="h-3.5 w-3.5" /> Add placeholder
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((it, idx) => (
          <motion.div
            layout
            key={it.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            draggable
            onDragStart={() => onDragStart(it.id)}
            onDragOver={(e) => onDragOver(e, it.id)}
            onDrop={(e) => onCardDrop(e, it.id)}
            onDragEnd={() => setDragId(null)}
            className={`group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md ${
              dragId === it.id ? "opacity-60" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => openLightbox(idx)}
              className="relative block w-full"
              style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 55%, white))` }}
            >
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden">
                {it.url ? (
                  <img
                    src={it.url}
                    alt={it.label}
                    className="max-h-full max-w-full object-contain"
                    draggable={false}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-foreground/50">
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-xs font-mono uppercase tracking-widest">Drop or upload image</span>
                  </div>
                )}
              </div>
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-foreground/70 backdrop-blur">
                <GripVertical className="h-3 w-3" /> Drag
              </span>
            </button>

            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={it.label}
                onChange={(e) => update(it.id, { label: e.target.value })}
                className="min-w-0 flex-1 rounded-md bg-transparent px-2 py-1 text-sm font-medium outline-none focus:bg-accent"
              />
              <input
                ref={(el) => { fileInputs.current[it.id] = el; }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(it.id, e.target.files?.[0])}
              />
              <button
                title="Upload image"
                onClick={() => fileInputs.current[it.id]?.click()}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Upload className="h-4 w-4" />
              </button>
              <button
                title="Duplicate"
                onClick={() => duplicate(it.id)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                title="Remove"
                onClick={() => remove(it.id)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prevLb(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextLb(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
            <motion.div
              key={items[lightbox].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card"
            >
              <div
                className="flex flex-1 items-center justify-center p-6"
                style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 55%, white))` }}
              >
                {items[lightbox].url ? (
                  <img
                    src={items[lightbox].url}
                    alt={items[lightbox].label}
                    className="max-h-[70vh] max-w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 py-24 text-foreground/60">
                    <ImagePlus className="h-10 w-10" />
                    <span className="text-sm">No image uploaded yet</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-border px-6 py-3 text-sm">
                <span className="font-medium">{items[lightbox].label}</span>
                <span className="text-xs font-mono text-muted-foreground">
                  {lightbox + 1} / {items.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
