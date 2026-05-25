import { motion } from "framer-motion";
import {
	Activity,
	Bitcoin,
	Chart2,
	Diamonds,
	DollarCircle,
} from "iconsax-reactjs";

const markets = [
	{
		icon: DollarCircle,
		name: "Forex",
		pairs: "80+ pairs",
		description: "Major, minor, and exotic currency pairs with tight spreads.",
		color: "text-blue-400",
		bg: "bg-blue-500/10",
	},
	{
		icon: Bitcoin,
		name: "Crypto",
		pairs: "200+ assets",
		description:
			"Bitcoin, Ethereum, and top altcoins with 24/7 trading access.",
		color: "text-amber-400",
		bg: "bg-amber-500/10",
	},
	{
		icon: Diamonds,
		name: "Commodities",
		pairs: "30+ assets",
		description: "Gold, silver, oil, and agricultural commodities.",
		color: "text-emerald-400",
		bg: "bg-emerald-500/10",
	},
	{
		icon: Activity,
		name: "Stocks",
		pairs: "5,000+ equities",
		description: "US, EU, and Asian equities with fractional shares.",
		color: "text-violet-400",
		bg: "bg-violet-500/10",
	},
	{
		icon: Chart2,
		name: "Indices",
		pairs: "25+ indices",
		description: "S&P 500, NASDAQ, DAX, FTSE, and more global indices.",
		color: "text-rose-400",
		bg: "bg-rose-500/10",
	},
];

export default function MarketCategories() {
	return (
		<section id="markets" className="relative py-24 lg:py-32">
			<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center"
				>
					<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-widest">
						Markets
					</span>
					<h2 className="mb-4 font-heading font-bold text-3xl md:text-4xl xl:text-5xl">
						Access <span className="gradient-text">Global Markets</span>
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						Trade across multiple asset classes from a single, unified platform.
					</p>
				</motion.div>

				<div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-5">
					{markets.map((market, i) => (
						<motion.div
							key={market.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.08 }}
							className="group px-4 py-6 hover:border-primary/20 rounded-2xl text-center transition-all duration-500 glass-card"
						>
							<div
								className={`size-10 md:size-12 xl:size-14 rounded-2xl ${market.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
							>
								<market.icon
									className={`size-5 md:size-6 xl:size-7 ${market.color}`}
								/>
							</div>
							<h3 className="mb-1 font-heading font-semibold text-base md:text-lg xl:text-xl">
								{market.name}
							</h3>
							<p
								className={`text-[11px] md:text-xs xl:text-sm font-medium ${market.color} mb-2`}
							>
								{market.pairs}
							</p>
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
								{market.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
