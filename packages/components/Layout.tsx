import { Box } from '@chakra-ui/layout';
import { ReactNode } from 'react';

import CallToActionModal from '@packages/components/dialogs/CallToActionModal';

import NavBar from './NavBar';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <Box>
      <CallToActionModal />
      <NavBar />
      {children}
    </Box>
  );
}

export default Layout;
