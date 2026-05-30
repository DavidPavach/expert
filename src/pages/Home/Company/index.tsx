import { motion } from "framer-motion";
import { Award, Global, Profile2User, Shield } from "iconsax-reactjs";
import { ArrowRight, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
	{
		icon: Shield,
		title: "Integrity First",
		desc: "We operate with full transparency. No hidden fees, no conflicts of interest, no compromises on security.",
		color: "text-primary",
		bg: "bg-primary/10",
	},
	{
		icon: Target,
		title: "Performance Obsessed",
		desc: "Every millisecond matters. We invest relentlessly in infrastructure to deliver the fastest, most reliable execution.",
		color: "text-amber-400",
		bg: "bg-amber-500/10",
	},
	{
		icon: Lightbulb,
		title: "Innovation Driven",
		desc: "Our AI and quant teams push the frontier of financial technology to give our traders every possible edge.",
		color: "text-violet-400",
		bg: "bg-violet-500/10",
	},
	{
		icon: Global,
		title: "Globally Minded",
		desc: "We serve traders in 190+ countries. Our infrastructure spans 12 global data centers for unmatched reach.",
		color: "text-blue-400",
		bg: "bg-blue-500/10",
	},
];

const team = [
	{
		name: "Alexander Mercer",
		role: "Chief Executive Officer",
		bg: "from-primary/30 to-blue-500/30",
		initials: "AM",
	},
	{
		name: "Priya Nair",
		role: "Chief Technology Officer",
		bg: "from-violet-500/30 to-rose-500/30",
		initials: "PN",
	},
	{
		name: "Sofia Laurent",
		role: "Chief Risk Officer",
		bg: "from-amber-500/30 to-orange-500/30",
		initials: "SL",
	},
	{
		name: "Marcus Chen",
		role: "Head of AI Research",
		bg: "from-rose-500/30 to-violet-500/30",
		initials: "MC",
	},
	{
		name: "Elena Vasquez",
		role: "Chief Compliance Officer",
		bg: "from-cyan-500/30 to-primary/30",
		initials: "EV",
	},
];

const milestones = [
	{
		year: "2018",
		title: "Founded",
		desc: "Expertmirrorcon is founded by a team of ex-Goldman Sachs and Citadel engineers.",
	},
	{
		year: "2019",
		title: "Seed Funding",
		desc: "$12M seed round led by top-tier fintech VCs. Platform enters private beta.",
	},
	{
		year: "2020",
		title: "Regulatory Approval",
		desc: "Received FCA and SEC compliance certifications. First 10,000 users onboarded.",
	},
	{
		year: "2021",
		title: "Series A",
		desc: "$85M Series A. Expanded to 50 countries, launched mobile apps.",
	},
	{
		year: "2022",
		title: "AI Engine Launch",
		desc: "Proprietary AI signal engine deployed. 500K active traders milestone.",
	},
	{
		year: "2024",
		title: "Institutional Launch",
		desc: "$2B+ monthly volume. Institutional platform and API launched globally.",
	},
];

