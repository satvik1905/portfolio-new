import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Ruler } from "@/components/ui/Ruler";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { articlesInCollection, collections, getCollection } from "@/data/content";
import { EDGES } from "@/lib/styles";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

/** Collection pages carry their own meta description (AUDIT.md §1). */
export async function generateMetadata({ params }: PageProps<"/collection/[slug]">): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  return collection ? { description: collection.description } : {};
}

/**
 * Collection detail (AUDIT.md §3 /collection/<slug>): the collection name as
 * H1 and its articles, filtered from the content file (D7).
 */
export default async function CollectionPage({ params }: PageProps<"/collection/[slug]">) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();

  return (
    <section className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
      <div className="relative flex w-full max-w-250 flex-col">
        <Ruler side="left" height={1344} />
        <Ruler side="right" height={1344} />
        <div className="flex flex-col items-center gap-4 overflow-clip px-12 pt-25 pb-12 tablet:py-12">
          <Eyebrow>MARTIN&apos;S BLOG</Eyebrow>
          <h1 className="text-center text-h2-sm uppercase tablet:text-display">{collection.name}</h1>
        </div>
        <div className="grid grid-cols-1 gap-x-1.5 gap-y-4 p-4 tablet:grid-cols-2 tablet:gap-y-1.5 tablet:p-6 desktop:grid-cols-3 desktop:px-0 desktop:pb-12">
          {articlesInCollection(collection.slug).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
