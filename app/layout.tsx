import type { Metadata } from "next";
import "./globals.css";
import NavLink from '@/components/NavLink'

export const metadata: Metadata = {
  title: "Puns App Client",
  description: "A translation of the puns app in react to next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <NavLink href="/" className="logo" end>😄 Puns</NavLink>
          <nav>
            <NavLink href="/" end>All puns</NavLink>
            <NavLink href="/puns/new">Add new pun</NavLink>
          </nav>
        </header>
      
        <main>{children}</main>
      </body>
    </html>
  )
}
