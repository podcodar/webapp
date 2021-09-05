import {
  Grid,
  GridItem,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import { useI18n } from '../utils/i18n-react';

import Section from './Section';

export default function MentoringSection() {
  const { t } = useI18n('mentoring');
  const bgColor = useColorModeValue('#f7f5f4', 'gray.700');
  return (
    <Section bg={bgColor} py="5rem">
      <Grid templateColumns="repeat(5, 1fr)" gap={{ basE: 0, md: 4 }}>
        <GridItem rowSpan={{ base: 1, md: 3 }} colSpan={{ base: 5, md: 2 }}>
          <Heading size="md" my="2rem" fontWeight={400} textAlign="center">
            {t`title`}
          </Heading>

          <Text color="gray.500" fontSize="3xl" textAlign="center" px="3rem">
            {t`description`}
          </Text>
        </GridItem>
        {mentoringList.map((mentoring) => (
          <CardItem
            key={mentoring}
            title={t(`${mentoring}.title`)}
            description={t(`${mentoring}.description`)}
          />
        ))}
      </Grid>
    </Section>
  );
}

interface CardItemProps {
  title: string;
  description: string;
}

function CardItem({ title, description }: CardItemProps) {
  return (
    <GridItem
      colSpan={{ base: 5, md: 3 }}
      textAlign={{ base: 'center', md: 'left' }}
    >
      <Heading size="md" fontWeight={400} my="2rem">
        {title}
      </Heading>
      <Text color="gray.500">{description}</Text>
    </GridItem>
  );
}

const mentoringList = [
  'personalizedMentoring',
  'pairMentoring',
  'projectMentoring',
];
