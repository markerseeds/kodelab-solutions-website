import clsx from "clsx";
import { QuoteLink } from "@/components/quote/QuoteLink";
import type { ServiceOption } from "@/lib/quote";
import { SectionHead } from "./SectionHead";
import styles from "./Packages.module.css";

// Prices are still placeholders: see README "Before launch".
const PACKAGES: {
  name: string;
  audience: string;
  priceLabel: string;
  price: string;
  features: string[];
  /** The quote-form chip this package's "Get a Quote" link ticks. */
  service: ServiceOption;
  featured?: boolean;
}[] = [
  {
    name: "Starter Website",
    audience: "For small businesses and new brands",
    priceLabel: "Starts at",
    price: "₱XX,XXX",
    features: [
      "Up to 5-page website",
      "Mobile-friendly design",
      "Domain + 1 year hosting",
      "Business email setup",
      "Contact form & Google Maps",
    ],
    service: "Website",
  },
  {
    name: "Business Growth",
    audience: "For businesses ready to automate",
    priceLabel: "Starts at",
    price: "₱XX,XXX",
    features: [
      "Everything in Starter",
      "Online store or booking system",
      "1 automated workflow",
      "AI chatbot for website / FB",
      "3 months support",
    ],
    service: "Automation",
    featured: true,
  },
  {
    name: "Custom Solution",
    audience: "For unique systems & bigger projects",
    priceLabel: "Priced per project",
    price: "Let's talk",
    features: [
      "Custom software or web app",
      "Connect to your current tools",
      "AI built into your workflow",
      "Cloud setup & security",
      "Ongoing support plan",
    ],
    service: "Custom Software",
  },
];

export function Packages() {
  return (
    <section id="packages" className="soft">
      <div className="wrap">
        <SectionHead center eyebrow="Packages" title="Start small or go big">
          Every business is different, so every quote is made for you. Here&apos;s where most clients start.
        </SectionHead>
        <div className={styles.pkgGrid}>
          {PACKAGES.map((pkg) => (
            <div className={clsx(styles.pkg, pkg.featured && styles.featured)} key={pkg.name}>
              {pkg.featured && <span className={styles.tag}>Most Popular</span>}
              <h3>{pkg.name}</h3>
              <p className={styles.for}>{pkg.audience}</p>
              <div className={styles.price}>
                {pkg.priceLabel}
                <b>{pkg.price}</b>
              </div>
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
          All prices in PHP. Final price depends on your needs. We&apos;ll send an exact quote after a free call.
        </p>
      </div>
    </section>
  );
}
