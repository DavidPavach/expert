import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/transactions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/transactions"!</div>
}
