import { useNavigate } from "@tanstack/react-router";
import {
	CloseCircle,
	I24Support,
	Message,
	RefreshCircle,
	ShieldTick,
	Sms,
	Timer1,
	Verify,
} from "iconsax-reactjs";
import { Button } from "#/components/ui/button";
import { useMeStore } from "#/stores/me.store";

const KYC_BADGE: Record<
	"NOT STARTED" | "PENDING" | "APPROVED" | "REJECTED",
	{
		label: string;
		className: string;
		Icon: React.ElementType;
	}
> = {
	"NOT STARTED": {
		label: "Verification Required",
		className: "bg-amber-500/10 border-amber-500/20 text-amber-300",
		Icon: RefreshCircle,
	},

	PENDING: {
		label: "Verification In Review",
		className: "bg-blue-500/10 border-blue-500/20 text-blue-300",
		Icon: Timer1,
	},

	APPROVED: {
		label: "Verification Approved",
		className: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
		Icon: ShieldTick,
	},

	REJECTED: {
		label: "Verification Rejected",
		className: "bg-red-500/10 border-red-500/20 text-red-300",
		Icon: CloseCircle,
	},
};

const Preview = ({ onVerify }: { onVerify: () => void }) => {
	const navigate = useNavigate();
	const { user } = useMeStore();
	const onSupport = () => {
		return navigate({ to: "/support" });
	};

	const status = user?.kycStatus || "REJECTED";
	const badge = KYC_BADGE[status];
	const Icon = badge.Icon;

	const KYC_CONTENT: Record<
		"NOT STARTED" | "PENDING" | "APPROVED" | "REJECTED",
		{
			title: string;
			description: string;
		}
	> = {
		"NOT STARTED": {
			title: "Complete Your Identity Verification",
			description:
				"Verify your identity to secure your account, unlock withdrawals, and gain full access to all trading features.",
		},

		PENDING: {
			title: "Your Verification Is Under Review",
			description:
				"Our compliance team is currently reviewing your submitted KYC documents. This usually takes less than 24 hours.",
		},

		APPROVED: {
			title: "Identity Verification Completed",
			description:
				"Your account has been successfully verified. You now have full access to trading, deposits, and withdrawal features.",
		},

		REJECTED: {
			title: "Verification Submission Rejected",
			description:
				"We could not verify your submitted documents. Please review the requirements carefully and resubmit valid information.",
		},
	};

	return (
		<main>
			{/* Hero */}
			<section className="border-border border-b overflow-hidden">
				<div>
					<div className="flex flex-col items-center text-center">
						<div
							className={`inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border ${badge.className}`}
						>
							<Icon size={16} variant="Bold" className="hidden md:block" />
							<span className="font-semibold text-[11px] md:text-xs xl:text-sm">
								{badge.label}
							</span>
						</div>

						<h2 className="font-bold text-xl md:text-2xl xl:text-3xl">
							{KYC_CONTENT[status].title}
						</h2>

						<p className="mt-1 mb-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							{KYC_CONTENT[status].description}
						</p>
					</div>
				</div>
			</section>

			{/* Content */}
			<section className="mx-auto px-4 md:px-6 xl:px-8 py-8 md:py-12 max-w-5xl">
				{/* Main Card */}
				<div className="relative bg-card/40 shadow-2xl backdrop-blur-md border border-border rounded-3xl overflow-hidden">
					<div className="absolute inset-0 bg-linear-to-br from-primary/3 via-transparent to-primary/1" />

					<div className="relative px-4 md:px-6 xl:px-8 py-10 md:py-8 xl:py-10">
						<div className="flex flex-col items-center text-center">
							{/* Icon */}
							<div className="relative flex justify-center items-center bg-amber-500/10 mb-7 border border-amber-500/10 rounded-full size-20 md:size-24">
								<div className="absolute inset-0 bg-amber-400/10 rounded-full animate-ping" />
								<ShieldTick className="z-2 relative size-8 md:size-10 xl:size-12 text-amber-600 dark:text-amber-400" />
							</div>

							{/* Text */}
							<div className="max-w-3xl">
								<h2 className="font-bold text-xl md:text-2xl xl:text-3xl">
									Identity Verification Required
								</h2>

								<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
									Complete your KYC verification to comply with regulations,
									protect your account, and gain full access to all trading and
									withdrawal features.
								</p>
							</div>

							{/* Features */}
							<div className="gap-3 grid md:grid-cols-3 mt-8 w-full max-w-3xl">
								{[
									"Secure Withdrawals",
									"Unlimited Access",
									"Enhanced Security",
								].map((feature) => (
									<div
										key={feature}
										className="flex justify-center items-center gap-2 bg-accent/10 px-4 py-3 border border-border rounded-2xl"
									>
										<Verify className="size-4 text-primary shrink-0" />

										<span className="font-medium text-[11px] md:text-xs xl:text-sm">
											{feature}
										</span>
									</div>
								))}
							</div>

							{/* CTA */}
							<Button
								disabled={user?.kycStatus !== "NOT STARTED"}
								onClick={onVerify}
								className="gap-2 shadow-primary/20 shadow-xl mt-10 px-6 md:px-8 h-12 md:h-13 font-semibold text-sm md:text-base"
							>
								<ShieldTick className="size-5" />
								Complete Verification
							</Button>
						</div>
					</div>
				</div>

				{/* Support Card */}
				<div className="relative bg-card/40 shadow-xl backdrop-blur-md mt-6 border border-border rounded-3xl overflow-hidden">
					<div className="absolute inset-0 bg-linear-to-r from-primary/3 via-transparent to-transparent" />

					<div className="relative flex lg:flex-row flex-col justify-between lg:items-center gap-8 px-5 md:px-8 py-6 md:py-8">
						<div className="flex sm:flex-row flex-col gap-5">
							<div className="flex justify-center items-center bg-primary/10 rounded-2xl size-10 md:size-12 xl:size-14 shrink-0">
								<Message className="size-5 md:size-6 xl:size-7 text-primary" />
							</div>

							<div>
								<h3 className="font-bold text-lg md:text-xl xl:text-2xl">
									Need Help?
								</h3>

								<p className="mt-2 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
									Our support team is ready to assist you through the
									verification process anytime.
								</p>

								<div className="flex sm:flex-row flex-col sm:items-center gap-3 sm:gap-5 mt-5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
									<div className="flex items-center gap-2">
										<Message className="size-3 md:size-3.5 xl:size-4" />
										<span>Live Chat</span>
									</div>

									<div className="flex items-center gap-2">
										<Sms className="size-3 md:size-3.5 xl:size-4" />
										<span>Email Support</span>
									</div>

									<div className="flex items-center gap-2">
										<I24Support className="size-3 md:size-3.5 xl:size-4" />
										<span>24/7 Available</span>
									</div>
								</div>
							</div>
						</div>

						<Button
							onClick={onSupport}
							className="gap-2 shadow-lg shadow-primary/20 w-full sm:w-auto h-12 md:h-13 shrink-0"
						>
							<Message className="size-5" />
							Get Support
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Preview;
