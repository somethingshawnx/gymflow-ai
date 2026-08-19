import { prisma } from "@/lib/prisma"
import {
  LeadIntent as PrismaLeadIntent,
  LeadStatus as PrismaLeadStatus,
  MessageRole as PrismaMessageRole,
} from "@/generated/prisma/client"

import { qualifyLead } from "@/services/leads/qualification"

interface CreateMessageInput {
  conversationId?: string
  content: string
  role: "user" | "assistant" | "system"
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

function toPrismaRole(
  role: "user" | "assistant" | "system"
): PrismaMessageRole {
  switch (role) {
    case "user":
      return PrismaMessageRole.USER

    case "assistant":
      return PrismaMessageRole.ASSISTANT

    default:
      return PrismaMessageRole.SYSTEM
  }
}

export async function saveConversationMessage(
  input: CreateMessageInput
) {
  /*
   * Existing conversation:
   * simply append the new message.
   */
  if (input.conversationId) {
    const conversation =
      await prisma.conversation.findUnique({
        where: {
          id: input.conversationId,
        },
        include: {
          lead: true,
        },
      })

    if (!conversation) {
      throw new Error(
        "Conversation not found."
      )
    }

    const message =
      await prisma.conversationMessage.create({
        data: {
          conversationId:
            conversation.id,
          role: toPrismaRole(input.role),
          content: input.content,
        },
      })

    /*
     * Re-qualify only user messages.
     * This keeps the lead score updated as the
     * conversation develops.
     */
    if (input.role === "user") {
      const qualification =
        qualifyLead(input.content)

      await prisma.lead.update({
        where: {
          id: conversation.leadId,
        },
        data: {
          intent: toPrismaIntent(
            qualification.intent
          ),
          score: qualification.score,
          status:
            qualification.qualified
              ? PrismaLeadStatus.QUALIFIED
              : PrismaLeadStatus.NEW,
          message: input.content,
        },
      })
    }

    return {
      conversationId: conversation.id,
      message,
    }
  }

  /*
   * First message:
   * create a demo gym, lead, conversation,
   * and first message.
   */
  const qualification =
    qualifyLead(input.content)

  let gym = await prisma.gym.findFirst({
    where: {
      name: "GymFlow Demo Gym",
    },
  })

  if (!gym) {
    gym = await prisma.gym.create({
      data: {
        name: "GymFlow Demo Gym",
      },
    })
  }

  const lead = await prisma.lead.create({
    data: {
      gymId: gym.id,
      intent: toPrismaIntent(
        qualification.intent
      ),
      status:
        qualification.qualified
          ? PrismaLeadStatus.QUALIFIED
          : PrismaLeadStatus.NEW,
      score: qualification.score,
      source: "ai_chat",
      message: input.content,
    },
  })

  const conversation =
    await prisma.conversation.create({
      data: {
        leadId: lead.id,

        messages: {
          create: {
            role: toPrismaRole(input.role),
            content: input.content,
          },
        },
      },
      include: {
        messages: true,
      },
    })

  return {
    conversationId: conversation.id,
    message:
      conversation.messages[0],
  }
}