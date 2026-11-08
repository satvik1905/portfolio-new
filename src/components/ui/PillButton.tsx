import Link from "next/link";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { CONTACT_TARGET, FOCUS_RING } from "@/lib/styles";

const ICONS = {
  meet: { name: "google-meet-icon", exportSize: "22×22", type: "PNG" },
  arrow: { name: "pill-arrow-icon", exportSize: "22×22", type: "SVG" },
};

type PillButtonProps = {
  href: string;
  label: string;
  icon: keyof typeof ICONS;
};

/**
 * Primary pill CTA (AUDIT.md §3, §9.4): 53px tall, trailing 22px icon in a
 * 25px clip. On hover the parked copy slides in from the left and grows to
 * 25px while the visible one slides out to the right.
 */
export function PillButton({ href, label, icon }: PillButtonProps) {
  const asset = ICONS[icon];
  const motion = "transition-transform duration-400 ease-snap";

  return (
    <Link
      href={href}
      className={`group flex min-h-13.25 items-center justify-center gap-4 rounded-pill bg-night px-5 py-3.5 text-button text-white uppercase ${FOCUS_RING}`}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="relative flex size-6.25 items-center justify-center overflow-clip">
        <MediaPlaceholder
          {...asset}
          tone="dark"
          className={`absolute top-0 -left-8 size-5.5 origin-center ${motion} group-hover:translate-x-[33.5px] group-hover:scale-[calc(25/22)]`}
        />
        <MediaPlaceholder
          {...asset}
          tone="dark"
          className={`size-5.5 ${motion} group-hover:translate-x-[33.5px]`}
        />
      </span>
    </Link>
  );
}

/** The SCHEDULE CALL pill; its target is set by D8 (currently /contact). */
export function ScheduleCallButton() {
  return <PillButton href={CONTACT_TARGET} label="SCHEDULE CALL" icon="meet" />;
}
