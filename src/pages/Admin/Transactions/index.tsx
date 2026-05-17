import { useState } from "react";
import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { useAdminTypeTxs } from "#/services/queries.service";

const tabs = [
	{ id: "deposit", label: "Deposit Txs" },
	{ id: "withdrawal", label: "Withdrawal Txs" },
	{ id: "bonus", label: "Bonus Txs" },
	{ id: "penalty", label: "Penalty Txs" },
];
const index = () => {
	const [activeTab, setActiveTab] = useState("deposit");
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isError, refetch } = useAdminTypeTxs(
		page,
		50,
		activeTab.toUpperCase(),
	);

	if (isLoading) {
		return <AdminLoader />;
	}

	if (isError) {
		return <AdminError onRetry={refetch} />;
	}

	console.log("The data", data);

	return (
		<main>
			<header>
				<h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
					User Transactions
				</h1>
				<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Expertmirrorcon — Admin Control Panel
				</p>
			</header>
			<section className="flex gap-1 bg-card/60 backdrop-blur-sm my-6 p-1 border border-border rounded-xl overflow-x-auto">
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`flex-1 min-w-max px-2 py-1 rounded-lg text-[11px] cursor-pointer md:text-xs xl:text-sm font-medium transition-all ${
							activeTab === tab.id
								? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
								: "text-muted-foreground hover:text-foreground hover:bg-muted/50"
						}`}
					>
						{tab.label}
					</button>
				))}
			</section>
			<section></section>
		</main>
	);
};

export default index;
