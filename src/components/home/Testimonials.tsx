"use client";

import { useState } from "react";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Ruler } from "@/components/ui/Ruler";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDGES } from "@/lib/styles";

type Video = { kind: "video"; name: string; role: string; asset: string; tall: boolean; phone: boolean };
type Tweet = { kind: "tweet"; name: string; handle: string; avatar: string; body: string; time: string; date: string };
type Card = Video | Tweet;

/** Masonry columns (AUDIT.md §3 home §13). Phones drop the Ethan and Sophia video cards. */
const COLUMNS: Card[][] = [
  [
    { kind: "video", name: "Isabelle Tran", role: "Founder & CEO", asset: "testimonial-isabelle-tran", tall: true, phone: true },
    {
      kind: "tweet",
      name: "Noah Bennett",
      handle: "@noahben",
      avatar: "avatar-noah-bennett",
      body: "Can’t recommend Martin enough. He took our messy brief and turned it into something way better than anything we could have imagined.",
      time: "07:28 AM",
      date: "Sep 23, 2025",
    },
  ],
  [
    {
      kind: "tweet",
      name: "Clara Montrose",
      handle: "@thisisclara",
      avatar: "avatar-clara-montrose",
      body: "We’ve worked with several designers before, but Martin’s process was next-level. Clear updates, fast turnarounds, and genuinely beautiful results.",
      time: "12:11 PM",
      date: "Aug 18, 2025",
    },
    { kind: "video", name: "Ethan Reeves", role: "Co-founder", asset: "testimonial-ethan-reeves", tall: false, phone: false },
    {
      kind: "tweet",
      name: "Elena Walters",
      handle: "@elenawals",
      avatar: "avatar-elena-walters",
      body: "If you want your product to feel premium, Martin’s your guy.",
      time: "08:04 PM",
      date: "Jul 26, 2025",
    },
  ],
  [
    { kind: "video", name: "Sophia Patel", role: "Product Lead", asset: "testimonial-sophia-patel", tall: true, phone: false },
    {
      kind: "tweet",
      name: "Felix Grant",
      handle: "@felix.grant",
      avatar: "avatar-felix-grant",
      body: "It’s wild how effortless collaboration felt. Martin took our rough concept and turned it into something we’re proud to show investors.",
      time: "09:21 AM",
      date: "Oct 10, 2025",
    },
  ],
];

/**
 * Video card (AUDIT.md §9.4): on hover the poster, play glyph and name are
 * swapped for the muted testimonial video, instantly. Clicking does nothing.
 * Aspect ratio is fixed (0.603 tall, 0.659 middle column), so it scales with width.
 */
function VideoCard({ card }: { card: Video }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={`relative w-full flex-col justify-end gap-0.5 overflow-clip p-6 ${
        card.tall ? "aspect-[362/600]" : "aspect-[362/549.2]"
      } ${card.phone ? "flex" : "hidden tablet:flex"}`}
    >
      {hovered ? (
        <MediaPlaceholder
          name={`${card.asset}-video`}
          exportSize="1280×720"
          type="MP4"
          tone="dark"
          showLabel
          className="absolute inset-0 z-3 size-full"
        />
      ) : (
        <>
          <MediaPlaceholder
            name={`${card.asset}-poster`}
            exportSize="362×600"
            type="JPG"
            tone="dark"
            showLabel
            className="absolute inset-0 size-full"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 z-2 bg-linear-to-b from-[rgba(32,32,32,0)] to-night-hover"
          />
          <MediaPlaceholder
            name="play-glyph"
            exportSize="53×64"
            type="SVG"
            tone="dark"
            className="absolute top-1/2 left-1/2 z-2 h-16 w-13.25 -translate-1/2"
          />
          <p className="relative z-2 text-name text-ink-inverse">{card.name}</p>
          <p className="relative z-2 text-body-sm text-ink-inverse opacity-50">{card.role}</p>
        </>
      )}
    </div>
  );
}

/** X/Twitter-style card (AUDIT.md §3 home §13, §7.6). */
function TweetCard({ card }: { card: Tweet }) {
  return (
    <figure className="relative flex w-full flex-col gap-4.5 bg-night-hover p-3.5">
      <figcaption className="flex items-center gap-2">
        <MediaPlaceholder name={card.avatar} exportSize="40×40" type="JPG" tone="dark" className="size-10 rounded-pill" />
        <span className="flex flex-col">
          <span className="flex items-center gap-1">
            <span className="text-tweet-name text-ink-inverse">{card.name}</span>
            <MediaPlaceholder name="verified-tick" exportSize="12×12" type="SVG" tone="dark" className="size-3" />
          </span>
          <span className="text-tweet-meta text-muted opacity-30">{card.handle}</span>
        </span>
      </figcaption>
      <MediaPlaceholder
        name="x-logo"
        exportSize="18×18"
        type="SVG"
        tone="dark"
        className="absolute top-3.75 right-3.75 z-1 size-4.5"
      />
      <blockquote className="relative z-1 text-body-sm text-ink-inverse opacity-80">{card.body}</blockquote>
      <p className="flex gap-0.75 text-tweet-meta text-muted">
        <span>{card.time}</span>
        <span aria-hidden="true">.</span>
        <span>{card.date}</span>
      </p>
    </figure>
  );
}

/** Home testimonials wall (AUDIT.md §3 home §13), with the bottom fade-to-black overlay. */
export function Testimonials() {
  return (
    <section className={`flex w-full justify-center overflow-hidden bg-night ${EDGES} after:border-b`}>
      <div className="relative flex w-full max-w-301.5 flex-col items-center gap-20 bg-black px-2.5 py-12 tablet:py-20 desktop:px-12.5">
        <Ruler side="left" tone="black" height={1440.5} />
        <Ruler side="right" tone="black" height={1440.5} />

        <SectionHeading eyebrow="TESTIMONIALS" tone="dark">
          <span>Trusted by extraordinary</span>
          <span>people worldwide.</span>
        </SectionHeading>

        <div className="flex w-full flex-col items-start gap-2.5 overflow-clip tablet:flex-row">
          {COLUMNS.map((column, i) => (
            <div key={i} className="flex w-full flex-1 flex-col items-center gap-3.5 overflow-clip">
              {column.map((card) =>
                card.kind === "video" ? (
                  <VideoCard key={card.name} card={card} />
                ) : (
                  <TweetCard key={card.name} card={card} />
                ),
              )}
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1 bg-black opacity-90 mask-[linear-gradient(transparent_0%,transparent_55%,#000_100%)]"
        />
      </div>
    </section>
  );
}
