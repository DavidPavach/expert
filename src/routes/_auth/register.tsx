import { createFileRoute } from "@tanstack/react-router";
import Register from "@/pages/Auth/Register";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_auth/register")({
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
	return <Register />;
}
