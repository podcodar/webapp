import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div>
      {/* TODO: navbar */}
      <div>navbar: </div>
      {/* TODO: container */}
      <div>{children}</div>
    </div>
  );
}

export default Layout;
