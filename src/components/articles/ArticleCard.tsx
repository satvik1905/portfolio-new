import Link from "next/link";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { type Article, getCollection } from "@/data/content";
import { FOCUS_RING } from "@/lib/styles";

/**
 * Article card (AUDIT.md §3, §9.4): image link with a white "READ ARTICLE"
 * strip that slides up into its bottom edge on hover, then a category link
 * (the collection), title and date.
 */
export function ArticleCard({ article, className = "" }: { article: Article; className?: string }) {
  const collection = getCollection(article.collection);

  return (
    <article className={`flex flex-col gap-1 ${className}`}>
      <Link
        href={`/articles/${article.slug}`}
        aria-label={article.title}
        className={`group relative flex h-[454.8px] flex-col overflow-clip ${FOCUS_RING}`}
      >
        <MediaPlaceholder {...article.heroImage} showLabel className="absolute inset-0 size-full" />
        <span className="absolute top-full right-0 z-1 flex w-full justify-end bg-white p-1 text-button uppercase transition-transform duration-400 ease-snap group-hover:-translate-y-7.5">
          read article
        </span>
      </Link>
      <div className="flex flex-col gap-1 p-1">
        {collection && (
          <Link
            href={`/collection/${collection.slug}`}
            className={`self-start font-mono text-label font-bold text-accent uppercase ${FOCUS_RING}`}
          >
            {collection.name}
          </Link>
        )}
        <h3 className="text-h5 uppercase">{article.title}</h3>
        <p className="font-mono text-label font-bold uppercase opacity-50">{article.date}</p>
      </div>
    </article>
  );
}
