import { getAxiosInstance } from "./config";

// Axios Instances
const axiosInstance = getAxiosInstance();

// Create User
export const createUser = async (data: NewUserPayload) => {
	const response = await axiosInstance.post("users/create", data);
	return response.data;
};

// Auth User
export const authUser = async (data: AuthPayload) => {
	const response = await axiosInstance.post("auth/login", data);
	return response.data;
};

// Logout User
export const logoutUser = async () => {
	const response = await axiosInstance.post(`auth/logout`);
	return response.data;
};

// Fetch Current User
export const currentUser = async () => {
	const response = await axiosInstance.get("users/fetch");
	return response.data;
};

// Fetch Prices
export const fetchPrices = async () => {
	const response = await axiosInstance.get("transactions/prices");
	return response.data;
};

// Fetch Settings
export const fetchSettings = async () => {
	const response = await axiosInstance.get("settings/get");
	return response.data;
};

// Update Profile
export const updateProfile = async (data: UserPayload) => {
	const response = await axiosInstance.patch("users/update", data);
	return response.data;
};

// Presigned URL
export const fetchPresignedUrl = async (data: PresignedPayload[]) => {
	const response = await axiosInstance.post("general/presigned", {
		items: data,
	});
	return response.data;
};

// Fetch Dashboard Stats
export const dashboardStats = async () => {
	const response = await axiosInstance.get("transactions/dashboard");
	return response.data;
};

// New Transaction
export const newTransaction = async (data: NewTxPayload) => {
	const response = await axiosInstance.post("transactions/new", data);
	return response.data;
};

// Admin APIs

// Create New Admin
export const newAdmin = async (data: NewAdminPayload) => {
	const response = await axiosInstance.post("admins/create", data);
	return response.data;
};

// Auth Admin
export const authAdmin = async (data: AuthPayload) => {
	const response = await axiosInstance.post("auth/operations", data);
	return response.data;
};
