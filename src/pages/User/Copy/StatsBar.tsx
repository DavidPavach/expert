import { DollarCircle, Graph, Profile2User, Wallet1 } from "iconsax-reactjs";

export default function StatsBar() {
	const activeCopies = 0;
	const totalInvested = 0;
	const currentValue = 0;
	const totalPnl = 0;
	const roi = 0;

	const stats = [
		{
			label: "Active Copies",
			value: activeCopies,
			sub: "Experts being copied",
			icon: (
				<Profile2User className="size-4 md:size-4.5 xl:size-5 text-primary" />
			),
			iconBg: "bg-primary/15 border-primary/20",
		},
		{
			label: "Total Invested",
			value: `$${Number(totalInvested).toFixed(2)}`,
			sub: "Capital deployed",
			icon: (
				<DollarCircle className="size-4 md:size-4.5 xl:size-5 text-green-500" />
			),
			iconBg: "bg-green-500/15 border-green-500/20",
		},
		{
			label: "Current Value",
			value: `$${Number(currentValue).toFixed(2)}`,
			sub: "Portfolio value",
			icon: <Wallet1 className="size-4 md:size-4.5 xl:size-5 text-secondary" />,
			iconBg: "bg-secondary/15 border-secondary/20",
		},
		{
			label: "Total P&L",
			value: `+$${Number(totalPnl).toFixed(2)}`,
			sub: `${Number(roi).toFixed(2)}% ROI`,
			valueClass: "text-green-400",
			icon: <Graph className="size-4 md:size-4.5 xl:size-5 text-green-500" />,
			iconBg: "bg-green-500/15 border-green-500/20",
		},
	];

	return (
		<div className="gap-3 md:gap-4 grid grid-cols-2 lg:grid-cols-4 mb-6">
			{stats.map((s) => (
				<div
					key={s.label}
					className="flex justify-between items-center gap-3 bg-card/80 backdrop-blur-sm p-4 border border-border rounded-xl"
				>
					<div>
						<p className="mb-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							{s.label}
						</p>
						<p
							className={`text-lg md:text-xl xl:text-2xl font-bold ${s.valueClass || "text-foreground"}`}
						>
							{s.value}
						</p>
						<p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							{s.sub}
						</p>
					</div>
					<div
						className={`size-8 md:size-9 xl:size-10 rounded-lg border flex items-center justify-center shrink-0 ${s.iconBg}`}
					>
						{s.icon}
					</div>
				</div>
			))}
		</div>
	);
}
