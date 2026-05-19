import { createFileRoute } from "@tanstack/react-router";
import Traders from "@/pages/Admin/Traders";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/traders")({
	head: () => ({
		meta: [
			{
				title: `Traders | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Traders />;
}
