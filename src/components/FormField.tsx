import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "#/lib/utils";

interface FormFieldProps {
	label: string;
	required?: boolean;
	icon?: ReactNode;
	children: ReactNode;
}

export default function FormField({
	label,
	required,
	icon,
	children,
}: FormFieldProps) {
	return (
		<div className="flex flex-col gap-1.5">
			<label
				htmlFor={label}
				className="flex items-center gap-1 font-medium text-[11px] text-foreground md:text-xs xl:text-sm"
			>
				{label}
				{required && <span className="text-destructive">*</span>}
			</label>
			<div className="relative">
				{icon && (
					<span className="top-1/2 left-3 absolute text-muted-foreground -translate-y-1/2 pointer-events-none">
						{icon}
					</span>
				)}
				{children}
			</div>
		</div>
	);
}

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
	icon?: ReactNode;
}

export function InputBase({ icon, ...props }: InputBaseProps) {
	return (
		<div className="relative">
			{icon && (
				<span className="top-1/2 left-3 absolute text-muted-foreground text-sm -translate-y-1/2 pointer-events-none">
					{icon}
				</span>
			)}
			<input
				{...props}
				className={cn(
					"bg-muted/40 border border-border rounded-xl w-full placeholder:text-muted-foreground",
					"focus:outline-none focus:ring-0 focus:border-accent transition-all",
					"py-2.5 md:py-3 pr-4 placeholder:text-[11px] placeholder:md:text-xs placeholder:xl:text-xs",
					icon ? "pl-10" : "pl-4",
					props.className,
				)}
			/>
		</div>
	);
}
