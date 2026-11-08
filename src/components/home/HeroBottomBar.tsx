"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { EDGES } from "@/lib/styles";

/** D1: "ON THIS SIDE" is live Los Angeles time. */
const THIS_SIDE_ZONE = "America/Los_Angeles";

const BADGES = [
  { label: "OFFICIAL FRAMER EXPERT", asset: "badge-framer-expert" },
  { label: "CONTRA TOP 1% FREELANCER", asset: "badge-contra" },
  { label: "AWWWARDS SOTM NOMINEE", asset: "badge-awwwards" },
  { label: "NEW YORK TIMES FEATURED", asset: "badge-nyt" },
];

/** Stepper (AUDIT.md §9.3): a ≈3.0s timer that only steps while scrolled past the gate. */
const STEP_MS = 3000;
/** The audit places the gate between ≈350 and ≈450px of scroll; exact condition UNKNOWN. */
const STEP_GATE_PX = 400;

function formatTime(date: Date, timeZone?: string) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }).format(date);
}

/** Offset of `timeZone` from GMT in minutes at `date` (negative west of GMT). */
function offsetMinutes(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(date);
  const match = parts.find((part) => part.type === "timeZoneName")?.value.match(/([+-])(\d{2}):(\d{2})/);
  if (!match) return 0;
  return (match[1] === "-" ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3]));
}

/** D1 label: "GMT −8:00" (PST) / "GMT −7:00" (PDT), in the template's "GMT +9:00" format. */
function thisSideOffset(date: Date) {
  const minutes = offsetMinutes(date, THIS_SIDE_ZONE);
  const sign = minutes < 0 ? "−" : "+";
  const abs = Math.abs(minutes);
  return `GMT ${sign}${Math.floor(abs / 60)}:${String(abs % 60).padStart(2, "0")}`;
}

/** Visitor's offset as the template shows it, e.g. "GMT -8" or "GMT +5:30". */
function yourSideOffset(date: Date) {
  const minutes = -date.getTimezoneOffset();
  const sign = minutes < 0 ? "-" : "+";
  const abs = Math.abs(minutes);
  return `GMT ${sign}${Math.floor(abs / 60)}${abs % 60 ? `:${String(abs % 60).padStart(2, "0")}` : ""}`;
}

/** Current time, refreshed exactly on each minute boundary. Null until mounted (client only). */
function useMinuteClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timer: number;
    function tick() {
      const date = new Date();
      setNow(date);
      timer = window.setTimeout(tick, 60_000 - (date.getSeconds() * 1000 + date.getMilliseconds()));
    }
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  return now;
}

function SideLabel({ children }: { children: string }) {
  return (
    <>
      <span className="font-jetbrains text-eyebrow text-night opacity-60">{children}</span>
      <span aria-hidden="true" className="h-2.5 w-px bg-night opacity-60" />
    </>
  );
}

function BadgeStepper() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (window.scrollY > STEP_GATE_PX) setStep((value) => (value + 1) % BADGES.length);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, []);

  const badge = BADGES[step];
  return (
    <div className="relative h-4 w-46.25 overflow-clip">
      <AnimatePresence initial={false}>
        <motion.div
          key={badge.label}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.558, ease: [1, 0, 0, 1] }}
          className="absolute inset-0 flex items-center justify-center gap-2.5"
        >
          <MediaPlaceholder name={badge.asset} exportSize="16×16" type="SVG" className="size-4" />
          <span className="font-jetbrains text-eyebrow whitespace-nowrap">{badge.label}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Hero bottom bar (AUDIT.md §3 home §4): two clocks around the badge stepper. */
export function HeroBottomBar() {
  const now = useMinuteClock();
  const cell = "flex min-h-13.5 items-center gap-2 px-4 py-5";

  return (
    <div className={`flex w-full justify-center ${EDGES} after:border-y`}>
      <div className="flex w-full max-w-300 flex-col tablet:flex-row">
        <div className={`${cell} justify-center tablet:flex-1 tablet:justify-start ${EDGES} after:border-y tablet:after:border-y-0 tablet:after:border-l`}>
          <SideLabel>ON THIS SIDE</SideLabel>
          <span className={`font-jetbrains text-clock opacity-60 ${now ? "" : "invisible"}`}>
            {now ? `${formatTime(now, THIS_SIDE_ZONE)} ${thisSideOffset(now)}` : "0:00 AM GMT −8:00"}
          </span>
        </div>
        <div
          className={`flex min-h-15 items-center justify-center overflow-clip tablet:min-h-13.5 tablet:w-[378.7px] tablet:shrink-0 ${EDGES} after:border-dashed after:border-y tablet:after:border-y-0 tablet:after:border-x`}
        >
          <BadgeStepper />
        </div>
        <div className={`${cell} justify-center tablet:flex-1 tablet:justify-end ${EDGES} after:border-y tablet:after:border-y-0 tablet:after:border-r`}>
          <SideLabel>ON YOUR SIDE</SideLabel>
          {/* AUDIT.md §9.1: hidden until filled client-side. */}
          <span className={`flex items-center gap-1.5 font-jetbrains text-clock opacity-60 ${now ? "" : "invisible"}`}>
            <span>{now ? formatTime(now) : "0:00 AM"}</span>
            <span>{now ? yourSideOffset(now) : "GMT +0"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
