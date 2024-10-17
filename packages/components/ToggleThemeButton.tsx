"use client";

import { useColorMode } from "@chakra-ui/react";

export default function ToggleThemeButton() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <button
      type="button"
      data-testid="toggle-theme"
      aria-label="Toggle theme button"
      onClick={toggleColorMode}
      className="btn"
    >
      {colorMode !== "dark" ? "☀️" : "🌙"}
    </button>
  );
}
