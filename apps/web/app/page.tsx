import {
  AIDemo,
  Contact,
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

      <AIDemo />

      <Contact />
    </main>
  )
}