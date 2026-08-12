"use client"

import { FormEvent, useState } from "react"
import { Bot, Send, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { ChatMessage } from "./ChatMessage"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! 👋 I'm GymFlow AI. What are you looking to achieve with your fitness journey?",
  },
]

function generateResponse(message: string) {
  const text = message.toLowerCase()

  if (
    text.includes("weight") ||
    text.includes("lose") ||
    text.includes("fat")
  ) {
    return "Great goal! 💪 I'd recommend our Pro Membership with personal training support. Would you like to book a free trial?"
  }

  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("membership")
  ) {
    return "Our Pro Membership starts at ₹2,999/month and includes unlimited gym access and personal training support."
  }

  if (
    text.includes("trial") ||
    text.includes("visit")
  ) {
    return "Absolutely! You can book a free trial and experience the gym before committing to a membership."
  }

  return "I'd be happy to help! Tell me about your fitness goal, preferred training style, or what you're looking for in a gym."
}

export function AIChatDemo() {
  const [messages, setMessages] =
    useState<Message[]>(initialMessages)

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedInput = input.trim()

    if (!trimmedInput || isTyping) {
      return
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedInput,
    }

    setMessages((previous) => [
      ...previous,
      userMessage,
    ])

    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: generateResponse(trimmedInput),
      }

      setMessages((previous) => [
        ...previous,
        response,
      ])

      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Bot className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              GymFlow AI
            </p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-xs text-zinc-500">
                AI Sales Assistant
              </span>
            </div>
          </div>
        </div>

        <Sparkles className="h-5 w-5 text-blue-400" />
      </div>

      {/* Messages */}
      <div className="flex min-h-[430px] flex-col gap-4 overflow-y-auto p-5">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Bot className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-white/5 px-4 py-4">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:300ms]" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 p-4"
      >
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2">
          <input
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            placeholder="Ask GymFlow AI..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white transition-all hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}