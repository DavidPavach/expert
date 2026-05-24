// Format Date and Time
export const formatDate = (
	dateInput: Date | string | number,
	variant: "long" | "short" = "long",
) => {
	const date = new Date(dateInput);

	if (variant === "short") {
		const datePart = date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "2-digit",
		});

		const timePart = date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});

		return `${datePart}, ${timePart}`;
	}

	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

// Format Currency
export const formatCurrency = (value: number, max = 2) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: max,
	}).format(value);
};

// Check for value
export const checkValue = (
	obj: Record<string, string | number | boolean>,
): boolean => {
	return (
		Object.keys(obj ?? {}).length > 0 &&
		Object.values(obj ?? {}).some(
			(v) =>
				v !== undefined &&
				v !== null &&
				!(typeof v === "string" && v.trim() === ""),
		)
	);
};

// Check for Difference
export function hasDiff(
	a: Record<string, number | string | boolean | object>,
	b: Record<string, number | string | boolean | object>,
): boolean {
	const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
	for (const k of keys) {
		const valA = a[k];
		const valB = b[k];

		const typeA = Array.isArray(valA) ? "array" : typeof valA;
		const typeB = Array.isArray(valB) ? "array" : typeof valB;
		if (typeA !== typeB) return true;

		let strA: string;
		let strB: string;
		try {
			strA = JSON.stringify(valA);
		} catch {
			strA = String(valA);
		}
		try {
			strB = JSON.stringify(valB);
		} catch {
			strB = String(valB);
		}

		if (strA !== strB) return true;
	}
	return false;
}

// Get Days Difference
export function daysDifference(dateTimeStr: string): number {
	const today = new Date();
	const target = new Date(dateTimeStr);
	if (Number.isNaN(target.getTime())) throw new Error("Invalid date string");

	// Normalize both to local midnight to count full calendar days
	const localMidnight = (d: Date) =>
		new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

	const diffMs = localMidnight(today) - localMidnight(target);
	const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
	return days;
}

export function dateFromInterval(interval: string): Date {
	const now = new Date();
	const msPer = {
		minute: 60 * 1000,
		hour: 60 * 60 * 1000,
		day: 24 * 60 * 60 * 1000,
	};

	switch (interval) {
		case "1 Minute":
			return new Date(now.getTime() - 1 * msPer.minute);
		case "5 Minutes":
			return new Date(now.getTime() - 5 * msPer.minute);
		case "15 Minutes":
			return new Date(now.getTime() - 15 * msPer.minute);
		case "30 Minutes":
			return new Date(now.getTime() - 30 * msPer.minute);
		case "1 Hour":
			return new Date(now.getTime() - 1 * msPer.hour);
		case "4 Hours":
			return new Date(now.getTime() - 4 * msPer.hour);
		case "1 Day":
			return new Date(now.getTime() - 1 * msPer.day);
		case "7 Days":
			return new Date(now.getTime() - 7 * msPer.day);
		default:
			throw new Error(`Unsupported interval: ${interval}`);
	}
}
