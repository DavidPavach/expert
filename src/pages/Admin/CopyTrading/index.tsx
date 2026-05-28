import { Refresh, SearchNormal } from "iconsax-reactjs";
import { useState } from "react";
import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import Pagination from "#/components/Pagination";
import { PAGE_LIMIT } from "#/enum";
import { useFetchCopyTrading } from "#/services/queries.service";
import { formatCurrency } from "#/utils/format";
import Table from "./Table";

const index = () => {
	const [search, setSearch] = useState<string>("");
	const [statusFilter, setStatusFilter] = useState("ALL");
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isError, refetch } = useFetchCopyTrading(
		page,
		PAGE_LIMIT,
	);

	const trades: AdminCopyTrading[] = data?.data?.data ?? [];

	const pagination = data?.data?.pagination ?? {
		total: 0,
		page: 1,
		limit: PAGE_LIMIT,
		totalPages: 1,
	};

	if (isLoading) {
		return <AdminLoader />;
	}

	if (isError) {
		return <AdminError onRetry={refetch} />;
	}

	const filtered = trades.filter((r) => {
		const q = (search || "").trim().toLowerCase();
		const matchSearch =
			!q ||
			(r.user?.username || "").toLowerCase().includes(q) ||
			(r.user?.email || "").toLowerCase().includes(q) ||
			(r.masterTraderId?.name || "").toLowerCase().includes(q);
		const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
		return matchSearch && matchStatus;
	});

	const stats = {
		total: trades.length,
		active: trades.filter((r) => r.status === "ACTIVE").length,
		paused: trades.filter((r) => r.status === "PAUSED").length,
		totalInvested: trades.reduce((s, r) => s + (r.investment || 0), 0),
	};

	return (
		<main>
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="-top-32 left-1/2 absolute bg-primary/8 blur-3xl rounded-full w-150 h-100 -translate-x-1/2" />
				<div className="right-0 bottom-0 absolute bg-accent/6 blur-3xl rounded-full w-100 h-100" />
			</div>
			<section className="z-2 relative">
				{/* Header */}
				<div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 mb-8">
					<div>
						<h1 className="mb-1 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
							Copy Trading Management
						</h1>
						<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Manage user copy trading sessions, metrics and trade entries
						</p>
					</div>
					<button
						type="button"
						onClick={() => refetch()}
						className="flex items-center gap-2 bg-card/80 hover:bg-muted/50 px-4 py-2.5 border border-border rounded-xl text-foreground text-sm transition-colors cursor-pointer shrink-0"
					>
						<Refresh className="size-4" />
						Refresh
					</button>
				</div>
				{/* Stats */}
				<div className="gap-3 md:gap-4 grid grid-cols-2 lg:grid-cols-4 mb-6">
					{[
						{
							label: "Total Sessions",
							val: stats.total,
							color: "text-foreground",
						},
						{ label: "Active", val: stats.active, color: "text-green-400" },
						{ label: "Paused", val: stats.paused, color: "text-amber-400" },
						{
							label: "Total Invested",
							val: `${formatCurrency(stats.totalInvested)}`,
							color: "text-primary",
						},
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
							placeholder="Search by user, email, trader..."
							className="bg-card/80 py-2.5 pr-4 pl-9 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-[11px] placeholder:text-muted-foreground md:text-xs xl:text-sm transition"
						/>
					</div>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="bg-card/80 px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-[11px] md:text-xs xl:text-sm transition cursor-pointer"
					>
						<option value="ALL">All Status</option>
						<option value="ACTIVE">Active</option>
						<option value="PAUSED">Paused</option>
						<option value="CLOSED">Closed</option>
					</select>
				</div>
				{/* Table */}
				<Table filtered={filtered} total={stats.total} loading={isLoading} />
			</section>
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

export default index;
