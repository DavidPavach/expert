import { useQuery } from "@tanstack/react-query";

// API endpoints
import {
	currentUser,
	dashboardStats,
	fetchPrices,
	fetchSettings,
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
