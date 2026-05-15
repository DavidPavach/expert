import { createFileRoute } from "@tanstack/react-router";
import Withdraw from "@/pages/User/Withdraw";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_dashboard/withdrawal")({
	head: () => ({
		meta: [
			{
				title: `Withdrawal | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Withdraw />;
}
