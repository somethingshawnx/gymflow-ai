"use client"

import { Bot, User } from "lucide-react"
import { motion } from "framer-motion"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({
  role,
  content,
}: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "rounded-tr-md bg-blue-500 text-white"
            : "rounded-tl-md bg-white/5 text-zinc-300"
        }`}
      >
        <p className="text-sm leading-6">
          {content}
        </p>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-zinc-400">
          <User className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  )
}