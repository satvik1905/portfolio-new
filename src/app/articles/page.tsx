import { ArticleCard } from "@/components/articles/ArticleCard";
import { Ruler } from "@/components/ui/Ruler";
import { articles } from "@/data/content";
import { EDGES } from "@/lib/styles";

/**
 * Blog index (AUDIT.md §3 /articles): the featured article as one wide card,
 * then the rest in a 3 / 2 / 1-column grid. D7: everything renders at once,
 * with no lazy-loading or spinner. The template has no H1 here; this page
 * adds a visually hidden one.
 */
export default function ArticlesPage() {
  const featured = articles.find((article) => article.featured);
  const rest = articles.filter((article) => !article.featured);

  return (
    <div className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
      <div className="relative flex w-full max-w-250 flex-col">
        <Ruler side="left" height={3242.4} />
        <Ruler side="right" height={3242.4} />
        <h1 className="sr-only">Articles</h1>

        {featured && (
          <div className="flex p-1.5">
            <ArticleCard article={featured} className="flex-1" />
          </div>
        )}
        <div className="grid grid-cols-1 gap-x-1.5 gap-y-4 px-1.5 pt-6 pb-12 tablet:grid-cols-2 desktop:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
