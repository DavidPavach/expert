import { Link } from "@tanstack/react-router";
import { Lock, TagUser } from "iconsax-reactjs";
import { useState } from "react";
import FormField, { InputBase } from "#/components/FormField";
import { cn } from "#/lib/utils";

type FormData = {
	identifier: string;
	password: string;
	rememberMe: boolean;
};

type Props = {
	formData: FormData;
	update: (field: string, value: string | boolean | number) => void;
	errors?: Partial<Record<keyof FormData, string>>;
};

const Form = ({ formData, update, errors = {} }: Props) => {
	const [showPw, setShowPw] = useState<boolean>(false);

	return (
		<main className="gap-5 grid grid-cols-1">
			<FormField label="Email Address or Username" required>
				<InputBase
					icon={
						<TagUser
							variant="Bold"
							className={`size-4.5 ${
								errors.identifier
									? "text-destructive"
									: formData.identifier.trim()
										? "text-primary"
										: ""
							}`}
						/>
					}
					autoComplete="username"
					type="text"
					placeholder="your.email@example.com"
					value={formData.identifier}
					onChange={(e) => update("identifier", e.target.value)}
				/>
				{errors.identifier && (
					<p className="mt-0.5 text-[10px] text-destructive md:text-[11px] xl:text-xs">
						{errors.identifier}
					</p>
				)}
			</FormField>
			<FormField label="Password" required>
				<div className="relative">
					<span className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
						<Lock
							variant="Bold"
							className={`size-4.5 ${errors.password ? "text-destructive" : formData.password.trim() ? "text-primary" : ""}`}
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
				{errors.password && (
					<p className="mt-0.5 text-[10px] text-destructive md:text-[11px] xl:text-xs">
						{errors.password}
					</p>
				)}
			</FormField>
			<div className="flex justify-between items-center">
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
				<Link
					to="/forgot"
					className="text-[11px] text-primary md:text-xs xl:text-sm hover:underline duration-300"
				>
					Forgot Password?
				</Link>
			</div>
		</main>
	);
};

export default Form;
