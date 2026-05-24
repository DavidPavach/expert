import { createFileRoute } from "@tanstack/react-router";
import History from "@/pages/User/History";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_dashboard/history")({
	head: () => ({
		meta: [
			{
				title: `History | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <History />;
}
