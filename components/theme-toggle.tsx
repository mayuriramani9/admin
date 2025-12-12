"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="z-50 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-colors duration-200 relative"
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-transform duration-200 ease-in-out text-zinc-700 hover:text-zinc-500" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-transform duration-200 ease-in-out text-zinc-100 hover:text-zinc-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
