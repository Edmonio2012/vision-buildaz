// Simple global footer with organization identity and current year.
import { SITE_CONFIG } from "@/lib/constants";

export function Footer(): JSX.Element {
  return (
    <footer className="border-t">
      <div className="container py-6 text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
