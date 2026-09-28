import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Packages } from "@/components/sections/Packages";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { QuoteProvider } from "@/lib/quote-state";

export default function HomePage() {
  return (
    <QuoteProvider>
      <Hero />
      <Services />
      <Problems />
      <Process />
      <Packages />
      <Work />
      <Faq />
      <QuoteSection />
    </QuoteProvider>
  );
}
