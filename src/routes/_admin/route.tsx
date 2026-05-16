import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout
import AdminLayout from "@/layouts/AdminLayout";

export const Route = createFileRoute("/_admin")({
	component: UserLayoutWrapper,
});

function UserLayoutWrapper() {
	return (
		<AdminLayout>
			<Outlet />
		</AdminLayout>
	);
}
