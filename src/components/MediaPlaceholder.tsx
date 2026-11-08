export type MediaPlaceholderProps = {
  /** Asset name, e.g. "nav-link-arrow". */
  name: string;
  /** Export dimensions, e.g. "73×72". */
  exportSize: string;
  /** Asset type, e.g. "PNG", "SVG", "MP4". */
  type: string;
  /** Section the slot sits on: light uses #ECECEC, dark uses #262626 (D5). */
  tone?: "light" | "dark";
  /** Show the label inside the box. Off for slots too small to hold text. */
  showLabel?: boolean;
  /** Sizing and positioning for the slot. */
  className?: string;
  /** Inline style, e.g. a CSS variable that drives an animation. */
  style?: React.CSSProperties;
};

/**
 * D5 media placeholder: a flat box at the slot's exact size, labeled with
 * asset name, export dimensions and type. The label is always present as
 * `title` and `data-asset`; it is drawn inside the box only when `showLabel`.
 */
export function MediaPlaceholder({
  name,
  exportSize,
  type,
  tone = "light",
  showLabel = false,
  className = "",
  style,
}: MediaPlaceholderProps) {
  const label = `${name} · ${exportSize} · ${type}`;
  const fill = tone === "dark" ? "bg-placeholder-dark text-ink-inverse" : "bg-placeholder text-ink";

  return (
    <span
      aria-hidden="true"
      title={label}
      data-asset={label}
      style={style}
      className={`block shrink-0 overflow-hidden ${fill} ${className}`}
    >
      {showLabel && <span className="block p-1 font-mono text-label">{label}</span>}
    </span>
  );
}
