import { Profile2User, SearchNormal } from "iconsax-reactjs";
import { useState } from "react";
import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import Pagination from "#/components/Pagination";
import { PAGE_LIMIT } from "#/enum";
import { useFetchReferrals } from "#/services/queries.service";
import { formatCurrency, formatDate } from "#/utils/format";

const index = () => {
	const [page, setPage] = useState<number>(1);

	const { data, isLoading, isError, refetch } = useFetchReferrals(
		page,
		PAGE_LIMIT,
	);

	const referrals: AdminReferral[] = data?.data?.data ?? [];

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

	const totalRewards = referrals.reduce(
		(sum, r) => sum + (r.rewardAmount || 0),
		0,
	);

	return (
		<main>
			<div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 mb-8">
				<div>
					<h1 className="mb-1 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
						Referral Management
					</h1>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						View all user referrals and associated rewards
					</p>
				</div>
				<button
					type="button"
					onClick={() => refetch()}
					className="flex items-center gap-2 bg-card/80 hover:bg-muted/50 px-4 py-2.5 border border-border rounded-xl text-[11px] text-foreground md:text-xs xl:text-sm transition-colors cursor-pointer shrink-0"
				>
					<SearchNormal className="size-3 md:size-3.5 xl:size-4" />
					Refresh
				</button>
			</div>

			{/* Stats */}
			<div className="gap-3 md:gap-4 grid grid-cols-2 lg:grid-cols-3 mb-6">
				{[
					{
						label: "Total Referrals",
						val: referrals.length,
						color: "text-foreground",
					},
					{
						label: "Unique Referrers",
						val: new Set(referrals.map((r) => r.referrerId)).size,
						color: "text-primary",
					},
					{
						label: "Total Rewards Paid",
						val: `${formatCurrency(totalRewards)}`,
						color: "text-green-400",
					},
				].map((s) => (
					<div
						key={s.label}
						className="bg-card/80 backdrop-blur-sm p-4 border border-border rounded-xl"
					>
						<p className="mb-1 text-muted-foreground text-xs">{s.label}</p>
						<p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
					</div>
				))}
			</div>

			{/* Table */}
			<div className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				<div className="bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-5 xl:px-6 py-5 border-border border-b">
					<h2 className="font-bold">Referral Records</h2>
					<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						{referrals.length} of {referrals.length} referrals
					</p>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center py-16">
						<div className="border-4 border-border border-t-primary rounded-full size-6 md:size-7 xl:size-8 animate-spin" />
					</div>
				) : referrals.length === 0 ? (
					<div className="flex flex-col items-center gap-3 py-16 text-center">
						<div className="flex justify-center items-center bg-muted/30 border border-border rounded-xl size-10 md:size-11 xl:size-12">
							<Profile2User className="size-5 md:size-5.5 xl:size-6 text-muted-foreground" />
						</div>
						<p className="font-semibold text-[11px] md:text-xs xl:text-sm">
							No referrals found
						</p>
						<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							Try adjusting your search
						</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-[11px] md:text-xs xl:text-sm">
							<thead>
								<tr className="border-border border-b">
									{["Date", "Referrer", "Referred User", "Reward Amount"].map(
										(h) => (
											<th
												key={h}
												className="px-4 md:px-6 py-3 font-semibold text-muted-foreground text-xs text-left whitespace-nowrap"
											>
												{h}
											</th>
										),
									)}
								</tr>
							</thead>
							<tbody>
								{referrals.map((r) => (
									<tr
										key={r._id}
										className="hover:bg-muted/20 border-border/50 border-b transition-colors"
									>
										{/* Date */}
										<td className="px-4 md:px-6 py-4 text-muted-foreground whitespace-nowrap">
											{formatDate(r.createdAt)}
										</td>
										{/* Referrer */}
										<td className="px-4 md:px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2.5">
												<img
													src={r.referrerId.profilePicture}
													alt="referrer profile"
													className="size-7"
												/>
												<div>
													<p className="font-medium text-xs">
														{r.referrerId.username || "—"}
													</p>
													<p className="text-[10px] text-muted-foreground">
														{r.referrerId.email}
													</p>
												</div>
											</div>
										</td>
										{/* Referred User */}
										<td className="px-4 md:px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2.5">
												<img
													src={r.referredUserId.profilePicture}
													alt="referred profile"
												/>
												<div>
													<p className="font-medium text-xs">
														{r.referredUserId.username || "—"}
													</p>
													<p className="text-[10px] text-muted-foreground">
														{r.referredUserId.email}
													</p>
												</div>
											</div>
										</td>
										{/* Reward */}
										<td className="px-4 md:px-6 py-4 whitespace-nowrap">
											<span className="font-bold text-green-500">
												+{formatCurrency(r.rewardAmount)}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
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
		</main>
	);
};

export default index;
