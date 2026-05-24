import { AddSquare } from "iconsax-reactjs";
import { useEffect, useState } from "react";

import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import { Overlay } from "#/components/Overlay";
import Pagination from "#/components/Pagination";
import { Button } from "#/components/ui/button";
import { PAGE_LIMIT } from "#/enum";
import { useAdminTypeTxs } from "#/services/queries.service";
import NewForm from "./NewForm";
import Table from "./Table";

type TransactionTab = "deposit" | "withdrawal" | "bonus" | "penalty" | "profit";

const TABS: {
	id: TransactionTab;
	label: string;
}[] = [
	{
		id: "deposit",
		label: "Deposit Txs",
	},
	{
		id: "withdrawal",
		label: "Withdrawal Txs",
	},
	{
		id: "bonus",
		label: "Bonus Txs",
	},
	{
		id: "penalty",
		label: "Penalty Txs",
	},
	{
		id: "profit",
		label: "Profit Txs",
	},
];

const TransactionsPage = () => {
	const [newTx, setNewTx] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<TransactionTab>("deposit");
	const [page, setPage] = useState<number>(1);

	const { data, isLoading, isError, refetch } = useAdminTypeTxs(
		page,
		PAGE_LIMIT,
		activeTab.toUpperCase(),
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positives
	useEffect(() => {
		setPage(1);
	}, [activeTab]);

	const toggleNew = () => {
		setNewTx((prev) => !prev);
	};

	const txs = data?.data?.data ?? [];

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

	return (
		<main>
			<header className="flex justify-between items-center">
				<div>
					<h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
						User Transactions
					</h1>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Expertmirrorcon — Admin Control Panel
					</p>
				</div>

				<Button onClick={toggleNew}>
					New{" "}
					<AddSquare className="size-4 md:size-4.5 xl:size-5" variant="Bold" />
				</Button>
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

			<Table data={txs} />

			{pagination.totalPages > 1 && (
				<Pagination
					pageSize={pagination.totalPages}
					defaultPage={page}
					page={page}
					onPageChange={setPage}
				/>
			)}

			<Overlay open={newTx} onClose={toggleNew} variant="bottom">
				<NewForm />
			</Overlay>
		</main>
	);
};

export default TransactionsPage;
