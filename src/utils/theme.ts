import type { Theme } from "@/stores/theme.store";

const STORAGE_KEY = "theme";

// Apply Theme
export function applyTheme(theme: Theme) {
	const root = document.documentElement;

	root.classList.remove("light", "dark");
	root.classList.add(theme);
}

// Save Theme (Local Storage)
export function saveTheme(theme: Theme) {
	localStorage.setItem(STORAGE_KEY, theme);
}

// Get Stored Theme
export function getStoredTheme(): Theme | null {
	const stored = localStorage.getItem(STORAGE_KEY);

	if (stored === "light" || stored === "dark") {
		return stored;
	}

	return null;
}

// Get System Theme
export function getSystemTheme(): Theme {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

// Preferred Theme
export function getPreferredTheme(): Theme {
	return getStoredTheme() ?? getSystemTheme();
}
