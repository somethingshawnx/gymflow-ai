"use client"

import { Bot, CheckCircle2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function HeroChatPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut",
      }}
      className="relative mx-auto mt-16 w-full max-w-lg"
    >
      {/* Glow */}
      <div className="absolute -inset-8 -z-10 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Card */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/90 shadow-2xl shadow-black/50 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <Bot className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                GymFlow AI
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-xs text-zinc-500">
                  Online
                </span>
              </div>
            </div>
          </div>

          <Sparkles className="h-5 w-5 text-blue-400" />
        </div>

        {/* Chat */}
        <div className="space-y-5 p-5">
          {/* AI message */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Bot className="h-4 w-4" />
            </div>

            <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/5 px-4 py-3">
              <p className="text-sm leading-6 text-zinc-300">
                Hi! 👋 Looking for the right gym membership?
                I can help you find the perfect plan.
              </p>
            </div>
          </motion.div>

          {/* User message */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="flex justify-end"
          >
            <div className="max-w-[75%] rounded-2xl rounded-tr-md bg-blue-500 px-4 py-3">
              <p className="text-sm leading-6 text-white">
                I want to lose weight and need a flexible plan.
              </p>
            </div>
          </motion.div>

          {/* AI response */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Bot className="h-4 w-4" />
            </div>

            <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/5 px-4 py-3">
              <p className="text-sm leading-6 text-zinc-300">
                Great goal! Our flexible plan gives you access to
                all the equipment and personal training support you need.
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Recommended plan
              </div>
            </div>
          </motion.div>
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="text-sm text-zinc-600">
              Ask GymFlow AI...
            </span>

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}