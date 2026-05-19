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
