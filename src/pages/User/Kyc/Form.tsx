import {
	ArrowCircleLeft,
	ArrowCircleRight,
	DocumentText1,
	GalleryExport,
	Location,
	TagUser,
} from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useS3Upload } from "#/hooks/useS3Upload";
import { useNewKyc } from "#/services/mutations.service";
import type { KycFormData } from "./kyc";
import { INITIAL_KYC_FORM } from "./kyc";

const steps = ["Personal Info", "Address", "Documents"];

const documentTypes = [
	{
		id: "International Passport",
		title: "International Passport",
		description: "Most accepted globally",
	},
	{
		id: "National ID Card",
		title: "National ID Card",
		description: "Government issued ID",
	},
	{
		id: "Drivers License",
		title: "Driver's License",
		description: "Valid driving license",
	},
] as const;

const Form = ({ onClose }: { onClose: () => void }) => {
	const { uploadFiles } = useS3Upload();
	const [step, setStep] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState<KycFormData>(INITIAL_KYC_FORM);

	// Functions
	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: "frontSide" | "backSide",
	) => {
		const file = e.target.files?.[0] || null;

		setFormData((prev) => ({
			...prev,
			[field]: file,
		}));
	};

	const isStepValid = () => {
		if (step === 1) {
			return (
				formData.firstName &&
				formData.lastName &&
				formData.email &&
				formData.phoneNumber &&
				formData.dateOfBirth
			);
		}

		if (step === 2) {
			return (
				formData.streetAddress &&
				formData.city &&
				formData.stateProvince &&
				formData.countryNationality
			);
		}

		if (step === 3) {
			return formData.documentType && formData.frontSide && formData.backSide;
		}

		return false;
	};

	const nextStep = () => {
		if (step < 3) {
			setStep((prev) => prev + 1);
		}
	};

	const prevStep = () => {
		if (step > 1) {
			setStep((prev) => prev - 1);
		}
	};

	const toggleLoading = () => setLoading((prev) => !prev);
	const handleFileRemove = (side: "frontSide" | "backSide") => {
		setFormData((prev) => ({ ...prev, [side]: undefined }));
	};

	const newKyc = useNewKyc();
	const handleSubmit = async () => {
		toggleLoading();
		if (!formData.backSide || !formData.frontSide)
			return toast.error("Kindly select your selected Identification images");

		try {
			const frontResult = await uploadFiles([formData.frontSide]);
			const backResult = await uploadFiles([formData.backSide]);
			const frontImage = frontResult.urls[0];
			const backImage = backResult.urls[0];

			const payload = {
				...formData,
				frontSide: frontImage,
				backSide: backImage,
			};

			newKyc.mutate(payload, {
				onSuccess: () => {
					toggleLoading();
					toast.success("Your KYC is processing and currently pending");
					setFormData(INITIAL_KYC_FORM);
					onClose();
				},
				// biome-ignore lint/suspicious/noExplicitAny: false positive
				onError: (error: any) => {
					toggleLoading();
					const message =
						error?.response?.data?.message ||
						"Failed to Process KYC, Please Try Again.";
					toast.error(message);
				},
			});
		} catch (error) {
			toggleLoading();
			console.error(error);
			toast.error("Failed to Process KYC, Please Try Again.");
		}
	};

	return (
		<main className="py-6 md:py-8">
			{/* Progress */}
			<section className="bg-card/40 mb-8 p-4 md:p-6 xl:p-8 border border-border rounded-2xl">
				<div className="flex justify-between items-center mb-5">
					<h2 className="font-bold text-lg md:text-xl xl:text-2xl">
						Verification Progress
					</h2>

					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Step {step} of 3
					</p>
				</div>

				<div className="bg-muted rounded-full h-2 overflow-hidden">
					<div
						className="bg-primary rounded-full h-full transition-all"
						style={{
							width: `${(step / 3) * 100}%`,
						}}
					/>
				</div>

				<div className="flex justify-between mt-5">
					{steps.map((stepName, index) => (
						<div key={stepName} className="flex items-center gap-2">
							<div
								className={`flex justify-center items-center rounded-full size-6 md:size-7 xl:size-8 text-[11px] md:text-xs xl:text-sm ${
									step > index + 1
										? "bg-primary text-primary-foreground"
										: step === index + 1
											? "bg-primary text-primary-foreground"
											: "border border-border text-muted-foreground"
								}`}
							>
								{index + 1}
							</div>

							<span className="hidden md:block text-[11px] md:text-xs xl:text-sm">
								{stepName}
							</span>
						</div>
					))}
				</div>
			</section>

			{/* Form */}
			<section className="bg-card/40 border border-border rounded-3xl overflow-hidden">
				<header className="flex items-center gap-4 p-4 md:p-5 xl:p-6 border-border border-b">
					<div className="flex justify-center items-center bg-primary/10 rounded-lg size-12">
						{step === 1 && (
							<TagUser className="size-4 md:size-5 xl:size-6 text-primary" />
						)}

						{step === 2 && (
							<Location className="size-4 md:size-5 xl:size-6 text-primary" />
						)}

						{step === 3 && (
							<DocumentText1 className="size-4 md:size-5 xl:size-6 text-primary" />
						)}
					</div>

					<div>
						<h2 className="font-bold text-lg md:text-xl xl:text-2xl">
							Identity Verification
						</h2>

						<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							Secure your account with government-issued ID verification
						</p>
					</div>
				</header>

				<div className="p-4 md:p-6 xl:p-8">
					{/* STEP 1 */}
					{step === 1 && (
						<div className="space-y-5">
							<div className="gap-5 grid md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="firstName">First Name</Label>

									<Input
										id="firstName"
										name="firstName"
										value={formData.firstName}
										placeholder="John"
										onChange={handleChange}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="lastName">Last Name</Label>
									<Input
										id="lastName"
										name="lastName"
										value={formData.lastName}
										placeholder="Doe"
										onChange={handleChange}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										placeholder="JohnDoe@email.com"
										onChange={handleChange}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="phoneNumber">Phone Number</Label>
									<Input
										id="phoneNumber"
										name="phoneNumber"
										value={formData.phoneNumber}
										placeholder="+1 (555) 123-4567"
										onChange={handleChange}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="dateOfBirth">Date Of Birth</Label>
									<Input
										id="dateOfBirth"
										name="dateOfBirth"
										type="date"
										value={formData.dateOfBirth}
										onChange={handleChange}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="socialMediaUsername">
										Social Media Username
									</Label>
									<Input
										id="socialMediaUsername"
										name="socialMediaUsername"
										value={formData.socialMediaUsername}
										onChange={handleChange}
										placeholder="JohnDoe"
									/>
								</div>
							</div>
						</div>
					)}

					{/* STEP 2 */}
					{step === 2 && (
						<div className="space-y-5">
							<div className="space-y-2">
								<Label htmlFor="streetAddress">Street Address</Label>
								<Input
									id="streetAddress"
									name="streetAddress"
									value={formData.streetAddress}
									onChange={handleChange}
									placeholder="123 Main St."
								/>
							</div>

							<div className="gap-5 grid md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="city">City</Label>

									<Input
										id="city"
										name="city"
										value={formData.city}
										onChange={handleChange}
										placeholder="San Francisco"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="stateProvince">State/Province</Label>
									<Input
										id="stateProvince"
										name="stateProvince"
										value={formData.stateProvince}
										onChange={handleChange}
										placeholder="California"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="countryNationality">Country</Label>
								<Input
									id="countryNationality"
									name="countryNationality"
									value={formData.countryNationality}
									onChange={handleChange}
									placeholder="United States"
								/>
							</div>
						</div>
					)}

					{/* STEP 3 */}
					{step === 3 && (
						<div className="space-y-8">
							<div>
								<Label>Select Document Type</Label>

								<div className="gap-4 grid md:grid-cols-3 mt-4">
									{documentTypes.map((document) => (
										<button
											type="button"
											key={document.id}
											onClick={() =>
												setFormData((prev) => ({
													...prev,
													documentType: document.id,
												}))
											}
											className={`p-4 md:p-5 xl:p-6 border rounded-2xl text-left transition-all cursor-pointer ${
												formData.documentType === document.id
													? "border-primary bg-primary/10"
													: "border-border bg-accent/10"
											}`}
										>
											<h3 className="font-semibold">{document.title}</h3>

											<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
												{document.description}
											</p>
										</button>
									))}
								</div>
							</div>

							<div className="gap-5 grid md:grid-cols-2">
								{/* Front */}
								<div className="space-y-3">
									<Label>Front Side</Label>

									{formData.frontSide ? (
										<div className="flex justify-between items-center bg-accent/5 p-3 border border-border rounded-lg">
											<div className="flex items-center gap-3">
												<img
													src={URL.createObjectURL(formData.frontSide)}
													alt="Front preview"
													className="rounded-md w-20 h-12 object-cover"
												/>
												<div>
													<p className="font-medium">
														{formData.frontSide.name}
													</p>
													<p className="text-muted-foreground text-xs">
														{(formData.frontSide.size / 1024).toFixed(1)} KB
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<button
													type="button"
													className="text-[11px] text-destructive md:text-xs xl:text-sm cursor-pointer"
													onClick={() => handleFileRemove("frontSide")}
												>
													Remove
												</button>
												<label className="text-[11px] text-primary md:text-xs xl:text-sm cursor-pointer">
													Change
													<input
														type="file"
														accept="image/*"
														className="hidden"
														onChange={(e) => handleFileChange(e, "frontSide")}
													/>
												</label>
											</div>
										</div>
									) : (
										<label className="flex flex-col justify-center items-center bg-accent/10 hover:bg-accent/20 p-4 md:p-5 xl:p-6 border border-border border-dashed rounded-2xl min-h-55 text-center transition-all cursor-pointer">
											<GalleryExport className="mb-4 size-8 md:size-9 xl:size-10 text-muted-foreground" />
											<p className="font-semibold">Upload Front Side</p>
											<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
												PNG, JPG up to 10MB
											</p>
											<input
												type="file"
												accept="image/*"
												className="hidden"
												onChange={(e) => handleFileChange(e, "frontSide")}
											/>
										</label>
									)}
								</div>

								{/* Back */}
								<div className="space-y-3">
									<Label>Back Side</Label>

									{formData.backSide ? (
										<div className="flex justify-between items-center bg-accent/5 p-3 border border-border rounded-lg">
											<div className="flex items-center gap-3">
												<img
													src={URL.createObjectURL(formData.backSide)}
													alt="Back preview"
													className="rounded-md w-20 h-12 object-cover"
												/>
												<div>
													<p className="font-medium">
														{formData.backSide.name}
													</p>
													<p className="text-muted-foreground text-xs">
														{(formData.backSide.size / 1024).toFixed(1)} KB
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<button
													type="button"
													className="text-[11px] text-destructive md:text-xs xl:text-sm cursor-pointer"
													onClick={() => handleFileRemove("backSide")}
												>
													Remove
												</button>
												<label className="text-[11px] text-primary md:text-xs xl:text-sm cursor-pointer">
													Change
													<input
														type="file"
														accept="image/*"
														className="hidden"
														onChange={(e) => handleFileChange(e, "backSide")}
													/>
												</label>
											</div>
										</div>
									) : (
										<label className="flex flex-col justify-center items-center bg-accent/10 hover:bg-accent/20 p-6 border border-border border-dashed rounded-2xl min-h-55 text-center transition-all cursor-pointer">
											<GalleryExport className="mb-4 size-8 md:size-9 xl:size-10 text-muted-foreground" />
											<p className="font-semibold">Upload Back Side</p>
											<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
												PNG, JPG up to 10MB
											</p>
											<input
												type="file"
												accept="image/*"
												className="hidden"
												onChange={(e) => handleFileChange(e, "backSide")}
											/>
										</label>
									)}
								</div>
							</div>
						</div>
					)}

					{/* Footer */}
					<div className="flex sm:flex-row flex-col justify-between gap-4 mt-10">
						<Button
							type="button"
							variant="secondary"
							onClick={prevStep}
							disabled={step === 1}
							className="gap-2"
						>
							<ArrowCircleLeft className="size-4" />
							Previous
						</Button>

						{step < 3 ? (
							<Button
								type="button"
								onClick={nextStep}
								disabled={!isStepValid}
								className="gap-2"
							>
								Continue
								<ArrowCircleRight className="size-4" />
							</Button>
						) : (
							<Button
								type="button"
								onClick={handleSubmit}
								disabled={!isStepValid || loading || newKyc.isPending}
								className="gap-2"
							>
								{loading || newKyc.isPending ? (
									<Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
								) : (
									"Submit KYC"
								)}
							</Button>
						)}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Form;
