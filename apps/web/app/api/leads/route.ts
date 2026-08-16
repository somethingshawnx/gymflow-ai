import { NextResponse } from "next/server"

export const runtime = "nodejs"

interface LeadRequest {
  name?: unknown
  email?: unknown
  gym?: unknown
  message?: unknown
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "GymFlow leads API is running.",
  })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadRequest

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : ""

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : ""

    const gym =
      typeof body.gym === "string"
        ? body.gym.trim()
        : ""

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : ""

    if (!name || !email || !gym) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, email, and gym name are required.",
        },
        { status: 400 }
      )
    }

    const lead = {
      id: crypto.randomUUID(),
      name,
      email,
      gym,
      message,
      createdAt: new Date().toISOString(),
    }

    console.log("NEW GYMFLOW LEAD:", lead)

    return NextResponse.json(
      {
        success: true,
        message:
          "Your demo request has been received.",
        lead,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("LEADS API ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to process the request.",
      },
      { status: 500 }
    )
  }
}