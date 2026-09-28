"use client";

import { useSyncExternalStore } from "react";

// The year never changes while the page is open, so there is nothing to subscribe to.
const subscribe = () => () => {};

/**
 * The footer's copyright year. The page is prerendered, so `fallback` (the
 * build year) is what the HTML contains; after hydration React re-renders
 * with the visitor's clock. useSyncExternalStore does that without a
 * hydration mismatch, and without the setState-in-effect that
 * eslint-config-next 16 rejects.
 */
export function CurrentYear({ fallback }: { fallback: number }) {
  return useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => fallback);
}
