import { Edit, Forbidden, Forbidden2, UserSquare } from "iconsax-reactjs";
import { KYC_STYLES, type KycStatus } from "#/enum";
import { formatDate } from "#/utils/format";

export default function UserTable({ users }: { users: User[] }) {
	if (users.length === 0) {
		return (
			<div className="flex flex-col items-center gap-3 py-16 text-center">
				<div className="flex justify-center items-center bg-muted/30 border border-border rounded-xl size-10 md:size-12 xl:size-14">
					<UserSquare className="size-5 md:size-6 xl:size-7" />
				</div>
				<p className="font-semibold text-[11px] md:text-xs xl:text-sm">
					No users found
				</p>
				<p className="text-[10px] text-muted-foreground md:text-[11px] text-xs xl:text-xs">
					Try adjusting your search or filters
				</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full text-[11px] md:text-xs xl:text-sm">
				<thead>
					<tr className="border-border border-b">
						{[
							"User",
							"Account ID",
							"Country",
							"KYC",
							"Last Session",
							"Status",
							"Actions",
						].map((h) => (
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
					{users.map((u) => (
						<tr
							key={u._id}
							className="hover:bg-muted/20 border-border/50 border-b transition-colors"
						>
							{/* User */}
							<td className="px-4 md:px-5 py-4 whitespace-nowrap">
								<div className="flex items-center gap-3">
									{u.profilePicture ? (
										<img
											src={u.profilePicture}
											alt={u.fullName}
											className="border border-border rounded-xl size-9 object-cover shrink-0"
										/>
									) : (
										<div className="flex justify-center items-center bg-primary/20 border border-primary/30 rounded-xl size-9 shrink-0">
											<span className="font-bold text-primary text-xs">
												{u.fullName?.[0]?.toUpperCase() || "?"}
											</span>
										</div>
									)}
									<div>
										<p className="font-semibold text-foreground">
											{u.fullName}
										</p>
										<p className="text-[10px] text-muted-foreground">
											@{u.username} · {u.email}
										</p>
									</div>
								</div>
							</td>
							{/* Account ID */}
							<td className="px-4 md:px-5 py-4 whitespace-nowrap">
								<span className="bg-muted/40 px-2 py-1 border border-border rounded-lg font-mono text-foreground text-xs">
									{u.accountId || "—"}
								</span>
							</td>
							{/* Country */}
							<td className="px-4 md:px-5 py-4 text-muted-foreground whitespace-nowrap">
								{u.country || "—"}
							</td>
							{/* KYC */}
							<td className="px-4 md:px-5 py-4 whitespace-nowrap">
								<span
									className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${KYC_STYLES[u.kycStatus as KycStatus] || KYC_STYLES["NOT STARTED"]}`}
								>
									{u.kycStatus || "NOT STARTED"}
								</span>
							</td>
							{/* Last Session */}
							<td className="px-4 md:px-5 py-4 text-muted-foreground whitespace-nowrap">
								{u.lastSession ? formatDate(u.lastSession) : "—"}
							</td>
							{/* Status */}
							<td className="px-4 md:px-5 py-4 whitespace-nowrap">
								<span
									className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${u.suspended ? "bg-destructive/15 text-destructive border-destructive/20" : "bg-green-500/15 text-green-400 border-green-500/20"}`}
								>
									{u.suspended ? "Suspended" : "Active"}
								</span>
							</td>
							{/* Actions */}
							<td className="px-4 md:px-5 py-4 whitespace-nowrap">
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => {}}
										className="flex items-center gap-1.5 bg-muted/30 hover:bg-muted/60 px-3 py-1.5 border border-border rounded-lg font-medium text-foreground text-xs transition-colors"
									>
										<Edit />
										Edit
									</button>
									<button
										type="button"
										onClick={() => {}}
										className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
											u.suspended
												? "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
												: "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
										}`}
									>
										{u.suspended ? <Forbidden2 /> : <Forbidden />}
										{u.suspended ? "Unsuspend" : "Suspend"}
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
