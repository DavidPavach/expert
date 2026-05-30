import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Global, Profile2User, ShieldSecurity } from "iconsax-reactjs";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
	{
		icon: Profile2User,
		value: "2.4M+",
		label: "Active Traders",
		color: "text-primary",
	},
	{
		icon: Global,
		value: "190+",
		label: "Countries Served",
		color: "text-blue-400",
	},
	{
		icon: Award,
		value: "$18B+",
		label: "Monthly Volume",
		color: "text-emerald-400",
	},
	{
		icon: ShieldSecurity,
		value: "99.99%",
		label: "Platform Uptime",
		color: "text-amber-400",
	},
];

const milestones = [
	{
		year: "2018",
		title: "Founded",
		desc: "Expertmirrorcon is founded by a team of ex-Goldman Sachs and Citadel engineers with a single mission: democratize institutional-grade trading.",
	},
	{
		year: "2019",
		title: "$12M Seed Round",
		desc: "Led by top-tier fintech VCs. Platform enters private beta with 500 handpicked traders providing feedback.",
	},
	{
		year: "2020",
		title: "Regulatory Approval",
		desc: "Received FCA and SEC compliance certifications. First 10,000 users onboarded across 30 countries.",
	},
	{
		year: "2021",
		title: "$85M Series A",
		desc: "Expanded to 50 countries, launched iOS and Android apps, and crossed 500,000 registered users.",
	},
	{
		year: "2022",
		title: "AI Engine Launch",
		desc: "Proprietary AI signal engine deployed — trained on decades of market data to deliver real-time trade signals.",
	},
	{
		year: "2024",
		title: "Institutional Platform",
		desc: "$2B+ monthly trading volume. Institutional API and white-label solutions launched globally.",
	},
];

const principles = [
	{
		title: "Our Mission",
		body: "To give every trader — from individual retail to large institutional — access to the same quality of tools, data, and execution that was once reserved for Wall Street insiders.",
		color: "border-primary/30",
		accent: "text-primary",
	},
	{
		title: "Our Vision",
		body: "A world where financial markets are genuinely accessible, transparent, and fair. Where geography, capital size, or institutional affiliation no longer determine the quality of your trading experience.",
		color: "border-blue-500/30",
		accent: "text-blue-400",
	},
	{
		title: "Our Promise",
		body: "We will never compromise on security, transparency, or performance. Every feature we build, every server we deploy, and every decision we make is guided by what is best for our traders.",
		color: "border-emerald-500/30",
		accent: "text-emerald-400",
	},
];

