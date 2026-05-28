import { Edit, PresentionChart } from "iconsax-reactjs";
import { useState } from "react";
import { formatCurrency, formatDate } from "#/utils/format";
import EditModal from "./Edit";

const STATUS_STYLES = {
	ACTIVE: "bg-green-500/15 text-green-500 border-green-500/20",
	PAUSED: "bg-amber-500/15 text-amber-500 border-amber-500/20",
	CLOSED: "bg-red-500/15 text-red-500 border-red-500/20",
};
const Table = ({
	filtered,
	total,
	loading,
}: {
	filtered: AdminCopyTrading[];
	total: number;
	loading: boolean;
}) => {
	const [editing, setEditing] = useState<AdminCopyTrading | null>(null);
	return (
		<main>
			{/* Table */}
			<div className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				<div className="bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-5 md:px-7 py-5 border-border border-b">
					<h2 className="font-bold">Copy Trading Sessions</h2>
					<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						{filtered.length} of {total} records
					</p>
				</div>

				{loading ? (
					<div className="flex justify-center items-center py-16">
						<div className="border-4 border-border border-t-primary rounded-full size-6 md:size-7 xl:size-8 animate-spin" />
					</div>
				) : filtered.length === 0 ? (
					<div className="flex flex-col items-center gap-3 py-16 text-center">
						<div className="flex justify-center items-center bg-muted/30 border border-border rounded-xl size-10 md:size-11 xl:size-12">
							<PresentionChart className="size-5 md:size-5.5 xl:size-6 text-muted-foreground" />
						</div>
						<p className="font-semibold text-[11px] md:text-xs xl:text-sm">
							No records found
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
										"User",
										"Trader",
										"Invested",
										"Current Val",
										"PnL",
										"ROI",
										"Win Rate",
										"Entries",
										"Status",
										"Created",
										"Edit",
									].map((h) => (
										<th
											key={h}
											className="px-4 md:px-5 py-3 font-semibold text-[11px] text-muted-foreground md:text-xs xl:text-sm text-left whitespace-nowrap"
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{filtered.map((r) => (
									<tr
										key={r._id}
										className="hover:bg-muted/20 border-border/50 border-b transition-colors"
									>
										{/* User */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<div className="font-medium capitalize">
												{r.user.username || "—"}
											</div>
											<div className="text-[10px] text-muted-foreground">
												{r.user.email || ""}
											</div>
										</td>
										{/* Trader */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<div className="font-medium text-primary">
												{r.masterTraderId.name || "—"}
											</div>
											<div className="text-[10px] text-muted-foreground">
												{r.masterTraderId.title || ""}
											</div>
										</td>
										{/* Invested */}
										<td className="px-4 md:px-5 py-4 font-semibold whitespace-nowrap">
											{formatCurrency(r.investment || 0)}
										</td>
										{/* Current Value */}
										<td className="px-4 md:px-5 py-4 font-semibold whitespace-nowrap">
											{formatCurrency(r.currentValue || 0)}
										</td>
										{/* PnL */}
										<td className="px-4 md:px-5 py-4 font-semibold whitespace-nowrap">
											<span
												className={
													(r.pnl || 0) >= 0
														? "text-green-400"
														: "text-destructive"
												}
											>
												{(r.pnl || 0) >= 0 ? "+" : ""}$
												{(r.pnl || 0).toLocaleString()}
											</span>
										</td>
										{/* ROI */}
										<td className="px-4 md:px-5 py-4 font-semibold whitespace-nowrap">
											<span
												className={
													(r.roi || 0) >= 0
														? "text-green-400"
														: "text-destructive"
												}
											>
												{(r.roi || 0) >= 0 ? "+" : ""}
												{(r.roi || 0).toFixed(2)}%
											</span>
										</td>
										{/* Win Rate */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											{(r.winRate || 0).toFixed(1)}%
										</td>
										{/* Entries */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span className="bg-muted/40 px-2.5 py-1 border border-border rounded-full font-medium text-xs">
												{(r.entries || []).length}
											</span>
										</td>
										{/* Status */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span
												className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[r.status] || STATUS_STYLES.ACTIVE}`}
											>
												{r.status || "ACTIVE"}
											</span>
										</td>
										{/* Created */}
										<td className="px-4 md:px-5 py-4 text-[11px] text-muted-foreground whitespace-nowrap">
											{r.createdAt ? formatDate(r.createdAt) : "—"}
										</td>
										{/* Edit */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<button
												type="button"
												onClick={() => setEditing(r)}
												className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 border border-primary/30 rounded-lg font-medium text-primary text-xs transition-colors cursor-pointer"
											>
												<Edit className="size-3.5" />
												Edit
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			{editing && (
				<EditModal record={editing} onClose={() => setEditing(null)} />
			)}
		</main>
	);
};

export default Table;
