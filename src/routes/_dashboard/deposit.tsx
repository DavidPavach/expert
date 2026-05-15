import { createFileRoute } from "@tanstack/react-router";

import Deposit from "@/pages/User/Deposit";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_dashboard/deposit")({
	head: () => ({
		meta: [
			{
				title: `Deposit | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Deposit />;
}
