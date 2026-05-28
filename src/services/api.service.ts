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

// Get User Transaction
export const userTransaction = async (
	page: number,
	limit: number,
	type?: string,
	others?: boolean,
) => {
	const params = new URLSearchParams();
	params.append("page", String(page));
	params.append("limit", String(limit));
	if (type) params.append("type", type);
	if (others) params.append("others", others.toString());

	const response = await axiosInstance.get(
		`transactions/get?${params.toString()}`,
	);
	return response.data;
};

// New Copy Trading
export const newCopyTrading = async (id: string) => {
	const response = await axiosInstance.post(`copy/new`, {
		masterTraderId: id,
	});
	return response.data;
};

// Fetch User Copy Tradings
export const fetchUserCopyTrading = async () => {
	const response = await axiosInstance.get(`copy/get`);
	return response.data;
};

// Stop Copy Trading
export const stopCopyTrading = async (id: string) => {
	const response = await axiosInstance.patch(`copy/stop/${id}`);
	return response.data;
};

// Fetch a Users Referrals
export const fetchReferrals = async (page: number, limit: number) => {
	const response = await axiosInstance.get(
		`referral/fetch?page=${page}&limit=${limit}`,
	);
	return response.data;
};

// New Kyc
export const newKyc = async (data: NewKycPayload) => {
	const response = await axiosInstance.post(`kyc/create`, data);
	return response.data;
};

// Fetch User Kyc
export const fetchKyc = async () => {
	const response = await axiosInstance.get(`kyc/fetch/user`);
	return response.data;
};

// New Trade
export const newTrade = async (data: NewTradePayload) => {
	const response = await axiosInstance.post(`trades/new`, data);
	return response.data;
};

// Fetch Trade History
export const getTrades = async (page: number, limit: number) => {
	const response = await axiosInstance.get(
		`trades/get?page=${page}&limit=${limit}`,
	);
	return response.data;
};

// Log Out
export const logout = async () => {
	const response = await axiosInstance.post(`auth/logout`);
	return response.data;
};

// Admin APIs

// Create New Admin
export const newAdmin = async (data: NewAdminPayload) => {
	const response = await axiosInstance.post("admins/create", data);
	return response.data;
};

// Fetch Current Admin
export const currentAdmin = async () => {
	const response = await axiosInstance.get("admins/fetch");
	return response.data;
};

// Fetch All Admin
export const fetchAdmins = async () => {
	const response = await axiosInstance.get(`admins/fetch/all`);
	return response.data;
};

// Edit an Admin
export const editAdmin = async (id: string, data: UpdateAdminPayload) => {
	const response = await axiosInstance.patch(`admins/update/${id}`, data);
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

// Fetch all Traders
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

// Users
export const fetchUsers = async (page: number, limit: number) => {
	const response = await axiosInstance.get(
		`users/fetch/user/all?page=${page}&limit=${limit}`,
	);
	return response.data;
};

// Fetch All Kycs
export const fetchKycs = async (page: number, limit: number) => {
	const response = await axiosInstance.get(
		`kyc/fetch/user/all?page=${page}&limit=${limit}`,
	);
	return response.data;
};

// Update User Kyc
export const updateKyc = async (id: string, data: Partial<NewKycPayload>) => {
	const response = await axiosInstance.patch(`kyc/update/user/${id}`, data);
	return response.data;
};

// Delete User Kyc
export const deleteKyc = async (id: string) => {
	const response = await axiosInstance.delete(`kyc/delete/user/${id}`);
	return response.data;
};

// Admin Copy Trading
export const fetchAllCopyTrading = async (page: number, limit: number) => {
	const response = await axiosInstance.get(
		`copy/getAll?page=${page}&limit=${limit}`,
	);
	return response.data;
};

// Edit Copy Trading
export const updateCopyTrading = async (id: string, data: EditCopyPayload) => {
	const response = await axiosInstance.patch(`copy/update/${id}`, data);
	return response.data;
};

// Delete Copy Trading Entry
export const deleteCopyTradingEntry = async (data: {
	copyTradingId: string;
	entryId: string;
}) => {
	const response = await axiosInstance.delete(`copy/removeEntry`, { data });
	return response.data;
};

// Update Copy Trading Entry
export const updateCopyTradingEntry = async (
	copyTradingId: string,
	entryId: string,
	data: Partial<Entry>,
) => {
	const response = await axiosInstance.patch(
		`copy/updateEntry/${copyTradingId}/${entryId}`,
		data,
	);
	return response.data;
};

// Update a User
export const updateUser = async (id: string, data: UserPayload) => {
	const response = await axiosInstance.patch(`users/update/user/${id}`, data);
	return response.data;
};

// Suspend or Unsuspend a User
export const toggleSuspendUser = async (
	id: string,
	suspend: boolean,
	duration: number,
) => {
	const response = await axiosInstance.patch(`users/suspend/${id}`, {
		suspended: suspend,
		duration: duration,
	});
	return response.data;
};

// Get All Trades
export const getAllTrades = async (page: number, limit: number) => {
	const response = await axiosInstance.get(
		`trades/getAll?page=${page}&limit=${limit}`,
	);
	return response.data;
};
