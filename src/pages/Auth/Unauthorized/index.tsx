import { useNavigate } from "@tanstack/react-router";
import { ShieldCross } from "iconsax-reactjs";

export default function UnauthorizedPage() {
	const navigate = useNavigate();

	return (
		<div className="p-4 md:p-5 xl:p-6">
			<div className="mx-auto w-full max-w-md text-center">
				<div className="flex justify-center mb-6">
					<div className="flex justify-center items-center bg-destructive/10 rounded-full size-20 md:size-22 xl:size-24">
						<ShieldCross className="size-10 md:size-11 xl:size-12 text-destructive" />
					</div>
				</div>

				<h1 className="mb-2 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
					Access Denied
				</h1>

				<p className="mb-8 text-muted-foreground">
					You don't have permission to view this page. Please return to an
					authorized area of the application.
				</p>

				<button
					type="button"
					onClick={() => navigate({ to: "/dashboard" })}
					className="hover:bg-muted px-5 py-3 border border-border rounded-xl w-full text-foreground transition-colors cursor-pointer"
				>
					Go To Dashboard
				</button>
			</div>
		</div>
	);
}
