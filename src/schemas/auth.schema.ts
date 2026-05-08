import { z } from "zod";

export const personalInfoSchema = z.object({
	username: z
		.string()
		.min(3, { error: "Username cannot be less than 3 characters" })
		.max(40, {
			error: "Username cannot be more than 40 characters",
		})
		.trim(),

	fullName: z
		.string()
		.min(2, {
			error: "Full name cannot be less than 2 characters",
		})
		.trim(),

	email: z
		.email({
			error: "Please enter a valid email address",
		})
		.toLowerCase()
		.trim(),

	phoneNumber: z.string().min(7, {
		error: "Phone number is too short",
	}),
});

export const locationSchema = z.object({
	country: z.string().min(5, { error: "Please select your country" }),
});

export const loginSchema = z.object({
	identifier: z
		.string({ error: "Username or Email is required" })
		.min(3, { error: "Username or Email must be at least 3 characters long" })
		.trim(),

	password: z
		.string({ error: "Password is required" })
		.min(6, { error: "Password must be at least 6 characters long" }),

	rememberMe: z.boolean({ error: "Remember Me must be a boolean" }),
});
