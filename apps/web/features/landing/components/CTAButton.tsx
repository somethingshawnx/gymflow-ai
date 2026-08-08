import Link from "next/link"
import { siteConfig } from "@/config"

export function CTAButton() {
  return (
    <Link
      href="#contact"
      className="hidden rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-400 hover:shadow-blue-500/30 md:inline-flex"
    >
      {siteConfig.cta}
    </Link>
  )
}