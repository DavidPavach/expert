import QuickTradeCard from "./Quick";
import Summary from "./Summary";
import VerificationBanner from "./Verification";
import Widget from "./Widget";

const index = () => {
	return (
		<main className="space-y-5">
			<Summary />
			<VerificationBanner />
			<section className="flex min-[600px]:flex-row flex-col gap-5">
				<div className="bg-card p-4 border border-card rounded-2xl w-full md:w-1/2 lg:w-[60%] h-fit min-h-100">
					<Widget />
				</div>
				<div className="w-full md:w-1/2 lg:w-[40%]">
					<QuickTradeCard />
				</div>
			</section>
		</main>
	);
};

export default index;
