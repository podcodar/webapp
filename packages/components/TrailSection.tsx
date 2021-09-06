import { useColorModeValue, Stack, Box, Heading, Link } from '@chakra-ui/react';

import Section from './Section';

export default function TrailSection() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  return (
    <Section bg={bgColor}>
      <Heading
        size="md"
        fontWeight={400}
        pb="2rem"
        marginTop="2rem"
        textAlign="center"
      >
        Conteúdo PodCodar
      </Heading>
      <Stack
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        textAlign="center"
        p="1rem"
        spacing={{ base: '2rem', md: '0rem', lg: '2rem' }}
        // bg={{base: 'red', md: 'purple', lg: 'green'}}
        flexWrap={{ base: 'nowrap', md: 'wrap', lg: 'nowrap' }}
        justifyContent="space-around"
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
  link: string;
}

function CardItem({ title, link }: CardItemProps) {
  const boxShadowColor = useColorModeValue('#171923', '#f7fafc');
  return (
    <Link href={link} isExternal style={{ textDecoration: 'none' }}>
      <Box
        w={{ base: '100%', md: '20rem', lg: '100%' }}
        mb={{ base: '0', md: '2rem', lg: '0' }}
        h="12rem"
        border="1px solid"
        transition="box-shadow 200ms ease-in-out"
        bg={boxShadowColor === '#171923' ? '#f7fafc' : '#171923'}
        _hover={{
          boxShadow: `-8px 8px 0 ${boxShadowColor}`,
          transform: 'translate(4px, -4px)',
        }}
      >
        <Heading
          size="md"
          fontWeight={400}
          color={boxShadowColor === '#171923' ? '#171923' : '#f7fafc'}
          m="5rem 1rem 1rem 1rem"
        >
          {title}
        </Heading>
      </Box>
    </Link>
  );
}

const cardList: CardItemProps[] = [
  {
    title: 'Trilhas de estudo',
    link: 'https://www.notion.so/podcodar/Trilhas-de-estudo-eb8954febc0243b681ead5d417cca67b',
  },
  {
    title: 'Acervo de vídeos',
    link: 'https://www.notion.so/podcodar/V-deos-cb62802dc021497889fb9923227c0c9a',
  },
  {
    title: 'Meetups semanais',
    link: 'https://www.notion.so/podcodar/ecda231a312e4cedac6fb36766313830?v=e6312d6a390148eda589840f335caaa8',
  },
  {
    title: 'Trajetória de design',
    link: 'https://www.notion.so/podcodar/Trajet-ria-de-Design-29a45806108d4b79aed352d67204033d',
  },
];
