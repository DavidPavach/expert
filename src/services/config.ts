import axios, { type AxiosInstance } from "axios";

// Base URL for the API
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAxiosInstance = (): AxiosInstance => {
	const instance = axios.create({
		baseURL: BASE_URL,
		withCredentials: true,
	});

	return instance;
};
