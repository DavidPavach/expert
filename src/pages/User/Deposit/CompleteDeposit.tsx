import {
	Card,
	Copy,
	DocumentUpload,
	Flash,
	Headphone,
	InfoCircle,
	ReceiptText,
	ScanBarcode,
	SecuritySafe,
	Send2,
	ShieldSecurity,
	TickCircle,
} from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-fox-toast";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "#/enum";
import { useNewTx } from "#/services/mutations.service";
import { useSettingsStore } from "#/stores/settings.store";
import { useS3Upload } from "@/hooks/useS3Upload";
import { formatCurrency } from "@/utils/format";

const STEPS = [
	{
		id: 1,
		title: "Payment Method",
		active: true,
		completed: true,
	},
	{
		id: 2,
		title: "Send Payment",
		active: true,
		completed: false,
	},
	{
		id: 3,
		title: "Confirmation",
		active: false,
		completed: false,
	},
];

const FEATURES = [
	{
		icon: Headphone,
		title: "24/7 Support",
		description: "Need help? Our support team is available around the clock",
		color: "text-blue-500",
		bg: "bg-blue-500/10",
	},
	{
		icon: Flash,
		title: "Instant Processing",
		description: "Deposits are processed within minutes of confirmation",
		color: "text-green-500",
		bg: "bg-green-500/10",
	},
	{
		icon: ShieldSecurity,
		title: "Bank-Grade Security",
		description: "Your funds and data are protected with enterprise security",
		color: "text-purple-500",
		bg: "bg-purple-500/10",
	},
];

type CompleteProps = {
	coin: string;
	symbol: string;
	amount: number;
	closeModal: () => void;
};

