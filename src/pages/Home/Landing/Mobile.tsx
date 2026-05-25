import { motion } from "framer-motion";
import { Graph, Mobile, Notification, Shield } from "iconsax-reactjs";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const mobileFeatures = [
	{
		icon: Notification,
		label: "Smart Notifications",
		desc: "Price alerts, trade confirmations, and market news — instant push updates.",
	},
	{
		icon: Graph,
		label: "Portfolio Management",
		desc: "Track performance, rebalance, and monitor P&L on the go.",
	},
	{
		icon: ArrowUpRight,
		label: "Live Trading",
		desc: "Full order execution with charts, order book, and one-tap trading.",
	},
	{
		icon: Shield,
		label: "Biometric Security",
		desc: "Face ID and fingerprint authentication for every transaction.",
	},
];

export default function MobileAppSection() {
	return (
		<section className="relative py-24 lg:py-32 overflow-hidden section-glow">
			<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
				<div className="items-center gap-12 lg:gap-20 grid lg:grid-cols-2">
					{/* Left - Phone Mockup */}
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7 }}
						className="relative flex justify-center"
					>
						{/* Phone frame */}
						<div className="relative w-64 md:w-72">
							<div className="relative p-3 rounded-[2.5rem] overflow-hidden glass-card-strong">
								{/* Notch */}
								<div className="top-0 left-1/2 z-10 absolute bg-background rounded-b-2xl w-28 h-6 -translate-x-1/2" />

								{/* Screen content */}
								<div className="bg-muted/60 p-4 pt-10 rounded-4xl min-h-120">
									{/* Status bar */}
									<div className="flex justify-between items-center mb-6">
										<span className="text-[10px] text-muted-foreground">
											9:41
										</span>
										<div className="flex gap-1">
											<div className="bg-primary/40 rounded-sm w-4 h-2" />
											<div className="bg-muted-foreground/30 rounded-sm w-1.5 h-2" />
										</div>
									</div>

									{/* Balance card */}
									<div className="bg-linear-to-br from-primary/20 to-accent/10 mb-4 p-4 border border-primary/10 rounded-2xl">
										<p className="mb-1 text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px]">
											Total Balance
										</p>
										<p className="font-heading font-bold text-foreground text-lg md:text-xl xl:text-2xl">
											$124,892
										</p>
										<p className="mt-1 font-medium text-[9px] text-emerald-400 md:text-[10px] xl:text-[11px]">
											+12.4% this month
										</p>
									</div>

									{/* Quick actions */}
									<div className="gap-2 grid grid-cols-3 mb-4">
										{["Buy", "Sell", "Swap"].map((action) => (
											<div
												key={action}
												className="bg-muted/80 py-2.5 rounded-xl text-center"
											>
												<span className="font-medium text-[9px] text-foreground md:text-[10px] xl:text-[11px]">
													{action}
												</span>
											</div>
										))}
									</div>

									{/* Watchlist */}
									<div className="space-y-2.5">
										<p className="font-semibold text-[9px] text-muted-foreground md:text-[10px] xl:text-[11px] uppercase tracking-wider">
											Watchlist
										</p>
										{[
											{ s: "BTC", p: "$67,432", c: "+3.4%", up: true },
											{ s: "ETH", p: "$3,891", c: "+1.9%", up: true },
											{ s: "AAPL", p: "$189.72", c: "+0.9%", up: true },
										].map((item) => (
											<div
												key={item.s}
												className="flex justify-between items-center py-1.5 border-border/30 border-b"
											>
												<div className="flex items-center gap-2">
													<div className="flex justify-center items-center bg-muted rounded-full size-6">
														<span className="font-bold text-[8px] text-primary">
															{item.s[0]}
														</span>
													</div>
													<span className="font-medium text-[10px] md:text-[11px] xl:text-xs">
														{item.s}
													</span>
												</div>
												<div className="text-right">
													<p className="font-medium text-[9px] md:text-[10px] xl:text-[11px]">
														{item.p}
													</p>
													<p
														className={`text-[8px] md:text-[9px] xl:text-[11px] ${item.up ? "text-emerald-400" : "text-red-400"}`}
													>
														{item.c}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Glow behind phone */}
							<div className="absolute -inset-10 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
						</div>
					</motion.div>

					{/* Right - Content */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						<span className="block mb-4 font-semibold text-[10px] text-primary md:text-[11px] xl:text-xs uppercase tracking-widest">
							Mobile App
						</span>
						<h2 className="mb-6 font-heading font-bold text-2xl md:text-3xl xl:text-4xl">
							Trade Anywhere, <span className="gradient-text">Anytime</span>
						</h2>
						<p className="mb-8 text-muted-foreground leading-relaxed">
							The full power of Expertmirrorcon in your pocket. Available on iOS
							and Android with all the features you need to manage your
							portfolio on the go.
						</p>

						<div className="space-y-5 mb-8">
							{mobileFeatures.map((f, i) => (
								<motion.div
									key={f.label}
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
									className="flex gap-4"
								>
									<div className="flex justify-center items-center bg-primary/10 rounded-xl size-8 md:size-9 xl:size-10 shrink-0">
										<f.icon className="size-4 md:size-4.5 xl:size-5 text-primary" />
									</div>
									<div>
										<h4 className="mb-0.5 font-semibold text-[11px] md:text-xs xl:text-sm">
											{f.label}
										</h4>
										<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
											{f.desc}
										</p>
									</div>
								</motion.div>
							))}
						</div>

						{/* App store buttons */}
						<div className="flex flex-wrap gap-3">
							<Button className="gap-2 bg-foreground hover:bg-foreground/90 px-5 h-11 text-background">
								<Mobile className="size-4" />
								<div className="text-left">
									<span className="block opacity-70 text-[8px] md:text-[9px] xl:text-[10px] leading-none">
										Download on the
									</span>
									<span className="font-semibold text-[10px] md:text-[10px] xl:text-xs leading-none">
										App Store
									</span>
								</div>
							</Button>
							<Button
								variant="outline"
								className="gap-2 px-5 border-border/60 h-11"
							>
								<Mobile className="size-4" />
								<div className="text-left">
									<span className="block opacity-70 text-[8px] md:text-[9px] xl:text-[10px] leading-none">
										Get it on
									</span>
									<span className="font-semibold text-[10px] md:text-[10px] xl:text-xs leading-none">
										Google Play
									</span>
								</div>
							</Button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
