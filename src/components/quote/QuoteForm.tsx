"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  invalidFields,
  type QuoteRequest,
  type RequiredField,
} from "@/lib/quote";
import { useQuote } from "@/lib/quote-state";
import { SITE } from "@/lib/site";
import { submitQuote } from "@/lib/submit-quote";
import styles from "./QuoteForm.module.css";

type Status = "editing" | "sending" | "sent";

// Hydration never un-happens, so there is nothing to subscribe to.
const subscribeNever = () => () => {};

/**
 * Handles its own submit rather than using <form action>: React 19 resets
 * uncontrolled fields after every form action, which would wipe what the
 * visitor typed whenever validation fails.
 */
export function QuoteForm() {
  const { services, toggleService } = useQuote();
  const [invalid, setInvalid] = useState<RequiredField[]>([]);
  const [status, setStatus] = useState<Status>("editing");
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  // Until React hydrates, Send would submit natively and put the visitor's details in the URL
  // (?name=…&email=…). The server snapshot keeps it disabled until then, which also blocks Enter.
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);

  // The fields unmount on success and take focus with them; hand it to the message.
  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (key: string) => String(data.get(key) ?? "");
    const request: QuoteRequest = {
      name: text("name"),
      business: text("business"),
      email: text("email"),
      phone: text("phone"),
      services: [...services],
      budget: text("budget"),
      timeline: text("timeline"),
      message: text("message"),
    };

    const failing = invalidFields(request);
    setInvalid(failing);
    if (failing.length > 0) {
      // Take the visitor to the first bad field: on a phone it can be a screen or more above Send.
      // Centred rather than plainly focused, which would leave it under the sticky header.
      const field = event.currentTarget.elements.namedItem(failing[0]);
      if (field instanceof HTMLElement) {
        field.scrollIntoView({ block: "center" });
        field.focus({ preventScroll: true });
      }
      return;
    }

    setStatus("sending");
    setError(null);
    try {
      const result = await submitQuote(request);
      if (result.ok) {
        setStatus("sent");
        return;
      }
      setError(result.error);
    } catch {
      setError(`Something went wrong. Please try again, or email us at ${SITE.email}.`);
    }
    setStatus("editing");
  }

  const isInvalid = (field: RequiredField) => invalid.includes(field);

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      {status === "sent" ? (
        <div className={styles.success} ref={successRef} tabIndex={-1}>
          <div className={styles.big} aria-hidden="true">
            🎉
          </div>
          <h3>Thank you! We got your request.</h3>
          <p>We&apos;ll email you within 24 hours with next steps and your free quote.</p>
        </div>
      ) : (
        <div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="quote-name">Your name *</label>
              <input
                id="quote-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Juan Dela Cruz"
                aria-invalid={isInvalid("name")}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="quote-business">Business name</label>
              <input id="quote-business" name="business" autoComplete="organization" placeholder="Your Company Inc." />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="quote-email">Email *</label>
              <input
                id="quote-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                aria-invalid={isInvalid("email")}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="quote-phone">Phone / Viber</label>
              <input id="quote-phone" name="phone" type="tel" autoComplete="tel" placeholder="+63 9XX XXX XXXX" />
            </div>
          </div>
          <div className={styles.field}>
            <p className={styles.groupLabel} id="quote-services-label">
              What do you need? (pick all that apply)
            </p>
            <div className={styles.chips} role="group" aria-labelledby="quote-services-label">
              {SERVICE_OPTIONS.map((option) => (
                <label className={styles.chip} key={option}>
                  <input
                    type="checkbox"
                    name="services"
                    value={option}
                    checked={services.includes(option)}
                    onChange={() => toggleService(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="quote-budget">Budget range</label>
              <select id="quote-budget" name="budget" defaultValue="">
                <option value="">Select one</option>
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="quote-timeline">When do you need it?</label>
              <select id="quote-timeline" name="timeline" defaultValue="">
                <option value="">Select one</option>
                {TIMELINE_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-message">Tell us about your project *</label>
            <textarea
              id="quote-message"
              name="message"
              required
              placeholder="Example: I run a small shop and want an online store connected to my inventory..."
              aria-invalid={isInvalid("message")}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!hydrated || status === "sending"}>
            {status === "sending" ? "Sending…" : "Send My Free Quote Request →"}
          </button>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          <p className={styles.small}>We reply within 24 hours. Your info stays private.</p>
        </div>
      )}
    </form>
  );
}
