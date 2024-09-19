"use client";

import { useMemo, useState } from "react";

import { createCtx } from "@packages/utils/react";

import type { ChildrenProps } from "@packages/utils/react";

interface ModalActions {
  readonly open: () => void;
  readonly close: () => void;
}

interface ModalStates {
  readonly isOpen: boolean;
}

const [useModalActions, ModalActionsProvider] = createCtx<ModalActions>("ModalActionsCtx");
const [useModalStates, ModalStatesProvider] = createCtx<ModalStates>("ModalStatesCtx");

function ModalProvider({ children }: ChildrenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const state = useMemo(() => ({ isOpen }), [isOpen]);

  const actions: ModalActions = useMemo(
    () => ({
      close: () => setIsOpen(false),
      open: () => setIsOpen(true),
    }),
    [],
  );

  return (
    <ModalActionsProvider value={actions}>
      <ModalStatesProvider value={state}>{children}</ModalStatesProvider>
    </ModalActionsProvider>
  );
}

export default ModalProvider;
export { useModalActions, useModalStates };
