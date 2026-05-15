import axios, { type AxiosError, type AxiosInstance } from "axios";
import { toast } from "react-fox-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAxiosInstance = (): AxiosInstance => {
	const instance = axios.create({
		baseURL: BASE_URL,
		withCredentials: true,
	});

	instance.interceptors.response.use(
		(response) => response,
		// biome-ignore lint/suspicious/noExplicitAny: false positive
		(error: AxiosError<any>) => {
			const status = error.response?.status;
			const message = error.response?.data?.message;

			const unauthorizedMessages = [
				"Missing authentication token",
				"Session expired. Please log in again.",
				"Unauthorized",
			];

			if (status === 401 && unauthorizedMessages.includes(message)) {
				toast.error("Your session has expired. Please login again.");
				// Prevent redirect loop
				if (window.location.pathname !== "/login") {
					window.location.href = "/login";
				}
			}

			return Promise.reject(error);
		},
	);

	return instance;
};

export const api = getAxiosInstance();
