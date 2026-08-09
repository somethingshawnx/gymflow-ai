"use client"

import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroActions() {
  return (
    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href="#contact"
          className="group flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-400"
        >
          Book Free Demo

          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href="#ai-demo"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
        >
          <Play className="h-4 w-4 fill-current" />

          See AI Demo
        </Link>
      </motion.div>
    </div>
  )
}