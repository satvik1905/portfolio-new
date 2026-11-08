import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Ruler } from "@/components/ui/Ruler";
import { caseStudies } from "@/data/content";
import { EDGES, FOCUS_RING } from "@/lib/styles";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ project: project.slug }));
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="font-jetbrains text-mono-strong opacity-50">{label}</dt>
      <dd className="max-w-100 text-h5 uppercase">{value}</dd>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <section className="flex flex-col gap-2.5">
      <h2 className="text-h3-sm uppercase tablet:text-h3">{title}</h2>
      <p className="text-body opacity-60">{body}</p>
    </section>
  );
}

/** Case study (AUDIT.md §3 /modern-muse, /arctic-calm, /clay-momentum). */
export default async function CaseStudyPage({ params }: PageProps<"/[project]">) {
  const { project: slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <div className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
      <article className="relative flex w-full max-w-300 flex-col p-2.5 tablet:pt-0 desktop:p-0">
        <Ruler side="left" height={4301.9} />
        <Ruler side="right" height={4301.9} />

        <div className="relative flex h-125 items-center justify-center overflow-clip tablet:h-160 desktop:h-175">
          <MediaPlaceholder {...project.heroImage} tone="dark" showLabel className="absolute inset-0 size-full" />
          <h1 className="relative z-2 text-center text-h2-sm text-ink-inverse uppercase tablet:text-h2">{project.title}</h1>
        </div>

        <div className="flex flex-col gap-16 overflow-clip bg-surface-alt px-4 py-12 tablet:gap-20 tablet:p-12">
          <header className="flex flex-col gap-1.5">
            <nav aria-label="Breadcrumb" className="flex gap-2.5 font-mono text-label font-bold uppercase opacity-50">
              <Link href="/projects" className={FOCUS_RING}>
                WORK DONE
              </Link>
              <span aria-hidden="true">{"//"}</span>
              <span>{project.title}</span>
            </nav>
            <p className="text-h3-sm uppercase tablet:text-h3">{project.tagline}</p>
          </header>

          <dl className="grid grid-cols-1 gap-x-2.5 tablet:grid-cols-2 gap-y-8">
            <Meta label="ROLE IN PROJECT:" value={project.role} />
            <Meta label="PROJECT YEAR:" value={project.year} />
            <Meta label="DURATION:" value={project.duration} />
            <Meta label="WORK DONE:" value={project.workDone} />
          </dl>

          <Block title="the problem" body={project.problem} />

          <div className="flex flex-col gap-2.5">
            {project.gallery.map((image) => (
              <MediaPlaceholder key={image.name} {...image} showLabel className="h-75 w-full tablet:aspect-[1104/600] tablet:h-auto" />
            ))}
          </div>

          <Block title="the solution" body={project.solution} />
        </div>
      </article>
    </div>
  );
}
