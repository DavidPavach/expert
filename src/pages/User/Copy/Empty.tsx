import {
	Candle,
	DocumentCopy,
	MessageQuestion,
	Profile2User,
	SearchNormal,
	ShieldSecurity,
} from "iconsax-reactjs";
import { useState } from "react";
import { Overlay } from "#/components/Overlay";
import HowItWorks from "./HowItWorks";

const FEATURES = [
	{
		color: "bg-primary",
		icon: (
			<Profile2User
				className="size-4 md:size-4.5 xl:size-5 text-primary-foreground"
				variant="Bold"
			/>
		),
		title: "Expert Traders",
		desc: "Copy from verified professional traders with proven track records",
	},
	{
		color: "bg-green-500",
		icon: (
			<Candle
				className="size-4 md:size-4.5 xl:size-5 text-green-100"
				variant="Bold"
			/>
		),
		title: "Auto Trading",
		desc: "Trades are executed automatically when experts make moves",
	},
	{
		color: "bg-purple-500",
		icon: (
			<ShieldSecurity
				className="size-4 md:size-4.5 xl:size-5 text-purple-100"
				variant="Bold"
			/>
		),
		title: "Risk Management",
		desc: "Set your own risk limits and stop-loss parameters easily and quickly",
	},
];

export default function Empty({ onBrowse }: { onBrowse: () => void }) {
	const [showModal, setShowModal] = useState<boolean>(false);

	// Functions
	const toggleShow = () => setShowModal((prev) => !prev);

	return (
		<>
			<div className="bg-card/80 shadow backdrop-blur-md p-4 md:p-6 xl:p-8 border border-border rounded-2xl overflow-hidden">
				<div className="flex flex-col items-center py-7 text-center">
					{/* Icon */}
					<div className="flex justify-center items-center bg-primary/20 mb-6 border border-primary/30 rounded-2xl size-12 md:size-14 xl:size-16">
						<DocumentCopy className="size-6 md:size-7 xl:size-8 text-primary" />
					</div>

					<h2 className="mb-2 font-bold text-xl md:text-2xl xl:text-3xl">
						Start Copy Trading
					</h2>
					<p className="mb-8 max-w-lg text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
						You haven't started copying any traders yet. Browse our expert
						traders and start copying their winning strategies to earn profits
						automatically.
					</p>

					{/* Feature cards */}
					<div className="gap-3 grid grid-cols-1 sm:grid-cols-3 mb-8 w-full max-w-2xl">
						{FEATURES.map((f) => (
							<div
								key={f.title}
								className="flex flex-col items-center gap-3 bg-muted/20 p-4 border border-border rounded-xl text-center"
							>
								<div
									className={`size-8 md:size-9 xl:size-10 rounded-xl ${f.color} flex items-center justify-center`}
								>
									{f.icon}
								</div>
								<div>
									<p className="mb-1 font-bold text-[11px] text-foreground md:text-xs xl:text-sm">
										{f.title}
									</p>
									<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs leading-relaxed">
										{f.desc}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* CTA buttons */}
					<div className="flex sm:flex-row flex-col gap-3 w-full max-w-2xl">
						<button
							type="button"
							onClick={onBrowse}
							className="flex flex-1 justify-center items-center gap-2 bg-primary hover:opacity-90 shadow shadow-primary/20 py-3 rounded-xl font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-all cursor-pointer"
						>
							<SearchNormal className="size-4 md:size-4.5 xl:size-5" />
							Browse Expert Traders
						</button>
						<button
							type="button"
							onClick={toggleShow}
							className="flex flex-1 justify-center items-center gap-2 bg-muted/30 hover:bg-muted/50 py-3 border border-border rounded-xl font-semibold text-[11px] md:text-xs xl:text-sm transition-all cursor-pointer"
						>
							<MessageQuestion className="size-4 md:size-4.5 xl:size-5" />
							How It Works
						</button>
					</div>
				</div>
			</div>

			{showModal && (
				<Overlay open={showModal} onClose={toggleShow} variant="bottom">
					<HowItWorks onClose={toggleShow} />
				</Overlay>
			)}
		</>
	);
}
