import SidebarNav from "@/components/shared/SidebarNav"
import { Separator } from "@/components/ui/separator"



const sidebarNavItems = [
  {
    title: "Tickets",
    href: "/profile",
  },
  {
    title: "Events Organized",
    href: "/profile/my-events",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 w-full px-8 lg:px-20 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Manage your tickets and events.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}