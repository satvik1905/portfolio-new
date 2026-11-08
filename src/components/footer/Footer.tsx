import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { ArrowLink, NAV_LINKS } from "@/components/nav/links";
import { ScheduleCallButton } from "@/components/ui/PillButton";
import { EDGES } from "@/lib/styles";

const LEGAL_LINKS = [
  { label: "POLICY", href: "/legal/privacy-policy" },
  { label: "404", href: "/404" },
  { label: "CONTACT", href: "/contact" },
  { label: "TERMS", href: "/legal/terms-conditions" },
];

/** One collage per side: 412×630 at desktop, 360×450 tablet, 390×200 phone (AUDIT.md §7.5). */
function Collage({ side }: { side: "left" | "right" }) {
  return (
    <MediaPlaceholder
      name={`footer-collage-${side}`}
      exportSize="412×630"
      type="PNG"
      showLabel
      className="h-50 w-full tablet:h-112.5 tablet:w-90 desktop:h-157.5 desktop:w-103"
    />
  );
}

function LinkCell({ links, edge }: { links: typeof LEGAL_LINKS; edge: string }) {
  return (
    <div className={`flex min-h-14.5 w-full items-center justify-between px-4 py-5 tablet:flex-1 ${EDGES} ${edge}`}>
      {links.map((link) => (
        <ArrowLink key={link.href} {...link} />
      ))}
    </div>
  );
}

/** Global footer (AUDIT.md §2): collages, closing CTA and the three-cell bottom bar. */
export function Footer() {
  return (
    <footer className={`flex w-full flex-col items-center bg-white ${EDGES} after:border-t`}>
      {/* Phone: the page links sit in their own row above the collage. */}
      <div className={`w-full tablet:hidden ${EDGES} after:border-b`}>
        <LinkCell links={NAV_LINKS} edge="" />
      </div>

      <div className="flex w-full flex-col items-center gap-2.5 overflow-hidden tablet:flex-row tablet:justify-center">
        <Collage side="left" />
        <div className="flex flex-col items-center p-12 tablet:w-149">
          <div className="flex max-w-125 flex-col items-center gap-6">
            <h2 className="text-center font-sans text-h2-sm uppercase tablet:text-h2">
              Big ideas deserve really great design.
            </h2>
            <ScheduleCallButton />
          </div>
        </div>
        <Collage side="right" />
      </div>

      <div className={`flex w-full justify-center ${EDGES} after:border-y`}>
        <div className="flex w-full max-w-300 flex-col tablet:flex-row">
          <div className="hidden tablet:flex tablet:flex-1">
            <LinkCell links={NAV_LINKS} edge="after:border-l" />
          </div>
          {/* D12: the template credit is removed; the middle cell stays, empty. */}
          <div
            className={`min-h-14.5 w-full tablet:w-[378.7px] tablet:shrink-0 ${EDGES} after:border-dashed tablet:after:border-x`}
          />
          <div className="flex tablet:flex-1">
            <LinkCell links={LEGAL_LINKS} edge="after:border-t tablet:after:border-t-0 tablet:after:border-r" />
          </div>
        </div>
      </div>
    </footer>
  );
}
