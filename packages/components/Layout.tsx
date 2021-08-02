import { ReactNode } from 'react';
import NavBar from './NavBar';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div>
      <NavBar />
      {/* TODO: container */}
      <div>{children}</div>
    </div>
  );
}

export default Layout;
