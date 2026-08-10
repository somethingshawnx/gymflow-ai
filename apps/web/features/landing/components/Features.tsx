"use client"

import { motion } from "framer-motion"
import { FeaturesGrid } from "./FeaturesGrid"

export function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-black px-6 py-28 sm:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.05] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            Built for Gym Growth
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Turn More Conversations
            <span className="block text-zinc-500">
              Into Members
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            GymFlow AI handles the repetitive sales work while
            your team focuses on delivering an exceptional gym
            experience.
          </p>
        </motion.div>

        {/* Features */}
        <FeaturesGrid />
      </div>
    </section>
  )
}