import { createFileRoute } from "@tanstack/react-router";
import Support from "@/pages/User/Support";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_dashboard/support")({
	head: () => ({
		meta: [
			{
				title: `Support | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Support />;
}
