import {
	Camera,
	Danger,
	Edit2,
	Eye,
	EyeSlash,
	Global,
	InfoCircle,
	Lock1,
	Profile,
	SecuritySafe,
	Sms,
	TagUser,
	Verify,
} from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "react-fox-toast";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "#/enum";
import { useUpdateProfile } from "#/services/mutations.service";
import { useMeStore } from "#/stores/me.store";
import { useS3Upload } from "@/hooks/useS3Upload";

export default function ProfilePage() {
	const { user } = useMeStore();
	const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [profileData, setProfileData] = useState<Record<string, string>>({});

	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [passwords, setPasswords] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const { uploadFiles, status } = useS3Upload();

	// Functions
	const onChange = (name: string, value: string) => {
		setProfileData((prev) => ({ ...prev, [name]: value }));
	};

	const passwordStrength = useMemo(() => {
		const password = passwords.newPassword;

		let score = 0;

		if (password.length >= 8) score++;
		if (/[A-Z]/.test(password)) score++;
		if (/[0-9]/.test(password)) score++;
		if (/[^A-Za-z0-9]/.test(password)) score++;

		return score;
	}, [passwords.newPassword]);

	const strengthColor = useMemo(() => {
		if (passwordStrength <= 1) return "bg-red-500";
		if (passwordStrength === 2) return "bg-yellow-500";
		if (passwordStrength === 3) return "bg-blue-500";
		return "bg-green-500";
	}, [passwordStrength]);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

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

		try {
			const result = await uploadFiles([file]);
			updateProfile.mutate(
				{ profilePicture: result.urls[0] },
				{
					onSuccess: () => {
						toast.success("Profile Picture Updated !!!");
					},
					// biome-ignore lint/suspicious/noExplicitAny: false positive
					onError: (error: any) => {
						const message =
							error?.response?.data?.message ||
							"Failed to Update Profile Picture, Please Try Again.";
						toast.error(message);
					},
				},
			);
		} catch (err) {
			console.error(err);
			toast.error("Failed to Update Profile Picture, Please Try Again.");
		}

		e.target.value = "";
	};

	// Handle Submit
	const updateProfile = useUpdateProfile();
	const handleSubmit = () => {
		if (passwords.newPassword?.trim()) {
			if (!passwords.currentPassword?.trim()) {
				return toast.error("Please enter your current password.");
			}

			if (passwords.currentPassword !== user?.bare) {
				return toast.error("Current password does not match.");
			}

			if (!passwords.confirmPassword?.trim()) {
				return toast.error("Please confirm your new password.");
			}

			if (passwords.newPassword !== passwords.confirmPassword) {
				return toast.error("Passwords do not match. Kindly check.");
			}
		}
		const payload = {
			...profileData,
			...(passwords.newPassword ? { password: passwords.newPassword } : {}),
		};
		updateProfile.mutate(payload, {
			onSuccess: () => {
				toast.success("Profile Updated !!!");
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positive
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to Update, Please Try Again.";
				toast.error(message);
			},
		});
	};

	return (
		<main>
			<section className="bg-card/70 shadow backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
				{/* Header */}
				<div className="relative bg-linear-to-br from-primary via-secondary to-accent px-4 md:px-6 xl:px-8 py-10 md:py-14 overflow-hidden text-center">
					<div className="z-2 relative">
						{/* Avatar */}
						<div className="group relative mx-auto w-fit">
							<div className="relative shadow-2xl border-2 border-border rounded-full size-24 md:size-28 xl:size-32 overflow-hidden">
								{selectedImage ? (
									<img
										src={selectedImage}
										alt="profile"
										className="w-full h-full object-cover"
									/>
								) : (
									<img src={user?.profilePicture} alt="Profile" />
								)}

								{/* Desktop Hover */}
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="hidden absolute inset-0 md:flex justify-center items-center bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
								>
									<div className="flex justify-center items-center bg-primary/30 backdrop-blur-md rounded-full size-10 md:size-12 xl:size-14">
										<Camera
											className="size-5 md:size-6 xl:size-7"
											variant="Bold"
										/>
									</div>
								</button>
							</div>

							{/* Mobile Button */}
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								className="md:hidden -right-2 bottom-1 absolute flex justify-center items-center bg-primary shadow-lg rounded-full size-8 sm:size-10 text-primary-foreground cursor-pointer"
							>
								<Camera className="size-4 sm:size-5" variant="Bold" />
							</button>

							<input
								ref={fileInputRef}
								type="file"
								hidden
								disabled={status !== "idle"}
								accept=".jpg,.jpeg,.png,.gif,.webp,.svg"
								onChange={handleImageChange}
							/>
						</div>

						<h1 className="mt-5 font-bold text-2xl md:text-3xl xl:text-4xl capitalize tracking-tight">
							{user?.fullName}
						</h1>

						<p className="text-sm md:text-base xl:text-lg first-letter:uppercase">
							{user?.email}
						</p>

						<div className="inline-flex items-center gap-x-2 bg-background/50 backdrop-blur-md mt-5 px-4 py-2 border border-border/10 rounded-full text-xs md:text-sm">
							<Verify className="size-4" variant="Bold" />
							Verified Trading Account
						</div>
					</div>
				</div>

				{/* Tabs */}
				<div className="flex items-center gap-x-2 px-4 md:px-6 border-border border-b overflow-x-auto hide-scrollbar">
					<button
						type="button"
						onClick={() => setActiveTab("profile")}
						className={`flex items-center gap-x-2 px-4 cursor-pointer py-4 border-b-2 font-medium transition-all duration-300 whitespace-nowrap ${
							activeTab === "profile"
								? "border-primary text-primary"
								: "border-transparent text-muted-foreground hover:text-foreground"
						}`}
					>
						<Profile className="size-5" variant="Outline" />
						Personal Information
					</button>

					<button
						type="button"
						onClick={() => setActiveTab("security")}
						className={`flex items-center gap-x-2 cursor-pointer px-4 py-4 border-b-2 font-medium transition-all duration-300 whitespace-nowrap ${
							activeTab === "security"
								? "border-primary text-primary"
								: "border-transparent text-muted-foreground hover:text-foreground"
						}`}
					>
						<SecuritySafe className="size-5" variant="Outline" />
						Security
					</button>
				</div>

				{/* Content */}
				<div className="p-4 md:p-6 xl:p-8">
					{activeTab === "profile" ? (
						<div>
							{/* Notice */}
							<div className="flex items-start gap-x-3 bg-primary/10 mb-8 px-4 py-4 border border-primary/20 rounded-2xl">
								<InfoCircle
									className="mt-0.5 min-w-5 size-4 md:size-4.5 xl:size-5 text-primary"
									variant="Bold"
								/>

								<p className="text-[11px] text-primary md:text-xs xl:text-sm leading-relaxed">
									Your personal information helps us personalize your experience
									and maintain account security.
								</p>
							</div>

							{/* Fields */}
							<div className="space-y-6">
								{[
									{
										label: "Full Name",
										icon: TagUser,
										field: "fullName",
										value: profileData.fullName || user?.fullName,
										helper: "Your display name on the platform",
									},
									{
										label: "Phone Number",
										icon: Sms,
										field: "phoneNumber",
										value: profileData.phoneNumber || user?.phoneNumber,
										helper: "Used for account verification",
									},
									{
										label: "Email Address",
										icon: Sms,
										field: "email",

										value: user?.email,
										helper: "Primary email address",
										disabled: true,
									},
									{
										label: "Country",
										icon: Global,
										field: "country",
										value: profileData.country || user?.country,
										helper: "Current account region",
									},
									{
										label: "Username",
										icon: Edit2,
										field: "username",
										value: user?.username,
										helper: "Unique platform identifier",
										disabled: true,
									},
								].map((field) => {
									const Icon = field.icon;

									return (
										<div
											key={field.label}
											className="gap-2 grid grid-cols-1 lg:grid-cols-[260px_1fr]"
										>
											<div>
												<h3 className="font-semibold">{field.label}</h3>
												<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
													{field.helper}
												</p>
											</div>

											<div>
												<div
													className={`flex items-center gap-x-3 bg-accent/10 px-4 border rounded-xl h-10 md:h-12 xl:h-14 ${
														field.disabled
															? "border-border/60 opacity-80"
															: "border-border focus-within:border-primary/30"
													}`}
												>
													<Icon
														className="size-4 md:size-4.5 xl:size-5 text-muted-foreground"
														variant="Outline"
													/>

													<input
														onChange={(e) =>
															onChange(field.field, e.target.value)
														}
														value={field.value}
														disabled={field.disabled}
														className={`${field.disabled ? "cursor-not-allowed" : "cursor-pointer"} bg-transparent outline-none w-full`}
													/>
												</div>
												{field.disabled && (
													<p className="mt-2 text-[11px] text-destructive/80 md:text-xs xl:text-sm capitalize">
														<Danger className="inline mr-0.5 mb-0.5 size-3 md:size-3.5 xl:size-4" />{" "}
														{field.label} cannot be changed
													</p>
												)}
											</div>
										</div>
									);
								})}
							</div>

							{/* Save */}
							<div className="flex justify-end mt-10">
								<button
									onClick={handleSubmit}
									disabled={updateProfile.isPending}
									type="button"
									className="flex items-center gap-x-2 bg-primary hover:opacity-90 px-6 py-3 rounded-2xl font-semibold text-primary-foreground transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
								>
									{updateProfile.isPending ? (
										<>
											<Loader className="size-4 md:size-4.5 xl:size-5 animate-spin" />
											Saving
										</>
									) : (
										<>
											<Edit2
												className="size-4 md:size-4.5 xl:size-5"
												variant="Bold"
											/>
											Save Changes
										</>
									)}
								</button>
							</div>
						</div>
					) : (
						<div>
							{/* Security Notices */}
							<div className="space-y-4">
								<div className="flex items-start gap-x-3 bg-violet-900/10 dark:bg-violet-500/10 px-4 py-4 border border-violet-500/20 rounded-2xl">
									<SecuritySafe
										className="mt-0.5 min-w-5 size-4 md:size-4.5 xl:size-5 text-violet-800 dark:text-violet-400"
										variant="Bold"
									/>

									<p className="text-[11px] text-700 dark:text-violet-300 md:text-xs xl:text-sm leading-relaxed">
										Strong passwords help protect your account and financial
										assets.
									</p>
								</div>

								<div className="flex items-start gap-x-3 bg-primary/10 px-4 py-4 border border-primary/20 rounded-2xl">
									<Lock1
										className="mt-0.5 min-w-5 size-5 text-primary"
										variant="Bold"
									/>

									<p className="text-[11px] text-primary md:text-xs xl:text-sm leading-relaxed">
										Use a unique password you do not use elsewhere.
									</p>
								</div>
							</div>

							{/* Password Fields */}
							<div className="gap-5 grid grid-cols-1 md:grid-cols-2 mt-8">
								{/* Current */}
								<div>
									<label
										htmlFor="currentPassword"
										className="block mb-3 font-medium"
									>
										Current Password
									</label>

									<div className="flex items-center gap-x-3 bg-accent/10 px-4 border border-border focus-within:border-primary/30 rounded-xl h-10 md:h-12 xl:h-14">
										<Lock1
											className="size-4 md:size-4.5 xl:size-5 text-muted-foreground"
											variant="Outline"
										/>

										<input
											id="currentPassword"
											type={showCurrentPassword ? "text" : "password"}
											placeholder="Enter current password"
											value={passwords.currentPassword}
											onChange={(e) =>
												setPasswords({
													...passwords,
													currentPassword: e.target.value,
												})
											}
											className="bg-transparent outline-none w-full"
										/>

										<button
											type="button"
											onClick={() =>
												setShowCurrentPassword(!showCurrentPassword)
											}
										>
											{showCurrentPassword ? (
												<EyeSlash
													className="size-4 md:size-4.5 xl:size-5 text-muted-foreground"
													variant="Outline"
												/>
											) : (
												<Eye
													className="size-4 md:size-4.5 xl:size-5 text-muted-foreground"
													variant="Outline"
												/>
											)}
										</button>
									</div>
								</div>

								{/* New */}
								<div>
									<label htmlFor="password" className="block mb-3 font-medium">
										New Password
									</label>

									<div className="flex items-center gap-x-3 bg-accent/10 px-4 border border-border focus-within:border-primary/30 rounded-xl h-10 md:h-12 xl:h-14">
										<Lock1
											className="size-5 text-muted-foreground"
											variant="Outline"
										/>

										<input
											id="password"
											type={showNewPassword ? "text" : "password"}
											placeholder="Enter new password"
											value={passwords.newPassword}
											onChange={(e) =>
												setPasswords({
													...passwords,
													newPassword: e.target.value,
												})
											}
											className="bg-transparent outline-none w-full"
										/>

										<button
											type="button"
											className="cursor-pointer"
											onClick={() => setShowNewPassword(!showNewPassword)}
										>
											{showNewPassword ? (
												<EyeSlash
													className="size-4 md:size-4.5 xl:size-5 text-muted-foreground"
													variant="Outline"
												/>
											) : (
												<Eye
													className="size-4 md:size-4.5 xl:size-5 text-muted-foreground"
													variant="Outline"
												/>
											)}
										</button>
									</div>

									{/* Strength */}
									<div className="mt-4">
										<div className="flex justify-between items-center mb-2">
											<span className="text-muted-foreground text-xs">
												Password Strength
											</span>

											<span className="font-medium text-xs">
												{passwordStrength <= 1
													? "Weak"
													: passwordStrength === 2
														? "Fair"
														: passwordStrength === 3
															? "Good"
															: "Strong"}
											</span>
										</div>

										<div className="bg-muted rounded-full w-full h-2 overflow-hidden">
											<div
												className={`h-full transition-all duration-300 ${strengthColor}`}
												style={{
													width: `${passwordStrength * 25}%`,
												}}
											/>
										</div>
									</div>
								</div>

								{/* Confirm */}
								<div className="md:col-span-2">
									<label
										htmlFor="confirmPassword"
										className="block mb-3 font-medium"
									>
										Confirm Password
									</label>

									<div className="flex items-center gap-x-3 bg-accent/10 px-4 border border-border focus-within:border-primary/30 rounded-xl h-10 md:h-12 xl:h-14">
										<Lock1
											className="size-4 md:size-4.5 xl:size-5 text-muted-foreground"
											variant="Outline"
										/>

										<input
											id="confirmPassword"
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Confirm new password"
											value={passwords.confirmPassword}
											onChange={(e) =>
												setPasswords({
													...passwords,
													confirmPassword: e.target.value,
												})
											}
											className="bg-transparent outline-none w-full"
										/>

										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
										>
											{showConfirmPassword ? (
												<EyeSlash
													className="size-4 md:size-4.5 xl:size-5 text-muted-foreground"
													variant="Outline"
												/>
											) : (
												<Eye
													className="size-4 md:size-4.5 xl:size-5 text-muted-foreground"
													variant="Outline"
												/>
											)}
										</button>
									</div>
									{passwords.newPassword.trim() &&
										passwords.confirmPassword.trim() && (
											<p
												className={`${passwords.newPassword !== passwords.confirmPassword ? "text-destructive" : "text-green-500"} text-[11px] md:text-xs xl:text-sm`}
											>
												{passwords.newPassword !== passwords.confirmPassword
													? "Passwords do not match"
													: "It is a Match"}
											</p>
										)}
								</div>
							</div>

							{/* Requirements */}
							<div className="bg-accent/10 mt-10 p-4 md:p-5 xl:p-6 border border-border rounded-3xl">
								<div className="flex items-center gap-x-3">
									<div className="flex justify-center items-center bg-primary/10 rounded-2xl size-10 md:size-11 xl:size-12">
										<SecuritySafe
											className="size-5 md:size-5.5 xl:size-6 text-primary"
											variant="Bold"
										/>
									</div>

									<div>
										<h3 className="font-semibold text-sm md:text-base xl:text-lg">
											Password Requirements
										</h3>

										<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
											Your password should contain:
										</p>
									</div>
								</div>

								<div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-6">
									{[
										"At least 8 characters",
										"One uppercase letter",
										"One number",
										"One special character",
									].map((item) => (
										<div key={item} className="flex items-center gap-x-3">
											<div className="flex justify-center items-center bg-green-500/10 rounded-full size-5 md:size-6 xl:size-7">
												<Verify
													className="size-4 text-green-500"
													variant="Bold"
												/>
											</div>

											<p className="text-[11px] md:text-xs xl:text-sm">
												{item}
											</p>
										</div>
									))}
								</div>
							</div>

							{/* Submit */}
							<div className="flex justify-end mt-8">
								<button
									onClick={handleSubmit}
									disabled={
										updateProfile.isPending || !passwords.currentPassword.trim()
									}
									type="button"
									className="flex items-center gap-x-2 bg-primary hover:opacity-90 disabled:opacity-50 px-6 py-3 rounded-2xl font-semibold text-primary-foreground transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
								>
									{updateProfile.isPending ? (
										<>
											<Loader className="size-4 md:size-4.5 xl:size-5" />
											Updating
										</>
									) : (
										<>
											<SecuritySafe
												className="size-4 md:size-4.5 xl:size-5"
												variant="Bold"
											/>
											Update Password
										</>
									)}
								</button>
							</div>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
