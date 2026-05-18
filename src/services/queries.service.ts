import { useQuery } from "@tanstack/react-query";

// API endpoints
import {
	currentUser,
	dashboardStats,
	fetchPrices,
	fetchSettings,
	fetchTxs,
	fetchUser,
} from "./api.service";

// Stores

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
