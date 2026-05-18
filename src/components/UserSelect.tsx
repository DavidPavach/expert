import { SearchNormal, Sms, TagUser } from "iconsax-reactjs";
import { CircleCheckBig, Hash, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
// Components
import { Input } from "#/components/ui/input";

// Queries
import { useAdminUser } from "#/services/queries.service";

type UserSelectorProps = {
	value?: string;
	onSelect: (userId: string) => void;
};

const UserSelector = ({ value, onSelect }: UserSelectorProps) => {
	const [search, setSearch] = useState<string>("");
	const { data, isLoading, isError, refetch } = useAdminUser(search);

	const user = data?.data ?? null;
	const isSelected = value === user?._id;

	useEffect(() => {
		if (!search.trim()) {
			return;
		}

		const timeout = setTimeout(() => {
			refetch();
		}, 500);

		return () => clearTimeout(timeout);
	}, [search, refetch]);

	return (
		<div className="space-y-5">
			<div>
				<label htmlFor="" className="block font-medium">
					Search User
				</label>

				<div className="relative my-1">
					<SearchNormal className="top-1/2 left-4 absolute size-4 text-muted-foreground -translate-y-1/2" />
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Enter username, email or account ID"
						className="pr-4 pl-11 h-12"
					/>
				</div>

				<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Search using username, email address or account ID.
				</p>
			</div>

			{isLoading && (
				<div className="flex items-center gap-3 p-5 border border-border rounded-2xl">
					<Loader2 className="size-5 text-primary animate-spin" />

					<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
						Searching user...
					</p>
				</div>
			)}

			{isError && (
				<div className="bg-destructive/5 p-5 border border-destructive/20 rounded-2xl">
					<p className="font-medium text-[11px] text-destructive md:text-xs xl:text-sm">
						Failed to fetch user.
					</p>

					<Button onClick={() => refetch()} variant="outline" className="mt-4">
						Try Again
					</Button>
				</div>
			)}

			{user && !isLoading && (
				<div className="border border-border rounded-2xl overflow-hidden">
					<div className="flex md:flex-row flex-col md:items-center gap-5 bg-card p-4">
						<div className="flex justify-center items-center bg-muted rounded-2xl size-20 overflow-hidden shrink-0">
							{user.profilePicture ? (
								<img
									src={user.profilePicture}
									alt={user.username}
									className="w-full h-full object-cover"
								/>
							) : (
								<TagUser className="size-6 md:size-7 xl:size-8 text-muted-foreground" />
							)}
						</div>

						<div className="flex-1 space-y-4">
							<div>
								<h2 className="font-semibold text-base md:text-lg xl:text-xl capitalize">
									{user.fullName}
								</h2>

								<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm capitalize">
									@{user.username}
								</p>
							</div>

							<div className="gap-3 grid md:grid-cols-2">
								<div className="flex items-center gap-2 text-[11px] md:text-xs xl:text-sm">
									<Sms className="size-4 text-muted-foreground" />
									<span className="truncate">{user.email}</span>
								</div>

								<div className="flex items-center gap-2 text-[11px] md:text-xs xl:text-sm">
									<Hash className="size-4 text-muted-foreground" />
									<span>{user.accountId}</span>
								</div>
							</div>

							<div className="flex md:flex-row flex-col md:items-center gap-3 md:gap-4">
								<div className="bg-accent/30 px-3 py-1.5 rounded-lg w-fit text-xs capitalize">
									KYC: {user.kycStatus}
								</div>

								<div
									className={`px-3 py-1.5 rounded-lg text-[10px] md:text-[11px] xl:text-xs w-fit ${
										user.suspended
											? "bg-destructive/10 text-destructive"
											: "bg-green-500/10 text-green-600 dark:text-green-400"
									}`}
								>
									{user.suspended ? "Suspended" : "Active"}
								</div>
							</div>
						</div>
					</div>

					<div className="bg-muted/30 p-4 border-border border-t">
						<Button
							onClick={() => onSelect(user._id)}
							disabled={isSelected}
							className="gap-2 w-full"
						>
							<CircleCheckBig className="size-4" />

							{isSelected ? "User Selected" : "Select User"}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserSelector;
