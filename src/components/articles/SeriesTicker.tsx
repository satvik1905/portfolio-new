import { ArticleCard } from "@/components/articles/ArticleCard";
import type { Article } from "@/data/content";

/**
 * "Articles in the same series" (AUDIT.md §3 article §3, §9.2). Tablet and
 * up: an infinite marquee of the related cards in 665px groups, ≈30px/s
 * (3 groups = 2013px per 67.1s). Phones: one group, scrolled sideways.
 */
export function SeriesTicker({ articles }: { articles: Article[] }) {
  const group = (hidden: boolean, key: number) => (
    <div key={key} aria-hidden={hidden || undefined} className="grid w-[665px] shrink-0 grid-cols-2 gap-1.5">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );

  return (
    <section className="flex w-full flex-col items-center gap-8 overflow-clip px-4 py-8 tablet:p-8">
      <h2 className="w-full max-w-250 text-h4 font-extrabold uppercase">articles in the same series</h2>
      <div className="w-full overflow-x-auto tablet:hidden">{group(false, 0)}</div>
      <div className="hidden w-full overflow-hidden tablet:flex">
        <div className="flex w-max animate-marquee gap-1.5 pr-1.5 [--marquee-duration:67.1s]">
          {Array.from({ length: 6 }, (_, i) => group(i > 0, i))}
        </div>
      </div>
    </section>
  );
}
