import { Link } from "@tanstack/react-router";

// Icons
import { Heart, Lock, TickSquare } from "iconsax-reactjs";

export default function Footer() {
	return (
		<div className="mt-6 text-center">
			<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
				Already have an account?{" "}
				<Link
					to="/login"
					className="font-semibold text-primary hover:underline"
				>
					Sign in here
				</Link>
			</p>

			{/* Trust indicators */}
			<div className="flex justify-center items-center gap-5 mt-5">
				{[
					{
						icon: (
							<Lock
								variant="Bold"
								className="inline mr-0.5 size-4 text-yellow-500"
							/>
						),
						label: "SSL Secured",
					},
					{
						icon: (
							<Heart
								variant="Bold"
								className="inline mr-0.5 size-4 text-accent"
							/>
						),
						label: "256-bit Encryption",
					},
					{
						icon: (
							<TickSquare
								variant="Bold"
								className="inline mr-0.5 size-4 text-green-500"
							/>
						),
						label: "Regulated Platform",
					},
				].map(({ icon, label }) => (
					<div
						key={label}
						className="flex items-center gap-1.5 text-muted-foreground"
					>
						<span className="text-[11px] md:text-xs xl:text-sm">{icon}</span>
						<span className="text-[10px] md:text-[11px] xl:text-xs">
							{label}
						</span>
					</div>
				))}
			</div>

			<p className="mt-4 text-[10px] text-muted-foreground/60 md:text-[11px] xl:text-xs">
				<span className="text-primary">© {new Date().getFullYear()}</span>{" "}
				Expertmirrorcon. All rights reserved. | Licensed and regulated trading
				platform.
			</p>
		</div>
	);
}
