import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { PillButton } from "@/components/ui/PillButton";

/** 404 (AUDIT.md §3 /404): served for any unknown path. */
export default function NotFound() {
  return (
    <section className="flex min-h-225 w-full flex-col items-center justify-center gap-8 px-4 py-25 tablet:p-25">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-h2-sm font-extrabold uppercase tablet:text-display tablet:font-extrabold">
          You’ve gone off-grid.
        </h1>
        <p className="text-lead tracking-[-0.02em] opacity-60">The pixels you’re looking for don’t live here anymore.</p>
      </div>
      <MediaPlaceholder name="404-box" exportSize="1200×1200" type="MP4" showLabel className="size-75" />
      <PillButton href="/" label="BACK TO HOMEPAGE" icon="arrow" />
    </section>
  );
}
