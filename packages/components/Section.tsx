import { ChakraProps, Container, Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends ChakraProps {
  children: ReactNode;
}

function Section({ children, ...props }: Props) {
  return (
    <Box py="4rem" {...props}>
      <Container maxW="5xl">{children}</Container>
    </Box>
  );
}

export default Section;
