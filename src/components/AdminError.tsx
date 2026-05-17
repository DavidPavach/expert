import { motion } from "framer-motion";
import { Danger, Refresh2 } from "iconsax-reactjs";

type ErrorScreenProps = {
	message?: string;
	onRetry?: () => void;
};

const AdminError = ({
	message = "Something went wrong",
	onRetry,
}: ErrorScreenProps) => {
	return (
		<div className="z-5 fixed inset-0 flex justify-center items-center px-4">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className="flex flex-col items-center bg-card shadow p-4 md:p-6 xl:p-8 border border-border rounded-2xl w-full max-w-md text-center"
			>
				<div className="flex justify-center items-center bg-destructive/10 rounded-full size-12 md:size-14 xl:size-16">
					<Danger className="size-6 md:size-7 xl:size-8 text-destructive" />
				</div>

				<h2 className="mt-5 font-semibold text-card-foreground text-base md:text-lg xl:text-xl">
					Oops!
				</h2>

				<p className="mt-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					{message}
				</p>

				{onRetry && (
					<button
						type="button"
						onClick={onRetry}
						className="inline-flex items-center gap-2 bg-primary hover:opacity-90 mt-6 px-5 py-3 rounded-xl font-medium text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-opacity"
					>
						<Refresh2 className="size-4 md:size-4.5 xl:size-5" />
						Try Again
					</button>
				)}
			</motion.div>
		</div>
	);
};

export default AdminError;
