import { SectionHead } from "./SectionHead";
import styles from "./Process.module.css";

const STEPS = [
  { title: "Free Consultation", body: "Tell us your goals and problems. We listen first and ask the right questions." },
  { title: "Clear Quote & Plan", body: "You get a fixed price, a timeline, and exactly what's included. No hidden fees." },
  { title: "Build & Update You", body: "We build in small steps and show you progress every week." },
  { title: "Launch & Support", body: "We go live, train your team, and stay with you after launch." },
];

export function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <SectionHead center eyebrow="How we work" title="Simple, clear, no surprises">
          You always know what&apos;s happening, what it costs, and when it will be done.
        </SectionHead>
        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div className={styles.step} key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
