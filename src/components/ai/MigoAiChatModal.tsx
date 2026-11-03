'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  X,
  RotateCcw,
  Sparkles,
  Send,
  Key,
  ExternalLink,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useDirection } from '@/components/direction/DirectionProvider';
import { DirectionAwareArrow } from '@/components/direction/DirectionAwareArrow';
import { getAssetPath } from '@/utils/asset';
import { MessageContent } from './MessageContent';
import { UseMigoAiReturn } from '@/hooks/useMigoAi';

interface MigoAiChatModalProps {
  chat: UseMigoAiReturn;
}

export function MigoAiChatModal({ chat }: MigoAiChatModalProps) {
  const { isRtl } = useDirection();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [localKey, setLocalKey] = useState(chat.apiKeyInput);

  const logoSrc = getAssetPath('/migo-logo-transparent.png');
  const logoEmblem = getAssetPath('/brand/instagram/migo-instagram-avatar-emblem-dark.png');

  useEffect(() => {
    setLocalKey(chat.apiKeyInput);
  }, [chat.apiKeyInput]);

  // Auto-scroll to bottom on message update or streaming
  useEffect(() => {
    if (chat.isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.messages, chat.isOpen, chat.isStreaming]);

  // Auto-focus input on modal open
  useEffect(() => {
    if (chat.isOpen && !chat.showApiKeyPrompt) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [chat.isOpen, chat.showApiKeyPrompt]);

  if (!chat.isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chat.sendMessage();
    }
  };

  const quickPillCategories = isRtl
    ? [
        { label: '🏛️ موزه و اینستالیشن', prompt: 'برای موزه یا نمایشگاه چه تجربه‌ای پیشنهاد میدید؟' },
        { label: '📱 واقعیت افزوده WebAR', prompt: 'چطور محصولاتم رو با WebAR به مشتری نشون بدم؟' },
        { label: '👓 واقعیت مجازی VR/MR', prompt: 'تفاوت واقعیت مجازی (VR) و ترکیبی (MR) چیه؟' },
        { label: '⚙️ شبیه‌سازی صنعتی', prompt: 'شبیه‌سازی‌های صنعتی MIGO چه کمکی به شرکت‌ها می‌کنند؟' },
        { label: '🚀 شروع پروژه و برآورد', prompt: 'چطور می‌توانم یک پروژه با شما شروع کنم؟' },
      ]
    : [
        { label: '🏛️ Museum & Installation', prompt: 'What do you suggest for an interactive museum?' },
        { label: '📱 Zero-Install WebAR', prompt: 'How can I display products in WebAR?' },
        { label: '👓 Spatial VR vs MR', prompt: 'What is the difference between VR and MR?' },
        { label: '⚙️ Industrial Simulation', prompt: 'Can you build an industrial simulation?' },
        { label: '🚀 Start a Project', prompt: 'How can I start working with MIGO?' },
      ];

  return (
    <div
      className={`fixed bottom-24 ${
        isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
      } z-50 w-[94vw] sm:w-[460px] md:w-[500px] h-[82vh] max-h-[700px] flex flex-col rounded-3xl bg-[#090B10]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
    >
      {/* 1. Modal Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#0D1018]/80">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shrink-0">
            <img
              src={logoEmblem}
              alt="MIGO AI Emblem"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = logoSrc;
              }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm tracking-wide text-white">
                MIGO AI
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-brand-orange/20 text-brand-orange border border-brand-orange/40 font-bold">
                {chat.isGeminiActive ? 'GEMINI' : 'SMART'}
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400">
              {isRtl ? 'مشاور فناوری خلاق و رایانش فضایی' : 'Creative Technology Consultant'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Key Settings Toggle */}
          <button
            type="button"
            onClick={() => chat.setShowApiKeyPrompt(!chat.showApiKeyPrompt)}
            title={isRtl ? 'تنظیمات کلید Google Gemini' : 'Google Gemini API Settings'}
            className={`p-2 rounded-xl transition-all ${
              chat.isGeminiActive
                ? 'text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Key className="w-4 h-4" />
          </button>

          {/* Reset Chat */}
          <button
            type="button"
            onClick={chat.clearChat}
            title={isRtl ? 'پاکسازی گفتگو' : 'Clear conversation'}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close Modal */}
          <button
            type="button"
            onClick={chat.closeChat}
            title={isRtl ? 'بستن پنجره' : 'Close window'}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Gemini Status & Settings Drawer */}
      {chat.showApiKeyPrompt && (
        <div className="p-4 bg-[#111420] border-b border-brand-orange/30 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>{isRtl ? 'تنظیمات Google Gemini 1.5 Flash' : 'Google Gemini API Settings'}</span>
            </span>
            <button
              type="button"
              onClick={() => chat.setShowApiKeyPrompt(false)}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-300 leading-relaxed mb-3">
            {isRtl
              ? 'برای پاسخ‌های کاملاً آزاد، طبیعی و قدرتمند با جیمنای، کلید رایگان خود را وارد کنید:'
              : 'Enter your free Google Gemini API key to activate natural generative responses:'}
          </p>

          <div className="flex gap-2 mb-2">
            <input
              type="password"
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-[#090B0F] border border-white/20 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-orange font-mono"
            />
            <button
              type="button"
              onClick={() => chat.saveApiKey(localKey)}
              className="px-3.5 py-1.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shrink-0"
            >
              {isRtl ? 'ذخیره' : 'Save'}
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
            >
              <span>{isRtl ? 'دریافت کلید رایگان از Google AI Studio' : 'Get free key from Google AI Studio'}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            {chat.isGeminiActive && (
              <button
                type="button"
                onClick={chat.removeApiKey}
                className="text-red-400 hover:underline"
              >
                {isRtl ? 'حذف کلید' : 'Remove key'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="px-5 py-2 bg-[#0A0D14] border-b border-white/[0.06] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {chat.isGeminiActive ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Google Gemini 1.5 Flash</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => chat.setShowApiKeyPrompt(true)}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-brand-orange hover:underline text-start"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isRtl ? 'فعال‌سازی Gemini با کلید رایگان' : 'Enable Gemini with Free Key'}</span>
            </button>
          )}
        </div>

        <span className="text-[10px] font-mono text-neutral-400">
          {chat.isGeminiActive ? (isRtl ? 'متصل' : 'Connected') : (isRtl ? 'پایگاه دانش' : 'Knowledge Engine')}
        </span>
      </div>

      {/* Error notification if API key is invalid */}
      {chat.engineError && (
        <div className="px-4 py-2 bg-red-950/60 border-b border-red-500/40 text-xs text-red-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>
              {chat.engineError === 'API_KEY_INVALID'
                ? isRtl
                  ? 'کلید Gemini نامعتبر است. از پایگاه دانش داخلی استفاده شد.'
                  : 'Invalid Gemini API key. Switched to built-in knowledge.'
                : isRtl
                ? 'سهمیه درخواست پر شده است.'
                : 'Quota exceeded. Switched to built-in knowledge.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => chat.setShowApiKeyPrompt(true)}
            className="text-[10px] font-bold underline hover:text-white"
          >
            {isRtl ? 'ویرایش کلید' : 'Edit key'}
          </button>
        </div>
      )}

      {/* 3. Quick Topic Horizontal Carousel */}
      <div className="px-4 py-2 border-b border-white/[0.05] bg-[#0C0F17]/60 overflow-x-auto no-scrollbar flex items-center gap-2">
        {quickPillCategories.map((pill, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => chat.sendMessage(pill.prompt)}
            className="whitespace-nowrap px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-brand-orange/20 text-neutral-300 hover:text-white border border-white/[0.06] hover:border-brand-orange/30 text-[11px] font-mono transition-all shrink-0"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* 4. Conversation Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {chat.messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Assistant Avatar */}
              {!isUser && (
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-white/[0.05] border border-white/[0.1] shrink-0 mt-1">
                  <img
                    src={logoEmblem}
                    alt="MIGO AI"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = logoSrc;
                    }}
                  />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-[13px] leading-relaxed transition-all ${
                  isUser
                    ? 'bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white rounded-ee-sm shadow-md'
                    : 'bg-[#12151E] border border-white/[0.08] text-neutral-200 rounded-es-sm shadow-sm'
                }`}
              >
                {/* Bubble Content */}
                <MessageContent content={msg.content} />

                {/* Suggested Action Pills (if any) */}
                {msg.metadata?.suggestedActions && msg.metadata.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-white/[0.08]">
                    {msg.metadata.suggestedActions.map((action, aIdx) => (
                      <Link
                        key={aIdx}
                        href={action.href}
                        onClick={chat.closeChat}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-brand-orange hover:text-white border border-white/[0.1] text-xs font-bold text-neutral-200 transition-all"
                      >
                        <span>{action.label}</span>
                        <DirectionAwareArrow type="arrow" className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Follow-up Question Chips (if any) */}
                {msg.metadata?.followUpOptions && msg.metadata.followUpOptions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 mt-2 border-t border-white/[0.06]">
                    {msg.metadata.followUpOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => chat.sendMessage(opt)}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange border border-brand-orange/25 transition-all text-start"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Streaming / Typing Indicator */}
        {chat.isStreaming && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-lg overflow-hidden bg-white/[0.05] border border-white/[0.1] shrink-0">
              <img src={logoEmblem} alt="MIGO AI" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 rounded-2xl bg-[#12151E] border border-white/[0.08] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 5. Message Input Area */}
      <div className="p-4 border-t border-white/[0.08] bg-[#0A0C13]">
        <div className="relative flex items-end gap-2 p-2 rounded-2xl bg-[#121620] border border-white/[0.1] focus-within:border-brand-orange transition-all">
          <textarea
            ref={inputRef}
            rows={1}
            value={chat.inputValue}
            onChange={(e) => chat.setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isRtl
                ? 'هر سوالی از MIGO AI دارید بپرسید...'
                : 'Ask MIGO AI anything about our creative technologies...'
            }
            className="w-full resize-none bg-transparent px-2 py-1 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none max-h-24 leading-relaxed font-sans"
          />

          <button
            type="button"
            disabled={!chat.inputValue.trim() || chat.isStreaming}
            onClick={() => chat.sendMessage()}
            className="p-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white disabled:opacity-40 disabled:hover:bg-brand-orange transition-all shrink-0 focus:outline-none shadow-glow-orange"
            title={isRtl ? 'ارسال پیام' : 'Send message'}
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-2 px-1">
          <span>{chat.isGeminiActive ? '✨ Powered by Google Gemini 1.5' : '⚡ MIGO Studio Intelligence'}</span>
          <span>MIGO AI v2.2</span>
        </div>
      </div>
    </div>
  );
}
