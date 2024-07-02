import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function ToggleThemeButton() {
  const { toggleColorMode, colorMode } = useColorMode();
  const Icon = colorMode === "dark" ? SunIcon : MoonIcon;

  return (
    <IconButton
      rounded="md"
      data-testid="toggle-theme"
      aria-label="Toggle theme button"
      icon={<Icon />}
      onClick={toggleColorMode}
    />
  );
}
