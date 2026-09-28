"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { addService, flipService, type ServiceOption } from "./quote";

export interface QuoteContextValue {
  /** The service chips currently ticked in the quote form. */
  services: readonly ServiceOption[];
  /** A chip was clicked. */
  toggleService: (service: ServiceOption) => void;
  /** A package's "Get a Quote" link was clicked: tick, never untick. */
  preselectService: (service: ServiceOption) => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

/**
 * Lifts the ticked services out of the form so the package cards can tick
 * one. Replaces the original's querySelectorAll('#chips input') lookup in
 * the package buttons' click handler.
 */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<readonly ServiceOption[]>([]);
  const toggleService = useCallback(
    (service: ServiceOption) => setServices((current) => flipService(current, service)),
    [],
  );
  const preselectService = useCallback(
    (service: ServiceOption) => setServices((current) => addService(current, service)),
    [],
  );
  const value = useMemo(
    () => ({ services, toggleService, preselectService }),
    [services, toggleService, preselectService],
  );
  return <QuoteContext value={value}>{children}</QuoteContext>;
}

export function useQuote(): QuoteContextValue {
  const value = useContext(QuoteContext);
  if (!value) throw new Error("useQuote must be used inside a <QuoteProvider>");
  return value;
}
