import clsx from "clsx";
import styles from "./Problems.module.css";

const PROBLEMS: { title: string; detail: string; solved?: boolean }[] = [
  { title: '"Our website is old and slow."', detail: "Customers leave before they even see your products." },
  { title: '"We still use Excel and paper for everything."', detail: "Mistakes happen and data gets lost." },
  { title: `"We can't reply to every customer message."`, detail: "Slow replies mean lost sales." },
  {
    title: "With Kodelab Solutions",
    detail: "A fast website, simple systems, and AI that works for you 24/7.",
    solved: true,
  },
];

export function Problems() {
  return (
    <section className="soft">
      <div className={clsx("wrap", styles.whyGrid)}>
        <div>
          <span className="eyebrow">Sound familiar?</span>
          <h2 className={styles.title}>Your business is growing, but your tech isn&apos;t keeping up.</h2>
          <p className={styles.intro}>
            Many business owners lose hours every week on manual work, old websites, and tools that don&apos;t talk to
            each other. We fix that.
          </p>
          <a href="#quote" className="btn btn-primary">
            Tell Us Your Problem →
          </a>
        </div>
        <div className={styles.problems}>
          {PROBLEMS.map((problem) => (
            <div className={styles.problem} key={problem.title}>
              <div className={clsx(styles.x, problem.solved && styles.ok)} aria-hidden="true">
                {problem.solved ? "✓" : "✕"}
              </div>
              <div>
                <b>{problem.title}</b>
                <span>{problem.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
