import { prisma } from "@/lib/prisma"
import {
  LeadIntent as PrismaLeadIntent,
  LeadStatus as PrismaLeadStatus,
} from "@/generated/prisma/client"

import { qualifyLead } from "./qualification"

interface CreateLeadInput {
  name: string
  email: string
  gym: string
  message: string
}

function toPrismaIntent(
  intent:
    | "unknown"
    | "weight_loss"
    | "muscle_gain"
    | "fitness"
    | "membership"
    | "trial"
    | "booking"
): PrismaLeadIntent {
  switch (intent) {
    case "weight_loss":
      return PrismaLeadIntent.WEIGHT_LOSS

    case "muscle_gain":
      return PrismaLeadIntent.MUSCLE_GAIN

    case "fitness":
      return PrismaLeadIntent.FITNESS

    case "membership":
      return PrismaLeadIntent.MEMBERSHIP

    case "trial":
      return PrismaLeadIntent.TRIAL

    case "booking":
      return PrismaLeadIntent.BOOKING

    default:
      return PrismaLeadIntent.UNKNOWN
  }
}

export async function createLead(
  input: CreateLeadInput
) {
  const qualification = qualifyLead(
    input.message
  )

  const status = qualification.qualified
    ? PrismaLeadStatus.QUALIFIED
    : PrismaLeadStatus.NEW

  let gym = await prisma.gym.findFirst({
    where: {
      name: input.gym,
    },
  })

  if (!gym) {
    gym = await prisma.gym.create({
      data: {
        name: input.gym,
      },
    })
  }

  const lead = await prisma.lead.create({
    data: {
      gymId: gym.id,
      name: input.name,
      email: input.email,
      intent: toPrismaIntent(
        qualification.intent
      ),
      status,
      score: qualification.score,
      source: "website",
      message: input.message,
    },
  })

  return lead
}