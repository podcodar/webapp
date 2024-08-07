import { type EffectCallback, type FC, type ReactNode, useEffect } from "react";

export interface ChildrenProps {
  readonly children: ReactNode;
}

export function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export function withProviders(initialElement: ReactNode, providers: FC<ChildrenProps>[]) {
  return providers.reduce(
    (children, Provider) => <Provider key={Provider.displayName ?? ""}>{children}</Provider>,
    initialElement,
  );
}
