import type { ReactNode } from "react";

type SupportedTags = "p" | "span";

interface Props {
  children?: ReactNode;
  as?: SupportedTags;
  className?: string;
}

export function Text({ children, as: Tag = "p", className = "" }: Readonly<Props>) {
  return <Tag className={className}>{children}</Tag>;
}
