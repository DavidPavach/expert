import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/traders')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/traders"!</div>
}
