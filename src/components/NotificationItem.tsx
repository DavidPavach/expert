import {
	Danger,
	Eye,
	InfoCircle,
	Notification,
	TickCircle,
	Trash,
	Warning2,
} from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-fox-toast";
import { useDeleteNots, useMarkNots } from "#/services/mutations.service";
import { Overlay } from "./Overlay";

export function NotificationItem({ notification }: { notification: Nots }) {
	const iconMap = {
		INFO: InfoCircle,
		SUCCESS: TickCircle,
		WARNING: Warning2,
		ERROR: Danger,
	};

	const colorMap = {
		INFO: "text-blue-500 bg-blue-500/10",
		SUCCESS: "text-green-500 bg-green-500/10",
		WARNING: "text-amber-500 bg-amber-500/10",
		ERROR: "text-destructive bg-destructive/10",
	};

	const Icon = iconMap[notification.type];

	const [selectedNot, setSelectedNot] = useState<Nots | null>(null);

	return (
		<>
			{selectedNot && (
				<Overlay open={!!selectedNot} onClose={() => setSelectedNot(null)}>
					<NotificationBody
						notification={selectedNot}
						onClose={() => setSelectedNot(null)}
					/>
				</Overlay>
			)}
			<button
				type="button"
				onClick={() => setSelectedNot(notification)}
				className={`group relative border-b border-border p-4 w-full text-left cursor-pointer transition-all hover:bg-accent/5 ${
					!notification.isRead ? "bg-primary/5" : ""
				}`}
			>
				<div className="flex gap-3">
					<div
						className={`flex size-8 md:size-9 xl:size-10 items-center justify-center rounded-lg ${
							colorMap[notification.type]
						}`}
					>
						<Icon className="size-4 md:size-4.5 xl:size-5" variant="Bold" />
					</div>

					<div className="flex-1 min-w-0">
						<div className="flex justify-between items-start gap-3">
							<h4 className="font-semibold">{notification.title}</h4>

							{!notification.isRead && (
								<div className="bg-primary mt-1 rounded-full size-2" />
							)}
						</div>

						<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm line-clamp-2">
							{notification.message}
						</p>

						<p className="mt-2 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							{new Date(notification.createdAt).toLocaleString()}
						</p>
					</div>
				</div>
			</button>
		</>
	);
}

export function NotificationSkeleton() {
	return (
		<>
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={`nots_${
						// biome-ignore lint/suspicious/noArrayIndexKey: <>
						i
					}`}
					className="p-4 border-border border-b"
				>
					<div className="flex gap-3">
						<div className="bg-muted rounded-xl size-10 animate-pulse" />

						<div className="flex-1">
							<div className="bg-muted mb-2 rounded w-40 h-4 animate-pulse" />

							<div className="bg-muted mb-2 rounded w-full h-3 animate-pulse" />

							<div className="bg-muted rounded w-24 h-3 animate-pulse" />
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export function NotificationEmpty() {
	return (
		<div className="flex flex-col justify-center items-center px-4 md:px-5 xl:px-6 py-16">
			<div className="flex justify-center items-center bg-accent mb-4 rounded-2xl size-10 md:size-12 xl:size-14">
				<Notification className="size-5 md:size-6 xl:size-7 text-muted-foreground" />
			</div>

			<h3 className="font-semibold">No Notifications</h3>

			<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm text-center">
				You are all caught up.
			</p>
		</div>
	);
}

function NotificationBody({
	notification,
	onClose,
}: {
	notification: Nots;
	onClose: () => void;
}) {
	const getTypeConfig = () => {
		switch (notification.type) {
			case "SUCCESS":
				return {
					icon: TickCircle,
					iconClass: "text-green-500",
					borderClass: "border-green-500/20",
					bgClass: "bg-green-500/5",
				};

			case "WARNING":
				return {
					icon: Warning2,
					iconClass: "text-amber-500",
					borderClass: "border-amber-500/20",
					bgClass: "bg-amber-500/5",
				};

			case "ERROR":
				return {
					icon: Danger,
					iconClass: "text-destructive",
					borderClass: "border-destructive/20",
					bgClass: "bg-destructive/5",
				};

			default:
				return {
					icon: InfoCircle,
					iconClass: "text-primary",
					borderClass: "border-primary/20",
					bgClass: "bg-primary/5",
				};
		}
	};

	const config = getTypeConfig();
	const Icon = config.icon;

	const timeAgo = (dateString: string) => {
		const now = new Date();
		const date = new Date(dateString);

		const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

		if (diff < 60) return "Just now";

		if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;

		if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;

		if (diff < 604800) return `${Math.floor(diff / 86400)} day ago`;

		return date.toLocaleDateString();
	};

	const mark = useMarkNots();
	const onMarkAsRead = (id: string) => {
		mark.mutate(id, {
			onSuccess: () => {
				toast.success("Notification Read!");
			},
			onError: (error: Error) => {
				toast.error(error.message ?? "Failed To Read Notification.");
			},
		});
	};

	const deleteNots = useDeleteNots();
	const onDelete = (id: string) => {
		deleteNots.mutate(id, {
			onSuccess: () => {
				toast.success("Notification Deleted!");
				onClose();
			},
			onError: (error: Error) => {
				toast.error(error.message ?? "Failed To Delete Notification.");
			},
		});
	};

	return (
		<div
			className={`rounded-xl border p-2 transition-all hover:bg-accent/10 ${config.borderClass} ${config.bgClass}`}
		>
			<div className="flex gap-3">
				{/* Icon */}
				<div className="relative shrink-0">
					<div className="flex justify-center items-center bg-accent/20 rounded-xl size-10">
						<Icon className={`size-5 ${config.iconClass}`} variant="Bold" />
					</div>

					{!notification.isRead && (
						<span className="-top-1 -right-1 absolute bg-primary rounded-full size-3" />
					)}
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<div className="flex justify-between items-start gap-2">
						<div>
							<h3 className="font-semibold">{notification.title}</h3>

							<p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
								{notification.message}
							</p>
						</div>

						<span className="bg-accent/20 px-2 py-1 rounded-full font-medium text-[10px] text-muted-foreground md:text-[11px] xl:text-xs shrink-0">
							{notification.trigger.replace("_", " ")}
						</span>
					</div>

					<div className="flex justify-between items-center mt-3">
						<p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
							{timeAgo(notification.createdAt)}
						</p>

						<div className="flex items-center gap-x-2">
							{!notification.isRead && (
								<button
									type="button"
									onClick={() => onMarkAsRead(notification._id)}
									className="flex items-center gap-1 bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded-md text-[11px] text-primary md:text-xs xl:text-sm transition-colors cursor-pointer"
								>
									<Eye
										className="size-3 md:size-3.5 xl:size-4"
										variant="Outline"
									/>
									Read
								</button>
							)}

							<button
								type="button"
								onClick={() => onDelete(notification._id)}
								className="flex items-center gap-1 bg-destructive/10 hover:bg-destructive/20 px-2 py-1 rounded-md text-[11px] text-destructive md:text-xs xl:text-sm transition-colors cursor-pointer"
							>
								<Trash
									className="size-3 md:size-3.5 xl:size-4"
									variant="Outline"
								/>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
