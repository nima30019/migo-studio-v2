import { ChatMessage, MigoAiEngine, detectLanguage } from './migoAiEngine';

export class ChatClient {
  /**
   * Send a message and stream the response.
   * Seamlessly checks backend API (/api/chat) first for real Gemini AI;
   * if unavailable (e.g. on static GitHub Pages), smoothly uses built-in engine.
   */
  public static async *streamMessage(
    userMessage: string,
    history: ChatMessage[] = []
  ): AsyncGenerator<string, void, unknown> {
    const locale = detectLanguage(userMessage);

    // 1. Try Backend API if configured or hosted
    const apiUrl =
      process.env.NEXT_PUBLIC_CHAT_API_URL ||
      (typeof window !== 'undefined' ? '/api/chat' : '');

    let backendSuccess = false;

    if (apiUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s failover threshold

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            history: history.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith('data: ')) {
                const dataStr = trimmed.slice(6);
                if (dataStr === '[DONE]') {
                  backendSuccess = true;
                  return;
                }
                try {
                  const parsed = JSON.parse(dataStr);
                  if (parsed.delta) {
                    backendSuccess = true;
                    yield parsed.delta;
                  }
                } catch {
                  // Pass through non-json text chunk
                  if (dataStr) {
                    backendSuccess = true;
                    yield dataStr;
                  }
                }
              }
            }
          }

          if (backendSuccess) {
            return;
          }
        }
      } catch (err) {
        // Backend not available yet (expected on static GitHub Pages)
        backendSuccess = false;
      }
    }

    // 2. Fallback to Autonomous Engine
    const engineRes = MigoAiEngine.processQuery(userMessage, history, locale);
    for await (const token of MigoAiEngine.streamReply(engineRes.reply, 15)) {
      yield token;
    }
  }
}
