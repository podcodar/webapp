import {
  useColorModeValue,
  Grid,
  Heading,
  Link,
  Flex,
  Text,
} from '@chakra-ui/react';

import Section from './Section';

export default function TrailSection() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  return (
    <Section bg={bgColor}>
      <Flex justifyContent="space-between" py="1rem">
        <Heading size="md" fontWeight={600} textAlign="left">
          Conheça nossas trilhas
        </Heading>
        <Text textAlign="right">
          <Link
            href="https://www.notion.so/podcodar/Trilhas-de-estudo-eb8954febc0243b681ead5d417cca67b"
            isExternal
          >
            Ver todas
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
          <CardItem key={cardProps.title} {...cardProps} />
        ))}
      </Grid>
    </Section>
  );
}

interface CardItemProps {
  title: string;
  link: string;
  bgColor: string;
}

function CardItem({ title, link, bgColor }: CardItemProps) {
  return (
    <Link href={link} isExternal _hover={{ textDecoration: 'none' }}>
      <Flex
        py="2rem"
        transition="box-shadow 300ms ease-in-out"
        border="2px solid"
        borderColor={bgColor}
        borderRadius="10px"
        justifyContent="center"
        _hover={{
          boxShadow: `-8px 8px 0 ${bgColor}`,
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
    title: 'Programação Web',
    link: 'https://www.notion.so/podcodar/Programa-o-Web-0a244ea5a20f4b73b2c706141f7a4919',
    bgColor: '#17A9BC',
  },
  {
    title: 'UX Design',
    link: 'https://www.notion.so/podcodar/2dc254c4ea26420d94f400cf1275acd2?v=46a0114a307f4071be615feb0e64879f',
    bgColor: '#F99223',
  },
  {
    title: 'Entrar no mercado',
    link: 'https://www.notion.so/podcodar/Entrar-no-mercado-6132c9e0873948d9943c174f66df7ee3',
    bgColor: '#FF4CFF',
  },
  {
    title: 'Computação',
    link: 'https://www.notion.so/podcodar/Computa-o-e7674e02bb924ea495f21575f890a831',
    bgColor: '#b794f4',
  },
];
