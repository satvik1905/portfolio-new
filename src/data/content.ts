/**
 * Site content (D7): case studies, articles and collections. Copy is the
 * template's, verbatim (D6) — never deploy it publicly. Images are D5
 * placeholders, described by their slot rather than a file.
 */

/** A D5 placeholder image: asset name, export size and type. */
export type Media = { name: string; exportSize: string; type: string };

/** A body paragraph: plain text runs and italic (`em`) runs, in order. */
export type Paragraph = (string | { em: string })[];

export type Collection = {
  slug: string;
  name: string;
  /** Meta description of the collection-detail page. */
  description: string;
  date: string;
  cardImage: Media;
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  heroImage: Media;
  body: Paragraph[];
  /** Slug of the article's one collection; its name is the card category. */
  collection: string;
  /** Exactly one article is featured: the wide card on /articles. */
  featured: boolean;
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  /** Discipline label on project cards; same text as `workDone`. */
  discipline: string;
  heroImage: Media;
  role: string;
  year: string;
  duration: string;
  workDone: string;
  problem: string;
  solution: string;
  gallery: Media[];
};

const image = (name: string, exportSize: string, type = "JPG"): Media => ({ name, exportSize, type });

export const collections: Collection[] = [
  {
    slug: "the-redesign-series",
    name: "The Redesign Series",
    description: "A visual deep dive into before-and-after transformations. Exploring how small design decisions can completely reshape a brand’s story.",
    date: "October 6, 2025",
    cardImage: image("collection-the-redesign-series", "673×967"),
  },
  {
    slug: "building-in-framer",
    name: "Building in Framer",
    description: "A behind-the-scenes look at designing, prototyping, and publishing directly inside Framer.",
    date: "October 6, 2025",
    cardImage: image("collection-building-in-framer", "673×967"),
  },
  {
    slug: "design-ai",
    name: "Design + AI",
    description: "Exploring how AI is shaping modern creativity and what it means for designers.",
    date: "October 6, 2025",
    cardImage: image("collection-design-ai", "673×967"),
  },
  {
    slug: "general-design",
    name: "General Design",
    description: "Short reflections and personal insights from projects and experiments.",
    date: "October 6, 2025",
    cardImage: image("collection-general-design", "673×967"),
  },
];

