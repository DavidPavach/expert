import {
	ArrowCircleDown,
	ArrowCircleUp,
	Chart1,
	DollarCircle,
	Flash,
	TickCircle,
	Timer1,
} from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { useNewTrade } from "#/services/mutations.service";
import { useBalanceStore } from "#/stores/dashboard.store";
import { dateFromInterval } from "#/utils/format";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type Asset, assets } from "../../../../public/assets/assets";

const leverageOptions = ["1:10", "1:20", "1:30", "1:40", "1:50", "1:100"];

const expirationOptions = [
	"1 Minute",
	"5 Minutes",
	"15 Minutes",
	"30 Minutes",
	"1 Hour",
	"4 Hours",
	"1 Day",
	"7 Days",
];

type TradeFormState = {
	amount: string;
	leverage: string;
	expiration: string;
};

export default function CreateTradeForm() {
	const { stats } = useBalanceStore();
	const [assetOpen, setAssetOpen] = useState<boolean>(false);
	const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);

	const [formData, setFormData] = useState<TradeFormState>({
		amount: "",
		leverage: "",
		expiration: "",
	});

	const groupedAssets = assets.reduce<Record<string, Asset[]>>((acc, asset) => {
		if (!acc[asset.category]) {
			acc[asset.category] = [];
		}
		acc[asset.category].push(asset);
		return acc;
	}, {});

	const handleInputChange = (key: keyof TradeFormState, value: string) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const newTrade = useNewTrade();
	const handleTrade = (type: "BUY" | "SELL") => {
		if (stats && stats?.availableBalance < parseInt(formData.amount, 10)) {
			return toast.error("Amount is greater than your available balance");
		}
		const payload = {
			asset: selectedAsset.symbol,
			tradeType: type,
			amount: parseInt(formData.amount, 10),
			leverage: formData.leverage,
			entryPrice: 1,
			expiration: dateFromInterval(formData.expiration),
		};
		newTrade.mutate(payload, {
			onSuccess: () => {
				toast.success("Success — Trade completed!");
				setSelectedAsset(assets[0]);
				setFormData({ amount: "", leverage: "", expiration: "" });
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positive
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to register Trade, Please Try Again.";
				toast.error(message);
			},
		});
	};

	return (
		<div className="bg-card shadow border border-border rounded-2xl overflow-hidden">
			{/* Header */}
			<div className="p-4 sm:p-5 xl:p-6 border-border border-b">
				<div className="flex items-start gap-3">
					<div className="flex justify-center items-center bg-primary/10 rounded-2xl size-10 md:size-11 xl:size-12">
						<Chart1
							variant="Bulk"
							className="size-5 md:size-5.5 xl:size-6 text-primary"
						/>
					</div>

					<div className="min-w-0">
						<h2 className="font-bold text-base sm:text-lg xl:text-xl">
							Place a Trade
						</h2>
						<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Trade crypto, forex, commodities, and stocks with leveraged
							positions.
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-5 p-4 md:p-5 xl:p-6">
				{/* Asset Selection */}
				<div className="space-y-2">
					<Label className="text-[11px] md:text-xs xl:text-sm">
						Select Asset
					</Label>

					<Popover open={assetOpen} onOpenChange={setAssetOpen}>
						<PopoverTrigger asChild>
							<button
								type="button"
								className={cn(
									"flex justify-between items-center bg-muted/30 px-4 border border-border rounded-2xl w-full h-14 transition-all cursor-pointer",
									"hover:border-primary/40 hover:bg-muted/50",
								)}
							>
								<div className="flex items-center gap-3 min-w-0">
									<div className="flex justify-center items-center bg-background rounded-full size-8 md:size-9 xl:size-10 overflow-hidden shrink-0">
										{selectedAsset.logo ? (
											<img
												src={selectedAsset.logo}
												alt={selectedAsset.name}
												className="size-full object-cover"
											/>
										) : (
											<DollarCircle className="size-4 md:size-4.5 xl:size-5 text-muted-foreground" />
										)}
									</div>

									<div className="min-w-0 text-left">
										<p className="font-semibold text-[11px] md:text-xs xl:text-sm truncate">
											{selectedAsset.symbol}
										</p>
										<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs truncate">
											{selectedAsset.name}
										</p>
									</div>
								</div>
								<ArrowCircleDown className="size-4 md:size-4.5 xl:size-5 text-muted-foreground" />
							</button>
						</PopoverTrigger>

						<PopoverContent
							align="end"
							className="p-0 border-border w-80 md:w-96 xl:w-md"
						>
							<Command>
								<CommandInput placeholder="Search assets..." className="h-12" />

								<CommandList className="max-h-87.5">
									<CommandEmpty>
										<div className="py-6 text-[11px] text-muted-foreground md:text-xs xl:text-sm text-center">
											No asset found.
										</div>
									</CommandEmpty>

									<CommandList className="max-h-80">
										{Object.entries(groupedAssets).map(
											([category, categoryAssets]) => (
												<CommandGroup
													key={category}
													heading={category}
													className="relative px-1 py-2"
												>
													{categoryAssets.map((asset: Asset) => {
														const isSelected =
															selectedAsset.symbol === asset.symbol;

														return (
															<CommandItem
																key={asset.symbol}
																value={`${asset.symbol} ${asset.name}`}
																onSelect={() => {
																	setSelectedAsset(asset);
																	setAssetOpen(false);
																}}
																className={cn(
																	"group relative flex items-center px-3 py-3 rounded-xl transition-colors cursor-pointer",
																	"aria-selected:bg-primary/10",
																	"hover:bg-primary/5",
																	"focus:bg-primary/5",
																	isSelected && "bg-primary/10",
																)}
															>
																<div className="flex justify-between items-center gap-3 w-full">
																	<div className="flex flex-1 items-center gap-3 min-w-0 overflow-hidden">
																		<div className="flex justify-center items-center bg-muted rounded-full size-10 overflow-hidden shrink-0">
																			{asset.logo ? (
																				<img
																					src={asset.logo}
																					alt={asset.name}
																					className="size-full object-cover"
																				/>
																			) : (
																				<DollarCircle className="text-muted-foreground" />
																			)}
																		</div>

																		<div className="flex-1 min-w-0 overflow-hidden">
																			<p className="font-medium text-[11px] md:text-xs xl:text-sm truncate">
																				{asset.symbol}
																			</p>

																			<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs truncate">
																				{asset.name}
																			</p>
																		</div>
																	</div>

																	{isSelected && (
																		<TickCircle
																			variant="Bold"
																			className="text-primary shrink-0"
																		/>
																	)}
																</div>
															</CommandItem>
														);
													})}
												</CommandGroup>
											),
										)}
									</CommandList>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>

				{/* Amount */}
				<div className="space-y-2">
					<Label className="text-[11px] md:text-xs xl:text-sm">
						Trade Amount
					</Label>

					<div className="flex bg-muted/30 border border-border rounded-lg overflow-hidden">
						<div className="flex items-center px-4 border-border border-r font-semibold text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							USD
						</div>

						<Input
							type="number"
							min={50}
							max={500000}
							placeholder="0.00"
							value={formData.amount}
							onChange={(e) => handleInputChange("amount", e.target.value)}
							className="bg-transparent shadow-none border-0 focus-visible:ring-0 text-[11px] md:text-xs xl:text-sm"
						/>
					</div>

					<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						Minimum: $50 • Maximum: $500,000
					</p>
				</div>

				{/* Leverage + Expiration */}
				<div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-[11px] md:text-xs xl:text-sm">
							Leverage
						</Label>

						<Select
							value={formData.leverage}
							onValueChange={(value) => handleInputChange("leverage", value)}
						>
							<SelectTrigger className="bg-muted/30 border-border rounded-lg w-full h-14 text-[11px] md:text-xs xl:text-sm truncate">
								<div className="flex items-center gap-2">
									<Flash size={16} className="text-amber-500" />
									<SelectValue placeholder="Select leverage" />
								</div>
							</SelectTrigger>

							<SelectContent>
								{leverageOptions.map((item) => (
									<SelectItem key={item} value={item}>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label className="text-[11px] md:text-xs xl:text-sm">
							Expiration
						</Label>

						<Select
							value={formData.expiration}
							onValueChange={(value) => handleInputChange("expiration", value)}
						>
							<SelectTrigger className="bg-muted/30 border-border rounded-lg w-full h-14 text-[11px] md:text-xs xl:text-sm truncate">
								<div className="flex items-center gap-2">
									<Timer1 size={16} className="text-primary" />
									<SelectValue placeholder="Select expiration" />
								</div>
							</SelectTrigger>

							<SelectContent>
								{expirationOptions.map((item) => (
									<SelectItem key={item} value={item}>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Summary */}
				<div className="bg-muted/20 p-4 border border-border rounded-2xl">
					<div className="flex justify-between items-center gap-4">
						<span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Selected Asset
						</span>

						<span className="font-semibold text-[11px] md:text-xs xl:text-sm">
							{selectedAsset.symbol}
						</span>
					</div>

					<div className="flex justify-between items-center gap-4 mt-3">
						<span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Position Size
						</span>

						<span className="font-semibold text-[12px] sm:text-sm">
							${formData.amount || "0"}
						</span>
					</div>

					<div className="flex justify-between items-center gap-4 mt-3">
						<span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Leverage
						</span>

						<span className="font-semibold text-[11px] md:text-xs xl:text-sm">
							{formData.leverage || "--"}
						</span>
					</div>
				</div>

				{/* Buttons */}
				<div className="gap-3 sm:gap-4 grid grid-cols-1 sm:grid-cols-2">
					<Button
						type="button"
						onClick={() => handleTrade("BUY")}
						disabled={newTrade.isPending}
						className="bg-linear-to-br from-emerald-500 to-green-600 hover:opacity-90 rounded-2xl h-10 md:h-11 xl:h-12 font-bold text-white"
					>
						{newTrade.isPending ? (
							<Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
						) : (
							<>
								<ArrowCircleUp className="size-4 md:size-4.5 xl:size-5" />
								BUY
							</>
						)}
					</Button>

					<Button
						type="button"
						onClick={() => handleTrade("SELL")}
						disabled={newTrade.isPending}
						className="bg-linear-to-br from-rose-500 to-red-600 hover:opacity-90 rounded-2xl h-10 md:h-11 xl:h-12 font-bold text-white"
					>
						{newTrade.isPending ? (
							<Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
						) : (
							<>
								<ArrowCircleDown className="size-4 md:size-4.5 xl:size-5" />
								SELL
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
