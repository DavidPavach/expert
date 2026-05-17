import { createFileRoute } from "@tanstack/react-router";
import Transactions from "@/pages/Admin/Transactions";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/transactions")({
	head: () => ({
		meta: [
			{
				title: `Transactions | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Transactions />;
}
