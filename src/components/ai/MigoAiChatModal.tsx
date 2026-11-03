'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  RotateCcw,
  Sparkles,
  Send,
  Zap,
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

  const logoSrc = getAssetPath('/migo-logo-transparent.png');
  const logoEmblem = getAssetPath('/brand/instagram/migo-instagram-avatar-emblem-dark.png');

  // Auto-scroll to bottom on message update or streaming
  useEffect(() => {
    if (chat.isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.messages, chat.isOpen, chat.isStreaming]);

  // Auto-focus input on modal open
  useEffect(() => {
    if (chat.isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [chat.isOpen]);

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
        { label: '👗 پرو مجازی و فروشگاه', prompt: 'برای پرو مجازی لباس و کفش چه راهکاری دارید؟' },
        { label: '👓 واقعیت مجازی VR/MR', prompt: 'تفاوت واقعیت مجازی (VR) و ترکیبی (MR) چیه؟' },
        { label: '⚙️ شبیه‌سازی صنعتی', prompt: 'شبیه‌سازی‌های صنعتی MIGO چه کمکی به شرکت‌ها می‌کنند؟' },
        { label: '💰 برآورد هزینه و قیمت', prompt: 'هزینه‌ها و قیمت پروژه‌ها چطور محاسبه میشه؟' },
        { label: '🚀 شروع پروژه و برآورد', prompt: 'چطور می‌توانم یک پروژه با شما شروع کنم؟' },
      ]
    : [
        { label: '🏛️ Museum & Installation', prompt: 'What do you suggest for an interactive museum?' },
        { label: '📱 Zero-Install WebAR', prompt: 'How can I display products in WebAR?' },
        { label: '👗 Virtual Try-On', prompt: 'What solutions do you offer for virtual try-on in fashion?' },
        { label: '👓 Spatial VR vs MR', prompt: 'What is the difference between VR and MR?' },
        { label: '⚙️ Industrial Simulation', prompt: 'Can you build an industrial simulation?' },
        { label: '💰 Pricing & Budgets', prompt: 'How are project costs and budgets calculated?' },
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
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-400 border border-emerald-400/40 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400">
              {isRtl ? 'مشاور فناوری خلاق و رایانش فضایی' : 'Creative Technology Consultant'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
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

      {/* 2. Status Bar (Always Connected & Ready) */}
      <div className="px-5 py-2 bg-[#0A0D14] border-b border-white/[0.06] flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{isRtl ? 'متصل و آماده پاسخ‌گویی به تمام سوالات' : 'Connected & Ready for Inquiries'}</span>
        </span>

        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-brand-orange">
          <Zap className="w-3 h-3" />
          <span>{isRtl ? 'پاسخ آنی / بدون نیاز به تنظیم' : 'Instant Zero-Setup'}</span>
        </span>
      </div>

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
                ? 'هر سوالی دارید بپرسید (مثلاً: قیمت‌ها چطوره؟ یا برای فروشگاه لباس چه پیشنهادی دارید؟)...'
                : 'Ask MIGO AI anything (e.g. Virtual try-on for clothing, exhibition costs, or VR training)...'
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
          <span>{isRtl ? '⚡ متصل و آنلاین | پاسخ‌دهی آنی' : '⚡ Live & Connected'}</span>
          <span>MIGO AI v2.3</span>
        </div>
      </div>
    </div>
  );
}
