import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBalanceStore } from "#/stores/dashboard.store";
// Stores
import { useMeStore } from "#/stores/me.store";
import { useSettingsStore } from "#/stores/settings.store";
// APIs
import {
	adminNewTx,
	authAdmin,
	authUser,
	closeTrade,
	createUser,
	deleteAdmin,
	deleteCopyTradingEntry,
	deleteDepositCoin,
	deleteKyc,
	deleteNots,
	deleteTrade,
	deleteTrader,
	deleteTx,
	deleteWithdrawalCoin,
	editAdmin,
	editTx,
	markNots,
	newAdmin,
	newCopyTrading,
	newKyc,
	newTrade,
	newTrader,
	newTransaction,
	stopCopyTrading,
	toggleSuspendUser,
	updateCopyTrading,
	updateCopyTradingEntry,
	updateKyc,
	updateProfile,
	updateSettings,
	updateTrader,
	updateUser,
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
			useMeStore.getState().ensureUser(queryClient, true);
			useBalanceStore.getState().ensureStats(queryClient, true);
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

// New Copy Trading
export function useNewCopyTrading() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => newCopyTrading(id),
		onError: (error) => {
			console.error("New Copy Trading failed:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["copyTrading"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			useBalanceStore.getState().ensureStats(queryClient, true);
		},
	});
}

// Stop Copy Trading
export function useStopCopyTrading() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => stopCopyTrading(id),
		onError: (error) => {
			console.error("Failed to stop copy trading:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["copyTrading"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			useBalanceStore.getState().ensureStats(queryClient, true);
		},
	});
}

// New Kyc
export function useNewKyc() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: NewKycPayload) => newKyc(data),
		onError: (error) => {
			console.error("Failed to create kyc data:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["kyc"] });
			useMeStore.getState().ensureUser(queryClient, true);
		},
	});
}

// New Trades
export function useNewTrade() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: NewTradePayload) => newTrade(data),
		onError: (error) => {
			console.error("Failed to create new trade data:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["trades"] });
			useBalanceStore.getState().ensureStats(queryClient, true);
		},
	});
}

// Mark Notification as Read
export function useMarkNots() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => markNots(id),
		onError: (error) => {
			console.error("Failed to mark notification as read:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
	});
}

// Delete Notification
export function useDeleteNots() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteNots(id),
		onError: (error) => {
			console.error("Failed to delete notification:", error);
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
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
			queryClient.invalidateQueries({ queryKey: ["allAdmins"] });
		},
	});
}

// Edit Admin
type EditAdminVariables = { id: string; data: UpdateAdminPayload };
export function useAdminUpdate() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (vars: EditAdminVariables) => editAdmin(vars.id, vars.data),
		onError: (error) => {
			console.error("Admin Editing failed:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allAdmins"] });
		},
	});
}

// Delete Admin
export function useAdminDelete() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteAdmin(id),
		onError: (error) => {
			console.error("Admin Deletion failed:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allAdmins"] });
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

// New Transaction
type NewTxVariables = { id: string; data: NewTxPayload };

export function useAdminNewTx() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: NewTxVariables) => {
			return adminNewTx(vars.id, vars.data);
		},
		onError: (error) => {
			console.error("Failed to create transaction:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["transactions"],
			});
		},
	});
}

// Edit Transaction
type EditTxVariables = { id: string; data: EditTxPayload };

export function useAdminEditTx() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: EditTxVariables) => {
			return editTx(vars.id, vars.data);
		},
		onError: (error) => {
			console.error("Failed to edit transaction:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["transactions"],
			});
		},
	});
}

// Delete Transactions
export function useAdminDeleteTx() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return deleteTx(id);
		},
		onError: (error) => {
			console.error("Failed to delete transaction:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["transactions"],
			});
		},
	});
}

// New Trader
export function useAdminNewTrader() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: NewTraderPayload) => {
			return newTrader(data);
		},
		onError: (error) => {
			console.error("Failed to create trader:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["traders"],
			});
		},
	});
}

// Delete Trader
export function useAdminDeleteTrader() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return deleteTrader(id);
		},
		onError: (error) => {
			console.error("Failed to delete trader:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["traders"],
			});
		},
	});
}

// Update Trader
type EditTraderVariables = { id: string; data: UpdateTraderPayload };

export function useAdminUpdateTrader() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: EditTraderVariables) => {
			return updateTrader(vars.id, vars.data);
		},
		onError: (error) => {
			console.error("Failed to edit trader:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["traders"],
			});
		},
	});
}

// Update Kyc
type UpdateUserKycVariables = { id: string; data: Partial<NewKycPayload> };

export function useAdminUpdateKyc() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: UpdateUserKycVariables) => {
			return updateKyc(vars.id, vars.data);
		},
		onError: (error) => {
			console.error("Failed to update user kyc:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["kycs"],
			});
		},
	});
}

// Delete User Kyc
export function useAdminDeleteKyc() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return deleteKyc(id);
		},
		onError: (error) => {
			console.error("Failed to delete user kyc:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["kycs"],
			});
		},
	});
}

// Update Copy Trading
type UpdateCopyTradingVariables = { id: string; data: EditCopyPayload };
export function useAdminUpdateCopyTrading() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: UpdateCopyTradingVariables) => {
			return updateCopyTrading(vars.id, vars.data);
		},
		onError: (error) => {
			console.error("Failed to update copy trading:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["allCopyTrading"],
			});
		},
	});
}

// Delete Copy Trading Entry
type DeleteCopyTradingEntryVariables = {
	copyTradingId: string;
	entryId: string;
};
export function useAdminDeleteCopyTradingEntry() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: DeleteCopyTradingEntryVariables) => {
			return deleteCopyTradingEntry(vars);
		},
		onError: (error) => {
			console.error("Failed to delete copy trading entry:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["allCopyTrading"],
			});
		},
	});
}

// Update Copy Trading Entry
type UpdateCopyTradingEntryVariables = {
	copyTradingId: string;
	entryId: string;
	data: Partial<Entry>;
};
export function useAdminUpdateCopyTradingEntry() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: UpdateCopyTradingEntryVariables) => {
			return updateCopyTradingEntry(
				vars.copyTradingId,
				vars.entryId,
				vars.data,
			);
		},
		onError: (error) => {
			console.error("Failed to update copy trading entry:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["allCopyTrading"],
			});
		},
	});
}

// Update a User
type UpdateUserVariables = { id: string; data: UserPayload };
export function useAdminUpdateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: UpdateUserVariables) => {
			return updateUser(vars.id, vars.data);
		},
		onError: (error) => {
			console.error("Failed to update user:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		},
	});
}

// Suspend or Unsuspend a User
type SuspendUserVariables = {
	id: string;
	suspended: boolean;
	duration: number;
};
export function useAdminSuspendUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: SuspendUserVariables) => {
			return toggleSuspendUser(vars.id, vars.suspended, vars.duration);
		},
		onError: (error) => {
			console.error("Failed to suspend/unsuspend user:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		},
	});
}

// Close Trade
type CloseTradeVariables = { id: string; data: CloseTradePayload };
export function useAdminCloseTrade() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vars: CloseTradeVariables) => {
			return closeTrade(vars.id, vars.data);
		},
		onError: (error) => {
			console.error("Failed to close trade:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["allTrades"],
			});
		},
	});
}

// Delete Trade
export function useAdminDeleteTrade() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return deleteTrade(id);
		},
		onError: (error) => {
			console.error("Failed to delete trade:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["allTrades"],
			});
		},
	});
}
