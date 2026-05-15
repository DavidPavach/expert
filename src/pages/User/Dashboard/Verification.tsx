import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown2, ShieldTick } from "iconsax-reactjs";
import { useState } from "react";
import { useMeStore } from "#/stores/me.store";

export default function VerificationBanner() {
	const [open, setOpen] = useState(false);
	const { user } = useMeStore();

	const kycStatus = user?.kycStatus || "NOT STARTED";
	const progress = kycStatus === "PENDING" ? "60%" : "0%";

	return (
		<section className="bg-card/60 shadow-sm backdrop-blur-md border border-border rounded-3xl overflow-hidden">
			<div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-5 p-4 md:p-5 xl:p-6">
				{/* Left */}
				<div className="flex items-start gap-x-4">
					<div className="flex justify-center items-center bg-primary/10 rounded-xl min-w-10 size-10 md:size-12 xl:size-14">
						<ShieldTick
							className="size-5 md:size-6 xl:size-7 text-primary"
							variant="Bulk"
						/>
					</div>

					<div>
						<div className="flex flex-wrap items-center gap-2">
							<h2 className="font-semibold text-base md:text-lg xl:text-xl">
								Identity Verification
							</h2>

							<div
								className={`${kycStatus === "PENDING" ? "border-yellow-500/20 text-yellow-500" : kycStatus === "REJECTED" ? "border-destructive/20 text-destructive" : kycStatus === "APPROVED" ? "text-green-500 border-green-500/20" : "text-muted-foreground border-muted/20"} bg-yellow-500/10 px-3 py-1 border  rounded-full font-medium text-[10px]  md:text-[11px] xl:text-xs`}
							>
								{kycStatus}
							</div>
						</div>

						<p className="mt-1 max-w-2xl text-muted-foreground leading-relaxed">
							Complete verification to unlock withdrawals, higher trading
							limits, and full platform access.
						</p>

						{/* Progress */}
						<div className="mt-4">
							<div className="flex justify-between items-center mb-2 text-[11px] md:text-xs xl:text-sm">
								<span className="text-muted-foreground">
									Verification Progress
								</span>

								<span className="font-semibold text-primary">{progress}</span>
							</div>

							<div className="bg-accent/20 rounded-full w-full h-2 overflow-hidden">
								<div
									className="bg-primary rounded-full h-full"
									style={{ width: progress }}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Right */}
				<div className="flex sm:justify-end">
					<button
						type="button"
						onClick={() => setOpen((prev) => !prev)}
						className="group flex items-center gap-x-2 bg-primary hover:bg-primary/90 px-5 py-3 rounded-2xl font-semibold text-primary-foreground transition-all duration-300 cursor-pointer"
					>
						{open ? "Hide Details" : "View Details"}

						<ArrowDown2
							className={`size-4 transition-transform duration-300 ${
								open ? "rotate-180" : ""
							}`}
							variant="Bold"
						/>
					</button>
				</div>
			</div>

			{/* Expandable Content */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25 }}
						className="border-border border-t overflow-hidden"
					>
						<div className="gap-4 grid grid-cols-1 md:grid-cols-3 p-4 md:p-5 xl:p-6">
							{[
								{
									title: "Personal Information",
									status: kycStatus,
									completed: kycStatus === "APPROVED",
								},
								{
									title: "Government ID",
									status: kycStatus,
									completed: kycStatus === "APPROVED",
								},
								{
									title: "Address Verification",
									status: kycStatus,
									completed: kycStatus === "APPROVED",
								},
							].map((item) => (
								<div
									key={item.title}
									className="bg-accent/10 hover:bg-accent/20 p-4 border border-border rounded-2xl transition-all duration-300"
								>
									<div className="flex justify-between items-center">
										<h3 className="font-semibold">{item.title}</h3>

										<div
											className={`px-3 py-1 rounded-full text-[10px] md:text-[11px] xl:text-xs font-medium
                                            ${
																							item.completed
																								? "bg-green-500/10 text-green-500 border border-green-500/20"
																								: item.status === "PENDING"
																									? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
																									: "bg-muted text-muted-foreground border border-border"
																						}`}
										>
											{item.status}
										</div>
									</div>

									<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
										{item.completed
											? "Verification completed successfully."
											: "Complete this step to continue account verification."}
									</p>

									{!item.completed && (
										<Link
											to="/kyc"
											type="button"
											className="block bg-primary/10 hover:bg-primary/20 mt-2 px-4 py-2 rounded-xl w-fit font-medium text-primary transition-all duration-300"
										>
											Continue
										</Link>
									)}
								</div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
