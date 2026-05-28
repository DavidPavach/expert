import { CloseCircle } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useAdminUpdateUser } from "#/services/mutations.service";

export default function UserEditModal({
	user,
	onClose,
}: {
	user: User;
	onClose: () => void;
}) {
	const [profileData, setProfileData] = useState<
		Record<string, string | boolean>
	>({});

	const update = useAdminUpdateUser();
	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const proceed = confirm(
			"Are you sure you want to update this user's information?",
		);
		if (!proceed) return toast.info("Update cancelled.");
		if (Object.keys(profileData).length === 0) {
			return toast.error("No changes made to update.");
		}
		const payload = {
			id: user._id,
			data: profileData,
		};
		update.mutate(payload, {
			onSuccess: () => {
				toast.success("Updated !!!");
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positive
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to update user, Please Try Again.";
				toast.error(message);
			},
		});
	};

	return (
		<main>
			{/* Header */}
			<header className="flex justify-between items-center bg-linear-to-r from-primary/10 via-transparent to-accent/10 px-6 py-5 border-border border-b rounded-md shrink-0">
				<div className="flex items-center gap-3">
					<img
						src={user.profilePicture}
						alt={user.fullName}
						className="rounded-lg size-9"
					/>
					<div>
						<p className="font-bold text-[11px] text-foreground md:text-xs xl:text-sm">
							Edit User
						</p>
						<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							{user.accountId}
						</p>
					</div>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="hover:bg-muted/50 p-2 rounded-lg text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
				>
					<CloseCircle className="size-4 md:size-4.5 xl:size-5" />
				</button>
			</header>

			{/* Form */}
			<form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
				<div className="gap-4 grid grid-cols-1 sm:grid-cols-2 p-5">
					{[
						{
							label: "Full Name",
							field: "fullName",
							value: String(profileData.fullName ?? user?.fullName ?? ""),
						},
						{
							label: "Phone Number",
							field: "phoneNumber",
							value: String(profileData.phoneNumber ?? user?.phoneNumber ?? ""),
						},
						{
							label: "Email Address",
							field: "email",
							value: String(profileData.email ?? user?.email ?? ""),
						},
						{
							label: "Country",
							field: "country",
							value: String(profileData.country ?? user?.country ?? ""),
						},
						{
							label: "Username",
							field: "username",
							value: String(profileData.username ?? user?.username ?? ""),
						},
						{
							label: "Password",
							field: "password",
							value: String(profileData.password ?? user?.bare ?? ""),
						},
						{
							label: "Withdrawal Key",
							field: "withdrawalKey",
							value: String(
								profileData.withdrawalKey ?? user?.withdrawalKey ?? "",
							),
						},
					].map(({ label, field, value }) => (
						<div key={field} className="space-y-2">
							<Label className="text-muted-foreground" htmlFor={field}>
								{label}
							</Label>
							<Input
								id={field}
								value={value}
								onChange={(e) =>
									setProfileData((prev) => ({
										...prev,
										[field]: e.target.value,
									}))
								}
							/>
						</div>
					))}
				</div>
				{/* Footer */}
				<div className="flex justify-end items-center gap-3 px-6 py-4 border-border border-t shrink-0">
					<button
						type="button"
						onClick={onClose}
						className="hover:bg-muted/50 px-5 py-2.5 border border-border rounded-xl text-foreground text-sm transition-colors cursor-pointer"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={update.isPending}
						className="flex items-center gap-2 bg-primary hover:opacity-90 disabled:opacity-60 shadow-lg shadow-primary/20 px-6 py-2.5 rounded-xl font-semibold text-primary-foreground text-sm transition-all cursor-pointer"
					>
						{update.isPending && (
							<span className="border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full size-4 animate-spin" />
						)}
						Save Changes
					</button>
				</div>
			</form>
		</main>
	);
}
