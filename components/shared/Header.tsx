import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Logo from "./Logo"
import Link from "next/link"
import { Button } from "../ui/button"
import { NavItems } from "./NavItems"
import { ModeToggle } from "./ThemeToggle"
import MobileNav from "./MobileNav"
import { Separator } from "../ui/separator"

const Header = () => {
  return (
    <header className="w-full border-b fixed z-10 bg-background ">
      <div className="flex w-full lg:px-20 pl-10 py-2 items-center justify-between">
        <Link href="/" className="w-36">
          <Logo />
        </Link>

        <div className="flex flex-center justify-end gap-3">
          <SignedIn>
            <nav className="md:flex-between hidden w-full max-w-xs gap-2">
              <NavItems />
              <Separator orientation="vertical" className="h-10 mx-3" />
            </nav>
            
            <UserButton afterSignOutUrl="/" />
            <MobileNav /> 
            <div className="hidden md:flex">  
              <ModeToggle />
            </div>
          </SignedIn>

          <SignedOut>
            <Button asChild className="rounded-lg dark:text-white" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
            <ModeToggle />
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header