"use client";

import { motion } from "motion/react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Ruler } from "@/components/ui/Ruler";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { caseStudies } from "@/data/content";

/**
 * Projects H2 icons (AUDIT.md §7.4): no slot, 60px PNGs (40px on phones) in
 * the flex row. D16 em sizes: 60/40 = 1.5em desktop, 40/30 = calc(4em / 3) phone.
 */
function ProjectsIcon({ name }: { name: string }) {
  return (
    <MediaPlaceholder
      name={name}
      exportSize="60×60"
      type="PNG"
      tone="dark"
      className="size-[calc(4em/3)] tablet:size-[1.5em]"
    />
  );
}

/** Home Projects (AUDIT.md §3 home §7): one full-width card above a 2-up row. */
export function ProjectsSection() {
  const [first, ...rest] = caseStudies;

  return (
    <section className="flex w-full justify-center overflow-hidden bg-night">
      <div className="relative z-1 flex w-full max-w-300 flex-col items-center gap-10 bg-black py-12 tablet:gap-20 tablet:py-18">
        <Ruler side="left" tone="black" height={1957.8} />
        <Ruler side="right" tone="black" height={1957.8} />

        {/* Reveal (AUDIT.md §9.3): opacity 0→1, y 20→0, observed ≈0.3–0.8s; exact timing UNKNOWN. */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-center text-center text-h2-sm font-extrabold text-ink-inverse uppercase tablet:text-h2"
        >
          <span className="flex items-center gap-2">
            the
            <ProjectsIcon name="projects-keyboard" />
            projects
          </span>
          <span className="flex items-center gap-2">
            behind the
            <ProjectsIcon name="projects-sticker-apple" />
            pixels
          </span>
        </motion.h2>

        <div className="flex w-full flex-col gap-6 overflow-clip p-2.5 tablet:p-6">
          <ProjectCard project={first} />
          <div className="flex flex-col gap-6 tablet:flex-row">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} className="flex-1" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
