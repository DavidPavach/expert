import { useState } from "react";
import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { useSettings } from "#/services/queries.service";
import DepositCoins from "./DepositCoins";
import GlobalSettings from "./GlobalSettings";
import WithdrawalCoins from "./WithdrawalCoins";

const tabs = [
	{ id: "global", label: "Global Settings" },
	{ id: "deposit", label: "Deposit Coins" },
	{ id: "withdrawal", label: "Withdrawal Coins" },
];
const index = () => {
	const [activeTab, setActiveTab] = useState("global");
	const { data, isLoading, isError, refetch } = useSettings();

	if (isLoading) {
		return <AdminLoader />;
	}

	if (isError) {
		return <AdminError onRetry={refetch} />;
	}

	const settings: Settings = data?.data || {};
	return (
		<main>
			<header>
				<h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
					Platform Settings
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
						className={`flex-1 min-w-max px-3 py-1 rounded-lg text-[11px] cursor-pointer md:text-xs xl:text-sm font-medium transition-all ${
							activeTab === tab.id
								? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
								: "text-muted-foreground hover:text-foreground hover:bg-muted/50"
						}`}
					>
						{tab.label}
					</button>
				))}
			</section>
			<section className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				{activeTab === "global" && (
					<GlobalSettings
						settings={{
							threshold: settings.threshold,
							whatsAppNumber: settings.whatsAppNumber,
							address: settings.address,
							thresholdText: settings.thresholdText,
							noWithdrawal: settings.noWithdrawal,
							minDeposit: settings.minDeposit,
							minWithdrawal: settings.minWithdrawal,
						}}
					/>
				)}
				{activeTab === "deposit" && (
					<DepositCoins depositCoins={settings.depositCoins} />
				)}
				{activeTab === "withdrawal" && (
					<WithdrawalCoins withdrawalCoins={settings.withdrawalCoins} />
				)}
			</section>
		</main>
	);
};

export default index;
