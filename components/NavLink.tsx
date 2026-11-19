'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({
  href,
  end = false,
  children,
}: {
  href: string
  end?: boolean
  className?: string
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = end ? pathname === href : pathname.startsWith(href)

  return (
    <Link href={href} className={isActive ? 'font-bold underline' : ''}>
      {children}
    </Link>
  )
}