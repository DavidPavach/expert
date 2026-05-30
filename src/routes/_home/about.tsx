import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/Home/About";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/about")({
	head: () => ({
		meta: [
			{
				title: `About Us | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <About />;
}
