import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<div className="flex flex-col justify-center items-center gap-4 px-4 min-h-dvh text-center">
			<h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
				404
			</h1>

			<div className="space-y-2">
				<h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
					Page Not Found
				</h2>

				<p className="max-w-md text-muted-foreground">
					The page you are looking for does not exist or may have been moved.
				</p>
			</div>

			<Link
				to="/"
				className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-primary-foreground transition-colors"
			>
				Go Home
			</Link>
		</div>
	);
}
