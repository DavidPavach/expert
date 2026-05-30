import { DocumentCopy, Edit, Trash } from "iconsax-reactjs";
import { CircleCheckBig, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Overlay } from "#/components/Overlay";
import EditTraderForm from "#/pages/Admin/Traders/EditTrader";
import { useAdminDeleteTrader } from "#/services/mutations.service";
import { formatCurrency } from "#/utils/format";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ExpertCard({
	expert,
	isAdmin,
	copy,
	isCopying,
	isLoading,
}: {
	expert: Trader;
	isAdmin: boolean;
	copy?: (amount: number, id: string, name: string) => void;
	isLoading: boolean;
	isCopying: boolean;
}) {
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const [amount, setAmount] = useState(expert.minInvestment);

	// Functions
	const toggleEdit = () => setOpenEdit((prev) => !prev);

	const deleteTrader = useAdminDeleteTrader();
	const handleDelete = (id: string) => {
		const confirmation = confirm("Do you want to delete this Trader?");
		if (!confirmation) return toast.error("Deletion Cancelled");
		deleteTrader.mutate(id, {
			onSuccess: () => {
				toast.success("Transaction deleted successfully!");
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positives
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to delete Trader. Kindly retry.";
				toast.error(message);
			},
		});
	};

	return (
		<>
			<div className="flex flex-col bg-card/80 shadow-xl backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				{/* Active badge */}
				<div className="flex justify-between items-center px-5 pt-4">
					{expert.active && (
						<span className="bg-green-500/15 px-2.5 py-1 border border-green-500/20 rounded-full font-semibold text-[10px] text-green-400">
							Active
						</span>
					)}
					{isAdmin ? (
						<span className="flex gap-x-5">
							<Edit
								onClick={toggleEdit}
								className="size-5 md:size-5.5 xl:size-6 text-primary cursor-pointer"
								variant="Bold"
							/>
							<Trash
								onClick={() => handleDelete(expert._id)}
								className="size-5 md:size-5.5 xl:size-6 text-destructive cursor-pointer"
								variant="Bold"
							/>
						</span>
					) : (
						<span />
					)}
				</div>

				{/* Avatar + name */}
				<div className="flex flex-col items-center px-5 pt-3 pb-5 border-border border-b text-center">
					<div className="flex justify-center items-center bg-primary/20 mb-3 border-2 border-primary/30 rounded-2xl size-16 md:size-18 xl:size-20">
						{expert.profilePicture ? (
							<img
								src={expert.profilePicture}
								alt={expert.name}
								className="rounded-2xl w-full h-full object-cover"
							/>
						) : (
							<span className="font-bold text-primary text-base md:text-lg xl:text-xl">
								{expert.name.slice(0, 2)}
							</span>
						)}
					</div>
					<h3 className="font-bold">{expert.name}</h3>
					<p className="mb-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						{expert.title}
					</p>
					{/* Stars */}
					<div className="flex items-center gap-1 mb-1">
						{["star-1", "star-2", "star-3", "star-4", "star-5"].map(
							(star, index) => (
								<svg
									key={star}
									className={`size-3.5 md:size-4 xl:size-4.5 ${
										index < expert.ratings
											? "text-amber-600 dark:text-amber-400"
											: "text-muted"
									}`}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<title>star</title>

									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							),
						)}
						<span className="ml-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							({expert.ratingsTotal})
						</span>
					</div>
					<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						{expert.totalFollowers.toLocaleString()} followers
					</p>
				</div>

				{/* Metrics grid */}
				<div className="gap-3 grid grid-cols-2 px-5 py-4 border-border border-b">
					<div className="bg-accent/10 px-4 py-2 rounded-lg">
						<p className="font-bold text-base md:text-lg xl:text-xl">
							{expert.winRate}%
						</p>
						<div className="bg-muted mt-1 mb-0.5 rounded-full h-1 overflow-hidden">
							<div
								className="bg-green-500 rounded-full h-full"
								style={{ width: `${expert.winRate}%` }}
							/>
						</div>
						<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							Win Rate
						</p>
					</div>
					<div className="bg-accent/10 px-4 py-2 rounded-lg">
						<p className="font-bold text-green-500 text-base md:text-lg xl:text-xl">
							+{expert.totalReturn.toLocaleString()}%
						</p>
						<p className="mt-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							Total Return
						</p>
					</div>
					<div className="bg-accent/10 px-4 py-2 rounded-lg">
						<p className="font-bold text-[11px] md:text-xs xl:text-sm">
							${expert.equity.toLocaleString()}
						</p>
						<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							Equity
						</p>
					</div>
					<div className="bg-accent/10 px-4 py-2 rounded-lg">
						<p className="font-bold text-[11px] md:text-xs xl:text-sm">
							{expert.totalTrades.toLocaleString()}
						</p>
						<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							Total Trades
						</p>
					</div>
				</div>

				{/* Bio */}
				<div className="flex-1 px-5 py-4">
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm line-clamp-3 leading-relaxed">
						{expert.bio}
					</p>
				</div>

				{/* Min investment + CTA */}
				<div className="flex flex-col gap-3 px-5 pb-5">
					<div className="flex justify-between items-center bg-muted/20 px-4 py-2.5 border border-border rounded-xl">
						<span className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							Minimum Investment
						</span>
						<span className="font-bold text-[11px] md:text-xs xl:text-sm">
							{formatCurrency(expert.minInvestment)}
						</span>
					</div>
					{!isAdmin && (
						<div className="space-y-1">
							<Label className="text-[10px] md:text-[11px] xl:text-xs">
								Investment Amount <span className="text-destructive">*</span>
							</Label>
							<Input
								placeholder="Enter Amount"
								type="number"
								min={expert.minInvestment}
								required={true}
								value={amount}
								onChange={(e) =>
									setAmount(parseFloat(e.target.value) || expert.minInvestment)
								}
							/>
						</div>
					)}
					{!isAdmin &&
						(isCopying ? (
							<button
								type="button"
								className="flex justify-center items-center gap-2 bg-muted/30 py-3 border border-border rounded-xl w-full font-semibold text-muted-foreground cursor-not-allowed"
							>
								<CircleCheckBig className="size-5 md:size-5.5 xl:size-6" />
								Already Copying
							</button>
						) : (
							<button
								disabled={isCopying || isLoading}
								onClick={() => {
									if (!copy) return;
									copy(amount, expert._id, expert.name);
								}}
								type="button"
								className="flex justify-center items-center gap-2 bg-primary hover:opacity-90 shadow-lg shadow-primary/20 py-3 rounded-xl w-full font-bold text-primary-foreground transition-all cursor-pointer"
							>
								{isLoading ? (
									<>
										<Loader className="size-5 md:size-5.5 xl:size-6" />
										Copy
									</>
								) : (
									<>
										<DocumentCopy className="size-5 md:size-5.5 xl:size-6" />
										Start Copying ({formatCurrency(expert.minInvestment)})
									</>
								)}
							</button>
						))}
				</div>
			</div>
			<Overlay open={openEdit} onClose={toggleEdit} variant="bottom">
				<EditTraderForm trader={expert} onClose={toggleEdit} />
			</Overlay>
		</>
	);
}
