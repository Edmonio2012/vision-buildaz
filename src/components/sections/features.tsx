// Feature summary section intended for organization highlights and capabilities.
const FEATURES = [
  "Open-source project delivery",
  "Scalable architecture patterns",
  "Reliable CI/CD and quality standards"
];

export function FeaturesSection(): JSX.Element {
  return (
    <section className="py-10">
      <div className="container">
        <h2 className="mb-4 text-2xl font-semibold">What We Focus On</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li className="rounded-md border p-4 text-sm text-muted-foreground" key={feature}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
