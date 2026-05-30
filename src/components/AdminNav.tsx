import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
	Candle,
	CardCoin,
	Element4,
	Home3,
	type Icon,
	Logout,
	Personalcard,
	Profile2User,
	SecurityUser,
	Setting2,
	TagUser,
	Trade,
	TrendUp,
	UserSearch,
	UserTag,
} from "iconsax-reactjs";

import { useState } from "react";
import Menu from "./Menu";
import { Overlay } from "./Overlay";

type NavLink = { href: string; icon: Icon; label: string; subText?: string };
export type NavSection = {
	id: string;
	title: string;
	icon: Icon;
	links: NavLink[];
};

const NAV_SECTIONS: NavSection[] = [
	{
		id: "overview",
		title: "Overview",
		icon: Element4,
		links: [
			{ href: "/transactions", icon: Home3, label: "Transactions" },
			{ href: "/settings", icon: Setting2, label: "Settings" },
		],
	},
	{
		id: "trading",
		title: "Trading & Markets",
		icon: TrendUp,
		links: [
			{ href: "/copy-trading", icon: Candle, label: "Copy Trading" },
			{ href: "/traders", icon: Trade, label: "Traders" },
			{ href: "/trades", icon: CardCoin, label: "Trades" },
		],
	},
	{
		id: "users",
		title: "Users & Referrals",
		icon: TagUser,
		links: [
			{ href: "/users", icon: UserSearch, label: "Users" },
			{ href: "/user-kyc", icon: Personalcard, label: "User Kyc" },
			{ href: "/user-referrals", icon: Profile2User, label: "Referrals" },
		],
	},
	{
		id: "staff",
		title: "Staff",
		icon: UserTag,
		links: [
			{ href: "/me", icon: TagUser, label: "Me" },
			{ href: "/staff", icon: SecurityUser, label: "Staff" },
		],
	},
];

const BOTTOM_NAVLINKS = [
	{ href: "/transactions", icon: Home3, label: "Transactions" },
	{ href: "/settings", icon: Setting2, label: "Settings" },
	{ href: "/copy-trading", icon: Candle, label: "CopyTrading" },
	{ href: "/traders", icon: Trade, label: "Traders" },
	{ href: "/users", icon: UserSearch, label: "Users" },
];

export const SideNav = () => {
	return (
		<main className="hidden lg:block fixed border-border border-r lg:w-[18rem] h-dvh text-foreground">
			<div className="mt-3 px-4 py-3 font-semibold text-primary text-xl">
				<img src="/logo.png" className="inline mr-1 size-10" alt="logo" />
				Expertmirrorcon
			</div>
			<div className="flex flex-col gap-y-5 mt-5 p-4 max-h-[85vh] overflow-y-auto">
				{NAV_SECTIONS.map((section) => {
					const SectionIcon = section.icon;
					return (
						<div key={section.id} className="flex flex-col gap-y-3">
							<div className="flex items-center gap-x-2 font-semibold text-muted-foreground text-xs uppercase">
								<SectionIcon className="size-4" variant="Bold" />
								{section.title}
							</div>
							<div className="flex flex-col gap-y-2 p-1 text-xs">
								{section.links.map((link) => {
									const LinkIcon = link.icon;
									const subText = link.subText;
									return (
										<Link
											activeProps={{
												className: "bg-primary/70 font-semibold rounded-4xl",
											}}
											to={link.href}
											key={link.label}
										>
											<motion.button
												className={`flex items-center gap-x-2 w-full px-4 py-2.5 rounded-4xl cursor-pointer transition-all duration-300 hover:bg-primary/30`}
											>
												<LinkIcon className="size-4" variant="Bold" />
												<p>{link.label}</p>
												{subText && (
													<div
														className={`px-3 py-0.5 ml-auto font-semibold rounded-full ${subText === "Live" || subText === "5%" ? "bg-green-500 animate-pulse" : subText === "Pro" ? "bg-purple-500" : "bg-yellow-500 text-background"}`}
													>
														{subText}
													</div>
												)}
											</motion.button>
										</Link>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
			<div className="mt-auto pr-4 text-xs">
				<Link
					to="/signout"
					activeProps={{
						className: "bg-primary/70 font-semibold rounded-4xl",
					}}
				>
					<motion.button
						className={`flex items-center gap-x-2 w-full px-4 py-2.5 rounded-4xl cursor-pointer transition-all duration-300 hover:bg-primary/30`}
					>
						<Logout className="size-6" />
						<p>Logout</p>
					</motion.button>
				</Link>
			</div>
		</main>
	);
};

type NavItem = {
	href: string;
	icon: React.ElementType;

	label: string;
};
const NavItem = ({ href, icon: Icon, label }: NavItem) => {
	const location = useLocation();
	const isActive = location.pathname === href;

	return (
		<Link to={href} className="relative">
			<motion.div
				layout
				className="relative flex items-center gap-x-2 p-1 rounded-full"
				transition={{ type: "spring", stiffness: 500, damping: 35 }}
			>
				{isActive && (
					<motion.div
						layoutId="bottom-nav-active"
						className="absolute inset-0 bg-primary rounded-full"
						transition={{ type: "spring", stiffness: 500, damping: 35 }}
					/>
				)}

				{/* Icon */}
				<motion.div
					layout
					className={`relative z-10 rounded-full p-2 ${isActive ? "text-primary-foreground" : "text-foreground hover:text-primary"}`}
					whileTap={{ scale: 0.9 }}
				>
					<Icon size="24" variant="Bold" />
				</motion.div>

				{/* Label */}
				<AnimatePresence>
					{isActive && (
						<motion.p
							initial={{ opacity: 0, x: -6 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -6 }}
							transition={{ duration: 0.2 }}
							className="z-10 relative pr-3 font-semibold text-primary-foreground text-sm"
						>
							{label}
						</motion.p>
					)}
				</AnimatePresence>
			</motion.div>
		</Link>
	);
};

export const BottomNav = () => {
	const [show, setShow] = useState<boolean>(false);

	// Functions
	const toggleMenu = () => setShow((prev) => !prev);

	return (
		<nav className="lg:hidden bottom-0 left-0 z-10 fixed bg-background p-2 w-full">
			<button
				onClick={toggleMenu}
				type="button"
				className="-top-4 left-1/2 z-20 absolute place-content-center grid bg-primary rounded-full size-10 text-primary-foreground hover:scale-105 -translate-x-1/2 duration-300 cursor-pointer transform"
			>
				<Element4 className="relative size-5" />
			</button>

			<div className="flex justify-between items-center bg-white dark:bg-black p-2 rounded-4xl">
				{BOTTOM_NAVLINKS.map((item) => (
					<NavItem key={item.label} {...item} />
				))}
			</div>
			{show && (
				<Overlay variant="bottom" open={show} onClose={toggleMenu}>
					<Menu toggleMenu={toggleMenu} NAV_SECTIONS={NAV_SECTIONS} />
				</Overlay>
			)}
		</nav>
	);
};
