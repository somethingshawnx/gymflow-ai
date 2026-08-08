import Link from "next/link"
import { siteConfig } from "@/config"

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2"
      aria-label={`${siteConfig.name} home`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 font-bold text-white transition-transform duration-300 group-hover:scale-105">
        G
      </span>

      <span className="text-lg font-semibold tracking-tight text-white">
        GymFlow <span className="text-blue-400">AI</span>
      </span>
    </Link>
  )
}