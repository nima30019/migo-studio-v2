'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Locale } from '@/data/translations';
import {
  webLLMService,
  WebLLMStatus,
  ModelProgressReport,
  DEFAULT_MODEL_ID,
} from '@/utils/ai/webllmService';
import {
  FallbackEngine,
  ChatMessage,
  detectLanguage,
} from '@/utils/ai/fallbackEngine';

export interface UseMigoAiReturn {
  isOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  messages: ChatMessage[];
  inputValue: string;
  setInputValue: (val: string) => void;
  sendMessage: (customText?: string) => Promise<void>;
  clearChat: () => void;
  isStreaming: boolean;
  engineMode: 'local-ai' | 'fallback';
  webLLMStatus: WebLLMStatus;
  progressReport: ModelProgressReport | null;
  hasWebGPU: boolean | null;
  activeModelId: string;
  initializeLocalAI: (modelId?: string) => Promise<void>;
  switchToFallback: () => void;
  suggestedPrompts: string[];
}

export function useMigoAi(initialLocale: Locale = 'fa'): UseMigoAiReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [engineMode, setEngineMode] = useState<'local-ai' | 'fallback'>('fallback');
  const [webLLMStatus, setWebLLMStatus] = useState<WebLLMStatus>('idle');
  const [hasWebGPU, setHasWebGPU] = useState<boolean | null>(null);
  const [activeModelId, setActiveModelId] = useState<string>(DEFAULT_MODEL_ID);
  const [progressReport, setProgressReport] = useState<ModelProgressReport | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Initial welcome message
  const initialGreeting: ChatMessage = {
    id: 'welcome-0',
    role: 'assistant',
    content:
      initialLocale === 'fa'
        ? `سلام! من **MIGO AI** هستم؛ مشاور فناوری خلاق و راهنمای پروژه‌های استودیو MIGO.\n\nمن می‌توانم به شما در انتخاب تکنولوژی، بررسی خدمات (واقعیت مجازی، وب‌واقعیت‌افزوده، اینستالیشن‌های نمایشگاهی، بازی و شبیه‌سازی) و تنظیم بریف پروژه کمک کنم.\n\nچه ایده یا پروژه‌ای در نظر دارید؟`
        : `Hello! I am **MIGO AI**, creative technology consultant and project guide for MIGO Studio.\n\nI can assist you in selecting spatial technologies, exploring our services (VR/MR, WebAR, Exhibition Installations, Games & Simulations), or preparing a project brief.\n\nWhat kind of experience are you planning?`,
    timestamp: Date.now(),
    metadata: {
      isFallback: true,
      followUpOptions:
        initialLocale === 'fa'
          ? [
              'مایگو چه خدماتی ارائه میده؟',
              'برای موزه یا نمایشگاه چه تجربه‌ای پیشنهاد میدید؟',
              'تفاوت VR و MR چیه؟',
              'مشاهده پروژه‌های واقعیت مجازی',
            ]
          : [
              'What services does MIGO provide?',
              'What do you suggest for a museum?',
              'What is the difference between VR and MR?',
              'Show me VR/MR case studies',
            ],
    },
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const hasCheckedGPU = useRef(false);

  // Subscribe to WebLLM status & progress
  useEffect(() => {
    const unsubStatus = webLLMService.subscribeStatus((st) => {
      setWebLLMStatus(st);
      if (st === 'ready') {
        setEngineMode('local-ai');
      }
    });

    const unsubProgress = webLLMService.subscribeProgress((rep) => {
      setProgressReport(rep);
    });

    return () => {
      unsubStatus();
      unsubProgress();
    };
  }, []);

  // Check WebGPU availability when chat is first opened
  const checkGPUOnOpen = useCallback(async () => {
    if (hasCheckedGPU.current) return;
    hasCheckedGPU.current = true;
    try {
      const supported = await webLLMService.checkWebGPUSupport();
      setHasWebGPU(supported);
    } catch {
      setHasWebGPU(false);
    }
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    checkGPUOnOpen();
  }, [checkGPUOnOpen]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) checkGPUOnOpen();
      return next;
    });
  }, [checkGPUOnOpen]);

  // Trigger Local WebLLM initialization
  const initializeLocalAI = useCallback(
    async (modelId: string = DEFAULT_MODEL_ID) => {
      setActiveModelId(modelId);
      const success = await webLLMService.initializeModel(modelId);
      if (success) {
        setEngineMode('local-ai');
      } else {
        setEngineMode('fallback');
      }
    },
    []
  );

  const switchToFallback = useCallback(() => {
    setEngineMode('fallback');
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          initialLocale === 'fa'
            ? 'گفتگو پاکسازی شد. چطور می‌توانم به شما در بررسی خدمات، پروژه‌ها یا بریف استودیو MIGO کمک کنم؟'
            : 'Conversation reset. How can I assist you with MIGO services, case studies, or your project brief?',
        timestamp: Date.now(),
        metadata: { isFallback: true },
      },
    ]);
  }, [initialLocale]);

  // Send message
  const sendMessage = useCallback(
    async (customText?: string) => {
      const text = (customText !== undefined ? customText : inputValue).trim();
      if (!text || isStreaming) return;

      const userMsgLocale = detectLanguage(text);

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: Date.now(),
      };

      const updatedHistory = [...messages, userMessage];
      setMessages(updatedHistory);
      setInputValue('');
      setIsStreaming(true);

      // Check if we can use Local WebLLM
      if (engineMode === 'local-ai' && webLLMStatus === 'ready') {
        const assistantMsgId = `assistant-${Date.now()}`;
        const placeholderAssistant: ChatMessage = {
          id: assistantMsgId,
          role: 'assistant',
          content: '',
          timestamp: Date.now(),
          metadata: { isFallback: false },
        };

        setMessages([...updatedHistory, placeholderAssistant]);

        try {
          const llmMessages = updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          }));

          let accumulated = '';
          for await (const chunk of webLLMService.streamChat(llmMessages)) {
            accumulated += chunk;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId
                  ? { ...msg, content: accumulated }
                  : msg
              )
            );
          }
        } catch (err) {
          console.warn('[MIGO AI] WebLLM generation error, falling back:', err);
          // Fallback to Knowledge Engine on generation error
          const fallbackRes = FallbackEngine.processQuery(
            text,
            updatedHistory,
            userMsgLocale
          );
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? {
                    ...msg,
                    content: fallbackRes.reply,
                    metadata: {
                      isFallback: true,
                      suggestedActions: fallbackRes.suggestedActions,
                      followUpOptions: fallbackRes.followUpOptions,
                    },
                  }
                : msg
            )
          );
        } finally {
          setIsStreaming(false);
        }
      } else {
        // Instant Knowledge Base Fallback Engine
        setTimeout(() => {
          const fallbackRes = FallbackEngine.processQuery(
            text,
            updatedHistory,
            userMsgLocale
          );

          const assistantMessage: ChatMessage = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: fallbackRes.reply,
            timestamp: Date.now(),
            metadata: {
              isFallback: true,
              suggestedActions: fallbackRes.suggestedActions,
              followUpOptions: fallbackRes.followUpOptions,
            },
          };

          setMessages([...updatedHistory, assistantMessage]);
          setIsStreaming(false);
        }, 120);
      }
    },
    [inputValue, isStreaming, messages, engineMode, webLLMStatus]
  );

  const suggestedPrompts =
    initialLocale === 'fa'
      ? [
          'مایگو چه خدماتی ارائه میده؟',
          'برای موزه یا نمایشگاه چه راهکاری مناسبه؟',
          'چطور محصولاتم رو با WebAR به مشتری نشون بدم؟',
          'تفاوت واقعیت مجازی و ترکیبی چیه؟',
          'می‌خوام یک پروژه جدید شروع کنم',
        ]
      : [
          'What services does MIGO offer?',
          'What do you suggest for an interactive museum?',
          'How can I display products via WebAR?',
          'What is the difference between VR and MR?',
          'I want to start a new project',
        ];

  return {
    isOpen,
    toggleChat,
    openChat,
    closeChat,
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    clearChat,
    isStreaming,
    engineMode,
    webLLMStatus,
    progressReport,
    hasWebGPU,
    activeModelId,
    initializeLocalAI,
    switchToFallback,
    suggestedPrompts,
  };
}
