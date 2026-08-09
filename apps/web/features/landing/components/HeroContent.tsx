import { HeroActions } from "./HeroActions"

export function HeroContent() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-blue-500">
        GymFlow AI
      </p>

      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
        Your AI Sales Employee
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
        Turn website visitors into paying gym members with an AI-powered
        sales assistant.
      </p>

      <HeroActions />
    </div>
  )
}