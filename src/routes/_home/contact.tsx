import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Home/Contact";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/contact")({
	head: () => ({
		meta: [
			{
				title: `Contact | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Contact />;
}
