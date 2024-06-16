import { Box } from '@chakra-ui/layout';
import { ReactNode } from 'react';

import NavBar from './NavBar';

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