export default function CompleteDeposit({
	coin,
	amount,
	symbol,
	closeModal,
}: CompleteProps) {
	const { settings } = useSettingsStore();

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [proofFile, setProofFile] = useState<File | null>(null);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const [copied, setCopied] = useState<boolean>(false);
	const newTx = useNewTx();
	const { uploadFiles } = useS3Upload();

	if (!settings || !coin.trim() || !amount || !symbol.trim()) {
		closeModal();
		return toast.error("Something went wrong, kindly restart the process");
	}
	const depositCoins = settings.depositCoins || [];
	const COIN_DETAILS = depositCoins.find((c) => c.coinName === coin);

	// Functions
	const toggleLoading = () => setLoading((prev) => !prev);
	const handleCopy = async () => {
		if (!COIN_DETAILS) return toast.error("Couldn't copy wallet address");
		await navigator.clipboard.writeText(COIN_DETAILS.walletAddress);

		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;

		if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
			toast.error("Only valid image formats are allowed.");
			e.target.value = "";
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			toast.error("Image must be less than 50MB.");
			e.target.value = "";
			return;
		}

		setProofFile(file);
		const imageUrl = URL.createObjectURL(file);

		setSelectedImage((prev) => {
			if (prev) {
				URL.revokeObjectURL(prev);
			}
			return imageUrl;
		});

		e.target.value = "";
	};

	const handleSubmit = async () => {
		if (!proofFile) return toast.error("Kindly attach your Payment Proof");

		try {
			toggleLoading();
			const result = await uploadFiles([proofFile]);
			const hash = result.urls[0];

			const payload = {
				type: "DEPOSIT",
				cryptoSymbol: `${coin} ${symbol}`,
				amount,
				hash,
			};

			newTx.mutate(payload, {
				onSuccess: () => {
					toast.success("Your Deposit is processing and currently pending");
					closeModal();
				},
				// biome-ignore lint/suspicious/noExplicitAny: false positive
				onError: (error: any) => {
					const message =
						error?.response?.data?.message ||
						"Failed to Process Deposit, Please Try Again.";
					toast.error(message);
					toggleLoading();
				},
			});
		} catch (error) {
			console.error(error);
			toast.error("Failed to Process Deposit, Please Try Again.");
		}
	};

	return (
		<main>
			<section className="py-6 border-border border-b overflow-hidden text-center">
				<div>
					<div className="inline-flex items-center gap-x-2 bg-primary/10 mb-5 px-4 py-2 border border-primary/20 rounded-full text-[11px] text-primary md:text-xs xl:text-sm">
						<SecuritySafe className="size-4" variant="Bold" />
						Secure Payment Gateway
					</div>

					<h1 className="font-bold text-2xl md:text-3xl xl:text-4xl tracking-tight">
						Complete Your Deposit
					</h1>

					<p className="mx-auto mt-2 max-w-2xl text-muted-foreground leading-relaxed">
						Securely deposit funds using{" "}
						<span className="font-semibold text-primary uppercase">
							{" "}
							{coin}{" "}
						</span>{" "}
						to start trading immediately
					</p>

					{/* Steps */}
					<div className="flex flex-wrap justify-center items-center gap-4 md:gap-5 mt-6">
						{STEPS.map((step, index) => (
							<div key={step.id} className="flex items-center gap-x-4">
								<div className="flex items-center gap-x-3">
									<div
										className={`flex justify-center items-center rounded-full size-10 font-bold montserrat transition-all duration-300
                                        ${
																					step.completed
																						? "bg-primary text-primary-foreground"
																						: step.active
																							? "border-2 border-primary text-primary"
																							: "bg-accent text-muted-foreground"
																				}`}
									>
										{step.completed ? (
											<TickCircle className="size-5" variant="Bold" />
										) : (
											step.id
										)}
									</div>

									<p
										className={`font-medium  ${step.active ? "text-foreground" : "text-muted-foreground"}`}
									>
										{step.title}
									</p>
								</div>

								{index !== STEPS.length - 1 && (
									<div className="hidden md:block bg-border rounded-full w-10 md:w-12 xl:w-16 h-px" />
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="bg-background mx-auto mt-6">
				<div className="shadow-sm backdrop-blur-sm border border-border rounded-3xl overflow-hidden">
					{/* Top */}
					<div className="flex lg:flex-row flex-col justify-between lg:items-center gap-5 bg-card p-5 md:p-6 border-border border-b">
						<div className="flex gap-x-2">
							<div className="flex justify-center items-center bg-primary/15 mt-1 rounded-2xl size-5 md:size-12 xl:size-14">
								<Card
									className="size-5 md:size-6 xl:size-7 text-primary"
									variant="Outline"
								/>
							</div>

							<div>
								<h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
									Payment Details
								</h2>

								<p className="mt-1 text-muted-foreground capitalize">
									{coin} Deposit
								</p>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-3">
							<div className="flex items-center gap-x-2 bg-green-500/10 px-4 py-2 border border-green-500/20 rounded-full text-[11px] text-green-500 md:text-xs xl:text-sm">
								<SecuritySafe className="size-4" variant="Bold" />
								SSL Secured
							</div>

							<div className="flex items-center gap-x-2 bg-primary/10 px-4 py-2 border border-primary/20 rounded-full text-[11px] text-primary md:text-xs xl:text-sm">
								<Headphone className="size-4" variant="Bold" />
								24/7 Support
							</div>
						</div>
					</div>

					<div className="p-4 md:p-5 xl:p-6">
						{/* Amount */}
						<div className="bg-card p-4 md:p-5 xl:p-6 border border-border rounded-2xl text-center">
							<div className="flex justify-center items-center gap-x-2 text-muted-foreground">
								<ReceiptText className="size-5" variant="Outline" />
								<p>Amount to Deposit</p>
							</div>

							<h1 className="mt-3 font-bold text-2xl md:text-3xl xl:text-4xl tracking-tight montserrat">
								{formatCurrency(amount)}
							</h1>

							<div className="inline-flex items-center gap-x-2 bg-yellow-500/10 mt-6 px-4 py-2 border border-yellow-500/20 rounded-full text-[11px] text-yellow-500 md:text-xs xl:text-sm">
								<InfoCircle className="size-4" variant="Bold" />
								Send exact amount to avoid delays
							</div>
						</div>

						{/* Steps */}
						<div className="bg-accent/10 mt-6 p-5 md:p-6 border border-border rounded-3xl">
							<div className="flex items-center gap-x-3">
								<div className="flex justify-center items-center bg-primary/10 rounded-full size-11">
									<InfoCircle className="size-5 text-primary" variant="Bold" />
								</div>

								<h2 className="font-semibold text-base md:text-lg xl:text-xl">
									How to Complete Your Payment
								</h2>
							</div>

							<div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-8">
								{[
									{
										step: "01",
										title: "Send Payment",
										description: `Transfer ${formatCurrency(amount)} to the wallet address`,
									},
									{
										step: "02",
										title: "Upload Proof",
										description: "Take a screenshot of your transaction",
									},
									{
										step: "03",
										title: "Submit & Wait",
										description: "Submit proof and wait for confirmation",
									},
								].map((item) => (
									<div key={item.step} className="flex gap-x-4">
										<div className="flex justify-center items-center bg-primary rounded-full min-w-9 h-9 font-bold text-primary-foreground text-sm montserrat">
											{item.step}
										</div>

										<div>
											<h3 className="font-semibold text-sm md:text-base xl:text-lg">
												{item.title}
											</h3>

											<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed montserrat">
												{item.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* QR + Upload */}
						<div className="gap-6 grid grid-cols-1 xl:grid-cols-2 mt-6">
							{/* QR */}
							<div>
								<div className="flex items-center gap-x-2 mb-5">
									<ScanBarcode
										className="size-5 text-primary"
										variant="Outline"
									/>
									<h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
										QR Code Payment
									</h2>
								</div>

								<div className="bg-card shadow-sm p-4 md:p-5 xl:p-6 rounded-3xl">
									<img
										src={COIN_DETAILS?.qrCode}
										alt="qr-code"
										className="mx-auto rounded-2xl w-full max-w-60"
									/>
								</div>

								<p className="mt-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm text-center">
									Scan with your wallet app to send payment instantly
								</p>
							</div>

							{/* Upload */}
							<div>
								{/* Wallet */}
								<div>
									<div className="flex items-center gap-x-2 mb-5">
										<Card className="size-5 text-primary" variant="Outline" />
										<h2 className="font-semibold text-base md:text-lg xl:text-xl">
											Wallet Address
										</h2>
									</div>

									<div className="flex border border-border rounded-2xl overflow-hidden">
										<div className="flex items-center bg-accent/10 px-4 py-4 w-full overflow-hidden">
											<p className="font-medium text-[11px] md:text-xs xl:text-sm truncate">
												{COIN_DETAILS?.walletAddress}
											</p>
										</div>

										<button
											type="button"
											onClick={handleCopy}
											className="flex items-center gap-x-2 bg-primary hover:opacity-90 px-5 font-semibold text-primary-foreground transition-all duration-300 cursor-pointer"
										>
											<Copy className="size-5" variant="Outline" />
											{copied ? "Copied" : "Copy"}
										</button>
									</div>
								</div>

								{/* Upload */}
								<div className="mt-6">
									<div className="flex items-center gap-x-2 mb-5">
										<DocumentUpload
											className="size-5 text-primary"
											variant="Outline"
										/>

										<h2 className="font-semibold text-base md:text-lg xl:text-xl">
											Upload Payment Proof
										</h2>
									</div>

									<input
										ref={fileInputRef}
										type="file"
										hidden
										accept=".jpg,.jpeg,.png,.gif,.webp,.svg"
										onChange={handleImageChange}
									/>

									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="group flex flex-col justify-center items-center gap-y-3 hover:bg-primary/5 px-4 md:px-5 xl:px-6 border-2 border-border border-dashed rounded-3xl w-full h-60 transition-all duration-300 cursor-pointer"
									>
										{selectedImage ? (
											<img
												src={selectedImage}
												alt="Proof"
												className="rounded-xl size-24 md:size-28 xl:size-32"
											/>
										) : (
											<div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 rounded-full size-20 transition-all duration-300">
												<DocumentUpload
													className="size-9 text-primary"
													variant="Bulk"
												/>
											</div>
										)}

										<div>
											<p className="font-semibold text-sm md:text-base xl:text-lg">
												{proofFile
													? proofFile.name
													: "Choose file or drag & drop"}
											</p>

											<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
												PNG, JPG, GIF up to 10MB
											</p>
										</div>
									</button>
								</div>
							</div>
						</div>

						{/* Submit */}
						<div className="mt-6">
							<button
								onClick={handleSubmit}
								disabled={newTx.isPending || !proofFile || loading}
								type="button"
								className="group flex justify-center items-center gap-x-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 py-4 rounded-2xl w-full font-semibold text-white transition-all duration-300 cursor-pointer"
							>
								{newTx.isPending || loading ? (
									<Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
								) : (
									<>
										<Send2
											className="size-5 transition-all group-hover:translate-x-1 duration-300"
											variant="Outline"
										/>
										Submit Payment Proof
									</>
								)}
							</button>

							<div className="flex justify-center items-center gap-x-2 mt-5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								<SecuritySafe
									className="size-4 text-green-500"
									variant="Bold"
								/>
								Protected by 256-bit SSL encryption
							</div>
						</div>
					</div>
				</div>

				{/* Features */}
				<div className="gap-5 grid grid-cols-1 md:grid-cols-3 mt-6">
					{FEATURES.map((feature) => {
						const Icon = feature.icon;
						return (
							<div
								key={feature.title}
								className="bg-card/70 shadow-sm backdrop-blur-sm p-4 md:p-5 xl:p-6 border border-border rounded-3xl transition-all hover:-translate-y-1 duration-300"
							>
								<div
									className={`flex justify-center items-center rounded-2xl size-10 md:size-12 xl:size-14 ${feature.bg}`}
								>
									<Icon
										className={`size-5 md:size-6 xl:size-7 ${feature.color}`}
										variant="Bulk"
									/>
								</div>

								<h2 className="mt-6 font-semibold text-base md:text-lg xl:text-xl">
									{feature.title}
								</h2>

								<p className="mt-1 text-muted-foreground leading-relaxed">
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>
			</section>
		</main>
	);
}
