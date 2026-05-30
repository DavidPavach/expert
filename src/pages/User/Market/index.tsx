import {
	Bitcoin,
	Candle,
	Global,
	SearchNormal1,
	TrendUp,
} from "iconsax-reactjs";
import { useState } from "react";

type MarketCategory =
	| "all"
	| "crypto"
	| "stocks"
	| "forex"
	| "commodities"
	| "bonds";

type Market = {
	id: string;
	name: string;
	symbol: string;
	category: Exclude<MarketCategory, "all">;
	price: number;
	change: number;
	changeAmount: number;
	volume: string;
};

const MARKETS: Market[] = [
	// ==========================
	// CRYPTO (12)
	// ==========================
	{
		id: "btc",
		name: "Bitcoin",
		symbol: "BTC/USD",
		category: "crypto",
		price: 118189,
		change: 0.02,
		changeAmount: 19.95,
		volume: "$40.0B",
	},
	{
		id: "eth",
		name: "Ethereum",
		symbol: "ETH/USD",
		category: "crypto",
		price: 3808.23,
		change: 0.46,
		changeAmount: 17.62,
		volume: "$32.5B",
	},
	{
		id: "xrp",
		name: "XRP",
		symbol: "XRP/USD",
		category: "crypto",
		price: 3.12,
		change: -1.19,
		changeAmount: -0.04,
		volume: "$6.5B",
	},
	{
		id: "sol",
		name: "Solana",
		symbol: "SOL/USD",
		category: "crypto",
		price: 181.54,
		change: -3.22,
		changeAmount: -6.05,
		volume: "$6.4B",
	},
	{
		id: "bnb",
		name: "BNB",
		symbol: "BNB/USD",
		category: "crypto",
		price: 812.22,
		change: 1.2,
		changeAmount: 9.63,
		volume: "$4.8B",
	},
	{
		id: "doge",
		name: "Dogecoin",
		symbol: "DOGE/USD",
		category: "crypto",
		price: 0.42,
		change: -0.89,
		changeAmount: -0.01,
		volume: "$2.1B",
	},
	{
		id: "ada",
		name: "Cardano",
		symbol: "ADA/USD",
		category: "crypto",
		price: 1.12,
		change: 2.54,
		changeAmount: 0.03,
		volume: "$1.9B",
	},
	{
		id: "trx",
		name: "TRON",
		symbol: "TRX/USD",
		category: "crypto",
		price: 0.34,
		change: 4.45,
		changeAmount: 0.01,
		volume: "$3.0B",
	},
	{
		id: "avax",
		name: "Avalanche",
		symbol: "AVAX/USD",
		category: "crypto",
		price: 45.72,
		change: 1.88,
		changeAmount: 0.84,
		volume: "$1.4B",
	},
	{
		id: "dot",
		name: "Polkadot",
		symbol: "DOT/USD",
		category: "crypto",
		price: 8.15,
		change: -1.1,
		changeAmount: -0.09,
		volume: "$900M",
	},
	{
		id: "link",
		name: "Chainlink",
		symbol: "LINK/USD",
		category: "crypto",
		price: 28.9,
		change: 3.5,
		changeAmount: 0.98,
		volume: "$1.2B",
	},
	{
		id: "sui",
		name: "Sui",
		symbol: "SUI/USD",
		category: "crypto",
		price: 3.83,
		change: -6.95,
		changeAmount: -0.29,
		volume: "$2.1B",
	},

	// ==========================
	// STOCKS (12)
	// ==========================
	{
		id: "apple",
		name: "Apple",
		symbol: "AAPL",
		category: "stocks",
		price: 211.31,
		change: 1.21,
		changeAmount: 2.52,
		volume: "$5.7B",
	},
	{
		id: "msft",
		name: "Microsoft",
		symbol: "MSFT",
		category: "stocks",
		price: 521.8,
		change: 0.91,
		changeAmount: 4.7,
		volume: "$4.4B",
	},
	{
		id: "nvda",
		name: "NVIDIA",
		symbol: "NVDA",
		category: "stocks",
		price: 187.25,
		change: 2.45,
		changeAmount: 4.48,
		volume: "$8.9B",
	},
	{
		id: "amzn",
		name: "Amazon",
		symbol: "AMZN",
		category: "stocks",
		price: 233.4,
		change: -0.63,
		changeAmount: -1.48,
		volume: "$3.1B",
	},
	{
		id: "meta",
		name: "Meta",
		symbol: "META",
		category: "stocks",
		price: 785.12,
		change: 1.44,
		changeAmount: 11.15,
		volume: "$2.6B",
	},
	{
		id: "tsla",
		name: "Tesla",
		symbol: "TSLA",
		category: "stocks",
		price: 324.17,
		change: -2.18,
		changeAmount: -7.22,
		volume: "$4.8B",
	},
	{
		id: "googl",
		name: "Alphabet",
		symbol: "GOOGL",
		category: "stocks",
		price: 201.73,
		change: 0.77,
		changeAmount: 1.54,
		volume: "$2.4B",
	},
	{
		id: "netflix",
		name: "Netflix",
		symbol: "NFLX",
		category: "stocks",
		price: 1038.2,
		change: 1.31,
		changeAmount: 13.42,
		volume: "$1.7B",
	},
	{
		id: "amd",
		name: "AMD",
		symbol: "AMD",
		category: "stocks",
		price: 194.62,
		change: 2.04,
		changeAmount: 3.89,
		volume: "$1.6B",
	},
	{
		id: "intel",
		name: "Intel",
		symbol: "INTC",
		category: "stocks",
		price: 38.9,
		change: -0.45,
		changeAmount: -0.17,
		volume: "$900M",
	},
	{
		id: "paypal",
		name: "PayPal",
		symbol: "PYPL",
		category: "stocks",
		price: 81.54,
		change: 0.83,
		changeAmount: 0.67,
		volume: "$780M",
	},
	{
		id: "uber",
		name: "Uber",
		symbol: "UBER",
		category: "stocks",
		price: 96.82,
		change: 1.94,
		changeAmount: 1.84,
		volume: "$1.1B",
	},

	// ==========================
	// FOREX (10)
	// ==========================
	{
		id: "eurusd",
		name: "EUR/USD",
		symbol: "EUR/USD",
		category: "forex",
		price: 1.17,
		change: 0.18,
		changeAmount: 0.01,
		volume: "$8.2B",
	},
	{
		id: "gbpusd",
		name: "GBP/USD",
		symbol: "GBP/USD",
		category: "forex",
		price: 1.34,
		change: 0.22,
		changeAmount: 0.01,
		volume: "$5.6B",
	},
	{
		id: "usdjpy",
		name: "USD/JPY",
		symbol: "USD/JPY",
		category: "forex",
		price: 148.23,
		change: -0.31,
		changeAmount: -0.46,
		volume: "$6.1B",
	},
	{
		id: "usdchf",
		name: "USD/CHF",
		symbol: "USD/CHF",
		category: "forex",
		price: 0.88,
		change: 0.08,
		changeAmount: 0.01,
		volume: "$2.8B",
	},
	{
		id: "audusd",
		name: "AUD/USD",
		symbol: "AUD/USD",
		category: "forex",
		price: 0.69,
		change: -0.11,
		changeAmount: -0.01,
		volume: "$3.4B",
	},
	{
		id: "nzdusd",
		name: "NZD/USD",
		symbol: "NZD/USD",
		category: "forex",
		price: 0.64,
		change: 0.17,
		changeAmount: 0.01,
		volume: "$1.9B",
	},
	{
		id: "usdcad",
		name: "USD/CAD",
		symbol: "USD/CAD",
		category: "forex",
		price: 1.36,
		change: -0.09,
		changeAmount: -0.01,
		volume: "$2.6B",
	},
	{
		id: "eurgbp",
		name: "EUR/GBP",
		symbol: "EUR/GBP",
		category: "forex",
		price: 0.87,
		change: 0.12,
		changeAmount: 0.01,
		volume: "$1.5B",
	},
	{
		id: "eurjpy",
		name: "EUR/JPY",
		symbol: "EUR/JPY",
		category: "forex",
		price: 173.51,
		change: 0.34,
		changeAmount: 0.58,
		volume: "$2.3B",
	},
	{
		id: "gbpjpy",
		name: "GBP/JPY",
		symbol: "GBP/JPY",
		category: "forex",
		price: 199.22,
		change: -0.27,
		changeAmount: -0.54,
		volume: "$1.8B",
	},

	// ==========================
	// COMMODITIES (10)
	// ==========================
	{
		id: "gold",
		name: "Gold",
		symbol: "XAU/USD",
		category: "commodities",
		price: 3385.4,
		change: 0.51,
		changeAmount: 17.1,
		volume: "$1.8B",
	},
	{
		id: "silver",
		name: "Silver",
		symbol: "XAG/USD",
		category: "commodities",
		price: 42.12,
		change: 0.84,
		changeAmount: 0.35,
		volume: "$650M",
	},
	{
		id: "oil",
		name: "Crude Oil",
		symbol: "WTI",
		category: "commodities",
		price: 82.7,
		change: -1.12,
		changeAmount: -0.94,
		volume: "$2.7B",
	},
	{
		id: "brent",
		name: "Brent Oil",
		symbol: "BRENT",
		category: "commodities",
		price: 86.15,
		change: -0.73,
		changeAmount: -0.64,
		volume: "$2.2B",
	},
	{
		id: "naturalgas",
		name: "Natural Gas",
		symbol: "NG",
		category: "commodities",
		price: 3.87,
		change: 2.18,
		changeAmount: 0.08,
		volume: "$900M",
	},
	{
		id: "copper",
		name: "Copper",
		symbol: "HG",
		category: "commodities",
		price: 5.21,
		change: 1.55,
		changeAmount: 0.08,
		volume: "$700M",
	},
	{
		id: "platinum",
		name: "Platinum",
		symbol: "XPT/USD",
		category: "commodities",
		price: 1385,
		change: 0.65,
		changeAmount: 9,
		volume: "$410M",
	},
	{
		id: "palladium",
		name: "Palladium",
		symbol: "XPD/USD",
		category: "commodities",
		price: 1210,
		change: -0.42,
		changeAmount: -5,
		volume: "$300M",
	},
	{
		id: "wheat",
		name: "Wheat",
		symbol: "ZW",
		category: "commodities",
		price: 672,
		change: 1.22,
		changeAmount: 8,
		volume: "$180M",
	},
	{
		id: "corn",
		name: "Corn",
		symbol: "ZC",
		category: "commodities",
		price: 481,
		change: -0.55,
		changeAmount: -3,
		volume: "$150M",
	},

	// ==========================
	// BONDS (10)
	// ==========================
	{
		id: "us10y",
		name: "US 10Y Treasury",
		symbol: "US10Y",
		category: "bonds",
		price: 4.31,
		change: 0.04,
		changeAmount: 0.01,
		volume: "$14.5B",
	},
	{
		id: "us30y",
		name: "US 30Y Treasury",
		symbol: "US30Y",
		category: "bonds",
		price: 4.58,
		change: -0.03,
		changeAmount: -0.01,
		volume: "$8.2B",
	},
	{
		id: "us5y",
		name: "US 5Y Treasury",
		symbol: "US5Y",
		category: "bonds",
		price: 4.05,
		change: 0.02,
		changeAmount: 0.01,
		volume: "$6.4B",
	},
	{
		id: "gilt10",
		name: "UK 10Y Gilt",
		symbol: "UK10Y",
		category: "bonds",
		price: 4.12,
		change: -0.05,
		changeAmount: -0.01,
		volume: "$3.2B",
	},
	{
		id: "bund10",
		name: "German 10Y Bund",
		symbol: "DE10Y",
		category: "bonds",
		price: 2.74,
		change: 0.08,
		changeAmount: 0.01,
		volume: "$2.1B",
	},
	{
		id: "jgb10",
		name: "Japan 10Y Bond",
		symbol: "JP10Y",
		category: "bonds",
		price: 1.22,
		change: 0.03,
		changeAmount: 0.01,
		volume: "$1.7B",
	},
	{
		id: "fr10y",
		name: "France 10Y Bond",
		symbol: "FR10Y",
		category: "bonds",
		price: 3.08,
		change: 0.06,
		changeAmount: 0.01,
		volume: "$1.2B",
	},
	{
		id: "it10y",
		name: "Italy 10Y Bond",
		symbol: "IT10Y",
		category: "bonds",
		price: 3.91,
		change: -0.04,
		changeAmount: -0.01,
		volume: "$1.5B",
	},
	{
		id: "ca10y",
		name: "Canada 10Y Bond",
		symbol: "CA10Y",
		category: "bonds",
		price: 3.45,
		change: 0.07,
		changeAmount: 0.01,
		volume: "$900M",
	},
	{
		id: "au10y",
		name: "Australia 10Y Bond",
		symbol: "AU10Y",
		category: "bonds",
		price: 4.24,
		change: -0.02,
		changeAmount: -0.01,
		volume: "$850M",
	},
];

