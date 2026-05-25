import { Link } from "@tanstack/react-router";
import { ArrowLeft2, LogoutCurve } from "iconsax-reactjs";
import { logout } from "#/services/api.service";
import { Button } from "@/components/ui/button";

export default function LogoutPage() {
	const handleLogout = async () => {
		try {
			await logout();
			window.location.href = "/login";
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className="flex justify-center items-center py-10">
			<div className="bg-card shadow-2xl p-4 md:p-6 xl:p-8 border border-border/60 rounded-3xl w-full max-w-xl">
				<div className="flex flex-col items-center text-center">
					<div className="flex justify-center items-center bg-destructive/10 mb-5 rounded-2xl size-12 md:size-14 xl:size-16">
						<LogoutCurve
							variant="Bulk"
							className="size-6 md:size-7 xl:size-8 text-destructive"
						/>
					</div>

					<h1 className="font-bold text-xl md:text-2xl xl:text-3xl tracking-tight">
						Log out?
					</h1>

					<p className="mt-3 max-w-sm text-muted-foreground leading-relaxed">
						Are you sure you want to end your current session? You can always
						log back in anytime.
					</p>
				</div>

				<div className="flex sm:flex-row flex-col gap-3 mt-8">
					<Button
						asChild
						variant="outline"
						className="flex-1 rounded-2xl h-12 font-medium text-[11px] md:text-xs xl:text-sm"
					>
						<Link to="/dashboard">
							<ArrowLeft2 className="size-4 md:size-4.5 xl:size-5" />
							Go Home
						</Link>
					</Button>

					<Button
						type="button"
						onClick={handleLogout}
						className="flex-1 bg-destructive hover:bg-destructive/90 rounded-2xl h-12 font-semibold text-destructive-foreground"
					>
						<LogoutCurve className="size-4 md:size-4.5 xl:size-5" />
						Yes, Log Me Out
					</Button>
				</div>
			</div>
		</div>
	);
}
