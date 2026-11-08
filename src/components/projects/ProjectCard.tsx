import Link from "next/link";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import type { CaseStudy } from "@/data/content";
import { FOCUS_RING, FOCUS_RING_DARK } from "@/lib/styles";

const HOVER = "duration-400 ease-snap";

/** macOS-style traffic-light dots (AUDIT.md §3 home §7). */
function TrafficLights() {
  return (
    <div aria-hidden="true" className="flex gap-1.75">
      <span className="size-3 rounded-pill border border-pink bg-red" />
      <span className="size-3 rounded-pill border border-line bg-dot-neutral" />
      <span className="size-3 rounded-pill border border-green-border bg-green" />
    </div>
  );
}

/**
 * Project card (AUDIT.md §3, §9.4): one link, 545px tall, fluid width. On
 * hover the tagline row goes 0.2→1, the image scales 1.1×, and a black
 * "VIEW CASE STUDY" tab slides into the top-right corner.
 */
export function ProjectCard({
  project,
  section = "dark",
  className = "",
}: {
  project: CaseStudy;
  /** Background the card sits on; picks the D2 focus-ring colour. */
  section?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={`/${project.slug}`}
      className={`group relative flex min-h-136.25 overflow-clip ${section === "dark" ? FOCUS_RING_DARK : FOCUS_RING} ${className}`}
    >
      <span className={`absolute inset-0 z-1 transition-transform ${HOVER} group-hover:scale-110`}>
        <MediaPlaceholder {...project.heroImage} tone="dark" showLabel className="size-full" />
      </span>
      <span aria-hidden="true" className="absolute inset-0 z-2 bg-night opacity-20" />

      <span className="relative z-3 flex flex-1 flex-col justify-between p-2.5">
        <span className={`flex flex-col gap-2.5 opacity-20 transition-opacity ${HOVER} group-hover:opacity-100`}>
          <TrafficLights />
          <span className="text-h5 text-ink-inverse uppercase">{project.tagline}</span>
        </span>
        <span className="flex flex-col gap-1">
          <h3 className="text-h3 text-ink-inverse uppercase">{project.title}</h3>
          <span className="font-mono text-label font-bold text-ink-inverse uppercase opacity-80">
            {project.discipline}
          </span>
        </span>
      </span>

      <span
        className={`absolute top-0 right-0 z-3 flex min-h-7.5 w-full max-w-75 -translate-y-7.5 items-center justify-end bg-black p-1 text-button text-ink-inverse uppercase transition-transform ${HOVER} group-hover:translate-y-0`}
      >
        view case study
      </span>
    </Link>
  );
}
