"use client";

import { BRFlagIcon, USFlagIcon } from "@packages/components/icons";
import { useI18nActions, useI18nStates } from "@packages/locale/context";

export default function ToggleLanguage() {
	const { locale } = useI18nStates();
	const { setLocale } = useI18nActions();
	const text = locale === "pt" ? <BRFlagIcon /> : <USFlagIcon />;
	const handleToggle = () => setLocale(locale === "en" ? "pt" : "en");

	return (
		<button
			type="button"
			data-testid="toggle-language"
			aria-label="Toggle language button"
			onClick={handleToggle}
			className="btn"
		>
			{text}
		</button>
	);
}
