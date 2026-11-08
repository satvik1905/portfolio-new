import { notFound } from "next/navigation";
import { Ruler } from "@/components/ui/Ruler";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { legalPages, type Run } from "@/data/legal";
import { EDGES, FOCUS_RING } from "@/lib/styles";

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

function Runs({ runs }: { runs: Run[] }) {
  return runs.map((run, i) =>
    typeof run === "string" ? (
      run
    ) : "strong" in run ? (
      <strong key={i} className="font-bold">
        {run.strong}
      </strong>
    ) : (
      <a key={i} href={run.href} className={`underline ${FOCUS_RING}`}>
        {run.link}
      </a>
    ),
  );
}

/** Legal pages (AUDIT.md §3 /legal/terms-conditions, /legal/privacy-policy). */
export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = legalPages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <div className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
      <article className="relative flex w-full max-w-300 flex-col gap-25 p-4 tablet:p-12">
        <Ruler side="left" height={2000} />
        <Ruler side="right" height={2000} />
        <header className="flex flex-col items-center gap-4 overflow-clip pt-25 tablet:pt-0">
          <Eyebrow>LEGAL PAGES</Eyebrow>
          <h1 className="max-w-150 text-center text-display uppercase">{page.title}</h1>
          <p className="font-mono text-label font-medium uppercase">{page.date}</p>
        </header>
        <div className="text-lead tracking-[-0.03em]">
          {page.blocks.map((block, i) =>
            block.type === "h" ? (
              <h2 key={i} className="text-h4 font-extrabold uppercase not-first:mt-10">
                {block.text}
              </h2>
            ) : block.type === "p" ? (
              <p key={i} className="mt-5">
                <Runs runs={block.runs} />
              </p>
            ) : (
              <ul key={i} className="list-disc pl-6">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Runs runs={item} />
                  </li>
                ))}
              </ul>
            ),
          )}
        </div>
      </article>
    </div>
  );
}
