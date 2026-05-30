import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShieldSecurity, TrendUp } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import ExpertCard from "#/components/ExpertCard";
import Pagination from "#/components/Pagination";
import { PAGE_LIMIT } from "#/enum";
import { useNewCopyTrading } from "#/services/mutations.service";
import { useFetchTraders } from "#/services/queries.service";
import { useBalanceStore } from "#/stores/dashboard.store";
import ExpertCardError from "./ErrorCard";
import ExpertCardSkeleton from "./ExpertCardLoader";

const Experts = ({ onClose, ids }: { onClose: () => void; ids: string[] }) => {
	const navigate = useNavigate();
	const { stats } = useBalanceStore();
	const newCopy = useNewCopyTrading();
	const [page, setPage] = useState<number>(1);
	const [updateId, setUpdateId] = useState<string | null>(null);
	const { data, isLoading, isError, refetch } = useFetchTraders(
		page,
		PAGE_LIMIT,
	);

	const traders = data?.data?.data ?? [];

	const pagination = data?.data?.pagination ?? {
		total: 0,
		page: 1,
		limit: PAGE_LIMIT,
		totalPages: 1,
	};

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

	// Function
	const handleNewCopy = (amount: number, id: string, name: string) => {
		setUpdateId(id);
		const balance = stats?.availableBalance || 0;
		if (balance < amount) {
			toast.error(
				"Insufficient balance. You don't have enough balance to complete this action.",
			);
			return navigate({ to: "/deposit" });
		}
		newCopy.mutate(
			{ id, amount },
			{
				onSuccess: () => {
					setUpdateId(null);
					toast.success(
						`You’re now copying ${name} — trades will be mirrored automatically.`,
					);
				},
				// biome-ignore lint/suspicious/noExplicitAny: false positives
				onError: (error: any) => {
					setUpdateId(null);
					const message =
						error?.response?.data?.message ||
						`Failed to copy Trader. Kindly retry.`;
					toast.error(message);
				},
			},
		);
	};

	return (
		<main>
			<header className="flex flex-col items-center py-10">
				<div className="flex items-center bg-primary/20 px-4 py-1 rounded-2xl w-fit text-[10px] text-card-foreground md:text-[11px] xl:text-xs">
					<div className="bg-green-500 mr-2 rounded-full size-1.5 md:size-1.75 xl:size-2 animate-pulse" />
					<p>{traders.length} Expert Traders Available</p>
				</div>
				<div className="my-2 text-center">
					<h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
						Copy Expert Traders
					</h1>
					<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Choose from our top-performing traders and automatically copy their
						trades to your portfolio.
					</p>
				</div>
				<div className="flex items-center gap-x-5 mt-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					<button
						onClick={onClose}
						className="flex items-center gap-x-1 hover:text-primary duration-200 cursor-pointer"
						type="button"
					>
						<ArrowLeft className="size-3 md:size-3.5 xl:size-4" />
						Back To Dashboard
					</button>
					<p className="flex items-center gap-x-1">
						<ShieldSecurity className="size-3 md:size-3.5 xl:size-4" />
						<p>Verified</p>
					</p>
					<p className="flex items-center gap-x-1">
						<TrendUp className="size-3 md:size-3.5 xl:size-4" />
						<p>Proven Result</p>
					</p>
				</div>
			</header>
			{traders && traders.length === 0 ? (
				<div className="flex justify-center items-center bg-card mx-auto mt-10 py-20 rounded-xl">
					<p className="text-destructive capitalize">No Traders Yet</p>
				</div>
			) : (
				<div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{traders.map((trader: Trader) => {
						const isCopying = ids.includes(trader._id);
						return (
							<ExpertCard
								key={trader._id}
								expert={trader}
								isAdmin={false}
								copy={handleNewCopy}
								isLoading={trader._id === updateId}
								isCopying={isCopying}
							/>
						);
					})}
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
		</main>
	);
};

export default Experts;
