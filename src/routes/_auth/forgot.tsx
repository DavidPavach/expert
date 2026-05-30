import { createFileRoute } from "@tanstack/react-router";
import Forgot from "@/pages/Auth/Forgot";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_auth/forgot")({
	head: () => ({
		meta: [
			{
				title: `Forgot Password | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>) => ({
		email: search.email as string | undefined,
		verify: search.verify as string | undefined,
	}),
});

function RouteComponent() {
	return <Forgot />;
}
