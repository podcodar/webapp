import { EffectCallback, ReactNode, useEffect } from 'react';

export interface ChildrenProps {
  readonly children: ReactNode;
}

export function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
