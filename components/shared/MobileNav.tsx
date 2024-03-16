import Logo from "./Logo"

import { EllipsisVertical } from "lucide-react"
import { Separator } from "../ui/separator"
import { MobileNavItems } from "./NavItems"
import { MobileModeToggle } from "./ThemeToggle"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const MobileNav = () => {
  return (
    <nav className="md:hidden pl-2">
      <Sheet>
        <SheetTrigger className="align-middle">
          <EllipsisVertical />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 md:hidden w-full">
          <SheetHeader>
            <Logo />
          </SheetHeader>
          <Separator className=" border-zinc-200" />
          <MobileNavItems />
          <Separator className=" border-zinc-200" />
          <MobileModeToggle />
        </SheetContent>
      </Sheet>
    </nav>
    
  )
}

export default MobileNav