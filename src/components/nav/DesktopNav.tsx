"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { ArrowLink, NAV_LINKS } from "@/components/nav/links";
import { CONTACT_TARGET, FOCUS_RING } from "@/lib/styles";

/** Keycap bob periods while LET'S TALK is hovered (AUDIT.md §9.4). */
const BOB_PERIOD = { command: 2.45, k: 2.65 };

/** D11: ⌘K on Mac, Ctrl+K on Windows / Linux, overriding the browser default. */
function useContactShortcut() {
  const router = useRouter();

  useEffect(() => {
    const isMac = /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);

    function onKeyDown(event: KeyboardEvent) {
      const modifier = isMac ? event.metaKey : event.ctrlKey;
      if (!modifier || event.altKey || event.shiftKey || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      router.push(CONTACT_TARGET);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);
}

function Keycap({
  hovered,
  period,
  children,
}: {
  hovered: boolean;
  period: number;
  children: React.ReactNode;
}) {
  return (
    <motion.span
      animate={hovered ? { y: [0, -2, 0] } : { y: 0 }}
      transition={
        hovered
          ? { duration: period, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0 }
      }
      className="flex min-h-4.75 w-4.75 items-center justify-center rounded-keycap border border-line-dark bg-keycap group-hover:border-keycap-hover-border group-hover:bg-keycap-hover group-hover:transition-colors group-hover:duration-400 group-hover:ease-snap"
    >
      {children}
    </motion.span>
  );
}

function LetsTalkButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}>
      <Link
        href={CONTACT_TARGET}
        className={`group flex items-center gap-2 rounded-pill bg-night px-4 py-3 text-button text-white uppercase transition-bg duration-400 ease-snap hover:bg-accent ${FOCUS_RING}`}
      >
        <span>LET&apos;S TALK</span>
        <span className="flex items-center gap-0.5">
          <Keycap hovered={hovered} period={BOB_PERIOD.command}>
            <MediaPlaceholder
              name="keycap-command-glyph"
              exportSize="8×8"
              type="SVG"
              tone="dark"
              className="size-2"
            />
          </Keycap>
          <Keycap hovered={hovered} period={BOB_PERIOD.k}>
            <span className="font-mono text-label font-medium uppercase">K</span>
          </Keycap>
        </span>
      </Link>
    </motion.div>
  );
}

/** Desktop / tablet nav (≥810px), AUDIT.md §2 and §9.4. The mobile nav is separate. */
export function DesktopNav() {
  useContactShortcut();

  return (
    <nav className="relative hidden bg-white px-6 py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-line tablet:block">
      <div className="mx-auto flex max-w-nav items-center">
        {/* The whole left column is the logo link, as on the template. */}
        <Link
          href="/"
          className={`flex flex-1 basis-0 items-center self-stretch text-wordmark text-ink ${FOCUS_RING}`}
        >
          MARTTIN BOUCHER
        </Link>
        <div className="flex max-w-nav-links flex-1 basis-0 items-center justify-between px-4">
          {NAV_LINKS.map((link) => (
            <ArrowLink key={link.href} {...link} />
          ))}
        </div>
        <div className="flex flex-1 basis-0 items-center justify-end">
          <LetsTalkButton />
        </div>
      </div>
    </nav>
  );
}
