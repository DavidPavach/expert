import { CloseCircle, MessageQuestion } from "iconsax-reactjs";
import { CircleCheckBig } from "lucide-react";

const STEPS = [
	{
		num: 1,
		color: "bg-primary",
		title: "Choose an Expert",
		desc: "Browse through our verified expert traders and select one based on their performance, strategy, and risk profile.",
	},
	{
		num: 2,
		color: "bg-green-500",
		title: "Set Your Investment",
		desc: "Decide how much you want to invest and set your risk parameters including stop-loss and take-profit levels.",
	},
	{
		num: 3,
		color: "bg-purple-500",
		title: "Auto-Copy Trades",
		desc: "Our system automatically copies the expert's trades to your account in real-time, proportional to your investment.",
	},
	{
		num: 4,
		color: "bg-orange-500",
		title: "Monitor & Profit",
		desc: "Track your performance in real-time and watch your investment grow as the expert trader makes profitable trades.",
	},
];

const BENEFITS = [
	"No trading experience required",
	"Learn from expert strategies",
	"Diversify your portfolio",
	"24/7 automated trading",
	"Full control over your funds",
];

export default function HowItWorks({ onClose }: { onClose: () => void }) {
	return (
		<div className="bg-card shadow-2xl mx-auto border border-border rounded-2xl w-full max-w-2xl overflow-hidden">
			{/* Header */}
			<div className="flex justify-between items-center bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-6 py-5 border-border border-b">
				<div className="flex items-center gap-3">
					<MessageQuestion className="size-4 md:size-4.5 xl:size-5 text-primary" />
					<h2 className="font-bold text-base md:text-lg xl:text-xl">
						How Copy Trading Works
					</h2>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="hover:bg-muted/50 p-2 rounded-lg text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
				>
					<CloseCircle className="size-4 md:size-4.5 xl:size-5" />
				</button>
			</div>

			{/* Body */}
			<div className="gap-6 grid md:grid-cols-2 p-6">
				{/* Steps */}
				<div className="flex flex-col gap-5">
					{STEPS.map((step) => (
						<div key={step.num} className="flex items-start gap-4">
							<div
								className={`size-8 rounded-full ${step.color} flex items-center justify-center shrink-0 text-[11px] md:text-xs xl:text-sm font-bold`}
							>
								{step.num}
							</div>
							<div>
								<p className="mb-1 font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
									{step.title}
								</p>
								<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-relaxed">
									{step.desc}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Benefits */}
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3 bg-muted/20 p-4 border border-border rounded-xl">
						<p className="font-bold text-[11px] text-foreground md:text-xs xl:text-sm">
							Benefits of Copy Trading
						</p>
						{BENEFITS.map((b) => (
							<div key={b} className="flex items-center gap-2.5">
								<CircleCheckBig className="size-4 text-green-500" />
								<span className="text-muted-foreground text-xs">{b}</span>
							</div>
						))}
					</div>
					<div className="bg-amber-500/10 p-4 border-amber-500 border-l-4 rounded-xl">
						<p className="text-amber-600/90 dark:text-amber-200/90 text-xs leading-relaxed">
							<span className="font-bold text-amber-800 dark:text-amber-400">
								Risk Warning:
							</span>{" "}
							Copy trading involves risk. Past performance is not indicative of
							future results.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
