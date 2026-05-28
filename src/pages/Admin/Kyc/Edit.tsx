import { CloseCircle, Eye, Trash } from "iconsax-reactjs";
import { CircleCheckBig } from "lucide-react";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { Overlay } from "#/components/Overlay";
import {
	useAdminDeleteKyc,
	useAdminUpdateKyc,
} from "#/services/mutations.service";
import { STATUS_STYLES } from "./Table";

function ImageModal({ url, onClose }: { url: string; onClose: () => void }) {
	return (
		<Overlay open={!!url} onClose={onClose}>
			<button
				type="button"
				onClick={onClose}
				className="top-3 right-3 z-10 absolute bg-black/60 hover:bg-black/80 p-1.5 rounded-lg text-white hover:text-destructive cursor-pointer"
			>
				<CloseCircle className="size-3 md:size-3.5 xl:size-4" />
			</button>
			<img
				src={url}
				alt="KYC document"
				className="bg-black w-full max-h-[80vh] object-contain"
			/>
		</Overlay>
	);
}

function InfoRow({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="mb-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs uppercase tracking-wider">
				{label}
			</p>
			<p className="font-medium text-[11px] md:text-xs xl:text-sm truncate">
				{value || "—"}
			</p>
		</div>
	);
}

const STATUS_OPTIONS = ["PENDING", "APPROVED", "REJECTED"] as const;
type KycStatus = (typeof STATUS_OPTIONS)[number];

