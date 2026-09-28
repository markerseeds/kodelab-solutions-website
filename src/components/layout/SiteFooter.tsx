import { SITE } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";
import { Logo } from "./Logo";
import styles from "./SiteFooter.module.css";

/** Read once when the page is prerendered (module scope, so react-hooks/purity allows it). */
const BUILD_YEAR = new Date().getFullYear();

const SERVICE_LINKS = ["Websites", "Hosting & Domain", "Custom Software", "Automation & AI"];
const COMPANY_LINKS = [
  { href: "#process", label: "How We Work" },
  { href: "#work", label: "Our Work" },
  { href: "#faq", label: "FAQ" },
  { href: "#quote", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.footGrid}>
          <div>
            <Logo className={styles.brand} />
            <p className={styles.about}>
              Websites, software, automation, and AI for growing businesses. Built in the Philippines for clients
              everywhere.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <a href="#services">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>{SITE.email}</li>
              <li>{SITE.phone}</li>
              <li>{SITE.location}</li>
            </ul>
          </div>
        </div>
        <div className={styles.copy}>
          {/* One text node after the year, as in the original: React separates adjacent JSX text
              with <!-- --> comments, which splits the line into runs that kern a hair differently. */}
          <span>
            © <span><CurrentYear fallback={BUILD_YEAR} /></span>
            {` ${SITE.name}. All rights reserved.`}
          </span>
          <span>{SITE.domain}</span>
        </div>
      </div>
    </footer>
  );
}
