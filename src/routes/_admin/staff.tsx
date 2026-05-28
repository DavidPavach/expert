import { createFileRoute } from "@tanstack/react-router";
import Admin from "@/pages/Admin/Staff";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/staff")({
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
	return <Admin />;
}
