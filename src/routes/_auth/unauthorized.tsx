import { createFileRoute } from "@tanstack/react-router";
import UnauthorizedPage from "#/pages/Auth/Unauthorized";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_auth/unauthorized")({
	head: () => ({
		meta: [
			{
				title: `Register | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <UnauthorizedPage />;
}
