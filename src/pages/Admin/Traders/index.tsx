import { AddSquare } from "iconsax-reactjs";
import { useState } from "react";
import AdminError from "#/components/AdminError";
import AdminLoader from "#/components/AdminLoader";
import ExpertCard from "#/components/ExpertCard";
import { Overlay } from "#/components/Overlay";
import Pagination from "#/components/Pagination";
import { Button } from "#/components/ui/button";
import { PAGE_LIMIT } from "#/enum";
import { useFetchTraders } from "#/services/queries.service";
import NewForm from "./NewForm";

const index = () => {
	const [newTx, setNewTx] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isError, refetch } = useFetchTraders(
		page,
		PAGE_LIMIT,
	);

	// Functions
	const toggleNew = () => {
		setNewTx((prev) => !prev);
	};

	const traders = data?.data?.data ?? [];

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
						Copy Traders
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
			{traders && traders.length === 0 ? (
				<div className="flex justify-center items-center bg-card mx-auto py-20 rounded-xl">
					<p className="text-destructive capitalize">No Transactions</p>
				</div>
			) : (
				<div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
					{traders.map((trader: Trader) => (
						<ExpertCard
							key={trader._id}
							expert={trader}
							isCopying={false}
							isAdmin={true}
						/>
					))}
				</div>
			)}
			{pagination.totalPages > 1 && (
				<Pagination
					pageSize={pagination.totalPages}
					defaultPage={page}
					page={page}
					onPageChange={setPage}
				/>
			)}
			<Overlay open={newTx} onClose={toggleNew} variant="bottom">
				<NewForm onClose={toggleNew} />
			</Overlay>
		</main>
	);
};

export default index;
