import { QueryClient } from "@tanstack/react-query";

export function getContext() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 2,
				retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
				refetchOnWindowFocus: false,
				refetchOnReconnect: true,
				refetchOnMount: false,
				staleTime: 60 * 1000,
				gcTime: 10 * 60 * 1000,
			},
			mutations: {
				retry: 0,
			},
		},
	});

	return {
		queryClient,
	};
}
