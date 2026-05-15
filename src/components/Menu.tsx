import { Link, useLocation } from "@tanstack/react-router";
import { CloseCircle } from "iconsax-reactjs";
import type { NavSection } from "./Nav";

const Menu = ({
	toggleMenu,
	NAV_SECTIONS,
}: {
	toggleMenu: () => void;
	NAV_SECTIONS: NavSection[];
}) => {
	const location = useLocation();

	return (
		<main className="pb-6">
			{/* Top */}
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="font-bold text-base sm:text-lg">Navigation</h1>
					<p className="mt-1 text-muted-foreground">Quickly access all pages</p>
				</div>

				<button
					type="button"
					onClick={toggleMenu}
					className="flex justify-center items-center hover:bg-destructive/20 rounded-xl size-8 sm:size-10 hover:text-destructive transition-all duration-300 cursor-pointer"
				>
					<CloseCircle className="size-5 sm:size-6" variant="Outline" />
				</button>
			</div>

			{/* Sections */}
			<div className="space-y-7">
				{NAV_SECTIONS.map((section) => {
					const SectionIcon = section.icon;
					return (
						<div key={section.id}>
							{/* Section Header */}
							<div className="flex items-center gap-x-2 mb-4">
								<div className="flex justify-center items-center bg-primary/10 rounded-lg size-8">
									<SectionIcon className="size-4 text-primary" variant="Bold" />
								</div>

								<h2 className="font-semibold text-muted-foreground uppercase tracking-wide">
									{section.title}
								</h2>
							</div>

							{/* Links */}
							<div className="gap-3 grid grid-cols-1">
								{section.links.map((link) => {
									const LinkIcon = link.icon;
									const isActive = location.href === link.href;
									return (
										<Link
											activeProps={{
												className: "border-primary/30 bg-primary/10",
											}}
											key={link.label}
											to={link.href}
											onClick={toggleMenu}
											className={`flex items-center gap-x-4 rounded-2xl border transition-all duration-300 p-2 border-border hover:bg-primary/10`}
										>
											<div
												className={`flex justify-center items-center rounded-xl size-9
                                                                
                                                                ${
																																	isActive
																																		? "bg-primary text-primary-foreground"
																																		: "bg-background border border-border"
																																}
                                                                `}
											>
												<LinkIcon
													className="size-4.5"
													variant={isActive ? "Bold" : "Outline"}
												/>
											</div>

											<div className="flex-1">
												<div className="flex items-center gap-x-2">
													<p className="font-medium">{link.label}</p>

													{link.subText && (
														<div
															className={`px-2.5 py-1 rounded-full text-[10px] font-semibold
                                                                            
                                                                            ${
																																							link.subText ===
																																							"Live"
																																								? "bg-green-500/10 text-green-500"
																																								: link.subText ===
																																										"Pro"
																																									? "bg-purple-500/10 text-purple-500"
																																									: "bg-yellow-500/10 text-yellow-500"
																																						}
                                                                            `}
														>
															{link.subText}
														</div>
													)}
												</div>
											</div>
										</Link>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</main>
	);
};

export default Menu;
