import { Eyebrow } from "@/components/ui/SectionHeading";
import { EDGES } from "@/lib/styles";

/**
 * Quote hero of /projects, /about and /contact (AUDIT.md §3): eyebrow and an
 * H1 quote at opacity 0.8, then optional content (e.g. client logos). On
 * phones the quote drops to 30/36 and the heading gets 100px of top padding
 * to clear the fixed nav.
 */
export function PageHero({
  eyebrow,
  lines,
  children,
}: {
  eyebrow: string;
  /** The quote, one entry per line. */
  lines: string[];
  children?: React.ReactNode;
}) {
  return (
    <header className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
      <div className="flex w-full max-w-250 flex-col items-center gap-20 px-4 py-12 tablet:px-12 tablet:py-20">
        <div className="flex flex-col items-center gap-4 overflow-clip pt-25 tablet:pt-0">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="flex max-w-225 flex-col items-center text-center text-h2-sm uppercase opacity-80 tablet:text-display">
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </div>
        {children}
      </div>
    </header>
  );
}
