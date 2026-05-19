import { Gallery } from "iconsax-reactjs";
import { CheckCircle2, CircleCheckBig, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "#/enum";
import { useS3Upload } from "#/hooks/useS3Upload";
import { useAdminNewTrader } from "#/services/mutations.service";

type FormState = {
	name: string;
	title: string;
	bio: string;
	profilePicture: File | null;
	active: boolean;
	ratings: number;
	ratingsTotal: number;
	winRate: number;
	totalReturn: number;
	equity: number;
	totalTrades: number;
	minInvestment: number;
	totalFollowers: number;
};

const initialFormState: FormState = {
	name: "",
	title: "",
	bio: "",
	profilePicture: null,
	active: false,
	ratings: 0,
	ratingsTotal: 0,
	winRate: 0,
	totalReturn: 0,
	equity: 0,
	totalTrades: 0,
	minInvestment: 0,
	totalFollowers: 0,
};

type NumberField = {
	field: keyof FormState;
	name: string;
};

const NUMBER_FIELDS: NumberField[] = [
	{ name: "Ratings", field: "ratings" },
	{ name: "Total Ratings", field: "ratingsTotal" },
	{ name: "Win Rate", field: "winRate" },
	{ name: "Total Return", field: "totalReturn" },
	{ name: "Equity", field: "equity" },
	{ name: "Total Trades", field: "totalTrades" },
	{ name: "Minimum Investment", field: "minInvestment" },
	{ name: "Total Followers", field: "totalFollowers" },
];

const NewForm = ({ onClose }: { onClose: () => void }) => {
	const [formData, setFormData] = useState<FormState>(initialFormState);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const { uploadFiles } = useS3Upload();

	// Functions
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (!file) return;

		if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
			toast.error("Only valid image formats are allowed.");
			e.target.value = "";
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			toast.error("Image must be less than 50MB.");
			e.target.value = "";
			return;
		}

		const imageUrl = URL.createObjectURL(file);

		setSelectedImage((prev) => {
			if (prev) {
				URL.revokeObjectURL(prev);
			}
			return imageUrl;
		});
		setFormData((prev) => ({ ...prev, profilePicture: file }));
		e.target.value = "";
	};

	const newTrader = useAdminNewTrader();
	const handleSubmit = async () => {
		if (
			!formData.name.trim() ||
			!formData.title.trim() ||
			!formData.bio.trim() ||
			!formData.profilePicture
		) {
			return toast.error("Kindly Fill all the Required fields");
		}
		try {
			const result = await uploadFiles([formData.profilePicture]);
			const payload = { ...formData, profilePicture: result.urls[0] };
			newTrader.mutate(payload, {
				onSuccess: () => {
					toast.success("Trader Added !!!");
					setFormData(initialFormState);
					onClose();
				},
				// biome-ignore lint/suspicious/noExplicitAny: false positive
				onError: (error: any) => {
					const message =
						error?.response?.data?.message ||
						"Failed to add trader, Please Try Again.";
					toast.error(message);
				},
			});
		} catch (err) {
			console.error(err);
			toast.error("Failed to add trader, Please Try Again.");
		}
	};

	return (
		<main>
			<header className="mb-8 text-center">
				<h1 className="font-bold text-lg md:text-xl xl:text-2xl capitalize">
					Create New Trader
				</h1>
				<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Add a new trader details, confirm to save.
				</p>
			</header>
			<section className="space-y-5">
				<div className="space-y-2">
					<Label htmlFor="name">Trader's Name</Label>
					<Input
						placeholder="John Doe"
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="title">Title</Label>
					<Input
						placeholder="Forex Expert"
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="bio">Bio</Label>
					<textarea
						placeholder="Fixed income and bond trading expert with institutional..."
						name="bio"
						id="bio"
						className={`py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring w-full text-foreground placeholder:text-muted-foreground transition-all px-4 mt-1 placeholder:text-[11px] md:placeholder:text-xs xl:placeholder:text-sm resize-none`}
						value={formData.bio}
						onChange={handleChange}
					></textarea>
				</div>
				{NUMBER_FIELDS.map((field) => (
					<div key={field.field} className="space-y-2">
						<Label htmlFor={field.field}>{field.name}</Label>
						<Input
							placeholder={field.name}
							type="number"
							id={field.field}
							name={field.field}
							value={formData[field.field] as string}
							onChange={(e) => {
								const val =
									e.target.value === "" ? "" : parseInt(e.target.value, 10);
								setFormData((prev) => ({ ...prev, [field.field]: val }));
							}}
						/>
					</div>
				))}

				<span className="block mb-2">Profile Picture</span>
				<label className="flex justify-center items-center gap-3 hover:bg-primary/20 px-4 py-6 border border-border border-dashed rounded-xl transition-colors cursor-pointer">
					{selectedImage ? (
						<>
							<img
								src={selectedImage}
								alt="profile"
								className="rounded size-20 md:size-24 xl:size-32 object-cover"
							/>
							{formData?.profilePicture?.name}
						</>
					) : (
						<>
							<Gallery size={20} />
							<span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								Upload Trader's Picture
							</span>
						</>
					)}

					<input
						type="file"
						accept=".jpg,.jpeg,.png,.gif,.webp,.svg"
						onChange={handleFileChange}
						className="hidden"
						required
					/>
				</label>

				<label
					htmlFor="agreement"
					className="group flex items-center gap-x-3 cursor-pointer"
				>
					<button
						type="button"
						onClick={() =>
							setFormData((prev) => ({ ...prev, active: !formData.active }))
						}
						className={`mt-0.5 size-5 rounded-sm border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
							formData.active
								? "bg-primary border-primary"
								: "border-border group-hover:border-primary/50"
						}`}
					>
						{formData.active && (
							<CircleCheckBig className="size-3 text-primary-foreground" />
						)}
					</button>
					<p
						onClick={() =>
							setFormData((prev) => ({ ...prev, active: !formData.active }))
						}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								setFormData((prev) => ({ ...prev, active: !formData.active }));
							}
						}}
						className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed"
					>
						{formData.active ? "Set InActive" : "Set Active"}
					</p>
				</label>
				<Button
					onClick={handleSubmit}
					disabled={newTrader.isPending}
					className="gap-2 mt-8 w-full h-10"
				>
					{newTrader.isPending ? (
						<>
							<Loader className="size-5 animate-spin" />
							Adding...
						</>
					) : (
						<>
							<CheckCircle2 className="size-5" />
							Add Trader
						</>
					)}
				</Button>
			</section>
		</main>
	);
};

export default NewForm;
