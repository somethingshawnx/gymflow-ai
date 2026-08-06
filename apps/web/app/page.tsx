import { Container } from "@/components/ui/container"

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Container className="py-24">
        <h1 className="text-6xl font-bold tracking-tight">
          GymFlow AI 🚀
        </h1>

        <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
          Turn every website visitor into a paying gym member with an AI-powered
          sales assistant.
        </p>
      </Container>
    </main>
  )
}