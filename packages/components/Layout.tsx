import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

import NavBar from './NavBar';

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
