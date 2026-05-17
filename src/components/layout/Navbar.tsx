// Primary top navigation with mobile-first layout and theme controls.
import { Link } from "react-router-dom";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Navbar(): JSX.Element {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <nav className="container flex h-16 items-center justify-between">
        <Link className="text-base font-semibold" to="/">
          {SITE_CONFIG.name}
        </Link>

        <div className="flex items-center gap-3">
          <ul className="hidden gap-6 md:flex">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" to={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
