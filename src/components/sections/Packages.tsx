import clsx from "clsx";
import { QuoteLink } from "@/components/quote/QuoteLink";
import type { ServiceOption } from "@/lib/quote";
import { SectionHead } from "./SectionHead";
import styles from "./Packages.module.css";

const PACKAGES: {
  name: string;
  /** The pill on the card's top edge: one-off, monthly, or both. */
  tag: string;
  audience: string;
  /** The short "how it works" panel under the audience line. */
  summary: string;
  features: string[];
  /** The quote-form chip this package's "Get a Quote" link ticks, if any. */
  service?: ServiceOption;
  featured?: boolean;
}[] = [
  {
    name: "Project",
    tag: "One-off",
    audience: "For when you need something built",
    summary: "We plan it, build it, and hand it over. Once it's live, it's all yours, and you won't need anything else from us.",
    features: [
      "A website, web app, automation or AI tool",
      "Clear scope & timeline before we start",
      "Progress updates every week",
      "Launch, training & full handover",
      "Code, domain & logins are 100% yours",
    ],
    // No service: a project can be any of them, so the visitor picks.
  },
  {
    name: "Project + Retainer",
    tag: "One-off + monthly",
    audience: "For when you want it built and looked after",
    summary: "We build it, then keep it running for you: hosted on our servers, updated, and looked after every month.",
    features: [
      "Everything in Project to build it",
      "Everything in Retainer once it's live",
      "Hosted on our servers from launch day",
      "One team from first idea to everyday running",
    ],
    service: "Hosting & Domain",
  },
  {
    name: "Retainer",
    tag: "Monthly",
    audience: "For when you want it looked after",
    summary: "We host your website or system on our servers and look after it every month, so you never have to think about it.",
    features: [
      "Hosting on our secure cloud servers",
      "Domain, SSL & business email handled",
      "Updates, backups & fixes if anything breaks",
      "Small changes & new features each month",
      "You still own your code & domain",
    ],
    service: "Hosting & Domain",
    featured: true,
  },
];

export function Packages() {
  return (
    <section id="packages" className="soft">
      <div className="wrap">
        <SectionHead center eyebrow="Packages" title="Three ways to work with us">
          Have us build it once, look after it every month, or both. Every business is different, so every quote is made for you.
        </SectionHead>
        <div className={styles.pkgGrid}>
          {PACKAGES.map((pkg) => (
            <div className={clsx(styles.pkg, pkg.featured && styles.featured)} key={pkg.name}>
              <span className={styles.tag}>{pkg.tag}</span>
              <h3>{pkg.name}</h3>
              <p className={styles.for}>{pkg.audience}</p>
              <p className={styles.summary}>{pkg.summary}</p>
              <ul>
                {pkg.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <QuoteLink service={pkg.service} className={clsx("btn", pkg.featured ? "btn-primary" : "btn-outline")}>
                Get a Quote
              </QuoteLink>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          Not sure which one fits? We&apos;ll help you choose on a free call.
        </p>
      </div>
    </section>
  );
}
