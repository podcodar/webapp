import type { ReactNode } from "react";

interface TextProps {
  children?: ReactNode;
  as?: "p" | "span";
  style?: string;
}

export function Text({
  children,
  as: Tag = "p",
  style = "",
}: Readonly<TextProps>) {
  return <Tag className={style}>{children}</Tag>;
}
