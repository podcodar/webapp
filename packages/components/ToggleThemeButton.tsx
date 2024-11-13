"use client";

import { useState } from "react";

type Theme = "light" | "dark" | "system";

export default function ToggleThemeButton() {
  const [colorMode, setColorMode] = useState(document.documentElement.dataset.theme ?? "system");

  function setNewTheme(newColorMode: Theme) {
    document.documentElement.dataset.theme = newColorMode;
    document.cookie = `selected-theme=${newColorMode}; path=/`;
    setColorMode(newColorMode);
  }

  function handleToggleTheme() {
    let selectedTheme = document.documentElement.dataset.theme;
    if (!selectedTheme || selectedTheme === "system") {
      selectedTheme = window.matchMedia("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
    }

    const newColorMode = selectedTheme === "dark" ? "light" : "dark";
    setNewTheme(newColorMode);
  }

  const label = `Selected Theme is ${colorMode}. ${colorMode === "system" ? "Click to toggle between light and dark mode." : "Right click to reset to system default."}`;

  return (
    <button
      type="button"
      data-testid="toggle-theme"
      aria-label={label}
      onClick={handleToggleTheme}
      onContextMenu={() => setNewTheme("system")}
      className="btn"
    >
      {colorMode === "system" ? "⚙️" : colorMode === "light" ? "☀️" : "🌙"}
    </button>
  );
}
