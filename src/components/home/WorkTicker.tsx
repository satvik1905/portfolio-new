import { MediaPlaceholder } from "@/components/MediaPlaceholder";

const SLIDES = ["MINDMESH", "NORTHLESS", "PIXEL & GRAIN", "AERONE"];

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z]+/g, "-");
}

function Slide({ name }: { name: string }) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-2.5 tablet:w-200">
      <MediaPlaceholder
        name={`ticker-${slug(name)}`}
        exportSize="800×519"
        type="PNG"
        showLabel
        className="h-[242.6px] w-full tablet:h-[518.9px]"
      />
      <div className="flex items-center gap-1.5">
        <MediaPlaceholder name={`ticker-${slug(name)}-logo`} exportSize="10×10" type="SVG" className="size-2.5" />
        <span className="text-logo-caption opacity-60">{name}</span>
      </div>
    </div>
  );
}

/**
 * Home work ticker (AUDIT.md §3, §9.2). Tablet and up: a marquee moving left
 * 3240px per 108s (≈30px/s), never pausing. Phones: the four slides stacked.
 * The slide list is doubled; the trailing 10px padding makes −50% land
 * exactly one set (4 × (800 + 10)) along.
 */
export function WorkTicker() {
  return (
    <div className="flex w-full flex-col items-center bg-white p-2 tablet:p-4">
      <div className="flex w-full flex-col gap-4 tablet:hidden">
        {SLIDES.map((name) => (
          <Slide key={name} name={name} />
        ))}
      </div>
      <div className="hidden w-full overflow-hidden tablet:flex">
        <div className="flex w-max animate-marquee gap-2.5 pr-2.5 [--marquee-duration:108s]">
          {[...SLIDES, ...SLIDES].map((name, i) => (
            <div key={i} aria-hidden={i >= SLIDES.length || undefined} className="w-200">
              <Slide name={name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
