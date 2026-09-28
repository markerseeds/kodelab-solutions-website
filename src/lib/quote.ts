/** The quote form's service chips, in display order. Package CTAs must use one of these. */
export const SERVICE_OPTIONS = [
  "Website",
  "Hosting & Domain",
  "Custom Software",
  "Automation",
  "AI Solutions",
  "Not sure yet",
] as const;
export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export const BUDGET_OPTIONS = [
  "Below ₱30,000",
  "₱30,000 – ₱80,000",
  "₱80,000 – ₱200,000",
  "₱200,000+",
  "Not sure yet",
] as const;
export const TIMELINE_OPTIONS = ["ASAP", "Within 1 month", "1–3 months", "Just exploring"] as const;

export interface QuoteRequest {
  name: string;
  business: string;
  email: string;
  phone: string;
  services: ServiceOption[];
  budget: string;
  timeline: string;
  message: string;
}

export type RequiredField = "name" | "email" | "message";

/** The original page's check: something@something.something, no spaces. */
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

/** Required fields that fail the original page's checks, in form order. Empty means the request can be sent. */
export function invalidFields(request: Pick<QuoteRequest, RequiredField>): RequiredField[] {
  const invalid: RequiredField[] = [];
  if (!request.name.trim()) invalid.push("name");
  if (!EMAIL_PATTERN.test(request.email.trim())) invalid.push("email");
  if (!request.message.trim()) invalid.push("message");
  return invalid;
}

/** Ticks `service` unless it already is, in which case it returns the same array so React can skip the render. */
export function addService(selected: readonly ServiceOption[], service: ServiceOption): readonly ServiceOption[] {
  return selected.includes(service) ? selected : [...selected, service];
}

/** Ticks or unticks one chip. */
export function flipService(selected: readonly ServiceOption[], service: ServiceOption): readonly ServiceOption[] {
  return selected.includes(service) ? selected.filter((s) => s !== service) : [...selected, service];
}
