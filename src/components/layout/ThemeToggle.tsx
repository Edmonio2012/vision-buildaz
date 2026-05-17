// Accessible icon-only control for switching between light and dark themes.
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";

export function ThemeToggle(): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setTheme = (theme: "light" | "dark"): void => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      return;
    }
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  };

  if (!mounted) {
    return <div className="h-10 w-[84px]" />;
  }

  return (
    <div className="flex items-center gap-1">
      <Button aria-label="Use light theme" size="icon" variant="ghost" onClick={() => setTheme("light")}>
        <Sun className="h-4 w-4" />
      </Button>
      <Button aria-label="Use dark theme" size="icon" variant="ghost" onClick={() => setTheme("dark")}>
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  );
}
