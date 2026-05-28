import { Refresh, SearchNormal } from "iconsax-reactjs";
import { useState } from "react";
import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import Pagination from "#/components/Pagination";
import { PAGE_LIMIT } from "#/enum";
import { useAllKycs } from "#/services/queries.service";
import Edit from "./Edit";
import Table from "./Table";

const index = () => {
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isError, refetch } = useAllKycs(page, PAGE_LIMIT);
	const [search, setSearch] = useState<string>("");
	const [statusFilter, setStatusFilter] = useState<string>("ALL");
	const [selected, setSelected] = useState<AdminKyc | null>(null);

	const kycs: AdminKyc[] = data?.data?.data ?? [];

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

	const filtered = kycs.filter((r) => {
		const q = search.toLowerCase();
		const matchSearch =
			!q ||
			r.firstName?.toLowerCase().includes(q) ||
			r.lastName?.toLowerCase().includes(q) ||
			r.email?.toLowerCase().includes(q) ||
			r.countryNationality?.toLowerCase().includes(q) ||
			r.documentType?.toLowerCase().includes(q);
		const matchStatus = statusFilter === "ALL" || r.status === statusFilter;
		return matchSearch && matchStatus;
	});

	const stats = {
		total: kycs.length,
		pending: kycs.filter((r) => r.status === "PENDING").length,
		approved: kycs.filter((r) => r.status === "APPROVED").length,
		rejected: kycs.filter((r) => r.status === "REJECTED").length,
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
						KYC Management
					</h1>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Review and manage user identity verification submissions
					</p>
				</div>
				<button
					type="button"
					onClick={() => refetch()}
					className="flex items-center gap-2 bg-card/80 hover:bg-muted/50 px-4 py-2.5 border border-border rounded-xl text-[11px] text-foreground md:text-xs xl:text-sm transition-colors shrink-0"
				>
					<Refresh className="size-4" />
					Refresh
				</button>
			</header>
			{/* Stats */}
			<div className="gap-3 md:gap-4 grid grid-cols-2 lg:grid-cols-4 mb-6">
				{[
					{
						label: "Total Submissions",
						val: stats.total,
						color: "text-foreground",
					},
					{ label: "Pending", val: stats.pending, color: "text-amber-500" },
					{ label: "Approved", val: stats.approved, color: "text-green-500" },
					{ label: "Rejected", val: stats.rejected, color: "text-destructive" },
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
					<SearchNormal className="top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search by name, email, country, document type..."
						className="bg-card/80 py-2.5 pr-4 pl-9 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-[11px] text-foreground placeholder:text-muted-foreground md:text-xs xl:text-sm transition"
					/>
				</div>
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="bg-card/80 px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-[11px] text-foreground md:text-xs xl:text-sm transition"
				>
					<option value="ALL">All Status</option>
					<option value="PENDING">Pending</option>
					<option value="APPROVED">Approved</option>
					<option value="REJECTED">Rejected</option>
				</select>
			</div>
			<Table
				filtered={filtered}
				loading={isLoading}
				length={kycs.length}
				setSelected={setSelected}
			/>
			{pagination.totalPages > 1 && (
				<Pagination
					pageSize={pagination.totalPages}
					defaultPage={page}
					page={page}
					onPageChange={setPage}
				/>
			)}
			{selected && <Edit kyc={selected} onClose={() => setSelected(null)} />}
		</main>
	);
};

export default index;
