import { useQuery } from "@tanstack/react-query";

import {
	currentUser,
	dashboardStats,
	fetchKyc,
	fetchKycs,
	fetchPrices,
	fetchReferrals,
	fetchSettings,
	fetchTraders,
	fetchTxs,
	fetchUser,
	fetchUserCopyTrading,
	fetchUsers,
	getTrades,
	userTransaction,
} from "./api.service";

// Get current user
export function useCurrentUser() {
	return useQuery({
		queryKey: ["me"],
		queryFn: () => currentUser(),
	});
}

// Get Prices
export function useFetchPrices() {
	return useQuery({
		queryKey: ["prices"],
		queryFn: () => fetchPrices(),
	});
}

// Get Settings
export function useSettings() {
	return useQuery({
		queryKey: ["settings"],
		queryFn: () => fetchSettings(),
	});
}

// Get Dashboard Stats
export function useDashboard() {
	return useQuery({
		queryKey: ["dashboard"],
		queryFn: () => dashboardStats(),
	});
}

// Fetch User Copy Trading
export function useUserCopyTrading() {
	return useQuery({
		queryKey: ["copyTrading"],
		queryFn: () => fetchUserCopyTrading(),
	});
}

// Fetch User Referrals
export function useReferrals(page: number, limit: number) {
	return useQuery({
		queryKey: ["referrals"],
		queryFn: () => fetchReferrals(page, limit),
	});
}

// Fetch User Kyc
export function useKyc() {
	return useQuery({
		queryKey: ["kyc"],
		queryFn: () => fetchKyc(),
	});
}

// Fetch User Trades
export function useTrades(page: number, limit: number) {
	return useQuery({
		queryKey: ["trades"],
		queryFn: () => getTrades(page, limit),
	});
}

// Fetch User Transactions
export function useTransactions(
	page: number,
	limit: number,
	type?: string,
	others?: boolean,
) {
	return useQuery({
		queryKey: ["transactions", page, limit, type, others],
		queryFn: () => userTransaction(page, limit, type, others),
	});
}

// Admin

// Fetch Admin Transactions
export function useAdminTypeTxs(page: number, limit: number, type: string) {
	return useQuery({
		queryKey: ["transactions", page, limit, type],
		queryFn: () => fetchTxs(page, limit, type),
	});
}

// Fetch a User
export function useAdminUser(identifier: string) {
	return useQuery({
		queryKey: ["identifier", identifier],
		queryFn: () => fetchUser(identifier),
		enabled: identifier.length > 3,
	});
}

// Fetch all Traders
export function useFetchTraders(page: number, limit: number) {
	return useQuery({
		queryKey: ["traders"],
		queryFn: () => fetchTraders(page, limit),
	});
}

// Fetch all Users
export function useFetchUsers(page: number, limit: number) {
	return useQuery({
		queryKey: ["users"],
		queryFn: () => fetchUsers(page, limit),
	});
}

// Fetch all Kycs
export function useAllKycs(page: number, limit: number) {
	return useQuery({
		queryKey: ["kycs"],
		queryFn: () => fetchKycs(page, limit),
	});
}
