import { type Theme, strToTheme, toggleTheme } from "@packages/utils/theme";
import { useState } from "react";
import { Form } from "react-router";

export default function ToggleThemeButton() {
	const [colorMode, setColorMode] = useState<Theme>(
		strToTheme(document.documentElement.dataset.theme ?? "system"),
	);

	const info =
		colorMode === "system"
			? "Click to toggle between light and dark mode."
			: "Right click to reset to system default.";
	const label = `Selected Theme is ${colorMode}. ${info}`;

	function handleClick() {
		const newTheme = toggleTheme(colorMode);
		setColorMode(newTheme);
		document.documentElement.dataset.theme = newTheme;
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(newTheme);
	}

	return (
		<Form method="post" navigate={false}>
			<input type="hidden" name="theme" value={colorMode} />

			<button
				type="submit"
				data-testid="toggle-theme"
				aria-label={label}
				className="btn"
				onClick={handleClick}
			>
				{colorMode === "system" ? "⚙️" : colorMode === "light" ? "☀️" : "🌙"}
			</button>
		</Form>
	);
}
