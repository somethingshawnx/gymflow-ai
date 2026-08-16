"use client"

import {
  FormEvent,
  useState,
} from "react"
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react"
import { motion } from "framer-motion"

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"

interface LeadResponse {
  success?: boolean
  message?: string
  lead?: {
    id?: string
    intent?: string
    score?: number
    status?: string
  }
}

export function Contact() {
  const [status, setStatus] =
    useState<SubmitStatus>("idle")

  const [errorMessage, setErrorMessage] =
    useState("")

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setStatus("submitting")
    setErrorMessage("")

    const form = event.currentTarget

    const formData = new FormData(form)

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      gym: String(formData.get("gym") ?? "").trim(),
      message: String(
        formData.get("message") ?? ""
      ).trim(),
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const contentType =
        response.headers.get("content-type") ?? ""

      let data: LeadResponse = {}

      if (contentType.includes("application/json")) {
        data = (await response.json()) as LeadResponse
      } else {
        const text = await response.text()

        throw new Error(
          text ||
            "The server returned an unexpected response."
        )
      }

      if (!response.ok) {
        throw new Error(
          data.message ??
            "Unable to submit your request."
        )
      }

      setStatus("success")
      form.reset()
    } catch (error) {
      console.error("CONTACT FORM ERROR:", error)

      setStatus("error")

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your request."
      )
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-28 sm:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.04] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-500">
              Get Started
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turn more visitors
              <span className="block text-zinc-500">
                into members.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              See how GymFlow AI can handle
              conversations, qualify leads, answer
              membership questions, and help your
              gym convert more website visitors.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Free product demonstration",
                "See the AI sales workflow",
                "Discuss your gym&apos;s requirements",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />

                  <span className="text-sm text-zinc-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Mail className="h-4 w-4 text-blue-400" />
                hello@gymflow.ai
              </div>

              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Phone className="h-4 w-4 text-blue-400" />
                Book a call with our team
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/30 sm:p-8"
          >
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Thanks for reaching out!
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
                  We&apos;ve received your request.
                  Our team will get back to you
                  shortly to schedule your demo.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white">
                  Book your free demo
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Tell us a little about yourself
                  and we&apos;ll get in touch.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-blue-500/50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-blue-500/50"
                    />
                  </div>

                  {/* Gym */}
                  <div>
                    <label
                      htmlFor="gym"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Gym / Business Name
                    </label>

                    <input
                      id="gym"
                      name="gym"
                      type="text"
                      required
                      placeholder="Your gym name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-blue-500/50"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      What would you like to improve?
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your current sales process..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-blue-500/50"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                      {errorMessage}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={
                      status === "submitting"
                    }
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "submitting"
                      ? "Submitting..."
                      : "Book Free Demo"}

                    {status !== "submitting" && (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}