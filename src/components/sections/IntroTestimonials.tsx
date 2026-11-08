import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Ruler } from "@/components/ui/Ruler";

const QUOTES = [
  {
    avatar: "lumen-ai-logo",
    quote:
      "“Working with Martin was seamless from start to finish. His attention to detail and design clarity made all the difference.”",
    attribution: "- LARA JONES // FOUNDER @ LUMEN AI",
  },
  {
    avatar: "mindspace-logo",
    quote:
      "“Martin is a designer who truly listens. He understood our vision instantly and turned it into something far better than we imagined.”",
    attribution: "- MARCUS LEWIS // CEO @ MINDSPACE",
  },
];

function Quote({ avatar, quote, attribution }: (typeof QUOTES)[number]) {
  return (
    <figure className="flex flex-1 flex-col items-center gap-6">
      <MediaPlaceholder name={avatar} exportSize="50×50" type="PNG" className="size-12.5" />
      <blockquote className="max-w-120 text-center text-body opacity-60">{quote}</blockquote>
      <figcaption className="max-w-120 text-center font-jetbrains text-eyebrow opacity-60">{attribution}</figcaption>
    </figure>
  );
}

/** Two centered quotes split by a divider (AUDIT.md §3 home §5; reused on /about and /contact). */
export function IntroTestimonials() {
  return (
    <section className="flex w-full justify-center overflow-hidden">
      <div className="relative flex w-full max-w-250 flex-col items-center gap-10 p-12 tablet:flex-row tablet:gap-20">
        <Ruler side="left" height={1042.8} />
        <Ruler side="right" height={1042.8} />
        <Quote {...QUOTES[0]} />
        <div aria-hidden="true" className="h-px w-12 shrink-0 bg-line tablet:h-12 tablet:w-px" />
        <Quote {...QUOTES[1]} />
      </div>
    </section>
  );
}
