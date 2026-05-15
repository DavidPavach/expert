import { Coin1, Danger, TickCircle, WalletMinus } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { useSettingsStore } from "#/stores/settings.store";
import { formatCurrency } from "#/utils/format";

const Form = ({ close }: { close: () => void }) => {
	const { settings } = useSettingsStore();
	if (!settings) {
		toast.error("Something went wrong, kindly restart the process");
		close();
	}

	const [form, setForm] = useState({ coin: "", address: "", amount: "" });
	const [loading, setLoading] = useState<boolean>(false);
	const coins = settings?.withdrawalCoins || [];

	// Functions
	const onChange = (name: string, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	return (
		<main className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
			<header className="flex items-center gap-4 bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-6 xl:px-8 py-6 border-border border-b">
				<div className="flex justify-center items-center bg-primary/20 border border-primary/30 rounded-xl size-10 md:size-12 xl:size-14 shrink-0">
					<WalletMinus className="size-5 md:size-6 xl:size-7" variant="Bold" />
				</div>
				<div>
					<h2 className="font-bold text-sm md:text-base xl:text-lg">
						Withdrawal Details
					</h2>
					<p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Fill in the details below to process your withdrawal
					</p>
				</div>
				{/* Verified badge */}
				<div className="flex items-center gap-1.5 bg-green-500/15 ml-auto px-3 py-1.5 border border-green-500/25 rounded-full">
					<TickCircle
						className="size-3.5 md:size-4 xl:size-4.5 text-green-400"
						variant="Bold"
					/>
					<span className="font-semibold text-[9px] text-green-400 md:text-[10px] xl:text-[11px]">
						Verified
					</span>
				</div>
			</header>
			<section className="flex flex-col gap-6 px-4 md:px-6 xl:px-8 py-7">
				{/* Select Coin */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="coins"
						className="font-semibold text-[11px] md:text-xs xl:text-sm"
					>
						Select Coin <span className="text-destructive">*</span>
					</label>
					{coins.length === 0 ? (
						<div className="bg-muted/20 px-4 py-3 border border-border rounded-xl text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							No withdrawal coins configured. Please contact support.
						</div>
					) : (
						<div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
							{coins.map((coin) => (
								<button
									key={coin.symbol}
									type="button"
									onClick={() => onChange("coin", coin.coinName)}
									className={`flex items-center gap-2.5 p-2 md:p-2.5 xl:p-3 cursor-pointer rounded-xl border transition-all ${
										form.coin === coin.coinName
											? "border-primary/50 bg-primary/15 shadow-sm shadow-primary/10"
											: "border-border bg-muted/20 hover:bg-muted/40"
									}`}
								>
									<div className="flex justify-center items-center bg-primary/15 border border-primary/20 rounded-lg size-8 md:size-9 xl:size-10 shrink-0">
										<span className="font-bold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase">
											{coin.symbol?.slice(0, 3)}
										</span>
									</div>
									<div className="min-w-0 text-left">
										<p className="font-semibold text-[11px] md:text-xs xl:text-sm truncate capitalize">
											{coin.coinName}
										</p>
										<p className="text-[10px] text-muted-foreground md:text-[11px] md:text-xs">
											{coin.symbol}
										</p>
									</div>
									{form.coin === coin.symbol && (
										<TickCircle
											className="ml-auto size-4 text-primary shrink-0"
											variant="Bold"
										/>
									)}
								</button>
							))}
						</div>
					)}
				</div>

				{/* Wallet address */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="address"
						className="font-semibold text-[11px] md:text-xs xl:text-sm"
					>
						Wallet Address <span className="text-destructive">*</span>
					</label>
					<div className="relative">
						<span className="top-1/2 left-4 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
							<Coin1 variant="Bold" className="size-4" />
						</span>
						<input
							id="address"
							required
							type="text"
							placeholder={
								form.coin
									? `Enter your ${form.coin} wallet address`
									: "Select a coin first"
							}
							value={form.address}
							disabled={!form.coin}
							onChange={(e) => onChange("address", e.target.value)}
							className="bg-muted/30 disabled:opacity-50 py-3 pr-4 pl-11 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring w-full font-mono placeholder:text-[11px] placeholder:text-muted-foreground md:placeholder:text-xs xl:placeholder:text-sm transition-all disabled:cursor-not-allowed"
						/>
					</div>
					<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						Double-check the address — transactions cannot be reversed
					</p>
				</div>

				{/* Amount */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="amount"
						className="font-semibold text-[11px] md:text-xs xl:text-sm"
					>
						Amount <span className="text-destructive">*</span>
					</label>
					<div className="relative">
						<input
							required
							type="number"
							min="0"
							step="any"
							placeholder="0.00"
							value={form.amount}
							disabled={!form.coin}
							onChange={(e) => onChange("amount", e.target.value)}
							className="bg-muted/30 disabled:opacity-50 py-3.5 pr-20 pl-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring w-full placeholder:text-[11px] placeholder:text-muted-foreground md:placeholder:text-xs xl:placeholder:text-sm transition-all disabled:cursor-not-allowed"
						/>
						{form.coin && (
							<span className="top-1/2 right-4 absolute font-bold text-primary text-xs capitalize -translate-y-1/2">
								{form.coin}
							</span>
						)}
					</div>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
						Minimum Withdrawal ${settings?.minWithdrawal}
					</p>
				</div>

				{/* Summary */}
				{form.coin && form.address && form.amount && (
					<div className="flex flex-col gap-2 bg-primary/5 p-4 border border-primary/20 rounded-xl">
						<p className="mb-1 font-semibold text-primary text-xs">
							Withdrawal Summary
						</p>
						<div className="flex justify-between text-[10px] md:text-[11px] xl:text-xs capitalize">
							<span className="text-muted-foreground">Coin</span>
							<span className="font-medium">
								{form.coin} {coins.find((c) => c.symbol === form.coin)?.symbol}
							</span>
						</div>
						<div className="flex justify-between text-[10px] md:text-[11px] xl:text-xs capitalize">
							<span className="text-muted-foreground">Amount</span>
							<span className="font-medium">
								{formatCurrency(parseInt(form.amount, 10))} worth of {form.coin}
							</span>
						</div>
						<div className="flex justify-between gap-4 text-[10px] md:text-[11px] xl:text-xs">
							<span className="text-muted-foreground shrink-0">To Address</span>
							<span className="font-mono text-right break-all">
								{form.address}
							</span>
						</div>
					</div>
				)}

				{/* Warning */}
				<div className="flex items-start gap-3 bg-amber-500/5 p-3 border border-amber-500/20 rounded-xl text-amber-600/80 dark:text-amber-200/80">
					<Danger className="size-4 md:size-4.5 xl:size-5" />
					<p className="text-[10px] md:text-[11px] xl:text-xs leading-relaxed">
						Please ensure all details are correct before submitting. Withdrawals
						are irreversible once processed.
					</p>
				</div>

				<button
					type="button"
					onClick={handleSubmit}
					disabled={loading || !form.coin || !form.address || !form.amount}
					className="flex justify-center items-center gap-2 bg-primary hover:opacity-90 disabled:opacity-50 shadow shadow-primary/20 py-3 rounded-xl w-full font-bold text-primary-foreground active:scale-[0.99] transition-all cursor-pointer disabled:cursor-not-allowed"
				>
					{loading ? (
						<span className="border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full size-4 animate-spin" />
					) : (
						<WalletMinus className="size-4" />
					)}
					{loading ? "Processing..." : "Submit Withdrawal"}
				</button>
			</section>
		</main>
	);
};

export default Form;
