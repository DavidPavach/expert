import { Link, useNavigate } from "@tanstack/react-router";

// Icons
import {
	ArrowDown2,
	Logout,
	MessageQuestion,
	NotificationBing,
	Profile,
	ReceiptText,
} from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { useBalanceStore } from "#/stores/dashboard.store";
// Stores
import { useMeStore } from "#/stores/me.store";
import { formatCurrency } from "#/utils/format";
// Components
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
	const navigate = useNavigate();
	const { user } = useMeStore();
	const { stats } = useBalanceStore();
	const [open, setOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const handleLogout = () => {
		navigate({
			to: "/logout",
		});
	};

	return (
		<header className="top-0 z-10 sticky bg-background/80 backdrop-blur-xl border-border border-b">
			<div className="flex justify-between items-center gap-x-4 md:gap-x-6 xl:gap-x-10 px-3 sm:px-5 md:px-6 xl:px-8 py-2 md:py-2.5 xl:py-3">
				{/* Left */}
				<div className="flex items-center gap-x-4">
					<img
						src="/logo.png"
						alt="logo"
						className="lg:hidden h-8 object-contain"
					/>

					<section className="hidden lg:flex flex-col bg-primary/80 px-4 py-2 border border-border rounded-xl min-w-42.5">
						<p className="font-medium text-[10px] text-primary-foreground/80 uppercase tracking-wider">
							Account Balance
						</p>

						<h2 className="font-bold text-primary-foreground text-lg montserrat">
							{formatCurrency(stats?.availableBalance || 0)}
						</h2>
					</section>
				</div>

				{/* Right */}
				<section className="flex items-center gap-x-3 md:gap-x-4">
					{/* Notification */}
					<button
						type="button"
						className="relative flex justify-center items-center hover:bg-accent/30 border border-border rounded-xl size-10 transition-all duration-300 cursor-pointer"
					>
						<NotificationBing className="size-5" variant="Outline" />

						<span className="-top-1 -right-1 absolute bg-destructive border-2 border-background rounded-full size-3" />
					</button>

					{/* Theme */}
					<ThemeToggle />

					{/* User */}
					<div ref={dropdownRef} className="relative">
						<button
							type="button"
							onClick={() => setOpen((prev) => !prev)}
							className="flex items-center gap-x-3 hover:bg-accent/20 px-2 py-1.5 border border-transparent hover:border-border rounded-xl transition-all duration-300 cursor-pointer"
						>
							<Avatar className="border border-border size-8 md:size-9 xl:size-10">
								<AvatarImage src={user?.profilePicture} alt="Profile Picture" />
								<AvatarFallback className="bg-primary font-semibold text-primary-foreground">
									{user?.username?.slice(0, 2).toUpperCase() || "??"}
								</AvatarFallback>
							</Avatar>

							<div className="hidden sm:block text-left">
								<p className="max-w-35 font-semibold truncate capitalize">
									{user?.fullName}
								</p>
								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
									Trading Account
								</p>
							</div>

							<ArrowDown2
								className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
								variant="Bold"
							/>
						</button>

						{/* Dropdown */}
						<div
							className={`absolute right-0 top-[115%] w-72.5 rounded-xl border border-border bg-background shadow overflow-hidden transition-all duration-300 origin-top-right
                            ${
															open
																? "opacity-100 scale-100 visible"
																: "opacity-0 scale-95 invisible"
														}`}
						>
							{/* Top */}
							<div className="flex items-center gap-x-4 bg-accent/20 p-4 border-border border-b">
								<Avatar className="border border-border size-10 md:size-12 xl:size-14">
									<AvatarImage src={user?.profilePicture} />
									<AvatarFallback className="bg-primary font-bold text-primary-foreground text-lg">
										{user?.username?.slice(0, 1).toUpperCase() || "?"}
									</AvatarFallback>
								</Avatar>
								<div>
									<h2 className="font-semibold capitalize">{user?.fullName}</h2>
									<p className="font-semibold text-primary text-sm md:text-base xl:text-lg">
										{formatCurrency(stats?.availableBalance || 0)}
									</p>
								</div>
							</div>

							{/* Links */}
							<div className="px-3 py-1">
								{[
									{
										label: "Profile Settings",
										icon: Profile,
										href: "/profile",
									},
									{
										label: "Account History",
										icon: ReceiptText,
										href: "/history",
									},
									{
										label: "Support Center",
										icon: MessageQuestion,
										href: "/support",
									},
								].map((item) => {
									const Icon = item.icon;

									return (
										<Link
											key={item.label}
											to={item.href}
											onClick={() => setOpen(false)}
											className="flex items-center gap-x-3 hover:bg-accent/10 px-4 py-2 rounded-xl transition-all duration-300"
										>
											<div className="flex justify-center items-center bg-accent/20 rounded-xl size-9">
												<Icon
													className="size-4 text-muted-foreground"
													variant="Outline"
												/>
											</div>

											<p className="font-medium text-[11px] md:text-xs xl:text-sm">
												{item.label}
											</p>
										</Link>
									);
								})}

								{/* Divider */}
								<div className="my-3 bg-border rounded-full h-px" />

								{/* Logout */}
								<button
									type="button"
									onClick={handleLogout}
									className="flex items-center gap-x-3 hover:bg-destructive/10 px-4 py-3 rounded-xl w-full text-destructive transition-all duration-300 cursor-pointer"
								>
									<div className="flex justify-center items-center bg-destructive/10 rounded-xl size-9">
										<Logout className="size-4" variant="Outline" />
									</div>

									<p className="font-medium text-[11px] md:text-xs xl:text-sm">
										Sign Out
									</p>
								</button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</header>
	);
}