export default function AboutUs() {
	const navigate = useNavigate();
	return (
		<main>
			{/* Hero */}
			<section className="relative py-20 lg:py-32 overflow-hidden hero-gradient">
				<div
					className="absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage:
							"linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
						backgroundSize: "60px 60px",
					}}
				/>
				<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
					<div className="items-center gap-12 grid lg:grid-cols-2">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7 }}
						>
							<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-widest">
								About Us
							</span>
							<h1 className="mb-6 font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
								We're Rewriting the Rules of{" "}
								<span className="gradient-text">Financial Markets</span>
							</h1>
							<p className="mb-4 text-muted-foreground text-sm md:text-base xl:text-lg leading-relaxed">
								Expertmirrorcon was born from a simple belief: the tools used by
								top hedge funds and investment banks shouldn't be locked behind
								institutional walls.
							</p>
							<p className="mb-8 text-muted-foreground leading-relaxed">
								Founded in 2018 by veterans of Goldman Sachs, Citadel, and
								Google, we've spent six years engineering the most powerful,
								accessible, and secure trading platform ever built for the
								individual trader.
							</p>
							<Button className="gap-2 bg-primary hover:bg-primary/90 font-semibold text-primary-foreground">
								Join Our Community{" "}
								<ArrowRight className="size-4 md:size-4.5 xl:size-5" />
							</Button>
						</motion.div>

						{/* Stats */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7, delay: 0.15 }}
							className="gap-4 grid grid-cols-2"
						>
							{stats.map((s) => (
								<div
									key={s.label}
									className="p-4 md:p-5 xl:p-6 rounded-2xl text-center glass-card-strong"
								>
									<s.icon
										className={`size-5 md:size-5.5 xl:size-6 ${s.color} mx-auto mb-3`}
									/>
									<p
										className={`font-heading font-bold text-xl md:text-2xl xl:text-3xl ${s.color} mb-1`}
									>
										{s.value}
									</p>
									<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
										{s.label}
									</p>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			{/* Mission / Vision / Promise */}
			<section className="py-16 lg:py-24">
				<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-12 text-center"
					>
						<h2 className="font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
							What Drives Us
						</h2>
					</motion.div>
					<div className="gap-5 grid md:grid-cols-3">
						{principles.map((p, i) => (
							<motion.div
								key={p.title}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className={`glass-card rounded-2xl p-4 md:p6 xl:p-6 border-l-4 ${p.color}`}
							>
								<h3
									className={`font-heading font-bold text-base md:text-lg xl:text-xl mb-3 ${p.accent}`}
								>
									{p.title}
								</h3>
								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
									{p.body}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Story */}
			<section className="py-16 lg:py-24 section-glow">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
					<div className="items-center gap-12 lg:gap-20 grid lg:grid-cols-2">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<h2 className="mb-6 font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
								The Story Behind the Platform
							</h2>
							<div className="space-y-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
								<p>
									In 2017, our founders — sitting in the trading floors of
									Goldman Sachs and Citadel — noticed something that bothered
									them: the best technology, the fastest data feeds, the most
									sophisticated risk systems were all locked away from ordinary
									traders.
								</p>
								<p>
									Retail traders were paying 10x more for inferior tools,
									dealing with unreliable platforms, and navigating opaque fee
									structures. The system was rigged — not through malice, but
									through inertia.
								</p>
								<p>
									So in 2018, they left. They built Expertmirrorcon from
									scratch, with a single focus: create the platform that they
									themselves would want to use if they were starting out as
									independent traders today.
								</p>
								<p>
									Six years later, over 2.4 million traders in 190 countries
									trust Expertmirrorcon with over $18 billion in monthly trading
									volume. The mission hasn't changed. It never will.
								</p>
							</div>
						</motion.div>

						{/* Timeline */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
						>
							<div className="relative">
								<div className="top-0 bottom-0 left-6 absolute bg-border/40 w-px" />
								<div className="space-y-6">
									{milestones.map((m, i) => (
										<motion.div
											key={m.year}
											initial={{ opacity: 0, x: 20 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ delay: i * 0.07 }}
											className="relative flex gap-5 pl-14"
										>
											<div className="top-1 left-0 absolute flex justify-center items-center bg-primary/10 border border-primary/20 rounded-full size-10 md:size-11 xl:size-12 shrink-0">
												<span className="font-bold text-[9px] text-primary md:text-[10px] xl:text-[11px] text-center leading-tight">
													{m.year}
												</span>
											</div>
											<div className="flex-1 p-4 rounded-xl glass-card">
												<h4 className="mb-1 font-heading font-semibold text-[11px] text-primary md:text-xs xl:text-sm">
													{m.title}
												</h4>
												<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-relaxed">
													{m.desc}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 lg:py-24">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="relative p-10 lg:p-14 rounded-3xl overflow-hidden glass-card-strong"
					>
						<div className="top-0 left-1/2 absolute bg-primary/10 blur-[80px] rounded-full w-80 h-80 -translate-x-1/2 pointer-events-none" />
						<h2 className="relative mb-4 font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
							Be Part of the <span className="gradient-text">Movement</span>
						</h2>
						<p className="relative mb-8 text-muted-foreground">
							Join 2.4 million traders who have already made the switch to
							intelligent, transparent, institutional-grade trading.
						</p>
						<Button
							onClick={() =>
								navigate({ to: "/register", search: { ref: undefined } })
							}
							className="relative gap-2 bg-primary hover:bg-primary/90 px-10 h-12 font-semibold text-primary-foreground"
						>
							Create Free Account <ArrowRight className="size-4" />
						</Button>
					</motion.div>
				</div>
			</section>
		</main>
	);
}
