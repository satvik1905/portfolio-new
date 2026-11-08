const TICKS = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

type RulerProps = {
  /** "left" is the ticked `01` ruler; "right" is the plain `02` double line. */
  side: "left" | "right";
  /** `white` rulers sit on light sections, `black` on dark (AUDIT.md §2). */
  tone?: "white" | "black";
  /**
   * Ruler height in px. Framer gives each instance its own fixed height, which
   * sets the tick spacing; the section clips whatever overflows.
   */
  height: number;
};

/**
 * Decorative ruler column (AUDIT.md §2). Sits outside the content column:
 * the left ruler's right edge and the right ruler's left edge touch it.
 */
export function Ruler({ side, tone = "white", height }: RulerProps) {
  const line = tone === "white" ? "bg-line" : "bg-line-dark";

  return (
    <div
      aria-hidden="true"
      style={{ height }}
      className={`pointer-events-none absolute top-0 z-1 hidden gap-0.5 overflow-clip tablet:flex ${
        side === "left" ? "right-full" : "left-full"
      }`}
    >
      {side === "left" && (
        <div className="flex w-4.75 flex-col justify-between overflow-clip pt-6">
          {TICKS.map((tick) => (
            <div key={tick} className="flex h-5 items-center justify-center gap-0.5">
              <div className="relative h-5 w-2.5">
                <span className="absolute top-1/2 left-1/2 -translate-1/2 rotate-90 font-jetbrains text-ruler text-muted">
                  {tick}
                </span>
              </div>
              <div className="h-px w-1.75 bg-muted" />
            </div>
          ))}
        </div>
      )}
      <div className="flex h-full gap-px">
        <div className={`h-full w-px ${line}`} />
        <div className={`h-full w-px ${line}`} />
      </div>
    </div>
  );
}
