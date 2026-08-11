"use client"

import {
  CalendarCheck,
  MessageCircle,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react"
import { motion } from "framer-motion"

import { WorkflowStep } from "./WorkflowStep"

const steps = [
  {
    number: "01",
    icon: UserRound,
    title: "A visitor lands on your website",
    description:
      "A potential member arrives looking for a gym, membership, training program, or answer to a fitness question.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "GymFlow AI starts the conversation",
    description:
      "The AI assistant instantly engages the visitor and answers common questions about memberships, facilities, pricing, and training.",
  },
  {
    number: "03",
    icon: Target,
    title: "The AI qualifies the lead",
    description:
      "GymFlow AI understands the visitor's goals, preferences, budget, and intent to identify the right opportunity.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "The right membership is recommended",
    description:
      "Instead of giving every visitor the same pitch, the AI recommends the membership or service that best matches their needs.",
  },
  {
    number: "05",
    icon: CalendarCheck,
    title: "The visitor takes action",
    description:
      "The AI guides qualified prospects toward a free trial, consultation, membership booking, or conversation with your team.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-zinc-950 px-6 py-28 sm:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/[0.05] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            How It Works
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            From Visitor
            <span className="text-zinc-500"> to Member</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            GymFlow AI handles the sales conversation from the
            first interaction to the next action.
          </p>
        </motion.div>

        {/* Workflow */}
        <div className="mx-auto max-w-3xl">
          {steps.map((step, index) => (
            <WorkflowStep
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}