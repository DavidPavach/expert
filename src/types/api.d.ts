// New User Payload
declare type NewUserPayload = {
	username: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	country: string;
	password: string;
	referral?: string;
};

// Auth Payload
declare type AuthPayload = {
	identifier: string;
	password: string;
	device: {
		ua?: string | undefined;
		type?:
			| "desktop"
			| "mobile"
			| "tablet"
			| "console"
			| "embedded"
			| "smarttv"
			| "wearable"
			| "xr"
			| undefined;
		os?: string | undefined;
		browser?: string | undefined;
	};
	rememberMe: boolean;
};

// Me
declare type Me = {
	_id: string;
	accountId: string;
	username: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	country: string;
	profilePicture: string;
	lastSession?: string;
	suspended: boolean;
	suspendedDate?: string;
	suspensionDuration?: number;
	withdrawalKey: string;
	createdAt: string;
	updatedAt: string;
};

// New Admin Payload
declare type NewAdminPayload = {
	email: string;
	password: string;
	role: "ADMIN" | "SUPER_ADMIN";
};
