import { Candle, CloseCircle, Trash } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { useAdminDeleteTrade } from "#/services/mutations.service";
import { formatCurrency, formatDate } from "#/utils/format";

const STATUS_STYLES = {
	OPEN: "bg-blue-500/15 text-blue-400 border-blue-500/20",
	WON: "bg-green-500/15 text-green-400 border-green-500/20",
	LOST: "bg-destructive/15 text-destructive border-destructive/20",
	CLOSED: "bg-muted/40 text-muted-foreground border-border",
	CANCELLED: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

const TRADE_TYPE_STYLES = {
	BUY: "bg-green-500/10 text-green-400 border-green-500/20",
	SELL: "bg-destructive/10 text-destructive border-destructive/20",
};

const Table = ({
	filtered,
	length,
	loading,
	setClose,
}: {
	filtered: AdminTrade[];
	length: number;
	loading: boolean;
	setClose: (t: AdminTrade) => void;
}) => {
	const [confirmDelete, setConfirmDelete] = useState<AdminTrade | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const deleteTrade = useAdminDeleteTrade();
	const deletion = (id: string) => {
		setDeletingId(id);
		deleteTrade.mutate(id, {
			onSuccess: () => {
				toast.success("Trade was deleted successfully !!!");
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positive
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to delete trade, Please Try Again.";
				setDeletingId(null);
				toast.error(message);
			},
		});
	};

	return (
		<div className="bg-card/80 shadow-2xl backdrop-blur-md border border-border rounded-2xl overflow-hidden">
			<div className="flex justify-between items-center bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-5 xl:px-6 py-5 border-border border-b">
				<div>
					<h2 className="font-bold">Trade Records</h2>
					<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						{filtered.length} of {length} trades
					</p>
				</div>
			</div>

			{loading ? (
				<div className="flex justify-center items-center py-16">
					<div className="border-4 border-border border-t-primary rounded-full size-6 md:size-7 xl:size-8 animate-spin" />
				</div>
			) : filtered.length === 0 ? (
				<div className="flex flex-col items-center gap-3 py-16 text-center">
					<div className="flex justify-center items-center bg-muted/30 border border-border rounded-xl size-10 md:size-11 xl:size-12">
						<Candle className="size-5 md:size-5.5 xl:size-6 text-muted-foreground" />
					</div>
					<p className="font-semibold text-[11px] md:text-xs xl:text-sm">
						No trades found
					</p>
					<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						Try adjusting your search or filters
					</p>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="w-full text-[11px] md:text-xs xl:text-sm">
						<thead>
							<tr className="border-border border-b">
								{[
									"Date",
									"User",
									"Asset",
									"Type",
									"Amount",
									"Entry Price",
									"Leverage",
									"Profit",
									"Expiration",
									"Status",
									"Actions",
								].map((h) => (
									<th
										key={h}
										className="px-4 md:px-5 py-3 font-semibold text-muted-foreground text-left whitespace-nowrap"
									>
										{h}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{filtered.map((t) => (
								<tr
									key={t._id}
									className="hover:bg-muted/20 border-border/50 border-b transition-colors"
								>
									{/* Date */}
									<td className="px-4 md:px-5 py-4 text-muted-foreground whitespace-nowrap">
										{formatDate(t.createdAt)}
									</td>
									{/* User */}
									<td className="px-4 md:px-5 py-4 whitespace-nowrap">
										<p className="font-medium capitalize">
											{t.user.username || "—"}
										</p>
										<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
											{t.user.email || "—"}
										</p>
									</td>
									{/* Asset */}
									<td className="px-4 md:px-5 py-4 whitespace-nowrap">
										<span className="bg-muted/40 px-2.5 py-1 border border-border rounded-lg font-bold">
											{t.asset || "—"}
										</span>
									</td>
									{/* Type */}
									<td className="px-4 md:px-5 py-4 whitespace-nowrap">
										<span
											className={`font-bold px-2.5 py-1 rounded-full border ${TRADE_TYPE_STYLES[t.tradeType] || ""}`}
										>
											{t.tradeType || "—"}
										</span>
									</td>
									{/* Amount */}
									<td className="px-4 md:px-5 py-4 font-bold whitespace-nowrap">
										{formatCurrency(t.amount)}
									</td>
									{/* Entry Price */}
									<td className="px-4 md:px-5 py-4 text-muted-foreground whitespace-nowrap">
										{formatCurrency(t.entryPrice)}
									</td>
									{/* Leverage */}
									<td className="px-4 md:px-5 py-4 whitespace-nowrap">
										{t.leverage || "—"}
									</td>
									{/* Profit */}
									<td className="px-4 md:px-5 py-4 whitespace-nowrap">
										<span
											className={`font-bold ${t.profit > 0 ? "text-green-400" : t.profit < 0 ? "text-destructive" : "text-muted-foreground"}`}
										>
											{t.profit > 0 ? "+" : ""}
											{formatCurrency(t.profit)}
										</span>
									</td>
									{/* Expiration */}
									<td className="px-4 md:px-5 py-4 text-muted-foreground text-xs whitespace-nowrap">
										{t.expiration ? formatDate(t.expiration) : "—"}
									</td>
									{/* Status */}
									<td className="px-4 md:px-5 py-4 whitespace-nowrap">
										<span
											className={`font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[t.status] || STATUS_STYLES.OPEN}`}
										>
											{t.status}
										</span>
									</td>
									{/* Actions */}
									<td className="px-4 md:px-5 py-4 whitespace-nowrap">
										<div className="flex items-center gap-2">
											{t.status === "OPEN" && (
												<button
													type="button"
													onClick={() => setClose(t)}
													className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 border border-primary/30 rounded-lg font-medium text-primary text-xs transition-colors cursor-pointer"
												>
													<CloseCircle className="size-3 md:size-3.5 xl:size-4" />
													Close
												</button>
											)}
											{confirmDelete?._id === t._id ? (
												<div className="flex items-center gap-1">
													<button
														type="button"
														onClick={() => deletion(t._id)}
														disabled={deletingId === t._id}
														className="bg-destructive/15 hover:bg-destructive/25 disabled:opacity-50 px-2.5 py-1.5 border border-destructive/40 rounded-lg font-semibold text-[10px] text-destructive transition-colors cursor-pointer"
													>
														{deletingId === t._id ? "..." : "Confirm"}
													</button>
													<button
														type="button"
														onClick={() => setConfirmDelete(null)}
														className="bg-muted/20 hover:bg-muted/40 px-2.5 py-1.5 border border-border rounded-lg xl:size-sm font-medium text-[11px] text-muted-foreground md:text-xs transition-colors cursor-pointer"
													>
														Cancel
													</button>
												</div>
											) : (
												<button
													type="button"
													onClick={() => setConfirmDelete(t)}
													className="flex items-center gap-1.5 bg-destructive/10 hover:bg-destructive/20 px-3 py-1.5 border border-destructive/30 rounded-lg xl:size-sm font-medium text-[11px] text-destructive md:text-xs transition-colors cursor-pointer"
												>
													<Trash className="size-3 md:size-3.5 xl:size-4" />
													Delete
												</button>
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Table;
