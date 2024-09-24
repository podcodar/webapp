import type { ReactNode } from "react";

type SupportedTags = "p" | "span";

interface Props {
  children?: ReactNode;
  as?: SupportedTags;
  style?: string;
}

export function Text({ children, as: Tag = "p", style = "" }: Readonly<Props>) {
  return <Tag className={style}>{children}</Tag>;
}
