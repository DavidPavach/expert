import { createFileRoute } from "@tanstack/react-router";
import LiveSection from "@/pages/User/LiveSection";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_dashboard/section")({
	head: () => ({
		meta: [
			{
				title: `Live Section | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <LiveSection />;
}
