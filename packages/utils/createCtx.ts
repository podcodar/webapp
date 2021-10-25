import { Context, createContext, useContext, Provider } from 'react';

export type SafeContextResult<T> = [
  () => T,
  Provider<T | null>,
  Context<T | null>,
];

/**
 * A helper that creates a Context Consumer and Provider without having to declare a
 * default value and checking nullable.
 *
 * @example
 * export const [useAuth, AuthProvider] = createSafeContext<AuthView>('AuthCtx')
 *
 * @param displayName Context name displayed in React Component's Tree
 * @returns A context consumer, the context provider and the context itself
 */
function createCtx<T>(displayName: Readonly<string>): SafeContextResult<T> {
  const Ctx = createContext<T | null>(null);
  Ctx.displayName = displayName;

  function useCtx() {
    const value = useContext(Ctx);
    if (value === null)
      throw new Error(
        `Missing ${displayName} context provider upwards on this tree`,
      );

    return value;
  }

  return [useCtx, Ctx.Provider, Ctx];
}

export default createCtx;
