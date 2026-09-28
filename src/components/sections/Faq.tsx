import { SectionHead } from "./SectionHead";
import styles from "./Faq.module.css";

const FAQS = [
  {
    q: "How much does a website or system cost?",
    a: "It depends on what you need. A simple website costs much less than a custom system. Send us your details and we'll give you a clear, fixed quote. It's free.",
  },
  {
    q: "How long does a project take?",
    a: "A simple website usually takes 1–3 weeks. Custom software or automation can take 4–12 weeks, depending on the size. Your quote will include the timeline.",
  },
  {
    q: "I'm not techy. Can you still help me?",
    a: "Yes! Most of our clients are business owners, not tech people. We explain things in simple words and handle all the technical parts.",
  },
  {
    q: "Do I own my website and code?",
    a: "Yes. Once the project is paid, the website, code, and domain are 100% yours.",
  },
  {
    q: "Do you work with clients outside the Philippines?",
    a: "Yes. We work online with clients anywhere, using video calls, chat, and email.",
  },
  {
    q: "What happens after launch?",
    a: "We don't disappear. Every project comes with free support after launch, and we offer monthly plans for updates, backups, and new features.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="soft">
      <div className="wrap">
        <SectionHead center eyebrow="FAQ" title="Questions we get a lot" />
        <div className={styles.faq}>
          {FAQS.map((faq, i) => (
            <details key={faq.q} open={i === 0}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
