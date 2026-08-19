"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { generateGymFlowResponse } from "@/services/ai";
import { qualifyLead } from "@/services/leads/qualification";

import { ChatMessage } from "./ChatMessage";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface SaveMessageResponse {
  success: boolean;
  conversationId: string;
  message?: string;
  savedMessage?: {
    id: string;
    role: string;
    content: string;
  };
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! 👋 I'm GymFlow AI. What are you looking to achieve with your fitness journey?",
  },
];

export function AIChatDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [conversationId, setConversationId] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Keep scrolling inside the chat box only
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [messages, isTyping]);

  /**
   * Save a message through the server API.
   * The browser never imports Prisma/server-only code.
   */
  const saveMessage = async (
    role: "user" | "assistant",
    content: string,
    currentConversationId?: string | null,
  ): Promise<string | null> => {
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: currentConversationId ?? null,
          role,
          content,
        }),
      });

      const data = (await response.json()) as SaveMessageResponse;

      if (!response.ok) {
        throw new Error(data.message ?? "Failed to save conversation message.");
      }

      if (!conversationId) {
        setConversationId(data.conversationId);
      }

      return data.conversationId;
    } catch (error) {
      console.error("CONVERSATION SAVE ERROR:", error);

      return null;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const trimmedInput = input.trim();

    if (!trimmedInput || isTyping) {
      return;
    }

    console.log("MESSAGE:", trimmedInput);

    const qualification = qualifyLead(trimmedInput);

    console.log("LEAD QUALIFICATION:", qualification);

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedInput,
    };

    setMessages((previous) => [...previous, userMessage]);

    setInput("");
    setIsTyping(true);

    /*
     * Save the user's message first.
     *
     * First message:
     * Gym → Lead → Conversation → Message
     *
     * Later messages:
     * Existing Conversation → Message
     */
    const savedConversationId = await saveMessage(
      "user",
      trimmedInput,
      conversationId,
    );

    /*
     * Generate the assistant response.
     */
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: generateGymFlowResponse(trimmedInput),
    };

    setMessages((previous) => [...previous, response]);

    /*
     * Save the assistant response using
     * the exact conversation ID returned
     * from the user message request.
     */
    await saveMessage(
      "assistant",
      response.content,
      savedConversationId ?? conversationId,
    );

    setIsTyping(false);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Bot className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">GymFlow AI</p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-xs text-zinc-500">AI Sales Assistant</span>
            </div>
          </div>
        </div>

        <Sparkles className="h-5 w-5 text-blue-400" />
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex max-h-[430px] min-h-[430px] flex-col gap-4 overflow-y-auto p-5"
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
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
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask GymFlow AI..."
            autoComplete="off"
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white transition-all hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
