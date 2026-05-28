import { createFileRoute } from "@tanstack/react-router";
import Me from "@/pages/Admin/Me";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/me")({
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
	return <Me />;
}
