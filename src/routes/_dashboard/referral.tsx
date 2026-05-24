import { createFileRoute } from "@tanstack/react-router";
import Referral from "@/pages/User/Referral";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_dashboard/referral")({
	head: () => ({
		meta: [
			{
				title: `Referral | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Referral />;
}
