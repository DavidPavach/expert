import { useState } from "react";

const tabs = [
	{ id: "global", label: "Global Settings" },
	{ id: "coins", label: "Coins" },
	{ id: "deposit", label: "Deposit Coins" },
	{ id: "withdrawal", label: "Withdrawal Coins" },
];
const index = () => {
	const [activeTab, setActiveTab] = useState("global");
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
			<div className="flex gap-1 bg-card/60 backdrop-blur-sm mb-6 p-1 border border-border rounded-xl overflow-x-auto">
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`flex-1 min-w-max px-4 py-1 rounded-lg text-[11px] md:text-xs xl:text-sm font-medium transition-all ${
							activeTab === tab.id
								? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
								: "text-muted-foreground hover:text-foreground hover:bg-muted/50"
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>
		</main>
	);
};

export default index;
