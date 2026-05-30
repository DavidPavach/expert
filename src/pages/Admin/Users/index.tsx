import { Profile2User, Refresh, SearchNormal, UserTick } from "iconsax-reactjs";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Overlay } from "#/components/Overlay";
import Pagination from "#/components/Pagination";
import { PAGE_LIMIT } from "#/enum";
import { useFetchUsers } from "#/services/queries.service";
import UserEditModal from "./Edit";
import UserTable from "./Table";

const index = () => {
	const [page, setPage] = useState<number>(1);
	const [search, setSearch] = useState("");
	const [kycFilter, setKycFilter] = useState("ALL");
	const [statusFilter, setStatusFilter] = useState("ALL");
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const { data, isLoading, isError, refetch } = useFetchUsers(page, PAGE_LIMIT);

	const users: User[] = data?.data?.data ?? [];

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

	const filtered = users.filter((u) => {
		const q = search.toLowerCase();
		const matchSearch =
			!q ||
			u.fullName?.toLowerCase().includes(q) ||
			u.email?.toLowerCase().includes(q) ||
			u.username?.toLowerCase().includes(q) ||
			u.accountId?.toLowerCase().includes(q) ||
			u.country?.toLowerCase().includes(q);
		const matchKyc = kycFilter === "ALL" || u.kycStatus === kycFilter;
		const matchStatus =
			statusFilter === "ALL" ||
			(statusFilter === "ACTIVE" && !u.suspended) ||
			(statusFilter === "SUSPENDED" && u.suspended);
		return matchSearch && matchKyc && matchStatus;
	});

	const stats = {
		total: users.length,
		active: users.filter((u) => !u.suspended).length,
		suspended: users.filter((u) => u.suspended).length,
		verified: users.filter((u) => u.kycStatus === "APPROVED").length,
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
						User Management
					</h1>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Manage platform users, KYC status, and account access
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
			<section className="gap-3 md:gap-4 grid grid-cols-2 lg:grid-cols-4 mb-6">
				{[
					{
						label: "Total Users",
						val: stats.total,
						color: "text-foreground",
						bg: "bg-primary/15 border-primary/20",
						icon: <Profile2User className="size-4 md:size-4.5 xl:size-5" />,
					},
					{
						label: "Active",
						val: stats.active,
						color: "text-green-500",
						bg: "bg-green-500/15 border-green-500/20",
						icon: (
							<CheckCircle className="size-4 md:size-4.5 xl:size-5 text-green-500" />
						),
					},
					{
						label: "Suspended",
						val: stats.suspended,
						color: "text-destructive",
						bg: "bg-destructive/15 border-destructive/20",
						icon: (
							<XCircle className="size-4 md:size-4.5 xl:size-5 text-destructive" />
						),
					},
					{
						label: "KYC Verified",
						val: stats.verified,
						color: "text-primary",
						bg: "bg-primary/15 border-primary/20",
						icon: (
							<UserTick className="size-4 md:size-4.5 xl:size-5 text-primary" />
						),
					},
				].map((s) => (
					<div
						key={s.label}
						className="flex justify-between items-center gap-3 bg-card/80 backdrop-blur-sm p-4 border border-border rounded-xl"
					>
						<div>
							<p className="mb-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								{s.label}
							</p>
							<p
								className={`text-lg md:text-xl xl:text-2xl font-bold ${s.color}`}
							>
								{s.val}
							</p>
						</div>
						<div
							className={`size-8 md:size-9 xl:size-10 rounded-lg border flex items-center justify-center shrink-0 ${s.bg}`}
						>
							{s.icon}
						</div>
					</div>
				))}
			</section>
			{/* Filters */}
			<section className="flex sm:flex-row flex-col gap-3 mb-5">
				<div className="relative flex-1">
					<SearchNormal className="top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search by name, email, username, account ID..."
						className="bg-card/80 py-2.5 pr-4 pl-9 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-[11px] placeholder:text-muted-foreground md:text-xs xl:text-sm transition"
					/>
				</div>
				<select
					value={kycFilter}
					onChange={(e) => setKycFilter(e.target.value)}
					className="bg-card/80 px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-[11px] md:text-xs xl:text-sm transition"
				>
					<option value="ALL">All KYC</option>
					<option value="NOT STARTED">Not Started</option>
					<option value="PENDING">Pending</option>
					<option value="VERIFIED">Verified</option>
					<option value="REJECTED">Rejected</option>
				</select>
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="bg-card/80 px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-[11px] md:text-xs xl:text-sm transition"
				>
					<option value="ALL">All Status</option>
					<option value="ACTIVE">Active</option>
					<option value="SUSPENDED">Suspended</option>
				</select>
			</section>
			{/* Table card */}
			<div className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				<div className="flex justify-between items-center bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-5 md:px-7 py-5 border-border border-b">
					<div>
						<h2 className="font-bold text-foreground">Platform Users</h2>
						<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							{filtered.length} of {users.length} users
						</p>
					</div>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center py-16">
						<div className="border-4 border-border border-t-primary rounded-full w-8 h-8 animate-spin" />
					</div>
				) : (
					<UserTable users={filtered} onEdit={setEditingUser} />
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
			{editingUser && (
				<Overlay
					onClose={() => setEditingUser(null)}
					open={!!editingUser}
					variant="bottom"
				>
					<UserEditModal
						user={editingUser}
						onClose={() => setEditingUser(null)}
					/>
				</Overlay>
			)}
		</main>
	);
};

export default index;
