"use client";

import type { ReactNode } from "react";
import type { ServiceOption } from "@/lib/quote";
import { useQuote } from "@/lib/quote-state";

/** An #quote link that also ticks `service` in the form: the original's data-service buttons. */
export function QuoteLink({ service, className, children }: {
  service: ServiceOption;
  className?: string;
  children: ReactNode;
}) {
  const { preselectService } = useQuote();
  return (
    <a href="#quote" className={className} onClick={() => preselectService(service)}>
      {children}
    </a>
  );
}
