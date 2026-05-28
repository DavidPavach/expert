import { createFileRoute } from "@tanstack/react-router";
import Referrals from "@/pages/Admin/Referrals";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/user-referrals")({
	head: () => ({
		meta: [
			{
				title: `Referrals | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Referrals />;
}
