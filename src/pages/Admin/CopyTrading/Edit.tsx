import { Add, CloseCircle, Trash } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Overlay } from "#/components/Overlay";
import {
	useAdminDeleteCopyTradingEntry,
	useAdminUpdateCopyTrading,
} from "#/services/mutations.service";

const STATUS_OPTIONS = ["ACTIVE", "PAUSED", "CLOSED"] as const;

function EntryRow({
	entry,
	onDelete,
	onUpdate,
	isNew,
}: {
	entry: Entry;
	onDelete: (id: string) => void;
	onUpdate: (updated: Entry) => void;
	isNew: boolean;
}) {
	return (
		<tr className="border-border/50 border-b">
			<td className="px-3 py-2">
				<input
					readOnly={!isNew}
					type="datetime-local"
					value={
						entry.date ? new Date(entry.date).toISOString().slice(0, 16) : ""
					}
					onChange={(e) =>
						onUpdate({
							...entry,
							date: e.target.value,
						})
					}
					className="bg-muted/30 px-2 py-1.5 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 w-full text-foreground text-xs"
				/>
			</td>

			<td className="px-3 py-2">
				<input
					readOnly={!isNew}
					type="number"
					step="0.01"
					value={entry.percentChange ?? ""}
					onChange={(e) =>
						onUpdate({
							...entry,
							percentChange: parseFloat(e.target.value),
						})
					}
					className="bg-muted/30 px-2 py-1.5 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 w-full text-foreground text-xs"
					placeholder="0.00"
				/>
			</td>

			<td className="px-3 py-2">
				<input
					readOnly={!isNew}
					type="number"
					step="0.01"
					value={entry.price ?? ""}
					onChange={(e) =>
						onUpdate({
							...entry,
							price: parseFloat(e.target.value),
						})
					}
					className="bg-muted/30 px-2 py-1.5 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 w-full min-w-16 text-foreground text-xs"
					placeholder="0.00"
				/>
			</td>

			<td className="px-3 py-2 text-center">
				<button
					type="button"
					onClick={() => onDelete(entry._id)}
					className="hover:bg-destructive/10 p-1.5 rounded-lg text-destructive transition-colors cursor-pointer"
				>
					<Trash className="size-3.5" />
				</button>
			</td>
		</tr>
	);
}