export default function Company() {
	return (
		<main>
			{/* Hero */}
			<section className="relative py-20 lg:py-28 hero-gradient">
				<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
					<div className="items-center gap-12 grid lg:grid-cols-2">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							<span className="block mb-4 font-semibold text-[11px] text-primary md:text-xs xl:text-sm uppercase tracking-widest">
								Our Story
							</span>
							<h1 className="mb-6 font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
								Building the Future of{" "}
								<span className="gradient-text">Finance</span>
							</h1>
							<p className="mb-4 text-muted-foreground text-sm md:text-base xl:text-lg leading-relaxed">
								Expertmirrorcon was born from a simple belief: every trader —
								from independent retail to large institutional — deserves access
								to the same quality of tools, data, and execution.
							</p>
							<p className="mb-8 text-muted-foreground leading-relaxed">
								Founded by veterans from Goldman Sachs, Citadel, and Google,
								we've spent 6 years engineering a platform that democratizes
								institutional-grade trading for everyone.
							</p>
							<Button className="gap-2 bg-primary hover:bg-primary/90 font-semibold text-primary-foreground">
								Join Our Team{" "}
								<ArrowRight className="size-4 md:size-4.5 xl:size-5" />
							</Button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="gap-4 grid grid-cols-2"
						>
							{[
								{
									icon: Profile2User,
									value: "2.4M+",
									label: "Active Traders",
									color: "text-primary",
								},
								{
									icon: Global,
									value: "190+",
									label: "Countries",
									color: "text-blue-400",
								},
								{
									icon: Award,
									value: "$18B+",
									label: "Monthly Volume",
									color: "text-emerald-400",
								},
								{
									icon: Shield,
									value: "99.99%",
									label: "Uptime SLA",
									color: "text-amber-400",
								},
							].map((s) => (
								<div
									key={s.label}
									className="p-4 md:p-5 xl:p-6 rounded-2xl text-center glass-card-strong"
								>
									<s.icon
										className={`size-5 md:size-5.5 xl:size-6 ${s.color} mx-auto mb-3`}
									/>
									<p
										className={`font-heading font-bold text-lg md:text-xl xl:text-2xl ${s.color} mb-1`}
									>
										{s.value}
									</p>
									<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
										{s.label}
									</p>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="py-16 lg:py-24">
				<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-12 text-center"
					>
						<h2 className="mb-3 font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
							Our Core Values
						</h2>
						<p className="mx-auto max-w-xl text-muted-foreground">
							The principles that guide every decision we make.
						</p>
					</motion.div>
					<div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-4">
						{values.map((v, i) => (
							<motion.div
								key={v.title}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="group p-4 md:p-5 xl:p-6 hover:border-primary/20 rounded-2xl transition-all duration-300 glass-card"
							>
								<div
									className={`size-10 md:size-11 xl:size-12 rounded-xl ${v.bg} flex items-center justify-center mb-4`}
								>
									<v.icon
										className={`size-5 md:size-5.5 xl:size-6 ${v.color}`}
									/>
								</div>
								<h3 className="mb-2 font-heading font-semibold">{v.title}</h3>
								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
									{v.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline */}
			<section className="py-16 lg:py-24 section-glow">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-12 text-center"
					>
						<h2 className="mb-3 font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
							Our Journey
						</h2>
						<p className="text-muted-foreground">
							From a small team with a big idea to a global fintech leader.
						</p>
					</motion.div>
					<div className="relative">
						<div className="top-0 bottom-0 left-6 absolute bg-border/40 w-px" />
						<div className="space-y-8">
							{milestones.map((m, i) => (
								<motion.div
									key={m.year}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.08 }}
									className="relative flex gap-6 pl-16"
								>
									<div className="top-1 left-0 absolute flex justify-center items-center bg-primary/10 border border-primary/20 rounded-full w-12 h-12">
										<span className="font-bold text-[10px] text-primary md:text-[11px] xl:text-xs">
											{m.year}
										</span>
									</div>
									<div className="flex-1 p-4 md:p-5 xl:p-6 rounded-xl glass-card">
										<h4 className="mb-1 font-heading font-semibold text-primary text-sm md:text-base xl:text-lg">
											{m.title}
										</h4>
										<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
											{m.desc}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Leadership */}
			<section className="py-16 lg:py-24">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-12 text-center"
					>
						<h2 className="mb-3 font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
							Leadership Team
						</h2>
						<p className="text-muted-foreground">
							World-class talent building world-class technology.
						</p>
					</motion.div>
					<div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
						{team.map((t, i) => (
							<motion.div
								key={t.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.08 }}
								className="group p-5 hover:border-primary/20 rounded-2xl text-center transition-all duration-300 glass-card"
							>
								<div
									className={`size-10 md:size-12 xl:size-14 rounded-full bg-linear-to-br ${t.bg} flex items-center justify-center mx-auto mb-3`}
								>
									<span className="font-bold text-[11px] text-foreground md:text-xs xl:text-sm">
										{t.initials}
									</span>
								</div>
								<h4 className="mb-1 font-semibold text-[10px] md:text-[11px] xl:text-xs">
									{t.name}
								</h4>
								<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
									{t.role}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
