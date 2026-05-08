import { Link } from "@tanstack/react-router";
import { Lock } from "iconsax-reactjs";
import { useState } from "react";
import { cn } from "#/lib/utils";
import { generatedCaptcha } from "#/utils/generate";
import FormField, { InputBase } from "@/components/FormField";

type FormProps = {
	formData: {
		username: string;
		fullName: string;
		email: string;
		phoneNumber: string;
		country: string;
		password: string;
		confirmPassword: string;
		captcha: string;
		agreed: boolean;
		passwordMatch: boolean;
		correctCaptcha: boolean;
	};
	update: (field: string, value: string | boolean | number) => void;
};

export default function SecurityForm({ formData, update }: FormProps) {
	const [showPw, setShowPw] = useState<boolean>(false);
	const [showCpw, setShowCpw] = useState<boolean>(false);
	const CAPTCHA = generatedCaptcha;

	return (
		<div className="flex flex-col gap-5">
			<div className="gap-4 md:gap-5 grid grid-cols-1 md:grid-cols-2">
				<FormField label="Password" required>
					<div className="relative">
						<span className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
							<Lock variant="Bold" className="size-4.5 text-yellow-500" />
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

				<FormField label="Confirm Password" required>
					<div className="relative">
						<span className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
							<Lock variant="Bold" className="size-4.5 text-yellow-500" />
						</span>
						<input
							autoComplete="new-password"
							type={showCpw ? "text" : "password"}
							placeholder="Confirm password"
							value={formData.confirmPassword}
							onChange={(e) => {
								const val = e.target.value;
								update("confirmPassword", val);
								update("passwordMatch", val === formData.password);
							}}
							className={cn(
								"bg-muted/40 py-2.5 md:py-3 pr-12 pl-10 border border-border rounded-xl focus:outline-none focus:ring-0",
								"focus:border-accent w-full placeholder:text-muted-foreground text-xs md:text-sm transition-all",
								"py-2.5 md:py-3 pr-4 placeholder:text-[11px] placeholder:md:text-xs placeholder:xl:text-xs",
							)}
						/>
						<button
							type="button"
							onClick={() => setShowCpw((v) => !v)}
							className="top-1/2 right-3 absolute text-[10px] text-muted-foreground md:text-[11px] hover:text-foreground xl:text-xs transition-colors -translate-y-1/2 cursor-pointer"
						>
							{showCpw ? "Hide" : "Show"}
						</button>
					</div>
				</FormField>
				{formData.password.trim() &&
					formData.confirmPassword.trim() &&
					formData.password !== formData.confirmPassword && (
						<p className="text-[10px] text-destructive md:text-[11px] xl:text-xs">
							Passwords do not match
						</p>
					)}
			</div>

			{/* CAPTCHA */}
			<div>
				<p className="mb-2 font-medium">
					Security Verification <span className="text-destructive">*</span>
				</p>
				<div className="flex items-center gap-3 mb-3">
					<div className="bg-muted px-5 py-2 border border-border rounded-xl font-mono font-bold text-primary text-sm md:text-base tracking-[0.3em] select-none letter-spacing-wide">
						{CAPTCHA}
					</div>
					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Enter the code shown
					</p>
				</div>
				<InputBase
					type="text"
					placeholder="Enter verification code"
					value={formData.captcha}
					onChange={(e) => {
						const val = e.target.value;
						update("captcha", e.target.value);
						update("correctCaptcha", val === CAPTCHA);
					}}
				/>
				<p className="mt-2 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
					This helps verify you're a real person and protects against automated
					registrations.
				</p>
			</div>

			{/* Password requirements */}
			<div className="bg-muted/30 p-4 border border-border rounded-xl">
				<p className="mb-2 font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
					Password Requirements
				</p>
				<ul className="flex flex-col gap-1">
					{[
						"At least 8 characters long",
						"Contains uppercase and lowercase letters",
						"Includes at least one number or special character",
					].map((req) => (
						<li
							key={req}
							className="flex items-center gap-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm"
						>
							<span className="bg-primary rounded-full size-1.5 shrink-0" />
							{req}
						</li>
					))}
				</ul>
			</div>

			{/* Terms */}
			<label
				htmlFor="agreement"
				className="group flex items-start gap-3 cursor-pointer"
			>
				<button
					type="button"
					onClick={() => update("agreed", !formData.agreed)}
					className={`mt-0.5 size-5 rounded-sm border-2 flex items-center cursor-pointer justify-center shrink-0 transition-all ${
						formData.agreed
							? "bg-primary border-primary"
							: "border-border group-hover:border-primary/50"
					}`}
				>
					{formData.agreed && (
						<svg
							className="size-3 text-primary-foreground"
							fill="none"
							stroke="currentColor"
							strokeWidth={3}
							viewBox="0 0 24 24"
						>
							<title>agreement</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					)}
				</button>
				<p
					onClick={() => update("agreed", !formData.agreed)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							update("rememberMe", !formData.agreed);
						}
					}}
					className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed"
				>
					I agree to Expertmirrorcon's{" "}
					<Link to="/" className="text-primary hover:underline">
						Terms and Conditions
					</Link>{" "}
					and acknowledge that I have read and understood the{" "}
					<Link to="/" className="text-primary hover:underline">
						Privacy Policy
					</Link>
					. By creating an account, you confirm that you are at least 18 years
					old.
				</p>
			</label>
		</div>
	);
}
