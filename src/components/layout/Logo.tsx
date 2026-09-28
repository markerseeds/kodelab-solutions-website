import clsx from "clsx";

/** The </> mark and the wordmark. Its classes are global (globals.css) because the header and footer share it. */
export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={clsx("logo", className)}>
      <span className="logo-mark" aria-hidden="true">
        {"</>"}
      </span>
      Kodelab <span className="light">Solutions</span>
    </a>
  );
}
