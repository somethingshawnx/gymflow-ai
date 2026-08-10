"use client"

import { useEffect, useState } from "react"
import {
  Bot,
  CheckCircle2,
  Dumbbell,
  Send,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"

type Message = {
  id: number
  type: "ai" | "user"
  text: string
}

const conversation: Message[] = [
  {
    id: 1,
    type: "ai",
    text: "Hi! 👋 Looking for the right gym membership?",
  },
  {
    id: 2,
    type: "ai",
    text: "Tell me your fitness goal and I'll recommend the best plan.",
  },
  {
    id: 3,
    type: "user",
    text: "I want to lose weight and need a flexible plan.",
  },
  {
    id: 4,
    type: "ai",
    text: "Great goal! 💪 Our Pro plan would be a great fit for you.",
  },
]

export function HeroChatPreview() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [showPlan, setShowPlan] = useState(false)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let cancelled = false

    const playConversation = (index: number) => {
      if (cancelled) return

      if (index >= conversation.length) {
        timeout = setTimeout(() => {
          if (!cancelled) {
            setShowPlan(true)
          }
        }, 700)

        return
      }

      const message = conversation[index]

      if (message.type === "ai") {
        setTyping(true)

        timeout = setTimeout(() => {
          if (cancelled) return

          setTyping(false)
          setVisibleMessages((previous) => [
            ...previous,
            message,
          ])

          timeout = setTimeout(() => {
            playConversation(index + 1)
          }, 900)
        }, 1000)
      } else {
        timeout = setTimeout(() => {
          if (cancelled) return

          setVisibleMessages((previous) => [
            ...previous,
            message,
          ])

          timeout = setTimeout(() => {
            playConversation(index + 1)
          }, 1000)
        }, 500)
      }
    }

    playConversation(0)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [])

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
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Chat window */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
        
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

        {/* Conversation */}
        <div className="min-h-[390px] space-y-4 p-5">
          {visibleMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{
                opacity: 0,
                y: 12,
                x: message.type === "user" ? 15 : -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className={
                message.type === "user"
                  ? "flex justify-end"
                  : "flex gap-3"
              }
            >
              {message.type === "ai" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={
                  message.type === "user"
                    ? "max-w-[78%] rounded-2xl rounded-tr-md bg-blue-500 px-4 py-3"
                    : "max-w-[78%] rounded-2xl rounded-tl-md bg-white/5 px-4 py-3"
                }
              >
                <p
                  className={
                    message.type === "user"
                      ? "text-sm leading-6 text-white"
                      : "text-sm leading-6 text-zinc-300"
                  }
                >
                  {message.text}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Bot className="h-4 w-4" />
              </div>

              <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-white/5 px-4 py-4">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:300ms]" />
              </div>
            </motion.div>
          )}

          {/* Recommended plan */}
          {showPlan && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="ml-11 overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-500/[0.06]"
            >
              <div className="border-b border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                    <Dumbbell className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Pro Membership
                    </p>

                    <p className="text-xs text-zinc-500">
                      Recommended for your goal
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-4">
                <p className="text-xl font-bold text-white">
                  ₹2,999
                  <span className="ml-1 text-xs font-normal text-zinc-500">
                    /month
                  </span>
                </p>

                <div className="space-y-1.5">
                  {[
                    "Unlimited gym access",
                    "Personal training support",
                    "Flexible membership",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />

                      <span className="text-xs text-zinc-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
                >
                  Book Free Trial
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex-1 text-sm text-zinc-600">
              Ask GymFlow AI...
            </span>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 transition-colors hover:bg-blue-500/30"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}