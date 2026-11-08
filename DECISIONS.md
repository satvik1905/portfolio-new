# DECISIONS

Where this file conflicts with AUDIT.md, this file wins.

---

## D1 — "ON THIS SIDE" clock is live, Los Angeles time

**Overrides:** AUDIT.md §9.2 ("ON THIS SIDE" clock), which says the clock is computed once at load, never updates, and is fixed at GMT +9:00.

**Decision**
- **Live:** the "ON THIS SIDE" clock updates on each minute boundary, the same way as "ON YOUR SIDE".
- **Timezone:** `America/Los_Angeles`.
- **Label:** shows the current GMT offset for that timezone, in the template's format, and follows daylight saving:
  - `GMT −8:00` during standard time (PST)
  - `GMT −7:00` during daylight time (PDT)
- **Unchanged:** time format (`h:mm AM/PM`), typography (JetBrains Mono 12/600) and placement in the hero bottom bar, as in AUDIT.md.

---

## D2 — Accessibility fixes, no visual change

**Overrides:** AUDIT.md §3 (FAQ questions as `div[tabindex=0]`), §9.5 (FAQ keyboard behaviour; mobile menu "Escape does not close it") and §9.6 (default focus ring on all focus).

**Decision**
- **No visual change:** these are behaviour and semantics changes only. Everything looks as described in AUDIT.md in every state except the focus ring, which is covered below.
- **FAQ questions:** each question is a semantic `<button>`. Enter and Space both toggle the question: they open a closed question and close an open one. Mouse click keeps the existing toggle behaviour, and several questions can still be open at once.
- **Mobile menu:** Escape closes the open menu overlay, with the same transition as tapping CLOSE.
- **Focus rings:** they appear on keyboard focus only (`:focus-visible`), never on mouse click or tap.
- **Ring:** 2px solid, 2px offset; `#2D3AF0` on light sections, `#F0F0F0` on dark (`#101010`) sections. Values chosen by Claude, approved by Satvik.

---

## D3 — Page transitions: default View Transition cross-fade

**Resolves:** AUDIT.md §9.5 (page-to-page transitions) and §10 ("View-transition duration and easing").

**Decision**
- **Transition:** page-to-page navigation uses the View Transitions API (`document.startViewTransition()`) with the browser's default cross-fade.
- **No custom CSS:** add no `view-transition-name` and no `::view-transition-*` rules, matching the template. Duration and easing are whatever the browser defaults to, so the UNKNOWN in AUDIT.md §10 needs no measurement.
- **Fallback:** browsers without View Transitions support navigate instantly, with no substitute animation.

---

## D4 — About profile card is a placeholder

**Overrides:** AUDIT.md §3 `/about` item 3 (profile card content).

**Decision**
- **Placeholder for now:** the About page's profile-card slot holds a placeholder. Its final content is **TBD** and does not have to be a profile card.
- **Keep from the template:**
  - **Slot size:** 434.2×567.9 at 1440 (AUDIT.md §7.5; the 1100 and 390 sizes are UNKNOWN there).
  - **Rotation:** −4°.
  - **Idle float:** translateY 0 → −5px → 0, period ≈4.0s (AUDIT.md §9.2).

---

## D5 — All media are placeholders until Figma exports arrive

**Overrides:** the media content described in AUDIT.md §2, §3 and §7.4–§7.6. Sizes, positions and behaviours stay as AUDIT.md describes.

**Decision**
- **Scope:** every media asset is a placeholder until Satvik supplies Figma exports. This covers:
  - heading icons
  - photos
  - videos
  - portraits
  - logos
  - the footer collage
- **Placeholder:** a flat box at the slot's exact size, labeled with three things:
  - the asset name
  - the export dimensions
  - the type (e.g. PNG, MP4, SVG)
- **Fill:** `#ECECEC` on light sections, `#262626` on dark sections. Chosen by Claude, approved by Satvik.
- **Behaviours stay wired:** all media-driven behaviours keep working against the placeholders. Examples:
  - heading-icon scale-in
  - the ticker marquee
  - the client-logo swapper
  - project-card image scale on hover
  - testimonial video-card hover swap
  - the idle floats
