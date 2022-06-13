import { useColorModeValue, Heading, Grid, Box, Text } from '@chakra-ui/react';

import { Testimonial } from '@packages/entities/testimonials';
import { useI18n } from '@packages/features/i18n-context';

import Section from './Section';

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: Props) {
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
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap="2rem"
        my="2rem"
        justifyItems="center"
      >
        {testimonials.map((t) => (
          <Box key={t.id!}>
            <Text as="h2">{t.name}</Text>
            <Text>{t.text}</Text>
          </Box>
        ))}
      </Grid>
    </Section>
  );
}
