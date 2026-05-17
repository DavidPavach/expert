import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/me')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/admin"!</div>
}
