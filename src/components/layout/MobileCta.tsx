import styles from "./MobileCta.module.css";

/** The floating "Get a Free Quote" button, shown on phones only. */
export function MobileCta() {
  return (
    <div className={styles.mobileCta}>
      <a href="#quote" className="btn btn-primary">
        Get a Free Quote →
      </a>
    </div>
  );
}
