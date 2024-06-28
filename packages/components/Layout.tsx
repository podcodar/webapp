import { Box } from '@chakra-ui/layout';

import NavBar from './NavBar';

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <Box>
      <NavBar />
      {children}
    </Box>
  );
}

export default Layout;
