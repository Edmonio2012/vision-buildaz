"use client";

// Accessible icon-only control for switching between light and dark themes.
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle(): JSX.Element {
  const { setTheme } = useTheme();

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
