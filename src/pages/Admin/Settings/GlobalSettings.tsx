import { ToggleOff, ToggleOn } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { useAdminSettings } from "#/services/mutations.service";
import { checkValue, formatCurrency } from "#/utils/format";

type SettingsProps = {
	threshold: number;
	whatsAppNumber: string;
	address: string;
	thresholdText: string;
	noWithdrawal: boolean;
	minDeposit: number;
	minWithdrawal: number;
};
const GlobalSettings = ({ settings }: { settings: SettingsProps }) => {
	const [settingsData, setSettingsData] = useState<
		Record<string, string | boolean | number>
	>({});

	const withdrawalState = settingsData.noWithdrawal || settings.noWithdrawal;

	// Functions
	const onChange = (name: string, value: string | boolean | number) => {
		setSettingsData((prev) => ({ ...prev, [name]: value }));
	};

	const updateSettings = useAdminSettings();
	const onSubmit = () => {
		const hasValue = checkValue(settingsData);
		if (!hasValue)
			return toast.error(
				"No new value detected. Please update a value to continue.",
			);

		const payload = { ...settingsData };

		updateSettings.mutate(payload, {
			onSuccess: () => {
				toast.success("Settings Updated !!!");
				setSettingsData({});
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positive
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to Update, Please Try Again.";
				toast.error(message);
			},
		});
	};

	return (
		<main>
			<header className="bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-6 xl:px-8 py-4 border-border border-b">
				<h2 className="font-semibold text-base md:text-lg xl:text-xl">
					Global Settings
				</h2>
				<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Configure platform-wide trading parameters
				</p>
			</header>
			<section className="gap-5 grid grid-cols-1 md:grid-cols-2 p-4">
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="threshold"
						className="font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer"
					>
						Live Section Amount
					</label>
					<div className="relative">
						<span className="top-1/2 left-3.5 absolute font-semibold text-muted-foreground -translate-y-1/2">
							$
						</span>
						<input
							id="threshold"
							type="number"
							min="0"
							step="0.01"
							value={settingsData.threshold as number}
							onChange={(e) =>
								onChange("threshold", parseInt(e.target.value, 10))
							}
							className="bg-muted/40 py-3 pr-4 pl-8 border border-border focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all"
						/>
					</div>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						The amount displayed to users on the Live section page, current
						value{" "}
						<span className="text-primary">
							{formatCurrency(settings.threshold)}
						</span>
					</p>
				</div>
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="thresholdText"
						className="font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer"
					>
						Live Section Text
					</label>
					<input
						id="thresholdText"
						type="text"
						value={settingsData.thresholdText as string}
						onChange={(e) => onChange("thresholdText", e.target.value)}
						className="bg-muted/40 px-4 py-3 border border-border focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all"
					/>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						The text displayed on the Live section page, current value:
						<span className="text-primary"> {settings.thresholdText} </span>
					</p>
				</div>
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="minDeposit"
						className="font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer"
					>
						Minimum Deposit
					</label>
					<div className="relative">
						<span className="top-1/2 left-3.5 absolute font-semibold text-muted-foreground -translate-y-1/2">
							$
						</span>
						<input
							id="minDeposit"
							type="number"
							min="0"
							step="0.01"
							value={settingsData.minDeposit as number}
							onChange={(e) =>
								onChange("minDeposit", parseInt(e.target.value, 10))
							}
							className="bg-muted/40 py-3 pr-4 pl-8 border border-border focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all"
						/>
					</div>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						The Minimum amount a user can deposit{" "}
						<span className="text-primary">
							{formatCurrency(settings.minDeposit)}
						</span>
					</p>
				</div>
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="minWithdrawal"
						className="font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer"
					>
						Minimum Withdrawal
					</label>
					<div className="relative">
						<span className="top-1/2 left-3.5 absolute font-semibold text-muted-foreground -translate-y-1/2">
							$
						</span>
						<input
							id="minWithdrawal"
							type="number"
							min="0"
							step="0.01"
							value={settingsData.minWithdrawal as number}
							onChange={(e) =>
								onChange("minWithdrawal", parseInt(e.target.value, 10))
							}
							className="bg-muted/40 py-3 pr-4 pl-8 border border-border focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all"
						/>
					</div>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						The Minimum amount a user can withdraw{" "}
						<span className="text-primary">
							{formatCurrency(settings.minWithdrawal)}
						</span>
					</p>
				</div>
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="whatsAppNumber"
						className="font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer"
					>
						WhatsApp Number
					</label>
					<input
						id="whatsAppNumber"
						type="tel"
						value={settingsData.whatsAppNumber as string}
						onChange={(e) => onChange("whatsAppNumber", e.target.value)}
						className="bg-muted/40 px-4 py-3 border border-border focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all"
					/>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						The Company's WhatsApp Number, current value:
						<span className="text-primary"> {settings.whatsAppNumber} </span>
					</p>
				</div>
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="address"
						className="font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer"
					>
						Address
					</label>
					<input
						id="address"
						type="text"
						value={settingsData.address as string}
						onChange={(e) => onChange("address", e.target.value)}
						className="bg-muted/40 px-4 py-3 border border-border focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all"
					/>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						The Company's Address, current value:
						<span className="text-primary"> {settings.address} </span>
					</p>
				</div>
				<div className="flex items-start gap-4 bg-muted/20 p-4 border border-border rounded-xl">
					{settingsData.noWithdrawal || settings.noWithdrawal ? (
						<ToggleOn
							className="w-7 md:w-8 xl:w-9 text-destructive cursor-pointer shrink-0"
							variant="Bold"
							onClick={() => onChange("noWithdrawal", !withdrawalState)}
						/>
					) : (
						<ToggleOff
							className="w-7 md:w-8 xl:w-9 text-muted-foreground cursor-pointer shrink-0"
							variant="Bold"
							onClick={() => onChange("noWithdrawal", !withdrawalState)}
						/>
					)}
					<div>
						<p className="font-medium text-[11px] md:text-xs xl:text-sm">
							Disable All Withdrawals
						</p>
						<p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							When enabled, all withdrawal requests will be blocked
							platform-wide. Use with caution.
						</p>
						{withdrawalState && (
							<p className="mt-2 font-medium text-[10px] text-destructive md:text-[11px] xl:text-xs">
								⚠ Withdrawals are currently DISABLED
							</p>
						)}
					</div>
				</div>
			</section>
			<button
				type="button"
				onClick={onSubmit}
				disabled={updateSettings.isPending}
				className="bg-primary hover:opacity-90 disabled:opacity-60 shadow-lg shadow-primary/20 m-4 px-6 py-3 rounded-xl font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm text-center transition-all cursor-pointer"
			>
				{updateSettings.isPending ? (
					<Loader className="size-4 md:size-4.5 xl:size-5 text-primary-foreground/80 animate-spin" />
				) : (
					"Save Settings"
				)}
			</button>
		</main>
	);
};

export default GlobalSettings;
