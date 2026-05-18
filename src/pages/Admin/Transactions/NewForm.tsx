import { Gallery } from "iconsax-reactjs";
import { CheckCircle2, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import UserSelector from "#/components/UserSelect";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	ACCEPTED_IMAGE_TYPES,
	MAX_FILE_SIZE,
	TRANSACTION_STATUS,
	TRANSACTION_TYPES,
} from "#/enum";
import { useS3Upload } from "#/hooks/useS3Upload";
import { useAdminNewTx } from "#/services/mutations.service";

type FormState = {
	type: string;
	coinName: string;
	coinSymbol: string;
	amount: string;
	hash?: File | null;
	walletAddress?: string;
	status: string;
};

const initialFormState: FormState = {
	type: "BONUS",
	coinName: "",
	coinSymbol: "",
	amount: "0",
	hash: null,
	walletAddress: "",
	status: "PENDING",
};
const NewForm = () => {
	const [selectedUser, setSelectedUser] = useState<string>("");
	const [formData, setFormData] = useState<FormState>(initialFormState);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const { uploadFiles } = useS3Upload();

	// Functions
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
		setFormData((prev) => ({ ...prev, hash: file }));
		e.target.value = "";
	};

	const reset = () => {
		setFormData(initialFormState);
		setSelectedUser("");
	};

	const newTx = useAdminNewTx();
	const handleSubmit = async () => {
		if (!selectedUser.trim())
			return toast.error("Kindly select a user before proceeding");
		if (formData.type === "DEPOSIT" && !formData.hash)
			return toast.error(
				"The Transaction evidence is needed, kindly select one.",
			);
		if (formData.type === "WITHDRAWAL" && !formData.walletAddress)
			return toast.error("The wallet address is needed, kindly enter one.");
		if (
			!formData.coinName.trim() ||
			!formData.coinSymbol.trim() ||
			!formData.amount.trim() ||
			!formData.type.trim()
		) {
			return toast.error(
				"Incomplete Information, kindly enter all necessary fields. ",
			);
		}
		try {
			let uploadedUrl = "";
			if (formData.hash) {
				const result = await uploadFiles([formData.hash]);
				uploadedUrl = result.urls[0];
			}
			const payload = {
				type: formData.type,
				cryptoSymbol: `${formData.coinName.toLowerCase()} ${formData.coinSymbol.toLowerCase()}`,
				amount: parseInt(formData.amount, 10),
				hash: uploadedUrl,
				wallerAddress: formData.walletAddress,
				status: formData.status,
			};
			newTx.mutate(
				{ id: selectedUser, data: payload },
				{
					onSuccess: () => {
						toast.success("Settings Updated !!!");
						reset();
					},
					// biome-ignore lint/suspicious/noExplicitAny: false positive
					onError: (error: any) => {
						const message =
							error?.response?.data?.message ||
							"Failed to Update, Please Try Again.";
						toast.error(message);
					},
				},
			);
		} catch (err) {
			console.error(err);
			toast.error("Failed to Update, Please Try Again.");
		}
	};

	return (
		<main>
			<header className="mb-8 text-center">
				<h1 className="font-bold text-lg md:text-xl xl:text-2xl capitalize">
					Create New Transaction
				</h1>
				<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Add transaction details and confirm to save.
				</p>
			</header>
			<section className="space-y-5">
				<UserSelector value={selectedUser} onSelect={setSelectedUser} />
				<div className="space-y-2">
					<Label htmlFor="type">Transaction Type</Label>
					<select
						name="type"
						id="type"
						value={formData.type}
						onChange={handleChange}
						className="hover:bg-accent/20 px-4 py-3 border border-border focus:border-accent/20 rounded-md outline-none focus:ring-0 w-full text-foreground capitalize transition-all duration-300 appearance-none cursor-pointer"
					>
						{TRANSACTION_TYPES.map((type) => (
							<option
								key={type}
								value={type}
								className="bg-background text-foreground capitalize"
							>
								{type}
							</option>
						))}
					</select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="coinName">Coin Name</Label>
					<Input
						type="text"
						id="coinName"
						name="coinName"
						value={formData.coinName}
						onChange={handleChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="coinSymbol">Coin Symbol</Label>
					<Input
						type="text"
						id="coinSymbol"
						name="coinSymbol"
						value={formData.coinSymbol}
						onChange={handleChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="amount">Amount</Label>
					<Input
						type="number"
						id="amount"
						name="amount"
						value={formData.amount}
						onChange={handleChange}
					/>
				</div>
				{formData.type === "WITHDRAWAL" && (
					<div className="space-y-2">
						<Label htmlFor="walletAddress">Wallet Address</Label>
						<Input
							type="text"
							id="walletAddress"
							name="walletAddress"
							value={formData.walletAddress}
							onChange={handleChange}
						/>
					</div>
				)}
				{formData.type === "DEPOSIT" && (
					<>
						<Label htmlFor="hash">Transaction Evidence</Label>
						<div className="flex justify-center items-center gap-3 hover:bg-primary/20 px-4 py-6 border border-border border-dashed rounded-xl transition-colors cursor-pointer">
							{selectedImage ? (
								<>
									<img
										src={selectedImage}
										alt="profile"
										className="rounded size-20 md:size-24 xl:size-32 object-cover"
									/>
									{formData?.hash?.name}
								</>
							) : (
								<>
									<Gallery size={20} />
									<span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
										Upload Transaction Evidence
									</span>
								</>
							)}

							<input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								className="hidden"
								required
							/>
						</div>
					</>
				)}
				<div className="space-y-2">
					<Label htmlFor="status">Update Status</Label>
					<select
						name="status"
						id="status"
						value={formData.status}
						onChange={handleChange}
						className="hover:bg-accent/20 px-4 py-3 border border-border focus:border-accent/20 rounded-md outline-none focus:ring-0 w-full text-foreground capitalize transition-all duration-300 appearance-none cursor-pointer"
					>
						{TRANSACTION_STATUS.map((status) => (
							<option
								key={status}
								value={status}
								className="bg-background text-foreground capitalize"
							>
								{status}
							</option>
						))}
					</select>
				</div>
			</section>
			<Button
				onClick={handleSubmit}
				disabled={newTx.isPending}
				className="gap-2 mt-8 w-full h-12"
			>
				{newTx.isPending ? (
					<>
						<Loader className="size-5 animate-spin" />
						Creating...
					</>
				) : (
					<>
						<CheckCircle2 className="size-5" />
						New Transaction
					</>
				)}
			</Button>
		</main>
	);
};

export default NewForm;
