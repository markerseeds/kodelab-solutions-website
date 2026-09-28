import type { ReactNode } from "react";
import { SectionHead } from "./SectionHead";
import styles from "./Services.module.css";

const SERVICES: { title: string; body: ReactNode; points: string[]; icon: ReactNode }[] = [
  {
    title: "Website Design & Development",
    body: "Modern websites that look great on phones and turn visitors into customers.",
    points: ["Business & company websites", "Online stores (e-commerce)", "Landing pages for ads"],
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 8h18M8 21h8M12 18v3" />
      </>
    ),
  },
  {
    title: "Hosting & Domain",
    body: "We set up and look after your website. It stays online, fast, and safe.",
    points: ["Domain registration (.com, .ph)", "Fast, secure cloud hosting", "Business email & SSL"],
    icon: (
      <>
        <path d="M6 10a6 6 0 0 1 11.3-2.8A4.5 4.5 0 1 1 18 16H7a4 4 0 0 1-1-7.9" />
        <path d="M12 13v6M9 16l3 3 3-3" />
      </>
    ),
  },
  {
    title: "Custom Software & Apps",
    // Keep on one line: a line break next to <em> would drop the space.
    body: <>Programs made for how <em>your</em> business works, not generic tools that don&apos;t fit.</>,
    points: ["Web apps & dashboards", "Inventory, POS & booking systems", "Customer portals"],
    icon: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  },
  {
    title: "Business Process Automation",
    body: "We find the slow, manual tasks in your business and make them run by themselves.",
    points: ["Auto reports & invoices", "Connect your apps together", "Less copy-paste, fewer errors"],
    icon: (
      <>
        <path d="M4 6h10M4 12h16M4 18h7" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="15" cy="18" r="2" />
      </>
    ),
  },
  {
    title: "AI Solutions",
    body: "Put AI to work in your business: answering customers, writing content, and sorting data.",
    points: ["AI chatbots for FB & website", "AI assistants for your team", "Document & data processing"],
    icon: (
      <>
        <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" />
        <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
      </>
    ),
  },
  {
    title: "Tech Consulting & Support",
    body: "Not sure what you need? We'll give you a clear plan and support you after launch.",
    points: ["Tech planning & advice", "Maintenance & updates", "Monthly support plans"],
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
        <path d="M12 8v4l3 2" />
      </>
    ),
  },
];

export function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <SectionHead eyebrow="What we do" title="Everything tech, all in one place">
          No need to hire five different people. We plan, build, and take care of your tech from start to finish.
        </SectionHead>
        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <div className={styles.card} key={service.title}>
              <div className={styles.icon}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {service.icon}
                </svg>
              </div>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
