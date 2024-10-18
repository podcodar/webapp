import NavBar from "./NavBar";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default Layout;