- **Relation to D4:** D4 still governs the About profile card slot. Its placeholder follows this format.

---

## D6 — Template copy kept verbatim for now; never deployed publicly

**Decision**
- **Verbatim for now:** keep the template's copy exactly as recorded in AUDIT.md, so the layout is tested against real text lengths. This includes the template's own spellings ("MARTTIN" / "MARTIN", "FINDIND").
- **Rewrite later:** Satvik rewrites all copy later.
- **Never deploy publicly:** template copy must never be deployed publicly. This covers:
  - the name
  - the bio
  - the work history
  - the testimonials
  - the stats

---

## D7 — Content lives in a local TypeScript data file (no CMS)

**Overrides:** AUDIT.md §1, where `/articles` and `/collection` are listed as Framer CMS collections, and AUDIT.md §3 `/articles` and §9.3, where the `/articles` grid lazy-loads with a spinner.

**Decision**
- **Source:** projects (case studies), articles and collections live in a local TypeScript data file in the repo. There is no CMS.
- **Path:** `data/content.ts`, or `src/data/content.ts` if the project uses `src/`. Path chosen by Claude, approved by Satvik.
- **Shape:** follows AUDIT.md. The field lists below come from what AUDIT.md §1 and §3 record for each template.
- **Collections:** slug, name, date, card image. There are 4: The Redesign Series, Building in Framer, Design + AI, General Design.
- **Articles:**
  - slug, title, date, hero image, body paragraphs
  - a reference to exactly one collection, using the article → collection mapping in AUDIT.md §1
  - The category label shown on cards is the collection name.
  - A `featured` boolean. Exactly one article has `featured: true`; currently that is "Designing for Trust". It is the wide featured card on `/articles`.
- **`/articles` rendering:** all articles render at once, with no lazy-loading and no spinner. This is a deliberate deviation from the template (AUDIT.md §3 `/articles` and §9.3).
- **Case studies:**
  - slug, title, tagline, discipline label, hero image
  - **role, year, duration, work done** (the meta grid)
  - **problem** and **solution** paragraphs
  - **gallery**: an ordered list of images
- **Derived pages:**
  - Collection detail pages and the article "same series" ticker are built by filtering articles on their collection.
  - The work index and the home Projects section read from the case-study list.
- **Copy:** values are the template copy under D6. Images are placeholders under D5.

---

## D8 — No Cal.com embed; contact via email

**Overrides:** AUDIT.md §3 `/contact` item 3 (Cal.com embed).

**Decision**
- **No Cal.com:** `/contact` has no Cal.com embed or any other booking widget.
- **Email contact:** contact happens by email to Satvik's Gmail.
- **Placeholder slot:** the `/contact` slot is a labeled placeholder at the template's size, 1104×570 at 1440. It uses the D5 placeholder format.

**OPEN: do not implement any of these until decided**
- `mailto:` link or Gmail compose link.
- The email address to use.
- What fills the `/contact` slot.
- Where every `/contact`-targeting CTA goes: `/contact`, or straight to email. Until this is decided, leave the template's targets unchanged. The CTAs are:
  - LET'S TALK (nav button)
  - SCHEDULE CALL on the home hero
  - SCHEDULE CALL in home "How it works"
  - SCHEDULE CALL in the `/projects` and `/about` stats sections
  - SCHEDULE CALL in the footer
  - SCHEDULE CALL in the mobile menu
  - the ⌘K shortcut
- **Outside this question:** plain navigation links labelled CONTACT (e.g. in the footer bottom bar) always go to `/contact`.

---

## D9 — Tailwind v4 spacing uses exact AUDIT.md values

**Decision**
- **Tailwind version:** Tailwind v4 (major version locked via `^4`; `package-lock.json` fixes the exact install).
- **Spacing is exact:** padding, margin and gap use the exact AUDIT.md values (§7.2 and §7.3), written as v4 spacing multiples. Example: `p-5.5` = 22px. Nothing is snapped and nothing drifts from the audit.
- **Arbitrary values:** use arbitrary-value classes (e.g. `w-[434.2px]`) only for dimensions that aren't a whole number of pixels.
- **Dimensions stay exact,** as recorded in AUDIT.md:
  - container widths
  - element widths and heights
  - heading-icon slots and bleed offsets
  - nav height
  - borders
  - radii
  - type sizes and tracking

