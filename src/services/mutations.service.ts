import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBalanceStore } from "#/stores/dashboard.store";
// Stores
import { useMeStore } from "#/stores/me.store";
import { useSettingsStore } from "#/stores/settings.store";
// APIs
import {
	authAdmin,
	authUser,
	createUser,
	deleteDepositCoin,
	deleteWithdrawalCoin,
	newAdmin,
	newTransaction,
	updateProfile,
	updateSettings,
} from "./api.service";

// Create User
export function useCreateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: NewUserPayload) => createUser(data),
		onError: (error) => {
			console.error("User Creation failed:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries();
		},
	});
}

// Auth User
export function useAuth() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: AuthPayload) => authUser(data),
		onError: (error) => {
			console.error("User Authentication failed:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries();
			useMeStore.getState().ensureUser(queryClient);
			useSettingsStore.getState().ensureSettings(queryClient);
		},
	});
}

// User Profile
export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UserPayload) => updateProfile(data),
		onError: (error) => {
			console.error("User Update failed:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["me"] });
			useMeStore.getState().ensureUser(queryClient, true);
		},
	});
}

// New Transaction
export function useNewTx() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: NewTxPayload) => newTransaction(data),
		onError: (error) => {
			console.error("New Transaction failed:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["myTransactions"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			useBalanceStore.getState().ensureStats(queryClient, true);
		},
	});
}

// Admin

// Auth Admin
export function useAuthAdmin() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: AuthPayload) => authAdmin(data),
		onError: (error) => {
			console.error("Admin Authentication failed:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries();
		},
	});
}

// New Admin
export function useNewAdmin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: NewAdminPayload) => newAdmin(data),
		onError: (error) => {
			console.error("Admin Creation failed:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admins"] });
		},
	});
}

// Settings
export function useAdminSettings() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: SettingsPayload) => updateSettings(data),
		onError: (error) => {
			console.error("Settings update failed:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings"] });
		},
	});
}

// Delete Deposit Coin
export function useAdminDeleteDepositCoin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteDepositCoin(id),
		onError: (error) => {
			console.error("Failed to delete Deposit coin:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings"] });
		},
	});
}

// Delete Withdrawal Coin
export function useAdminDeleteWithdrawalCoin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteWithdrawalCoin(id),
		onError: (error) => {
			console.error("Failed to delete Withdrawal coin:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings"] });
		},
	});
}
