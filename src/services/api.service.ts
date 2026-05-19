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

// Update Settings
export const updateSettings = async (data: SettingsPayload) => {
	const response = await axiosInstance.patch("settings/update", data);
	return response.data;
};

// Delete Deposit Coin
export const deleteDepositCoin = async (id: string) => {
	const response = await axiosInstance.delete(`settings/deposit/${id}`);
	return response.data;
};

// Delete Withdrawal Coin
export const deleteWithdrawalCoin = async (id: string) => {
	const response = await axiosInstance.delete(`settings/withdrawal/${id}`);
	return response.data;
};

// Transactions

// Create New Transactions
export const adminNewTx = async (id: string, data: NewTxPayload) => {
	const response = await axiosInstance.post(`transactions/newTx/${id}`, data);
	return response.data;
};

// Fetch Transactions
export const fetchTxs = async (page: number, limit: number, type: string) => {
	const response = await axiosInstance.get(
		`transactions/getAll?page=${page}&limit=${limit}&type=${type}`,
	);
	return response.data;
};

// Delete Transaction
export const deleteTx = async (id: string) => {
	const response = await axiosInstance.delete(`transactions/delete/${id}`);
	return response.data;
};

// Edit Transaction
export const editTx = async (id: string, data: EditTxPayload) => {
	const response = await axiosInstance.patch(`transactions/update/${id}`, data);
	return response.data;
};

// Fetch a User
export const fetchUser = async (identifier: string) => {
	const response = await axiosInstance.get(`users/fetch/user/${identifier}`);
	return response.data;
};

// Fetch al Traders
export const fetchTraders = async (page: number, limit: number) => {
	const response = await axiosInstance.get(
		`traders/all?page=${page}&limit=${limit}`,
	);
	return response.data;
};

// New Trader
export const newTrader = async (data: NewTraderPayload) => {
	const response = await axiosInstance.post("traders/new", data);
	return response.data;
};

// Delete Trader
export const deleteTrader = async (id: string) => {
	const response = await axiosInstance.delete(`traders/delete/${id}`);
	return response.data;
};

// Update Trader
export const updateTrader = async (id: string, data: UpdateTraderPayload) => {
	const response = await axiosInstance.patch(`traders/update/${id}`, data);
	return response.data;
};
