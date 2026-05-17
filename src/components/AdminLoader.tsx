import { motion } from "framer-motion";

const AdminLoader = () => {
	return (
		<div className="z-5 fixed inset-0 flex justify-center items-center bg-background">
			<div className="flex flex-col items-center gap-4">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{
						duration: 1,
						repeat: Infinity,
						ease: "linear",
					}}
					className="border-4 border-primary border-t-transparent rounded-full size-12"
				/>

				<motion.p
					initial={{ opacity: 0.4 }}
					animate={{ opacity: [0.4, 1, 0.4] }}
					transition={{
						duration: 1.5,
						repeat: Infinity,
					}}
					className="font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm"
				>
					Loading...
				</motion.p>
			</div>
		</div>
	);
};

export default AdminLoader;
