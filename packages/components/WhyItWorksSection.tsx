import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  Icon,
  ComponentWithAs,
  IconProps,
  Stack,
} from '@chakra-ui/react';

import {
  PersonalizedLearningIcon,
  PracticalLearningIcon,
  TeamworkIcon,
} from '@packages/components/icons';

import Section from './Section';

export default function WhyItWorksSection() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Section bg={bgColor}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl' }}
        lineHeight="110%"
        textAlign="center"
        py="2rem"
      >
        E por quê funciona?
      </Heading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        p="1rem"
        spacing="4rem"
      >
        {cardList.map((cardProps) => (
          <CardItem key={cardProps.title} {...cardProps} />
        ))}
      </Stack>
    </Section>
  );
}

interface CardItemProps {
  title: string;
  icon: ComponentWithAs<'svg', IconProps>;
  description: string;
}

function CardItem({ title, icon, description }: CardItemProps) {
  return (
    <Box w="100%">
      <Icon as={icon} w="10rem" h="10rem" m="1rem" />
      <Heading size="md" fontWeight={400} my="2rem">
        {title}
      </Heading>
      <Text color="gray.500">{description}</Text>
    </Box>
  );
}

const cardList: CardItemProps[] = [
  {
    icon: PracticalLearningIcon,
    title: 'Aprenda na prática',
    description:
      'Utilizamos práticas do mercado de trabalho para acelerar seu desenvolvimento profissional. ',
  },
  {
    icon: PersonalizedLearningIcon,
    title: 'Ensino personalizado ',
    description:
      'Cada indivíduo é único e por isso é necessário que o processo de aprendizado seja moldado de acordo com as suas necessidades.',
  },

  {
    icon: TeamworkIcon,
    title: 'Trabalho em equipe',
    description:
      'Participe das mentorias personalizadas individuais e projetos em grupo. É você quem escolhe como contribuir com a comunidade.',
  },
];
