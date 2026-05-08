interface StepProps {
	steps: {
		id: number;
		label: string;
		sub: string;
	}[];
	currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepProps) {
	return (
		<div className="flex justify-center items-start gap-0 mb-4">
			{steps.map((step, idx) => {
				const isCompleted = currentStep > step.id;
				const isActive = currentStep === step.id;

				return (
					<div key={step.id} className="flex items-start">
						<div className="flex flex-col items-center min-w-20 md:min-w-25">
							{/* Circle */}
							<div
								className={`size-8 md:size-9 xl:size-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm transition-all duration-300 ${
									isCompleted
										? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
										: isActive
											? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/20"
											: "bg-muted text-muted-foreground border border-border"
								}`}
							>
								{isCompleted ? (
									<svg
										className="size-4"
										fill="none"
										stroke="currentColor"
										strokeWidth={2.5}
										viewBox="0 0 24 24"
									>
										<title>Step completed</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								) : (
									step.id
								)}
							</div>

							{/* Labels */}
							<p
								className={`mt-2 text-[10px] md:text-[11px] xl:text-xs font-semibold text-center ${isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"}`}
							>
								{step.label}
							</p>
							<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs text-center leading-tight">
								{step.sub}
							</p>
						</div>

						{/* Connector line */}
						{idx < steps.length - 1 && (
							<div className="flex-1 mx-1 md:mx-2 mt-4.5 md:mt-5">
								<div
									className={`h-0.5 w-full transition-all duration-500 ${currentStep > step.id ? "bg-primary" : "bg-border"}`}
								/>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
