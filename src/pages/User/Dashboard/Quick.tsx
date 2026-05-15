import { ArrowRight, Flash } from "iconsax-reactjs";

export default function QuickTradeCard() {
	return (
		<main className="group bg-primary/80 shadow hover:shadow-primary/20 p-4 rounded-3xl w-full overflow-hidden text-primary-foreground text-left hover:scale-[1.01] transition-all duration-300 cursor-pointer">
			{/* Content */}
			<div className="flex flex-col items-center text-center">
				<div className="flex justify-center items-center bg-background backdrop-blur-sm mb-2 rounded-2xl size-12 md:size-14 xl:size-16">
					<Flash
						className="size-6 md:size-7 xl:size-8 text-foreground"
						variant="Bulk"
					/>
				</div>

				<h2 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight">
					Quick Trade
				</h2>

				<p className="max-w-[30ch] leading-relaxed">
					Start a new trade instantly or explore investment plans.
				</p>

				<div className="flex items-center gap-x-2 mt-2 font-semibold">
					Get Started
					<ArrowRight
						className="size-4 transition-transform group-hover:translate-x-1 duration-300"
						variant="Outline"
					/>
				</div>
			</div>
		</main>
	);
}
