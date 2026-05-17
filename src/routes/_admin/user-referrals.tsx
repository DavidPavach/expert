import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/user-referrals')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/user-referrals"!</div>
}
