import { useNavigate } from "@tanstack/react-router";
import { Lock, LoginCurve, Sms } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import FormField, { InputBase } from "#/components/FormField";
import { cn } from "#/lib/utils";
import { useAuthAdmin } from "#/services/mutations.service";
import { adminCookie, setCookie } from "#/utils/cookie";

const index = () => {
	const [showPw, setShowPw] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		identifier: "",
		password: "",
		rememberMe: false,
		device: {},
	});

	const navigate = useNavigate();

	// Functions
	const update = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const authAdmin = useAuthAdmin();
	const handleSubmit = () => {
		authAdmin.mutate(formData, {
			onSuccess: () => {
				toast.success("Authentication Successful", {
					icon: "🚀",
				});
				setCookie("expert", adminCookie, formData.rememberMe ? 7 : 1);
				navigate({ to: "/transactions" });
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positive
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Authentication Failed, Please Try Again.";
				toast.error(message, { icon: "❌ " });
			},
		});
	};

	return (
		<main className="mt-10">
			<section className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				<div className="flex items-center gap-3 bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-6 md:px-8 py-5 border-border border-b">
					<p className="font-semibold text-foreground text-sm md:text-base xl:text-lg">
						Operations Authentication
					</p>
				</div>
				<form className="gap-5 grid grid-cols-1 px-6 md:px-8 py-7">
					<FormField label="Email Address or Username" required>
						<InputBase
							icon={
								<Sms
									variant="Bold"
									className={`size-4.5 ${
										formData.identifier.trim() ? "text-primary" : ""
									}`}
								/>
							}
							type="email"
							placeholder="your.email@example.com"
							value={formData.identifier}
							onChange={(e) => update("identifier", e.target.value)}
						/>
					</FormField>
					<FormField label="Password" required>
						<div className="relative">
							<span className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
								<Lock
									variant="Bold"
									className={`size-4.5 ${formData.password.trim() ? "text-primary" : ""}`}
								/>
							</span>
							<input
								autoComplete="new-password"
								type={showPw ? "text" : "password"}
								placeholder="Create password"
								value={formData.password}
								onChange={(e) => update("password", e.target.value)}
								className={cn(
									"bg-muted/40 py-2.5 md:py-3 pr-12 pl-10 border border-border rounded-xl focus:outline-none focus:ring-0",
									"focus:border-accent w-full placeholder:text-muted-foreground text-xs md:text-sm transition-all",
									"py-2.5 md:py-3 pr-4 placeholder:text-[11px] placeholder:md:text-xs placeholder:xl:text-xs",
								)}
							/>
							<button
								type="button"
								onClick={() => setShowPw((v) => !v)}
								className="top-1/2 right-3 absolute text-[10px] text-muted-foreground md:text-[11px] hover:text-foreground xl:text-xs transition-colors -translate-y-1/2 cursor-pointer"
							>
								{showPw ? "Hide" : "Show"}
							</button>
						</div>
					</FormField>
					<label
						htmlFor="agreement"
						className="group flex items-center gap-x-3 cursor-pointer"
					>
						<button
							type="button"
							onClick={() => update("rememberMe", !formData.rememberMe)}
							className={`mt-0.5 size-5 rounded-sm border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
								formData.rememberMe
									? "bg-primary border-primary"
									: "border-border group-hover:border-primary/50"
							}`}
						>
							{formData.rememberMe && (
								<svg
									className="size-3 text-primary-foreground"
									fill="none"
									stroke="currentColor"
									strokeWidth={3}
									viewBox="0 0 24 24"
								>
									<title>rememberMe</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							)}
						</button>
						<p
							onClick={() => update("rememberMe", !formData.rememberMe)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									update("rememberMe", !formData.rememberMe);
								}
							}}
							className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed"
						>
							Remember Me
						</p>
					</label>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={authAdmin.isPending}
						className="flex justify-center items-center gap-2 bg-primary disabled:bg-muted hover:opacity-80 shadow-lg shadow-primary/20 px-6 md:px-7 py-3 rounded-xl w-full font-semibold text-primary-foreground disabled:text-muted-foreground transition-all cursor-pointer disabled:cursor-not-allowed"
					>
						Access Dashboard
						{authAdmin.isPending ? (
							<Loader className="inline ml-0.5 size-4 animate-spin" />
						) : (
							<LoginCurve className="inline ml-0.5 size-5" />
						)}
					</button>
				</form>
			</section>
		</main>
	);
};

export default index;
