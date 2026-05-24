const rows = Array.from({ length: 6 }, (_, index) => `row-${index}`);

export default function ReferralLoader() {
	return (
		<section className="bg-card/80 shadow-xl backdrop-blur-md border border-border rounded-2xl overflow-hidden animate-pulse">
			{/* Header */}
			<div className="flex justify-between items-center px-4 md:px-6 py-4 border-border border-b">
				<div className="space-y-2">
					<div className="bg-muted rounded-md w-32 h-5" />
					<div className="bg-muted rounded-md w-48 h-3" />
				</div>

				<div className="bg-muted rounded-xl w-24 h-10" />
			</div>

			{/* Desktop Table */}
			<div className="hidden md:block overflow-x-auto">
				<table className="w-full">
					<thead className="bg-muted/20 border-border border-b">
						<tr>
							{["User", "Joined", "Reward", "Status"].map((item) => (
								<th
									key={item}
									className="px-6 py-4 font-medium text-muted-foreground text-xs xl:text-sm text-left"
								>
									{item}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{rows.map((row) => (
							<tr
								key={row}
								className="border-border/60 border-b last:border-none"
							>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="bg-muted rounded-full size-12" />

										<div className="space-y-2">
											<div className="bg-muted rounded-md w-28 h-4" />
											<div className="bg-muted rounded-md w-40 h-3" />
										</div>
									</div>
								</td>

								<td className="px-6 py-4">
									<div className="bg-muted rounded-md w-24 h-4" />
								</td>

								<td className="px-6 py-4">
									<div className="bg-muted rounded-md w-16 h-4" />
								</td>

								<td className="px-6 py-4">
									<div className="bg-muted rounded-full w-20 h-7" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile Cards */}
			<div className="md:hidden divide-y divide-border">
				{rows.map((row) => (
					<div key={row} className="space-y-4 p-4">
						<div className="flex items-center gap-3">
							<div className="bg-muted rounded-full size-12" />

							<div className="flex-1 space-y-2">
								<div className="bg-muted rounded-md w-28 h-4" />
								<div className="bg-muted rounded-md w-36 h-3" />
							</div>
						</div>

						<div className="gap-3 grid grid-cols-2">
							<div className="bg-muted/20 p-3 rounded-xl">
								<div className="bg-muted mb-2 rounded-md w-16 h-3" />
								<div className="bg-muted rounded-md w-20 h-4" />
							</div>

							<div className="bg-muted/20 p-3 rounded-xl">
								<div className="bg-muted mb-2 rounded-md w-16 h-3" />
								<div className="bg-muted rounded-md w-14 h-4" />
							</div>
						</div>

						<div className="bg-muted rounded-full w-24 h-8" />
					</div>
				))}
			</div>
		</section>
	);
}
