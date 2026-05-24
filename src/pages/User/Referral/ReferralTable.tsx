import { Calendar, Gift, Profile2User } from "iconsax-reactjs";
import { formatCurrency, formatDate } from "#/utils/format";

type ReferralTableProps = {
	referrals: Referral[];
};

export default function ReferralTable({ referrals }: ReferralTableProps) {
	if (!referrals.length) {
		return (
			<div className="flex flex-col justify-center items-center bg-card/60 px-6 py-16 border border-border rounded-2xl text-center">
				<div className="flex justify-center items-center bg-primary/10 mb-4 rounded-2xl size-16">
					<Gift size={30} variant="Bold" className="text-primary" />
				</div>

				<h2 className="font-bold text-lg md:text-xl xl:text-2xl">
					No Referrals Yet
				</h2>

				<p className="mt-2 max-w-md text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
					Once users sign up with your referral link, they will appear here
					along with the rewards you earned.
				</p>
			</div>
		);
	}

	const totalRewards = referrals.reduce(
		(acc, curr) => acc + curr.rewardAmount,
		0,
	);

	return (
		<div className="space-y-5">
			{/* Summary */}
			<section className="gap-4 grid grid-cols-1 sm:grid-cols-2">
				<div className="bg-card/70 shadow-lg backdrop-blur-md p-4 md:p-5 xl:p-6 border border-border rounded-2xl">
					<div className="flex items-center gap-3">
						<div className="flex justify-center items-center bg-primary/10 rounded-2xl size-12">
							<Profile2User size={24} variant="Bold" className="text-primary" />
						</div>

						<div>
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Total Referrals
							</p>

							<h3 className="font-bold text-xl md:text-2xl xl:text-3xl">
								{referrals.length}
							</h3>
						</div>
					</div>
				</div>

				<div className="bg-card/70 shadow-lg backdrop-blur-md p-4 md:p-5 xl:p-6 border border-border rounded-2xl">
					<div className="flex items-center gap-3">
						<div className="flex justify-center items-center bg-emerald-500/10 rounded-2xl size-10 md:size-11 xl:size-12">
							<Gift
								variant="Bold"
								className="size-5 md:size-5.5 xl:size-6 text-emerald-500"
							/>
						</div>

						<div>
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Total Rewards
							</p>

							<h3 className="font-bold text-emerald-500 text-xl md:text-2xl xl:text-3xl">
								{formatCurrency(totalRewards)}
							</h3>
						</div>
					</div>
				</div>
			</section>

			{/* Table */}
			<section className="bg-card/70 shadow-xl backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				<div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 px-5 md:px-6 py-5 border-border border-b">
					<div>
						<h2 className="font-bold text-lg md:text-xl xl:text-2xl">
							Referral History
						</h2>

						<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							All users referred and the rewards earned.
						</p>
					</div>
				</div>

				<div className="overflow-x-auto">
					<div className="min-w-180">
						{/* Header */}
						<div className="grid grid-cols-[2fr_1.2fr_1fr_1fr] bg-accent/20 px-5 md:px-6 py-4 border-border border-b">
							<span className="font-semibold text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase">
								User
							</span>

							<span className="font-semibold text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase">
								Joined
							</span>

							<span className="font-semibold text-[11px] text-muted-foreground md:text-xs xl:text-sm text-center uppercase">
								Reward
							</span>

							<span className="font-semibold text-[11px] text-muted-foreground md:text-xs xl:text-sm text-right uppercase">
								Status
							</span>
						</div>

						{/* Rows */}
						<div>
							{referrals.map((referral) => {
								const user = referral.referredUserId;

								return (
									<div
										key={referral._id}
										className="grid grid-cols-[2fr_1.2fr_1fr_1fr] hover:bg-accent/10 px-5 md:px-6 py-5 border-border/50 border-b last:border-none transition-colors"
									>
										{/* User */}
										<div className="flex items-center gap-3 min-w-0">
											<div className="flex justify-center items-center bg-primary/10 rounded-2xl size-12 overflow-hidden shrink-0">
												{user.profilePicture ? (
													<img
														src={user.profilePicture}
														alt={user.username}
														className="w-full h-full object-cover"
													/>
												) : (
													<span className="font-bold text-primary text-sm md:text-base xl:text-lg">
														{user.username.slice(0, 2)}
													</span>
												)}
											</div>

											<div className="min-w-0">
												<h3 className="font-semibold text-[11px] md:text-xs xl:text-sm truncate">
													{user.fullName}
												</h3>

												<p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs truncate">
													@{user.username}
												</p>
											</div>
										</div>

										{/* Joined */}
										<div className="flex items-center gap-2 text-muted-foreground">
											<Calendar size={16} variant="Bold" />

											<span className="text-[11px] md:text-xs xl:text-sm">
												{formatDate(user.createdAt)}
											</span>
										</div>

										{/* Reward */}
										<div className="flex justify-center items-center">
											<span className="font-bold text-[11px] text-emerald-500 md:text-xs xl:text-sm">
												+{formatCurrency(referral.rewardAmount)}
											</span>
										</div>

										{/* Status */}
										<div className="flex justify-end items-center">
											<div className="inline-flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/20 rounded-full">
												<div className="bg-emerald-400 rounded-full size-2" />
												<span className="font-semibold text-[10px] text-emerald-400 md:text-[11px] xl:text-xs">
													Rewarded
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
