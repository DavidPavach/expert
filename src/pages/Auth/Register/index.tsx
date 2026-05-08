import { useNavigate } from "@tanstack/react-router";
import { DirectLeft, DirectRight } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Route } from "#/routes/_auth/register";
import { locationSchema, personalInfoSchema } from "#/schemas/auth.schema";
import { useCreateUser } from "#/services/mutations.service";

// UIs
import Footer from "./Footer";
import Header from "./Header";
import LocationForm from "./LocationForm";
import PersonalForm from "./PersonalForm";
import SecurityForm from "./SecurityForm";
import StepIndicator from "./StepIndicator";

const STEPS = [
	{ id: 1, label: "Personal Info", sub: "Basic details" },
	{ id: 2, label: "Location", sub: "Regional settings" },
	{ id: 3, label: "Security", sub: "Account protection" },
];

const index = () => {
	const { ref } = Route.useSearch();
	const navigate = useNavigate();

	// Form States
	const [step, setStep] = useState<number>(1);
	const [personalErrors, setPersonalErrors] = useState<Record<string, string>>(
		{},
	);

	const [formData, setFormData] = useState({
		username: "",
		fullName: "",
		email: "",
		phoneNumber: "",
		country: "",
		password: "",
		confirmPassword: "",
		captcha: "",
		agreed: false,
		passwordMatch: false,
		correctCaptcha: false,
	});

	// Functions
	const handleSteps = (direction: "next" | "prev") => {
		if (direction === "prev") {
			return setStep((prev) => prev - 1);
		}

		if (step === 1) {
			const result = personalInfoSchema.safeParse(formData);

			if (!result.success) {
				const fieldErrors: Record<string, string> = {};

				result.error.issues.forEach((issue) => {
					const field = issue.path[0];
					if (typeof field === "string") {
						fieldErrors[field] = issue.message;
					}
				});
				const firstError = result.error.issues[0];
				toast.error(firstError.message);
				return setPersonalErrors(fieldErrors);
			} else {
				setPersonalErrors({});
			}
		} else if (step === 2) {
			const country = formData.country;
			const result = locationSchema.safeParse({ country });
			if (!result.success) {
				const firstError = result.error.issues[0];
				return toast.error(firstError.message);
			}
		}
		setStep((prev) => prev + 1);
	};

	const update = (field: string, value: string | boolean | number) =>
		setFormData((prev) => ({ ...prev, [field]: value }));

	const newUser = useCreateUser();
	const handleSubmit = () => {
		if (formData.password.length < 6) {
			return toast.error("Password must be more than 6 Chars", {
				icon: "❌ ",
			});
		}
		if (
			!formData.passwordMatch ||
			!formData.correctCaptcha ||
			!formData.agreed
		) {
			return toast.error(
				"Kindly make sure the Passwords Match, ReCaptcha was solved correctly, and you agreed to our Terms",
				{
					icon: "❌ ",
				},
			);
		}
		const payload = {
			username: formData.username,
			email: formData.email,
			fullName: formData.fullName,
			phoneNumber: formData.phoneNumber,
			country: formData.country,
			password: formData.password,
			...(ref != null ? { referral: ref } : {}),
		};
		newUser.mutate(payload, {
			onSuccess: () => {
				toast.success("User Account Was Created Successfully", {
					icon: "🚀",
				});
				navigate({ to: "/login" });
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positive
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Your Account Creation Attempt Failed, Please Try Again.";
				toast.error(message, { icon: "❌ " });
			},
		});
	};

	return (
		<main>
			<Header />
			<section className="flex justify-center my-6">
				<div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm px-4 py-2 border border-border rounded-full text-muted-foreground">
					<div className="bg-primary rounded-full size-2 animate-pulse" />
					<span className="font-medium text-[11px] text-primary md:text-xs xl:text-sm">
						1M+ Traders
					</span>
					<span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Community
					</span>
				</div>
			</section>

			<StepIndicator steps={STEPS} currentStep={step} />

			<section className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				{/* Step header bar */}
				<div className="flex items-center gap-3 bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-6 md:px-8 py-5 border-border border-b">
					<div className="flex justify-center items-center bg-primary/20 rounded-xl size-9">
						<span className="font-bold text-primary">{step}</span>
					</div>
					<div>
						<p className="font-semibold text-foreground text-sm md:text-base xl:text-lg">
							{STEPS[step - 1].label}
						</p>
						<p className="-mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
							{step === 1 && "Create your trading profile"}
							{step === 2 && "Set your regional trading preferences"}
							{step === 3 && "Secure your trading account"}
						</p>
					</div>
				</div>
				<form className="px-6 md:px-8 py-7">
					{step === 1 && (
						<PersonalForm
							formData={formData}
							update={update}
							errors={personalErrors}
						/>
					)}
					{step === 2 && <LocationForm update={update} />}
					{step === 3 && <SecurityForm formData={formData} update={update} />}
				</form>
				<div className="flex justify-between items-center bg-card/40 px-4 md:px-6 mxl:px-8 py-4 border-border border-t">
					<span className="font-medium text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Step {step} of 3
					</span>
					<div className="flex items-center gap-3">
						{step > 1 && (
							<button
								type="button"
								onClick={() => handleSteps("prev")}
								className="hover:bg-muted px-4 md:px-5 py-2 border border-border rounded-xl font-medium text-[11px] text-foreground md:text-xs xl:text-sm transition-colors cursor-pointer"
							>
								<DirectLeft variant="Bold" className="inline mr-0.5 size-4" />{" "}
								Back
							</button>
						)}
						<button
							type="button"
							onClick={() => (step < 3 ? handleSteps("next") : handleSubmit())}
							disabled={newUser.isPending}
							className="flex items-center gap-2 bg-primary disabled:bg-muted hover:opacity-90 shadow-lg shadow-primary/20 px-6 md:px-7 py-2 rounded-xl font-semibold text-primary-foreground disabled:text-muted-foreground transition-all cursor-pointer disabled:cursor-pointer"
						>
							{step === 3 && !newUser.isPending ? "Create Account" : "Continue"}
							{step < 3 && (
								<span>
									<DirectRight
										variant="Bold"
										className="inline ml-0.5 size-4"
									/>
								</span>
							)}
							{step === 3 && newUser.isPending && (
								<Loader className="inline ml-0.5 size-4 animate-spin" />
							)}
						</button>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
};

export default index;
