import Link from "next/link";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { FOCUS_RING } from "@/lib/styles";

/** Page links shared by the desktop nav and the footer (AUDIT.md §2). */
export const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/projects" },
  { label: "ABOUT", href: "/about" },
  { label: "ARTICLES", href: "/articles" },
];

/** Mono link with the 18px ↗ arrow that slides up on hover (AUDIT.md §9.4). */
export function ArrowLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className={`group flex items-center overflow-clip font-jetbrains text-eyebrow text-night ${FOCUS_RING}`}
    >
      <span className="opacity-60 transition-opacity duration-400 ease-snap group-hover:opacity-80">
        {label}
      </span>
      {/* Parked 20px below its slot; the link's overflow-clip hides it until hover. */}
      <MediaPlaceholder
        name="nav-link-arrow"
        exportSize="73×72"
        type="PNG"
        className="size-4.5 translate-y-5 transition-transform duration-400 ease-snap group-hover:translate-y-0"
      />
    </Link>
  );
}
