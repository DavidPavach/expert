import { TagUser } from "iconsax-reactjs";
import AdminError from "#/components/AdminError";
import { useCurrentAdmin } from "#/services/queries.service";
import { formatDate } from "#/utils/format";

export default function Admin() {
	const { data, isLoading, isError, refetch } = useCurrentAdmin();
	const admin: Admin = data?.data;

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[80vh]">
				<div className="border-4 border-border border-t-primary rounded-full size-6 md:size-7 xl:size-8 animate-spin" />
			</div>
		);
	}

	if (!admin) {
		return (
			<div className="flex justify-center items-center min-h-[80vh]">
				<div className="text-center">
					<p className="text-muted-foreground">Admin data not found</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return <AdminError onRetry={refetch} />;
	}

	return (
		<div className="relative min-h-[80vh] overflow-hidden">
			{/* Background blobs */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="-top-32 left-1/2 absolute bg-primary/8 blur-3xl rounded-full w-150 h-100 -translate-x-1/2" />
				<div className="right-0 bottom-0 absolute bg-accent/6 blur-3xl rounded-full size-100" />
			</div>

			<div className="z-2 relative mx-auto px-4 py-8 md:py-12 max-w-3xl">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<div className="flex justify-center items-center bg-primary/20 border border-primary/30 rounded-xl size-10 md:size-11 xl:size-12">
							<TagUser className="size-5 md:size-5.5 xl:size-6" />
						</div>
						<div>
							<h1 className="mb-1 font-bold text-xl md:text-2xl xl:text-3xl">
								Admin Profile
							</h1>
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Your account information
							</p>
						</div>
					</div>
				</div>

				{/* Profile Card */}
				<div className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
					{/* Header section */}
					<div className="bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-6 md:px-7 py-6 border-border border-b">
						<div className="flex justify-between items-start gap-4">
							<div>
								<h2 className="mb-1 font-bold text-foreground text-sm md:text-base xl:text-lg">
									{admin.email || "—"}
								</h2>
								<div className="flex items-center gap-2">
									<span
										className={`text-[11px] md:text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full border ${
											admin.role === "SUPER_ADMIN"
												? "bg-primary/15 text-primary border-primary/20"
												: "bg-secondary/15 text-secondary border-secondary/20"
										}`}
									>
										{admin.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Details */}
					<div className="px-6 md:px-7 py-7">
						<div className="space-y-6">
							{/* Admin ID */}
							<div>
								<p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
									Admin ID
								</p>
								<p className="bg-muted/20 px-4 py-3 border border-border rounded-lg font-mono text-[11px] text-foreground md:text-xs xl:text-sm">
									{admin.adminId || admin._id}
								</p>
							</div>

							{/* Email */}
							<div>
								<p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
									Email
								</p>
								<p className="bg-muted/20 px-4 py-3 border border-border rounded-lg text-[11px] text-foreground md:text-xs xl:text-sm">
									{admin.email || "—"}
								</p>
							</div>

							{/* Role */}
							<div>
								<p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
									Role
								</p>
								<p className="bg-muted/20 px-4 py-3 border border-border rounded-lg text-[11px] text-foreground md:text-xs xl:text-sm">
									{admin.role === "SUPER_ADMIN"
										? "Super Administrator"
										: "Administrator"}
								</p>
							</div>

							{/* Created At */}
							{admin.createdAt && (
								<div>
									<p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
										Created
									</p>
									<p className="bg-muted/20 px-4 py-3 border border-border rounded-lg text-[11px] text-foreground md:text-xs xl:text-sm">
										{formatDate(admin.createdAt)}
									</p>
								</div>
							)}

							{/* Updated At */}
							{admin.updatedAt && (
								<div>
									<p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
										Last Updated
									</p>
									<p className="bg-muted/20 px-4 py-3 border border-border rounded-lg text-[11px] text-foreground md:text-xs xl:text-sm">
										{formatDate(admin.updatedAt)}
									</p>
								</div>
							)}

							{/* Bare field (if available) */}
							{admin.bare && (
								<div>
									<p className="mb-2 font-semibold text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">
										Password
									</p>
									<p className="bg-muted/20 px-4 py-3 border border-border rounded-lg font-mono text-[11px] text-foreground md:text-xs xl:text-sm">
										{admin.bare}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
