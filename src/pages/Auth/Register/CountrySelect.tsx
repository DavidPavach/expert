import { AnimatePresence, motion } from "framer-motion";
import { DirectDown } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import FormField, { InputBase } from "#/components/FormField";
import useGeolocation from "#/hooks/useGeolocation";
import countriesData from "../../../../public/assets/countries.json";

// Define the shape of your countries JSON
type CountryData = {
	[key: string]: {
		name: string;
		phone_code: string;
	};
};

const countries = countriesData as CountryData;

export default function CountrySelect({
	update,
}: {
	update: (field: string, value: string | boolean | number) => void;
}) {
	const { location, loading, error } = useGeolocation();

	// State for the dropdown
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
		null,
	);

	// Ref to handle clicking outside to close the dropdown
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Auto-select the country once geolocation finishes
	useEffect(() => {
		if (!loading && location.countryCode && !selectedCountryCode) {
			// Ensure the detected code actually exists in our JSON
			if (countries[location.countryCode.toLowerCase()]) {
				setSelectedCountryCode(location.countryCode.toLowerCase());
				update("country", location.country || "");
			}
		}
	}, [
		loading,
		location.countryCode,
		location.country,
		selectedCountryCode,
		update,
	]);

	// Handle closing the dropdown when clicking outside of it
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Filter countries based on the search query
	const filteredCountries = Object.entries(countries).filter(([_, data]) =>
		data.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div ref={dropdownRef} className="relative my-4 w-full">
			<FormField label="Select Country" required>
				{/* The Trigger Button */}
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="flex justify-between items-center bg-muted/40 px-4 py-2.5 md:py-3 border border-border focus:border-accent rounded-xl focus:outline-none focus:ring-0 w-full cursor-pointer"
				>
					<div className="flex items-center gap-3">
						{loading ? (
							<span className="text-primary/40 animate-pulse">
								Detecting location...
							</span>
						) : selectedCountryCode ? (
							<>
								<img
									// Using the flags object to dynamically load the image from src
									src={`/assets/flags/${selectedCountryCode}.png`}
									alt={`${countries[selectedCountryCode].name} flag`}
									className="rounded-sm w-6 h-4 object-cover"
								/>
								<span>{countries[selectedCountryCode].name}</span>
							</>
						) : (
							<span className="text-muted-foreground">Select a country</span>
						)}
					</div>
					{/* Simple Dropdown Arrow */}
					<DirectDown
						variant="Bold"
						className={`size-4 text-muted-foreground ${isOpen ? "rotate-180 duration-200" : ""}`}
					/>
				</button>

				{/* The Dropdown Menu with Framer Motion */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							className="top-full left-0 z-10 absolute flex flex-col bg-background shadow-lg mt-2 border border-border rounded-xl w-full overflow-hidden"
						>
							{/* Search Input */}
							<div className="p-2 border-border border-b">
								<InputBase
									type="text"
									placeholder="Search country..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									icon="🌍"
								/>
							</div>

							{/* Scrollable List */}
							<ul className="p-1 max-h-72 overflow-y-auto">
								{filteredCountries.length > 0 ? (
									filteredCountries.map(([code, data]) => (
										<li key={code}>
											<button
												type="button"
												onClick={() => {
													setSelectedCountryCode(code);
													update("country", data.name);
													setIsOpen(false);
													setSearchQuery("");
												}}
												className={`w-full flex items-center cursor-pointer gap-3 px-3 py-2 text-left text-[11px] md:text-xs xl:text-sm rounded-md hover:bg-muted/50 transition-colors ${
													selectedCountryCode === code
														? "bg-muted/60 font-medium"
														: ""
												}`}
											>
												<img
													// Using the flags object here as well
													src={`/assets/flags/${code}.png`}
													alt={`${data.name} flag`}
													className="rounded w-6 h-4 object-cover"
												/>
												<span>{data.name}</span>
												<span className="ml-auto text-muted-foreground">
													{data.phone_code}
												</span>
											</button>
										</li>
									))
								) : (
									<li className="p-3 text-muted-foreground text-xs text-center">
										No countries found.
									</li>
								)}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</FormField>

			{/* Optional: Show error if geolocation fails but allow manual selection */}
			{error && !selectedCountryCode && (
				<p className="mt-1 text-[9px] text-destructive md:text-[10px] xl:text-[11px]">
					Could not detect location. Please select manually.
				</p>
			)}
		</div>
	);
}
