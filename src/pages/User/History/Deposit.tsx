/** biome-ignore-all lint/a11y/noStaticElementInteractions: <> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <> */

import { CloseCircle, Eye, MoneyRecive } from "iconsax-reactjs";
import { useState } from "react";
import Pagination from "#/components/Pagination";
import { PAGE_LIMIT } from "#/enum";
import { useTransactions } from "#/services/queries.service";
import { formatCurrency, formatDate } from "#/utils/format";
import ExpertCardError from "../Copy/ErrorCard";

export const STATUS_STYLES = {
	PENDING: "bg-amber-500/15 text-amber-500 border-amber-500/20",
	APPROVED: "bg-green-500/15 text-green-500 border-green-500/20",
	REJECTED: "bg-destructive/15 text-destructive border-destructive/20",
};

function ProofModal({ url, onClose }: { url: string; onClose: () => void }) {
	return (
		<div
			className="z-5 fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm p-4"
			onClick={onClose}
		>
			<div
				className="relative shadow-2xl border border-border rounded-2xl w-full max-w-2xl overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={onClose}
					className="top-3 right-3 z-3 absolute bg-black/60 hover:bg-white p-1.5 rounded-lg text-white hover:text-destructive transition-colors cursor-pointer"
				>
					<CloseCircle className="size-4 md:size-4.5 xl:size-5" />
				</button>
				<img
					src={url}
					alt="Payment proof"
					className="bg-black w-full max-h-[80vh] object-contain"
				/>
			</div>
		</div>
	);
}

const Deposit = () => {
	const [page, setPage] = useState<number>(1);
	const [proofUrl, setProofUrl] = useState<string | null>(null);
	const { data, isLoading, isError, refetch } = useTransactions(
		page,
		PAGE_LIMIT,
		"DEPOSIT",
	);

	const deposits: Transaction[] = data?.data?.data ?? [];

	const pagination = data?.data?.pagination ?? {
		total: 0,
		page: 1,
		limit: PAGE_LIMIT,
		totalPages: 1,
	};

	if (isError) {
		return (
			<ExpertCardError
				message="Failed to Load Deposit History"
				retry={refetch}
			/>
		);
	}

	return (
		<main>
			<div className="bg-card/80 shadow backdrop-blur-md mt-4 border border-border rounded-2xl overflow-hidden">
				<div className="flex justify-between items-center bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-6 xl:px-8 py-5 border-border border-b">
					<div>
						<h2 className="font-bold text-sm md:text-base">Deposit Records</h2>
						<p className="text-muted-foreground text-xs">
							{deposits.length} of {deposits.length} deposits
						</p>
					</div>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center py-16">
						<div className="border-4 border-border border-t-primary rounded-full size-8 animate-spin" />
					</div>
				) : deposits.length === 0 ? (
					<div className="flex flex-col items-center gap-3 py-16 text-center">
						<div className="flex justify-center items-center bg-muted/30 border border-border rounded-xl size-10 md:size-11 xl:size-12">
							<MoneyRecive className="size-5 md:size-5.5 xl:size-6 text-muted-foreground" />
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
									{["Date", "Amount", "Coin", "Proof", "Status"].map((h) => (
										<th
											key={h}
											className="px-4 md:px-5 py-3 font-semibold text-[10px] text-muted-foreground md:text-[11px] xl:text-xs text-left whitespace-nowrap"
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{deposits.map((d) => (
									<tr
										key={d._id}
										className="hover:bg-muted/20 border-border/50 border-b text-[11px] md:text-xs xl:text-sm transition-colors"
									>
										{/* Date */}
										<td className="px-4 md:px-5 py-4 text-muted-foreground whitespace-nowrap">
											<MoneyRecive className="inline mr-2 size-5 md:size-5.5 xl:size-6 text-green-500" />
											{d.createdAt ? formatDate(d.createdAt) : "—"}
										</td>
										{/* Amount */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span className="font-bold">
												{formatCurrency(d.amount || 0)}
											</span>
										</td>
										{/* Coin */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span className="bg-muted/40 px-2.5 py-1 border border-border rounded-lg font-medium uppercase">
												{d.cryptoSymbol || "—"}
											</span>
										</td>
										{/* Proof */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											{d.hash ? (
												<button
													type="button"
													onClick={() => setProofUrl(d.hash ?? "")}
													className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 border border-primary/30 rounded-lg font-medium text-primary text-xs transition-colors cursor-pointer"
												>
													<Eye className="size-3.5 md:size-4 xl:size-4.5" />
													View Proof
												</button>
											) : (
												<span className="text-muted-foreground text-xs">
													No proof
												</span>
											)}
										</td>
										{/* Status */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span
												className={`font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[d.status] || STATUS_STYLES.PENDING}`}
											>
												{d.status || "PENDING"}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			{proofUrl && (
				<ProofModal url={proofUrl} onClose={() => setProofUrl(null)} />
			)}
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

export default Deposit;
