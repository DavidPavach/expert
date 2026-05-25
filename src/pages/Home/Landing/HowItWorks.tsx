import { motion } from "framer-motion";
import { ShieldTick, TrendUp, UserCirlceAdd, Wallet1 } from "iconsax-reactjs";

const steps = [
	{
		icon: UserCirlceAdd,
		step: "01",
		title: "Create Account",
		description:
			"Sign up in under 2 minutes with just your email. No paperwork, no friction.",
		color: "text-primary",
		bg: "bg-primary/10",
		border: "border-primary/20",
	},
	{
		icon: ShieldTick,
		step: "02",
		title: "Verify Identity",
		description:
			"Quick KYC verification with AI-powered document scanning. Usually approved in minutes.",
		color: "text-blue-400",
		bg: "bg-blue-500/10",
		border: "border-blue-500/20",
	},
	{
		icon: Wallet1,
		step: "03",
		title: "Fund Wallet",
		description:
			"Deposit via bank transfer, card, or crypto. Multiple currencies supported.",
		color: "text-emerald-400",
		bg: "bg-emerald-500/10",
		border: "border-emerald-500/20",
	},
	{
		icon: TrendUp,
		step: "04",
		title: "Start Trading",
		description:
			"Access global markets instantly. Execute trades with institutional-grade tools.",
		color: "text-amber-400",
		bg: "bg-amber-500/10",
		border: "border-amber-500/20",
	},
];

export default function HowItWorks() {
	return (
		<section id="how-it-works" className="relative py-24 lg:py-32 section-glow">
			<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center"
				>
					<span className="block mb-4 font-semibold text-primary text-xs uppercase tracking-widest">
						Getting Started
					</span>
					<h2 className="mb-4 font-heading font-bold text-3xl sm:text-4xl lg:text-5xl">
						Start Trading in{" "}
						<span className="gradient-text">4 Simple Steps</span>
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						From sign-up to your first trade in minutes — not days.
					</p>
				</motion.div>

				<div className="relative gap-5 grid sm:grid-cols-2 lg:grid-cols-4">
					{/* Connecting line - desktop only */}
					<div className="hidden lg:block top-16 right-[12.5%] left-[12.5%] absolute bg-linear-to-r from-primary/30 via-emerald-400/30 to-amber-400/30 h-px" />

					{steps.map((step, i) => (
						<motion.div
							key={step.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.12 }}
							className="relative"
						>
							<div
								className={`glass-card rounded-2xl p-6 lg:p-8 border ${step.border} hover:border-primary/30 transition-all duration-500 group`}
							>
								{/* Step number */}
								<div
									className={`size-10 md:size-11 xl:size-12 rounded-2xl ${step.bg} flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300`}
								>
									<step.icon
										className={`size-5 md:size-5.5 xl:size-6 ${step.color}`}
									/>
								</div>
								<span
									className={`text-[10px] md:text-[11px] xl:text-xs font-bold ${step.color} font-heading mb-2 block`}
								>
									STEP {step.step}
								</span>
								<h3 className="mb-2 font-heading font-semibold text-sm md:text-base xl:text-lg">
									{step.title}
								</h3>
								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
									{step.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
