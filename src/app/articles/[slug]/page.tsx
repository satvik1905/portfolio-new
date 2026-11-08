import { notFound } from "next/navigation";
import { SeriesTicker } from "@/components/articles/SeriesTicker";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Ruler } from "@/components/ui/Ruler";
import { articles, articlesInCollection, getCollection } from "@/data/content";
import { EDGES } from "@/lib/styles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

/** Article detail (AUDIT.md §3 /articles/<slug>). */
export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const collection = getCollection(article.collection);
  const related = articlesInCollection(article.collection).filter((item) => item.slug !== slug);

  return (
    <>
      <article className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
        <div className="relative flex w-full max-w-250 flex-col gap-8 px-4 py-12 tablet:px-12">
          <Ruler side="left" height={1297} />
          <Ruler side="right" height={1297} />

          <header className="flex flex-col gap-2 overflow-clip pt-25 tablet:pt-0">
            <p className="font-jetbrains text-eyebrow opacity-50">{collection?.name.toUpperCase()}</p>
            <h1 className="text-h2-sm uppercase tablet:text-h2">{article.title}</h1>
            <p className="flex gap-1 font-mono text-label font-medium text-accent uppercase opacity-80">
              <span>PUBLISHED ON:</span>
              <span>{article.date}</span>
            </p>
          </header>

          <MediaPlaceholder {...article.heroImage} showLabel className="h-87.5 w-full tablet:h-[471.2px]" />

          <div className="flex flex-col gap-5 text-lead tracking-[-0.03em] opacity-60">
            {article.body.map((paragraph, i) => (
              <p key={i}>
                {paragraph.map((run, j) => (typeof run === "string" ? run : <em key={j}>{run.em}</em>))}
              </p>
            ))}
          </div>
        </div>
      </article>
      <SeriesTicker articles={related} />
    </>
  );
}
