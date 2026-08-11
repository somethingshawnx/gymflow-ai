"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface WorkflowStepProps {
  number: string
  icon: LucideIcon
  title: string
  description: string
  index: number
}

export function WorkflowStep({
  number,
  icon: Icon,
  title,
  description,
  index,
}: WorkflowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className="relative"
    >
      <div className="flex gap-5">
        {/* Number / Icon */}
        <div className="relative flex shrink-0 flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <Icon className="h-5 w-5" />
          </div>

          {index < 4 && (
            <div className="mt-3 h-full min-h-16 w-px bg-gradient-to-b from-blue-500/30 to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className="pb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
            Step {number}
          </p>

          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}