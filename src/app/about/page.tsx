import { Experience } from "@/components/about/Experience";
import { ScrollQuote } from "@/components/about/ScrollQuote";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { IntroTestimonials } from "@/components/sections/IntroTestimonials";
import { Stats } from "@/components/sections/Stats";
import { Ruler } from "@/components/ui/Ruler";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { EDGES } from "@/lib/styles";

/**
 * D4 profile-card slot: a placeholder, rotated −4° with the ≈4.0s idle float.
 * Its layout box is 397.4×541.5 at 1440 (361.4 wide on tablet, 171.8 on phones); rotated, that
 * gives the 434.2×567.9 bounding box AUDIT.md §7.5 records.
 */
function ProfileCard() {
  return (
    <div className="aspect-[397.4/541.5] w-[171.8px] -rotate-4 tablet:w-[361.4px] desktop:w-[397.4px]">
      <MediaPlaceholder
        name="about-profile-card"
        exportSize="434×568"
        type="PNG"
        showLabel
        className="size-full animate-float [--float-period:4s]"
      />
    </div>
  );
}

/** About (AUDIT.md §3 /about). */
export default function AboutPage() {
  return (
    <>
      <div className={`flex w-full justify-center ${EDGES} after:border-b`}>
        <div className="relative flex w-full max-w-300 flex-col items-center gap-8 px-4 py-12 tablet:px-12">
          <Ruler side="left" height={2462.4} />
          <Ruler side="right" height={2462.4} />

          <div className="flex flex-col items-center gap-4 overflow-clip pt-25 tablet:pt-0">
            <Eyebrow>ABOUT ME - MARTIN</Eyebrow>
            <h1 className="max-w-175 text-center text-h2-sm uppercase opacity-80 tablet:text-display">
              “Simplicity is the ultimate sophistication.”
            </h1>
          </div>
          <ProfileCard />
          <Stats className="desktop:px-12" />
          <ScrollQuote />
          <Experience />
        </div>
      </div>
      <IntroTestimonials />
    </>
  );
}
