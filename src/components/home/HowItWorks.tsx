import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { ScheduleCallButton } from "@/components/ui/PillButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDGES } from "@/lib/styles";

/** Icon floats (AUDIT.md §9.2): the computer icon does not float. */
const STEPS = [
  {
    icon: "how-desktop-computer",
    float: undefined,
    title: "Create 10x Impact",
    body: "Every layout is carefully crafted to convert, not just to look good.",
  },
  {
    icon: "how-keyboard",
    float: "2.65s",
    title: "DESIGN THAT SELLS",
    body: "No pixel goes unnoticed. Everything feels intentional and refined.",
  },
  {
    icon: "how-headphones",
    float: "2.85s",
    title: "BIG BRAND ENERGY",
    body: "50+ projects designed for startups, creators, and tech brands.",
  },
];

/** Home "How it works" (AUDIT.md §3 home §9). */
export function HowItWorks() {
  return (
    <section className={`flex w-full justify-center overflow-hidden bg-surface-alt ${EDGES} after:border-b`}>
      <div className="flex w-full max-w-250 flex-col items-center gap-20 px-2.5 py-12 tablet:px-12 tablet:py-20">
        <SectionHeading eyebrow="HOW IT WORKS">
          <span>taking care of design</span>
          <span>so you can scale.</span>
        </SectionHeading>

        <div className="flex w-full flex-col items-center gap-6 tablet:flex-row">
          {STEPS.map((step) => (
            <div key={step.title} className="flex w-full flex-col items-center gap-2.5 tablet:flex-1">
              <MediaPlaceholder
                name={step.icon}
                exportSize="70×70"
                type="PNG"
                className={`size-17.5 ${step.float ? "animate-float" : ""}`}
                style={step.float ? ({ "--float-period": step.float } as React.CSSProperties) : undefined}
              />
              <h3 className="text-h4 font-extrabold uppercase">{step.title}</h3>
              <p className="max-w-75 text-center text-body opacity-60">{step.body}</p>
            </div>
          ))}
        </div>

        <ScheduleCallButton />
      </div>
    </section>
  );
}
