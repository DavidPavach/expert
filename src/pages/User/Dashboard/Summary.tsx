import { Link } from "@tanstack/react-router";
// Icons
import {
	AddCircle,
	Calendar2,
	Danger,
	EmptyWallet,
	Gift,
	MinusCirlce,
	MoneyRecive,
	MoneySend,
	Refresh2,
	TickCircle,
} from "iconsax-reactjs";
import { useDashboard } from "#/services/queries.service";
import { useBalanceStore } from "#/stores/dashboard.store";
import { useMeStore } from "#/stores/me.store";

// Utils
import { formatCurrency, formatDate } from "#/utils/format";

type StatCardProps = {
	title: string;
	amount: string;
	subtitle: string;
	icon: React.ReactNode;
	isLoading: boolean;
	isError: boolean;
};

const StatCard = ({
	title,
	amount,
	subtitle,
	icon,
	isLoading,
	isError,
}: StatCardProps) => {
	return (
		<div className="bg-card p-4 md:p-5 xl:p-6 border border-border rounded-3xl">
			<div className="flex justify-between items-start">
				<div>
					<p className="text-sm md:text-base xl:text-lg truncate">{title}</p>

					<h2
						className={`${isLoading ? "animate-pulse" : isError ? "text-destructive" : ""} mt-4 font-bold text-lg md:text-xl xl:text-2xl montserrat`}
					>
						{isLoading ? "--.--" : isError ? "—" : amount}
					</h2>
				</div>

				{icon}
			</div>

			<div className="flex items-center gap-x-2 mt-5 text-[11px] md:text-xs xl:text-sm">
				<Calendar2 className="size-4" />
				<p>{subtitle}</p>
			</div>
		</div>
	);
};

export default function Summary() {
	const { data, isLoading, isError } = useDashboard();
	const { stats } = useBalanceStore();
	const userBalances: DashboardStats = data?.data || {
		approvedDeposits: stats?.approvedDeposits,
		approvedBonuses: stats?.approvedBonuses,
		totalWithdrawals: stats?.totalWithdrawals,
		approvedPenalties: stats?.approvedPenalties,
		availableBalance: stats?.availableBalance,
	};
	const { user } = useMeStore();

	return (
		<section className="gap-3 md:gap-4 xl:gap-5 grid grid-cols-1 xl:grid-cols-[1.3fr_2fr]">
			{/* Main balance card */}
			<div className="bg-card p-4 md:p-5 xl:p-6 border border-border rounded-3xl">
				<div className="flex items-center gap-x-2">
					<EmptyWallet className="size-5" variant="Outline" />

					<h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
						Account Balance
					</h2>
				</div>

				<p className="mt-1 text-[11px] md:text-xs xl:text-sm">
					Your available funds
				</p>

				<h1
					className={`${isLoading ? "animate-pulse" : isError ? "text-destructive" : ""} mt-5 font-bold text-2xl md:text-3xl xl:text-4xl montserrat`}
				>
					{isLoading
						? "--.--"
						: isError
							? "—"
							: formatCurrency(userBalances.availableBalance)}
				</h1>
				<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Total Locked Up Funds:{" "}
					<span className="text-primary">
						{formatCurrency(userBalances.totalLockedFunds)}
					</span>
				</p>

				{/* Badge */}
				<div className="inline-flex items-center gap-x-2 bg-primary/5 mt-5 px-4 py-2 rounded-full text-[11px] md:text-xs xl:text-sm">
					<div className="bg-green-500 rounded-full size-2" />

					<p className="font-medium">Available for Withdrawal</p>
				</div>

				{/* Verification */}
				{user?.kycStatus === "APPROVED" ? (
					<div className="flex items-center gap-x-2 mt-6 text-[11px] text-green-500 md:text-xs xl:text-sm">
						<TickCircle className="size-4" variant="Bold" />
						<p>Unverified</p>
					</div>
				) : user?.kycStatus === "PENDING" ? (
					<div className="flex items-center gap-x-2 mt-6 text-[11px] text-yellow-500 md:text-xs xl:text-sm">
						<Refresh2 className="size-4" variant="Bold" />
						<p>Unverified</p>
					</div>
				) : (
					<div className="flex items-center gap-x-2 mt-6 text-[11px] text-destructive md:text-xs xl:text-sm">
						<Danger className="size-4" variant="Bold" />
						<p>Unverified</p>
					</div>
				)}

				{/* Last updated */}
				<p className="mt-5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Last updated: {formatDate(new Date())}
				</p>

				{/* Actions */}
				<div className="gap-3 grid grid-cols-2 mt-6">
					<Link
						to="/deposit"
						className="flex justify-center items-center gap-x-3 bg-green-500/80 hover:bg-green-500 px-4 py-3 rounded-2xl font-semibold text-green-100 transition-all duration-300"
					>
						<AddCircle
							variant="Outline"
							className="size-4 md:size-4.5 xl:size-5"
						/>
						Deposit
					</Link>

					<Link
						to="/withdrawal"
						className="flex justify-center items-center gap-x-3 bg-red-500/80 hover:bg-red-500 px-4 py-3 rounded-2xl font-semibold text-red-100 transition-all duration-300"
					>
						<MinusCirlce
							className="size-4 md:size-4.5 xl:size-5"
							variant="Outline"
						/>
						Withdraw
					</Link>
				</div>
			</div>

			{/* Stats */}
			<div className="gap-3 md:gap-4 xl:gap-5 grid grid-cols-2">
				<StatCard
					title="Total Profit"
					amount={formatCurrency(0)}
					subtitle="Last period"
					isLoading={isLoading}
					isError={isError}
					icon={
						<MoneyRecive
							className="size-5 md:size-6 xl:size-7 text-primary shrink-0"
							variant="Bold"
						/>
					}
				/>

				<StatCard
					title="Total Deposit"
					amount={formatCurrency(userBalances.approvedDeposits)}
					subtitle="All time"
					isLoading={isLoading}
					isError={isError}
					icon={
						<MoneySend
							className="size-5 md:size-6 xl:size-7 text-green-500 shrink-0"
							variant="Bold"
						/>
					}
				/>

				<StatCard
					title="Total Withdrawal"
					amount={formatCurrency(userBalances.totalWithdrawals)}
					subtitle="All time"
					isLoading={isLoading}
					isError={isError}
					icon={
						<MinusCirlce
							className="size-5 md:size-6 xl:size-7 text-red-500 shrink-0"
							variant="Bold"
						/>
					}
				/>

				<StatCard
					title="Bonus"
					amount={formatCurrency(userBalances.approvedBonuses)}
					subtitle="All time"
					isLoading={isLoading}
					isError={isError}
					icon={
						<Gift
							className="size-5 md:size-6 xl:size-7 text-accent shrink-0"
							variant="Bold"
						/>
					}
				/>
			</div>
		</section>
	);
}
