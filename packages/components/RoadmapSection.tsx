import {
  useColorModeValue,
  Grid,
  Heading,
  Link,
  Flex,
  Text,
} from '@chakra-ui/react';

import { useI18n } from '@packages/features/i18n-context';

import Section from './Section';

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
          <Link
            href="https://www.notion.so/podcodar/Trilhas-de-estudo-eb8954febc0243b681ead5d417cca67b"
            isExternal
          >
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
    link: 'https://www.notion.so/podcodar/Programa-o-Web-0a244ea5a20f4b73b2c706141f7a4919',
    color: '#17A9BC',
  },
  {
    title: 'ux-design',
    link: 'https://www.notion.so/podcodar/2dc254c4ea26420d94f400cf1275acd2?v=46a0114a307f4071be615feb0e64879f',
    color: '#F99223',
  },
  {
    title: 'market',
    link: 'https://www.notion.so/podcodar/Entrar-no-mercado-6132c9e0873948d9943c174f66df7ee3',
    color: '#FF4CFF',
  },
  {
    title: 'computing',
    link: 'https://www.notion.so/podcodar/Computa-o-e7674e02bb924ea495f21575f890a831',
    color: '#b794f4',
  },
];
