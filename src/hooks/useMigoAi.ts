'use client';

import { useState, useCallback, useRef } from 'react';
import { Locale } from '@/data/translations';
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
}

export function useMigoAi(initialLocale: Locale = 'fa'): UseMigoAiReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Initial greeting
  const initialGreeting: ChatMessage = {
    id: 'welcome-0',
    role: 'assistant',
    content:
      initialLocale === 'fa'
        ? `سلام! من **MIGO AI**، مشاور هوشمند فناوری خلاق و رایانش فضایی **استودیو MIGO** هستم.\n\nمن به صورت زنده و متصل آماده‌ام تا به هر پرسش تخصصی درباره پروژه‌ها، واقعیت مجازی (VR/MR)، وب‌واقعیت‌افزوده (WebAR)، اینستالیشن‌های تعاملی نمایشگاهی، بازی و شبیه‌سازی‌های صنعتی پاسخ دهم.\n\nچه ایده یا سوالی در ذهن دارید؟`
        : `Hello! I am **MIGO AI**, Senior Creative Technology & Spatial Engineering Consultant for **MIGO Studio**.\n\nI am live and ready to assist you with spatial computing (VR/MR), Zero-Install WebAR, interactive museum installations, serious simulations, and budget/timeline planning.\n\nWhat kind of experience or concept are you planning?`,
    timestamp: Date.now(),
    metadata: {
      topic: 'general',
      followUpOptions:
        initialLocale === 'fa'
          ? [
              'مایگو چه خدماتی ارائه میده؟',
              'برای موزه یا نمایشگاه چه ایده‌ای داری؟',
              'چطور محصولاتم رو با WebAR به مشتری نشون بدم؟',
              'تفاوت واقعیت مجازی (VR) و ترکیبی (MR) چیه؟',
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
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
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
      streamingAbortRef.current = false;

      const assistantMsgId = `assistant-${Date.now()}`;
      const placeholderAssistant: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      setMessages([...updatedHistory, placeholderAssistant]);

      // Process query through MigoAiEngine
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
          'هزینه و زمان‌بندی پروژه‌ها چطور محاسبه میشه؟',
        ]
      : [
          'What services does MIGO offer?',
          'What do you suggest for an interactive museum?',
          'How can I display products via WebAR?',
          'What is the difference between VR and MR?',
          'How are project pricing and timelines calculated?',
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
  };
}
