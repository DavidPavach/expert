import { Crown1 } from "iconsax-reactjs";
import { useSettingsStore } from "#/stores/settings.store";
import { formatCurrency } from "#/utils/format";

export default function PremiumUpgrade() {
	const { settings } = useSettingsStore();

	return (
		<div className="bg-linear-to-br from-primary/10 via-card to-accent/10 shadow-2xl border border-primary/30 rounded-2xl overflow-hidden">
			{/* Top accent bar */}
			<div className="bg-linear-to-r from-primary via-accent to-primary w-full h-1" />

			<div className="flex flex-col items-center gap-5 px-6 md:px-10 py-8 text-center">
				{/* Crown icon */}
				<div className="flex justify-center items-center bg-primary/20 shadow-lg shadow-primary/20 border border-primary/30 rounded-2xl size-12 md:size-14 xl:size-16">
					<Crown1 className="size-6 md:size-7 xl:size-8" />
				</div>

				<div>
					<h2 className="mb-1 font-bold text-foreground text-lg md:text-xl xl:text-2xl">
						Unlock Premium Access
					</h2>
					<p className="max-w-lg text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Join our elite traders. Watch live sessions, get real-time signals,
						expert analysis, and personalized strategies — all in one place.
					</p>
				</div>

				{/* Price card */}
				<div className="relative flex flex-col flex-1 items-center gap-1 bg-primary/10 p-5 border border-primary/40 rounded-2xl">
					<span className="-top-2.5 absolute bg-primary px-2 py-0.5 rounded-full font-bold text-[10px] text-primary-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">
						Best Value
					</span>
					<p className="font-bold text-primary text-xl md:text-2xl xl:text-3xl">
						{settings ? formatCurrency(settings.threshold) : "$399"}
					</p>
				</div>

				<p className="max-w-sm text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Contact our support team to get started. We'll guide you through the
					premium activation process instantly.
				</p>
			</div>
		</div>
	);
}
