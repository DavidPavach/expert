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
