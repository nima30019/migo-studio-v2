'use client';

import React from 'react';
import { useMigoAi } from '@/hooks/useMigoAi';
import { MigoAiLauncher } from './MigoAiLauncher';
import { MigoAiChatModal } from './MigoAiChatModal';
import { useDirection } from '@/components/direction/DirectionProvider';

export function MigoAi() {
  const { locale } = useDirection();
  const chat = useMigoAi(locale);

  const isLocalReady = chat.engineMode === 'local-ai' && chat.webLLMStatus === 'ready';

  return (
    <>
      <MigoAiLauncher
        isOpen={chat.isOpen}
        onClick={chat.toggleChat}
        isReadyLocalAI={isLocalReady}
      />
      <MigoAiChatModal chat={chat} />
    </>
  );
}
