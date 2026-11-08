"use client";

import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef } from "react";

const QUOTE = "“IF YOU THINK GOOD DESIGN IS EXPENSIVE, YOU SHOULD LOOK AT THE COST OF BAD DESIGN.”";

function Char({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.1, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

/**
 * About quote (AUDIT.md §3 /about §5, §9.3): each character goes from
 * opacity 0.1 to 1 in reading order as the quote scrolls through the
 * viewport (scroll-linked, not timed). Range measured on the template: from
 * the quote's top entering the viewport to it reaching 52% of its height.
 */
export function ScrollQuote() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.52"] });
  const chars = [...QUOTE];

  return (
    <figure className="flex w-full max-w-150 flex-col items-center gap-1 overflow-clip">
      <figcaption className="font-jetbrains text-eyebrow opacity-50">
        – <em>Ralf Speth</em>
      </figcaption>
      <h2 ref={ref} aria-label={QUOTE} className="text-center text-quote-sm tablet:text-quote">
        {/* Words stay unbroken; each character fades on its own. */}
        {QUOTE.split(" ").map((word, w, words) => {
          const start = words.slice(0, w).join(" ").length + (w ? 1 : 0);
          return (
            <Fragment key={start}>
              {w > 0 && " "}
              <span aria-hidden="true" className="whitespace-nowrap">
                {[...word].map((char, i) => (
                  <Char key={i} char={char} index={start + i} total={chars.length} progress={scrollYProgress} />
                ))}
              </span>
            </Fragment>
          );
        })}
      </h2>
    </figure>
  );
}
