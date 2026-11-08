import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { CountUp, HeadingReveal } from "@/components/motion/Reveal";
import { ScheduleCallButton } from "@/components/ui/PillButton";
import { Eyebrow } from "@/components/ui/SectionHeading";

const STATS = [
  {
    icon: "stats-coin-jar",
    count: { to: 300, prefix: "€", suffix: "M" },
    color: "text-red",
    body: "Helping startups attract funding through clarity and craft.",
    bodyWidth: "max-w-72.5",
  },
  {
    icon: "stats-map",
    count: { to: 100, prefix: "", suffix: "%" },
    color: "text-accent",
    body: "of projects shipped before the deadline (with enough room for play)",
    bodyWidth: "max-w-72.5",
  },
  {
    icon: "stats-lunch-bag",
    count: { to: 2000, prefix: "", suffix: "+" },
    color: "text-green",
    body: "hours spent perfecting micro-interactions that most users will never notice",
    bodyWidth: "max-w-75",
  },
];

/**
 * "Big deal stats" (AUDIT.md §3 /projects §4, reused on /about): three
 * count-up stats with 70px icons, then SCHEDULE CALL. The template spaces
 * the middle column 22px throughout and the outer ones 22 / 10px; kept as is.
 * `className` sets the side padding (none when nested in /about's column).
 */
export function Stats({ className = "px-4 tablet:px-12" }: { className?: string }) {
  return (
    <div className="flex w-full justify-center">
      <div className={`flex w-full max-w-300 flex-col items-center gap-20 py-12 ${className}`}>
        <HeadingReveal className="flex flex-col items-center gap-4 overflow-clip">
          <Eyebrow>BIG DEAL STATS</Eyebrow>
          <h2 className="flex max-w-125 flex-col items-center text-center text-h3-sm uppercase tablet:text-h3">
            <span>From messy sketches to</span>
            <span>moments of clarity</span>
          </h2>
        </HeadingReveal>

        <ul className="flex w-full flex-col items-center gap-8 tablet:flex-row">
          {STATS.map((stat, i) => (
            <li key={stat.icon} className="flex w-full flex-col items-center gap-5.5 tablet:flex-1">
              <MediaPlaceholder name={stat.icon} exportSize="70×70" type="PNG" className="size-17.5" />
              <div className={`flex flex-col items-center ${i === 1 ? "gap-5.5" : "gap-2.5"}`}>
                <p className={`text-counter ${stat.color}`}>
                  <CountUp {...stat.count} />
                </p>
                <p className={`text-center text-body opacity-60 ${stat.bodyWidth}`}>{stat.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <ScheduleCallButton />
      </div>
    </div>
  );
}
