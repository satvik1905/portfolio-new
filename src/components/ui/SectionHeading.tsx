import { MediaPlaceholder, type MediaPlaceholderProps } from "@/components/MediaPlaceholder";
import { HeadingReveal, ScaleIn } from "@/components/motion/Reveal";

type Tone = "light" | "dark";

/** Mono eyebrow above section headings (AUDIT.md §6 "Nav / eyebrow"), at opacity 0.5. */
export function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <p className={`font-jetbrains text-eyebrow opacity-50 ${tone === "dark" ? "text-ink-inverse" : "text-ink"}`}>
      {children}
    </p>
  );
}

/**
 * Eyebrow + H2 group with the scroll reveal (AUDIT.md §9.3). Section H2s are
 * 40/48 (30/36 on phones), weight 900, uppercase.
 */
export function SectionHeading({
  eyebrow,
  children,
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <HeadingReveal className={`flex flex-col items-center gap-4 overflow-clip ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`flex flex-col items-center text-center text-h2-sm uppercase tablet:text-h2 ${
          tone === "dark" ? "text-ink-inverse" : "text-ink"
        }`}
      >
        {children}
      </h2>
    </HeadingReveal>
  );
}

/**
 * Inline heading icon (AUDIT.md §7.4): a square slot that reserves space in
 * the line, with media that bleeds past it. D16: slot and bleed are sized in
 * em of the heading, so pass em classes for both. The media scales in from 0.
 */
export function HeadingIcon({
  slotClassName,
  mediaClassName,
  asset,
  tone = "light",
  onLoad = false,
  delay = 0,
}: {
  slotClassName: string;
  mediaClassName: string;
  asset: Pick<MediaPlaceholderProps, "name" | "exportSize" | "type">;
  tone?: Tone;
  onLoad?: boolean;
  delay?: number;
}) {
  return (
    <span aria-hidden="true" className={`relative inline-flex shrink-0 ${slotClassName}`}>
      <ScaleIn onLoad={onLoad} delay={delay} className={`absolute z-1 ${mediaClassName}`}>
        <MediaPlaceholder {...asset} tone={tone} className="size-full" />
      </ScaleIn>
    </span>
  );
}
