import { createContext, useContext, useMemo, useState } from 'react';

import { makeThrowMissingImplementation } from '@packages/utils/functions';
import { ChildrenProps } from '@packages/utils/react';

interface ModalActions {
  readonly open: () => void;
  readonly close: () => void;
}

interface ModalStates {
  readonly isOpen: boolean;
}

const missingModalProvider = makeThrowMissingImplementation(
  'Missing ModalProvider upwards in this tree',
);

const ModalActionsCtx = createContext<ModalActions>({
  close: missingModalProvider,
  open: missingModalProvider,
});

const ModalStateCtx = createContext<ModalStates>({
  isOpen: false,
});

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
    <ModalActionsCtx.Provider value={actions}>
      <ModalStateCtx.Provider value={state}>{children}</ModalStateCtx.Provider>
    </ModalActionsCtx.Provider>
  );
}

export default ModalProvider;

export function useModalStates() {
  return useContext(ModalStateCtx);
}

export function useModalActions() {
  return useContext(ModalActionsCtx);
}
