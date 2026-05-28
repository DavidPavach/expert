import { Eye, Personalcard } from "iconsax-reactjs";
import { formatDate } from "#/utils/format";

export const STATUS_STYLES = {
	PENDING: "bg-amber-500/15 text-amber-500 border-amber-500/20",
	APPROVED: "bg-green-500/15 text-green-500 border-green-500/20",
	REJECTED: "bg-destructive/15 text-destructive border-destructive/20",
};

const Table = ({
	filtered,
	loading,
	length,
	setSelected,
}: {
	filtered: AdminKyc[];
	loading: boolean;
	length: number;
	setSelected: (kyc: AdminKyc) => void;
}) => {
	return (
		<main>
			<div className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				<div className="bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-5 md:px-7 py-5 border-border border-b">
					<h2 className="font-bold">KYC Submissions</h2>
					<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						{filtered.length} of {length} records (max 50)
					</p>
				</div>

				{loading ? (
					<div className="flex justify-center items-center py-16">
						<div className="border-4 border-border border-t-primary rounded-full w-8 h-8 animate-spin" />
					</div>
				) : filtered.length === 0 ? (
					<div className="flex flex-col items-center gap-3 py-16 text-center">
						<div className="flex justify-center items-center bg-muted/30 border border-border rounded-xl size-10 md:size-11 xl:size-12">
							<Personalcard className="size-5 md:size-5.5 xl:size-6 text-muted-foreground" />
						</div>
						<p className="font-semibold text-[11px] md:text-xs xl:text-sm">
							No KYC records found
						</p>
						<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							Try adjusting your search or filters
						</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-xs md:text-sm">
							<thead>
								<tr className="border-border border-b">
									{[
										"Name",
										"Email",
										"Country",
										"Document",
										"Submitted",
										"Status",
										"Actions",
									].map((h) => (
										<th
											key={h}
											className="px-4 md:px-5 py-3 font-semibold text-[11px] text-muted-foreground md:text-xs xl:text-sm text-left whitespace-nowrap"
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{filtered.map((r) => (
									<tr
										key={r._id}
										className="hover:bg-muted/20 border-border/50 border-b transition-colors"
									>
										{/* Name */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<div className="font-medium">
												{r.firstName} {r.lastName}
											</div>
											{r.dateOfBirth && (
												<div className="text-[10px] text-muted-foreground">
													{r.dateOfBirth}
												</div>
											)}
										</td>
										{/* Email */}
										<td className="px-4 md:px-5 py-4 text-muted-foreground whitespace-nowrap">
											{r.email || "—"}
										</td>
										{/* Country */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											{r.countryNationality || "—"}
										</td>
										{/* Document */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span className="bg-muted/40 px-2.5 py-1 border border-border rounded-lg font-medium">
												{r.documentType || "—"}
											</span>
										</td>
										{/* Submitted */}
										<td className="px-4 md:px-5 py-4 text-muted-foreground whitespace-nowrap">
											{formatDate(r.createdAt)}
										</td>
										{/* Status */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<span
												className={`font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[r.status] || STATUS_STYLES.PENDING}`}
											>
												{r.status || "PENDING"}
											</span>
										</td>
										{/* Actions */}
										<td className="px-4 md:px-5 py-4 whitespace-nowrap">
											<button
												type="button"
												onClick={() => setSelected(r)}
												className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 border border-primary/30 rounded-lg font-medium text-primary text-xs transition-colors cursor-pointer"
											>
												<Eye className="size-3 md:size-3.5 xl:size-4" />
												Review
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</main>
	);
};

export default Table;
