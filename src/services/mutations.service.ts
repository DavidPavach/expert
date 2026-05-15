import { useMutation, useQueryClient } from "@tanstack/react-query";

// Stores
import { useMeStore } from "#/stores/me.store";
import { useSettingsStore } from "#/stores/settings.store";
// APIs
import {
	authAdmin,
	authUser,
	createUser,
	newAdmin,
	updateProfile,
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
