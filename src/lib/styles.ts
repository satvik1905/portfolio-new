/** D2 focus ring on light sections: 2px solid #2D3AF0, 2px offset, keyboard only. */
export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-accent focus-visible:outline-offset-2";

/** D2 focus ring on dark (#101010) sections: 2px solid #F0F0F0, 2px offset, keyboard only. */
export const FOCUS_RING_DARK =
  "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ink-inverse focus-visible:outline-offset-2";

/**
 * Framer draws its 1px borders as an overlay pseudo-element, so they take no
 * layout space (AUDIT.md §7.3). Add the edges with `after:border-*` classes.
 */
export const EDGES =
  "relative after:pointer-events-none after:absolute after:inset-0 after:z-10 after:border-line";

/** Dark-section variant of EDGES (#262626 lines). */
export const EDGES_DARK =
  "relative after:pointer-events-none after:absolute after:inset-0 after:z-10 after:border-line-dark";

/** Contact CTA target, set by D8 (currently /contact). */
export const CONTACT_TARGET = "/contact";
