import clsx from "clsx";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { SITE } from "@/lib/site";
import { SectionHead } from "./SectionHead";
import styles from "./QuoteSection.module.css";

const CONTACTS = [
  { icon: "✉️", text: SITE.email },
  { icon: "📱", text: `${SITE.phone} (Viber / WhatsApp)` },
  { icon: "💬", text: SITE.facebook },
  { icon: "📍", text: `${SITE.location} · Serving clients worldwide` },
];

export function QuoteSection() {
  return (
    <section id="quote" className={styles.quoteSec}>
      <div className={clsx("wrap", styles.quoteGrid)}>
        <div>
          <SectionHead className={styles.head} eyebrow="Get a free quote" title="Let's build something great together">
            Tell us a little about your project. We&apos;ll reply within 24 hours with ideas and a clear price. No
            pressure, no commitment.
          </SectionHead>
          <ul className={styles.contactList}>
            {CONTACTS.map((contact) => (
              <li key={contact.text}>
                <div className={styles.ci} aria-hidden="true">
                  {contact.icon}
                </div>
                {contact.text}
              </li>
            ))}
          </ul>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
