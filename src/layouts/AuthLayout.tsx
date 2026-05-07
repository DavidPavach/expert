// UIs
import { ThemeToggle } from "@/components/ThemeToggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex justify-center items-center p-4 min-h-dvh">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="-top-32 left-1/2 absolute bg-primary/10 blur-3xl rounded-full size-600 -translate-x-1/2" />
				<div className="right-0 bottom-0 absolute bg-accent/8 blur-3xl rounded-full size-400" />
			</div>
			<div className="top-4 right-4 z-2 absolute">
				<ThemeToggle />
			</div>
			{children}
		</main>
	);
};

export default AuthLayout;
