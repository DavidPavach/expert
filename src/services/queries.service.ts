import { useQuery } from "@tanstack/react-query";

// API endpoints
import { currentUser, fetchPrices, fetchSettings } from "./api.service";

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
