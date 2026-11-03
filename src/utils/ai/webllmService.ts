import { MIGO_SYSTEM_PROMPT } from '@/data/migoKnowledge';

export type WebLLMStatus =
  | 'idle'
  | 'checking-webgpu'
  | 'webgpu-available'
  | 'webgpu-unavailable'
  | 'downloading'
  | 'ready'
  | 'error';

export interface ModelProgressReport {
  progress: number; // 0 to 100
  text: string;
  timeElapsed?: number;
}

export const SUPPORTED_MODELS = [
  {
    id: 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC',
    name: 'Qwen 2.5 0.5B Instruct (Ultra-Fast & Lightweight)',
    description: 'بهینه‌ترین مدل برای مرورگر وب؛ پشتیبانی روان از فارسی و انگلیسی با مصرف حافظه کمتر از ۱ گیگابایت',
    downloadSize: '~390 MB',
    vramRequired: '~945 MB',
  },
  {
    id: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC',
    name: 'Qwen 2.5 1.5B Instruct (High Fidelity)',
    description: 'مدل قدرتمندتر با درک زبانی عمیق‌تر و پاسخ‌های مفصل‌تر',
    downloadSize: '~900 MB',
    vramRequired: '~1.6 GB',
  },
];

export const DEFAULT_MODEL_ID = 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC';

class WebLLMService {
  private engine: any = null;
  private currentModelId: string = DEFAULT_MODEL_ID;
  private status: WebLLMStatus = 'idle';
  private statusListeners: Array<(status: WebLLMStatus) => void> = [];
  private progressListeners: Array<(report: ModelProgressReport) => void> = [];
  private isInitializing: boolean = false;

  public getStatus(): WebLLMStatus {
    return this.status;
  }

  public getCurrentModelId(): string {
    return this.currentModelId;
  }

  public subscribeStatus(cb: (status: WebLLMStatus) => void): () => void {
    this.statusListeners.push(cb);
    cb(this.status);
    return () => {
      this.statusListeners = this.statusListeners.filter((l) => l !== cb);
    };
  }

  public subscribeProgress(cb: (report: ModelProgressReport) => void): () => void {
    this.progressListeners.push(cb);
    return () => {
      this.progressListeners = this.progressListeners.filter((l) => l !== cb);
    };
  }

  private setStatus(status: WebLLMStatus) {
    this.status = status;
    this.statusListeners.forEach((l) => l(status));
  }

  private notifyProgress(report: ModelProgressReport) {
    this.progressListeners.forEach((l) => l(report));
  }

  /**
   * Check if WebGPU is truly supported and available on this hardware
   */
  public async checkWebGPUSupport(): Promise<boolean> {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    const nav = navigator as any;
    if (!('gpu' in nav) || !nav.gpu) {
      this.setStatus('webgpu-unavailable');
      return false;
    }

    try {
      this.setStatus('checking-webgpu');
      const adapter = await nav.gpu.requestAdapter();
      if (!adapter) {
        this.setStatus('webgpu-unavailable');
        return false;
      }
      this.setStatus('webgpu-available');
      return true;
    } catch (e) {
      console.warn('[MIGO AI] WebGPU adapter request error:', e);
      this.setStatus('webgpu-unavailable');
      return false;
    }
  }

  /**
   * Initialize WebLLM engine with lazy dynamic import
   */
  public async initializeModel(
    modelId: string = DEFAULT_MODEL_ID
  ): Promise<boolean> {
    if (this.engine && this.currentModelId === modelId) {
      this.setStatus('ready');
      return true;
    }

    if (this.isInitializing) {
      return false;
    }

    const hasWebGPU = await this.checkWebGPUSupport();
    if (!hasWebGPU) {
      this.setStatus('webgpu-unavailable');
      return false;
    }

    this.isInitializing = true;
    this.currentModelId = modelId;
    this.setStatus('downloading');

    try {
      this.notifyProgress({
        progress: 5,
        text: 'در حال آماده‌سازی کتابخانه WebLLM و خط لوله WebGPU...',
      });

      // Lazy dynamic import of @mlc-ai/web-llm in the browser
      const webllm = await import('@mlc-ai/web-llm');

      const initProgressCallback = (report: any) => {
        const rawProgress = report.progress || 0;
        const pct = Math.round(rawProgress * 100);
        this.notifyProgress({
          progress: Math.min(100, Math.max(5, pct)),
          text: report.text || 'در حال بارگذاری شیدرهای هوش مصنوعی و وزن‌های مدل...',
          timeElapsed: report.timeElapsed,
        });
      };

      const engine = await webllm.CreateMLCEngine(modelId, {
        initProgressCallback,
      });

      this.engine = engine;
      this.setStatus('ready');
      this.notifyProgress({
        progress: 100,
        text: 'مدل محلی با موفقیت راه‌اندازی شد!',
      });
      return true;
    } catch (error: any) {
      console.error('[MIGO AI] WebLLM initialization failed:', error);
      this.setStatus('error');
      this.notifyProgress({
        progress: 0,
        text: error?.message || 'خطا در بارگذاری مدل محلی.',
      });
      return false;
    } finally {
      this.isInitializing = false;
    }
  }

  /**
   * Stream a chat completion from the local LLM
   */
  public async *streamChat(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
  ): AsyncGenerator<string, void, unknown> {
    if (!this.engine) {
      throw new Error('WebLLM Engine is not ready');
    }

    const fullMessages = [
      { role: 'system', content: MIGO_SYSTEM_PROMPT },
      ...messages,
    ];

    try {
      const asyncChunkGenerator = await this.engine.chat.completions.create({
        messages: fullMessages,
        stream: true,
        temperature: 0.7,
        top_p: 0.9,
      });

      for await (const chunk of asyncChunkGenerator) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) {
          yield delta;
        }
      }
    } catch (err: any) {
      console.error('[MIGO AI] Streaming error:', err);
      throw err;
    }
  }

  /**
   * Release WebLLM GPU and cache resources if requested
   */
  public async unload() {
    if (this.engine) {
      try {
        await this.engine.unload();
      } catch (e) {
        console.warn('[MIGO AI] Error unloading engine:', e);
      }
      this.engine = null;
    }
    this.setStatus('idle');
  }
}

export const webLLMService = new WebLLMService();
