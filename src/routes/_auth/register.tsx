import { createFileRoute } from "@tanstack/react-router";
import Register from "@/pages/Auth/Register";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_auth/register")({
	head: () => ({
		meta: [
			{
				title: `Register | ${APP_NAME}`,
			},
		],
	}),
	validateSearch: (search: Record<string, unknown>) => ({
		ref: search.ref as string | undefined,
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Register />;
}
