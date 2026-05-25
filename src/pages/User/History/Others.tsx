import { Moneys } from "iconsax-reactjs";
import { useState } from "react";
import Pagination from "#/components/Pagination";
import { PAGE_LIMIT } from "#/enum";
import { useTransactions } from "#/services/queries.service";
import { formatCurrency, formatDate } from "#/utils/format";
import ExpertCardError from "../Copy/ErrorCard";
import { STATUS_STYLES } from "./Deposit";

const Others = () => {
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isError, refetch } = useTransactions(
		page,
		PAGE_LIMIT,
		undefined,
		true,
	);

	const others: Transaction[] = data?.data?.data ?? [];

	const pagination = data?.data?.pagination ?? {
		total: 0,
		page: 1,
		limit: PAGE_LIMIT,
		totalPages: 1,
	};

	if (isError) {
		return (
			<ExpertCardError message="Failed to Load Other History" retry={refetch} />
		);
	}

	return (
		<main>
			<div className="bg-card/80 shadow backdrop-blur-md mt-4 border border-border rounded-2xl overflow-hidden">
				<div className="flex justify-between items-center bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-6 xl:px-8 py-5 border-border border-b">
					<div>
						<h2 className="font-bold text-sm md:text-base">
							Other Transaction Records
						</h2>
						<p className="text-muted-foreground text-xs">
							{others.length} of {others.length} Other Transactions
						</p>
					</div>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center py-16">
						<div className="border-4 border-border border-t-primary rounded-full size-8 animate-spin" />
					</div>
				) : others.length === 0 ? (
					<div className="flex flex-col items-center gap-3 py-16 text-center">
						<div className="flex justify-center items-center bg-muted/30 border border-border rounded-xl size-10 md:size-11 xl:size-12">
							<Moneys className="size-5 md:size-5.5 xl:size-6 text-muted-foreground" />
						</div>
						<p className="font-semibold">No deposits found</p>
						<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Try adjusting your search or filters
						</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-border border-b">
									{["Date", "Amount", "Coin", "Status"].map((h) => (
										<th
											key={h}
											className="px-4 md:px-5 py-3 font-semibold text-muted-foreground text-xs text-left whitespace-nowrap"
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{others.map((o) => (
									<tr
										key={o._id}
										className="hover:bg-muted/20 border-border/50 border-b text-[11px] md:text-xs xl:text-sm transition-colors"
									>
										{/* Date */}
										<td className="px-4 md:px-5 py-4 text-muted-foreground whitespace-nowrap">
											<Moneys className="inline mr-2 size-5 md:size-5.5 xl:size-6 text-primary" />
											{o.createdAt ? formatDate(o.createdAt) : "—"}
										</td>
										{/* Amount */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span className="font-bold">
												{formatCurrency(o.amount || 0)}
											</span>
										</td>
										{/* Coin */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span className="bg-muted/40 px-2.5 py-1 border border-border rounded-lg font-medium text-xs uppercase">
												{o.cryptoSymbol || "—"}
											</span>
										</td>
										{/* Status */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span
												className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[o.status] || STATUS_STYLES.PENDING}`}
											>
												{o.status || "PENDING"}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			{pagination.totalPages > 1 && (
				<Pagination
					pageSize={pagination.totalPages}
					defaultPage={page}
					page={page}
					onPageChange={setPage}
				/>
			)}
		</main>
	);
};

export default Others;
