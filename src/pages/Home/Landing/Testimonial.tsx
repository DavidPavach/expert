import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
	{
		name: "Sarah Mitchell",
		role: "Portfolio Manager",
		company: "Apex Capital",
		quote:
			"The analytics suite is genuinely institutional quality. Switched from Bloomberg Terminal for most of my daily analysis — the interface is that good.",
		rating: 5,
		initials: "SM",
		gradient: "from-primary/30 to-blue-500/30",
	},
	{
		name: "David Chen",
		role: "Quantitative Trader",
		company: "Independent",
		quote:
			"Sub-10ms execution is real. I tested it extensively against my previous broker. The difference in slippage alone paid for the switch within a week.",
		rating: 5,
		initials: "DC",
		gradient: "from-emerald-500/30 to-cyan-500/30",
	},
	{
		name: "Elena Rodriguez",
		role: "Risk Analyst",
		company: "Meridian Group",
		quote:
			"The risk management tools are comprehensive without being overwhelming. Perfect balance of power and usability. Our team adopted it within days.",
		rating: 5,
		initials: "ER",
		gradient: "from-violet-500/30 to-rose-500/30",
	},
];

export default function Testimonials() {
	return (
		<section id="testimonials" className="relative py-24 lg:py-32">
			<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center"
				>
					<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-widest">
						Testimonials
					</span>
					<h2 className="mb-4 font-heading font-bold text-3xl md:text-4xl xl:text-5xl">
						Trusted by{" "}
						<span className="gradient-text">Professional Traders</span>
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						See why thousands of institutional and retail traders choose
						Expertmirrorcon.
					</p>
				</motion.div>

				<div className="gap-5 grid md:grid-cols-3">
					{testimonials.map((t, i) => (
						<motion.div
							key={t.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="group flex flex-col p-4 md:p-6 xl:p-8 hover:border-primary/20 rounded-2xl transition-all duration-500 glass-card"
						>
							{/* Stars */}
							<div className="flex gap-1 mb-4">
								{Array.from({ length: t.rating }).map((_, idx) => (
									<Star
										key={`testimonial_star_${
											// biome-ignore lint/suspicious/noArrayIndexKey: <>
											idx
										}`}
										className="fill-amber-400 w-4 h-4 text-amber-400"
									/>
								))}
							</div>

							{/* Quote */}
							<p className="flex-1 mb-6 text-muted-foreground leading-relaxed">
								"{t.quote}"
							</p>

							{/* Author */}
							<div className="flex items-center gap-3">
								<div
									className={`size-10 rounded-full bg-linear-to-br ${t.gradient} flex items-center justify-center`}
								>
									<span className="font-bold text-[11px] text-foreground md:text-xs xl:text-sm">
										{t.initials}
									</span>
								</div>
								<div>
									<p className="font-semibold text-foreground">{t.name}</p>
									<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
										{t.role}, {t.company}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