const TABS = [
	{ id: "all", label: "All Markets", icon: Candle },
	{ id: "crypto", label: "Cryptocurrency", icon: Bitcoin },
	{ id: "stocks", label: "Stocks", icon: TrendUp },
	{ id: "forex", label: "Forex", icon: Global },
	{ id: "commodities", label: "Commodities", icon: Candle },
	{ id: "bonds", label: "Bonds", icon: Global },
] as const;

export default function TradingMarketsPage() {
	const [activeTab, setActiveTab] = useState<MarketCategory>("all");

	const [search, setSearch] = useState("");

	const filteredMarkets = MARKETS.filter((market) => {
		const matchesCategory =
			activeTab === "all" ? true : market.category === activeTab;

		const matchesSearch =
			market.name.toLowerCase().includes(search.toLowerCase()) ||
			market.symbol.toLowerCase().includes(search.toLowerCase());

		return matchesCategory && matchesSearch;
	});

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
				<div>
					<h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
						Trading Markets
					</h1>

					<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Choose from thousands of trading instruments across multiple asset
						classes
					</p>
				</div>

				<div className="flex items-center gap-6">
					<div className="relative">
						<SearchNormal1 className="top-1/2 left-3 absolute size-5 text-muted-foreground -translate-y-1/2" />

						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search instruments..."
							className="bg-card px-10 py-2 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/30 w-70"
						/>
					</div>

					<div className="hidden md:flex items-center gap-6">
						<div>
							<p className="font-bold">142</p>
							<p className="text-muted-foreground text-sm">Instruments</p>
						</div>

						<div className="bg-border w-px h-10" />

						<div>
							<p className="font-bold text-green-500">24/7</p>
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Trading
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Categories */}
			<div className="flex gap-2 bg-card p-2 border border-border rounded-2xl overflow-x-auto">
				{TABS.map((tab) => {
					const Icon = tab.icon;

					return (
						<button
							type="button"
							key={tab.id}
							onClick={() => setActiveTab(tab.id as MarketCategory)}
							className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
								activeTab === tab.id
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:bg-muted"
							}`}
						>
							<Icon className="size-4" />
							{tab.label}
						</button>
					);
				})}
			</div>

			{/* TradingView Widget */}
			<div className="bg-card border border-border rounded-2xl overflow-hidden">
				<iframe
					title="TradingView"
					src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=BINANCE%3ABTCUSDT&interval=D&theme=dark&style=1&locale=en"
					className="w-full h-105"
				/>
			</div>

			{/* Market Table */}
			<div className="bg-card border border-border rounded-2xl overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="bg-muted/20 border-border border-b">
								<th className="px-6 py-4 text-muted-foreground text-left uppercase">
									Asset
								</th>

								<th className="px-6 py-4 text-muted-foreground text-center uppercase">
									Price
								</th>

								<th className="px-6 py-4 text-muted-foreground text-center uppercase">
									24H Change
								</th>

								<th className="px-6 py-4 text-muted-foreground text-center uppercase">
									Volume
								</th>

								<th className="px-6 py-4 text-muted-foreground text-center uppercase">
									Action
								</th>
							</tr>
						</thead>

						<tbody>
							{filteredMarkets.map((market) => {
								const positive = market.change >= 0;

								return (
									<tr
										key={market.id}
										className="hover:bg-muted/10 border-border border-b transition-colors"
									>
										<td className="px-6 py-5">
											<div>
												<p className="font-semibold">{market.name}</p>

												<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
													{market.symbol}
												</p>
											</div>
										</td>

										<td className="px-6 py-5 font-semibold text-center">
											${market.price.toLocaleString()}
										</td>

										<td className="px-6 py-5 text-center">
											<div
												className={`font-semibold ${
													positive ? "text-green-500" : "text-red-500"
												}`}
											>
												{positive ? "+" : ""}
												{market.change}%
											</div>

											<div
												className={`text-[11px] md:text-xs xl:text-sm ${
													positive ? "text-green-500" : "text-red-500"
												}`}
											>
												{positive ? "+" : ""}${Math.abs(market.changeAmount)}
											</div>
										</td>

										<td className="px-6 py-5 text-muted-foreground text-center">
											{market.volume}
										</td>

										<td className="px-6 py-5 text-center">
											<button
												type="button"
												className="bg-primary hover:opacity-90 px-5 py-2 rounded-xl font-semibold text-primary-foreground transition-all cursor-pointer"
											>
												Trade
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					{filteredMarkets.length === 0 && (
						<div className="py-16 text-muted-foreground text-center">
							No markets found
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
