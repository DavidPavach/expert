import { createFileRoute } from "@tanstack/react-router";
import Trades from "@/pages/Admin/Trades";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/trades")({
	head: () => ({
		meta: [
			{
				title: `Trades | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Trades />;
}
