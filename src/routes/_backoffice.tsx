import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { isAuthenticated } from '@/lib/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_backoffice')({
    beforeLoad: ({ location }) => {
        if (!isAuthenticated()) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.pathname,
                },
            })
        }
    },
    component: BackOfficeLayout,
})

function BackOfficeLayout() {
    return (
        <>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant='inset' />
                <SidebarInset>
                    <SiteHeader />
                    <main className="flex flex-col flex-1">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex-1 p-4">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
