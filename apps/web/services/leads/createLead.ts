import { qualifyLead } from "./qualification"
import type { Lead } from "./types"

interface CreateLeadInput {
  name: string
  email: string
  gym: string
  message: string
}

export function createLead(
  input: CreateLeadInput
): Lead {
  const qualification = qualifyLead(input.message)

  const lead: Lead = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    phone: undefined,
    intent: qualification.intent,
    status: qualification.qualified
      ? "qualified"
      : "new",
    score: qualification.score,
    createdAt: new Date().toISOString(),
  }

  return lead
}