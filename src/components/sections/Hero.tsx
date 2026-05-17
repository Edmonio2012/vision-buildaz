// Home hero section emphasizing identity and core value proposition.
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection(): JSX.Element {
  return (
    <section className="py-12 sm:py-16">
      <div className="container space-y-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{SITE_CONFIG.name}</h1>
        <p className="max-w-2xl text-muted-foreground">{SITE_CONFIG.description}</p>
      </div>
    </section>
  );
}
