import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CloseSquare, Element3 } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
	{ label: "Trading", href: "/trading" },
	{ label: "Company", href: "/company" },
	{ label: "Education", href: "/education" },
	{ label: "Contact", href: "/contact" },
	{ label: "About Us", href: "/about" },
];

export default function HomeNav() {
	const navigate = useNavigate();
	const [scrolled, setScrolled] = useState<boolean>(false);
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
			className={`fixed top-0 left-0 right-0 z-10 transition-all duration-500 ${
				scrolled
					? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/10"
					: "bg-transparent"
			}`}
		>
			<div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
				<div className="flex justify-between items-center h-16 md:h-18 xl:h-20">
					{/* Logo */}
					<Link to="/" className="flex gap-x-2">
						<img src="/logo.png" alt="Logo" className="h-8 md:h-10 xl:h-12" />
						<span className="font-heading font-bold text-base md:text-lg xl:text-xl tracking-tight">
							Expert<span className="text-primary">mirror</span>con
						</span>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden lg:flex items-center gap-1">
						{navLinks.map((link) => (
							<Link
								key={link.label}
								to={link.href}
								className="hover:bg-muted/50 px-4 py-2 rounded-lg font-medium text-[11px] text-muted-foreground hover:text-foreground md:text-xs xl:text-sm transition-colors"
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Desktop CTA */}
					<div className="hidden lg:flex items-center gap-3">
						<Button
							onClick={() => navigate({ to: "/login" })}
							variant="ghost"
							className="text-muted-foreground hover:text-foreground"
						>
							Sign In
						</Button>
						<Button
							onClick={() =>
								navigate({ to: "/register", search: { ref: undefined } })
							}
							className="bg-primary hover:bg-primary/90 px-5 font-semibold text-primary-foreground"
						>
							Get Started
						</Button>
					</div>

					{/* Mobile Toggle */}
					<button
						type="button"
						onClick={() => setMobileOpen(!mobileOpen)}
						className="lg:hidden p-2 text-muted-foreground hover:text-foreground cursor-pointer"
					>
						{mobileOpen ? (
							<CloseSquare className="size-5 md:size-5.5 xl:size-6" />
						) : (
							<Element3 className="size-5 md:size-5.5 xl:size-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="lg:hidden bg-background/95 backdrop-blur-xl border-border border-b overflow-hidden"
					>
						<div className="space-y-1 px-4 py-4">
							{navLinks.map((link) => (
								<Link
									key={link.label}
									to={link.href}
									onClick={() => setMobileOpen(false)}
									className="block hover:bg-muted/50 px-4 py-3 rounded-lg font-medium text-muted-foreground hover:text-foreground"
								>
									{link.label}
								</Link>
							))}
							<div className="space-y-2 pt-4">
								<Button
									onClick={() => navigate({ to: "/login" })}
									variant="ghost"
									className="justify-center w-full"
								>
									Sign In
								</Button>
								<Button
									onClick={() =>
										navigate({ to: "/register", search: { ref: undefined } })
									}
									className="bg-primary w-full text-primary-foreground"
								>
									Get Started
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
