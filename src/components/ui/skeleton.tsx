import { cn } from "#/lib/utils.ts";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("bg-muted/50 rounded-md animate-pulse", className)}
			{...props}
		/>
	);
}

export { Skeleton };
