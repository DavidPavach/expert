import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/contact")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_home/contact"!</div>;
}
