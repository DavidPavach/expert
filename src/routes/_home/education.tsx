import { createFileRoute } from "@tanstack/react-router";
import Education from "@/pages/Home/Education";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/education")({
	head: () => ({
		meta: [
			{
				title: `Education | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Education />;
}
