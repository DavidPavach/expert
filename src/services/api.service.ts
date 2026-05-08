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

// Fetch Current User
export const currentUser = async () => {
	const response = await axiosInstance.get("users/fetch");
	return response.data;
};

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
