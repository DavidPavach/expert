import { createFileRoute } from "@tanstack/react-router";
import Kyc from "@/pages/Admin/Kyc";
import { APP_NAME } from "../__root";

export const Route = createFileRoute("/_admin/user-kyc")({
	head: () => ({
		meta: [
			{
				title: `KYCs | ${APP_NAME}`,
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <Kyc />;
}
