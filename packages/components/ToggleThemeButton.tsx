"use client";

import { type Theme, getSelectedTheme, strToTheme, toggleTheme } from "@packages/utils/theme";
import { useState } from "react";

export default function ToggleThemeButton() {
  const [colorMode, setColorMode] = useState<Theme>(strToTheme(document.documentElement.dataset.theme ?? "system"));

  function setNewTheme(newColorMode: Theme) {
    document.documentElement.dataset.theme = newColorMode;
    document.cookie = `selected-theme=${newColorMode}; path=/`;
    setColorMode(newColorMode);
  }

  function handleToggleTheme() {
    const selectedTheme = getSelectedTheme();
    const newColorMode = toggleTheme(selectedTheme);
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
