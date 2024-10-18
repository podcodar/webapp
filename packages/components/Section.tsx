import { classes } from "@packages/utils/classes";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
}

function Section({ children, className, innerClassName, id }: Props) {
  return (
    <div className={classes("py-16", className)} id={id}>
      <div className={classes("mx-auto max-w-5xl", innerClassName)}>{children}</div>
    </div>
  );
}

export default Section;
