import { CountUp } from "@/components/motion/Reveal";
import { Ruler } from "@/components/ui/Ruler";
import { HeadingIcon, SectionHeading } from "@/components/ui/SectionHeading";
import { EDGES } from "@/lib/styles";

const SERVICES = [
  {
    title: "Product Design",
    body: "Designing intuitive digital products that solve real problems through clear user flows, thoughtful interfaces, and seamless interactions",
  },
  {
    title: "Brand Identity",
    body: "From logo to color systems, I create distinctive visual languages that give your brand a clear, lasting presence across every touchpoint.",
  },
  {
    title: "Design Systems",
    body: "Scalable, consistent systems that make collaboration seamless and ensure every design decision feels cohesive from start to scale.",
  },
  {
    title: "Framer Development",
    body: "Fully responsive, production-ready sites developed directly in Framer — fast, scalable, and optimized for both performance and experience.",
  },
];

/** Home Services (AUDIT.md §3 home §11). */
export function Services() {
  return (
    <section className={`flex w-full justify-center overflow-hidden ${EDGES} after:border-b`}>
      <div className="relative flex w-full max-w-250 flex-col items-center gap-20 p-12">
        <Ruler side="left" height={1227} />
        <Ruler side="right" height={1227} />

        <SectionHeading eyebrow="OFFERED SERVICES">
          <span className="flex items-center gap-2">
            FOR BRANDS
            {/*
             * AUDIT.md §7.4: slot 60, media 80 at −10 on desktop (1.5em, 2em,
             * −0.25em of 40px); slot and media 40, no bleed on phones (calc(4em / 3) of 30px).
             */}
            <HeadingIcon
              asset={{ name: "services-retro-computer", exportSize: "1200×1200", type: "MP4" }}
              slotClassName="size-[calc(4em/3)] tablet:size-[1.5em]"
              mediaClassName="inset-0 tablet:-inset-[0.25em]"
            />
            <span className="hidden tablet:inline">that</span>
          </span>
          {/* Phones move "that" down to the second line (AUDIT.md §7.4 row heights). */}
          <span>
            <span className="tablet:hidden">that </span>dare to stand out
          </span>
        </SectionHeading>

        <ul className="grid w-full grid-cols-1 gap-18 tablet:grid-cols-2">
          {SERVICES.map((service, i) => (
            <li key={service.title} className="flex max-w-150 flex-col items-center gap-4 justify-self-center">
              <div className="flex flex-col items-center gap-2.5">
                <p className="font-jetbrains text-eyebrow text-muted">SERVICE 0{i + 1}</p>
                <h3 className="text-center text-h4 font-extrabold uppercase">{service.title}</h3>
              </div>
              <p className="text-center text-body opacity-80">{service.body}</p>
            </li>
          ))}
        </ul>

        <div className="flex max-w-75 flex-col items-center gap-2.5">
          <p className="text-counter-lg text-accent">
            <CountUp to={300} prefix="€" suffix="M" />
          </p>
          <p className="text-center font-jetbrains text-mono-strong text-accent">
            HELPING STARTUPS ATTRACT FUNDING THROUGH CLARITY AND CRAFT.
          </p>
        </div>
      </div>
    </section>
  );
}