export default function EditModal({
	record,
	onClose,
}: {
	record: AdminCopyTrading;
	onClose: () => void;
}) {
	const [form, setForm] = useState({
		investment: record.investment,
		currentValue: record.currentValue,
		pnl: record.pnl,
		roi: record.roi,
		numberOfTrades: record.numberOfTrades,
		winRate: record.winRate,
		status: record.status,
		entries: record.entries,
	});

	const [newEntries, setNewEntries] = useState<Entry[]>([]);
	const setField = (key: string, val: string | number | boolean | Date) => {
		setForm((f) => ({
			...f,
			[key]: val,
		}));
	};

	// ADD NEW ENTRY
	const addEntry = () => {
		const newEntry: Entry = {
			_id: Date.now().toString(),
			date: new Date().toISOString(),
			percentChange: 0,
			price: 0,
		};

		setNewEntries((prev) => [...prev, newEntry]);
	};

	// DELETE EXISTING ENTRY
	const deleteEntry = useAdminDeleteCopyTradingEntry();
	const deleteExistingEntry = (_id: string) => {
		const proceed = confirm(
			"Are you sure you want to delete this entry? This action cannot be undone.",
		);
		if (!proceed) return toast.info("Action cancelled.");
		deleteEntry.mutate(
			{
				copyTradingId: record._id,
				entryId: _id,
			},
			{
				onSuccess: () => {
					toast.success("Entry deleted successfully!");
					setForm((f) => ({
						...f,
						entries: f.entries.filter((entry) => entry._id !== _id),
					}));
				},
				onError: (error: Error) => {
					toast.error(error.message ?? "Failed to delete entry.");
				},
			},
		);
	};

	// DELETE NEW ENTRY
	const deleteNewEntry = (_id: string) => {
		setNewEntries((prev) => prev.filter((entry) => entry._id !== _id));
	};

	// UPDATE EXISTING ENTRY
	const updateExistingEntry = (id: string, updated: Entry) => {
		setForm((f) => ({
			...f,
			entries: f.entries.map((entry) => (entry._id === id ? updated : entry)),
		}));
	};

	// UPDATE NEW ENTRY
	const updateNewEntry = (id: string, updated: Entry) => {
		setNewEntries((prev) =>
			prev.map((entry) => (entry._id === id ? updated : entry)),
		);
	};

	const update = useAdminUpdateCopyTrading();
	const save = async () => {
		const payload = {
			...(form.currentValue !== record.currentValue
				? { currentValue: form.currentValue }
				: {}),
			...(form.pnl !== record.pnl ? { pnl: form.pnl } : {}),
			...(form.roi !== record.roi ? { roi: form.roi } : {}),
			...(form.numberOfTrades !== record.numberOfTrades
				? { numberOfTrades: form.numberOfTrades }
				: {}),
			...(form.winRate !== record.winRate ? { winRate: form.winRate } : {}),
			...(form.status !== record.status ? { status: form.status } : {}),
			...(newEntries.length > 0 ? { entries: newEntries } : {}),
		};
		update.mutate(
			{ id: record._id, data: payload },
			{
				onSuccess: () => {
					toast.success("Changes saved successfully!");
					setNewEntries([]);
					onClose();
				},
				onError: (error: Error) => {
					toast.error(error.message ?? "Failed to save changes.");
				},
			},
		);
	};

	return (
		<Overlay onClose={onClose} open={!!record} variant="bottom">
			{/* Header */}
			<div className="flex justify-between items-start gap-4 bg-card px-6 py-4 border-border border-b">
				<div>
					<h2 className="font-bold text-foreground text-base">
						Edit Copy Trading Record
					</h2>

					<p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm capitalize">
						{record.user?.username || record.user?.email || "Unknown User"} →{" "}
						<span className="text-primary">
							{record.masterTraderId.name || "Trader"}
						</span>
					</p>
				</div>

				<button
					type="button"
					onClick={onClose}
					className="hover:bg-muted/50 p-1.5 rounded-lg text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
				>
					<CloseCircle className="size-4" />
				</button>
			</div>

			<div className="space-y-6 px-6 py-5">
				{/* Core Fields */}
				<div>
					<h3 className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						Core Metrics
					</h3>

					<div className="gap-3 grid grid-cols-2 md:grid-cols-3">
						{[
							{
								key: "investment",
								label: "Investment ($)",
							},
							{
								key: "currentValue",
								label: "Current Value ($)",
							},
							{
								key: "pnl",
								label: "PnL ($)",
							},
							{
								key: "roi",
								label: "ROI (%)",
							},
							{
								key: "numberOfTrades",
								label: "# Trades",
							},
							{
								key: "winRate",
								label: "Win Rate (%)",
							},
						].map(({ key, label }) => (
							<div key={key}>
								<label
									htmlFor={key}
									className="block mb-1 text-muted-foreground text-xs"
								>
									{label}
								</label>

								<input
									id={key}
									type="number"
									step="0.01"
									value={
										typeof form[key as keyof typeof form] === "number"
											? (form[key as keyof typeof form] as number)
											: ""
									}
									onChange={(e) => setField(key, parseFloat(e.target.value))}
									className="bg-muted/30 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-foreground text-sm"
								/>
							</div>
						))}
					</div>
				</div>

				{/* Status */}
				<div>
					<label
						htmlFor="status"
						className="block mb-1 text-muted-foreground text-xs cursor-pointer"
					>
						Status
					</label>

					<div className="flex gap-2">
						{STATUS_OPTIONS.map((s) => (
							<button
								type="button"
								key={s}
								onClick={() => setField("status", s)}
								className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
									form.status === s
										? s === "ACTIVE"
											? "bg-green-500/20 border-green-500/40 text-green-400"
											: s === "PAUSED"
												? "bg-amber-500/20 border-amber-500/40 text-amber-400"
												: "bg-destructive/20 border-destructive/40 text-destructive"
										: "bg-muted/20 border-border text-muted-foreground hover:bg-muted/40"
								}`}
							>
								{s}
							</button>
						))}
					</div>
				</div>

				{/* Existing Entries */}
				<div>
					<div className="flex justify-between items-center mb-3">
						<h3 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
							Existing Entries ({form.entries.length})
						</h3>

						<button
							type="button"
							onClick={addEntry}
							className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 border border-primary/30 rounded-lg font-medium text-primary text-xs transition-colors cursor-pointer"
						>
							<Add className="size-4" />
							Add Entry
						</button>
					</div>

					<div className="border border-border rounded-xl overflow-hidden">
						{form.entries.length === 0 ? (
							<div className="py-8 text-muted-foreground text-xs text-center">
								No existing entries
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full text-xs">
									<thead>
										<tr className="bg-muted/20 border-border border-b">
											<th className="px-3 py-2 text-left">Date</th>

											<th className="px-3 py-2 text-left text-nowrap">
												% Change
											</th>

											<th className="px-3 py-2 text-left">Price</th>

											<th className="px-3 py-2 text-center">Del</th>
										</tr>
									</thead>

									<tbody>
										{form.entries.map((entry) => (
											<EntryRow
												key={entry._id}
												entry={entry}
												isNew={false}
												onDelete={() => deleteExistingEntry(entry._id)}
												onUpdate={(updated) =>
													updateExistingEntry(entry._id, updated)
												}
											/>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>

				{/* New Entries */}
				<div>
					<h3 className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						New Entries ({newEntries.length})
					</h3>

					<div className="border border-border rounded-xl overflow-hidden">
						{newEntries.length === 0 ? (
							<div className="py-8 text-muted-foreground text-xs text-center">
								No new entries
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full text-xs">
									<thead>
										<tr className="bg-muted/20 border-border border-b">
											<th className="px-3 py-2 text-left">Date</th>

											<th className="px-3 py-2 text-left text-nowrap">
												% Change
											</th>

											<th className="px-3 py-2 text-left">Price</th>

											<th className="px-3 py-2 text-center">Del</th>
										</tr>
									</thead>

									<tbody>
										{newEntries.map((entry) => (
											<EntryRow
												key={entry._id}
												entry={entry}
												isNew={true}
												onDelete={() => deleteNewEntry(entry._id)}
												onUpdate={(updated) =>
													updateNewEntry(entry._id, updated)
												}
											/>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="flex justify-end gap-3 bg-card mb-20 px-6 py-4 border-border border-t">
				<button
					type="button"
					onClick={onClose}
					className="hover:bg-muted/50 px-4 py-2 border border-border rounded-xl text-foreground hover:text-destructive transition-colors cursor-pointer"
				>
					Cancel
				</button>

				<button
					type="button"
					onClick={save}
					disabled={update.isPending || deleteEntry.isPending}
					className="flex items-center gap-2 bg-primary hover:opacity-90 disabled:opacity-60 shadow-lg shadow-primary/20 px-5 py-2 rounded-xl font-semibold text-primary-foreground transition-all cursor-pointer"
				>
					{update.isPending ||
						(deleteEntry.isPending && (
							<span className="border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full size-4 animate-spin" />
						))}
					Save Changes
				</button>
			</div>
		</Overlay>
	);
}
