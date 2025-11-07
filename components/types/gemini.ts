export interface GeminiRequest {
  prompt: string;
}

export interface GeminiResponse {
  text: string;
  error?: string;
}