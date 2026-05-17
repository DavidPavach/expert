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
	bare: string;
	profilePicture: string;
	lastSession?: string;
	suspended: boolean;
	suspendedDate?: string;
	suspensionDuration?: number;
	withdrawalKey: string;
	kycStatus: "PENDING" | "APPROVED" | "REJECTED" | "NOT STARTED";
	createdAt: string;
	updatedAt: string;
};

// New Admin Payload
declare type NewAdminPayload = {
	email: string;
	password: string;
	role: "ADMIN" | "SUPER_ADMIN";
};

// Settings
declare interface DepositCoin {
	_id: string;
	coinName: string;
	symbol: string;
	qrCode: string;
	walletAddress: string;
}

declare interface WithdrawalCoin {
	_id: string;
	coinName: string;
	symbol: string;
}

declare interface Settings {
	_id: string;
	isGlobal: boolean;
	threshold: number;
	whatsAppNumber: string;
	address: string;
	thresholdText: string;
	depositCoins: DepositCoin[];
	withdrawalCoins: WithdrawalCoin[];
	minDeposit: number;
	minWithdrawal: number;
	noWithdrawal: boolean;
	createdAt: string;
	updatedAt: string;
}

// User Profile
declare type UserPayload = {
	fullName?: string;
	phoneNumber?: string;
	country?: string;
	password?: string;
	profilePicture?: string;
};

// Presigned Url
declare type PresignedPayload = {
	contentType: string;
	fileSize: number;
	fileName: string;
};

// Transactions
declare type NewTxPayload = {
	type: string;
	cryptoSymbol: string;
	amount: number;
	hash?: string;
	walletAddress?: string;
};

// Dashboard
declare type DashboardStats = {
	approvedDeposits: number;
	approvedBonuses: number;
	totalWithdrawals: number;
	approvedPenalties: number;
	availableBalance: number;
};

// Settings
declare type SettingsPayload = {
	threshold?: number;
	whatsAppNumber?: string;
	address?: string;
	thresholdText?: string;
	depositCoins?: [
		{
			coinName: string;
			symbol: string;
			qrCode: string;
			walletAddress: string;
		},
	];
	withdrawalCoins?: [
		{
			coinName: string;
			symbol: string;
		},
	];
	minDeposit?: number;
	minWithdrawal?: number;
	noWithdrawal?: boolean;
};
