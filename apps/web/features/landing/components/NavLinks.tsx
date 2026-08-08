import Link from "next/link"
import { navigation } from "@/config"

export function NavLinks() {
  return (
    <nav
      className="hidden items-center gap-8 md:flex"
      aria-label="Main navigation"
    >
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}