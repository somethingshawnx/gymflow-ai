import type {
  LeadIntent,
  QualificationResult,
} from "./types"

export function qualifyLead(
  message: string
): QualificationResult {
  const text = message.toLowerCase().trim()

  let score = 0
  let intent: LeadIntent = "unknown"

  if (
    text.includes("book") ||
    text.includes("booking") ||
    text.includes("appointment")
  ) {
    intent = "booking"
    score += 40
  }

  if (
    text.includes("trial") ||
    text.includes("free")
  ) {
    intent = "trial"
    score += 30
  }

  if (
    text.includes("weight") ||
    text.includes("lose") ||
    text.includes("fat")
  ) {
    intent = "weight_loss"
    score += 30
  }

  if (
    text.includes("muscle") ||
    text.includes("muscles") ||
    text.includes("bulk") ||
    text.includes("strength")
  ) {
    intent = "muscle_gain"
    score += 30
  }

  if (
    text.includes("membership") ||
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("plan")
  ) {
    intent = "membership"
    score += 25
  }

  if (
    text.includes("gym") ||
    text.includes("fitness") ||
    text.includes("workout") ||
    text.includes("exercise")
  ) {
    if (intent === "unknown") {
      intent = "fitness"
    }

    score += 20
  }

  score = Math.min(score, 100)

  return {
    intent,
    score,
    qualified: score >= 50,
  }
}