import type { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

// Services
import { fetchSettings } from "#/services/api.service";

type SettingsState = {
	settings: Settings | null;
	loading: boolean;
	error: string | null;

	setSettings: (settings: Settings) => void;
	clearSettings: () => void;

	ensureSettings: (queryClient?: QueryClient) => Promise<Settings | null>;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
	settings: null,
	loading: false,
	error: null,

	setSettings: (settings) =>
		set({
			settings,
			error: null,
		}),

	clearSettings: () =>
		set({
			settings: null,
			error: null,
		}),

	ensureSettings: async (queryClient) => {
		// Zustand cache
		const existing = get().settings;

		if (existing) {
			return existing;
		}

		set({
			loading: true,
			error: null,
		});

		try {
			// React Query cache
			if (queryClient) {
				const cached = queryClient.getQueryData<Settings>(["settings"]);

				if (cached) {
					set({
						settings: cached,
						loading: false,
					});

					return cached;
				}
			}

			// API fallback
			const res = await fetchSettings();

			if (res.status !== 200 || res.success !== true) {
				throw new Error(res.message || "Failed to fetch settings");
			}

			const settingsData = res.data;

			set({
				settings: settingsData,
				loading: false,
			});

			return settingsData;
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "An unknown error occurred";

			set({
				error: message,
				loading: false,
			});

			return null;
		}
	},
}));
