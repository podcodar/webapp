import { Box } from '@chakra-ui/layout';
import { ReactNode } from 'react';

import CallToActionSection from '@packages/components/CallToActionSection';
import CallToActionModal from '@packages/components/dialogs/CallToActionModal';

import NavBar from './NavBar';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <Box>
      <CallToActionSection />
      <CallToActionModal />
      <NavBar />
      {children}
    </Box>
  );
}

export default Layout;
