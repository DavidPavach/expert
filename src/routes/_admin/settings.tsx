import { createFileRoute } from "@tanstack/react-router";

import Settings from "@/pages/Admin/Settings";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/settings")({
	head: () => ({
		meta: [
			{
				title: `Settings | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Settings />;
}
