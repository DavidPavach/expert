import { motion } from "framer-motion";
import { Book1, Chart2, Clock, type Icon, PlayCircle } from "iconsax-reactjs";
import { Brain, ChevronRight, type LucideIcon, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type CourseLevel = "beginner" | "intermediate" | "advanced";

type Course = {
	id: number;
	level: CourseLevel;
	icon: LucideIcon | Icon;
	color: string;
	bg: string;
	title: string;
	desc: string;
	lessons: number;
	duration: string;
	rating: number;
};

const categories: { id: "all" | CourseLevel; label: string }[] = [
	{ id: "all", label: "All" },
	{ id: "beginner", label: "Beginner" },
	{ id: "intermediate", label: "Intermediate" },
	{ id: "advanced", label: "Advanced" },
];

const courses: Course[] = [
	{
		id: 1,
		level: "beginner",
		icon: Book1,
		color: "text-primary",
		bg: "bg-primary/10",
		title: "Trading Fundamentals",
		desc: "Learn the core concepts of financial markets, order types, and how to read a chart for the first time.",
		lessons: 12,
		duration: "3h 20m",
		rating: 4.9,
	},
	{
		id: 2,
		level: "beginner",
		icon: Chart2,
		color: "text-blue-400",
		bg: "bg-blue-500/10",
		title: "Understanding Forex",
		desc: "A comprehensive introduction to currency pairs, pip values, leverage, and what drives exchange rates.",
		lessons: 10,
		duration: "2h 45m",
		rating: 4.8,
	},
	{
		id: 3,
		level: "intermediate",
		icon: PlayCircle,
		color: "text-violet-400",
		bg: "bg-violet-500/10",
		title: "Technical Analysis Mastery",
		desc: "Deep dive into candlestick patterns, support & resistance, trend lines, and Fibonacci retracements.",
		lessons: 18,
		duration: "5h 10m",
		rating: 4.9,
	},
	{
		id: 4,
		level: "intermediate",
		icon: Chart2,
		color: "text-emerald-400",
		bg: "bg-emerald-500/10",
		title: "Risk Management Essentials",
		desc: "How to size positions, set stop-losses, manage drawdowns, and protect capital in volatile markets.",
		lessons: 8,
		duration: "2h 15m",
		rating: 4.7,
	},
	{
		id: 5,
		level: "advanced",
		icon: Brain,
		color: "text-amber-400",
		bg: "bg-amber-500/10",
		title: "Algorithmic Trading with AI",
		desc: "Build and back-test trading strategies using machine learning signals and automated execution logic.",
		lessons: 20,
		duration: "6h 30m",
		rating: 4.8,
	},
	{
		id: 6,
		level: "advanced",
		icon: Chart2,
		color: "text-rose-400",
		bg: "bg-rose-500/10",
		title: "Options & Derivatives",
		desc: "Understand calls, puts, Greeks, and advanced options strategies for income generation and hedging.",
		lessons: 15,
		duration: "4h 50m",
		rating: 4.9,
	},
];

const articles = [
	{ title: "What is a Pip in Forex Trading?", tag: "Forex", readTime: "4 min" },
	{
		title: "How to Read Candlestick Charts",
		tag: "Technical Analysis",
		readTime: "6 min",
	},
	{
		title: "Understanding Market Liquidity",
		tag: "Markets",
		readTime: "5 min",
	},
	{ title: "The Basics of Crypto Wallets", tag: "Crypto", readTime: "3 min" },
	{ title: "How Central Banks Move Markets", tag: "Macro", readTime: "7 min" },
	{ title: "Position Sizing: The 1% Rule", tag: "Risk", readTime: "4 min" },
];

const levelColor = {
	beginner: "text-emerald-400 bg-emerald-500/10",
	intermediate: "text-amber-400 bg-amber-500/10",
	advanced: "text-rose-400 bg-rose-500/10",
};

export default function Education() {
	const [active, setActive] = useState("all");
	const filtered =
		active === "all" ? courses : courses.filter((c) => c.level === active);

	return (
		<main>
			{/* Hero */}
			<section className="relative py-20 lg:py-28 hero-gradient">
				<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-widest">
							Education
						</span>
						<h1 className="mb-4 font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
							Learn to Trade with{" "}
							<span className="gradient-text">Confidence</span>
						</h1>
						<p className="mx-auto text-muted-foreground text-sm md:text-base xl:text-lg">
							From your first trade to advanced algorithmic strategies —
							structured courses and expert-written guides to accelerate your
							growth.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Courses */}
			<section className="py-12 lg:py-16">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
					<div className="flex flex-wrap justify-between items-center gap-4 mb-6">
						<h2 className="font-heading font-bold text-xl md:text-2xl xl:text-3xl">
							Trading Courses
						</h2>
						<div className="flex flex-wrap gap-2">
							{categories.map((c) => (
								<button
									type="button"
									key={c.id}
									onClick={() => setActive(c.id)}
									className={`px-4 py-1.5 rounded-xl text-[11px] md:text-xs xl:text-sm font-medium transition-all ${
										active === c.id
											? "bg-primary/20 text-primary border border-primary/30"
											: "glass-card text-muted-foreground hover:text-foreground"
									}`}
								>
									{c.label}
								</button>
							))}
						</div>
					</div>

					<div className="gap-5 grid sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((course, i) => (
							<motion.div
								key={course.id}
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.07 }}
								className="group flex flex-col p-4 md:p-5 xl:p-6 hover:border-primary/20 rounded-2xl transition-all duration-300 cursor-pointer glass-card"
							>
								<div className="flex justify-between items-start mb-4">
									<div
										className={`size-10 md:size-11 xl:size-12 rounded-xl ${course.bg} flex items-center justify-center`}
									>
										<course.icon
											className={`size-5 md:size-5.5 xl:size-6 ${course.color}`}
										/>
									</div>
									<span
										className={`text-[10px] md:text-[11px] xl:text-xs font-semibold px-2 py-0.5 rounded-full ${levelColor[course.level]}`}
									>
										{course.level}
									</span>
								</div>
								<h3 className="mb-2 font-heading font-semibold">
									{course.title}
								</h3>
								<p className="flex-1 mb-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
									{course.desc}
								</p>
								<div className="flex justify-between items-center pt-3 border-border/30 border-t text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
									<span className="flex items-center gap-1">
										<Book1 className="size-3 md:size-3.5 xl:size-4" />{" "}
										{course.lessons} lessons
									</span>
									<span className="flex items-center gap-1">
										<Clock className="size-3 md:size-3.5 xl:size-4" />{" "}
										{course.duration}
									</span>
									<span className="flex items-center gap-1 text-amber-400">
										<Star className="fill-amber-400 size-3 md:size-3.5 xl:size-4" />{" "}
										{course.rating}
									</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Articles */}
			<section className="py-12 lg:py-16 section-glow">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
					<div className="flex justify-between items-center mb-6">
						<h2 className="font-heading font-bold text-2xl sm:text-3xl">
							Quick-Read Guides
						</h2>
						<Button variant="ghost" className="gap-1 text-primary text-sm">
							View All <ChevronRight className="w-4 h-4" />
						</Button>
					</div>
					<div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3">
						{articles.map((a, i) => (
							<motion.div
								key={`${
									// biome-ignore lint/suspicious/noArrayIndexKey: <>
									i
								}-${a.title}`}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.06 }}
								className="group flex justify-between items-center gap-4 p-5 hover:border-primary/20 rounded-xl transition-all cursor-pointer glass-card"
							>
								<div>
									<span className="font-semibold text-[10px] text-primary uppercase tracking-wider">
										{a.tag}
									</span>
									<p className="mt-0.5 font-medium text-sm">{a.title}</p>
									<p className="flex items-center gap-1 mt-1 text-muted-foreground text-xs">
										<Clock className="size-3 md:size-3.5 xl:size-4" />{" "}
										{a.readTime} read
									</p>
								</div>
								<ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
