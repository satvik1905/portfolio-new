import Link from "next/link";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import type { Collection } from "@/data/content";
import { FOCUS_RING } from "@/lib/styles";

/**
 * Collection card (AUDIT.md §3 /collection, §9.4). The whole card keeps the
 * template's 673 / 1015.8 aspect at every width; the image takes what the
 * text row leaves. Hover slides an "OPEN COLLECTION" strip into the image.
 */
export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <article className="flex aspect-[673/1015.8] flex-col gap-1">
      <Link
        href={`/collection/${collection.slug}`}
        aria-label={collection.name}
        className={`group relative flex flex-1 flex-col overflow-clip ${FOCUS_RING}`}
      >
        <MediaPlaceholder {...collection.cardImage} showLabel className="absolute inset-0 size-full" />
        <span className="absolute top-full right-0 z-1 flex min-h-7.5 w-full items-center justify-end bg-white p-1 text-button uppercase transition-transform duration-400 ease-snap group-hover:-translate-y-7.5">
          open collection
        </span>
      </Link>
      {/* The template keeps an empty category row here, so its 4px gap stays. */}
      <div className="flex flex-col gap-1 p-1 before:block before:content-['']">
        <h2 className="text-h5 uppercase">{collection.name}</h2>
        <p className="font-mono text-label font-bold uppercase opacity-50">{collection.date}</p>
      </div>
    </article>
  );
}
