import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  as?: "p" | "span";
  className?: string;
}

export function Text({ children, as: Tag = "p", className = "" }: Readonly<Props>) {
  return <Tag className={className}>{children}</Tag>;
}
