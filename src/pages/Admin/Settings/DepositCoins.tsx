import { motion } from "framer-motion";
import { AddSquare, ScanBarcode, Trash } from "iconsax-reactjs";
import { Loader, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { ACCEPTED_IMAGE_TYPES, inputClasses, MAX_FILE_SIZE } from "#/enum";
import { useS3Upload } from "#/hooks/useS3Upload";
import {
	useAdminDeleteDepositCoin,
	useAdminSettings,
} from "#/services/mutations.service";

type FormState = {
	coinName: string;
	symbol: string;
	walletAddress: string;
	qrCode: File | null;
};

const initialFormState: FormState = {
	coinName: "",
	symbol: "",
	walletAddress: "",
	qrCode: null,
};

const DepositCoins = ({ depositCoins }: { depositCoins: DepositCoin[] }) => {
	const [formData, setFormData] = useState<FormState>(initialFormState);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [deleting, setDeleting] = useState<boolean>(false);

	const { uploadFiles } = useS3Upload();

	// Functions
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
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

		const imageUrl = URL.createObjectURL(file);

		setSelectedImage((prev) => {
			if (prev) {
				URL.revokeObjectURL(prev);
			}
			return imageUrl;
		});
		setFormData((prev) => ({ ...prev, qrCode: file }));
		e.target.value = "";
	};

	const reset = () => {
		setFormData(initialFormState);
	};

	const updateSettings = useAdminSettings();
	const handleSubmit = async () => {
		if (!formData.qrCode)
			return toast.error("The Wallet QR Code is needed, kindly select one.");
		if (!formData.coinName || !formData.symbol || !formData.walletAddress) {
			return toast.error(
				"Incomplete Information, kindly enter all necessary fields. ",
			);
		}
		try {
			const result = await uploadFiles([formData.qrCode]);
			const payload = { ...formData, qrCode: result.urls[0] };
			updateSettings.mutate(
				{ depositCoins: [payload] },
				{
					onSuccess: () => {
						toast.success("Settings Updated !!!");
						reset();
					},
					// biome-ignore lint/suspicious/noExplicitAny: false positive
					onError: (error: any) => {
						const message =
							error?.response?.data?.message ||
							"Failed to Update, Please Try Again.";
						toast.error(message);
					},
				},
			);
		} catch (err) {
			console.error(err);
			toast.error("Failed to Update, Please Try Again.");
		}
	};

	const deleteCoin = useAdminDeleteDepositCoin();
	const handleDelete = (id: string) => {
		setDeleting(true);
		const confirmed = confirm("Do you want to delete this wallet?");
		if (confirmed) {
			deleteCoin.mutate(id, {
				onSuccess: () => {
					toast.success("Deleted !!!");
					setDeleting(false);
				},
				// biome-ignore lint/suspicious/noExplicitAny: false positive
				onError: (error: any) => {
					setDeleting(false);
					const message =
						error?.response?.data?.message ||
						"Failed to Delete, Please Try Again.";
					toast.error(message);
				},
			});
		} else toast.error("Deletion cancelled");
	};

	return (
		<main>
			<header className="bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-6 xl:px-8 py-4 border-border border-b">
				<h2 className="font-semibold text-base md:text-lg xl:text-xl">
					Deposit Coins
				</h2>
				<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Configure platform-wide deposit coins
				</p>
			</header>
			<section className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-5">
				{depositCoins.map((coin) => (
					<motion.div
						key={coin.symbol}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="relative bg-card p-4 border border-border rounded-xl"
					>
						{deleting ? (
							<Loader className="top-4 right-4 z-2 absolute size-4 md:size-4.5 xl:size-5 animate-spin" />
						) : (
							<Trash
								onClick={() => handleDelete(coin._id)}
								className="top-4 right-4 z-2 absolute size-4 md:size-4.5 xl:size-5 text-destructive cursor-pointer"
							/>
						)}
						<div className="flex items-center gap-4">
							<img
								src={coin.qrCode}
								alt={coin.coinName}
								className="border border-border rounded size-20 object-cover"
							/>

							<div className="space-y-1">
								<h3 className="font-semibold text-card-foreground capitalize">
									{coin.coinName}
								</h3>

								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase">
									{coin.symbol}
								</p>

								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm break-all">
									{coin.walletAddress}
								</p>
							</div>
						</div>
					</motion.div>
				))}
			</section>
			<section className="p-4 border-border border-t">
				<div>
					<h2 className="font-semibold text-sm md:text-base xl:text-lg">
						Add Deposit Coin
					</h2>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Create a new deposit wallet.
					</p>
				</div>
				<div className="gap-5 grid md:grid-cols-2 mt-4">
					<div>
						<label
							htmlFor="coinName"
							className="block font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer"
						>
							Coin Name <span className="text-destructive">*</span>
						</label>
						<input
							id="coinName"
							type="text"
							name="coinName"
							placeholder="Coin Name"
							value={formData.coinName}
							onChange={handleChange}
							required
							className={`${inputClasses}`}
						/>
					</div>

					<div>
						<label
							htmlFor="symbol"
							className="block font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer"
						>
							Coin Symbol <span className="text-destructive">*</span>
						</label>
						<input
							id="symbol"
							type="text"
							name="symbol"
							placeholder="Symbol"
							value={formData.symbol}
							onChange={handleChange}
							required
							className={`${inputClasses}`}
						/>
					</div>
				</div>

				<div className="my-4">
					<label
						htmlFor="walletAddress"
						className="block font-medium text-[11px] md:text-xs xl:text-sm cursor-pointer"
					>
						Coin Wallet Address <span className="text-destructive">*</span>
					</label>
					<input
						id="walletAddress"
						type="text"
						name="walletAddress"
						placeholder="Wallet Address"
						value={formData.walletAddress}
						onChange={handleChange}
						required
						className={`${inputClasses}`}
					/>
				</div>

				<label className="flex justify-center items-center gap-3 hover:bg-primary/20 px-4 py-6 border border-border border-dashed rounded-xl transition-colors cursor-pointer">
					{selectedImage ? (
						<>
							<img
								src={selectedImage}
								alt="profile"
								className="rounded size-20 md:size-24 xl:size-32 object-cover"
							/>
							{formData?.qrCode?.name}
						</>
					) : (
						<>
							<ScanBarcode size={20} />
							<span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Upload QR Code
							</span>
						</>
					)}

					<input
						type="file"
						accept=".jpg,.jpeg,.png,.gif,.webp,.svg"
						onChange={handleFileChange}
						className="hidden"
						required
					/>
				</label>

				<button
					type="button"
					onClick={handleSubmit}
					disabled={updateSettings.isPending}
					className="flex justify-center items-center gap-2 bg-primary hover:opacity-90 disabled:opacity-60 mt-4 px-4 rounded-xl w-full h-11 font-medium text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-opacity cursor-pointer"
				>
					{updateSettings.isPending ? (
						<>
							<Loader2 className="size-4 md:size-4.5 xl:size-5 animate-spin" />
							Uploading...
						</>
					) : (
						<>
							<AddSquare className="size-4 md:size-4.5 xl:size-5" />
							Add Coin
						</>
					)}
				</button>
			</section>
		</main>
	);
};

export default DepositCoins;
