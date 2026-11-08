import { ArticleCard } from "@/components/articles/ArticleCard";
import { PillButton } from "@/components/ui/PillButton";
import { Ruler } from "@/components/ui/Ruler";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articlesInCollection } from "@/data/content";
import { EDGES } from "@/lib/styles";

/** Home blog (AUDIT.md §3 home §15): the three General Design articles. */
export function Blog() {
  const articles = articlesInCollection("general-design");

  return (
    <section className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
      <div className="relative flex w-full max-w-250 flex-col items-center">
        <Ruler side="left" height={1344} />
        <Ruler side="right" height={1344} />

        <SectionHeading eyebrow="MARTIN'S BLOG" className="w-full px-6 py-12 tablet:p-12">
          <span>thoughts, lessons</span>
          <span>and experiments in design</span>
        </SectionHeading>

        <div className="flex w-full flex-col gap-1.5 p-2.5 tablet:flex-row desktop:px-0 desktop:pt-6 desktop:pb-12">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} className="flex-1" />
          ))}
        </div>

        <div className="relative z-4 flex w-full justify-center pb-6">
          <PillButton href="/collection" label="ALL COLLECTIONS" icon="arrow" />
        </div>
      </div>
    </section>
  );
}
