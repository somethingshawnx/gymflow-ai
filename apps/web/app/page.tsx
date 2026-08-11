import {
  Features,
  Hero,
  HowItWorks,
  Navbar,
} from "@/features/landing/components"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <section
        id="ai-demo"
        className="min-h-screen bg-zinc-950 px-6 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-white">
            AI Demo
          </h2>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen bg-black px-6 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-white">
            Contact
          </h2>
        </div>
      </section>
    </main>
  )
}