import { Profile2User } from "iconsax-reactjs";
import { useState } from "react";
import ActiveTradings from "#/components/ExpertActiveCard";
import { useUserCopyTrading } from "#/services/queries.service";
import Empty from "./Empty";
import ExpertCardError from "./ErrorCard";
import ExpertCardSkeleton from "./ExpertCardLoader";
import Experts from "./Experts";
import History from "./History";
import StatsBar from "./StatsBar";

const Dashboard = () => {
	const [experts, setExperts] = useState<boolean>(false);
	const { data, isLoading, isError, refetch } = useUserCopyTrading();

	const tradings: CopyTrading[] = data?.data || [];
	const activeTradings = tradings.filter((t) => t.status === "ACTIVE");

	const totals: { investment: number; currentValue: number; pnl: number } =
		tradings.reduce(
			(acc, t) => {
				acc.investment += t.investment ?? 0;
				acc.currentValue += t.currentValue ?? 0;
				acc.pnl += t.pnl ?? 0;
				return acc;
			},
			{ investment: 0, currentValue: 0, pnl: 0 },
		);

	const ids: string[] = activeTradings.map((t) => t.masterTraderId._id);

	if (isLoading) {
		return (
			<div className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				{Array.from({ length: 3 }).map((_, i) => (
					<ExpertCardSkeleton
						key={`skeleton-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <>
							i + 1
						}`}
					/>
				))}
				;
			</div>
		);
	}

	if (isError) {
		return <ExpertCardError retry={refetch} />;
	}

	// Functions
	const toggleExperts = () => setExperts((prev) => !prev);
	return (
		<>
			{experts ? (
				<Experts onClose={toggleExperts} ids={ids} />
			) : (
				<main>
					<header className="flex min-[500px]:flex-row flex-col justify-between min-[500px]:items-center gap-4 mb-7">
						<div>
							<h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
								Copy Trading Dashboard
							</h1>
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Manage your copy trading portfolio and track performance
							</p>
						</div>
						<button
							type="button"
							onClick={toggleExperts}
							className="flex items-center gap-2 bg-primary hover:opacity-90 shadow-lg shadow-primary/20 px-4 py-3 rounded-xl font-semibold text-primary-foreground text-sm transition-all cursor-pointer"
						>
							<Profile2User className="size-4 md:size-4.5 xl:size-5" />
							Browse Experts
						</button>
					</header>
					<StatsBar
						active={activeTradings.length}
						investment={totals.investment}
						currentValue={totals.currentValue}
						pnl={totals.pnl}
					/>
					{activeTradings.length === 0 ? (
						<Empty onBrowse={toggleExperts} />
					) : (
						<ActiveTradings tradings={activeTradings} isAdmin={false} />
					)}
					<History tradings={tradings} />
				</main>
			)}
		</>
	);
};

export default Dashboard;
