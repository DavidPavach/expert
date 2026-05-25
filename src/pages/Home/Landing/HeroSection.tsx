import { motion } from "framer-motion";
import { Flash, Graph, HomeTrendUp, ShieldSecurity } from "iconsax-reactjs";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingCards = [
	{
		icon: HomeTrendUp,
		label: "Portfolio",
		value: "+24.8%",
		sub: "This month",
		color: "text-emerald-400",
		position: "-top-20 -left-20",
		delay: 0.8,
	},
	{
		icon: Graph,
		label: "Volume",
		value: "$2.4B",
		sub: "24h traded",
		color: "text-primary",
		position: "-top-20 -right-20",
		delay: 1.0,
	},
	{
		icon: ShieldSecurity,
		label: "Secured",
		value: "256-bit",
		sub: "Encryption",
		color: "text-blue-400",
		position: "-bottom-20 -left-20",
		delay: 1.2,
	},
	{
		icon: Flash,
		label: "Execution",
		value: "<10ms",
		sub: "Avg. latency",
		color: "text-amber-400",
		position: "-bottom-20 -right-20",
		delay: 1.4,
	},
];

export default function HeroSection() {
	return (
		<section className="relative flex justify-center items-center pt-20 min-h-[80vh] md:min-h-[85vh] xl:min-h-[90vh] overflow-hidden hero-gradient">
			{/* Grid pattern */}
			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			{/* Glowing orbs */}
			<div className="top-1/4 left-1/4 absolute bg-primary/10 blur-[120px] rounded-full w-96 h-96 pointer-events-none" />
			<div className="right-1/4 bottom-1/4 absolute bg-accent/8 blur-[100px] rounded-full w-80 h-80 pointer-events-none" />

			<div className="z-5 relative mx-auto px-4 md:px-6 xl:px-8 max-w-7xl text-center">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full glass-card"
				>
					<div className="bg-primary rounded-full size-2 animate-pulse" />
					<span className="font-medium text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						Markets Open — Live Trading Active
					</span>
				</motion.div>

				{/* Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.3 }}
					className="mb-6 font-heading font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight"
				>
					Trade Smarter. <br className="hidden sm:block" />
					<span className="gradient-text">Grow Faster.</span>
				</motion.h1>

				{/* Subheadline */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mx-auto mb-10 max-w-xl text-muted-foreground text-sm md:text-base xl:text-lg leading-relaxed"
				>
					Institutional-grade analytics, AI-powered insights, and lightning-fast
					execution — all in one secure platform built for serious traders.
				</motion.p>

				{/* CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.7 }}
					className="flex sm:flex-row flex-col justify-center items-center gap-4"
				>
					<Button
						size="lg"
						className="group gap-2 bg-primary hover:bg-primary/90 px-8 h-12 font-semibold text-primary-foreground"
					>
						Start Trading
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="hover:bg-muted/50 px-8 border-border/60 h-12 font-medium text-foreground"
					>
						Explore Platform
					</Button>
				</motion.div>

				{/* Floating cards - desktop only */}
				<div className="hidden lg:block">
					{floatingCards.map((card, i) => (
						<motion.div
							key={card.label}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: card.delay }}
							className={`absolute ${card.position} animate-float`}
							style={{ animationDelay: `${i * 1.5}s` }}
						>
							<div className="p-4 rounded-xl min-w-40 glass-card-strong">
								<div className="flex items-center gap-2 mb-2">
									<card.icon className={`size-4 ${card.color}`} />
									<span className="font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">
										{card.label}
									</span>
								</div>
								<p
									className={`text-base md:text-lg xl:text-xl font-bold font-heading ${card.color}`}
								>
									{card.value}
								</p>
								<p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
									{card.sub}
								</p>
							</div>
						</motion.div>
					))}
				</div>

				{/* Mobile floating cards */}
				<div className="lg:hidden gap-3 grid grid-cols-2 mx-auto mt-12 max-w-sm">
					{floatingCards.map((card, i) => (
						<motion.div
							key={card.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
						>
							<div className="p-3 rounded-xl glass-card-strong">
								<div className="flex items-center gap-1.5 mb-1">
									<card.icon className={`size-4 ${card.color}`} />
									<span className="text-[11px] text-muted-foreground">
										{card.label}
									</span>
								</div>
								<p
									className={`text-left text-sm font-bold font-heading ${card.color}`}
								>
									{card.value}
								</p>
								<p className="font-heading font-light text-xs text-left">
									{card.sub}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Bottom fade */}
			<div className="right-0 bottom-0 left-0 absolute bg-linear-to-t from-background to-transparent h-32" />
		</section>
	);
}
