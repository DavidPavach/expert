import { formatCurrency, formatDate } from "#/utils/format";

const Table = ({ tradings }: { tradings: CopyTrading[] }) => {
	return (
		<main>
			{tradings.length === 0 ? (
				<div className="flex justify-center items-center bg-card mx-auto py-20 rounded-xl">
					<p className="text-destructive capitalize">No Copy Positions Yet</p>
				</div>
			) : (
				<main className="pb-4 rounded-xl overflow-x-auto">
					<table className="border border-border w-full text-nowrap">
						<thead>
							<tr className="bg-neutral-50 dark:bg-neutral-950 *:px-4 *:py-3 border-border border-b *:font-semibold *:text-left">
								<th>Expert</th>
								<th>Investment</th>
								<th>Final Value</th>
								<th>P&L</th>
								<th>ROI</th>
								<th>Start Date</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{tradings.map((trading) => (
								<tr
									key={trading._id}
									className="hover:bg-neutral-100 dark:bg-neutral-900 *:px-4 *:py-3 border-border border-b transition-colors"
								>
									<td>
										<div className="flex items-center gap-x-3">
											<img
												src={trading.masterTraderId.profilePicture}
												alt="Trader"
												className="rounded-full size-8 md:size-9 xl:size-10"
											/>
											<div className="pr-2">
												<p className="font-medium">
													{trading.masterTraderId.name}
												</p>
												<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
													{trading.masterTraderId.title}
												</p>
											</div>
										</div>
									</td>
									<td>{formatCurrency(trading.investment)}</td>
									<td>{formatCurrency(trading.currentValue)}</td>
									<td>${trading.pnl.toFixed(2)}</td>
									<td>{trading.roi.toFixed(2)}</td>
									<td>{formatDate(trading.createdAt)}</td>
									<td>
										<p
											className={`${trading.status === "ACTIVE" ? "bg-green-500 text-green-100" : trading.status === "CLOSED" ? "bg-red-500 text-red-100" : "bg-yellow-500 text-yellow-100"} py-1 w-fit px-6 rounded-xl`}
										>
											{trading.status}
										</p>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</main>
			)}
		</main>
	);
};

export default Table;
