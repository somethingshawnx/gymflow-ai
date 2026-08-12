"use client"

import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { AIChatDemo } from "./AIChatDemo"

export function AIDemo() {
  return (
    <section
      id="ai-demo"
      className="relative overflow-hidden bg-black px-6 py-28 sm:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.05] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            TRY IT YOURSELF
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Meet Your New
            <span className="text-zinc-500">
              {" "}AI Sales Employee
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Don't just read about GymFlow AI. Have a conversation
            with it and see how it turns a simple question into a
            qualified sales opportunity.
          </p>
        </motion.div>

        {/* Demo */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
              Interactive Demo
            </p>

            <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              See how AI handles the conversation.
            </h3>

            <p className="mt-5 leading-7 text-zinc-400">
              A potential member asks a question. GymFlow AI
              understands the intent, answers naturally, and
              guides them toward the right next step.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Answers membership questions instantly",
                "Understands fitness goals and intent",
                "Recommends the right membership",
                "Moves qualified leads toward booking",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />

                  <span className="text-sm text-zinc-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              Book a free demo

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Chat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
          >
            <AIChatDemo />
          </motion.div>
        </div>
      </div>
    </section>
  )
}