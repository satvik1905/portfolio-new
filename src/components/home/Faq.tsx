"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { HeadingIcon, SectionHeading } from "@/components/ui/SectionHeading";
import { EDGES, FOCUS_RING } from "@/lib/styles";

type Decoration = { name: string; className: string };

/**
 * Questions with their decorations (AUDIT.md §3 home §17), placed as measured
 * against each bubble: hearts top-right, a star at the left, a grey tail.
 */
const FAQS: { question: string; answer: string; decoration?: Decoration }[] = [
  {
    question: "What tools do you use?",
    answer: "Mainly Framer, Figma, and a bit of custom code when needed.",
    decoration: { name: "faq-heart", className: "-top-2.75 -right-1 size-7 rotate-19" },
  },
  {
    question: "How long does a project take?",
    answer: "Most projects take 2–4 weeks, depending on scope and complexity.",
  },
  {
    question: "Do you offer design and development together?",
    answer:
      "Yes. I design and develop directly in Framer, so what you see is what ships. That means no handoff delays, no translation errors — just a seamless build from concept to live site.",
    decoration: { name: "faq-star", className: "top-2.25 -left-4 size-7 -rotate-13" },
  },
  {
    question: "What’s your typical process?",
    answer: "Strategy first, then structure, design, and final handoff or launch in Framer.",
    decoration: { name: "faq-bubble-tail-grey", className: "top-5.5 -left-1.5 h-6.25 w-4.25" },
  },
  {
    question: "Can you help improve an existing website?",
    answer:
      "Absolutely. I often take on redesign projects — refining structure, simplifying messaging, and improving performance. Sometimes a few focused changes can completely shift perception and results.",
    decoration: { name: "faq-heart", className: "-top-2.75 -right-1 size-7 rotate-19" },
  },
];

/** ⊕ / ⊖ toggle glyph (AUDIT.md §7.6, §9.4–§9.5): 20px ring, 12px glyph. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-1/2 left-full ml-3 flex size-5 -translate-y-1/2 items-center justify-center rounded-pill border-[1.5px] ${
        open ? "border-accent bg-accent" : "border-line-dark group-hover:bg-accent"
      }`}
    >
      <svg viewBox="0 0 12 12" className={`size-3 ${open ? "stroke-white" : "stroke-line-dark"}`} strokeWidth="1.5" strokeLinecap="round">
        <line x1="2" y1="6" x2="10" y2="6" />
        <motion.line
          x1="6"
          y1="2"
          x2="6"
          y2="10"
          initial={false}
          animate={{ scaleY: open ? 0 : 1 }}
          transition={{ duration: 0.36 }}
          style={{ originX: "6px", originY: "6px" }}
        />
      </svg>
    </span>
  );
}

function Question({ question, answer, decoration }: (typeof FAQS)[number]) {
  const [open, setOpen] = useState(false);
  const answerId = useId();

  return (
    <li className="flex w-full flex-col gap-3">
      <div className="relative max-w-[70%] self-start">
        {/* D2: a real button; Enter and Space toggle it. */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpen((value) => !value)}
          className={`group relative flex cursor-pointer items-center rounded-bubble bg-night px-5.5 py-3 text-left text-faq text-ink-inverse hover:bg-night-hover hover:text-muted/80 ${FOCUS_RING}`}
        >
          <span className="relative z-1">{question}</span>
          <ToggleIcon open={open} />
        </button>
        {decoration && (
          <MediaPlaceholder
            name={decoration.name}
            exportSize="28×28"
            type="SVG"
            className={`pointer-events-none absolute z-1 ${decoration.className}`}
          />
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="relative flex max-w-[70%] self-end"
          >
            <p className="rounded-bubble bg-accent px-5.5 py-3 text-faq text-ink-inverse">{answer}</p>
            <MediaPlaceholder
              name="faq-bubble-tail-blue"
              exportSize="15×23"
              type="SVG"
              className="absolute -right-0.5 bottom-0 h-[22.5px] w-[15.3px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Home FAQ (AUDIT.md §3 home §17, §9.5). Several questions can be open at once. */
export function Faq() {
  return (
    <section className={`flex w-full justify-center overflow-hidden bg-surface-alt ${EDGES} after:border-b`}>
      <div className="flex w-full max-w-250 flex-col items-center gap-18 px-2.5 py-12 tablet:p-20">
        <SectionHeading eyebrow="FAQs">
          <span className="flex items-center gap-2">
            what
            {/*
             * AUDIT.md §7.4: slot 60, media 80 at (−10, −15) on desktop
             * (1.5em; 2em at −0.25em / −0.375em of 40px); phones slot 40,
             * media 60 at (−10, −15) (calc(4em / 3); 2em at calc(−1em / 3) / −0.5em of 30px).
             */}
            <HeadingIcon
              asset={{ name: "faq-drone", exportSize: "1200×1200", type: "MP4" }}
              slotClassName="size-[calc(4em/3)] tablet:size-[1.5em]"
              mediaClassName="top-[-0.5em] left-[calc(-1em/3)] size-[2em] tablet:top-[-0.375em] tablet:left-[-0.25em]"
            />
            the faqs
          </span>
          <span>are talking bout</span>
        </SectionHeading>

        <ul className="flex w-full max-w-175 flex-col gap-2.5">
          {FAQS.map((faq) => (
            <Question key={faq.question} {...faq} />
          ))}
        </ul>
      </div>
    </section>
  );
}
