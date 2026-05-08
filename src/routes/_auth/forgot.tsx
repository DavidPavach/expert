import { createFileRoute } from "@tanstack/react-router";
import Forgot from "@/pages/Auth/Forgot";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_auth/forgot")({
	head: () => ({
		meta: [
			{
				title: `Forgot Password | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Forgot />;
}
