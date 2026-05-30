import { createFileRoute } from "@tanstack/react-router";
import Trading from "@/pages/Home/Trading";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/trading")({
	head: () => ({
		meta: [
			{
				title: `Trading | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Trading />;
}
