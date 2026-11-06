'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useDirection } from './direction/DirectionProvider';
import { UI_STRINGS } from '@/data/translations';

interface AudioContextType {
  isMuted: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Check saved preference
    const saved = localStorage.getItem('migo_sound_muted');
    if (saved !== null) {
      setIsMuted(saved === 'true');
    }
  }, []);

  const initAudio = () => {
    if (!audioCtx && typeof window !== 'undefined') {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) {
        setAudioCtx(new Ctx());
      }
    }
  };

  const toggleSound = () => {
    initAudio();
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem('migo_sound_muted', String(next));
      return next;
    });
  };

  const playClick = useCallback(() => {
    if (isMuted || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } catch {
      // Ignore audio synthesis errors
    }
  }, [isMuted, audioCtx]);

  const playHover = useCallback(() => {
    if (isMuted || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch {
      // Ignore
    }
  }, [isMuted, audioCtx]);

  const playSuccess = useCallback(() => {
    if (isMuted || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignore
    }
  }, [isMuted, audioCtx]);

  return (
    <AudioContext.Provider value={{ isMuted, toggleSound, playClick, playHover, playSuccess }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    return {
      isMuted: true,
      toggleSound: () => {},
      playClick: () => {},
      playHover: () => {},
      playSuccess: () => {},
    };
  }
  return ctx;
}

export function SoundToggle() {
  const { isMuted, toggleSound } = useAudio();
  const { locale } = useDirection();

  return (
    <button
      onClick={toggleSound}
      aria-label={isMuted ? UI_STRINGS.soundOff[locale] : UI_STRINGS.soundOn[locale]}
      title={isMuted ? UI_STRINGS.soundOff[locale] : UI_STRINGS.soundOn[locale]}
      className="flex items-center justify-center p-2 rounded-xl text-neutral-400 hover:text-white bg-[#12151B] border border-white/[0.08] hover:border-brand-orange/50 transition-all min-h-[44px] min-w-[44px] lg:min-h-[38px] lg:min-w-[38px]"
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-neutral-500" />
      ) : (
        <Volume2 className="w-4 h-4 text-brand-orange animate-pulse" />
      )}
    </button>
  );
}
