import WithdrawalVerification from "./Verification";

const index = () => {
	return (
		<main>
			<header className="mt-4 mb-8">
				<h1 className="font-bold text-primary text-xl md:text-2xl xl:text-3xl">
					Fund Withdrawals
				</h1>
				<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Securely withdraw your funds using various payment methods
				</p>
			</header>

			<WithdrawalVerification />
		</main>
	);
};

export default index;
