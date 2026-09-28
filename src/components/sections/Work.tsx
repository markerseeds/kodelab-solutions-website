import { SectionHead } from "./SectionHead";
import styles from "./Work.module.css";

// Placeholder projects and testimonials from the original: see README "Before launch".
const PROJECTS = [
  {
    thumb: "Online Store",
    gradient: "linear-gradient(135deg,#4f46e5,#06b6d4)",
    category: "E-commerce",
    title: "Retail Shop Website",
    body: "New online store connected to their stock system. Orders now come in 24/7.",
  },
  {
    thumb: "Inventory Dashboard",
    gradient: "linear-gradient(135deg,#0ea5e9,#10b981)",
    category: "Custom Software",
    title: "Multi-Channel Inventory",
    body: "One dashboard for stock across many sales channels. No more manual counting.",
  },
  {
    thumb: "AI Assistant",
    gradient: "linear-gradient(135deg,#7c3aed,#ec4899)",
    category: "AI + Automation",
    title: "Customer Reply Bot",
    body: "An AI chatbot that answers common questions and passes hot leads to the team.",
  },
];

const TESTIMONIALS = [
  {
    quote: '"Sample testimonial: add a real client quote here after your first projects."',
    name: "Client Name",
    role: "Owner, Business Name",
  },
  {
    quote: `"Sample testimonial: short, specific results work best, like 'saved us 10 hours a week'."`,
    name: "Client Name",
    role: "Manager, Business Name",
  },
];

export function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <SectionHead eyebrow="Our work" title="Projects we're proud of">
          A few examples of what we build. <em>(Replace these with your real projects.)</em>
        </SectionHead>
        <div className={styles.workGrid}>
          {PROJECTS.map((project) => (
            <div className={styles.work} key={project.title}>
              <div className={styles.thumb} style={{ background: project.gradient }}>
                {project.thumb}
              </div>
              <div className={styles.body}>
                <small>{project.category}</small>
                <h3>{project.title}</h3>
                <p>{project.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.testimonials}>
          {TESTIMONIALS.map((testimonial) => (
            <blockquote key={testimonial.quote}>
              {testimonial.quote}
              <cite>
                {testimonial.name}
                <span>{testimonial.role}</span>
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
