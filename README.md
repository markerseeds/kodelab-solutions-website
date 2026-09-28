# Kodelab Solutions

Marketing site for Kodelab Solutions: websites, custom software, automation and AI
for growing businesses. Ported from a single 549-line HTML file to Next.js 16 /
React 19 / TypeScript. The original is kept at
[`reference/kodelab-solutions.html`](reference/kodelab-solutions.html) for
side-by-side comparison, and the port renders pixel-identically to it at desktop,
tablet and phone widths.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # prerenders / as a static page
npm test           # unit tests (Vitest)
npm run typecheck
npm run lint
```

## How it is put together

One route, `/`, prerendered at build time. Every section is a server component;
client components are used only where state lives.

Styling is **CSS Modules over a global stylesheet**, with values carried over
verbatim from the original. `src/app/globals.css` holds the tokens, the reset and
the primitives more than one section uses (`.wrap`, `section` padding, `.soft`,
`.eyebrow`, `.section-head`, `.center`, `.btn*`, `.logo*`); everything else lives
in a `.module.css` next to its component.

| Behaviour | Where |
|---|---|
| Mobile menu: toggle; closes on a link tap, a tap anywhere else, or Escape | `components/layout/SiteHeader.tsx` |
| Package "Get a Quote" links tick their service in the form | `components/quote/QuoteLink.tsx` → `lib/quote-state.tsx` → `components/quote/QuoteForm.tsx` |
| Quote form validation (focus jumps to the first invalid field) and thank-you message | `components/quote/QuoteForm.tsx`, rules in `lib/quote.ts` (unit-tested) |
| Send stays disabled until the page has hydrated, so a too-early tap can't put the visitor's details in the URL | `components/quote/QuoteForm.tsx` |
| Footer year that follows the visitor's clock | `components/layout/CurrentYear.tsx` |

**Editing content.** Each section keeps its copy in a typed array at the top of its
file in `src/components/sections/`. Contact details used in more than one place
(email, phone, Facebook, location) live in `src/lib/site.ts`. The quote form's
service, budget and timeline options live in `src/lib/quote.ts`.

## Adding a backend

The quote form sends nothing yet, just like the original mockup.
`src/lib/submit-quote.ts` is the only seam: `submitQuote()` resolves `{ ok: true }`
without sending anything. To make it real, put `"use server"` at the top of that
file and send the request (for example, email it with [Resend](https://resend.com)
using a `RESEND_API_KEY` environment variable set in Vercel), or POST it to a route
handler. The form already disables its button while sending and shows
`{ ok: false, error }` to the visitor, so no component needs to change.
`output: 'export'` is deliberately **not** set in `next.config.ts`, so server
actions stay available.

## Deploying to Vercel

1. Create an empty GitHub repository, e.g. `markerseeds/kodelab-solutions-website`.
2. Push this repo to it:
   ```bash
   git remote add origin https://github.com/markerseeds/kodelab-solutions-website.git
   git push -u origin main
   ```
3. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the
   repository. Vercel detects Next.js; no settings or environment variables are
   needed. Click **Deploy**.
4. For your own domain: **Project → Settings → Domains**, add `kodelabsolutions.com`
   (and `www.kodelabsolutions.com`), then set the DNS records Vercel shows at your
   domain registrar.

## Before launch

These are still placeholders carried over from the original page:

- [ ] **The quote form sends nothing.** Wire up `src/lib/submit-quote.ts` (see above)
      before sending visitors to the site.
- [ ] Package prices `₱XX,XXX`: `src/components/sections/Packages.tsx`.
- [ ] Phone number `+63 9XX XXX XXXX`: `SITE.phone` in `src/lib/site.ts`.
- [ ] Project cards and the "(Replace these with your real projects.)" note:
      `src/components/sections/Work.tsx`.
- [ ] Sample testimonials: `src/components/sections/Work.tsx`.
- [ ] Once the contact details are real, consider making them links (`mailto:`,
      `tel:`, the Facebook URL). The original shows them as plain text.

## Things that will bite

1. **Keep TypeScript on 5.9 and ESLint on 9.** `npm i typescript@latest` installs
   TypeScript 7 (the native compiler), which Next 16's type-check and
   typescript-eslint can't use. ESLint 10 isn't supported by the React, import and
   jsx-a11y plugins that `eslint-config-next` bundles; npm flags ESLint 9 as
   unsupported, which is expected until `eslint-config-next` moves to 10.
2. **Font families come from next/font variables.** Use `var(--font-body)` /
   `var(--font-display)` (the original's body and heading stacks), or
   `var(--font-inter)` / `var(--font-space-grotesk)` where the original named one
   family alone. Never write `"Inter"` or `"Space Grotesk"` literally.
3. **Fonts load at the original's discrete weights, with no fallback font.** With
   only Inter 400–600 available, `<b>` renders at 600 as it does in the original; the
   variable axis would draw a true 700. `fallback: []` stops next/font from inserting
   a size-adjusted Arial ahead of `system-ui` (Turbopack ignores
   `adjustFontFallback: false` on its own). That Arial would draw glyphs Inter lacks,
   like the `→` in the buttons, and make those buttons wider.
4. **Global classes inside modules need `:global()`**, e.g.
   `.navLinks :global(.btn)`. A module rule that overrides a global primitive is
   scoped under its section's root class (e.g. `.quoteSec .head`) so it wins on
   specificity, because CSS chunk order isn't guaranteed.
5. **Keep text runs whole in JSX.** JSX drops a line break next to an element
   together with its space, so keep the space inside the text on the same line
   (`business <span>…`). Don't reach for `{" "}` or put two text expressions side by
   side: React separates adjacent text nodes with `<!-- -->` comments, which splits
   the line into separately shaped runs and shifts the glyphs after them by a
   fraction of a pixel. The hero `<pre>` is built from explicit string segments
   because JSX would collapse its newlines and padding; its separators fall at line
   starts, where they change nothing.
6. **eslint-config-next 16 treats React Compiler rules as errors**
   (`react-hooks/set-state-in-effect`, `react-hooks/purity`). That's why
   `CurrentYear` uses `useSyncExternalStore` instead of setting state in an effect,
   and why the footer reads the build year at module scope.
7. **The form handles `onSubmit` itself rather than using `<form action>`.** React 19
   resets uncontrolled fields after every form action, which would wipe the
   visitor's input on a validation error.
8. **Package CTAs take a `ServiceOption`**, so a package can only pre-select a chip
   that exists. Add new services to `SERVICE_OPTIONS` in `src/lib/quote.ts`.
9. **`next dev` can fail after `next build` with "next/font/google queries have
   exactly one entry"** (a 500 on every page, pointing at the Inter font CSS). That's
   stale Turbopack dev state, not the code: delete `.next/dev` (or all of `.next`) and
   start `npm run dev` again.
