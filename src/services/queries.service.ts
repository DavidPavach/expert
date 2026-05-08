import { useQuery } from "@tanstack/react-query";

// API endpoints
import { currentUser } from "./api.service";

// Stores

// Get current user
export function useCurrentUser() {
	return useQuery({
		queryKey: ["me"],
		queryFn: () => currentUser(),
	});
}
