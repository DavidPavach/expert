// UIs
import { ThemeToggle } from "@/components/ThemeToggle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="place-content-center grid p-4 min-h-dvh">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="-top-32 left-1/2 absolute bg-primary/5 blur-3xl rounded-full size-600 -translate-x-1/2" />
				<div className="right-0 bottom-0 absolute bg-accent/4 blur-3xl rounded-full size-400" />
			</div>
			<section className="top-4 right-4 z-2 absolute">
				<ThemeToggle />
			</section>
			<section className="relative flex flex-col w-full max-w-lg md:max-w-xl xl:max-w-2xl">
				<img
					src="/logo.png"
					alt="Expertmirrorcon Logo"
					className="bg-background shadow mx-auto p-2 rounded-xl md:rounded-2xl size-12 md:size-14 xl:size-16"
				/>
				{children}
			</section>
		</main>
	);
};

export default AuthLayout;
