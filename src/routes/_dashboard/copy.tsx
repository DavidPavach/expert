import { createFileRoute } from "@tanstack/react-router";
import Copy from "@/pages/User/Copy";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_dashboard/copy")({
	head: () => ({
		meta: [
			{
				title: `Copy Trading | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Copy />;
}
