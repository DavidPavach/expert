import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
	Category,
	Profile2User,
	SecurityCard,
	SecurityUser,
	TagUser,
} from "iconsax-reactjs";

// Icons
import { ChevronDown, LogOut, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Components
import { ThemeToggle } from "./ThemeToggle";

const AdminHeader = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const navigate = useNavigate();

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				buttonRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Close dropdown on escape key
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, []);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogOut = () => {
		navigate({ to: "/signout" });
	};

	const handleMenuClick = (action: string) => {
		setIsDropdownOpen(false);

		// Handle different menu actions
		switch (action) {
			case "adminReferral":
				navigate({ to: "/user-referrals" });
				break;
			case "staff":
				navigate({ to: "/staff" });
				break;
			case "adminProfile":
				navigate({ to: "/me" });
				break;
			case "logout":
				handleLogOut();
				break;
			default:
				break;
		}
	};

	const menuItems = [
		{
			id: "adminReferral",
			label: "Admin Referral",
			icon: <Profile2User size={18} variant="Bold" />,
			action: () => handleMenuClick("adminReferral"),
		},
		{
			id: "staff",
			label: "Manage Admins",
			icon: <SecurityUser size={18} variant="Bold" />,
			action: () => handleMenuClick("staff"),
		},
		{
			id: "adminProfile",
			label: "Your Profile",
			icon: <TagUser size={18} variant="Bold" />,
			action: () => handleMenuClick("adminProfile"),
		},
		{
			id: "logout",
			label: "Log Out",
			icon: <LogOut size={18} />,
			action: () => handleMenuClick("logout"),
			variant: "danger" as const,
		},
	];

	return (
		<header className="flex justify-between items-center bg-background px-2 py-3 border-border border-b">
			<SecurityCard className="size-9 text-primary" />
			<section className="flex justify-end items-center gap-x-3 w-full">
				<ThemeToggle />
				<div className="relative">
					<button
						type="button"
						ref={buttonRef}
						onClick={toggleDropdown}
						className="flex items-center gap-2 hover:bg-accent p-0.5 border border-border rounded-lg focus:outline-none transition-colors cursor-pointer"
						aria-label="Open menu"
						aria-expanded={isDropdownOpen}
					>
						<div className="flex justify-center items-center rounded-full size-8">
							<motion.div
								animate={{ rotate: isDropdownOpen ? 180 : 0 }}
								transition={{ duration: 0.2 }}
							>
								{isDropdownOpen ? <X size={18} /> : <Category size={18} />}
							</motion.div>
						</div>
						<ChevronDown
							size={16}
							className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
						/>
					</button>

					<AnimatePresence>
						{isDropdownOpen && (
							<motion.div
								ref={dropdownRef}
								initial={{ opacity: 0, scale: 0.95, y: -10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: -10 }}
								transition={{ duration: 0.2 }}
								className="top-full right-0 z-10 absolute bg-card shadow-2xl mt-2 py-2 border border-border rounded-xl w-56 text-card-foreground"
							>
								{menuItems.map((item, index) => (
									<motion.button
										key={item.id}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.2, delay: index * 0.05 }}
										onClick={item.action}
										className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${item.variant === "danger" ? "text-destructive hover:bg-red-50" : "text-card-foreground hover:bg-background"}`}
									>
										<div>{item.icon}</div>
										<span className="font-medium">{item.label}</span>
									</motion.button>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</section>
		</header>
	);
};

export default AdminHeader;
