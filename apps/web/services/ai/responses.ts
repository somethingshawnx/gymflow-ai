export function generateGymFlowResponse(
  message: string
): string {
  const text = message.toLowerCase().trim()

  if (
    text === "yes" ||
    text === "yeah" ||
    text === "yep" ||
    text === "sure" ||
    text === "okay" ||
    text === "ok" ||
    text === "sounds good"
  ) {
    return "Awesome! 🎉 Let's get you started. You can book your free trial and our team will help you choose the best time for your visit."
  }

  if (
    text.includes("weight") ||
    text.includes("lose") ||
    text.includes("fat")
  ) {
    return "Great goal! 💪 I'd recommend our Pro Membership with personal training support. Would you like to book a free trial?"
  }

  if (
    text.includes("muscle") ||
    text.includes("muscles") ||
    text.includes("bulk") ||
    text.includes("strength")
  ) {
    return "That's a great goal! 💪 Our Pro Membership gives you unlimited gym access and personal training support to help you build strength consistently."
  }

  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("membership") ||
    text.includes("plan")
  ) {
    return "Our Pro Membership starts at ₹2,999/month and includes unlimited gym access and personal training support."
  }

  if (
    text.includes("trial") ||
    text.includes("visit") ||
    text.includes("free")
  ) {
    return "Absolutely! You can book a free trial and experience the gym before committing to a membership."
  }

  if (
    text.includes("book") ||
    text.includes("booking") ||
    text.includes("appointment")
  ) {
    return "Perfect! I can help you get started. You can book a free trial and our team will help you choose a convenient time."
  }

  if (
    text.includes("gym") ||
    text.includes("fitness") ||
    text.includes("workout") ||
    text.includes("exercise")
  ) {
    return "I'd love to help! 💪 Tell me your main fitness goal—losing weight, building muscle, improving fitness, or something else—and I'll recommend the right option."
  }

  return "I'd be happy to help! Tell me about your fitness goal, preferred training style, membership requirements, or ask about our free trial."
}