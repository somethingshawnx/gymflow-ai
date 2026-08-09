"use client"

import { motion } from "framer-motion"

import { HeroContent } from "./HeroContent"
import { HeroChatPreview } from "./HeroChatPreview"

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black pt-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-blue-400/[0.04] blur-[100px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <HeroContent />
        </motion.div>

        <HeroChatPreview />
      </div>
    </section>
  )
}