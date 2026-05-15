import { Lock } from "iconsax-reactjs";
import { useSettingsStore } from "#/stores/settings.store";

export const TICKER_ITEMS = [
	{ symbol: "BTC/USD", price: "67,432.10", change: "+2.4%" },
	{ symbol: "ETH/USD", price: "3,512.88", change: "+1.8%" },
	{ symbol: "SOL/USD", price: "158.34", change: "+4.1%" },
	{ symbol: "BNB/USD", price: "412.90", change: "-0.6%" },
	{ symbol: "XRP/USD", price: "0.5821", change: "+3.2%" },
	{ symbol: "ADA/USD", price: "0.7421", change: "+1.2%" },
	{ symbol: "DOGE/USD", price: "0.1682", change: "-1.1%" },
	{ symbol: "NVDA", price: "128.32", change: "+5.6%" },
	{ symbol: "TSLA", price: "214.18", change: "-2.3%" },
	{ symbol: "AAPL", price: "229.44", change: "+0.9%" },
	{ symbol: "AMZN", price: "186.72", change: "+1.4%" },
	{ symbol: "GOOGL", price: "178.26", change: "+0.7%" },
];

export default function LiveHero() {
	const tickerData = [...TICKER_ITEMS, ...TICKER_ITEMS];
	const { settings } = useSettingsStore();

	return (
		<div className="relative shadow-2xl border border-border rounded-2xl overflow-hidden">
			{/* Fake trading screen — blurred */}
			<div className="relative bg-linear-to-br from-[#0a1628] via-[#0d1f3c] to-[#071120] h-96 md:h-104 xl:h-112 overflow-hidden">
				{/* Simulated candlestick chart lines */}
				<div className="absolute inset-0 opacity-70">
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 800 400"
						preserveAspectRatio="none"
					>
						<title>""</title>
						{/* Grid lines */}
						{[80, 160, 240, 320].map((y) => (
							<line
								key={y}
								x1="0"
								y1={y}
								x2="800"
								y2={y}
								stroke="#1e3a5f"
								strokeWidth="1"
								strokeDasharray="4 6"
							/>
						))}
						{[100, 200, 300, 400, 500, 600, 700].map((x) => (
							<line
								key={x}
								x1={x}
								y1="0"
								x2={x}
								y2="400"
								stroke="#1e3a5f"
								strokeWidth="1"
								strokeDasharray="4 6"
							/>
						))}
						{/* Fake price line */}
						<polyline
							fill="none"
							stroke="#3de0c4"
							strokeWidth="2.5"
							points="0,280 60,260 120,300 180,220 240,240 300,180 360,210 420,160 480,190 540,130 600,150 660,100 720,120 780,80 800,90"
						/>
						{/* Area fill */}
						<polygon
							fill="url(#areaGrad)"
							points="0,280 60,260 120,300 180,220 240,240 300,180 360,210 420,160 480,190 540,130 600,150 660,100 720,120 780,80 800,90 800,400 0,400"
						/>
						<defs>
							<linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#3de0c4" stopOpacity="0.25" />
								<stop offset="100%" stopColor="#3de0c4" stopOpacity="0" />
							</linearGradient>
						</defs>
						{/* Candlesticks */}
						{[40, 120, 200, 280, 360, 440, 520, 600, 680, 760].map((x, i) => {
							const heights = [40, 55, 30, 60, 45, 70, 35, 50, 65, 42];
							const tops = [230, 200, 260, 170, 195, 145, 220, 165, 120, 140];
							const green = i % 2 === 0;
							return (
								<g key={x}>
									<line
										x1={x}
										y1={tops[i] - 15}
										x2={x}
										y2={tops[i] + heights[i] + 15}
										stroke={green ? "#3de0c4" : "#ef4444"}
										strokeWidth="1.5"
									/>
									<rect
										x={x - 8}
										y={tops[i]}
										width="16"
										height={heights[i]}
										fill={green ? "#3de0c4" : "#ef4444"}
										opacity="0.85"
										rx="2"
									/>
								</g>
							);
						})}
					</svg>
				</div>

				{/* Simulated UI elements behind blur */}
				<div className="top-4 left-4 absolute flex items-center gap-3 opacity-70">
					<div className="bg-primary/40 rounded w-24 h-5" />
					<div className="bg-green-400/30 rounded w-16 h-5" />
				</div>
				<div className="top-4 right-4 absolute flex items-center gap-2 opacity-70">
					<div className="bg-muted/50 rounded w-20 h-5" />
					<div className="bg-muted/40 rounded w-14 h-5" />
				</div>
				<div className="right-4 bottom-4 left-4 absolute flex gap-2 opacity-60">
					{[1, 2, 3, 4, 5].map((n) => (
						<div key={n} className="flex-1 bg-muted/30 rounded h-8" />
					))}
				</div>

				{/* Heavy blur overlay */}
				<div className="absolute inset-0 bg-background/30 backdrop-blur-md md:backdrop-blur-lg lg:backdrop-blur-xl xl:backdrop-blur-2xl" />

				{/* Lock icon center */}
				<div className="absolute inset-0 flex flex-col justify-center items-center gap-3">
					<div className="flex justify-center items-center bg-card/80 shadow-2xl border border-border rounded-2xl size-16">
						<Lock className="size-8 text-primary" />
					</div>
					<p className="font-semibold text-foreground">
						Premium Content Locked
					</p>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						{settings?.thresholdText ||
							"Upgrade to PDT Level to be able to watch live trading sessions"}
					</p>
				</div>

				{/* Live badge */}
				<div className="top-4 left-1/2 absolute flex items-center gap-1.5 bg-red-500/90 shadow-lg backdrop-blur-sm px-3 py-1 rounded-full -translate-x-1/2">
					<span className="bg-white rounded-full size-1.5 animate-pulse" />
					<span className="font-bold text-[11px] text-white md:text-xs xl:text-sm uppercase tracking-widest">
						Live
					</span>
				</div>
			</div>

			{/* Ticker bar */}
			<section className="relative flex items-center gap-4 bg-card/80 backdrop-blur-md px-4 py-3 border-border border-t overflow-hidden">
				{/* Left Label */}
				<div className="z-5 flex items-center bg-card pr-4 shrink-0">
					<span className="font-bold text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-[0.2em]">
						Markets
					</span>
				</div>

				{/* Fade Left */}
				<div className="top-0 left-0 z-2 absolute bg-linear-to-r from-card to-transparent w-12 h-full pointer-events-none" />

				{/* Fade Right */}
				<div className="top-0 right-0 z-2 absolute bg-linear-to-l from-card to-transparent w-12 h-full pointer-events-none" />

				{/* Marquee */}
				<div className="flex flex-1 overflow-hidden">
					<div className="flex items-center gap-8 min-w-max animate-marquee">
						{tickerData.map((item) => (
							<div
								key={`${item.symbol}-${item.price}`}
								className="flex items-center gap-2 shrink-0"
							>
								<span className="font-semibold text-[10px] text-foreground md:text-[11px] xl:text-xs">
									{item.symbol}
								</span>

								<span className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
									{item.price}
								</span>

								<span
									className={`font-bold text-[10px] md:text-[11px] xl:text-xs ${
										item.change.startsWith("+")
											? "text-green-500"
											: "text-destructive"
									}`}
								>
									{item.change}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
