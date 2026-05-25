import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/pages/Home/Landing";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_home/")({
	head: () => ({
		meta: [
			{
				title: `Home | ${APP_NAME}`,
			},
		],
	}),
	component: Landing,
});
