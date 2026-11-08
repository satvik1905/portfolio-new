import { HeadingReveal } from "@/components/motion/Reveal";
import { Eyebrow, HeadingIcon } from "@/components/ui/SectionHeading";

const JOBS = [
  {
    company: "GOOGLE CREATIVE LAB",
    role: "Lead Designer",
    dates: "2023 → PRESENT",
    skills: ["INTERACTION DESIGN", "MOTION SYSTEMS", "CREATIVE DIRECTION", "ACCESSIBILITY"],
  },
  {
    company: "FIGMA",
    role: "Senior Product Designer",
    dates: "2021 → 2023",
    skills: ["DESIGN SYSTEMS", "COMPONENT LIBRARIES", "PRODUCT UI/UX", "COMMUNITY DESIGN"],
  },
  {
    company: "AIRBNB",
    role: "Product Designer",
    dates: "2019 → 2021",
    skills: ["EXPERIENCE DESIGN", "VISUAL DESIGN", "PRODUCT BRANDING"],
  },
  {
    company: "SPOTIFY",
    role: "UX / Visual Designer",
    dates: "2017 → 2019",
    skills: ["DATA VISUALIZATION", "DASHBOARD DESIGN", "ARTIST TOOLS"],
  },
  {
    company: "APPLE",
    role: "Design Intern",
    dates: "2016 → 2017",
    skills: ["MOTION DESIGN", "INTERFACE DESIGN", "HUMAN-CENTERED DESIGN", "MICROINTERACTIONS"],
  },
];

/**
 * "Companies I have worked in" (AUDIT.md §3 /about §6). The skill lists are
 * hidden on phones; every list keeps the four-item height, as on the
 * template. "FINDIND" is the template's own spelling (D6).
 */
export function Experience() {
  return (
    <section className="flex w-full flex-col items-center gap-12 overflow-hidden py-12 tablet:p-12">
      <HeadingReveal className="flex flex-col items-center gap-4 overflow-clip">
        <Eyebrow>COMPANIES I HAVE WORKED IN</Eyebrow>
        <h2 className="flex flex-col items-center text-center text-h3-sm uppercase tablet:text-h3">
          <span className="flex items-center gap-2">
            findind
            {/*
             * AUDIT.md §7.4: slot 50, media 60 at −5 at both sizes. D16 em of
             * 30px: calc(5em / 3), 2em, calc(−1em / 6); of 22px: calc(25em / 11),
             * calc(30em / 11), calc(−5em / 22).
             */}
            <HeadingIcon
              asset={{ name: "about-jumping-robot", exportSize: "60×60", type: "PNG" }}
              slotClassName="size-[calc(25em/11)] tablet:size-[calc(5em/3)]"
              mediaClassName="-inset-[calc(5em/22)] tablet:-inset-[calc(1em/6)]"
            />
            meaning
          </span>
          <span>in minimalism</span>
        </h2>
      </HeadingReveal>

      <ul className="flex w-full flex-col gap-6">
        {JOBS.map((job) => (
          <li key={job.company} className="flex gap-2 p-2.25">
            <div className="flex flex-1 flex-col gap-2">
              <p className="font-jetbrains text-mono-strong opacity-50">{job.company}</p>
              <h3 className="text-h4 font-black uppercase">{job.role}</h3>
              <p className="font-jetbrains text-eyebrow opacity-50">{job.dates}</p>
            </div>
            <ul className="hidden min-h-[73.8px] w-50 flex-col gap-1.75 tablet:flex">
              {job.skills.map((skill) => (
                <li key={skill} className="font-jetbrains text-eyebrow">
                  + {skill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
