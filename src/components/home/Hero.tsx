"use client";

import { motion } from "motion/react";
import { ClientLogos } from "@/components/home/ClientLogos";
import { HeroBottomBar } from "@/components/home/HeroBottomBar";
import { WorkTicker } from "@/components/home/WorkTicker";
import { ScheduleCallButton } from "@/components/ui/PillButton";
import { Ruler } from "@/components/ui/Ruler";
import { HeadingIcon } from "@/components/ui/SectionHeading";
import { EDGES } from "@/lib/styles";

/*
 * Load animations: AUDIT.md §9.1 values verbatim, per D10. Satvik tunes them
 * by eye; tuned values replace these and get recorded in D10.
 */
const FADE_IN = { opacity: 0.001 };
const LATE_SPRING = { type: "spring", bounce: 0, duration: 0.5, delay: 1.4 } as const;
const WORD = { duration: 0.5, ease: [0, 0, 0, 1] } as const;
/** Headline words, staggered ≈100ms apart. */
const WORD_DELAY = { DESIGN: 0.1, THAT: 0.2, SPEAKS: 0.3, LOUDER: 0.4, THAN: 0.5, "WORDS!": 0.6 };

function Word({ children, className = "" }: { children: string; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0.001, filter: "blur(2px)", x: -20 }}
      animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
      transition={{ ...WORD, delay: WORD_DELAY[children as keyof typeof WORD_DELAY] }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

/**
 * Hero icon (AUDIT.md §7.4). D16 em sizes: slot 60/50 = 1.2em on desktop and
 * 50/40 = 1.25em on phones; media bleeds 5px past it (0.1em / 0.125em).
 */
function HeroIcon({ name, delay }: { name: string; delay: number }) {
  return (
    <HeadingIcon
      onLoad
      delay={delay}
      asset={{ name, exportSize: "1200×1200", type: "MP4" }}
      slotClassName="size-[1.25em] tablet:size-[1.2em]"
      mediaClassName="-inset-[0.125em] tablet:-inset-[0.1em]"
    />
  );
}

/** Home hero (AUDIT.md §3 home §2–§4). */
export function Hero() {
  return (
    <header className="flex w-full flex-col items-center overflow-clip">
      <div className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
        <div className="relative flex w-full max-w-250 flex-col items-center gap-50 px-4 pt-30.25 pb-12 tablet:px-12 tablet:pt-16">
          <motion.div
            initial={{ ...FADE_IN, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={LATE_SPRING}
            className="absolute top-0 left-0"
          >
            <Ruler side="left" height={816.7} />
          </motion.div>
          <motion.div
            initial={{ ...FADE_IN, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={LATE_SPRING}
            className="absolute top-0 right-0"
          >
            <Ruler side="right" height={816.7} />
          </motion.div>

          <div className="flex w-full flex-col items-center gap-8 tablet:gap-4">
            {/* Scale 1.4→1 desktop / 1.2 tablet / 1.1 phone, y 20→0 (CSS: the start scale is per breakpoint). */}
            <h1 className="flex animate-[hero-zoom_0.7s_cubic-bezier(0.76,0,0.38,1.01)_0.9s_both] flex-col items-center text-center text-display-sm uppercase [--hero-scale:1.1] tablet:text-display tablet:[--hero-scale:1.2] desktop:[--hero-scale:1.4]">
              <span className="flex flex-wrap items-center justify-center gap-x-1 gap-y-px">
                <span>
                  <Word>DESIGN</Word> <Word>THAT</Word>
                </span>
                <HeroIcon name="hero-running-robot" delay={0.8} />
                <span>
                  <Word>SPEAKS</Word>
                  <span className="tablet:hidden">
                    {" "}
                    <Word>LOUDER</Word>
                  </span>
                </span>
              </span>
              <span className="flex items-center justify-center gap-2">
                <span className="hidden tablet:inline">
                  <Word>LOUDER</Word>
                </span>
                <span className="order-first flex tablet:order-none">
                  <HeroIcon name="hero-wallet" delay={1.0} />
                </span>
                <span>
                  <Word>THAN</Word> <Word>WORDS!</Word>
                </span>
              </span>
            </h1>

            <motion.p
              initial={FADE_IN}
              animate={{ opacity: 0.6 }}
              transition={LATE_SPRING}
              className="max-w-120 text-center text-lead tracking-[-0.02em]"
            >
              I partner with brands, founders, and small teams to deliver visually stunning and tailor-made designs.
            </motion.p>

            <motion.div initial={FADE_IN} animate={{ opacity: 1 }} transition={LATE_SPRING}>
              <ScheduleCallButton />
            </motion.div>
          </div>

          <motion.div
            initial={FADE_IN}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 40, mass: 1, delay: 1.4 }}
            className="flex w-full flex-col items-center gap-6"
          >
            <p className="font-jetbrains text-eyebrow opacity-50">TRUSTED BY STARTUP FOUNDERS &amp; BUSINESSES</p>
            <ClientLogos />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ ...FADE_IN, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={LATE_SPRING}
        className="w-full"
      >
        <WorkTicker />
      </motion.div>

      <motion.div
        initial={{ ...FADE_IN, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={LATE_SPRING}
        className="w-full"
      >
        <HeroBottomBar />
      </motion.div>
    </header>
  );
}
