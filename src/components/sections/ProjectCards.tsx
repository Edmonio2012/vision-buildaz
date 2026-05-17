// Reusable project card grid section for showcasing repositories or case studies.
const PROJECTS = [
  { name: "Platform Core", summary: "Core infrastructure and shared tooling." },
  { name: "Design System", summary: "Accessible component system and UI governance." },
  { name: "Automation", summary: "Developer productivity and release automation." }
];

export function ProjectCardsSection(): JSX.Element {
  return (
    <section className="py-10">
      <div className="container">
        <h2 className="mb-4 text-xl font-semibold">Featured Projects</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <li className="rounded-md border p-4" key={project.name}>
              <h3 className="font-medium">{project.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
