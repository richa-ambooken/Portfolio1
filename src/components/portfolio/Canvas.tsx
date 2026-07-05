import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Github, Linkedin, Mail, ExternalLink,
  Figma as FigmaIcon, PenTool, Frame, Palette as PaletteIcon, Image as ImageIcon, Brush,
  LayoutTemplate, MousePointer2, Users, GitBranch, Network, Component,
  Smartphone, Accessibility as A11yIcon, MousePointerClick, Eye,
  Code, Code2, Braces, SquareTerminal,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePortfolio, type FontChoice } from "@/lib/portfolio-context";
import { PROJECTS, EXPERIENCE, TOOLKIT, type ToolItem } from "@/lib/portfolio-data";

const fontFamily: Record<FontChoice, string> = {
  sans: "var(--font-sans)",
  serif: "var(--font-serif)",
  display: "var(--font-display)",
};

function FrameHeader({ label, w, h }: { label: string; w: string; h: string }) {
  const { prototype } = usePortfolio();
  return (
    <div className="mb-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
      <span className={`flex items-center gap-1.5 ${prototype ? "text-[color:var(--figma-blue)]" : ""}`}>
        <span className={`h-1.5 w-1.5 rounded-sm ${prototype ? "bg-[color:var(--figma-blue)]" : "bg-muted-foreground/40"}`} />
        {label}
      </span>
      <span>{w} × {h}</span>
    </div>
  );
}

