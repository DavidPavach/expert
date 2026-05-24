import { Edit2, InfoCircle, StatusUp, TrendUp } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import Details from "#/pages/User/Copy/Details";
import { useStopCopyTrading } from "#/services/mutations.service";
import { formatCurrency, formatDate } from "#/utils/format";
import { Overlay } from "./Overlay";
import { Button } from "./ui/button";

export default function ActiveTradings({
	tradings,
	isAdmin,
}: {
	tradings: CopyTrading[];
	isAdmin: boolean;
}) {
	const [view, setView] = useState<CopyTrading | null>(null);
	const [isStopping, setIsStopping] = useState<string | null>(null);
	const [id, setId] = useState<string>("");

	// Functions
	const toggleView = (data: CopyTrading | null) => setView(data);
	const toggle = (name: string | null) => setIsStopping(name);

	const stopCopying = useStopCopyTrading();
	const onStop = (id: string) => {
		stopCopying.mutate(id, {
			onSuccess: () => {
				toast.success("Copy Trade was closed successfully!");
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positives
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to stop copy trading. Kindly retry.";
				toast.error(message);
			},
		});
	};
	return (
		<>
			{view && (
				<Overlay open={!!view} onClose={() => toggleView(null)}>
					<Details data={view} onClose={() => toggleView(null)} />
				</Overlay>
			)}
			{isStopping && (
				<Overlay
					open={!!isStopping}
					onClose={() => toggle(null)}
					classNames="max-w-lg mx-auto"
				>
					<InfoCircle className="mx-auto size-7 md:size-8 xl:size-9 text-destructive" />
					<div className="my-8 text-center">
						<h1 className="font-semibold text-lg md:text-xl xl:text-2xl">
							Stop Copy Trading?
						</h1>
						<p className="mt-1">
							Are you sure you want to stop copying {isStopping}?
						</p>
					</div>
					<div className="bg-primary/20 px-4 py-3 rounded-md text-[11px] md:text-xs xl:text-sm text-center">
						Your current balance will be returned to your account immediately.
					</div>
					<div className="flex gap-x-5 mt-8 pr-4">
						<Button
							variant="destructive"
							className="w-1/2"
							onClick={() => onStop(id)}
						>
							Yes, Stop Copying
						</Button>
						<Button
							variant="ghost"
							className="w-1/2"
							onClick={() => toggle(null)}
						>
							Cancel
						</Button>
					</div>
				</Overlay>
			)}
			<div className="bg-card/80 shadow-xl backdrop-blur-md mb-6 border border-border rounded-2xl overflow-hidden">
				<div className="flex justify-between items-center bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-6 xl:px-8 py-7 border-border border-b">
					<div>
						<div className="flex items-center gap-2 mb-0.5">
							<TrendUp className="size-4 md:size-4.5 xl:size-5" />
							<h3 className="font-bold text-foreground text-sm md:text-base xl:text-lg">
								Active Copy Positions
							</h3>
						</div>
						<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Currently copying {tradings.length} expert trader(s)
						</p>
					</div>
					<div className="flex items-center gap-1.5">
						<span className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
						<span className="font-medium text-green-400 text-xs">Live</span>
					</div>
				</div>

				<div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3 p-5 md:p-7">
					{tradings.map((trading, i) => {
						const pnl = trading.currentValue - trading.investment;
						const roi =
							trading.investment > 0
								? ((pnl / trading.investment) * 100).toFixed(2)
								: "0.00";
						return (
							<div
								key={`copy_tradings_${
									// biome-ignore lint/suspicious/noArrayIndexKey: <>
									i
								}`}
								className="bg-muted/20 border border-border rounded-xl overflow-hidden"
							>
								{/* Card header */}
								<div className="flex justify-between items-center px-4 py-3 border-border border-b">
									<div className="flex items-center gap-3">
										<img
											className="bg-primary/20 border border-primary/30 rounded-xl size-8 md:size-9 xl:size-10"
											src={trading.masterTraderId.profilePicture}
											alt="Trader"
										/>
										<div>
											<p className="font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
												{trading.masterTraderId.name}
											</p>
											<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
												{trading.masterTraderId.title}
											</p>
										</div>
									</div>
									<div className="text-right">
										<span className="bg-green-500/15 px-2 py-0.5 rounded-full font-semibold text-[10px] text-green-400 md:text-[11px] xl:text-xs">
											Active
										</span>
										<p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
											{formatDate(trading.createdAt)}
										</p>
									</div>
								</div>

								{/* Stats */}
								<div className="flex flex-col gap-2 px-4 py-3">
									{[
										{
											label: "Investment",
											val: `${formatCurrency(trading.investment)}`,
											cls: "",
										},
										{
											label: "Current Value",
											val: `${formatCurrency(trading.currentValue)}`,
											cls: "",
										},
										{
											label: "P&L",
											val: `+$${pnl.toFixed(2)}`,
											cls: "text-green-600 dark:text-green-400",
										},
										{
											label: "ROI",
											val: `+${roi}%`,
											cls: "text-green-600 dark:text-green-400",
										},
									].map((row) => (
										<div
											key={row.label}
											className="flex justify-between items-center bg-background/40 px-3 py-3 rounded-lg"
										>
											<span className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
												{row.label}
											</span>
											<span
												className={`text-[10px] md:text-[11px] xl:text-xs font-semibold ${row.cls || "text-foreground"}`}
											>
												{row.val}
											</span>
										</div>
									))}
								</div>

								{/* Performance */}
								<div className="px-4 pb-3">
									<div className="flex justify-between mb-1 text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px]">
										<span>Performance</span>
										<span>{trading.entries.length} trades</span>
									</div>
									<div className="bg-muted rounded-full h-1.5 overflow-hidden">
										<div
											className="bg-primary rounded-full h-full"
											style={{ width: `${Math.min(trading.winRate, 100)}%` }}
										/>
									</div>
									<p className="mt-1 text-[10px] text-muted-foreground text-center">
										{trading.winRate}% win rate
									</p>
								</div>

								{/* Actions */}
								<div className="flex gap-2 px-4 pb-4">
									<button
										onClick={() => toggleView(trading)}
										type="button"
										className="flex flex-1 justify-center items-center gap-1.5 bg-primary hover:opacity-90 py-2.5 rounded-lg font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-all cursor-pointer"
									>
										<StatusUp className="size-3 md:size-3.5 xl:size-4" />
										View Details
									</button>
									<button
										onClick={() => {
											toggle(trading.masterTraderId.name);
											setId(trading._id);
										}}
										type="button"
										className="flex justify-center items-center bg-destructive/80 hover:bg-destructive rounded-lg size-8 md:size-9 xl:size-10 text-destructive-foreground transition-all cursor-pointer"
									>
										<div className="bg-white rounded-sm size-4 md:size-4.5 xl:size-5" />
									</button>
								</div>
								{isAdmin && (
									<button
										type="button"
										className="flex justify-center items-center gap-x-2 mx-auto mb-4 text-primary cursor-pointer"
									>
										<Edit2 className="size-4 md:size-4.5 xl:size-5" />
										Edit Details
									</button>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
