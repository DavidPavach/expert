// components/EditForm.tsx

import { CheckCircle2, Loader } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-fox-toast";

// Components
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
// Constants
import { TRANSACTION_STATUS } from "#/enum";
// Services
import { useAdminEditTx } from "#/services/mutations.service";
// Utils
import { formatDate } from "#/utils/format";

type EditFormProps = {
	tx: AdminTx;
	onClose: () => void;
};

const EditForm = ({ tx, onClose }: EditFormProps) => {
	const [newStatus, setNewStatus] = useState<string>(tx.status);

	const updateTx = useAdminEditTx();

	const hasChanges = useMemo(() => {
		return tx.status !== newStatus;
	}, [tx.status, newStatus]);

	const handleUpdate = () => {
		if (!hasChanges) {
			toast.warning("No change detected!");

			return;
		}

		updateTx.mutate(
			{
				id: tx._id,
				data: {
					status: newStatus,
				},
			},
			{
				onSuccess: () => {
					toast.success("Transaction updated successfully!");

					onClose();
				},
				onError: (error: Error) => {
					toast.error(error.message ?? "Failed to update transaction.");
				},
			},
		);
	};

	return (
		<main>
			<header className="mb-8 text-center">
				<h1 className="font-bold text-lg md:text-xl xl:text-2xl capitalize">
					{tx.user.username} {tx.type} Transaction
				</h1>

				<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
					Review and update transaction status
				</p>
			</header>

			<section className="space-y-5">
				<div className="gap-4 grid md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="user">Username</Label>
						<Input id="user" value={tx.user.username} disabled />
					</div>

					<div className="space-y-2">
						<Label htmlFor="accountId">Account ID</Label>
						<Input id="accountId" value={tx.user.accountId} disabled />
					</div>
				</div>

				<div className="gap-4 grid md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="coin">Coin</Label>
						<Input
							id="coin"
							value={tx.cryptoSymbol}
							disabled
							className="uppercase"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="amount">Amount</Label>
						<Input
							id="amount"
							value={tx.amount}
							disabled
							className="montserrat"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="type">Transaction Type</Label>
					<Input id="type" value={tx.type} disabled className="capitalize" />
				</div>

				{tx.hash?.trim() && (
					<div className="space-y-3">
						<Label htmlFor="hash">Transaction Proof</Label>
						<div className="border border-border rounded-2xl overflow-hidden">
							<img
								src={tx.hash}
								alt="Transaction Proof"
								className="w-full max-h-72 object-cover"
							/>
						</div>
					</div>
				)}

				{tx.walletAddress?.trim() && (
					<div className="space-y-2">
						<Label htmlFor="walletAddress">Wallet Address</Label>
						<Input id="walletAddress" value={tx.walletAddress} disabled />
					</div>
				)}

				<div className="space-y-2">
					<Label htmlFor="createdAt">Date and Time</Label>
					<Input id="createdAt" value={formatDate(tx.createdAt)} disabled />
				</div>

				<div className="space-y-2">
					<Label htmlFor="status">Update Status</Label>

					<select
						id="status"
						value={newStatus}
						onChange={(e) => setNewStatus(e.target.value)}
						className="bg-accent/10 hover:bg-accent/20 dark:bg-accent/20 px-4 py-3 border border-border focus:border-primary/40 rounded-xl outline-none focus:ring-0 w-full text-foreground capitalize transition-all duration-300 appearance-none cursor-pointer"
					>
						{TRANSACTION_STATUS.map((status) => (
							<option
								key={status}
								value={status}
								className="bg-background text-foreground capitalize"
							>
								{status}
							</option>
						))}
					</select>
				</div>

				{hasChanges && (
					<div className="pt-2">
						<Button
							onClick={handleUpdate}
							disabled={updateTx.isPending}
							className="gap-2 w-full"
						>
							{updateTx.isPending ? (
								<>
									<Loader className="size-5 animate-spin" />
									Updating...
								</>
							) : (
								<>
									<CheckCircle2 className="size-5" />
									Update Transaction
								</>
							)}
						</Button>
					</div>
				)}
			</section>
		</main>
	);
};

export default EditForm;
