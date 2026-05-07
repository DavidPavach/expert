import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { ToastContainer } from "react-fox-toast";
import { ThemeSync } from "#/hooks/ThemeSync";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const APP_NAME = "ExpertMirrorCon - Copy . AI . Bot";
export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: APP_NAME,
			},
			{
				name: "description",
				content:
					"Your reliable gateway to trading Stocks, Fiat currencies, Exchange-traded funds, Options and futures and other tradable assets",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				<script>
					{`(function() {
						const saved = localStorage.getItem('theme');
						const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
						const theme = saved || (systemDark ? 'dark' : 'light');
						document.documentElement.classList.toggle(
							'dark',
							theme === 'dark'
						);
					})();`}
				</script>
			</head>
			<body>
				{children}
				<ToastContainer
					position="top-center"
					isPausedOnHover={true}
					duration={5000}
				/>
				<ThemeSync />
				<Scripts />
			</body>
		</html>
	);
}
