import clsx from "clsx";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={clsx("wrap", styles.heroGrid)}>
        <div>
          <div className={styles.pill}>
            <span className={styles.dot} /> Now taking new projects. Free quote in 24 hours.
          </div>
          {/* Keep the space inside the text: a separate {" "} becomes its own text node and shifts the gradient span. */}
          <h1>
            Tech that makes your business <span className={styles.grad}>faster, smarter, and easier to run.</span>
          </h1>
          <p className={styles.lead}>
            We build websites, custom software, and AI tools. We also set up your hosting and domain, and automate the
            boring work. One team for all your tech needs.
          </p>
          <div className={styles.heroCtas}>
            <a href="#quote" className="btn btn-primary">
              Get a Free Quote →
            </a>
            <a href="#services" className="btn btn-ghost">
              See Our Services
            </a>
          </div>
          <div className={styles.trust}>
            <div>
              <strong>1 team</strong>for all your tech
            </div>
            <div>
              <strong>24 hrs</strong>quote turnaround
            </div>
            <div>
              <strong>100%</strong>you own your code
            </div>
          </div>
        </div>
        <div className={styles.codeCard} aria-hidden="true">
          <div className={styles.codeTop}>
            <i />
            <i />
            <i />
          </div>
          {/* Built from explicit string segments: JSX would collapse the newlines and padding. */}
          <pre>
            <span className={styles.c}>{"// your business, upgraded"}</span>{"\n"}
            <span className={styles.k}>const</span>{" business = "}<span className={styles.f}>kodelab</span>{".build({\n"}
            {"  website:    "}<span className={styles.s}>{'"fast + mobile-ready"'}</span>{",\n"}
            {"  hosting:    "}<span className={styles.s}>{'"secure, 24/7"'}</span>{",\n"}
            {"  software:   "}<span className={styles.s}>{'"made for your workflow"'}</span>{",\n"}
            {"  automation: "}<span className={styles.s}>{'"no more manual work"'}</span>{",\n"}
            {"  ai:         "}<span className={styles.s}>{'"answers customers for you"'}</span>{",\n"}
            {"});\n\n"}
            {"business."}<span className={styles.f}>grow</span>{"(); "}<span className={styles.c}>{"// ✓ done"}</span>
          </pre>
          <div className={styles.floatStat}>
            <div>
              <b>− 20 hrs</b>manual work per week
            </div>
            <div>
              <b>+ 3×</b>faster replies to customers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
