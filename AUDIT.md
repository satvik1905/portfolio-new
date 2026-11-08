# AUDIT — https://marttin.framer.website

Audited 2026-11-06 with Playwright. The site is a Framer build: the "MARTTIN" portfolio template, credited in the footer as "Made with ❤️ by Moyin".

There were two passes:
1. Headless Chromium, used for routes, styles and the first animation recordings.
2. Headless Google Chrome 156.0.8078.80 via `channel: 'chrome'`, used for media, geometry, focus and interaction testing. Chrome decodes the site's `.mp4` files, which Playwright's bundled Chromium could not.

**How values were collected**
- Routes: from `/sitemap.xml`, checked against a link crawl.
- Sections: from DOM landmarks plus Framer `data-framer-name` layer names, checked against screenshots.
- Styles:
  - Computed styles of every rendered element on all 27 sitemap routes at 1440px.
  - The `:root` CSS tokens and `@font-face` rules.
  - Server HTML of all 28 routes (the 27 sitemap routes plus `/404`).
  - Geometry was also measured at 1100 (tablet) and 390×844 (phone).
- Animations:
  - The Framer appear-animation config (`#__framer__appearAnimationsContent`).
  - Recordings while the page loaded, scrolled, sat idle, and was hovered, clicked or tabbed through. These came from `document.getAnimations()` (WAAPI timings), a MutationObserver on inline styles and text, and computed-style sampling over time for JS-driven motion.

**Measurement notes**
- Times written as "observed ≈" were measured from DOM mutations or style sampling. They are approximate (±~50 ms).
- Durations shown as `spring(...)` are Framer spring settings. The browser received them as `linear(...)` approximations.
- Anything not verified is marked **UNKNOWN**.

---

## 1. Pages & routes

All routes return HTTP 200 except `/404`. Every page uses the same `<title>`: *"Marttin Boucher - Top 1% Product Designer for Saas & Startups"*. The meta description is the template blurb, except on the 4 collection-detail pages, which have their own.

| # | Route | Type / template |
|---|---|---|
| 1 | `/` | Home |
| 2 | `/projects` | Work index |
| 3 | `/about` | About |
| 4 | `/articles` | Blog index (CMS) |
| 5 | `/collection` | Collection index (CMS) |
| 6 | `/contact` | Contact / booking |
| 7 | `/modern-muse` | Case study |
| 8 | `/arctic-calm` | Case study |
| 9 | `/clay-momentum` | Case study |
| 10 | `/collection/the-redesign-series` | Collection detail (CMS template) |
| 11 | `/collection/building-in-framer` | Collection detail |
| 12 | `/collection/design-ai` | Collection detail |
| 13 | `/collection/general-design` | Collection detail |
| 14 | `/articles/designing-for-trust` | Article detail (CMS template) |
| 15 | `/articles/the-power-of-first-impressions` | Article detail |
| 16 | `/articles/turning-components-into-systems` | Article detail |
| 17 | `/articles/beyond-prompts-the-new-design-mindset` | Article detail |
| 18 | `/articles/the-portfolio-problem` | Article detail |
| 19 | `/articles/simplifying-for-clarity` | Article detail |
| 20 | `/articles/my-framer-workflow` | Article detail |
| 21 | `/articles/when-machines-inspire-humans` | Article detail |
| 22 | `/articles/from-drafts-to-launch` | Article detail |
| 23 | `/articles/designing-for-emotion` | Article detail |
| 24 | `/articles/animating-with-purpose` | Article detail |
| 25 | `/articles/the-future-of-human-taste` | Article detail |
| 26 | `/legal/terms-conditions` | Legal |
| 27 | `/legal/privacy-policy` | Legal |
| 28 | `/404` (and any unknown path) | Not found (HTTP 404) |

Article → collection mapping, as shown on the cards:
- **General Design:** designing-for-trust, the-portfolio-problem, from-drafts-to-launch
- **The Redesign Series:** the-power-of-first-impressions, simplifying-for-clarity, designing-for-emotion
- **Building in Framer:** turning-components-into-systems, my-framer-workflow, animating-with-purpose
- **Design + AI:** beyond-prompts-the-new-design-mindset, when-machines-inspire-humans, the-future-of-human-taste

All articles are dated "October 6, 2025".

