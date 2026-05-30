import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
	const navigate = useNavigate();

	return (
		<section className="relative py-24 lg:py-32 overflow-hidden">
			<div className="z-2 relative mx-auto px-4 md:px-6 xl:px-8 max-w-4xl text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
					className="relative p-10 lg:p-16 rounded-3xl overflow-hidden glass-card-strong"
				>
					{/* Background glow */}
					<div className="top-0 left-1/2 absolute bg-primary/10 blur-[100px] rounded-full w-96 h-96 -translate-x-1/2 pointer-events-none" />

					<h2 className="relative mb-4 font-montserrat font-bold text-3xl md:text-4xl xl:text-5xl">
						Ready to Start <span className="gradient-text">Trading?</span>
					</h2>
					<p className="relative mx-auto mb-8 max-w-lg text-muted-foreground">
						Join millions of traders who trust Expertmirrorcon for secure,
						intelligent, and high-performance trading.
					</p>
					<div className="relative flex sm:flex-row flex-col justify-center items-center gap-4">
						<Button
							onClick={() =>
								navigate({ to: "/register", search: { ref: undefined } })
							}
							size="lg"
							className="group gap-2 bg-primary hover:bg-primary/90 px-8 h-12 font-semibold text-primary-foreground text-base"
						>
							Create Free Account
							<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
						</Button>
						<Button
							onClick={() => navigate({ to: "/contact" })}
							size="lg"
							variant="ghost"
							className="py-3 font-medium text-muted-foreground hover:text-foreground"
						>
							Contact Sales
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
