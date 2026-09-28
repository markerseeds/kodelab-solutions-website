import type { QuoteRequest } from "./quote";

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * The one seam between the quote form and a backend.
 *
 * Today this resolves without sending anything: the original page's form
 * was a mockup too. To make it real, put "use server" at the top of this
 * file and send the request (e.g. email it with Resend), or POST it to a
 * route handler. The form already shows a pending state and displays
 * `{ ok: false, error }`, so no component needs to change.
 */
export async function submitQuote(request: QuoteRequest): Promise<SubmitResult> {
  void request;
  return { ok: true };
}