External links:
- `https://x.com/whoismoe` (footer credit)
- `https://www.framer.com` (Framer's "Made in Framer" badge, which is platform chrome, not template design)
- `mailto:hello@martin.design` (legal pages)

Keyboard shortcut: **⌘K** navigates to `/contact`, matching the ⌘ K keycaps on the "LET'S TALK" button. Pressing `K` alone does nothing.

Navigation between pages is client-side (SPA). See §9.5 for page transitions.

---

## 2. Global chrome (on every page)

### Nav
- **Desktop / tablet** (`nav[Desktop]`, 63px tall, white, 1px `#DCDFE4` bottom border). Not sticky: it scrolls away with the page.
  - Left: wordmark "MARTTIN BOUCHER" (Geist 18/700, −0.54px, `#010101`).
  - Center: links HOME · WORK · ABOUT · ARTICLES (JetBrains Mono 12/600, −0.6px, `#101010` at opacity 0.6). Each link holds an 18px ↗ arrow that appears on hover (§9.4).
  - Right: pill button "LET'S TALK" with ⌘ and K keycaps:
    - button: bg `#101010`, radius 100px, 140.8×43, padding 12px 16px, 8px gap; label Geist 12/700, −0.36px, white, uppercase
    - keycaps: 19×19, radius 6px, bg `#303030`, 1px `#262626` border, 2px apart
    - "K": Geist Mono 10/500, −0.3px, white
    - "⌘": an 8×8 SVG
  - **Layout:** the nav is full width with 10px 24px padding. Its inner container has `max-width: 1400px` and is centered (at 1920 it starts at x=260). Inside are three columns, each `flex: 1 0 0`:
    - logo column, left-aligned
    - links column: `max-width: 472px`, 16px side padding, links spaced `space-between`
    - button column, right-aligned

    Measured column widths (sides / links):

    | Viewport | Sides | Links |
    |---|---|---|
    | 810 | 243.3 | 275.3 |
    | 900 | 273.3 | 305.4 |
    | 1100 | 340 | 372 |
    | 1399 | 439.7 | 471.6 |
    | 1440 | 460 | 472 (capped) |
    | 1920 | 464 | 472 |

    The nav is the same component from 810 to 1399px; only the column widths change.
  - **Link targets:**
    - logo and HOME → `/`
    - WORK → `/projects`
    - ABOUT → `/about`
    - ARTICLES → `/articles`
    - LET'S TALK → `/contact`

    All open in the same tab. The hrefs are relative (`./…` on top-level pages, `../…` on article pages) and resolve to the same paths.
  - **Active page:** there is **no visual active state**. Framer adds `data-framer-page-link-current` to the current page's link: HOME and the logo on `/`, LET'S TALK on `/contact`. But opacity, color, weight and the hidden arrow are identical on every page checked: `/`, `/projects`, `/about`, `/articles`, `/contact`, `/modern-muse`, `/articles/designing-for-trust` and `/collection`. There is no `aria-current`. Detail pages (case studies, articles) mark no nav link.
- **Mobile** (`nav[Mobile-01]`, 57px). `position: fixed` at the top (still at top:0 after scrolling).
  - Wordmark plus a "MENU" pill (bg `#F0F0F0`). The pill is a `div[tabindex=0]`.
  - The open state (`Mobile-02`) is a full-screen white overlay with centered HOME / WORK / ARTICLES / ABOUT in mono and a "SCHEDULE CALL" pill at the bottom. The toggle reads "CLOSE". While it is open, `html` gets `overflow: hidden` (scroll lock).

### Decorative rulers
Most content blocks are framed by vertical "ruler" columns (`01-white` / `01-black`, `02-white` / `02-black`):
- Tick marks with mono labels 50, 100 … 500 (JetBrains Mono 8/600, `#C4C4C4`).
- 1px rule lines (`#DCDFE4` on light sections, `#262626` on dark).

Between home sections are 53px divider strips (`white`: left / middle / right cells with dashed 1px `#DCDFE4` borders).

### Footer (`footer[Desktop|Tablet|Mobile]`, 688px on desktop)
1. A collage on each side. Each side is **one static image** (412×630 at 1440, alt "image collection of things t…") depicting:
   - an avatar polaroid
   - an "invoice paid" notification
   - the Framer logo
   - a "Culture" badge
   - a Contra card
   - a "Think outside the box" sticker
   - a Figma blob
   - a sticky note reading "make the button pop (but not too much)"
   - a teal icon

   The images have `cursor: auto`, no hover effect and no drag behaviour beyond native `<img>` dragging.
2. Center: H2 "BIG IDEAS DESERVE REALLY GREAT DESIGN." and a "SCHEDULE CALL" pill.
3. Bottom bar (58px, three cells): HOME · WORK · ABOUT · ARTICLES | "MADE WITH ❤️ BY MOYIN" (link to x.com) | POLICY · 404 · CONTACT · TERMS. Each link has an 18px ↗ hover arrow.

---

## 3. Sections per page, in order

### `/` Home (1440px, 8478px tall)
1. **Nav**
2. **Hero** (`header[hero-container]`, white, ruler-framed, 1000px inner)
   - H1 "DESIGN THAT [running-robot video] SPEAKS / LOUDER [wallet video] THAN WORDS!" (icons in §7.4)
   - Subcopy "I partner with brands, founders, and small teams…" (opacity 0.6)
   - Pill CTA "SCHEDULE CALL" with a Google Meet icon
   - Client strip: "TRUSTED BY STARTUP FOUNDERS & BUSINESSES" with 4 logo slots that swap between pairs (Orbit Studio/Nourish Co., Summiteer/Echo Home, Cloudlane/Crestpoint, Framehouse/Purely)
3. **Work ticker** (`ticker-container`, 574px): a marquee of project screenshots labelled MINDMESH, NORTHLESS, PIXEL & GRAIN, AERONE.
4. **Hero bottom bar** (`bottom-container`, 54px):
   - "ON THIS SIDE | <time> GMT +9:00" (set once at load; see §9.2)
   - Center badge stepper, cycling: OFFICIAL FRAMER EXPERT → CONTRA TOP 1% FREELANCER → AWWWARDS SOTM NOMINEE → NEW YORK TIMES FEATURED → back to the first
   - "ON YOUR SIDE | <visitor's local time>"
5. **Intro testimonials** (`intro-testimonials`): two centered quotes with logo avatars (Lara Jones // Founder @ Lumen AI; Marcus Lewis // CEO @ Mindspace), split by a vertical divider.
6. Divider strip
7. **Projects** (`projects-container`, dark `#101010`, 1200px inner)
   - H2 "THE [keyboard PNG] PROJECTS / BEHIND THE [sticker-apple PNG] PIXELS"
   - One full-width card (Modern Muse) above a 2-up row (Arctic Calm, Clay Momentum). Each card is a single `<a>`.
   - **Traffic-light dots** (`control`) in a `top-container` at opacity 0.2, inset 10px from the card's top-left. There are 3 dots, each 12×12 with radius 100px and a 7px gap:
     - dot 1: fill `#ED2D2D`, 1px `#FF5679` border
     - dot 2: fill `#D5D7D6`, 1px `#DCDFE4` border
     - dot 3: fill `green`, 1px `#2DB43F` border
   - The tagline sits in the same `top-container`.
   - Each card also has the title (H3 30/900), a mono discipline label, and an `overlay` of `#101010` at opacity 0.2 (`z-index: 2`) over the image.
8. Divider strip
9. **How it works** (`process-testimonials`, `#F9F9F9`)
   - Eyebrow "HOW IT WORKS"; H2 "TAKING CARE OF DESIGN SO YOU CAN SCALE."
   - 3 columns with 70px 3D icons (desktop computer, keyboard, headphones): CREATE 10X IMPACT / DESIGN THAT SELLS / BIG BRAND ENERGY
   - "SCHEDULE CALL" CTA
10. Divider strip
11. **Services** (`services-container`, white, ruler-framed)
    - Eyebrow "OFFERED SERVICES"; H2 "FOR BRANDS [retro-computer video] THAT / DARE TO STAND OUT"
    - 2×2 grid, "SERVICE 01–04": Product Design, Brand Identity, Design Systems, Framer Development
    - Counter "€300M" (blue) with the caption "HELPING STARTUPS ATTRACT FUNDING THROUGH CLARITY AND CRAFT."
12. Divider strip
13. **Testimonials wall** (`testimonials-section`, dark, 1206px inner)
    - Eyebrow "TESTIMONIALS"; H2 "TRUSTED BY EXTRAORDINARY PEOPLE WORLDWIDE."
    - 3 masonry columns (362px each) mixing two card types:
      - video cards (Isabelle Tran, Ethan Reeves, Sophia Patel) with a play glyph and a per-card `overlay`, `linear-gradient(rgba(32,32,32,0) → #202020)`, behind the name
      - X/Twitter-style cards (Clara Montrose, Noah Bennett, Felix Grant, Elena Walters)
    - A section `overlay` covers the masonry: `#000` at opacity 0.9, `z-index: 1`, with `mask-image: linear-gradient(transparent 0%, transparent 55%, #000 100%)`. This gives a bottom fade to black over the lower ~45%.
14. Divider strip
15. **Blog** (`blog-container`)
    - Eyebrow "MARTIN'S BLOG"; H2 "THOUGHTS, LESSONS AND EXPERIMENTS IN DESIGN"
    - 3 article cards (image, blue mono category, H5 title, mono date)
    - "ALL COLLECTIONS →" button
16. Divider strip
17. **FAQ** (`process-testimonials`, `#F9F9F9`)
    - Eyebrow "FAQs"; H2 "WHAT [drone video] THE FAQS / ARE TALKING BOUT"
    - 5 chat-bubble questions: black pills (`div[tabindex=0]`, radius 24px) with ⊕ buttons, plus heart, star and bubble-tail decorations. Answers open as blue right-aligned bubbles.
18. Divider strip
19. **Footer**

### `/projects`
1. Nav
2. Header: eyebrow "PROJECTS I WORKED ON"; H1-style quote "“EVERYTHING IS DESIGNED. FEW THINGS ARE DESIGNED WELL.”"; 4 client-logo slots (same swapping component as home).
3. Projects list: 3 full-width cards stacked (Modern Muse, Arctic Calm, Clay Momentum), ruler-framed.
4. Stats (`inner-container`): eyebrow "BIG DEAL STATS"; H3 "FROM MESSY SKETCHES TO MOMENTS OF CLARITY"; 3 stat columns with 70px 3D icons (coin jar, map, lunch bag):
   - **€300M** (red `#ED2D2D`): "Helping startups attract funding…"
   - **100%** (blue): "of projects shipped before the deadline…"
   - **2,000+** (green): "hours spent perfecting micro-interactions…"

   Then a "SCHEDULE CALL" CTA.
5. Footer

### `/about`
1. Nav
2. Hero: eyebrow "ABOUT ME - MARTIN"; H1 "“SIMPLICITY IS THE ULTIMATE SOPHISTICATION.”"
3. Profile card: a single PNG (`jrsBvIjXmWOO7ITvuDGIa2HzMk.png`, alt "profile card image of a person featuring their details") rotated −4°. It shows lined notebook paper with a polaroid avatar, a "verified" stamp, and handwritten fields (codename, alias, location, contact, mission, stack). The handwriting is part of the image; the card contains no DOM text.
4. Stats: identical to `/projects` §4, including the CTA.
5. Quote: H2 "“IF YOU THINK GOOD DESIGN IS EXPENSIVE, YOU SHOULD LOOK AT THE COST OF BAD DESIGN.”" attributed "– Ralf Speth", with a scroll-driven per-letter reveal.
6. Experience: eyebrow "COMPANIES I HAVE WORKED IN"; heading "FINDIND [jumping-robot PNG] MEANING / IN MINIMALISM" ("FINDIND" is the site's own typo). 5 rows, each with mono company, H4 role, mono dates, and a bulleted mono skill list on the right:
   - Google Creative Lab — Lead Designer
   - Figma — Senior Product Designer
   - Airbnb — Product Designer
   - Spotify — UX / Visual Designer
   - Apple — Design Intern
7. Intro testimonials (the same 2-quote block as home §5)
8. Footer

### `/articles`
1. Nav
2. Featured article: one wide card (Designing for Trust) inside a ruler frame.
3. Grid of cards for the remaining articles (11 more): 3 columns at desktop, 2 at tablet, 1 on mobile. They lazy-load on scroll: 5 article links exist at load and 12 after scrolling, with a `Loading > Spinner` shown meanwhile.
4. Footer

There is no page H1 or intro on this route.

### `/collection`
1. Nav
2. Header: eyebrow "ARTICLE COLLECTION"; H1 "ONE STRONG IDEA BEATS TEN WEAK ONES."
3. 2×2 grid of tall collection cards (image, H5 name, mono date) for The Redesign Series, Building in Framer, Design + AI, General Design. Hover shows "OPEN COLLECTION".
4. Footer

### `/collection/<slug>` (4 pages, one template)
1. Nav
2. `blog-container`: eyebrow "MARTIN'S BLOG"; H1 collection name; 3-column article cards filtered to that collection.
3. Footer

### `/articles/<slug>` (12 pages, one template)
1. Nav
2. Article header (ruler-framed): mono category eyebrow; H2 title; "PUBLISHED ON: <date>" in blue mono; a hero image (904×471.2 at 1440); body paragraphs (Geist 18/400, gray).
3. Related ticker (`ticker-container`): H4 "ARTICLES IN THE SAME SERIES", then an infinite marquee of same-collection article cards.
4. Footer

### `/modern-muse`, `/arctic-calm`, `/clay-momentum` (one case-study template)
1. Nav
2. Hero image (1200×700 at 1440, within the content width) with the centered title (H2 "MODERN MUSE" etc.)
3. Breadcrumb "WORK DONE // <PROJECT>" (links to `/projects`), then H3 tagline:
   - "DESIGNING FOR BOLD NOSTALGIA"
   - "ENGINEERED WARMTH, ELEVATED STYLE."
   - "PRECISION MEETS PASSION"
4. Meta grid (2×2): ROLE IN PROJECT / PROJECT YEAR / DURATION / WORK DONE

   | Project | Role | Year | Duration | Work done |
   |---|---|---|---|---|
   | Modern Muse | Product Designer | 2025 | 4 weeks | Branding / Creative Direction |
   | Arctic Calm | Visual Strategist | 2025 | 8 weeks | Branding & UI Design |
   | Clay Momentum | Framer Developer | 2025 | 6 weeks | Framer Development |
5. H3 "THE PROBLEM" with a paragraph
6. Image gallery: stacked images (4 on Modern Muse, 5 on the others)
7. H3 "THE SOLUTION" with a paragraph
8. Footer

### `/contact`
1. Nav
2. Hero: eyebrow "CONTACT ME"; H1 "“CREATIVITY IS INTELLIGENCE HAVING FUN.”"
3. Cal.com embed (iframe, "15 Min Meeting", Cal Video, month calendar and time slots). It resizes to 570px tall (1104px wide at 1440) after load.
4. Intro testimonials (2 quotes)
5. Footer

### `/legal/terms-conditions`
1. Nav
2. Eyebrow "LEGAL PAGES"; H1 "TERMS & CONDITIONS"; mono date "WEDNESDAY, OCTOBER 1, 2025"
3. Eight H4 sections, each with a paragraph: 1. Introduction, 2. Ownership & Intellectual Property, 3. Use of Content, 4. Projects & Client Work, 5. External Links, 6. Limitation of Liability, 7. Updates to Terms, 8. Contact (links hello@martin.design)
4. Footer

### `/legal/privacy-policy`
1. Nav
2. Same header pattern; H1 "PRIVACY POLICY"; mono date "SATURDAY, OCTOBER 11, 2025"
3. Eight H4 sections: 1. Introduction, 2. Information We Collect, 3. How We Use Your Information, 4. Cookies, 5. Data Security, 6. Third-Party Services, 7. Your Rights, 8. Updates to This Policy (with bullet lists)
4. Footer

### `/404`
1. Nav
2. `overall-container` (900px tall):
   - H1 "YOU’VE GONE OFF-GRID." (50/800)
   - subcopy "The pixels you’re looking for don’t live here anymore."
   - a 300×300 looping video of a sticker-covered cardboard box with a chattering mouth (§7.4)
   - pill "BACK TO HOMEPAGE →"
3. Footer

---

## 4. Fonts

All fonts are served by Framer (`@font-face` from framerusercontent).

| Family | Faces loaded | Where it renders |
|---|---|---|
| **Geist** | 400, 500, 700, 800, 900 (normal) | All headings, body, buttons, wordmark |
| **JetBrains Mono** | 600, 700 (+ italics) | Nav links, eyebrows, ruler numbers, footer links, clocks, about-page company names |
| **Geist Mono** | 500, 700 | Card categories, dates, discipline labels, date lines |
| **Inter** | 400, 700, 400 italic | No template text. Inter appears only as Framer's built-in default in its rich-text base rules (`var(--framer-font-family, Inter, "Inter Placeholder", sans-serif)` for blockquote and code fallbacks) and in Framer's editor-bar UI. |

Headings are uppercase (`text-transform: uppercase`) with tight negative tracking.

---

## 5. Color palette

### Design tokens
Defined as CSS variables on `body`. Usage counts come from computed styles across all routes.

| Hex | Observed role |
|---|---|
| `#FFFFFF` | Page background (`body`), light sections, nav, footer |
| `#010101` | Primary text (most common text color) |
| `#101010` | Dark section background (Projects, Testimonials), primary pill buttons, FAQ question bubbles, project-card overlay (at opacity 0.2) |
| `#000000` | Testimonials fade overlay (at opacity 0.9) and other small usage (bg ×6) |
| `#202020` | FAQ bubble hover bg; testimonial video-card gradient end `linear-gradient(rgba(32,32,32,0) → #202020)` |
| `#262626` | Borders on dark cards / rulers |
| `#303030` | Keycap background (⌘ / K) |
| `#F0F0F0` | Text on dark; mobile MENU pill bg |
| `#F9F9F9` | Alt section background (How it works, FAQ) |
| `#ECECEC` | Defined, but not referenced in the server HTML of any route or in the stylesheet |
| `#DCDFE4` | Grid / ruler lines, borders on light sections, middle traffic-light dot border |
| `#D5D7D6` | Middle traffic-light dot fill (and other minor bg, ×6 total) |
| `#C4C4C4` | Ruler numbers & ticks, muted text, FAQ hover text |
| `#2D3AF0` | **Accent blue**: category labels, "Published on", €300M counter on home, 100% stat, LET'S TALK hover bg, FAQ answer bubble and ⊖ icon |
| `#2D3AF01A` | Blue at 10%: defined, but not referenced in the server HTML of any route or in the stylesheet |
| `#5287E9` | Keycap bg on hover |
| `#6C9FFF` | Keycap border on hover |
| `#ED2D2D` | Red stat (€300M on About / Projects); first traffic-light dot fill |
| `green` / `#008000` | Green stat (2,000+); third traffic-light dot fill |
| `#2DB43F` | Third traffic-light dot border (1px) |
| `#FF5679` | FAQ heart decorations; first traffic-light dot border (1px) |
| `#FED95E` | Yellow: FAQ star decoration |
| `#0000` | Transparent token |

### Other effects
- Shadows: no `box-shadow` was found on any element in `#main`.
- Filters: `blur(8px)` is the initial state for FAQ answer reveals; `blur(2px)` is used in the hero word reveal.
- Masks: the testimonials overlay uses `mask-image: linear-gradient(transparent 0%, transparent 55%, #000 100%)`.

---

## 6. Type scale

Computed at 1440px. Format is size / line-height, weight, letter-spacing. Headings render at weight 900 through their inner spans, while their wrapper tags report 800.

| Role | Font | Size / LH | Weight | Tracking | Case | Example |
|---|---|---|---|---|---|---|
| Display H1 (desktop/tablet) | Geist | 50 / 60 | 900 | −2px | UPPER | "DESIGN THAT SPEAKS…", page quotes |
| Display H1 (mobile ≤809) | Geist | 40 / 48 | 900 | −2px | UPPER | hero |
| H2 section (desktop/tablet) | Geist | 40 / 48 | 900 (800 on some) | −2px | UPPER | "TAKING CARE OF DESIGN…" |
| H2 section (mobile ≤809) | Geist | 30 / 36 | 900 (Projects heading: 800) | −0.9px | UPPER | How it works, Services, Testimonials, Blog, FAQ, Projects |
| Counter (large) | Geist | 40 / 40 | 800 | −1.2px | — | €300M |
| Counter (stats) | Geist | 32 / 32 | 800 | −0.96px | — | 100%, 2,000+ |
| About quote (per-letter) | Geist | 32 / 38.4 | 800 | normal | — | "IF YOU THINK…" |
| H3 | Geist | 30 / 36 | 900 | −0.9px | UPPER | project titles, "THE PROBLEM", About "FINDIND MEANING" |
| H3 About "FINDIND MEANING" (mobile ≤809) | Geist | 22 / 26.4 | 900 | −0.66px | UPPER | "FINDIND / MEANING / IN MINIMALISM" |
| H4 | Geist | 22 / 26.4 | 800–900 | −0.66px | UPPER | service titles, job titles |
| Testimonial name | Geist | 22 / 30.8 | 500 | −0.66px | — | Isabelle Tran |
| Lead / body L | Geist | 18 / 25.2 | 400 | −0.36 to −0.54px | — | hero subcopy, legal & article body |
| Wordmark / emphasis | Geist | 18 / 25.2 | 700 | −0.54px | — | MARTTIN BOUCHER |
| H5 card title | Geist | 16 / 19.2 | 900 | −0.48px | UPPER | article / meta values |
| Body M | Geist | 16 / 22.4 | 400 | −0.32px | — | quotes, service copy |
| FAQ question | Geist | 16 / 22.4 | 500 | −0.32px | — | |
| Body S (tweet) | Geist | 14 / 19.6 | 400 | −0.28px | — | |
| Tweet name | Geist | 14 / 16.8 | 500 | −0.56px | — | |
| Button label | Geist | 12 / 13.2 | 700 | −0.36px | UPPER | SCHEDULE CALL, LET'S TALK |
| Tweet meta | Geist | 12 / 13.2 | 500 | −0.48px | — | timestamps, handles |
| Nav / eyebrow | JetBrains Mono | 12 / 13.2 | 600 | −0.6px | as typed (UPPER) | HOME, HOW IT WORKS |
| Mono strong | JetBrains Mono | 12 / 13.2 | 700 | −0.6px | — | company names, counter caption |
| Clock | JetBrains Mono | 12 / 12 | 600 | −0.6px | — | 9:46 PM |
| Logo caption | Geist | 10 / 12 | 700 | −0.2px | — | NOURISH CO. |
| Mono label | Geist Mono | 10 / 10 | 500–700 | −0.3px | UPPER | categories, dates, disciplines |
| Ruler numbers | JetBrains Mono | 8 / 8.8 | 600 | −0.4px | — | 50, 100… |

The type scale is the same at desktop (≥1400) and tablet (810–1399). On mobile:
- the display H1 drops from 50/60 to 40/48
- section H2s drop from 40/48 to 30/36
- the About "FINDIND MEANING" H3 drops from 30/36 to 22/26.4

Other sizes are unchanged. Measured at 390px:
- The reduced section H2s are weight 900 with −0.9px tracking. The home Projects heading ("THE PROJECTS / BEHIND THE PIXELS") is weight 800, as it is on desktop.
- The About H3 is weight 900 with −0.66px tracking.

These match the H3 and H4 rows above.

**Heading levels on phones.** Framer demotes heading tags at ≤809px. Measured at 390px:
- home hero H1 → H2
- section H2s → H3 (including the footer "BIG IDEAS…" H2)
- About "FINDIND MEANING" H3 → H4
- `/about` hero quote H1 → H3

We don't replicate this (D2): heading levels stay the same at every breakpoint.

---

## 7. Spacing, layout, radii, media

### 7.1 Containers (1440px)
- Nav inner: 1392px (24px side gutters)
- Content columns: **1000px** (hero, intro, process, services, blog, FAQ); **1200px** (projects, hero bottom bar, case-study hero); **1206px** (testimonials, divider strips)
- Text blocks are often capped at 904px or 800px.

### 7.2 Section vertical padding
| Section | Padding (top/right/bottom/left) |
|---|---|
| Projects | 72/0/72/0 |
| How it works, Testimonials, FAQ headings | 80px top/bottom (testimonials side padding 50px) |
| Intro, Services | 48/48/48/48 |
| Mobile (all) | 48px top/bottom; 10px sides on Process and Testimonials |

### 7.3 Recurring values, radii, borders, grids
**Recurring values**
- Padding (most frequent first): 4, 48, 20, 16, 24, 14, 10, 12, 32, 8, 22, 9, 80, 100, 6, 72, 50, 64px
- Flex/grid gap (most frequent first): 10, 2, 4, 6, 8, 1, 16, 24, 32, 80, 7, 22, 12, 18, 3, 14, 100, 20, 72, 200, 48px
- The scale is not strictly 4/8-based.

**Radii**
- `100px`: all pills, buttons, traffic-light dots, tweet avatars (100 occurrences)
- `6px`: keycaps, small cards (58)
- `24px`: FAQ question bubbles and their icon wrapper (10 occurrences)
- `8px`: 1 occurrence
- Project, article, collection and testimonial image cards, footer collages and inline heading icons are square-cornered (radius 0).

**Borders.** All are 1px, drawn by Framer `[data-border]` pseudo-elements:
- solid `#DCDFE4` on top / bottom / left / right edges of light sections
- **dashed** `#DCDFE4` left+right on divider-strip cells
- solid `#262626` (dark cards)
- `#FF5679` and `#2DB43F` on the first and third traffic-light dots of each project card (3 each on home)

**Grids**
- Projects: 1 + 2 at desktop and tablet; 1 per row on mobile
- Home blog and collection-detail cards: 3 columns at desktop and tablet; stacked on mobile
- `/articles` grid: 3 columns at desktop, 2 at tablet, 1 on mobile
- Testimonials: 3 columns at 362px (1440) / 353px (1100) / 257px (810); stacked full width on mobile
- Services: 2×2 grid
- Collection index: 2×2 grid

### 7.4 Inline heading icons

**Structure and alignment**
- Each heading line is a horizontal flex row (`top-level` / `bottom-level`) with `align-items: center`. The text segments and the icon are separate flex items, so the icon is **vertically centered on the line box**, not baseline-aligned.
- The slot (`data-framer-name="heading-icon"`) is a fixed square. The media inside it is `position: absolute` with negative insets, so it **bleeds past the slot**. The slot reserves space in the line, while the visible art is larger.
- `border-radius: 0` everywhere (slot, wrapper and media) with `overflow: visible`.
- Videos use `object-fit: cover`; PNGs use `object-fit: contain`.
- All media have **transparent backgrounds** (alpha 0 at frame corners). No box or tile is drawn behind them.
- On Services and FAQ, the clipping ancestor `text-container` (`overflow: clip`, 108px tall) contains the 80px bleed.

**Media**

| File | Used in | Content | Loop | Playback |
|---|---|---|---|---|
| `XJyunLsL9WuQqZqfdV98gZYPUw.mp4` | Hero line 1 | White retro-computer robot (smiling screen face, orange feet) running in place | 0.8s | autoplay, muted, loop |
| `tHpPGk32ZqSdaw1fi2tiixuNv0.mp4` | Hero line 2 | Green quilted wallet with pink/orange cards; silver coins drop into it | 4.0s | autoplay, muted, loop |
| `FaJH6bsACdwdlZHzfwyRdYRM4.mp4` | Services H2 | Sticker-covered retro desktop computer and keyboard; the screen cycles from a smiling face to "Hello World" | 5.0s | `autoplay` false: idle (`readyState 0`) off-screen, plays once scrolled into view; muted, loop |
| `HbX2hOjH9s7kNe0G6Xw5u6jrMs.mp4` | FAQ H2 | White quad-copter drone carrying a cardboard parcel; propellers spin | 2.5s | autoplay, muted, loop |
| `Cr4ypQSJ7oBf0L3dhVBkcrWkCM.mp4` | `/404` media area (300×300, not inline) | Sticker-covered cardboard box ("FRAGILE", "KEEP DRY") with a chattering cartoon mouth | 3.33s | autoplay, muted, loop |
| `WdsQAV7G5L5k3omTX3n5lRzGDE.png` | About "FINDIND ▢ MEANING" | The same retro robot, jumping with arms raised | static | — |
| PNGs | Home Projects H2 | Keyboard cut-out (line 1); apple covered in stickers (line 2) | static | — |

All videos are 1200×1200 sources.

**Sizes per breakpoint.** In this table:
- **Slot** is the reserved square.
- **Media** is the rendered art.
- **Offset** is the media's position relative to the slot.
- **Gap** is the flex gap to the neighbouring words.

| Heading | Viewport | Font (size/LH) | Slot | Media | Offset (x, y) | Gap | Row height |
|---|---|---|---|---|---|---|---|
| Hero line 1 | 1440 / 1100 | 50/60 | 60×60 | 70×70 video | −5, −5 | **4px** | 60 |
| Hero line 2 | 1440 / 1100 | 50/60 | 60×60 | 70×70 video | −5, −5 | 8px | 60 |
| Hero line 1 | 390 | 40/48 | 50×50 | 60×60 video | −5, −5 | 4px | 99 (row wraps) |
| Hero line 2 | 390 | 40/48 | 50×50 | 60×60 video | −5, −5 | 8px | 50 |
| Projects H2 (both lines) | 1440 | 40/48 | — (wrapper is `display: contents`) | 60×60 PNG | 0, 0 | 8px | 60 |
| Projects H2 (both lines) | 390 | 30/36 | — | 40×40 PNG | 0, 0 | 8px | 40 |
| Services H2 | 1440 / 1100 | 40/48 | 60×60 | 80×80 video | −10, −10 | 8px | 60 |
| Services H2 | 390 | 30/36 | 40×40 | 40×40 video | 0, 0 (no bleed) | 8px | 40 |
| FAQ H2 | 1440 / 1100 | 40/48 | 60×60 | 80×80 video | −10, **−15** (sits 5px higher) | 8px | 60 |
| FAQ H2 | 390 | 30/36 | 40×40 | 60×60 video | −10, −15 | 8px | 40 |
| About "FINDIND ▢ MEANING" | 1440 | 30/36 | 50×50 | 60×60 PNG | −5, −5 | 8px | 50 |
| About "FINDIND ▢ MEANING" | 390 | 22/26.4 | 50×50 | 60×60 PNG | −5, −5 | 8px | 50 |

At 390 the hero H1 wraps to three lines: "DESIGN THAT ▢" / "SPEAKS LOUDER" / "▢ THAN WORDS!".

### 7.5 Card and image aspect ratios
Image cards use a **fixed height with fluid width**, so the aspect ratio changes with the breakpoint. All are `object-fit: cover` and square-cornered.

| Image | 1440 (w×h, ratio) | 1100 | 390 |
|---|---|---|---|
| Home work-ticker slide | 800×518.9 (1.542) inside an 800×540.9 card | same | 374×242.6 (1.542) inside 374×264.6 |
| Project card, full-width (home and `/projects`) | 1152×545 (2.114) | 1052×545 (1.930) | 370–374×545 (≈0.68) |
| Project card, half-width (home 2-up) | 564×545 (1.035) | 514×545 (0.943) | stacked full-width (above) |
| Testimonial video card (tall) | 362×600 (0.603) | 353.3×585.6 (0.603) | 370×613.3 (0.603); scales with width |
| Testimonial video card (middle column) | 362×549.2 (0.659) | 353.3×536.1 (0.659) | — |
| Blog/article card image (home, collection detail, article "same series") | 329.3×454.8 (0.724) | 322.7×454.8 (0.710) | 370×454.8 (0.814) |
| `/articles` featured card | 988×454.8 (2.172) | 988×454.8 | — |
| `/articles` grid card | 325.3×454.8 (0.715); one card 435.6 tall (0.747) | 491×454.8 (1.080) | 378×454.8 (0.831) |
| `/collection` card | 673×966.6 (0.696) | UNKNOWN | 358×491.2 (0.729) |
| Article hero image | 904×471.2 (1.919) | UNKNOWN | 358×350 (1.023) |
| Case-study hero | 1200×700 (1.714) | UNKNOWN | 370×500 (0.740) |
| Case-study gallery image | 1104×600 (1.840) | UNKNOWN | 338×300 (1.127) |
| About profile card (PNG, rotated −4°) | 434.2×567.9 (0.765) | UNKNOWN | UNKNOWN |
| Footer collage (one per side) | 412×630 (0.654) | 360×450 (0.800) | 390×200 (1.950) |
| Contact Cal.com iframe | 1104×570 | UNKNOWN | UNKNOWN |
| 404 media | 300×300 (1.0) | UNKNOWN | UNKNOWN |

### 7.6 Icon sizes
Rendered px at 1440; the same at 1100 and 390 unless noted.

| Icon | Size | Notes |
|---|---|---|
| Nav and footer link arrow ↗ (`image-container`) | 18×18 | PNG (73×72 source); appears right of the label on hover |
| ⌘ / K keycaps in "LET'S TALK" (`symbol`) | keycap radius 6px; inner glyph SVG 8×8 | |
| Pill-button trailing icon (`icon-container`: SCHEDULE CALL Google Meet logo, ALL COLLECTIONS / BACK TO HOMEPAGE arrow) | 22×22 | `object-fit: contain` |
| Hero client-logo swapper logos | 38×38 | 2 stacked per slot |
| Ticker slide label logos | 10×10 | |
| Hero bottom-bar badge icons (`01`–`04`) | 16×16 | |
| Intro-testimonial avatars | 50×50 | |
| Projects H2 inline PNGs | 60×60 (390: 40×40) | §7.4 |
| How-it-works 3D icons | 70×70 | `contain` |
| `/about` and `/projects` stat 3D icons | 70×70 | |
| Testimonial play glyph (SVG) | 53×64 | |
| Tweet-card avatar | 40×40, radius 100px | |
| Tweet-card verified tick | 12×12 | |
| Tweet-card X logo | 18×18 | top-right |
| Traffic-light dots | 3 × 12×12, 7px gap (50×12 group) | §3 Home |
| FAQ question-bubble icon (SVG, viewBox 24) | 33.6–35.6 square | wrapper radius 24px |
| FAQ ⊕ / ⊖ glyph | 12×12 | |
| FAQ bubble tail (`Ear`) | Grey 17×25; Blue (answer) 15.3×22.5 | |
| FAQ star decoration | UNKNOWN | SVG filled `#FED95E` |

---

## 8. Breakpoints

Taken from Framer's `__framer__breakpoints` and the CSS `@media` rules:

| Name | Range | Observed differences |
|---|---|---|
| Desktop | ≥ 1400px | Base layout; footer variant `Desktop` |
| Tablet | 810 – 1399.98px | Desktop nav is kept; footer variant `Tablet`; testimonials side padding 50 → 10px; `/articles` grid 3 → 2 columns; fluid widths (e.g. 1100px testimonials container at 1100px viewport); footer collages 360×450 |
| Phone | ≤ 809.98px | `Mobile-01` fixed nav with MENU overlay; footer `Mobile` (collages 390×200); hero H1 50 → 40px; section H2 40 → 30px; heading icons shrink (§7.4); projects stacked; single-column testimonials, blog and `/articles`; section padding 80 → 48px; page height grows (8478 → ~12–13k px) |

Above 1400px (tested at 1920) the layout is fixed-width and centered, with no further scaling.

---

## 9. Animations & interactions

Each entry gives the **trigger**, the **behavior**, and the **timing**. Easing and duration come from Framer config or WAAPI unless marked "observed ≈".

### 9.1 Page load (home hero, Framer "appear" animations)
Delays count from hydration. In the recording the WAAPI clock began ~1.3s after navigation, so absolute start times are approximate.

| Element | Behavior | Timing |
|---|---|---|
| Hero ruler columns (left / right) | opacity 0.001→1, x −10→0 (left) / +10→0 (right) | spring, duration 0.5s, bounce 0, delay 1.4s |
| Hero headline block | scale 1.4→1 (desktop) / 1.2→1 (tablet) / 1.1→1 (phone), y 20→0 | tween 0.7s, delay 0.9s, ease `cubic-bezier(0.76, 0, 0.38, 1.01)` |
| Headline words (each word: DESIGN, THAT, SPEAKS, LOUDER, THAN, WORDS!) | opacity 0.001→1, blur 2px→0, x −20→0 | 0.5s each, `cubic-bezier(0, 0, 0, 1)`, staggered ≈100ms per word (delays 100, 200, 300 … 800ms) |
| Headline inline video icon, line 1 | scale 0→1 | tween 0.8s, delay 0.8s, ease `cubic-bezier(1, 0, 0, 1)` |
| Headline inline video icon, line 2 | scale 0→1 | tween 0.8s, delay 1.0s, same ease |
| Subcopy | opacity 0.001→**0.6** | spring 0.5s, bounce 0, delay 1.4s |
| SCHEDULE CALL CTA | opacity 0.001→1 | spring 0.5s, bounce 0, delay 1.4s |
| Client logo strip | opacity 0.001→1 | spring (stiffness 150, damping 40, mass 1), delay 1.4s; resolves in ≈1.3s |
| Work ticker | opacity 0.001→1, x 20→0 | spring 0.5s, bounce 0, delay 1.4s |
| Hero bottom bar | opacity 0.001→1, y 20→0 | spring 0.5s, delay 1.4s |
| "ON YOUR SIDE" clock | visibility hidden→visible once filled client-side | instant |
| Framer "Made in Framer" badge (platform) | opacity 0→1, y 10→0 | observed ≈600ms |

Other pages have no load-time hero animations. `/about` has a single appear config (a heading-icon scale 0→1, 0.8s, `cubic-bezier(1,0,0,1)`). Other templates have none.

### 9.2 Continuous / ambient

| Element | Trigger | Behavior | Timing |
|---|---|---|---|
| Home work ticker (`ul`) | Always | Translates left, infinite loop. **Does not pause on hover**; slides have no hover cursor. | `translateX(0 → −3240px)` over **108s**, linear (≈30px/s) |
| Article "same series" ticker | Always | Same marquee of related cards | `translateX(0 → −2013px)` over **67.1s**, linear (≈30px/s) |
| Hero / Projects client-logo swapper (4 slots) | Timer, ≈every 5s (observed swaps at t≈3.9s and t≈8.9s) | Each slot crossfades between two logos. The incoming logo scales from ~0 to 1 and fades 0→1, and the outgoing one does the reverse. The caption slides `translateX(−50%)`. | opacity 400ms spring; transforms observed ≈430ms |
| "ON YOUR SIDE" clock (visitor's local time, `h:mm AM/PM`) | Timer | Updates to the current time | exactly on each minute boundary (:00) |
| "ON THIS SIDE" clock (`h:mm PM GMT +9:00`) | Load only | Computed once at load and **never updates** (unchanged for >3 min). Server HTML holds a build-time placeholder ("4:14 PM GMT +9:00"). | — |
| Inline heading videos | Autoplay (Services video: on entering view) | Muted loop (§7.4) | 0.8–5.0s loops |
| About profile card | Always (idle) | Float: translateY 0 → −5px → 0, with a constant `rotate(-4deg)` | period ≈4.0s (observed) |
| How-it-works icons (keyboard, headphones) | Always (idle) | Float: translateY 0 → −5px → 0. The computer icon does not float. | periods ≈2.65s / ≈2.85s (observed) |

### 9.3 Scroll-triggered (fire when the element enters the viewport)

| Element | Behavior | Timing | Replays? |
|---|---|---|---|
| Section heading groups (eyebrow + H2) in How it works, Services, Testimonials, Blog, FAQ | opacity 0→1, y 30→0 (JS-driven, not WAAPI) | Spring-like, decelerating, no overshoot. Opacity reaches ≈24% at 0.11s, 56% at 0.26s, 75% at 0.40s, 87% at 0.54s, 93% at 0.69s and 97% at 0.90s. y reaches 0 at ≈1.04s, and everything settles by ≈1.4s. Exact spring parameters UNKNOWN. | **Yes**: restarts from opacity 0 on re-entry |
| Projects heading "THE PROJECTS BEHIND THE PIXELS" | opacity 0→1, y 20→0 | observed ≈0.3–0.8s; exact UNKNOWN | UNKNOWN |
| Heading inline icons (Services "FOR BRANDS ▢ THAT", FAQ "WHAT ▢ THE FAQS", About "FINDIND ▢ MEANING") | scale 0→1 | 0.8s, `cubic-bezier(1, 0, 0, 1)`, delay 0 | UNKNOWN |
| Stat counters (home €M; About and Projects €300M / 100% / 2,000+) | Count up from 0 (text changes; thousands separator, e.g. "1,000+") | **≈2.0s, ease-in-out (sine-shaped)**: ≈7% at ⅙ of the time, 25% at ⅓, 50% at ½, 74% at ⅔, 93% at ⅚ | **Yes**: resets to 0 when scrolled out and counts again on re-entry (home and `/about`) |
| Hero badge stepper (bottom bar center) | **Scroll-gated autoplay timer.** While the page is scrolled past a threshold between ≈350 and ≈450px, it steps forward one badge every ≈3.0s: the current badge slides up out of view (y 20→−80) and the next slides in (y 120→20). It **cycles** 1→2→3→4→1 and never steps backward. Idle at the top, it never steps. | Interval ≈3.0s (3.00–3.04s observed); slide 550–587ms (median ≈558ms, observed) | See note below |
| About quote ("IF YOU THINK GOOD DESIGN…") | Per-character opacity 0.1→1, progressing as the user scrolls (scroll-linked, not time-based) | Tied to scroll progress | Yes, scroll-linked |
| `/articles` grid | Lazy-loads more cards (5 → 12 links) with a rotating conic spinner (`Loading > Spinner > Conic`, rotate ~320° per ≈3.9s observed) | UNKNOWN exact | n/a |
| Article ticker section | opacity 0→1 when mounted | instant | — |

**Badge stepper timing** (measured with frame-by-frame position logging in headed and headless Chrome):
- **Idle at the top (scrollY 0) for 60s:** 0 steps; OFFICIAL FRAMER EXPERT stays visible.
- **Jump to 500px, then idle:** the first step came ≈1.7s after the jump. After that, steps came every ≈3.0s: OFFICIAL → CONTRA → AWWWARDS → NYT → OFFICIAL → CONTRA.
- **Scroll to 500px for ≈5s, then back to the top:** one more step was already under way when the page returned to the top; after that there were no further steps.
- **No step below the threshold:** a jump to 350px, a slow creep to 240px, and idling at the top never triggered a step.
- **Scroll position only gates the timer.** When scrolling down slowly, steps still land on the ≈3.0s timer, not at particular positions.
- **Slide motion:** each step takes 550–587ms (median ≈558ms) from first movement to rest.
- **Still UNKNOWN:** the exact gating condition (scroll offset vs. some element's viewport visibility) and the easing of the slide.

### 9.4 Hover

| Element | Behavior | Timing |
|---|---|---|
| Nav links (HOME, WORK, ABOUT, ARTICLES) | Text opacity 0.6→0.8. An 18px ↗ arrow sits directly right of the label, parked 20px below its slot and hidden by the link's `overflow: clip`; on hover it slides up 20px → 0. Reverses on leave. | Opacity 400ms `cubic-bezier(1, 0, 0, 1)`. The arrow follows the same curve: ≈1% at 70ms, 5% at 140ms, 23% at 208ms, 92% at 276ms, done ≈410ms (observed). |
| Footer links | The same 18px ↗ arrow appears beside the label | ≈380ms (observed) |
| "LET'S TALK" button | bg `#101010` → `#2D3AF0`; keycaps bg `#303030` → `#5287E9`, border → `#6C9FFF`. While hovered, the keycaps **bob in a loop** (JS-driven): translateY 0 → −2px → 0. ⌘ and K have different periods, so they drift out of phase. On leave the bg eases back, while the keycap colors snap back instantly. | bg and keycap colors ease in over ≈400ms on the same curve as the nav links; bg eases back ≈400ms on leave (observed); bob period ⌘ ≈2.45s, K ≈2.65s (observed); bob easing UNKNOWN |
| "SCHEDULE CALL" / "ALL COLLECTIONS" / "BACK TO HOMEPAGE" pills | Trailing icon grows 22→25px and shifts ≈31px right | ≈400ms (observed); easing UNKNOWN |
| Project cards (home, /projects) | Tagline `top-container` opacity 0.2→1. The image scales 1.1× (1152→1267.2px). A black "VIEW CASE STUDY" tab appears top-right. The 0.2 `#101010` overlay is unchanged. | Opacity 400ms `cubic-bezier(1, 0, 0, 1)`. The scale takes ≈350ms on a strong ease-in-out (≈5% at 144ms, 26% at 211ms, 93% at 278ms), consistent with `cubic-bezier(1, 0, 0, 1)` but the exact curve is UNKNOWN. Tab ≈400ms (observed). |
| Article cards (home, /articles, collections) | A white "READ ARTICLE" label strip appears under the image's bottom-right | ≈400ms (observed) |
| Collection cards | "OPEN COLLECTION" label (same pattern) | ≈400ms (observed) |
| Testimonial video cards | The poster, play glyph and name overlay are replaced by the muted testimonial video, playing without controls (e.g. `1102405_1080p_Blogger_1280x720_tifm8k.mp4`). Leaving removes the video and restores the poster. | instant (variant swap, no transition seen) |
| FAQ question bubble | bg `#101010` → `#202020`; text `#F0F0F0` → `#C4C4C4` (opacity 0.8); ⊕ gets a `#2D3AF0` fill | instant (no transition observed) |
| Footer collage images, logo, category links, credit link | No visual change detected | — |

### 9.5 Click / keyboard

| Element | Behavior | Timing |
|---|---|---|
| FAQ question (click) | Opens a blue right-aligned answer bubble below it (opacity 0→1, blur 8px→0). The ⊕ turns into a filled blue ⊖ (SVG line strokes animate). The section grows (641 → 700px for Q1). | answer 500ms spring; icon ≈360ms |
| FAQ, open question (click again) | Closes it (section 699.6 → 641.2px) | — |
| FAQ, multiple open | Several questions can be open at once (opening a second added height, 700 → 803px) | — |
| FAQ question (keyboard) | Enter on a focused question opens it. A second Enter, or Space on another question, had no effect. Closing with the keyboard was not observed. | — |
| Mobile MENU | Full-screen overlay fades in; label MENU → CLOSE; icon line strokes animate; `html` scroll-locked. **Escape does not close it.** | overlay opacity 300ms `cubic-bezier(0.5, 0, 0.88, 0.77)`; icon ≈390ms |
| Mobile CLOSE | Reverses the overlay | ≈370ms (observed) |
| ⌘K | Navigates to `/contact` | immediate |
| Testimonial video card click | Nothing happens: no unmute, pause, modal or navigation. The video keeps playing muted. | — |
| Page-to-page transitions | Client-side navigation. Framer calls `document.startViewTransition()` once per navigation, and the site defines no custom `view-transition` CSS, so Chrome's default View Transition cross-fade applies. | duration and easing UNKNOWN (browser default; not measured) |
| Cal.com embed | Third-party booking UI (date and slot selection) | out of scope |

### 9.6 Focus states
- **The site defines no focus styles.** The stylesheets have no `:focus` or `:focus-visible` rules. Every focusable element shows Chrome's default ring: `outline: auto 1px rgb(0, 95, 204)`, offset 1px on links and 0px on `tabindex` divs, and no box-shadow. The ring follows the element's border-radius (pill-shaped on 100px buttons).
- **Focus does not trigger hover visuals.** A focused LET'S TALK stays `#101010`, the keycaps don't bob, and pill icons don't move.
- **Desktop tab order (home, 1440):**
  1. Logo
  2. Nav links: HOME, WORK, ABOUT, ARTICLES
  3. LET'S TALK
  4. Hero SCHEDULE CALL
  5. The 3 project cards
  6. How-it-works SCHEDULE CALL
  7. For each blog card: the image link, then its category link
  8. ALL COLLECTIONS
  9. The 5 FAQ questions
  10. FAQ SCHEDULE CALL
  11. Footer links: HOME, WORK, ABOUT, ARTICLES, then MADE WITH ❤️ BY MOYIN, then POLICY, 404, CONTACT, TERMS
  12. The Framer badge
  13. Body, then the order wraps to the logo
- **Not focusable:** ticker slides, testimonial cards, service cards and the clocks.
- **Mobile (390):** tab order starts at the logo, then the MENU toggle.

---

## 10. UNKNOWNs (consolidated)

- Exact spring parameters of the section-heading scroll reveals; exact timing of the Projects heading reveal.
- Whether the heading-icon scale-in (Services, FAQ, About) and the Projects heading reveal replay on re-entry.
- Pill trailing-icon hover easing; the exact project-card image-scale curve.
- The badge stepper's exact gating condition (somewhere between ≈350 and ≈450px of scroll) and its slide easing.
- View-transition duration and easing.
- Image sizes at 1100 for `/collection`, article hero and case-study images; the profile card at 1100 and 390; the Cal.com iframe and 404 media at 1100 and 390; the size of the FAQ star decoration.
- Whether `#ECECEC` / `#2D3AF01A` appear in any client-side-only variant.
- Closing an FAQ question with the keyboard; Space-key behaviour on FAQ questions.
- Exact lazy-load trigger and spinner timing on `/articles`.
