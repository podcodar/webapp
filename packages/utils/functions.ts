export function makeThrowMissingImplementation(
  message = 'missing implementation',
) {
  return function throwMissingImplementation() {
    throw new Error(message);
  };
}
