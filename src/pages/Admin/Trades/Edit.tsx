import { CloseCircle } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useAdminCloseTrade } from "#/services/mutations.service";
import { formatCurrency } from "#/utils/format";

export default function Edit({
	trade,
	onClose,
}: {
	trade: AdminTrade;
	onClose: () => void;
}) {
	const [form, setForm] = useState({
		closePrice: "",
		profit: "",
		status: "CLOSED",
	});

	const update = (field: string, value: string) =>
		setForm((p) => ({ ...p, [field]: value }));

	const closeTrade = useAdminCloseTrade();
	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!form.closePrice || !form.profit)
			return toast.error("Kindly fill all the required details");

		const payload = {
			id: trade._id,
			data: {
				closePrice: parseFloat(form.closePrice),
				profit: parseFloat(form.profit),
				status: form.status,
			},
		};
		closeTrade.mutate(payload, {
			onSuccess: () => {
				toast.success("Trade was closed successfully !!!");
				onClose();
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positive
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to close trade, Please Try Again.";
				toast.error(message);
			},
		});
	};

	const statuses = ["CLOSED", "WON", "LOST", "CANCELLED"];

	return (
		<main>
			{/* Header */}
			<div className="flex justify-between items-center bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-5 xl:px-6 py-5 border-border border-b">
				<div>
					<h2 className="font-bold text-foreground">Close Trade</h2>
					<p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						{trade.asset} · {trade.tradeType} · {formatCurrency(trade.amount)}
					</p>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="flex justify-center items-center bg-muted/30 hover:bg-muted/60 border border-border rounded-lg size-8 hover:text-destructive transition-colors cursor-pointer"
				>
					<CloseCircle className="size-4" />
				</button>
			</div>

			<form
				onSubmit={handleSubmit}
				className="space-y-5 px-4 md:px-5 xl:px-6 py-6"
			>
				{/* Close Price */}
				<div className="space-y-2">
					<Label htmlFor="closePrice">Close Price</Label>
					<Input
						id="closePrice"
						type="number"
						required
						value={form.closePrice}
						onChange={(e) => update("closePrice", e.target.value)}
						placeholder="e.g. 45000"
					/>
				</div>

				{/* Profit */}
				<div className="space-y-2">
					<Label htmlFor="profit">Profit / Loss</Label>
					<Input
						id="profit"
						type="number"
						step="any"
						required
						value={form.profit}
						onChange={(e) => update("profit", e.target.value)}
						placeholder="e.g. 250 or -100"
					/>
				</div>

				{/* Status */}
				<div className="space-y-2">
					<Label htmlFor="status">Final Status</Label>
					<div className="gap-2 grid grid-cols-2">
						{statuses.map((s) => (
							<button
								key={s}
								type="button"
								onClick={() => update("status", s)}
								className={`py-2 rounded-xl border text-[11px] md:text-xs xl:text-sm cursor-pointer font-semibold transition-all ${
									form.status === s
										? s === "WON"
											? "bg-green-500/20 border-green-500/40 text-green-400"
											: s === "LOST"
												? "bg-destructive/20 border-destructive/40 text-destructive"
												: s === "CANCELLED"
													? "bg-amber-500/20 border-amber-500/40 text-amber-400"
													: "bg-primary/20 border-primary/40 text-primary"
										: "bg-muted/20 border-border text-muted-foreground hover:bg-muted/40"
								}`}
							>
								{s}
							</button>
						))}
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-3 pt-1">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 hover:bg-muted/40 py-2.5 border border-border rounded-xl font-medium text-[11px] text-foreground md:text-xs xl:text-sm transition-colors cursor-pointer"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={closeTrade.isPending}
						className="flex flex-1 justify-center items-center gap-2 bg-primary hover:opacity-90 disabled:opacity-50 py-2.5 rounded-xl font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-all cursor-pointer"
					>
						{closeTrade.isPending && (
							<span className="border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full size-3.5 animate-spin" />
						)}
						Confirm Close
					</button>
				</div>
			</form>
		</main>
	);
}
