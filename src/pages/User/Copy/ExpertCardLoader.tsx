import { Skeleton } from "#/components/ui/skeleton";

export default function ExpertCardSkeleton() {
	return (
		<div className="flex flex-col bg-card/80 shadow-xl backdrop-blur-md border border-border rounded-2xl overflow-hidden animate-pulse">
			{/* Top actions */}
			<div className="flex justify-between items-center px-5 pt-4">
				<Skeleton className="rounded-full w-16 h-6" />
				<div className="flex gap-x-4">
					<Skeleton className="rounded-md size-5 md:size-5.5 xl:size-6" />
					<Skeleton className="rounded-md size-5 md:size-5.5 xl:size-6" />
				</div>
			</div>

			{/* Avatar + name */}
			<div className="flex flex-col items-center px-5 pt-3 pb-5 border-border border-b text-center">
				<Skeleton className="mb-3 rounded-2xl size-16 md:size-18 xl:size-20" />

				<Skeleton className="mb-2 rounded-md w-32 h-5" />

				<Skeleton className="mb-3 rounded-md w-24 h-3" />

				{/* Ratings */}
				<div className="flex items-center gap-1 mb-2">
					{Array.from({ length: 5 }).map((_, i) => (
						<Skeleton
							// biome-ignore lint/suspicious/noArrayIndexKey: false positives
							key={`star-${i + 1}`}
							className="rounded-full size-3.5 md:size-4 xl:size-4.5"
						/>
					))}
					<Skeleton className="ml-2 rounded-md w-10 h-3" />
				</div>

				<Skeleton className="rounded-md w-24 h-3" />
			</div>

			{/* Metrics */}
			<div className="gap-3 grid grid-cols-2 px-5 py-4 border-border border-b">
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={`metric-${
							// biome-ignore lint/suspicious/noArrayIndexKey: false positives
							i + 1
						}`}
						className="bg-accent/10 px-4 py-3 rounded-lg"
					>
						<Skeleton className="mb-2 rounded-md w-16 h-5" />

						{i === 0 ? (
							<>
								<Skeleton className="mb-2 rounded-full w-full h-1" />
								<Skeleton className="rounded-md w-14 h-3" />
							</>
						) : (
							<Skeleton className="rounded-md w-20 h-3" />
						)}
					</div>
				))}
			</div>

			{/* Bio */}
			<div className="flex-1 space-y-2 px-5 py-4">
				<Skeleton className="rounded-md w-full h-3" />
				<Skeleton className="rounded-md w-[90%] h-3" />
				<Skeleton className="rounded-md w-[70%] h-3" />
			</div>

			{/* Investment + CTA */}
			<div className="flex flex-col gap-3 px-5 pb-5">
				<div className="flex justify-between items-center bg-muted/20 px-4 py-2.5 border border-border rounded-xl">
					<Skeleton className="rounded-md w-24 h-3" />
					<Skeleton className="rounded-md w-20 h-4" />
				</div>

				<Skeleton className="rounded-xl w-full h-12" />
			</div>
		</div>
	);
}
