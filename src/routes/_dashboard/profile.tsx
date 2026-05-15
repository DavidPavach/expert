import { createFileRoute } from "@tanstack/react-router";
import Profile from "@/pages/User/Profile";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_dashboard/profile")({
	head: () => ({
		meta: [
			{
				title: `Profile | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Profile />;
}
