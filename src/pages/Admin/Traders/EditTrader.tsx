import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";

// Components
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

// Services
import { useAdminUpdateTrader } from "#/services/mutations.service";
import { hasDiff } from "#/utils/format";

type EditTraderFormProps = {
	trader: Trader;
	onClose: () => void;
};

type FormState = UpdateTraderPayload;

const NUMBER_FIELDS: {
	name: string;
	field: keyof Pick<
		NewTraderPayload,
		| "ratings"
		| "ratingsTotal"
		| "winRate"
		| "totalReturn"
		| "equity"
		| "totalTrades"
		| "minInvestment"
		| "totalFollowers"
	>;
}[] = [
	{
		name: "Ratings",
		field: "ratings",
	},
	{
		name: "Ratings Total",
		field: "ratingsTotal",
	},
	{
		name: "Win Rate",
		field: "winRate",
	},
	{
		name: "Total Return",
		field: "totalReturn",
	},
	{
		name: "Equity",
		field: "equity",
	},
	{
		name: "Total Trades",
		field: "totalTrades",
	},
	{
		name: "Minimum Investment",
		field: "minInvestment",
	},
	{
		name: "Followers",
		field: "totalFollowers",
	},
];

const EditTraderForm = ({ trader, onClose }: EditTraderFormProps) => {
	const updateTrader = useAdminUpdateTrader();

	const [formData, setFormData] = useState<FormState>({
		name: trader.name,
		title: trader.title,
		bio: trader.bio,
		active: trader.active,
		ratings: trader.ratings,
		ratingsTotal: trader.ratingsTotal,
		winRate: trader.winRate,
		totalReturn: trader.totalReturn,
		equity: trader.equity,
		totalTrades: trader.totalTrades,
		minInvestment: trader.minInvestment,
		totalFollowers: trader.totalFollowers,
	});

	const hasChanges = hasDiff(formData, {
		name: trader.name,
		title: trader.title,
		bio: trader.bio,
		active: trader.active,
		ratings: trader.ratings,
		ratingsTotal: trader.ratingsTotal,
		winRate: trader.winRate,
		totalReturn: trader.totalReturn,
		equity: trader.equity,
		totalTrades: trader.totalTrades,
		minInvestment: trader.minInvestment,
		totalFollowers: trader.totalFollowers,
	});

	// Functions
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		if (!hasChanges) {
			toast.warning("No changes detected.");
			return;
		}

		updateTrader.mutate(
			{
				id: trader._id,
				data: formData,
			},
			{
				onSuccess: () => {
					toast.success("Trader updated successfully!");
					onClose();
				},
				onError: (error: Error) => {
					toast.error(error.message ?? "Failed to update trader.");
				},
			},
		);
	};

	return (
		<main className="mx-auto w-full max-w-5xl">
			<header className="mb-8">
				<h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
					Edit Trader
				</h1>
				<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Update trader profile and performance metrics
				</p>
			</header>

			<section className="space-y-8">
				<div className="gap-5 grid md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							name="title"
							value={formData.title}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="bio">Bio</Label>
					<textarea
						id="bio"
						name="bio"
						value={formData.bio}
						onChange={handleChange}
						rows={5}
						className="mt-1 px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-[11px] placeholder:text-muted-foreground md:placeholder:text-xs xl:placeholder:text-sm transition-all resize-none"
					/>
				</div>
				<div className="gap-4 grid md:grid-cols-2 xl:grid-cols-4">
					{NUMBER_FIELDS.map((field) => (
						<div key={field.field} className="space-y-2">
							<Label htmlFor={field.field}>{field.name}</Label>

							<Input
								type="number"
								id={field.field}
								name={field.field}
								value={formData[field.field] ?? 0}
								onChange={(e) => {
									setFormData((prev) => ({
										...prev,
										[field.field]: Number(e.target.value),
									}));
								}}
							/>
						</div>
					))}
				</div>
				<div className="flex items-center gap-3">
					<input
						type="checkbox"
						id="active"
						checked={formData.active}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								active: e.target.checked,
							}))
						}
						className="rounded-md size-4 cursor-pointer"
					/>

					<Label htmlFor="active">Trader Active</Label>
				</div>

				<div className="mt-3">
					<Button
						onClick={handleSubmit}
						disabled={updateTrader.isPending || !hasChanges}
						className="gap-2 w-full"
					>
						{updateTrader.isPending ? (
							<>
								<Loader2 className="size-5 animate-spin" />
								Updating Trader...
							</>
						) : (
							<>
								<CheckCircle2 className="size-5" />
								Update Trader
							</>
						)}
					</Button>
				</div>
			</section>
		</main>
	);
};

export default EditTraderForm;
