"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT_TARGET, FOCUS_RING } from "@/lib/styles";

/** Bottom/top hairline for already-positioned bars (EDGES would reset their position to relative). */
const HAIRLINE = "after:pointer-events-none after:absolute after:inset-0 after:border-line";

/** The overlay lists ARTICLES before ABOUT, unlike the desktop nav (AUDIT.md §2). */
const MENU_LINKS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/projects" },
  { label: "ARTICLES", href: "/articles" },
  { label: "ABOUT", href: "/about" },
];

/** Overlay fade (AUDIT.md §9.5): 300ms in; close observed ≈370ms. */
const FADE_EASE = [0.5, 0, 0.88, 0.77] as const;

function Rail({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-y-0 flex w-0.75 gap-px ${side === "left" ? "left-1.5" : "right-1.5"}`}
    >
      <div className="w-px bg-line" />
      <div className="w-px bg-line" />
    </div>
  );
}

/** Phone nav (≤809px), AUDIT.md §2 and §9.5, with D2's Escape-to-close. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="tablet:hidden">
      <nav className={`fixed inset-x-0 top-0 z-30 flex justify-center bg-white p-2.5 ${HAIRLINE} after:border-b`}>
        <div className="flex w-full max-w-nav items-center justify-between">
          <Link href="/" className={`flex flex-1 items-center self-stretch text-wordmark-sm text-ink ${FOCUS_RING}`}>
            MARTTIN BOUCHER
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className={`flex min-h-9.25 cursor-pointer items-center justify-center rounded-pill bg-ink-inverse px-4.5 py-3 font-jetbrains text-eyebrow text-ink ${FOCUS_RING}`}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, ease: FADE_EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.37, ease: FADE_EASE } }}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-white px-4"
          >
            <Rail side="left" />
            <Rail side="right" />
            <ul className="flex w-full flex-col items-center gap-2.5 px-0.75">
              {MENU_LINKS.map((link) => (
                <li key={link.href} className="w-full">
                  <Link
                    href={link.href}
                    className={`flex justify-center p-4 font-jetbrains text-menu-link text-night ${FOCUS_RING}`}
                  >
                    <span className="opacity-60">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={`absolute inset-x-0 bottom-0 flex justify-center bg-white p-2.5 ${HAIRLINE} after:border-t`}>
              <Link
                href={CONTACT_TARGET}
                className={`flex min-h-9.25 items-center justify-center gap-2 rounded-pill bg-night px-4 py-3 text-button text-white uppercase ${FOCUS_RING}`}
              >
                SCHEDULE CALL
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
