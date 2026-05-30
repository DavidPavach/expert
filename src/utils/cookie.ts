import Cookies from "js-cookie";

// Set Cookie
export const setCookie = (name: string, value: string, days?: number) => {
	Cookies.set(name, value, {
		expires: days,
		sameSite: "lax",
	});
};

// Get Cookie
export const getCookie = (name: string) => {
	return Cookies.get(name);
};

// Remove Cookie
export const removeCookie = (name: string) => {
	Cookies.remove(name);
};

// Constants
export const adminCookie = "7fKq9zT_vL2xP0a";
export const userCookie = "dR4m-Ns8yQwB1eU";

// Check Admin
export const isAdmin = (): boolean => {
	const cookieValue = getCookie("expert");
	return cookieValue === adminCookie;
};

// Check User
export const isUser = (): boolean => {
	const cookieValue = getCookie("expert");
	return cookieValue === userCookie;
};
