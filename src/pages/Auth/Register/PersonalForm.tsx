import { Call, Sms, Tag2, TagUser } from "iconsax-reactjs";
import FormField, { InputBase } from "#/components/FormField";

type FormData = {
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

type Props = {
	formData: FormData;
	update: (field: string, value: string | boolean | number) => void;
	errors?: Partial<Record<keyof FormData, string>>;
};

export default function PersonalForm({ formData, update, errors = {} }: Props) {
	return (
		<main className="gap-4 md:gap-5 grid grid-cols-1 md:grid-cols-2">
			<FormField label="Trading Username" required>
				<InputBase
					icon={
						<Tag2
							variant="Bold"
							className={`size-4.5 ${
								errors.username
									? "text-destructive"
									: formData.username.trim()
										? "text-primary"
										: ""
							}`}
						/>
					}
					type="text"
					placeholder="Choose username"
					value={formData.username}
					onChange={(e) => update("username", e.target.value)}
				/>
			</FormField>

			<FormField label="Full Name" required>
				<InputBase
					icon={
						<TagUser
							variant="Bold"
							className={`size-4.5 ${
								errors.fullName
									? "text-destructive"
									: formData.fullName.trim()
										? "text-primary"
										: ""
							}`}
						/>
					}
					type="text"
					placeholder="Enter full name"
					value={formData.fullName}
					onChange={(e) => update("fullName", e.target.value)}
				/>
			</FormField>

			<FormField label="Email Address" required>
				<InputBase
					icon={
						<Sms
							variant="Bold"
							className={`size-4.5 ${
								errors.email
									? "text-destructive"
									: formData.email.trim()
										? "text-primary"
										: ""
							}`}
						/>
					}
					type="email"
					placeholder="your.email@example.com"
					value={formData.email}
					onChange={(e) => update("email", e.target.value)}
				/>
			</FormField>

			<FormField label="Phone Number" required>
				<InputBase
					icon={
						<Call
							variant="Bold"
							className={`size-4.5 ${
								errors.phoneNumber
									? "text-destructive"
									: formData.phoneNumber.trim()
										? "text-primary"
										: ""
							}`}
						/>
					}
					type="tel"
					placeholder="+1 (415) 555-0132"
					value={formData.phoneNumber}
					inputMode="numeric"
					onChange={(e) => {
						const numericValue = e.target.value.replace(/\D/g, "");

						update("phoneNumber", numericValue);
					}}
				/>
			</FormField>
		</main>
	);
}
