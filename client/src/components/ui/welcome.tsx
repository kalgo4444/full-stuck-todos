'use client';
import CustomFade from '@/components/ui/custom-fade';
import { TextEffect } from '../../../components/motion-primitives/text-effect';
import { useState } from 'react';

export default function Welcome() {
  const [showOwner, setShowOwner] = useState<boolean>(false);

  return (
    <div>
      <TextEffect
        className="text-3xl"
        per="char"
        preset="fade"
        onAnimationComplete={() => setShowOwner(!showOwner)}
      >
        Simple, Open-source and fast todo application
      </TextEffect>
      {showOwner ? (
        <CustomFade className="text-4xl mt-5 text-center">
          <div>
            KalgoTodos. by{' '}
            <a
              className="underline"
              href="https://github.com/kalgo4444"
              target="_blank"
            >
              Kalgo
            </a>
          </div>
        </CustomFade>
      ) : (
        <div className="opacity-0 text-4xl mt-5">hello world</div>
      )}
    </div>
  );
}