export const articles: Article[] = [
  {
    slug: "designing-for-trust",
    title: "Designing for Trust",
    date: "October 6, 2025",
    heroImage: image("article-designing-for-trust", "904×471"),
    body: [
      ["Trust isn’t built through words alone — it’s designed. Every color choice, font weight, or microinteraction quietly shapes how people feel about a brand. In a world crowded with digital noise, users instinctively judge credibility within seconds. And those few seconds can define whether they stay or leave."],
      ["Good design doesn’t just look appealing; it communicates reliability. Visual consistency, intuitive layouts, and subtle feedback loops (like a loading animation that reassures users something’s happening) all work together to build confidence. When users feel guided rather than confused, they start to trust the brand’s intentions — and by extension, its product."],
      ["Trust also lives in the small moments: how transparent a pricing page feels, how clearly a CTA communicates, or how thoughtfully empty states are handled. These invisible cues tell users, ", { em: "“You’re in good hands.”" }],
      ["Designing for trust means combining clarity with warmth. Clean typography, accessible colors, and thoughtful hierarchy make users feel respected. Brands that embrace honesty in design — avoiding dark patterns, deceptive pop-ups, or fake urgency — earn long-term loyalty, not just quick conversions."],
    ],
    collection: "general-design",
    featured: true,
  },
  {
    slug: "the-power-of-first-impressions",
    title: "The Power of First Impressions",
    date: "October 6, 2025",
    heroImage: image("article-the-power-of-first-impressions", "904×471"),
    body: [
      ["The first few seconds on a website decide everything. Before users read a single word, they’ve already formed an opinion. That’s why the hero section isn’t just decoration — it’s your brand’s first handshake."],
      ["A strong hero balances clarity and intrigue. The headline should say what you do ", { em: "and" }, " why it matters, without trying too hard. The visuals should support, not overpower. Every pixel should guide attention, not compete for it. Because trust doesn’t come from flash — it comes from intention."],
      ["Memorable heroes make people feel something instantly. Whether it’s confidence, curiosity, or calm, the emotion you evoke defines what users remember. The best designs don’t scream for attention; they earn it quietly through precision, tone, and rhythm."],
    ],
    collection: "the-redesign-series",
    featured: false,
  },
  {
    slug: "turning-components-into-systems",
    title: "Turning Components into Systems",
    date: "October 6, 2025",
    heroImage: image("article-turning-components-into-systems", "904×471"),
    body: [
      ["The difference between a one-off design and a scalable system comes down to how you think about components. Reusable elements aren’t just shortcuts — they’re the backbone of creative consistency."],
      ["When every button, card, or section has a defined logic, your focus shifts from layout repetition to actual problem-solving. You can experiment faster, explore freely, and still maintain a cohesive look across projects. Systems give structure to creativity."],
      ["In Framer, this approach feels effortless. Each new project builds on the last, forming a personal design language that grows over time. It’s less about working faster, and more about thinking smarter — designing with reuse in mind so every idea compounds."],
    ],
    collection: "building-in-framer",
    featured: false,
  },
  {
    slug: "beyond-prompts-the-new-design-mindset",
    title: "Beyond Prompts: The New Design Mindset",
    date: "October 6, 2025",
    heroImage: image("article-beyond-prompts-the-new-design-mindset", "904×471"),
    body: [
      ["AI didn’t arrive to take our jobs. It arrived to challenge our habits. The old way of designing — sketching, refining, polishing — is evolving into something faster, more fluid, and more conversational. Prompts have become part of the creative process, but the real shift isn’t in tools; it’s in mindset."],
      ["Designers are no longer just making visuals — they’re shaping systems of intelligence. The skill now lies in directing machines with clarity, creativity, and intent. AI extends our reach, but it still needs our judgment. The most powerful prompt is not the one that sounds smart, but the one that thinks clearly."],
      ["The future of design isn’t human ", { em: "vs." }, " machine. It’s human ", { em: "through" }, " machine — a partnership that turns imagination into instant possibility."],
    ],
    collection: "design-ai",
    featured: false,
  },
  {
    slug: "the-portfolio-problem",
    title: "The Portfolio Problem",
    date: "October 6, 2025",
    heroImage: image("article-the-portfolio-problem", "904×471"),
    body: [
      ["Designing your own portfolio is one of the hardest things to do as a designer. You want to show skill, personality, and originality, but that pressure often leads to excess — too many animations, effects, and layouts fighting for attention. The result? A portfolio that impresses other designers, but confuses everyone else."],
      ["Most overdesigned portfolios are born from insecurity, not intention. They’re attempts to prove talent instead of communicate value. The truth is, great portfolios don’t try too hard. They flow naturally, guiding the viewer through work that speaks for itself. Simplicity is not about minimalism for its own sake — it’s about confidence, clarity, and purpose."],
      ["The best portfolios balance restraint and personality. They don’t hide behind aesthetics; they reveal thought. A type choice, a transition, a line of copy — each detail adds up to a feeling of trust. Because in the end, what people remember isn’t how clever your grid was, but how clearly they understood ", { em: "you" }, "."],
    ],
    collection: "general-design",
    featured: false,
  },
  {
    slug: "simplifying-for-clarity",
    title: "Simplifying for Clarity",
    date: "October 6, 2025",
    heroImage: image("article-simplifying-for-clarity", "904×471"),
    body: [
      ["Good design is as much about what you remove as what you add. Clarity comes from reduction — from stripping away everything that doesn’t serve a purpose. It’s not about minimalism as a style, but as a discipline."],
      ["When every element fights for attention, users lose direction. But when each piece has meaning, flow emerges naturally. The whitespace, the spacing, the restraint — they all tell a story of control. Clarity feels calm, and calm builds confidence."],
      ["Simplifying a layout often reveals what truly matters. The copy becomes sharper, the visuals breathe, and the message lands faster. The result is a design that doesn’t need to explain itself — it’s understood at a glance."],
    ],
    collection: "the-redesign-series",
    featured: false,
  },
  {
    slug: "my-framer-workflow",
    title: "My Framer Workflow",
    date: "October 6, 2025",
    heroImage: image("article-my-framer-workflow", "904×471"),
    body: [
      ["Every project begins with structure. Before color, typography, or interaction — there’s flow. I start in Framer by sketching quick wireframes, focusing only on layout and hierarchy. It’s where the story begins, and where most design problems are solved before they ever become visual."],
      ["Once the foundation feels right, I move into refining. Components, type styles, and responsive behavior all start to take shape inside Framer. The key is to treat it as both design and development — not a handoff, but a continuous build. The prototype ", { em: "is" }, " the final product."],
      ["By the time I hit publish, most of the process has already been lived inside the same tool. That’s what makes Framer so powerful — it blurs the line between design intention and implementation. You’re not designing in theory; you’re designing in reality."],
    ],
    collection: "building-in-framer",
    featured: false,
  },
  {
    slug: "when-machines-inspire-humans",
    title: "When Machines Inspire Humans",
    date: "October 6, 2025",
    heroImage: image("article-when-machines-inspire-humans", "904×471"),
    body: [
      ["The best ideas often start where control ends. When AI generates something unexpected — a layout, a form, a texture — it opens doors the human mind might never walk through alone. Instead of fearing automation, we can use it to rediscover creativity."],
      ["AI tools are mirrors of our curiosity. The more intentional the input, the more meaningful the surprise. Treating them as collaborators reframes the entire process: they provoke, we refine. They generate, we direct."],
      ["This new relationship turns creativity into conversation — one where inspiration moves both ways. Machines make suggestions; humans give them soul. Together, they create something neither could achieve alone."],
    ],
    collection: "design-ai",
    featured: false,
  },
  {
    slug: "from-drafts-to-launch",
    title: "From Drafts to Launch",
    date: "October 6, 2025",
    heroImage: image("article-from-drafts-to-launch", "904×471"),
    body: [
      ["Every launch begins as chaos. Sketches, half-baked concepts, notes that make no sense the next morning — that’s the real start. Design is rarely linear; it’s a dance between clarity and confusion, between vision and reality."],
      ["The magic happens in the iteration. Each round of feedback, every redesign that feels like a setback, is actually progress. The design becomes sharper not by avoiding mistakes, but by ", { em: "working through" }, " them."],
      ["What most people don’t see is that good design is a negotiation. Between what’s ideal and what’s possible. Between what you imagined and what users actually need. The best launches are those that carry the marks of their journey — thoughtful imperfections that show growth. Because once something ships, it’s no longer a design file. It’s a living experience."],
    ],
    collection: "general-design",
    featured: false,
  },
  {
    slug: "designing-for-emotion",
    title: "Designing for Emotion",
    date: "October 6, 2025",
    heroImage: image("article-designing-for-emotion", "904×471"),
    body: [
      ["The best websites don’t just look beautiful; they ", { em: "move" }, " people. Emotion is what makes design memorable — it’s the invisible thread that connects a brand to its audience."],
      ["Designing for emotion means understanding what your users care about, and shaping the experience around that feeling. Warm colors build comfort. Sharp contrasts build energy. Animation creates anticipation. Every design choice is an opportunity to make users feel seen."],
      ["It’s easy to focus on structure and usability, but emotion gives a design its soul. When users connect with what they see, they remember it. And in a world full of scrolling, remembrance is the real metric of success."],
    ],
    collection: "the-redesign-series",
    featured: false,
  },
  {
    slug: "animating-with-purpose",
    title: "Animating with Purpose",
    date: "October 6, 2025",
    heroImage: image("article-animating-with-purpose", "904×471"),
    body: [
      ["Animation isn’t decoration — it’s communication. The right motion draws attention, clarifies interactions, and makes digital experiences feel alive. The wrong motion distracts. The trick is knowing where movement adds meaning."],
      ["I start by asking one question: ", { em: "what’s the purpose?" }, " A fade that softens transitions, a hover that adds depth, or a subtle scroll reveal that guides the eye — each should serve the story. Motion should help users ", { em: "understand" }, " what’s happening, not just watch it."],
      ["Performance also matters. Smooth, lightweight animations feel invisible — they support flow rather than interrupt it. Framer’s built-in motion tools make this balance easier, letting design and performance coexist naturally. When done right, animation becomes less about style, and more about rhythm."],
    ],
    collection: "building-in-framer",
    featured: false,
  },
  {
    slug: "the-future-of-human-taste",
    title: "The Future of Human Taste",
    date: "October 6, 2025",
    heroImage: image("article-the-future-of-human-taste", "904×471"),
    body: [
      ["As AI becomes more capable, it’s also becoming more generic. Trends blend, aesthetics repeat, and sameness spreads at scale. The challenge for designers isn’t just to use AI — it’s to stay distinct ", { em: "within" }, " it."],
      ["Human taste will always be the differentiator. It’s shaped by context, culture, and emotion — things no dataset can fully understand. Taste is what decides which output feels right, which idea deserves refinement, and which detail tells a story."],
      ["The future of design belongs to those who train their judgment as much as their prompts. In a world where machines can make anything, it’s taste that will define everything."],
    ],
    collection: "design-ai",
    featured: false,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "modern-muse",
    title: "Modern Muse",
    tagline: "Designing for bold nostalgia",
    discipline: "Branding / Creative Direction",
    heroImage: image("modern-muse-hero", "1200×700"),
    role: "Product Designer",
    year: "2025",
    duration: "4 WEEKS",
    workDone: "Branding / Creative Direction",
    problem: "Most fashion platforms focus on trends, not timelessness. Modern Muse set out to celebrate enduring style — bridging the gap between classic aesthetics and modern digital experiences. The challenge was to design a platform that feels editorial yet effortless to navigate.",
    solution: "I crafted a minimal, high-contrast visual language inspired by fashion archives and museum curation. Subtle typography, muted tones, and structured layouts evoke elegance while keeping the focus on imagery. The result is a digital experience that feels both sophisticated and contemporary — where every scroll feels intentional and immersive.",
    gallery: [image("modern-muse-gallery-1", "1104×600"), image("modern-muse-gallery-2", "1104×600"), image("modern-muse-gallery-3", "1104×600"), image("modern-muse-gallery-4", "1104×600")],
  },
  {
    slug: "arctic-calm",
    title: "Arctic Calm",
    tagline: "Engineered warmth, elevated style.",
    discipline: "Branding & UI Design",
    heroImage: image("arctic-calm-hero", "1200×700"),
    role: "Visual Strategist",
    year: "2025",
    duration: "8 Weeks",
    workDone: "Branding & UI Design",
    problem: "Winter apparel brands often focus on performance but neglect emotional warmth. Arctic Calm wanted to change that — to craft a digital presence that feels as serene and confident as its jackets. The challenge was designing an e-commerce experience that balances technical excellence with calm, human-centered design.",
    solution: "I developed a minimalist visual direction centered on soft gradients, neutral tones, and generous whitespace. Every interaction, from product hover states to scroll animations, was designed to feel smooth and composed — mirroring the quiet strength of the brand. The result is a shopping experience that feels both premium and personal, translating the comfort of warmth into a digital space.",
    gallery: [image("arctic-calm-gallery-1", "1104×600"), image("arctic-calm-gallery-2", "1104×600"), image("arctic-calm-gallery-3", "1104×600"), image("arctic-calm-gallery-4", "1104×600"), image("arctic-calm-gallery-5", "1104×600")],
  },
  {
    slug: "clay-momentum",
    title: "Clay Momentum",
    tagline: "Precision meets passion",
    discipline: "Framer Development",
    heroImage: image("clay-momentum-hero", "1200×700"),
    role: "Framer Developer",
    year: "2025",
    duration: "6 weeks",
    workDone: "Framer Development",
    problem: "The activewear space is saturated with brands that prioritize performance but lack personality. Clay Momentum set out to redefine that — blending high-performance design with the grounded, tactile feel of natural materials. The challenge was to build a visual identity and digital experience that communicates energy, craftsmanship, and authenticity in equal measure.",
    solution: "I designed a digital experience rooted in texture and movement — pairing bold typography with clay-inspired color palettes and fluid motion design. Product pages focus on material stories and real-world use, giving each shoe a sense of identity and craft. The result is a brand that feels dynamic yet deliberate — designed for people who move with intention.",
    gallery: [image("clay-momentum-gallery-1", "1104×600"), image("clay-momentum-gallery-2", "1104×600"), image("clay-momentum-gallery-3", "1104×600"), image("clay-momentum-gallery-4", "1104×600"), image("clay-momentum-gallery-5", "1104×600")],
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function articlesInCollection(slug: string) {
  return articles.filter((article) => article.collection === slug);
}

