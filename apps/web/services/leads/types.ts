export type LeadIntent =
  | "booking"
  | "trial"
  | "weight_loss"
  | "muscle_gain"
  | "membership"
  | "fitness"
  | "unknown"

export type LeadStatus =
  | "new"
  | "qualified"
  | "contacted"
  | "converted"

export interface Lead {
  id: string
  name?: string
  email?: string
  phone?: string
  intent: LeadIntent
  status: LeadStatus
  score: number
  createdAt: string
}

export interface QualificationResult {
  intent: LeadIntent
  score: number
  qualified: boolean
}