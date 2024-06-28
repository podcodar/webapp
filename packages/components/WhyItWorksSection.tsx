import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  Icon,
  type ComponentWithAs,
  type IconProps,
  Stack,
} from '@chakra-ui/react';

import {
  PersonalizedLearningIcon,
  PracticalLearningIcon,
  TeamworkIcon,
} from '@packages/components/icons';
import { useI18n } from '@packages/features/i18n-context';

import Section from './Section';

export default function WhyItWorksSection() {
  const { t } = useI18n('why-it-works');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Section bg={bgColor} id="why-it-works">
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl' }}
        lineHeight="110%"
        textAlign="center"
        py="2rem"
      >
        {t('title')}
      </Heading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        p="1rem"
        spacing="4rem"
      >
        {cardList.map((card) => (
          <CardItem
            key={card.translation}
            icon={card.icon}
            title={t(`${card.translation}.title`)}
            description={t(`${card.translation}.description`)}
          />
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

const cardList = [
  {
    icon: PracticalLearningIcon,
    translation: 'practical-learn',
  },
  {
    icon: PersonalizedLearningIcon,
    translation: 'personalized-learning',
  },
  {
    icon: TeamworkIcon,
    translation: 'teamwork',
  },
];
