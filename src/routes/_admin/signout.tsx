import { createFileRoute } from "@tanstack/react-router";
import Logout from "@/pages/User/Logout";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/signout")({
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
	return <Logout />;
}
