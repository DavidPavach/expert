import { motion } from "framer-motion";
import {
	Activity,
	Clock,
	Global,
	Lock,
	Profile2User,
	Shield,
} from "iconsax-reactjs";

const stats = [
	{
		icon: Profile2User,
		value: "2.4M+",
		label: "Active Traders",
		color: "text-primary",
	},
	{
		icon: Activity,
		value: "$18B+",
		label: "Monthly Volume",
		color: "text-emerald-400",
	},
	{ icon: Global, value: "190+", label: "Countries", color: "text-blue-400" },
	{
		icon: Clock,
		value: "99.99%",
		label: "Platform Uptime",
		color: "text-amber-400",
	},
];

const badges = [
	{ icon: Shield, label: "Bank-Grade Security" },
	{ icon: Lock, label: "256-bit Encryption" },
	{ icon: Global, label: "Global Compliance" },
];

export default function TrustSection() {
	return (
		<section className="relative py-20 lg:py-28 section-glow">
			<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
				{/* Security badges */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="flex flex-wrap justify-center items-center gap-4 mb-16"
				>
					{badges.map((badge) => (
						<div
							key={badge.label}
							className="flex items-center gap-2 px-4 py-2 rounded-full glass-card"
						>
							<badge.icon className="size-4 text-primary" />
							<span className="font-medium text-muted-foreground text-xs">
								{badge.label}
							</span>
						</div>
					))}
				</motion.div>

				{/* Stats Grid */}
				<div className="gap-4 lg:gap-6 grid grid-cols-2 lg:grid-cols-4">
					{stats.map((stat, i) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="group p-4 md:p-6 xl:p-8 hover:border-primary/20 rounded-2xl text-center transition-all duration-500 glass-card-strong"
						>
							<div className="flex justify-center items-center bg-muted/50 group-hover:bg-primary/10 mx-auto mb-4 rounded-xl size-12 transition-colors">
								<stat.icon className={`size-5 ${stat.color}`} />
							</div>
							<p
								className={`text-xl md:text-2xl xl:text-3xl font-bold font-heading ${stat.color} mb-1`}
							>
								{stat.value}
							</p>
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								{stat.label}
							</p>
						</motion.div>
					))}
				</div>

				{/* Trust text */}
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mx-auto mt-12 max-w-xl text-[11px] text-muted-foreground md:text-xs xl:text-sm text-center"
				>
					Regulated and audited. Your assets are protected by
					institutional-grade custody and multi-layer security infrastructure.
				</motion.p>
			</div>
		</section>
	);
}