export default function Edit({
	kyc,
	onClose,
}: {
	kyc: AdminKyc;
	onClose: () => void;
}) {
	const [status, setStatus] = useState<KycStatus>(kyc.status as KycStatus);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const update = useAdminUpdateKyc();
	const updateStatus = async (newStatus: KycStatus) => {
		const proceed = confirm(
			`Are you sure you want to change the status to "${newStatus}"?`,
		);
		if (!proceed) return toast.info("Status update cancelled.");
		update.mutate(
			{ id: kyc._id, data: { status: newStatus } },
			{
				onSuccess: () => {
					toast.success("KYC status updated successfully !");
					onClose();
				},
				onError: (error: Error) => {
					toast.error(error.message ?? "Failed to update KYC status.");
				},
			},
		);
		setStatus(newStatus);
	};

	const kycDelete = useAdminDeleteKyc();
	const deleteKyc = async () => {
		kycDelete.mutate(kyc._id, {
			onSuccess: () => {
				toast.success("KYC deleted successfully !");
				onClose();
			},
			onError: (error: Error) => {
				toast.error(error.message ?? "Failed to delete KYC.");
			},
		});
	};

	return (
		<Overlay open={!!kyc} onClose={onClose}>
			{/* Header */}
			<div className="top-0 z-10 sticky flex justify-between items-start gap-4 bg-card py-4 border-border border-b">
				<div>
					<h2 className="font-bold">
						{kyc.firstName} {kyc.lastName}
					</h2>
					<p className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
						{kyc.email}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<span
						className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[status]}`}
					>
						{status}
					</span>
					<button
						type="button"
						onClick={onClose}
						className="hover:bg-muted/50 p-1.5 rounded-lg text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
					>
						<CloseCircle className="size-4 md:size-4.5 xl:size-5" />
					</button>
				</div>
			</div>

			<div className="space-y-6 py-5 text-[11px] md:text-xs xl:text-sm">
				{/* Personal Info */}
				<div>
					<h3 className="mb-3 font-semibold text-muted-foreground uppercase tracking-wider">
						Personal Information
					</h3>
					<div className="gap-4 grid grid-cols-2">
						<InfoRow label="First Name" value={kyc.firstName} />
						<InfoRow label="Last Name" value={kyc.lastName} />
						<InfoRow label="Email" value={kyc.email} />
						<InfoRow label="Phone" value={kyc.phoneNumber} />
						<InfoRow label="Date of Birth" value={kyc.dateOfBirth} />
						<InfoRow
							label="Social Media"
							value={kyc.socialMediaUsername || ""}
						/>
					</div>
				</div>

				{/* Address */}
				<div>
					<h3 className="mb-3 font-semibold text-muted-foreground uppercase tracking-wider">
						Address
					</h3>
					<div className="gap-4 grid grid-cols-2">
						<InfoRow label="Street Address" value={kyc.streetAddress} />
						<InfoRow label="City" value={kyc.city} />
						<InfoRow label="State / Province" value={kyc.stateProvince} />
						<InfoRow
							label="Country / Nationality"
							value={kyc.countryNationality}
						/>
					</div>
				</div>

				{/* Document */}
				<div>
					<h3 className="mb-3 font-semibold text-muted-foreground uppercase tracking-wider">
						Document
					</h3>
					<InfoRow label="Document Type" value={kyc.documentType} />
					<div className="flex gap-3 mt-3">
						{kyc.frontSide && (
							<button
								type="button"
								onClick={() => setImageUrl(kyc.frontSide)}
								className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 px-3 py-2 border border-primary/30 rounded-lg font-medium text-primary transition-colors cursor-pointer"
							>
								<Eye className="size-3 md:size-3.5 xl:size-4" />
								Front Side
							</button>
						)}
						{kyc.backSide && (
							<button
								type="button"
								onClick={() => setImageUrl(kyc.backSide || "")}
								className="flex items-center gap-1.5 bg-muted/20 hover:bg-muted/40 px-3 py-2 border border-border rounded-lg font-medium transition-colors cursor-pointer"
							>
								<Eye className="size-3 md:size-3.5 xl:size-4" />
								Back Side
							</button>
						)}
					</div>
				</div>

				{/* Status Actions */}
				<div>
					<h3 className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						Update Status
					</h3>
					<div className="flex gap-2">
						{["PENDING", "APPROVED", "REJECTED"].map((s) => (
							<button
								type="button"
								key={s}
								onClick={() => updateStatus(s as KycStatus)}
								disabled={update.isPending || kyc.status === s}
								className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold border cursor-pointer transition-all disabled:opacity-50 ${
									status === s
										? STATUS_STYLES[s]
										: "bg-muted/20 border-border text-muted-foreground hover:bg-muted/40"
								}`}
							>
								{update.isPending && status !== s ? null : null}
								{s}
								{status === s && <CircleCheckBig className="size-3" />}
							</button>
						))}
					</div>
				</div>

				{/* Delete */}
				<div className="pt-4 border-border border-t">
					{!confirmDelete ? (
						<button
							type="button"
							onClick={() => setConfirmDelete(true)}
							className="flex items-center gap-1.5 bg-destructive/10 hover:bg-destructive/20 px-4 py-2 border border-destructive/30 rounded-lg font-medium text-destructive text-xs transition-colors cursor-pointer"
						>
							<Trash className="size-3 md:size-3.5 xl:size-4" />
							Delete KYC Record
						</button>
					) : (
						<div className="flex items-center gap-3">
							<p className="font-medium text-destructive text-xs">
								Are you sure? This cannot be undone.
							</p>
							<button
								type="button"
								onClick={deleteKyc}
								disabled={kycDelete.isPending}
								className="bg-destructive hover:opacity-90 disabled:opacity-60 px-4 py-2 rounded-lg font-semibold text-destructive-foreground transition-all cursor-pointer"
							>
								{kycDelete.isPending ? "Deleting..." : "Yes"}
							</button>
							<button
								type="button"
								onClick={() => setConfirmDelete(false)}
								className="hover:bg-muted/50 px-4 py-2 border border-border rounded-lg transition-colors cursor-pointer"
							>
								Cancel
							</button>
						</div>
					)}
				</div>
			</div>

			{imageUrl && (
				<ImageModal url={imageUrl} onClose={() => setImageUrl(null)} />
			)}
		</Overlay>
	);
}
