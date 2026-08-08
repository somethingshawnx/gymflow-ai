"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

import { navigation, siteConfig } from "@/config"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="fixed inset-x-4 top-24 z-[60] rounded-2xl border border-white/10 bg-zinc-950/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl md:hidden"
          >
            <nav
              className="flex flex-col"
              aria-label="Mobile navigation"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="#contact"
              onClick={onClose}
              className="mt-3 flex w-full items-center justify-center rounded-xl bg-blue-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400"
            >
              {siteConfig.cta}
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}