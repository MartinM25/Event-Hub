'use client';

import Link from 'next/link'

import { headerLinks } from '@/constants'
import { usePathname } from 'next/navigation'

export function NavItems() {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start text-sm font-light gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive && 'border-b-2 border-primary '
            } flex-center text-zinc-600 hover:text-zinc-950 font-normal whitespace-nowrap py-0.1`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export function MobileNavItems() {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        
        return (
          <Link
            href={link.route}
            key={link.route}
            className={`${
              isActive && 'bg-secondary'
            } p-medium-16 whitespace-nowrap w-full p-2 rounded-sm cursor-pointer hover:bg-secondary`}
          >
            <span>{link.label}</span>
          </Link>
        )
      })}
    </ul>
  )

}