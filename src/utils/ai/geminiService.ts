import { GoogleGenerativeAI } from '@google/generative-ai';
import { MIGO_SYSTEM_PROMPT } from '@/data/migoKnowledge';

const LOCAL_STORAGE_KEY = 'migo_gemini_api_key';

export class GeminiService {
  /**
   * Retrieve active Gemini API key from environment variable or localStorage
   */
  public static getApiKey(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored && stored.trim()) {
        return stored.trim();
      }
    }
    return process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  }

  /**
   * Save API key in browser's localStorage
   */
  public static setApiKey(key: string): void {
    if (typeof window !== 'undefined') {
      if (key && key.trim()) {
        localStorage.setItem(LOCAL_STORAGE_KEY, key.trim());
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }

  /**
   * Check whether a Gemini API key is configured
   */
  public static hasApiKey(): boolean {
    return Boolean(this.getApiKey());
  }

  /**
   * Stream a conversation response from Google Gemini
   */
  public static async *streamChat(
    userMessage: string,
    history: Array<{ role: 'user' | 'assistant'; content: string }> = []
  ): AsyncGenerator<string, void, unknown> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('MISSING_API_KEY');
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Primary: gemini-1.5-flash (fast, generous free tier, outstanding Persian/English)
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: MIGO_SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 1200,
      },
    });

    // Format history for Google Generative AI (user and model roles)
    const formattedHistory = history
      .filter((msg) => msg.content && msg.content.trim())
      .map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    try {
      const chat = model.startChat({
        history: formattedHistory,
      });

      const resultStream = await chat.sendMessageStream(userMessage);

      for await (const chunk of resultStream.stream) {
        const text = chunk.text();
        if (text) {
          yield text;
        }
      }
    } catch (err: any) {
      console.error('[MIGO AI] Gemini API Error:', err);
      // Pass through specific error message
      if (err?.status === 400 || err?.message?.includes('API_KEY_INVALID')) {
        throw new Error('API_KEY_INVALID');
      }
      if (err?.status === 429 || err?.message?.includes('RESOURCE_EXHAUSTED')) {
        throw new Error('QUOTA_EXCEEDED');
      }
      throw err;
    }
  }
}
