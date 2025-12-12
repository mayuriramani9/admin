"use client";

import { useTheme } from "next-themes";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show fallback during hydration
  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Shield className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">ThreatLens Core</span>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark ? "/logo-dark.png" : "/logo-light.png";

  return (
    <div className="flex items-center space-x-2">
      <img
        src={logoSrc || "/placeholder.svg"}
        alt="ThreatLens Core"
        className="h-36 w-auto max-w-[600px] object-contain"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
      {/* Fallback content */}
      <div className="hidden items-center space-x-2">
        <Shield className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">ThreatLens Core</span>
      </div>
    </div>
  );
}
