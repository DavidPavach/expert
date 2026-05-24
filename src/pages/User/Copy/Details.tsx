import {
	Calendar2,
	Chart1,
	ChartSuccess,
	CloseCircle,
	DollarCircle,
	Graph,
	Profile2User,
} from "iconsax-reactjs";
import { daysDifference, formatCurrency, formatDate } from "#/utils/format";

type CopyPositionDetailsProps = {
	onClose: () => void;
	data: CopyTrading;
};

export default function Details({ onClose, data }: CopyPositionDetailsProps) {
	const isProfit = data.pnl >= 0;

	return (
		<div className="bg-card/95 shadow-2xl backdrop-blur-xl border border-border rounded-2xl overflow-hidden text-card-foreground">
			{/* Header */}
			<header className="flex justify-between items-center bg-linear-to-r from-primary/5 to-primary/2.5 px-4 md:px-6 xl:px-8 py-4 border-border border-b">
				<div className="flex items-center gap-3">
					<div className="flex justify-center items-center bg-primary/10 border border-primary/20 rounded-2xl size-10 md:size-11 xl:size-12">
						<Chart1
							variant="Bold"
							className="size-5 md:size-5.5 xl:size-6 text-primary"
						/>
					</div>

					<div>
						<h2 className="font-bold text-lg md:text-xl xl:text-2xl">
							Copy Position Details
						</h2>

						<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Track copied trade performance and growth.
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={onClose}
					className="flex justify-center items-center hover:bg-destructive/50 rounded-xl size-10 text-muted-foreground hover:text-destructive-foreground transition-colors cursor-pointer"
				>
					<CloseCircle className="size-4 md:size-4.5 xl:size-5" />
				</button>
			</header>

			<div className="space-y-5 md:space-y-6 xl:space-y-8 p-4 md:p-6 xl:p-8">
				{/* Trader Card */}
				<section className="bg-linear-to-br from-accent/15 to-accent/7.5 border border-border rounded-2xl overflow-hidden">
					<div className="p-4 md:p-5 xl:p-6">
						<div className="flex sm:flex-row flex-col sm:items-center gap-4">
							<div className="flex items-center gap-4">
								<div className="flex justify-center items-center bg-primary shadow-md shadow-primary/20 rounded-2xl size-16 md:size-18 xl:size-20 overflow-hidden">
									{data.masterTraderId.profilePicture ? (
										<img
											src={data.masterTraderId.profilePicture}
											alt={data.masterTraderId.name}
											className="w-full h-full object-cover"
										/>
									) : (
										<span className="font-bold text-primary-foreground text-xl md:text-2xl">
											{data.masterTraderId.name.charAt(0)}
										</span>
									)}
								</div>

								<div>
									<h3 className="font-bold text-base md:text-lg xl:text-xl">
										{data.masterTraderId.name}
									</h3>

									<div className="flex items-center gap-2 mt-1 text-muted-foreground">
										<Profile2User
											className="size-4 md:size-4.5 xl:size-5"
											variant="Bold"
										/>
										<span className="text-[11px] md:text-xs xl:text-sm">
											{data.masterTraderId.title}
										</span>
									</div>
								</div>
							</div>

							<div className="sm:ml-auto">
								<div
									className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] md:text-xs xl:text-sm font-semibold ${
										isProfit
											? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
											: "bg-red-500/10 border-red-500/20 text-red-400"
									}`}
								>
									<div
										className={`rounded-full size-2 animate-pulse ${
											isProfit ? "bg-emerald-400" : "bg-red-400"
										}`}
									/>

									{isProfit ? "Profitable Position" : "Position Drawdown"}
								</div>
							</div>
						</div>

						{/* Stats */}
						<div className="gap-3 md:gap-4 grid grid-cols-2 xl:grid-cols-4 mt-6">
							<StatCard
								title="Investment"
								value={formatCurrency(data.investment)}
								icon={<DollarCircle className="size-4 md:size-4.5 xl:size-5" />}
							/>

							<StatCard
								title="Current Value"
								value={formatCurrency(data.currentValue)}
								icon={<ChartSuccess className="size-4 md:size-4.5 xl:size-5" />}
							/>

							<StatCard
								title="P&L"
								value={`${isProfit ? "+" : ""}${formatCurrency(data.pnl)}`}
								valueClass={isProfit ? "text-emerald-500" : "text-red-500"}
								icon={<Chart1 className="size-4 md:size-4.5 xl:size-5" />}
							/>

							<StatCard
								title="ROI"
								value={`${isProfit ? "+" : ""}${data.roi.toFixed(2)}%`}
								valueClass={isProfit ? "text-emerald-500" : "text-red-500"}
								icon={<Graph className="size-4 md:size-4.5 xl:size-5" />}
							/>
						</div>
					</div>
				</section>

				{/* History */}
				<section className="bg-accent/10 border border-border rounded-2xl overflow-hidden">
					<div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 p-5 md:p-6 border-border border-b">
						<div>
							<h3 className="font-bold text-base md:text-lg xl:text-xl">
								Performance History
							</h3>

							<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Daily copied position performance metrics.
							</p>
						</div>

						<div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 border border-primary/5 rounded-xl w-fit text-primary/80">
							<Calendar2
								className="size-4 md:size-4.5 xl:size-5"
								variant="Bold"
							/>
							<span className="font-semibold text-[11px] md:text-xs xl:text-sm">
								{daysDifference(data.createdAt)} Days Active
							</span>
						</div>
					</div>

					<div className="overflow-x-auto">
						<div className="min-w-137.5">
							{/* Table Header */}
							<div className="grid grid-cols-3 px-5 md:px-6 py-4 border-border/50 border-b text-[11px] text-muted-foreground md:text-xs xl:text-sm uppercase tracking-wide">
								<span>Date</span>
								<span className="text-center">Daily Change</span>
								<span className="text-right">Portfolio Value</span>
							</div>

							{/* Table Body */}
							<div className="max-h-80 overflow-y-auto hide-scrollbar">
								{data.entries.map((item) => {
									const positive = item.percentChange >= 0;

									return (
										<div
											key={`${item.date}-${item.price}`}
											className="grid grid-cols-3 hover:bg-accent/10 px-5 md:px-6 py-4 border-border/30 border-b last:border-none transition-colors"
										>
											<span className="font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">
												{formatDate(item.date)}
											</span>

											<span
												className={`text-center font-bold text-[11px] md:text-xs xl:text-sm ${
													positive ? "text-emerald-500" : "text-red-500"
												}`}
											>
												{positive ? "+" : ""}
												{item.percentChange.toFixed(2)}%
											</span>

											<span className="font-bold text-[11px] md:text-xs xl:text-sm text-right">
												{formatCurrency(item.price)}
											</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

type StatCardProps = {
	title: string;
	value: string;
	icon: React.ReactNode;
	valueClass?: string;
};

function StatCard({ title, value, icon, valueClass }: StatCardProps) {
	return (
		<div className="bg-background/40 hover:bg-background/60 p-2 md:p-3 xl:p-4 border border-border rounded-2xl transition-all duration-300">
			<div className="flex gap-2 text-primary shrink-0">
				{icon}
				<span className="font-medium text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wide">
					{title}
				</span>
			</div>

			<p
				className={`mt-3 font-bold text-base md:text-lg xl:text-xl ${valueClass ?? ""}`}
			>
				{value}
			</p>
		</div>
	);
}
