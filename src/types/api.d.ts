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
	status?: string;
};

// Dashboard
declare type DashboardStats = {
	approvedDeposits: number;
	approvedBonuses: number;
	totalWithdrawals: number;
	approvedPenalties: number;
	availableBalance: number;
	approvedProfits: number;
	totalCopyProfit: number;
	totalLockedFunds: number;
	totalProfit: number;
	totalTradeProfit: number;
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

// Transactions
declare type Transaction = {
	amount: number;
	createdAt: string;
	cryptoSymbol: string;
	hash?: string;
	type: "DEPOSIT" | "WITHDRAWAL" | "BONUS" | "PENALTY";
	status: "PENDING" | "APPROVED" | "REJECTED";
	updatedAt: string;
	walletAddress?: string;
	user: string;
};

declare type AdminTx = {
	amount: number;
	createdAt: string;
	cryptoSymbol: string;
	hash?: string;
	type: "DEPOSIT" | "WITHDRAWAL" | "BONUS" | "PENALTY" | "PROFIT";
	status: "PENDING" | "APPROVED" | "REJECTED";
	updatedAt: string;
	walletAddress?: string;
	user: Me;
	_id: string;
};

declare type EditTxPayload = {
	type?: string;
	status?: string;
	cryptoSymbol?: string;
	amount?: number;
	hash?: string;
	walletAddress?: string;
};

// Traders
declare type NewTraderPayload = {
	name: string;
	title: string;
	bio: string;
	profilePicture: string;
	active: boolean;
	ratings: number;
	ratingsTotal: number;
	winRate: number;
	totalReturn: number;
	equity: number;
	totalTrades: number;
	minInvestment: number;
	totalFollowers: number;
};

declare type UpdateTraderPayload = Partial<NewTraderPayload>;

declare type Trader = {
	_id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	title: string;
	bio: string;
	profilePicture: string;
	active: boolean;
	ratings: number;
	ratingsTotal: number;
	winRate: number;
	totalReturn: number;
	equity: number;
	totalTrades: number;
	minInvestment: number;
	totalFollowers: number;
};

// Users
declare type User = {
	_id: string;
	username: string;
	fullName: string;
	email: string;
	phoneNumber?: string;
	country: string;
	profilePicture: string;
	suspended: boolean;
	suspendedDate?: string;
	suspensionDuration?: number;
	withdrawalKey: string;
	createdAt: string;
	updatedAt: string;
	accountId?: string;
	bare: string;
	lastSession?: string;
	kycStatus: "PENDING" | "APPROVED" | "REJECTED" | "NOT STARTED";
};

// Copy Trading
type Entry = {
	date: Date;
	percentChange: number;
	price: number;
};

declare type CopyTrading = {
	_id: string;
	user: string;
	masterTraderId: Trader;
	investment: number;
	currentValue: number;
	pnl: number;
	roi: number;
	numberOfTrades: number;
	winRate: number;
	entries: Entry[];
	status: "ACTIVE" | "PAUSED" | "CLOSED";
	createdAt: string;
	updatedAt: string;
};

declare type EditCopyPayload = {
	currentValue: number;
	pnl: number;
	roi: number;
	numberOfTrades: number;
	winRate: number;
	entries: [
		{
			date: string;
			percentChange: number;
			price: number;
		},
	];
};

// KYC
declare type NewKycPayload = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	dateOfBirth: string;
	socialMediaUsername: string;
	streetAddress: string;
	city: string;
	stateProvince: string;
	countryNationality: string;
	documentType: string;
	frontSide: string;
	backSide: string;
};

// Referral
declare type Referral = {
	_id: string;
	rewardAmount: number;
	createdAt: string;
	referredUserId: {
		_id: string;
		username: string;
		fullName: string;
		profilePicture?: string;
		createdAt: string;
	};
};

// New Trade Payload
declare type NewTradePayload = {
	asset: string;
	tradeType: string;
	amount: number;
	leverage: string;
	entryPrice: number;
	expiration: Date;
};
