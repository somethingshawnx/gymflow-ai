import { NextResponse } from "next/server"

import { saveConversationMessage } from "@/services/conversations"

interface ConversationRequest {
  conversationId?: unknown
  role?: unknown
  content?: unknown
}

export const runtime = "nodejs"

export async function POST(
  request: Request
) {
  try {
    const body =
      (await request.json()) as ConversationRequest

    const content =
      typeof body.content === "string"
        ? body.content.trim()
        : ""

    const role =
      body.role === "user" ||
      body.role === "assistant" ||
      body.role === "system"
        ? body.role
        : null

    const conversationId =
      typeof body.conversationId === "string"
        ? body.conversationId
        : undefined

    if (!content || !role) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Role and content are required.",
        },
        { status: 400 }
      )
    }

    const result =
      await saveConversationMessage({
        conversationId,
        role,
        content,
      })

    return NextResponse.json(
      {
        success: true,
        conversationId:
          result.conversationId,
        message: result.message,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(
      "CONVERSATION API ERROR:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to save conversation.",
      },
      { status: 500 }
    )
  }
}