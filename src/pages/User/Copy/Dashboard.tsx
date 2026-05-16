import { Profile2User } from "iconsax-reactjs";
import { useState } from "react";
import Empty from "./Empty";
import Experts from "./Experts";
import StatsBar from "./StatsBar";

const Dashboard = () => {
	const [experts, setExperts] = useState<boolean>(false);

	// Functions
	const toggleExperts = () => setExperts((prev) => !prev);
	return (
		<>
			{experts ? (
				<Experts />
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
					<StatsBar />
					<Empty onBrowse={toggleExperts} />
				</main>
			)}
		</>
	);
};

export default Dashboard;
