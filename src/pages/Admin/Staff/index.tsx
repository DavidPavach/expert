import { Add, Refresh, SearchNormal } from "iconsax-reactjs";
import { useState } from "react";
import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Overlay } from "#/components/Overlay";
import { useCurrentAdmin, useFetchAdmin } from "#/services/queries.service";
import Edit from "./Edit";
import Form from "./Form";
import Table from "./Table";

const index = () => {
	const { data, isLoading, isError, refetch } = useFetchAdmin();
	const { data: currentAdminData } = useCurrentAdmin();

	const isSuperAdmin = currentAdminData?.data?.role === "SUPER_ADMIN";
	const [showNewForm, setShowNewForm] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [roleFilter, setRoleFilter] = useState("ALL");
	const [editing, setEditing] = useState<Admin | null>(null);

	const admins: Admin[] = data?.data || [];

	if (isLoading) {
		return <AdminLoader />;
	}

	if (isError) {
		return <AdminError onRetry={refetch} />;
	}

	const filtered = admins.filter((a) => {
		const q = search.toLowerCase();
		const matchSearch =
			!q ||
			a.email?.toLowerCase().includes(q) ||
			a.adminId?.toLowerCase().includes(q);
		const matchRole = roleFilter === "ALL" || a.role === roleFilter;
		return matchSearch && matchRole;
	});

	const stats = {
		total: admins.length,
		superAdmins: admins.filter((a) => a.role === "SUPER_ADMIN").length,
		admins: admins.filter((a) => a.role === "ADMIN").length,
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
					<h1 className="mb-1 font-bold text-xl md:text-2xl xl:text-3xl">
						Admin Management
					</h1>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Manage administrator accounts and roles
					</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => refetch()}
						className="flex items-center gap-2 bg-card/80 hover:bg-muted/50 px-4 py-2.5 border border-border rounded-xl text-[11px] text-foreground md:text-xs xl:text-sm transition-colors cursor-pointer"
					>
						<Refresh className="size-4" />
						Refresh
					</button>
					{isSuperAdmin && (
						<button
							type="button"
							onClick={() => setShowNewForm((v) => !v)}
							className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer text-[11px] md:text-xs xl:text-sm font-medium transition-all shadow-lg ${
								showNewForm
									? "border border-border bg-muted/50 text-foreground"
									: "bg-primary text-primary-foreground hover:opacity-90 shadow-primary/20"
							}`}
						>
							<Add
								className={`w-4 h-4 transition-transform ${showNewForm ? "rotate-45" : ""}`}
							/>
							{showNewForm ? "Cancel" : "New Admin"}
						</button>
					)}
				</div>
			</header>
			{/* Stats */}
			<div className="gap-3 md:gap-4 grid grid-cols-3 mb-6">
				{[
					{ label: "Total Admins", val: stats.total, color: "text-foreground" },
					{
						label: "Super Admins",
						val: stats.superAdmins,
						color: "text-primary",
					},
					{ label: "Admins", val: stats.admins, color: "text-secondary" },
				].map((s) => (
					<div
						key={s.label}
						className="bg-card/80 backdrop-blur-sm p-4 border border-border rounded-xl"
					>
						<p className="mb-1 text-[11px] text-muted-foreground md:text-xs text-sm">
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
					<SearchNormal className="top-1/2 left-3 absolute size-3 md:size-3.5 xl:size-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search by email or admin ID..."
						className="bg-card/80 py-2.5 pr-4 pl-9 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-[11px] text-foreground placeholder:text-muted-foreground md:text-xs xl:text-sm transition"
					/>
				</div>
				<select
					value={roleFilter}
					onChange={(e) => setRoleFilter(e.target.value)}
					className="bg-card/80 px-3 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-[11px] text-foreground md:text-xs xl:text-sm transition"
				>
					<option value="ALL">All Roles</option>
					<option value="SUPER_ADMIN">Super Admin</option>
					<option value="ADMIN">Admin</option>
				</select>
			</div>
			<Table
				filtered={filtered}
				length={admins.length}
				setEditing={setEditing}
				loading={isLoading}
				isSuperAdmin={isSuperAdmin}
			/>
			{showNewForm && (
				<Overlay
					open={showNewForm}
					onClose={() => setShowNewForm((prev) => !prev)}
				>
					<Form />
				</Overlay>
			)}
			{editing && (
				<Overlay open={!!editing} onClose={() => setEditing(null)}>
					<Edit onClose={() => setEditing(null)} admin={editing} />
				</Overlay>
			)}
		</main>
	);
};

export default index;
