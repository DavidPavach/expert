import { Edit, Trash } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Overlay } from "#/components/Overlay";
import { Badge } from "#/components/ui/badge";
import { useAdminDeleteTx } from "#/services/mutations.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { STATUS_COLORS, TYPE_COLORS } from "@/enum";
import { formatCurrency, formatDate } from "@/utils/format";
import EditForm from "./EditForm";

export default function Table({ data }: { data: AdminTx[] }) {
	const [editTx, setEditTx] = useState<AdminTx | null>(null);

	const deleteTx = useAdminDeleteTx();
	const handleDelete = (id: string) => {
		const confirmation = confirm("Do you want to delete this transaction?");
		if (!confirmation) return toast.error("Deletion Cancelled");
		deleteTx.mutate(id, {
			onSuccess: () => {
				toast.success("Transaction deleted successfully!");
			},
			// biome-ignore lint/suspicious/noExplicitAny: false positives
			onError: (error: any) => {
				const message =
					error?.response?.data?.message ||
					"Failed to delete transaction. Kindly retry.";
				toast.error(message);
			},
		});
	};

	return (
		<>
			{editTx && (
				<Overlay
					open={!!editTx}
					onClose={() => setEditTx(null)}
					variant="bottom"
				>
					<EditForm tx={editTx} onClose={() => setEditTx(null)} />
				</Overlay>
			)}
			{data.length === 0 ? (
				<div className="flex justify-center items-center bg-card mx-auto py-20 rounded-xl">
					<p className="text-destructive capitalize">No Transactions</p>
				</div>
			) : (
				<main className="pb-4 rounded-xl overflow-x-auto">
					<table className="border border-border w-full text-nowrap">
						<thead>
							<tr className="bg-neutral-50 dark:bg-neutral-950 *:px-4 *:py-3 border-border border-b *:font-semibold *:text-left">
								<th>User</th>
								<th>Type</th>
								<th>Coin</th>
								<th>Amount</th>
								<th>Status</th>
								<th>Date</th>
								<th className="text-right">Actions</th>
							</tr>
						</thead>

						<tbody>
							{data.map((tx) => (
								<tr
									key={tx._id}
									className="hover:bg-neutral-100 dark:bg-neutral-900 *:px-4 *:py-3 border-border border-b transition-colors"
								>
									<td>
										<div className="flex items-center gap-3">
											<Avatar className="size-8">
												<AvatarImage
													src={tx.user.profilePicture ?? ""}
													alt={tx.user.username}
												/>
												<AvatarFallback>
													{tx.user.username
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div className="min-w-0">
												<p className="font-medium truncate capitalize">
													{tx.user.username}
												</p>
												<p className="text-neutral-500 text-xs truncate first-letter:uppercase">
													{tx.user.email}
												</p>
											</div>
										</div>
									</td>

									<td>
										<Badge
											className={`${TYPE_COLORS[tx.type]} text-white capitalize`}
										>
											{tx.type}
										</Badge>
									</td>

									<td className="capitalize">{tx.cryptoSymbol}</td>
									<td className="font-medium montserrat">
										{formatCurrency(tx.amount)}
									</td>
									<td>
										<Badge className={`${STATUS_COLORS[tx.status]} text-white`}>
											{tx.status}
										</Badge>
									</td>

									<td>{formatDate(tx.createdAt, "short")}</td>

									<td>
										<div className="flex gap-x-5">
											<Edit
												onClick={() => setEditTx(tx)}
												className="size-4 md:size-4.5 xl:size-5 text-primary cursor-pointer"
											/>
											<Trash
												onClick={() => handleDelete(tx._id)}
												className="size-4 md:size-4.5 xl:size-5 text-destructive cursor-pointer"
											/>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</main>
			)}
		</>
	);
}
