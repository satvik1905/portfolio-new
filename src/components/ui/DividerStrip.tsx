import { EDGES } from "@/lib/styles";

/**
 * 53px strip between home sections (AUDIT.md §2): three 402px cells in a
 * 1206px row; the outer edges are solid, the middle cell's sides dashed.
 */
export function DividerStrip() {
  return (
    <div aria-hidden="true" className={`flex h-13.25 w-full justify-center bg-white ${EDGES} after:border-y`}>
      <div className="flex w-full max-w-301.5">
        <div className={`flex-1 ${EDGES} after:border-l`} />
        <div className={`flex-1 ${EDGES} after:border-x after:border-dashed`} />
        <div className={`flex-1 ${EDGES} after:border-r`} />
      </div>
    </div>
  );
}
