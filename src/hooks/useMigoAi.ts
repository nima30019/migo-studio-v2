'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Locale } from '@/data/translations';
import { GeminiService } from '@/utils/ai/geminiService';
import {
  MigoAiEngine,
  ChatMessage,
  detectLanguage,
} from '@/utils/ai/migoAiEngine';

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
  suggestedPrompts: string[];
  isGeminiActive: boolean;
  apiKeyInput: string;
  setApiKeyInput: (key: string) => void;
  saveApiKey: (key: string) => void;
  removeApiKey: () => void;
  showApiKeyPrompt: boolean;
  setShowApiKeyPrompt: (show: boolean) => void;
  engineError: string | null;
}

export function useMigoAi(initialLocale: Locale = 'fa'): UseMigoAiReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isGeminiActive, setIsGeminiActive] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [engineError, setEngineError] = useState<string | null>(null);

  // Check if Gemini key is available on mount
  useEffect(() => {
    const hasKey = GeminiService.hasApiKey();
    setIsGeminiActive(hasKey);
    if (hasKey) {
      setApiKeyInput(GeminiService.getApiKey());
    }
  }, []);

  // Initial greeting
  const initialGreeting: ChatMessage = {
    id: 'welcome-0',
    role: 'assistant',
    content:
      initialLocale === 'fa'
        ? `سلام! من **MIGO AI**، دستیار هوشمند و مشاور فناوری خلاق **استودیو MIGO** هستم.\n\nمن با هوش مصنوعی قدرتمند گوگل Gemini ادغام شده‌ام تا به هر پرسش تخصصی درباره پروژه‌ها، واقعیت مجازی (VR/MR)، وب‌واقعیت‌افزوده (WebAR)، اینستالیشن‌های تعاملی نمایشگاهی و شبیه‌سازی‌های صنعتی پاسخ دهم.\n\nچه ایده یا سوالی در ذهن دارید؟`
        : `Hello! I am **MIGO AI**, creative technology consultant for **MIGO Studio**.\n\nPowered by Google Gemini, I can assist you with spatial computing (VR/MR), Zero-Install WebAR, museum installations, and industrial simulation architecture.\n\nWhat kind of experience or concept are you planning?`,
    timestamp: Date.now(),
    metadata: {
      topic: 'general',
      followUpOptions:
        initialLocale === 'fa'
          ? [
              'مایگو چه خدماتی ارائه میده؟',
              'برای موزه یا نمایشگاه چه ایده‌ای پیشنهاد می‌کنی؟',
              'تفاوت واقعیت مجازی (VR) و ترکیبی (MR) چیه؟',
              'چطور محصولاتم رو با WebAR به مشتری نشون بدم؟',
            ]
          : [
              'What services does MIGO provide?',
              'What do you suggest for an interactive museum?',
              'What is the difference between VR and MR?',
              'How can I display products in WebAR?',
            ],
    },
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const streamingAbortRef = useRef(false);

  const openChat = useCallback(() => {
    setIsOpen(true);
    // If no key is set yet, show key prompt once
    if (!GeminiService.hasApiKey()) {
      setShowApiKeyPrompt(true);
    }
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !GeminiService.hasApiKey()) {
        setShowApiKeyPrompt(true);
      }
      return next;
    });
  }, []);

  const saveApiKey = useCallback((key: string) => {
    GeminiService.setApiKey(key);
    const hasKey = Boolean(key.trim());
    setIsGeminiActive(hasKey);
    setApiKeyInput(key.trim());
    setShowApiKeyPrompt(false);
    setEngineError(null);
  }, []);

  const removeApiKey = useCallback(() => {
    GeminiService.setApiKey('');
    setIsGeminiActive(false);
    setApiKeyInput('');
  }, []);

  const clearChat = useCallback(() => {
    streamingAbortRef.current = true;
    setIsStreaming(false);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          initialLocale === 'fa'
            ? 'گفتگو پاکسازی شد. چطور می‌توانم در بررسی خدمات، پروژه‌ها یا بریف استودیو MIGO به شما کمک کنم؟'
            : 'Conversation reset. How can I assist you with MIGO services, case studies, or your project brief?',
        timestamp: Date.now(),
        metadata: { topic: 'general' },
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
      setEngineError(null);
      streamingAbortRef.current = false;

      const assistantMsgId = `assistant-${Date.now()}`;
      const placeholderAssistant: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      setMessages([...updatedHistory, placeholderAssistant]);

      // If Gemini API Key is configured -> use Gemini 1.5 Flash streaming
      if (GeminiService.hasApiKey()) {
        try {
          const geminiHistory = updatedHistory.slice(1, -1).map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          }));

          let accumulated = '';
          for await (const chunk of GeminiService.streamChat(text, geminiHistory)) {
            if (streamingAbortRef.current) break;
            accumulated += chunk;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
              )
            );
          }

          setIsStreaming(false);
          return;
        } catch (err: any) {
          console.warn('[MIGO AI] Gemini generation error, falling back:', err);
          if (err?.message === 'API_KEY_INVALID') {
            setEngineError('API_KEY_INVALID');
          } else if (err?.message === 'QUOTA_EXCEEDED') {
            setEngineError('QUOTA_EXCEEDED');
          }
          // Continue to fallback below
        }
      }

      // Built-in Knowledge Engine Fallback if Gemini key is not provided or fails
      const engineRes = MigoAiEngine.processQuery(
        text,
        updatedHistory,
        userMsgLocale
      );

      let accumulated = '';
      for await (const token of MigoAiEngine.streamReply(engineRes.reply, 16)) {
        if (streamingAbortRef.current) break;
        accumulated += token;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content: accumulated,
                  metadata: {
                    topic: engineRes.topic,
                    suggestedActions: engineRes.suggestedActions,
                    followUpOptions: engineRes.followUpOptions,
                  },
                }
              : msg
          )
        );
      }

      setIsStreaming(false);
    },
    [inputValue, isStreaming, messages]
  );

  const suggestedPrompts =
    initialLocale === 'fa'
      ? [
          'مایگو چه خدماتی ارائه میده؟',
          'برای موزه یا نمایشگاه چه ایده‌ای داری؟',
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
    suggestedPrompts,
    isGeminiActive,
    apiKeyInput,
    setApiKeyInput,
    saveApiKey,
    removeApiKey,
    showApiKeyPrompt,
    setShowApiKeyPrompt,
    engineError,
  };
}
