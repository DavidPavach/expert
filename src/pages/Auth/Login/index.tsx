import { useNavigate } from "@tanstack/react-router";
import { LoginCurve } from "iconsax-reactjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { UAParser } from "ua-parser-js";
import { loginSchema } from "#/schemas/auth.schema";
import { useAuth } from "#/services/mutations.service";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";

const index = () => {
	const [formData, setFormData] = useState({
		identifier: "",
		password: "",
		rememberMe: false,
	});
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const navigate = useNavigate();

	// Functions
	const update = (field: string, value: string | boolean | number) => {
		const result = loginSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};

			result.error.issues.forEach((issue) => {
				const field = issue.path[0];
				if (typeof field === "string") {
					fieldErrors[field] = issue.message;
				}
			});
			setFormErrors({ [field]: fieldErrors[field] });
		} else {
			setFormErrors({});
		}
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const auth = useAuth();
	const handleSubmit = () => {
		if (Object.keys(formErrors).length > 0) {
			return toast.error("Kindly fill the form properly before you proceed");
		}
		const parser = new UAParser();
		const result = parser.getResult();

		const device = {
			ua: navigator.userAgent,
			type: result.device.type,
			os: result.os.name,
			browser: result.browser.name,
		};

		const payload = { ...formData, device };

		auth.mutate(payload, {
			onSuccess: () => {
				toast.success("Authentication Successful", {
					icon: "🚀",
				});
				navigate({ to: "/dashboard" });
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
			<section className="bg-card/80 shadow backdrop-blur-md border border-border rounded-2xl overflow-hidden">
				<div className="flex items-center gap-3 bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-6 md:px-8 py-5 border-border border-b">
					<p className="font-semibold text-foreground text-sm md:text-base xl:text-lg">
						Enter Your Trading Credentials
					</p>
				</div>
				<form className="space-y-8 px-6 md:px-8 py-7">
					<Form formData={formData} update={update} errors={formErrors} />
					<button
						type="button"
						onClick={handleSubmit}
						disabled={auth.isPending || Object.keys(formErrors).length > 0}
						className="flex justify-center items-center gap-2 bg-primary disabled:bg-muted hover:opacity-80 shadow-lg shadow-primary/20 px-6 md:px-7 py-3 rounded-xl w-full font-semibold text-primary-foreground disabled:text-muted-foreground transition-all cursor-pointer disabled:cursor-not-allowed"
					>
						Access Dashboard
						{auth.isPending ? (
							<Loader className="inline ml-0.5 size-4 animate-spin" />
						) : (
							<LoginCurve className="inline ml-0.5 size-5" />
						)}
					</button>
				</form>
			</section>

			<Footer />
		</main>
	);
};

export default index;
