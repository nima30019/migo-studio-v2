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

  // Initial welcome message
  const initialGreeting: ChatMessage = {
    id: 'welcome-0',
    role: 'assistant',
    content:
      initialLocale === 'fa'
        ? `سلام! من **MIGO AI**، مشاور هوشمند فناوری خلاق و رایانش فضایی **استودیو MIGO** هستم.\n\nمن می‌توانم در زمینه انتخاب تکنولوژی، بررسی خدمات (واقعیت مجازی، وب‌واقعیت‌افزوده، اینستالیشن‌های نمایشگاهی، شبیه‌سازی و بازی) و تنظیم بریف اولیه پروژه به شما مشاوره دهم.\n\nچه نوع ایده یا پروژه‌ای در ذهن دارید؟`
        : `Hello! I am **MIGO AI**, creative technology and spatial engineering consultant for **MIGO Studio**.\n\nI can assist you in selecting technologies, exploring our capabilities (VR/MR, WebAR, Exhibition Installations, Simulations & Games), or preparing a project brief.\n\nWhat kind of experience are you planning to build?`,
    timestamp: Date.now(),
    metadata: {
      topic: 'general',
      followUpOptions:
        initialLocale === 'fa'
          ? [
              'مایگو چه خدماتی ارائه میده؟',
              'برای موزه یا نمایشگاه چه تجربه‌ای پیشنهاد میدید؟',
              'چطور محصولاتم رو با WebAR به مشتری نشون بدم؟',
              'تفاوت واقعیت مجازی (VR) و ترکیبی (MR) چیه؟',
            ]
          : [
              'What services does MIGO provide?',
              'What do you suggest for an interactive museum?',
              'How can I display products in WebAR?',
              'What is the difference between VR and MR?',
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

  // Send message with natural streaming token cadence
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

      // Generate response from MigoAiEngine
      const engineRes = MigoAiEngine.processQuery(
        text,
        updatedHistory,
        userMsgLocale
      );

      const assistantMsgId = `assistant-${Date.now()}`;
      const placeholderAssistant: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        metadata: {
          topic: engineRes.topic,
          suggestedActions: engineRes.suggestedActions,
          followUpOptions: engineRes.followUpOptions,
        },
      };

      setMessages([...updatedHistory, placeholderAssistant]);

      // Stream text smoothly with realistic typing cadence
      let accumulated = '';
      for await (const token of MigoAiEngine.streamReply(engineRes.reply, 16)) {
        if (streamingAbortRef.current) break;
        accumulated += token;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
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
    suggestedPrompts,
  };
}