function Home() {
  const { font, setSection, triggerZoom, prototype } = usePortfolio();
  return (
    <section id="frame-home" className="relative">
      <FrameHeader label="Home" w="1440" h="900" />
      <div className={`rounded-2xl border border-border bg-card p-10 md:p-16 shadow-sm ${prototype ? "figma-frame" : ""}`}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-green-500" /> Available for opportunities · 2025
        </div>
        <p className="text-lg text-muted-foreground">Hello, I'm</p>
        <h1 className="mt-2 leading-[0.95] tracking-tight">
          <AnimatePresence mode="wait">
            <motion.span
              key={font}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.4 }}
              className="block text-foreground text-6xl md:text-8xl"
              style={{
                fontFamily: fontFamily[font],
                fontStyle: font === "serif" ? "italic" : "normal",
                fontWeight: font === "display" ? 500 : 400,
                letterSpacing: "-0.02em",
              }}
            >
              Richa Ambooken
            </motion.span>
          </AnimatePresence>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          Aspiring Product Designer & UI/UX Designer
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
          I design intuitive digital experiences, thoughtful brand identities, and user-centered
          interfaces that solve real-world problems.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => { setSection("work"); triggerZoom(); }}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => { setSection("contact"); triggerZoom(); }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent"
          >
            <Mail className="h-4 w-4" /> Contact Me
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "6", v: "Case studies" },
            { k: "20+", v: "Tools & skills" },
            { k: "2", v: "Internships" },
            { k: "∞", v: "Iterations" },
          ].map((s) => (
            <div key={s.v} className="rounded-xl border border-border bg-background/60 p-4">
              <div className="text-3xl font-display font-medium">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const { prototype } = usePortfolio();
  return (
    <section id="frame-work" className="relative">
      <FrameHeader label="Work" w="1440" h="1600" />
      <div className={`rounded-2xl border border-border bg-card p-8 md:p-10 shadow-sm ${prototype ? "figma-frame" : ""}`}>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight">Selected Work</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Case studies across packaging, product, branding and editorial.
            </p>
          </div>
          <span className="hidden md:inline text-xs font-mono text-muted-foreground">{PROJECTS.length} projects</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to="/project/$id"
                params={{ id: p.id }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background text-left shadow-sm hover:shadow-lg ${prototype ? "hover:outline hover:outline-2 hover:outline-[color:var(--figma-blue)]" : ""}`}
              >
                <div
                  className="relative flex h-56 w-full items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${p.color}, color-mix(in srgb, ${p.color} 55%, white))` }}
                >
                 <img
  src={p.coverImage}
  alt={p.title}
  className="h-full w-full object-contain bg-white"
/>
                  <div className="absolute left-3 top-3 rounded-md bg-white/70 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-foreground/70 backdrop-blur">
                    {p.tag}
                  </div>
                  {prototype && (
                    <div className="absolute right-3 top-3 rounded-full bg-[color:var(--figma-blue)] px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-white">
                      Hotspot
                    </div>
                  )}
                </div>
                <div className="flex flex-1 items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-display text-lg font-medium">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const { prototype } = usePortfolio();
  return (
    <section id="frame-experience" className="relative">
      <FrameHeader label="Experience" w="1440" h="700" />
      <div className={`rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm ${prototype ? "figma-frame" : ""}`}>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight">Experience</h2>
        <p className="mt-2 text-sm text-muted-foreground">A short timeline of design work in the wild.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-background p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-display text-lg font-medium text-primary">
                  {e.mark}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-medium">{e.company}</h3>
                  <p className="text-sm text-muted-foreground">{e.role}</p>
                </div>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-mono text-muted-foreground">
                  {e.duration}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{e.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ICONS: Record<ToolItem["icon"], React.ComponentType<{ className?: string }>> = {
  figma: FigmaIcon, figjam: PenTool, framer: Frame, canva: PaletteIcon,
  photoshop: ImageIcon, illustrator: Brush,
  wireframe: LayoutTemplate, prototype: MousePointer2, research: Users,
  flows: GitBranch, ia: Network, system: Component,
  responsive: Smartphone, a11y: A11yIcon, interaction: MousePointerClick, visual: Eye,
  html: Code, css: Code2, js: Braces, vscode: SquareTerminal,
};

function Toolkit() {
  const { prototype } = usePortfolio();
  const groups = ["Design Tools", "UX Skills", "Code"] as const;
  return (
    <section id="frame-toolkit" className="relative">
      <FrameHeader label="Toolkit" w="1440" h="1000" />
      <div className={`rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm ${prototype ? "figma-frame" : ""}`}>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight">Toolkit</h2>
        <p className="mt-2 text-sm text-muted-foreground">The tools, skills and languages I use to ship design.</p>

        {groups.map((g) => {
          const list = TOOLKIT.filter((t) => t.group === g);
          return (
            <div key={g} className="mt-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{g}</div>
                <div className="h-px flex-1 bg-border" />
                <div className="text-[11px] font-mono text-muted-foreground">{list.length}</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {list.map((t, i) => {
                  const Icon = ICONS[t.icon];
                  return (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -3 }}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-background p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
                        style={{ background: t.hue }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{t.name}</div>
                        <div className="text-[11px] font-mono text-muted-foreground">{g}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  const { prototype } = usePortfolio();
  const links = [
    { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
    { label: "GitHub",   href: "https://github.com",   Icon: Github },
    { label: "Email",    href: "mailto:richa@example.com", Icon: Mail },
  ];
  return (
    <section id="frame-contact" className="relative">
      <FrameHeader label="Contact" w="1440" h="500" />
      <div className={`rounded-2xl border border-border bg-card p-8 md:p-16 shadow-sm ${prototype ? "figma-frame" : ""}`}>
        <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight">
          Let's build something<br />
          <span className="text-primary">worth using.</span>
        </h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Available for internships, freelance projects, and long conversations about interface details.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm hover:border-primary hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                {label}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Canvas() {
  const { section, rotated, zoomKey, prototype } = usePortfolio();

  return (
    <motion.div
      animate={{ rotate: rotated ? 8 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={`ml-60 min-h-screen px-6 py-24 md:px-12 ${prototype ? "proto-cursor" : ""}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${section}-${zoomKey}`}
          initial={{ opacity: 0, scale: 0.82, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
          transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.9 }}
          className="mx-auto max-w-5xl"
        >
          {section === "home" && <Home />}
          {section === "work" && <Work />}
          {section === "experience" && <Experience />}
          {section === "toolkit" && <Toolkit />}
          {section === "contact" && <Contact />}
        </motion.div>
      </AnimatePresence>

      {prototype && <PrototypeLines />}
    </motion.div>
  );
}

function PrototypeLines() {
  return (
    <svg className="pointer-events-none fixed inset-0 z-10 h-full w-full" aria-hidden>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--figma-blue)" />
        </marker>
      </defs>
      <path
        d="M 240 120 C 400 120, 400 380, 560 380"
        stroke="var(--figma-blue)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.5"
        markerEnd="url(#arr)"
      />
    </svg>
  );
}
