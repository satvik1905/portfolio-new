import { CollectionCard } from "@/components/articles/CollectionCard";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { collections } from "@/data/content";

/** Collection index (AUDIT.md §3 /collection): heading, then a 2×2 grid of tall cards. */
export default function CollectionIndexPage() {
  return (
    <>
      <header className="flex w-full justify-center overflow-hidden">
        <div className="flex w-full max-w-250 flex-col items-center px-6 pt-25 pb-12.5 tablet:px-8 tablet:py-15 desktop:px-12 desktop:py-20">
          <div className="flex flex-col items-center gap-4 overflow-clip">
            <Eyebrow>ARTICLE COLLECTION</Eyebrow>
            <h1 className="max-w-150 text-center text-h2-sm uppercase tablet:text-display">
              One strong idea beats ten weak ones.
            </h1>
          </div>
        </div>
      </header>
      <section className="flex w-full justify-center overflow-hidden">
        <div className="grid w-full max-w-350 grid-cols-1 gap-x-1.5 gap-y-4 p-4 tablet:grid-cols-2 tablet:p-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>
    </>
  );
}
