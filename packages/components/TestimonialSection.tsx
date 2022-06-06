import { useColorModeValue, Heading } from '@chakra-ui/react';

import { useI18n } from '@packages/features/i18n-context';

import Section from './Section';

export default function TestimonialSection() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const { t } = useI18n('testimonials');

  return (
    <Section bg={bgColor}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl' }}
        lineHeight="110%"
        textAlign="center"
        py="2rem"
      >
        {t(`title`)}
      </Heading>
    </Section>
  );
}
