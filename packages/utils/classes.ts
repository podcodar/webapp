export function classes(...cls: string[]): string {
  return cls.filter(Boolean).join(" ");
}
