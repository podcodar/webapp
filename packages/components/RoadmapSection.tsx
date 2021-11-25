import {
  useColorModeValue,
  Grid,
  Heading,
  Link,
  Flex,
  Text,
} from '@chakra-ui/react';

import { roadMapsLinks } from '@packages/config/site';
import { useI18n } from '@packages/features/i18n-context';

import Section from './Section';
import TechSection from './TechSection';

export default function RoadmapSection() {
  const { t } = useI18n('roadmap');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  return (
    <Section bg={bgColor}>
      <Flex justifyContent="space-between" py="1rem">
        <Heading size="md" fontWeight={600} textAlign="left">
          {t(`title`)}
        </Heading>
        <Text textAlign="right">
          <Link href={roadMapsLinks.all} isExternal>
            {t(`see-all`)}
          </Link>
        </Text>
      </Flex>

      <Grid
        gridTemplateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap="2rem"
        my="2rem"
      >
        {cardList.map((cardProps) => (
          <CardItem
            key={cardProps.title}
            color={cardProps.color}
            link={cardProps.link}
            title={t(cardProps.title)}
          />
        ))}
      </Grid>
      <TechSection />
    </Section>
  );
}

interface CardItemProps {
  title: string;
  link: string;
  color: string;
}

function CardItem({ title, link, color }: CardItemProps) {
  return (
    <Link href={link} isExternal _hover={{ textDecoration: 'none' }}>
      <Flex
        py="2rem"
        transition="box-shadow 300ms ease-in-out"
        border="2px solid"
        borderColor={color}
        borderRadius="10px"
        justifyContent="center"
        _hover={{
          boxShadow: `-8px 8px 0 ${color}`,
        }}
      >
        <Heading size="md" fontWeight={400} textDecoration="none">
          {title}
        </Heading>
      </Flex>
    </Link>
  );
}

const cardList: CardItemProps[] = [
  {
    title: 'web-programming',
    link: roadMapsLinks.webProgramming,
    color: '#17A9BC',
  },
  {
    title: 'ux-design',
    link: roadMapsLinks.uxDesign,
    color: '#F99223',
  },
  {
    title: 'market',
    link: roadMapsLinks.gettingHired,
    color: '#FF4CFF',
  },
  {
    title: 'computing',
    link: roadMapsLinks.computerScience,
    color: '#b794f4',
  },
];
