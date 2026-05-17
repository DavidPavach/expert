import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/staff')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/staff"!</div>
}
