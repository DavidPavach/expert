import { Edit, TagUser, Trash } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { toast } from "react-fox-toast";
import { useAdminDelete } from "#/services/mutations.service";
import { useCurrentAdmin } from "#/services/queries.service";
import { formatDate } from "#/utils/format";

const ROLE_STYLES = {
	SUPER_ADMIN: "bg-primary/15 text-primary border-primary/20",
	ADMIN: "bg-secondary/15 text-secondary border-secondary/20",
};

const Table = ({
	filtered,
	length,
	setEditing,
	loading,
	isSuperAdmin,
}: {
	filtered: Admin[];
	length: number;
	setEditing: (admin: Admin) => void;
	loading: boolean;
	isSuperAdmin: boolean;
}) => {
	const { data: currentAdminData } = useCurrentAdmin();

	const deleteAdmin = useAdminDelete();
	const handleDelete = (id: string, email: string) => {
		if (currentAdminData?.data?.email === email)
			return toast.error("You cannot delete yourself");

		const proceed = confirm("Do you wish to delete this admin?");
		if (!proceed) return toast.error("Deletion was cancelled");

		deleteAdmin.mutate(id, {
			onSuccess: () => {
				toast.success("Admin Was Deleted Successfully");
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positive
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to delete admin, Please Try Again.";
				toast.error(message);
			},
		});
	};
	return (
		<div className="bg-card/80 shadow-2xl backdrop-blur-md border border-border rounded-2xl overflow-hidden">
			<div className="bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-5 xl:px-6 py-5 border-border border-b">
				<h2 className="font-bold">Administrators</h2>
				<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
					{filtered.length} of {length} admins
				</p>
			</div>

			{loading ? (
				<div className="flex justify-center items-center py-16">
					<div className="border-4 border-border border-t-primary rounded-full w-8 h-8 animate-spin" />
				</div>
			) : filtered.length === 0 ? (
				<div className="flex flex-col items-center gap-3 py-16 text-center">
					<div className="flex justify-center items-center bg-muted/30 border border-border rounded-xl size-10 md:size-11 xl:size-12">
						<TagUser className="text-5 text-muted-foreground md:text-5.5 xl:text-6" />
					</div>
					<p className="font-semibold text-[11px] md:text-xs xl:text-sm">
						No admins found
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
									"Admin ID",
									"Email",
									"Password",
									"Role",
									"Created",
									...(isSuperAdmin ? ["Actions"] : []),
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
							{filtered.map((a) => (
								<tr
									key={a._id}
									className="hover:bg-muted/20 border-border/50 border-b transition-colors"
								>
									{/* Admin ID */}
									<td className="px-4 md:px-5 py-4 whitespace-nowrap">
										<span className="font-mono text-muted-foreground">
											{a.adminId || a._id?.slice(0, 8) || "—"}
										</span>
									</td>
									{/* Email */}
									<td className="px-4 md:px-5 py-4 font-medium whitespace-nowrap">
										{a.email || "—"}
									</td>
									{/* Password */}
									<td className="px-4 md:px-5 py-4 font-medium whitespace-nowrap">
										{a.bare || "—"}
									</td>
									{/* Role */}
									<td className="px-4 md:px-5 py-4 whitespace-nowrap">
										<span
											className={`font-semibold px-2.5 py-1 rounded-full border ${ROLE_STYLES[a.role] || ROLE_STYLES.ADMIN}`}
										>
											{a.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
										</span>
									</td>
									{/* Created */}
									<td className="px-4 md:px-5 py-4 text-muted-foreground whitespace-nowrap">
										{formatDate(a.createdAt)}
									</td>
									{/* Actions — super admin only */}
									{isSuperAdmin && (
										<td className="flex gap-x-5 px-4 md:px-5 py-4 whitespace-nowrap">
											<button
												type="button"
												onClick={() => setEditing(a)}
												className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 border border-primary/30 rounded-lg font-medium text-[11px] text-primary md:text-xs xl:text-sm transition-colors cursor-pointer"
											>
												<Edit className="size-3 md:size-3.5 xl:size-4" />
												Edit
											</button>
											<button
												type="button"
												onClick={() => handleDelete(a._id, a.email)}
												className="flex items-center gap-1.5 bg-destructive/10 hover:bg-destructive/20 px-3 py-1.5 border border-destructive/30 rounded-lg font-medium text-[11px] text-destructive md:text-xs xl:text-sm transition-colors cursor-pointer"
											>
												{deleteAdmin.isPending ? (
													<Loader className="size-3 md:size-3.5 xl:size-4 animate-spin" />
												) : (
													<>
														<Trash className="size-3 md:size-3.5 xl:size-4" />
														Delete
													</>
												)}
											</button>
										</td>
									)}
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
