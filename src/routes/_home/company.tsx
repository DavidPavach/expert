import { createFileRoute } from "@tanstack/react-router";
import Company from "@/pages/Home/Company";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/company")({
	head: () => ({
		meta: [
			{
				title: `Company | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Company />;
}
