import { motion } from "framer-motion";
import { Chart, Eye, TrendDown, TrendUp } from "iconsax-reactjs";

const chartData = [
	{ t: "Jan", v: 4200 },
	{ t: "Feb", v: 4800 },
	{ t: "Mar", v: 4400 },
	{ t: "Apr", v: 5200 },
	{ t: "May", v: 5800 },
	{ t: "Jun", v: 5400 },
	{ t: "Jul", v: 6200 },
	{ t: "Aug", v: 7100 },
	{ t: "Sep", v: 6800 },
	{ t: "Oct", v: 7600 },
	{ t: "Nov", v: 8200 },
	{ t: "Dec", v: 9100 },
];

const watchlist = [
	{ symbol: "BTC/USD", price: "67,432.18", change: "+3.42%", up: true },
	{ symbol: "ETH/USD", price: "3,891.55", change: "+1.87%", up: true },
	{ symbol: "EUR/USD", price: "1.0842", change: "-0.12%", up: false },
	{ symbol: "AAPL", price: "189.72", change: "+0.95%", up: true },
	{ symbol: "GOLD", price: "2,341.80", change: "+0.63%", up: true },
];

const pnlCards = [
	{ label: "Total Balance", value: "$124,892.34", change: "+12.4%", up: true },
	{ label: "Today's P&L", value: "+$2,341.56", change: "+1.9%", up: true },
	{ label: "Open Positions", value: "12", change: "3 profitable", up: true },
];

// --- Custom Chart Logic ---
// We calculate the min/max to properly scale the SVG chart dynamically.
const maxVal = Math.max(...chartData.map((d) => d.v));
// Padding the bottom slightly so the chart doesn't touch the very bottom
const minVal = Math.min(...chartData.map((d) => d.v)) * 0.8;
const range = maxVal - minVal;

const svgWidth = 1000;
const svgHeight = 200;

// Map data to X and Y coordinates
const points = chartData.map((d, i) => ({
	x: (i / (chartData.length - 1)) * svgWidth,
	y: svgHeight - ((d.v - minVal) / range) * svgHeight,
}));

// Generate a smooth curve (equivalent to type="monotone" in Recharts)
let linePath = `M ${points[0].x},${points[0].y}`;
for (let i = 0; i < points.length - 1; i++) {
	const current = points[i];
	const next = points[i + 1];
	const midX = (current.x + next.x) / 2;
	linePath += ` C ${midX},${current.y} ${midX},${next.y} ${next.x},${next.y}`;
}

// Close the path for the filled area under the curve
const areaPath = `${linePath} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

export default function DashboardShowcase() {
	return (
		<section id="dashboard" className="relative py-24 lg:py-32 section-glow">
			<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center"
				>
					<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-widest">
						Trading Dashboard
					</span>
					<h2 className="mb-4 font-heading font-bold text-3xl md:text-4xl xl:text-5xl">
						Institutional-Grade{" "}
						<span className="gradient-text">Trading Interface</span>
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						A powerful, intuitive dashboard designed for precision and speed.
					</p>
				</motion.div>

				{/* Dashboard Mock */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
					className="p-4 md:p-6 xl:p-8 rounded-2xl lg:rounded-3xl overflow-hidden glass-card-strong"
				>
					{/* Top bar */}
					<div className="flex justify-between items-center mb-5">
						<div className="flex items-center gap-3">
							<div className="bg-red-500/60 rounded-full size-3" />
							<div className="bg-yellow-500/60 rounded-full size-3" />
							<div className="bg-green-500/60 rounded-full size-3" />
						</div>
						<div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
							<Eye className="size-3.5 text-muted-foreground" />
							<span className="font-medium text-muted-foreground text-xs">
								Live Preview
							</span>
						</div>
					</div>

					{/* P&L Cards */}
					<div className="gap-3 grid grid-cols-1 sm:grid-cols-3 mb-5">
						{pnlCards.map((card) => (
							<div key={card.label} className="bg-muted/40 p-4 rounded-xl">
								<p className="mb-1 text-muted-foreground text-xs">
									{card.label}
								</p>
								<p className="font-heading font-bold text-foreground text-lg lg:text-xl">
									{card.value}
								</p>
								<div className="flex items-center gap-1 mt-1">
									{card.up ? (
										<TrendUp className="size-3 text-emerald-400" />
									) : (
										<TrendDown className="size-3 text-red-400" />
									)}
									<span
										className={`text-xs font-medium ${card.up ? "text-emerald-400" : "text-red-400"}`}
									>
										{card.change}
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="gap-5 grid lg:grid-cols-3">
						{/* Chart */}
						<div className="flex flex-col lg:col-span-2 bg-muted/30 p-4 rounded-xl">
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center gap-2">
									<Chart className="size-4 text-primary" />
									<span className="font-semibold">Portfolio Performance</span>
								</div>
								<div className="flex gap-1">
									{["1D", "1W", "1M", "1Y"].map((t) => (
										<button
											type="button"
											key={t}
											className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors ${
												t === "1Y"
													? "bg-primary/20 text-primary"
													: "text-muted-foreground hover:text-foreground"
											}`}
										>
											{t}
										</button>
									))}
								</div>
							</div>

							{/* Custom SVG Replaces Recharts */}
							<div className="flex flex-col flex-1 w-full min-h-40 lg:min-h-50">
								<div className="relative flex-1 w-full">
									<svg
										viewBox={`0 0 ${svgWidth} ${svgHeight}`}
										className="absolute inset-0 w-full h-full"
										preserveAspectRatio="none"
									>
										<title>block</title>
										<defs>
											<linearGradient
												id="customChartGrad"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="0%"
													stopColor="hsl(174, 62%, 55%)"
													stopOpacity={0.3}
												/>
												<stop
													offset="100%"
													stopColor="hsl(174, 62%, 55%)"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>

										{/* Filled Area */}
										<path d={areaPath} fill="url(#customChartGrad)" />

										{/* Stroke Line */}
										<path
											d={linePath}
											fill="none"
											stroke="hsl(174, 62%, 55%)"
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>

								{/* Custom X-Axis */}
								<div className="flex justify-between items-center mt-3 px-1">
									{chartData.map((d) => (
										<span
											key={d.t}
											className="font-medium text-[10px] text-[hsl(220,10%,55%)]"
										>
											{d.t}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* Watchlist */}
						<div className="bg-muted/30 p-4 rounded-xl">
							<h4 className="mb-4 font-semibold text-[11px] md:text-xs xl:text-sm">
								Watchlist
							</h4>
							<div className="space-y-3">
								{watchlist.map((item) => (
									<div
										key={item.symbol}
										className="flex justify-between items-center py-1.5"
									>
										<div>
											<p className="font-medium text-[11px] text-foreground md:text-xs xl:text-sm">
												{item.symbol}
											</p>
											<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
												{item.price}
											</p>
										</div>
										<span
											className={`text-[10px] md:text-[11px] xl:text-xs font-semibold ${item.up ? "text-emerald-400" : "text-red-400"}`}
										>
											{item.change}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
