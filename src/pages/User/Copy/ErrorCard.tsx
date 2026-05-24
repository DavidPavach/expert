import { Danger, Refresh2 } from "iconsax-reactjs";

export default function ExpertCardError({
	message = "Failed to load traders.",
	retry,
}: {
	message?: string;
	retry?: () => void;
}) {
	return (
		<div className="flex flex-col justify-center items-center bg-card/80 shadow-xl backdrop-blur-md mt-10 px-6 py-10 border border-destructive/20 rounded-2xl min-h-105 overflow-hidden text-center">
			{/* Icon */}
			<div className="relative flex justify-center items-center bg-destructive/10 mb-5 border border-destructive/20 rounded-2xl size-14 md:size-16 xl:size-18">
				<div className="absolute inset-0 bg-destructive/10 blur-2xl rounded-full" />
				<Danger className="z-2 relative size-7 md:size-8 xl:size-9 text-destructive" />
			</div>

			{/* Title */}
			<h3 className="font-bold text-lg md:text-xl xl:text-2xl">
				Loading Error
			</h3>

			{/* Message */}
			<p className="mt-1 max-w-sm text-muted-foreground leading-relaxed">
				{message}
			</p>

			{/* Divider */}
			<div className="my-6 bg-border w-full h-px" />

			{/* Actions */}
			<div className="flex sm:flex-row flex-col gap-3 w-full sm:w-auto">
				<button
					type="button"
					onClick={retry}
					className="flex justify-center items-center gap-2 bg-primary hover:opacity-90 shadow-lg shadow-primary/20 px-5 py-3 rounded-xl font-semibold text-primary-foreground transition-all cursor-pointer"
				>
					<Refresh2 className="size-4 md:size-4.5 xl:size-5" />
					Try Again
				</button>

				<button
					type="button"
					className="bg-muted/30 hover:bg-muted/50 px-5 py-3 border border-border rounded-xl font-medium text-muted-foreground transition-all cursor-pointer"
				>
					Go Back
				</button>
			</div>

			{/* Footer hint */}
			<p className="mt-5 xl:size-sm text-[11px] text-muted-foreground md:text-xs">
				Check your internet connection or retry in a few moments.
			</p>
		</div>
	);
}
