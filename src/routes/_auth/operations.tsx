import { createFileRoute } from "@tanstack/react-router";
import Operations from "@/pages/Auth/Operations";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_auth/operations")({
	head: () => ({
		meta: [
			{
				title: `Operations | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Operations />;
}
