"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Section heading reveal (AUDIT.md §9.3): opacity 0→1, y 30→0 on entering
 * the viewport, spring-like with no overshoot, settling by ≈1.4s. Replays on
 * re-entry. Exact spring parameters are UNKNOWN in the audit.
 */
export function HeadingReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ type: "spring", bounce: 0, duration: 1.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Heading inline-icon scale-in (AUDIT.md §9.3): scale 0→1, 0.8s,
 * cubic-bezier(1, 0, 0, 1). Whether it replays is UNKNOWN; it plays once.
 * Pass `delay` (s) for load-time use in the hero (§9.1).
 */
export function ScaleIn({
  children,
  className = "",
  onLoad = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  onLoad?: boolean;
  delay?: number;
}) {
  const transition = { duration: 0.8, delay, ease: [1, 0, 0, 1] as const };
  return onLoad ? (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={transition} className={className}>
      {children}
    </motion.div>
  ) : (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stat counter (AUDIT.md §9.3): counts up from 0 over ≈2.0s, sine-shaped
 * ease-in-out, with thousands separators. Resets to 0 when scrolled out and
 * counts again on re-entry.
 */
export function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);

  // Writes text straight to the node: a re-render per frame isn't needed.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const show = (value: number) => {
      node.textContent = `${prefix}${Math.round(value).toLocaleString("en-US")}${suffix}`;
    };
    if (!inView) {
      show(0);
      return;
    }
    const controls = animate(0, to, {
      duration: 2,
      ease: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
      onUpdate: show,
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
