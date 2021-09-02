import { useColorModeValue, Heading } from '@chakra-ui/react';

import Section from './Section';

export default function TrailSection() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Section bg={bgColor}>
      <Heading textAlign="center">
        This is the test for the comp baseline together with the section
        component integration test and their position inside the homepage
      </Heading>
    </Section>
  );
}
