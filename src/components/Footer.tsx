import { Link } from "@tanstack/react-router";
import { Global, Lock, ShieldSecurity } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
	Platform: ["Trading", "Analytics", "API", "Mobile App", "Security"],
	Markets: ["Forex", "Crypto", "Stocks", "Commodities", "Indices"],
	Company: ["About Us", "Careers", "Press", "Partners", "Blog"],
	Support: ["Help Center", "Contact", "Status", "Documentation", "Community"],
};

export default function Footer() {
	return (
		<footer className="relative border-border/40 border-t">
			<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				{/* Main footer */}
				<div className="gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 py-16">
					{/* Brand + Newsletter */}
					<div className="col-span-2">
						<div className="flex items-center gap-2.5 mb-4">
							<img src="/logo.png" alt="Logo" className="h-8 md:h-10 xl:h-12" />
							<span className="font-heading font-bold text-base md:text-lg xl:text-xl tracking-tight">
								Expert<span className="text-primary">mirror</span>con
							</span>
						</div>
						<p className="mb-5 max-w-xs text-muted-foreground text-sm leading-relaxed">
							Institutional-grade trading platform. Secure, fast, and
							intelligent.
						</p>

						{/* Newsletter */}
						<div className="flex gap-2 max-w-xs">
							<Input
								placeholder="Enter your email"
								className="bg-muted/50 border-border/50 h-9 text-sm"
							/>
							<Button
								size="sm"
								className="bg-primary hover:bg-primary/90 px-4 h-9 text-primary-foreground shrink-0"
							>
								Subscribe
							</Button>
						</div>
					</div>

					{/* Links */}
					{Object.entries(footerLinks).map(([category, links]) => (
						<div key={category}>
							<h4 className="mb-4 font-semibold text-foreground text-xs uppercase tracking-wider">
								{category}
							</h4>
							<ul className="space-y-2.5">
								{links.map((link) => (
									<li key={link}>
										<Link
											to={link}
											className="text-muted-foreground hover:text-foreground text-sm transition-colors"
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Compliance badges */}
				<div className="py-6 border-border/30 border-t">
					<div className="flex flex-wrap justify-center items-center gap-6 mb-6">
						{[
							{ icon: ShieldSecurity, label: "SOC 2 Type II" },
							{ icon: Lock, label: "PCI DSS" },
							{ icon: Global, label: "GDPR Compliant" },
						].map((badge) => (
							<div
								key={badge.label}
								className="flex items-center gap-2 text-muted-foreground"
							>
								<badge.icon className="w-4 h-4" />
								<span className="font-medium text-xs">{badge.label}</span>
							</div>
						))}
					</div>
				</div>

				{/* Bottom bar */}
				<div className="flex md:flex-row flex-col justify-between items-center gap-4 py-6 border-border/30 border-t">
					<div className="flex flex-wrap items-center gap-4 text-muted-foreground text-xs">
						<span>© 2025 Expertmirrorcon. All rights reserved.</span>
						<Link to="/" className="hover:text-foreground transition-colors">
							Privacy Policy
						</Link>
						<Link to="/" className="hover:text-foreground transition-colors">
							Terms of Service
						</Link>
						<Link to="/" className="hover:text-foreground transition-colors">
							Risk Disclosure
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
