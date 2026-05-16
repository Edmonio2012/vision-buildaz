// Optional sidebar navigation component for future dashboard-style route groups.
import Link from "next/link";

import { NAV_LINKS } from "@/lib/constants";

export function Sidebar(): JSX.Element {
  return (
    <aside className="hidden w-64 border-r p-4 lg:block">
      <ul className="space-y-2">
        {NAV_LINKS.map((item) => (
          <li key={item.href}>
            <Link className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
