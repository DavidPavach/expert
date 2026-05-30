import type { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

// Services
import { currentUser } from "@/services/api.service";

type UserState = {
	user: Me | null;
	loading: boolean;
	error: string | null;

	setUser: (user: Me) => void;
	clearUser: () => void;

	ensureUser: (
		queryClient?: QueryClient,
		force?: boolean,
	) => Promise<Me | null>;
};

export const useMeStore = create<UserState>((set, get) => ({
	user: null,
	loading: false,
	error: null,

	setUser: (user) => set({ user }),

	clearUser: () =>
		set({
			user: null,
			error: null,
		}),

	ensureUser: async (queryClient, force = false) => {
		const existing = get().user;

		// Skip only if user exists and force is false
		if (existing && !force) {
			return existing;
		}

		set({
			loading: true,
			error: null,
		});

		try {
			// Try query cache first
			if (queryClient && !force) {
				const cached = queryClient.getQueryData<Me>(["me"]);
				if (cached) {
					set({ user: cached, loading: false });
					return cached;
				}
			}

			// Fresh API request
			const res = await currentUser();

			if (res.status !== 200 || res.success !== true) {
				throw new Error("Failed to fetch user");
			}

			const userData = res.data;

			set({ user: userData, loading: false });

			// Sync query cache too
			queryClient?.setQueryData(["me"], userData);

			return userData;
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
