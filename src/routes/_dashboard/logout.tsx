import { createFileRoute } from "@tanstack/react-router";
import Logout from "@/pages/User/Logout";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_dashboard/logout")({
	head: () => ({
		meta: [
			{
				title: `Logout | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Logout />;
}
