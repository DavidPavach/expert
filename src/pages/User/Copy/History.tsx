import { Clock } from "iconsax-reactjs";
import Table from "./Table";

const History = ({ tradings }: { tradings: CopyTrading[] }) => {
	return (
		<main className="bg-card/80 shadow-xl backdrop-blur-md mt-10 border border-border rounded-2xl overflow-hidden">
			<div className="bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-4 md:px-6 xl:px-8 py-7 border-border border-b">
				<header className="flex items-center gap-x-2">
					<Clock className="size-4 md:size-4.5 xl:size-5" />
					<h1 className="font-bold text-foreground text-sm md:text-base xl:text-lg">
						Copy Trading History
					</h1>
				</header>
				<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Previous copy positions and their performance
				</p>
			</div>
			<Table tradings={tradings} />
		</main>
	);
};

export default History;
