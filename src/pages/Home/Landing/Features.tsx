import { motion } from "framer-motion";
import {
	Chart,
	Flash,
	Layer,
	Mobile,
	ShieldTick,
	Wallet1,
} from "iconsax-reactjs";
import { Brain } from "lucide-react";

const features = [
	{
		icon: Chart,
		title: "Real-Time Analytics",
		description:
			"Live market data, advanced charting tools, and customizable technical indicators at your fingertips.",
		color: "text-primary",
		bg: "bg-primary/10",
	},
	{
		icon: Brain,
		title: "AI-Powered Insights",
		description:
			"Machine learning models analyze patterns and deliver actionable trading signals in real time.",
		color: "text-violet-400",
		bg: "bg-violet-500/10",
	},
	{
		icon: Layer,
		title: "Multi-Asset Trading",
		description:
			"Forex, crypto, stocks, commodities, and indices — all from a single unified interface.",
		color: "text-blue-400",
		bg: "bg-blue-500/10",
	},
	{
		icon: Flash,
		title: "Fast Execution",
		description:
			"Sub-10ms order execution with ultra-low latency infrastructure across global exchanges.",
		color: "text-amber-400",
		bg: "bg-amber-500/10",
	},
	{
		icon: ShieldTick,
		title: "Risk Management",
		description:
			"Automated stop-loss, portfolio hedging tools, and real-time risk assessment dashboards.",
		color: "text-emerald-400",
		bg: "bg-emerald-500/10",
	},
	{
		icon: Mobile,
		title: "Mobile Trading",
		description:
			"Full-featured trading on iOS and Android. Manage your portfolio from anywhere.",
		color: "text-rose-400",
		bg: "bg-rose-500/10",
	},
	{
		icon: Wallet1,
		title: "Secure Wallets",
		description:
			"Multi-signature cold storage with institutional custody for maximum asset protection.",
		color: "text-cyan-400",
		bg: "bg-cyan-500/10",
	},
];

export default function FeaturesSection() {
	return (
		<section id="features" className="relative py-24 lg:py-32">
			<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center"
				>
					<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-widest">
						Platform Features
					</span>
					<h2 className="mb-4 font-heading font-bold text-3xl md:text-4xl xl:text-5xl">
						Everything You Need to{" "}
						<span className="gradient-text">Trade with Confidence</span>
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						Professional-grade tools, AI analytics, and enterprise security —
						built for traders who demand the best.
					</p>
				</motion.div>

				{/* Feature Grid */}
				<div className="gap-4 lg:gap-5 grid sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, i) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.08 }}
							className={`glass-card rounded-2xl p-4 md:p-6 xl:p-8 group hover:border-primary/20 transition-all duration-500 cursor-default ${
								i === features.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
							}`}
						>
							<div
								className={`size-10 md:size-11 xl:size-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
							>
								<feature.icon
									className={`size-5 md:size-5.5 xl:size-6 ${feature.color}`}
								/>
							</div>
							<h3 className="mb-2 font-heading font-semibold text-foreground text-base md:text-lg xl:text-xl">
								{feature.title}
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
