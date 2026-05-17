import {
	AddSquare,
	ArrowDown2,
	Card,
	SecuritySafe,
	TickCircle,
} from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { useSettingsStore } from "#/stores/settings.store";
import CompleteDeposit from "./CompleteDeposit";

const QUICK_AMOUNTS = [100, 500, 1000, 5000];

export default function Form() {
	const [amount, setAmount] = useState("");
	const [complete, setComplete] = useState<boolean>(false);
	const [paymentMethod, setPaymentMethod] = useState("ethereum");
	const [loading, setLoading] = useState<boolean>(false);

	const { settings } = useSettingsStore();
	const PAYMENT_METHODS = settings?.depositCoins || [];

	const selectedMethod = PAYMENT_METHODS.find(
		(method) => method.coinName === paymentMethod,
	);

	// Functions
	const toggleComplete = () => setComplete((prev) => !prev);

	const handleSubmit = () => {
		setLoading(true);
		if (parseInt(amount, 10) < (settings?.minDeposit ?? 0)) {
			return toast.error("Amount is less than Minimum Deposit");
		}
		if (!amount.trim() || !paymentMethod.trim()) {
			return toast.error("Kindly Select a Deposit coin and enter an Amount.");
		}

		setTimeout(() => {
			setLoading(false);
			toggleComplete();
		}, 1500);
	};

	return complete ? (
		<CompleteDeposit
			coin={paymentMethod}
			symbol={selectedMethod?.symbol || ""}
			amount={parseInt(amount, 10)}
			closeModal={toggleComplete}
		/>
	) : (
		<main>
			{/* Header */}
			<div className="px-4 py-8 md:py-10 border-border border-b overflow-hidden text-center">
				<div>
					<div className="inline-flex items-center gap-x-2 bg-primary/10 mb-4 px-2 py-2 border border-primary/20 rounded-full text-[11px] text-primary md:text-xs xl:text-sm">
						<SecuritySafe className="size-4" variant="Bold" />
						<span>256-bit Secure Deposit</span>
					</div>

					<h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight">
						Fund Your Account
					</h1>

					<p className="mx-auto mt-2 max-w-xl text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
						Deposit funds securely and begin managing your Trade portfolio
						instantly.
					</p>
				</div>
			</div>

			{/* Quick amounts */}
			<div className="flex flex-col items-center mt-8 px-4">
				<p className="mb-4 font-medium text-muted-foreground text-sm md:text-base">
					Quick Select Amount
				</p>

				<div className="flex flex-wrap justify-center gap-3">
					{QUICK_AMOUNTS.map((quickAmount) => {
						const isActive = amount === String(quickAmount);
						return (
							<button
								type="button"
								key={quickAmount}
								onClick={() => setAmount(String(quickAmount))}
								className={`px-4 py-2.5 rounded-xl border font-semibold transition-all duration-300 cursor-pointer montserrat
                                    ${
																			isActive
																				? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
																				: "bg-primary/10 hover:bg-primary/20 border-border"
																		}`}
							>
								${quickAmount.toLocaleString()}
							</button>
						);
					})}
				</div>
			</div>

			{/* Content */}
			<div className="gap-3 md:gap-4 xl:gap-5 grid grid-cols-1 xl:grid-cols-[1fr_380px] mx-auto mt-8 px-4">
				{/* Deposit Form */}
				<div className="bg-card/70 shadow-sm backdrop-blur-sm p-4 md:p-5 xl:p-6 border border-border rounded-2xl h-fit">
					{/* Top */}
					<div className="flex justify-between sm:items-center gap-4">
						<div>
							<h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
								Make a Deposit
							</h2>

							<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Fast and secure funding
							</p>
						</div>

						<div className="flex items-center gap-x-2 bg-green-500/10 px-2 sm:px-4 py-2 border border-green-500/20 rounded-full size-fit text-[11px] text-green-500 md:text-xs xl:text-sm">
							<TickCircle className="size-4" variant="Bold" />
							<span className="hidden sm:inline">Secure Payment</span>
						</div>
					</div>

					{/* Payment Method */}
					<div className="mt-8">
						<label
							htmlFor=""
							className="block mb-3 font-medium text-[11px] md:text-sm xl:text-base"
						>
							Payment Method <span className="text-red-500">*</span>
						</label>

						<div className="relative">
							<select
								value={paymentMethod}
								onChange={(e) => setPaymentMethod(e.target.value)}
								className="bg-accent/10 hover:bg-accent/20 dark:bg-accent/20 px-4 py-3 border border-border focus:border-primary/40 rounded-xl outline-none focus:ring-0 w-full text-foreground capitalize transition-all duration-300 appearance-none cursor-pointer"
							>
								{PAYMENT_METHODS.map((method) => (
									<option
										key={method.coinName}
										value={method.coinName}
										className="bg-background text-foreground capitalize"
									>
										{method.coinName}{" "}
										<span className="uppercase">{method.symbol}</span>
									</option>
								))}
							</select>

							<ArrowDown2
								className="top-1/2 right-5 absolute size-5 text-muted-foreground -translate-y-1/2 pointer-events-none"
								variant="Outline"
							/>
						</div>
					</div>

					{/* Amount */}
					<div className="mt-7">
						<label
							htmlFor="amount"
							className="block mb-3 font-medium text-sm md:text-base"
						>
							Amount to Deposit <span className="text-red-500">*</span>
						</label>

						<div className="flex items-center gap-x-3 bg-accent/10 hover:bg-accent/20 px-4 border border-border focus-within:border-primary/40 rounded-xl transition-all duration-300">
							<span className="font-medium text-primary">$</span>

							<input
								id="amount"
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder="0.00"
								min={settings?.minDeposit || 1}
								className="bg-transparent py-3 outline-none w-full placeholder:text-muted-foreground montserrat"
							/>
						</div>

						<div className="flex justify-between items-center mt-3">
							{amount.trim() ? (
								<p className="text-[11px] text-destructive md:text-xs xl:text-sm montserrat">
									{parseInt(amount, 10) < (settings?.minDeposit ?? 0) &&
										`$${amount.toLocaleString()} is less than Minimum Deposit`}
								</p>
							) : (
								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
									Minimum deposit is ${settings?.minDeposit}
								</p>
							)}
							<p className="font-medium text-[11px] text-primary md:text-xs xl:text-sm">
								Instant Processing
							</p>
						</div>
					</div>

					{/* Summary */}
					<div className="bg-primary/5 mt-7 p-4 border border-primary/10 rounded-xl">
						<div className="flex justify-between items-center">
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Selected Method
							</p>
							<p className="font-semibold text-[11px] md:text-xs xl:text-sm capitalize">
								{selectedMethod?.coinName}
							</p>
						</div>

						<div className="flex justify-between items-center mt-3">
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Deposit Amount
							</p>

							<p className="font-bold text-primary text-sm md:text-base xl:text-lg montserrat">
								$ {amount || "0.00"}
							</p>
						</div>
					</div>

					{/* Button */}
					<button
						type="button"
						onClick={handleSubmit}
						disabled={loading || !amount.trim() || !paymentMethod.trim()}
						className="group flex justify-center items-center gap-x-2 bg-primary hover:opacity-90 disabled:opacity-70 mt-7 py-4 rounded-2xl w-full font-semibold text-primary-foreground transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
					>
						{loading ? "Processing" : "Proceed with Deposit"}
						{loading ? (
							<Loader className="size-5 animate-spin" />
						) : (
							<AddSquare className="size-5 group-hover:rotate-6 transition-all duration-300" />
						)}
					</button>
				</div>

				{/* Sidebar */}
				<div className="flex flex-col gap-5">
					{/* Methods */}
					<div className="bg-card/70 shadow-sm backdrop-blur-sm p-4 md:p-5 xl:p-6 border border-border rounded-3xl">
						<h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
							Payment Methods
						</h2>

						<div className="flex flex-col gap-3 mt-6">
							{PAYMENT_METHODS.map((method) => {
								const isActive = paymentMethod === method.coinName;

								return (
									<button
										type="button"
										key={method.coinName}
										onClick={() => setPaymentMethod(method.coinName)}
										className={`flex items-center gap-x-4 px-4 py-3 border capitalize rounded-xl transition-all duration-300 cursor-pointer text-left
                                            ${isActive ? "bg-primary/10 border-primary/30" : "bg-accent/5 hover:bg-accent/10 border-border"}`}
									>
										<div
											className={`flex justify-center items-center rounded-xl size-11  ${isActive ? "bg-primary/20" : "bg-accent/10"}`}
										>
											<Card
												className={`size-5  ${isActive ? "text-primary" : "text-muted-foreground"}`}
												variant="Outline"
											/>
										</div>

										<div>
											<p className="font-medium capitalize">
												{method.coinName}{" "}
												<span className="uppercase">{method.symbol}</span>
											</p>
											<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
												Crypto Wallet
											</p>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Steps */}
					<div className="bg-card/70 shadow-sm backdrop-blur-sm p-4 md:p-5 xl:p-6 border border-border rounded-xl">
						<h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
							How it Works
						</h2>

						<div className="flex flex-col gap-5 mt-6">
							{[
								"Choose your preferred payment method",
								"Enter your desired deposit amount",
								"Complete the secure transaction",
							].map((step, index) => (
								<div key={step} className="flex items-start gap-x-4">
									<div className="flex justify-center items-center bg-primary/10 border border-primary/20 rounded-full min-w-10 h-10 font-bold text-primary montserrat">
										0{index + 1}
									</div>

									<div>
										<p className="font-medium"> {step} </p>

										<p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
											Quick and secure processing
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
