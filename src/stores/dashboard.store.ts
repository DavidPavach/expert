import type { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

// Services
import { dashboardStats } from "@/services/api.service";

type BalanceState = {
	stats: DashboardStats | null;
	loading: boolean;
	error: string | null;

	setStats: (stats: DashboardStats) => void;
	clearStats: () => void;

	ensureStats: (
		queryClient?: QueryClient,
		force?: boolean,
	) => Promise<DashboardStats | null>;
};

export const useBalanceStore = create<BalanceState>((set, get) => ({
	stats: null,
	loading: false,
	error: null,

	setStats: (stats) => set({ stats }),

	clearStats: () =>
		set({
			stats: null,
			error: null,
			loading: false,
		}),

	ensureStats: async (queryClient, force = false) => {
		const existing = get().stats;

		// Return existing state if already available
		if (existing && !force) {
			return existing;
		}

		set({
			loading: true,
			error: null,
		});

		try {
			// React Query cache
			if (queryClient && !force) {
				const cached = queryClient.getQueryData<DashboardStats>(["dashboard"]);

				if (cached) {
					set({
						stats: cached,
						loading: false,
					});
					return cached;
				}
			}

			// API request
			const res = await dashboardStats();

			if (res.status !== 200 || res.success !== true) {
				throw new Error("Failed to fetch dashboard stats");
			}

			const statsData: DashboardStats = {
				approvedBonuses: res.data.approvedBonuses ?? 0,
				approvedDeposits: res.data.approvedDeposits ?? 0,
				approvedPenalties: res.data.approvedPenalties ?? 0,
				approvedProfits: res.data.approvedProfits ?? 0,
				availableBalance: res.data.availableBalance ?? 0,
				totalCopyProfit: res.data.totalCopyProfit ?? 0,
				totalLockedFunds: res.data.totalLockedFunds ?? 0,
				totalProfit: res.data.totalProfit ?? 0,
				totalTradeProfit: res.data.totalTradeProfit ?? 0,
				totalWithdrawals: res.data.totalWithdrawals ?? 0,
			};

			set({
				stats: statsData,
				loading: false,
			});

			queryClient?.setQueryData(["dashboard"], statsData);

			return statsData;
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
