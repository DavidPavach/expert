import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldTick } from "iconsax-reactjs";
import { BarChart3, Layers, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const highlights = [
	{
		icon: Zap,
		title: "Sub-10ms Execution",
		desc: "Co-located servers across 12 global data centers.",
		color: "text-amber-400",
		bg: "bg-amber-500/10",
	},
	{
		icon: BarChart3,
		title: "100+ Indicators",
		desc: "Full professional charting suite with drawing tools.",
		color: "text-primary",
		bg: "bg-primary/10",
	},
	{
		icon: ShieldTick,
		title: "Risk Controls",
		desc: "Automated stop-loss, margin alerts & hedging tools.",
		color: "text-emerald-400",
		bg: "bg-emerald-500/10",
	},
	{
		icon: Layers,
		title: "Multi-Asset",
		desc: "Forex, Crypto, Stocks, Commodities & Indices.",
		color: "text-blue-400",
		bg: "bg-blue-500/10",
	},
];

function TradingViewTicker() {
	const ref = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (!ref.current) return;
		ref.current.innerHTML = "";
		const script = document.createElement("script");
		script.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
		script.async = true;
		script.innerHTML = JSON.stringify({
			symbols: [
				{ proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
				{ proName: "FX_IDC:EURUSD", title: "EUR/USD" },
				{ proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
				{ proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
				{ proName: "FOREXCOM:GOLD", title: "Gold" },
				{ proName: "FX:USDJPY", title: "USD/JPY" },
			],
			showSymbolLogo: true,
			isTransparent: true,
			displayMode: "adaptive",
			colorTheme: "dark",
			locale: "en",
		});
		ref.current.appendChild(script);
	}, []);
	return (
		<div className="tradingview-widget-container" ref={ref}>
			<div className="tradingview-widget-container__widget" />
		</div>
	);
}

function TradingViewChart() {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!ref.current) return;

		ref.current.innerHTML = "";

		const script = document.createElement("script");

		script.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

		script.async = true;

		script.innerHTML = JSON.stringify({
			width: "100%",
			height: 800,
			symbol: "BITSTAMP:BTCUSD",
			interval: "D",
			timezone: "Etc/UTC",
			theme: "dark",
			style: "1",
			locale: "en",
			allow_symbol_change: true,
			calendar: false,
		});

		ref.current.appendChild(script);
	}, []);

	return (
		<div
			ref={ref}
			className="w-full tradingview-widget-container"
			style={{ height: 800 }}
		>
			<div
				className="tradingview-widget-container__widget"
				style={{ height: "100%" }}
			/>
		</div>
	);
}

function TradingViewScreener() {
	const ref = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (!ref.current) return;
		ref.current.innerHTML = "";
		const script = document.createElement("script");
		script.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
		script.async = true;
		script.innerHTML = JSON.stringify({
			width: "100%",
			height: 480,
			defaultColumn: "overview",
			defaultScreen: "crypto_mkt",
			market: "crypto",
			showToolbar: true,
			colorTheme: "dark",
			locale: "en",
			isTransparent: true,
		});
		ref.current.appendChild(script);
	}, []);
	return (
		<div
			className="w-full tradingview-widget-container"
			ref={ref}
			style={{ height: 480 }}
		>
			<div className="tradingview-widget-container__widget" />
		</div>
	);
}

export default function Trading() {
	const navigate = useNavigate();

	return (
		<main>
			{/* Hero */}
			<section className="relative py-20 lg:py-28 hero-gradient">
				<div
					className="absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage:
							"linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
						backgroundSize: "60px 60px",
					}}
				/>
				<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-widest">
							Trading
						</span>
						<h1 className="mb-6 font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
							Trade Smarter.
							<br />
							<span className="gradient-text">Execute Faster.</span>
						</h1>
						<p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg">
							Access live markets, professional charting, and AI-powered signals
							— all from one unified platform built for serious traders.
						</p>
						<div className="flex sm:flex-row flex-col justify-center gap-4">
							<Button
								onClick={() =>
									navigate({ to: "/register", search: { ref: undefined } })
								}
								className="bg-primary hover:bg-primary/90 px-8 h-12 font-semibold text-primary-foreground"
							>
								Start Trading Now
							</Button>
							<Button
								onClick={() =>
									navigate({ to: "/register", search: { ref: undefined } })
								}
								variant="outline"
								className="px-8 border-border/60 h-12"
							>
								Open Demo Account
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			<div className="bg-card/50 border-border/40 border-b">
				<TradingViewTicker />
			</div>

			{/* Highlights */}
			<section className="py-10">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
					<div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-4">
						{highlights.map((h, i) => (
							<motion.div
								key={h.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.08 }}
								className="flex items-start gap-4 p-5 rounded-2xl glass-card"
							>
								<div
									className={`size-8 md:size-9 xl:size-10 rounded-lg ${h.bg} flex items-center justify-center shrink-0`}
								>
									<h.icon
										className={`size-4 md:size-4.5 xl:size-5 ${h.color}`}
									/>
								</div>
								<div>
									<h3 className="mb-1 font-semibold text-[11px] md:text-xs xl:text-sm">
										{h.title}
									</h3>
									<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
										{h.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Live Chart */}
			<section className="py-12 lg:py-16">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-6"
					>
						<h2 className="font-heading font-bold text-2xl sm:text-3xl">
							Live Market Chart
						</h2>
						<p className="mt-1 text-muted-foreground text-sm">
							Interactive charting powered by TradingView
						</p>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="rounded-2xl overflow-hidden glass-card-strong"
					>
						<TradingViewChart />
					</motion.div>
				</div>
			</section>

			{/* Screener */}
			<section className="py-12 lg:py-16">
				<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-6"
					>
						<h2 className="font-heading font-bold text-xl md:text-2xl xl:text-3xl">
							Market Screener
						</h2>
						<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Filter and find opportunities across all asset classes
						</p>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="rounded-2xl overflow-hidden glass-card-strong"
					>
						<TradingViewScreener />
					</motion.div>
				</div>
			</section>
		</main>
	);
}
