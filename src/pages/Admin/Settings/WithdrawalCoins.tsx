import { motion } from "framer-motion";
import { AddSquare, Trash } from "iconsax-reactjs";
import { Loader, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { inputClasses } from "#/enum";
import {
	useAdminDeleteWithdrawalCoin,
	useAdminSettings,
} from "#/services/mutations.service";

type FormState = {
	coinName: string;
	symbol: string;
};

const initialFormState: FormState = {
	coinName: "",
	symbol: "",
};

const WithdrawalCoins = ({
	withdrawalCoins,
}: {
	withdrawalCoins: WithdrawalCoin[];
}) => {
	const [formData, setFormData] = useState<FormState>(initialFormState);
	const [deleting, setDeleting] = useState<boolean>(false);

	// Functions
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const updateSettings = useAdminSettings();
	const handleSubmit = () => {
		if (!formData.coinName || !formData.symbol)
			return toast.error("Kindly fill all the required fields");

		updateSettings.mutate(
			{ withdrawalCoins: [formData] },
			{
				onSuccess: () => {
					toast.success("Settings Updated !!!");
					setFormData(initialFormState);
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
	};

	const deleteCoin = useAdminDeleteWithdrawalCoin();
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
					Withdrawal Coins
				</h2>
				<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Configure platform-wide withdrawal coins
				</p>
			</header>
			<section className="gap-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-5">
				{withdrawalCoins.map((coin) => (
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

						<div className="space-y-1">
							<h3 className="font-semibold text-card-foreground capitalize">
								{coin.coinName}
							</h3>

							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase">
								{coin.symbol}
							</p>
						</div>
					</motion.div>
				))}
			</section>
			<section className="p-4 border-border border-t">
				<div>
					<h2 className="font-semibold text-sm md:text-base xl:text-lg">
						Add Withdrawal Coin
					</h2>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Create a new withdrawal wallet.
					</p>
				</div>
				<div className="space-y-5 mt-4">
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
				</div>
			</section>
		</main>
	);
};

export default WithdrawalCoins;
