import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { PROJECTS } from "@/lib/portfolio-data";
import { EditableGallery } from "@/components/portfolio/EditableGallery";
import { Toolbar } from "@/components/portfolio/Toolbar";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { CommandPalette } from "@/components/portfolio/CommandPalette";

export const Route = createFileRoute("/project/$id")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Richa Ambooken` },
          { name: "description", content: loaderData.project.summary },
          { property: "og:title", content: `${loaderData.project.title} — Case Study` },
          { property: "og:description", content: loaderData.project.summary },
        ]
      : [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl font-medium">Project not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The case study you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>
      </div>
    </div>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const s = project.study;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[color:var(--canvas)]">
      <Sidebar />
      <Toolbar />
      <CommandPalette />

      {/* Sticky Back button */}
      <div className="fixed left-64 top-4 z-40">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur hover:bg-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Portfolio
        </Link>
      </div>

      <main className="ml-60 px-6 py-24 md:px-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl"
        >
          {/* Meta */}
          <div className="mb-4 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-sm bg-primary" />
            Case Study · {project.tag}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
            {project.summary}
          </p>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-10 overflow-hidden rounded-2xl border border-border shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${project.color}, color-mix(in srgb, ${project.color} 55%, white))`,
            }}
          >
          <div className="h-[500px] flex items-center justify-center bg-white rounded-xl">
  <img
    src={project.coverImage}
    alt={project.title}
   className={`max-h-full max-w-full ${
  project.id === "placewise" ? "h-full w-full object-cover" : "object-contain"
}`}
  />
</div>
          </motion.div>

          {/* Project Summary panel */}
          <div className="mt-10 grid gap-3 rounded-2xl border border-border bg-card p-6 md:grid-cols-4">
            <Meta k="Role" v={s.role} />
            <Meta k="Timeline" v={s.timeline} />
            <Meta k="Tools" v={s.tools.join(" · ")} />
            <Meta k="Project Type" v={s.projectType} />
          </div>

          {/* Sections */}
          <div className="mt-14 space-y-14">
            <Section n={1} title="Project Overview" body={s.overview} />
            <Section n={2} title="Problem Statement" body={s.problem} />
            <Section n={3} title="Design Process" body={s.process} />
            <Section n={4} title="Solution" body={s.solution} />
            <Section n={5} title="Design Iterations" body={s.iterations} />
          </div>

        {s.gallery && s.gallery.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {s.gallery.map((img, i) => (
      <div key={i}>
        <img
          src={img.src}
          alt={img.caption}
          className="w-full rounded-xl object-contain bg-white p-3"
        />
        <p className="mt-2 text-center text-sm font-medium">{img.caption}</p>
      </div>
    ))}
  </div>
)}
          

          {/* Key Takeaways */}
          <div className="mt-14">
            <Section n={6} title="Key Takeaways" body={s.takeaways} />
          </div>

          {/* Back CTA */}
          <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:-translate-y-0.5 transition-transform"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Portfolio
            </Link>
            <span className="text-xs font-mono text-muted-foreground">Case study · {project.id}</span>
          </div>
        </motion.article>
      </main>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{k}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{v}</div>
    </div>
  );
}

function Section({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="grid gap-4 border-t border-border pt-8 md:grid-cols-[220px_1fr]"
    >
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {String(n).padStart(2, "0")}
        </div>
        <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">{title}</h2>
      </div>
      <p className="text-base leading-relaxed text-foreground/85">{body}</p>
    </motion.section>
  );
}
