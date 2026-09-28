import type { ReactNode } from "react";
import clsx from "clsx";

/** The eyebrow + heading + intro block that opens most sections (global .section-head). */
export function SectionHead({ eyebrow, title, children, center, className }: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("section-head", center && "center", className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
