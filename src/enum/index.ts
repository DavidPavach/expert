// For the Profile Image upload
export const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/svg+xml",
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Input Classes
export const inputClasses =
	"bg-muted/40 py-3 border border-border focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all px-4 mt-1 placeholder:text-[11px] md:placeholder:text-xs xl:placeholder:text-sm resize-none";

// Transaction Types
export const TRANSACTION_TYPES = [
	"DEPOSIT",
	"WITHDRAWAL",
	"BONUS",
	"PENALTY",
] as const;
export const TRANSACTION_STATUS = ["PENDING", "APPROVED", "REJECTED"] as const;

// Transaction Status
export const STATUS_COLORS = {
	APPROVED: "bg-green-500",
	REJECTED: "bg-red-500",
	PENDING: "bg-yellow-500",
} as const;

// Transaction Type Colors
export const TYPE_COLORS = {
	DEPOSIT: "bg-green-500",
	WITHDRAWAL: "bg-red-500",
	BONUS: "bg-blue-500",
	PENALTY: "bg-red-500",
} as const;

// General Page Limit
export const PAGE_LIMIT = 50;
