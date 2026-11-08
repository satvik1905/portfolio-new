import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { IntroTestimonials } from "@/components/sections/IntroTestimonials";
import { Ruler } from "@/components/ui/Ruler";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { EDGES } from "@/lib/styles";

/**
 * Contact (AUDIT.md §3 /contact). D8: no Cal.com embed. The slot is a
 * labeled placeholder at the template's 1104×570; what fills it, and the
 * email link, are still OPEN in D8.
 */
export default function ContactPage() {
  return (
    <>
      <div className={`flex w-full justify-center ${EDGES} after:border-b`}>
        <div className="relative flex w-full max-w-300 flex-col items-center gap-25 px-4 pt-25 pb-12 tablet:p-12">
          <Ruler side="left" height={1200} />
          <Ruler side="right" height={1200} />
          <div className="flex flex-col items-center gap-4 overflow-clip">
            <Eyebrow>CONTACT ME</Eyebrow>
            <h1 className="max-w-175 text-center text-h2-sm uppercase opacity-80 tablet:text-display">
              “Creativity is intelligence having fun.”
            </h1>
          </div>
          <section aria-label="Contact" className="flex min-h-180 w-full justify-center tablet:min-h-[589px]">
            <MediaPlaceholder
              name="contact-slot (D8: OPEN)"
              exportSize="1104×570"
              type="TBD"
              showLabel
              className="h-180 w-full tablet:h-142.5"
            />
          </section>
        </div>
      </div>
      <IntroTestimonials />
    </>
  );
}
