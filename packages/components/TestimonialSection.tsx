import {
  useColorModeValue,
  Heading,
  Box,
  Flex,
  Image,
  Text,
  Grid,
} from '@chakra-ui/react';

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
        {testimonials.map(({ name, text, avatarUrl }) => (
          <TestimonialCard
            key={name}
            name={name}
            testimonial={text}
            img={avatarUrl}
          />
        ))}
      </Grid>
    </Section>
  );
}

interface TestimonialCardProps {
  name: string;
  testimonial: string;
  img: string;
}

function TestimonialCard({ name, testimonial, img }: TestimonialCardProps) {
  return (
    <Box h="400" rounded="lg" shadow="lg" p={2}>
      <Flex justifyContent="space-between" mb="1">
        <Heading alignSelf="center" size="sm">
          {name}
        </Heading>
        <Image
          src={img}
          alt={name}
          maxW={{ base: '4rem', sm: '4.5rem' }}
          fit="cover"
          rounded="full"
          borderStyle="solid"
          borderWidth="3px"
          borderColor="#17A9BC"
        />
      </Flex>
      <Text>{testimonial}</Text>
    </Box>
  );
}
