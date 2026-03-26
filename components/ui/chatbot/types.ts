export type ChatbotMode = "chat" | "scan";

export interface ScanContext {
  id: string;
  issue: string;
  severity: "Low" | "Medium" | "High";
  recommendation: string;
  aiTip: string;
  productId: string; // To link to the recommendation
  confidence: number;
  imageUrl?: string;
}
