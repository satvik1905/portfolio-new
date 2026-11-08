import { ClientLogos } from "@/components/home/ClientLogos";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PageHero } from "@/components/sections/PageHero";
import { Stats } from "@/components/sections/Stats";
import { Ruler } from "@/components/ui/Ruler";
import { caseStudies } from "@/data/content";
import { EDGES } from "@/lib/styles";

/** Work index (AUDIT.md §3 /projects). */
export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="PROJECTS I WORKED ON" lines={["“Everything is designed.", "Few things are designed well.”"]}>
        <ClientLogos />
      </PageHero>

      <section className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
        <div className="relative z-1 flex w-full max-w-300 flex-col items-center">
          <Ruler side="left" height={2239.9} />
          <Ruler side="right" height={2239.9} />
          <div className="flex w-full flex-col gap-5 overflow-clip p-2 tablet:p-6">
            {caseStudies.map((project) => (
              <ProjectCard key={project.slug} project={project} section="light" />
            ))}
          </div>
        </div>
      </section>

      <Stats />
    </>
  );
}
