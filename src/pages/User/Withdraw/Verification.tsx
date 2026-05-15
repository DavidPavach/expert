import {
	ArrowDown2,
	Danger,
	Lock,
	SecuritySafe,
	TickCircle,
} from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { useMeStore } from "#/stores/me.store";
import Form from "./Form";

export default function WithdrawalVerification() {
	const [code, setCode] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [expanded, setExpanded] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);

	const { user } = useMeStore();

	// Functions
	const toggleShow = () => setShow((prev) => !prev);
	const handleSubmit = () => {
		setError("");
		if (!code.trim()) {
			setError("Please enter your verification code.");
			return;
		}
		setLoading(true);
		setTimeout(() => {
			if (user?.withdrawalKey === code) {
				toggleShow();
			} else {
				const message: string = "Incorrect Withdrawal Key, Kindly Try Again.";
				setError(message);
				toast.error(message);
			}
			setLoading(false);
		}, 2000);
	};

	return show ? (
		<Form close={toggleShow} />
	) : (
		<main className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
			{/* Card header */}
			<header className="flex items-center gap-4 bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-6 xl:px-8 py-6 border-border border-b">
				<div className="flex justify-center items-center bg-amber-500/20 border border-amber-500/30 rounded-xl size-10 md:size-12 xl:size-14 shrink-0">
					<SecuritySafe className="size-5 md:size-6 xl:size-7 text-amber-600 dark:text-amber-400" />
				</div>
				<div>
					<h2 className="font-bold text-foreground text-base md:text-lg xl:text-xl">
						Security Verification Required
					</h2>
					<p className="text-muted-foreground">
						Additional verification needed to process your withdrawal
					</p>
				</div>
			</header>

			<section className="flex flex-col gap-6 px-4 md:px-6 xl:px-8 py-7">
				{/* Warning notice */}
				<div className="bg-amber-500/10 p-4 border-amber-500 border-l-4 rounded-xl">
					<div className="flex items-start gap-3">
						<Danger className="mt-0.5 size-5 text-amber-600 dark:text-amber-400 shrink-0" />
						<div>
							<p className="mb-1 font-semibold text-[11px] text-amber-600 dark:text-amber-400 md:text-xs xl:text-sm">
								Withdrawal Code Required
							</p>
							<p className="text-[11px] text-amber-800/80 dark:text-amber-200/80 md:text-xs xl:text-sm leading-relaxed">
								For your security, this withdrawal requires a verification code.
								Please contact our customer support team via live chat or email
								at{" "}
								<a
									href="mailto:support@expertmirrorcon.com"
									className="text-amber-700 hover:text-amber-800 dark:hover:text-amber-200 dark:text-amber-300 underline"
								>
									support@expertmirrorcon.com
								</a>{" "}
								to obtain your withdrawal verification code.
							</p>
							<button
								type="button"
								onClick={() => setExpanded((v) => !v)}
								className="flex items-center gap-1 mt-2 font-medium text-amber-600 hover:text-amber-800 dark:hover:text-amber-300 dark:text-amber-400 text-xs transition-colors cursor-pointer"
							>
								Learn about withdrawal
								<ArrowDown2
									variant="Bold"
									className={`size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
								/>
							</button>
							{expanded && (
								<div className="space-y-1.5 mt-3 pt-3 border-amber-500/20 border-t text-[11px] text-amber-800/70 dark:text-amber-200/70 md:text-xs xl:text-sm leading-relaxed">
									<p>
										• Verification codes are unique to each withdrawal request.
									</p>
									<p>• Codes expire after 24 hours for your protection.</p>
									<p>
										• Never share your code with anyone, including support
										staff.
									</p>
									<p>
										• This process protects against unauthorized withdrawals.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Code input */}
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label
							htmlFor="code"
							className="font-semibold text-foreground text-sm"
						>
							Enter Withdrawal Verification Code
						</label>
						<div className="relative">
							<span className="top-1/2 left-4 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
								<Lock className="size-4 md:size-4.5 xl:size-5" />
							</span>
							<input
								id="code"
								type="text"
								placeholder="Enter your verification code here"
								value={code}
								onChange={(e) => {
									setCode(e.target.value);
									setError("");
								}}
								className={`w-full rounded-xl border ${error ? "border-destructive" : "border-border"} bg-muted/30 text-foreground placeholder:text-muted-foreground placeholder:text-[11px] md:placeholder:text-xs xl:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all py-3.5 pl-11 pr-4 tracking-wider`}
							/>
						</div>
						{error ? (
							<p className="flex items-center gap-1.5 text-[11px] text-destructive md:text-xs text-sm">
								<Danger className="size-3.5 md:size-4 xl:size-4.5 shrink-0" />
								{error}
							</p>
						) : (
							<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								This code was provided by our customer support team
							</p>
						)}
					</div>

					<button
						type="button"
						disabled={loading}
						onClick={handleSubmit}
						className="flex justify-center items-center gap-2 bg-primary hover:opacity-90 disabled:opacity-60 shadow-lg shadow-primary/20 py-3.5 rounded-xl w-full font-bold text-primary-foreground active:scale-[0.99] transition-all cursor-pointer"
					>
						{loading ? (
							<span className="border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full size-4 animate-spin" />
						) : (
							<TickCircle
								variant="Bold"
								className="size-4 md:size-4.5 xl:size-5"
							/>
						)}
						{loading ? "Verifying..." : "Verify & Continue"}
					</button>
				</div>
			</section>
		</main>
	);
}
