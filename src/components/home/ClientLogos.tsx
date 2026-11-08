"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";

const PAIRS = [
  ["ORBIT STUDIO", "NOURISH CO."],
  ["SUMMITEER", "ECHO HOME"],
  ["CLOUDLANE", "CRESTPOINT"],
  ["FRAMEHOUSE", "PURELY"],
];

/** Swap interval (AUDIT.md §9.2): ≈every 5s. */
const SWAP_MS = 5000;
const SPRING = { type: "spring", bounce: 0, duration: 0.43 } as const;

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "");
}

/**
 * Four client-logo slots that each crossfade between two logos (AUDIT.md
 * §3, §9.2): the incoming logo scales up from ~0 and fades in while the
 * outgoing one does the reverse, and the caption slides through a 12px clip.
 * Used in the home hero and on /projects.
 */
export function ClientLogos() {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => 1 - value), SWAP_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <ul className="grid w-full max-w-125 grid-cols-2 justify-center gap-2.5 overflow-clip tablet:flex">
      {PAIRS.map((pair) => {
        const name = pair[index];
        return (
          <li key={pair[0]} className="flex flex-1 flex-col items-center gap-2.5 overflow-clip p-2">
            <span className="relative size-9.5">
              <AnimatePresence initial={false}>
                <motion.span
                  key={name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={SPRING}
                  className="absolute inset-0"
                >
                  <MediaPlaceholder name={`logo-${slug(name)}`} exportSize="38×38" type="SVG" className="size-full" />
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="relative flex min-h-3 w-full justify-center overflow-clip opacity-50">
              <AnimatePresence initial={false}>
                <motion.span
                  key={name}
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  exit={{ y: 20 }}
                  transition={SPRING}
                  className="absolute text-logo-caption"
                >
                  {name}
                </motion.span>
              </AnimatePresence>
              {/* Holds the caption row's height; the captions are absolute. */}
              <span aria-hidden="true" className="invisible text-logo-caption">
                {name}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
