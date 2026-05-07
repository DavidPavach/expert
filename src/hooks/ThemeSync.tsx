import { useEffect } from "react";

// Store and Utils
import { useThemeStore } from "@/stores/theme.store";
import { applyTheme, getPreferredTheme, saveTheme } from "@/utils/theme";

export function ThemeSync() {
	const theme = useThemeStore((state) => state.theme);
	const setTheme = useThemeStore((state) => state.setTheme);

	useEffect(() => {
		const preferredTheme = getPreferredTheme();

		setTheme(preferredTheme);
	}, [setTheme]);

	useEffect(() => {
		applyTheme(theme);
		saveTheme(theme);
	}, [theme]);

	return null;
}
