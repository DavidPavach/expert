import { createFileRoute } from "@tanstack/react-router";
import Users from "@/pages/Admin/Users";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/users")({
	head: () => ({
		meta: [
			{
				title: `Users | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Users />;
}
