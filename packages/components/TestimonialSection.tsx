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
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            name={testimonial.name}
            testimonial={testimonial.text}
            img={testimonial.avatarUrl}
            borderColor="#17A9BC"
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
  borderColor: string;
}

function TestimonialCard({
  name,
  testimonial,
  img,
  borderColor,
}: TestimonialCardProps) {
  return (
    <Box maxW="400px" h="400" rounded="lg" shadow="lg" p={2}>
      <Flex justifyContent="space-between" mb="1">
        <Heading alignSelf="center" size="sm">
          {name}
        </Heading>
        <Image
          src={img}
          alt={`img${name}`}
          maxW={{ base: '60px', sm: '70px' }}
          fit="cover"
          rounded="full"
          borderStyle="solid"
          borderWidth="3px"
          borderColor={borderColor}
        />
      </Flex>
      <Text
        maxH="300px"
        overflow="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '0px',
          },
        }}
      >
        {testimonial}
      </Text>
    </Box>
  );
}
