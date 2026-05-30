import { Refresh, SearchNormal } from "iconsax-reactjs";
import { useState } from "react";
import AdminError from "#/components/AdminError";
import { Overlay } from "#/components/Overlay";
import Pagination from "#/components/Pagination";
import { PAGE_LIMIT } from "#/enum";
import { useFetchTrades } from "#/services/queries.service";
import Edit from "./Edit";
import Table from "./Table";

const index = () => {
	const [page, setPage] = useState<number>(1);
	const [search, setSearch] = useState<string>("");
	const [closingTrade, setClosingTrade] = useState<AdminTrade | null>(null);
	const [statusFilter, setStatusFilter] = useState<string>("ALL");
	const [typeFilter, setTypeFilter] = useState<string>("ALL");

	const { data, isLoading, isError, refetch } = useFetchTrades(
		page,
		PAGE_LIMIT,
	);

	const trades: AdminTrade[] = data?.data?.data ?? [];

	const pagination = data?.data?.pagination ?? {
		total: 0,
		page: 1,
		limit: PAGE_LIMIT,
		totalPages: 1,
	};

	if (isError) {
		return <AdminError onRetry={refetch} />;
	}

	const filtered = trades.filter((t) => {
		const q = search.toLowerCase();
		const matchSearch =
			!q ||
			t.asset?.toLowerCase().includes(q) ||
			t.user.email?.toLowerCase().includes(q) ||
			t.user.email?.toLowerCase().includes(q) ||
			t.user.accountId?.toLowerCase().includes(q);
		const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
		const matchType = typeFilter === "ALL" || t.tradeType === typeFilter;
		return matchSearch && matchStatus && matchType;
	});

	const stats = {
		total: trades.length,
		open: trades.filter((t) => t.status === "OPEN").length,
		won: trades.filter((t) => t.status === "WON").length,
		lost: trades.filter((t) => t.status === "LOST").length,
	};

	return (
		<main>
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="-top-32 left-1/2 absolute bg-primary/8 blur-3xl rounded-full w-150 h-100 -translate-x-1/2" />
				<div className="right-0 bottom-0 absolute bg-accent/6 blur-3xl rounded-full size-100" />
			</div>
			{/* Header */}
			<header className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 mb-8">
				<div>
					<h1 className="mb-1 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
						Trade Management
					</h1>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Monitor, close, and manage user trades
					</p>
				</div>
				<button
					type="button"
					onClick={() => refetch()}
					className="flex items-center gap-2 bg-card/80 hover:bg-muted/50 px-4 py-2.5 border border-border rounded-xl text-[11px] text-foreground md:text-xs xl:text-sm transition-colors cursor-pointer shrink-0"
				>
					<Refresh className="size-4" />
					Refresh
				</button>
			</header>

			{/* Stats */}
			<div className="gap-3 md:gap-4 grid grid-cols-2 lg:grid-cols-4 mb-6">
				{[
					{ label: "Total Trades", val: stats.total, color: "text-foreground" },
					{ label: "Open", val: stats.open, color: "text-blue-400" },
					{ label: "Won", val: stats.won, color: "text-green-400" },
					{ label: "Lost", val: stats.lost, color: "text-destructive" },
				].map((s) => (
					<div
						key={s.label}
						className="bg-card/80 backdrop-blur-sm p-4 border border-border rounded-xl"
					>
						<p className="mb-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							{s.label}
						</p>
						<p
							className={`text-lg md:text-xl xl:text-2xl font-bold ${s.color}`}
						>
							{s.val}
						</p>
					</div>
				))}
			</div>

			{/* Filters */}
			<div className="flex sm:flex-row flex-col gap-3 mb-5">
				<div className="relative flex-1">
					<SearchNormal className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search by asset, user email or name..."
						className="bg-card/80 py-2.5 pr-4 pl-9 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-[11px] text-foreground placeholder:text-muted-foreground md:text-xs xl:text-sm transition"
					/>
				</div>
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="bg-card/80 px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-[11px] text-foreground md:text-xs xl:text-sm transition"
				>
					<option value="ALL">All Status</option>
					<option value="OPEN">Open</option>
					<option value="WON">Won</option>
					<option value="LOST">Lost</option>
					<option value="CLOSED">Closed</option>
					<option value="CANCELLED">Cancelled</option>
				</select>
				<select
					value={typeFilter}
					onChange={(e) => setTypeFilter(e.target.value)}
					className="bg-card/80 px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-[11px] text-foreground md:text-xs xl:text-sm transition"
				>
					<option value="ALL">All Types</option>
					<option value="BUY">Buy</option>
					<option value="SELL">Sell</option>
				</select>
			</div>
			<Table
				filtered={filtered}
				length={trades.length}
				loading={isLoading}
				setClose={setClosingTrade}
			/>
			{pagination.totalPages > 1 && (
				<Pagination
					pageSize={pagination.totalPages}
					defaultPage={page}
					page={page}
					onPageChange={setPage}
				/>
			)}
			{closingTrade && (
				<Overlay open={!!closingTrade} onClose={() => setClosingTrade(null)}>
					<Edit trade={closingTrade} onClose={() => setClosingTrade(null)} />
				</Overlay>
			)}
		</main>
	);
};

export default index;