---

## D10 — Hero load animations: start from AUDIT.md §9.1, tune by eye

**Decision**
- **Starting values:** the home hero's load animations start with the AUDIT.md §9.1 values verbatim. That covers properties, durations, delays, easings and spring settings.
- **Not included:** the "Made in Framer" badge row is Framer platform chrome. It is not part of the template, so it is not built.
- **Tuning:** once the site is running, Satvik tunes these by eye.
- **Final values:** the tuned values get recorded in this entry, replacing the §9.1 starting values. Until then, §9.1 is the spec.

---

## D11 — ⌘K / Ctrl+K shortcut

**Overrides:** AUDIT.md §1 and §9.5, which record the shortcut as ⌘K only.

**Decision**
- **Keys:** the shortcut fires on ⌘K on Mac and on Ctrl+K on Windows and Linux.
- **Browser default:** while the visitor is on the site, the shortcut overrides the browser's own action for that key combination.
- **Keycaps:** the LET'S TALK keycaps keep showing ⌘ K on every platform.
- **Target:** the target is set by D8. It is currently `/contact`; it changes only if D8's open routing question is decided otherwise.

---

## D12 — Remove the template credit

**Overrides:** AUDIT.md §1 (external link `https://x.com/whoismoe`), §2 (footer bottom bar, middle cell) and §9.6 (the credit's place in the tab order).

**Decision**
- **Remove:** the "MADE WITH ❤️ BY MOYIN" credit and its link to `https://x.com/whoismoe` are removed.
- **Pre-launch check:** before launch, confirm that the MARTTIN template's license does not require attribution. If it does, this decision must be revisited before going live.
- **Interim:** the footer bottom bar keeps its three-cell structure, and the middle cell is left blank. The cell keeps its place and size in the bar (AUDIT.md §2). The credit is not kept in the meantime.

**OPEN: do not implement until decided**
- The final treatment of the footer bottom bar's middle cell: what fills it, or whether the bar changes layout.

---

## D13 — Fonts: no Inter

**Overrides:** AUDIT.md §4 (Inter loaded via `@font-face`).

**Decision**
- **No Inter:** don't load Inter.
- **Fonts:** Geist, Geist Mono and JetBrains Mono only, all loaded via `next/font`.

---

## D14 — Project uses a `src/` directory

**Decision**
- **Layout:** the project uses a `src/` directory. Chosen by Claude, approved by Satvik.
  - `src/app` holds the routes.
  - `src/components` holds the components.
  - `src/data/content.ts` holds the content data file.
- **Resolves D7's path:** D7 allowed `data/content.ts` or `src/data/content.ts` depending on whether the project uses `src/`. The data file is therefore `src/data/content.ts`.

---

## D15 — Type tokens use relative units

**Decision**
- **Relative type units:** type tokens use rem sizes, unitless line-heights and em letter-spacing, so text respects the visitor's browser font-size setting.
- **Exact at default size:** every value is an exact conversion of the AUDIT.md px value. At a 16px root they compute to the audited px exactly.
- **Layout stays px:** layout dimensions stay in px.

---

## D16 — Fixed boxes and text scaling

**Refines:** D15 ("layout dimensions stay in px"). Heading-icon slots and bleed offsets are the exception; see below.

**Decision**
- **Boxes with text:** fixed boxes that contain text use `min-height`, not `height`.
- **Heading icons:** the icon slots and their bleed offsets (AUDIT.md §7.4) are sized in `em`, relative to their heading's font size.
- **Exact em ratios:** non-terminating em ratios are written as `calc()` fractions (e.g. `calc(4em / 3)`), never rounded decimals.
- **Media boxes:** pure media boxes stay fixed px.
- **Text over media:** text overlaid on media is checked per component.
- **Same render at default size:** everything renders identically to AUDIT.md at a 16px root.
