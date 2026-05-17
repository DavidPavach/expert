import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/copy-trading')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/copy-trading"!</div>
}
