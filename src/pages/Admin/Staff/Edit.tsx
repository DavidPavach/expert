import { CloseCircle } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useAdminUpdate } from "#/services/mutations.service";

const Edit = ({ admin, onClose }: { admin: Admin; onClose: () => void }) => {
	const [form, setForm] = useState({
		email: admin.email ?? "",
		role: admin.role ?? "ADMIN",
		password: "",
	});

	const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

	const update = useAdminUpdate();
	const save = async () => {
		const proceed = confirm("Do you want to update the admin details?");
		if (!proceed) return toast.info("Update Cancelled");
		const payload: UpdateAdminPayload = { email: form.email, role: form.role };
		if (form.password.trim()) payload.password = form.password.trim();

		update.mutate(
			{ id: admin._id, data: payload },
			{
				onSuccess: () => {
					toast.success("Admin was updated successfully !");
					onClose();
				},
				onError: (error: Error) => {
					toast.error(error.message ?? "Failed to Update Admin.");
				},
			},
		);
	};

	return (
		<main>
			{/* Header */}
			<div className="flex justify-between items-start gap-4 px-6 py-4 border-border border-b">
				<div>
					<h2 className="font-bold text-foreground">Edit Admin</h2>
					<p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						{admin.email}
					</p>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="hover:bg-muted/50 p-1.5 rounded-lg text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
				>
					<CloseCircle className="size-3 md:size-3.5 xl:size-4" />
				</button>
			</div>

			<div className="space-y-4 px-6 py-5">
				{/* Email */}
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						name="email"
						value={form.email}
						onChange={(e) => set("email", e.target.value)}
					/>
				</div>

				{/* Role */}
				<div className="space-y-2">
					<Label htmlFor="role">Role</Label>
					<div className="flex gap-2">
						{["ADMIN", "SUPER_ADMIN"].map((r) => (
							<button
								type="button"
								key={r}
								onClick={() => set("role", r)}
								className={`flex-1 py-2 rounded-lg text-[11px] md:text-xs xl:text-sm cursor-pointer font-semibold border transition-all ${
									form.role === r
										? r === "SUPER_ADMIN"
											? "bg-primary/20 border-primary/40 text-primary"
											: "bg-secondary/20 border-secondary/40 text-secondary"
										: "bg-muted/20 border-border text-muted-foreground hover:bg-muted/40"
								}`}
							>
								{r === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
							</button>
						))}
					</div>
				</div>

				{/* Password */}
				<div className="space-y-2">
					<Label htmlFor="password">
						New Password{" "}
						<span className="text-muted-foreground/60">
							(leave blank to keep current)
						</span>
					</Label>
					<Input
						name="password"
						id="password"
						value={form.password}
						onChange={(e) => set("password", e.target.value)}
						placeholder="••••••••"
					/>
				</div>
			</div>

			{/* Footer */}
			<div className="flex justify-end gap-3 px-6 py-4 border-border border-t">
				<button
					onClick={onClose}
					type="button"
					className="hover:bg-muted/50 px-4 py-2 border border-border rounded-xl text-[11px] text-foreground md:text-xs xl:text-sm transition-colors cursor-pointer"
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={save}
					disabled={update.isPending}
					className="flex items-center gap-2 bg-primary hover:opacity-90 disabled:opacity-60 shadow-lg shadow-primary/20 px-5 py-2 rounded-xl font-semibold text-[11px] text-primary-foreground md:text-xs xl:text-sm transition-all cursor-pointer"
				>
					{update.isPending && (
						<span className="border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full size-4 animate-spin" />
					)}
					Save Changes
				</button>
			</div>
		</main>
	);
};

export default Edit;
