import {
  BarChart3,
  Bot,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react"

import { FeatureCard } from "./FeatureCard"

const features = [
  {
    icon: Bot,
    title: "24/7 AI Sales Assistant",
    description:
      "Answer questions, handle objections, and engage potential members around the clock without relying on your staff.",
  },
  {
    icon: Target,
    title: "Smart Lead Qualification",
    description:
      "Understand visitor goals, preferences, and buying intent to identify the prospects most likely to become members.",
  },
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description:
      "Recommend the right membership, training option, or plan based on each visitor's individual fitness goals.",
  },
  {
    icon: RefreshCw,
    title: "Automated Follow-ups",
    description:
      "Keep potential members engaged with timely follow-ups so promising leads don't disappear after the first conversation.",
  },
  {
    icon: MessageCircle,
    title: "AI-Powered Conversations",
    description:
      "Give every website visitor a natural conversation experience designed to move them toward their next step.",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description:
      "Track conversations, qualified leads, recommendations, and conversions to understand how your AI sales employee performs.",
  },
]

export function FeaturesGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          index={index}
        />
      ))}
    </div>
  )
}