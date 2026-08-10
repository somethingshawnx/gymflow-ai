"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-colors duration-300 hover:border-blue-500/30 hover:bg-white/[0.04]"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-blue-500/15">
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  )
}