import { Navbar } from "@/features/landing/components"

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Navbar />

      <section
        id="home"
        className="flex min-h-screen items-center justify-center px-6 pt-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
            GymFlow AI
          </p>

          <h1 className="text-5xl font-bold tracking-[-0.04em] md:text-7xl lg:text-8xl">
            Your AI Sales Employee
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Turn website visitors into paying gym members with an AI-powered
            sales assistant.
          </p>
        </div>
      </section>

      <section id="features" className="h-screen" />
      <section id="demo" className="h-screen" />
      <section id="pricing" className="h-screen" />
      <section id="contact" className="h-screen" />
    </main>
  )
}