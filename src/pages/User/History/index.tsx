import { ReceiptItem } from "iconsax-reactjs";
import { useState } from "react";
import CopyTradeHistory from "./CopyTradeHistory";

type TransactionTab = "deposit" | "withdrawal" | "copy" | "trade" | "others";

const TABS: {
	id: TransactionTab;
	label: string;
}[] = [
	{
		id: "deposit",
		label: "Deposit",
	},
	{
		id: "withdrawal",
		label: "Withdrawal",
	},
	{
		id: "copy",
		label: "Copy Trading",
	},
	{
		id: "trade",
		label: "Trade",
	},
	{
		id: "others",
		label: "Others",
	},
];

const index = () => {
	const [activeTab, setActiveTab] = useState<TransactionTab>("deposit");

	return (
		<main>
			<header className="flex items-start gap-4 mb-8 md:mb-10">
				<div className="flex justify-center items-center bg-primary/10 rounded-2xl size-14 md:size-16 shrink-0">
					<ReceiptItem className="size-6 md:size-7 xl:size-8 text-primary" />
				</div>
				<div>
					<h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight">
						Transaction History
					</h1>
					<p className="mx-auto mt-1 max-w-xl text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
						Monitor all your financial activities
					</p>
				</div>
			</header>
			<section className="flex gap-1 bg-card/60 backdrop-blur-sm my-6 p-1 border border-border rounded-xl overflow-x-auto hide-scrollbar">
				{TABS.map((tab) => (
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
			{activeTab === "copy" && <CopyTradeHistory />}
			{activeTab === "trade" && <CopyTradeHistory />}
		</main>
	);
};

export default index;
