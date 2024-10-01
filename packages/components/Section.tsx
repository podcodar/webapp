import type { ReactNode } from "react";
import { classes } from "@packages/utils/classes";

interface Props {
  children: ReactNode;
  className?: string;
}

function Section({ children, className }: Props) {
  return (
    <div className={classes("py-16", className)}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </div>
  );
}

export default Section;
