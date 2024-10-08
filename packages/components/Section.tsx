import { classes } from "@packages/utils/classes";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

function Section({ children, className, id }: Props) {
  return (
    <div className={classes("py-16", className)} id={id}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </div>
  );
}

export default Section;
