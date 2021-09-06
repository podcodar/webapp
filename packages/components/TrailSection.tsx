import { useColorModeValue, Stack, Box, Heading } from '@chakra-ui/react';

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
        Comece pelas trilhas de estudo
      </Heading>
      <Stack
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        textAlign="center"
        p="1rem"
        spacing={{ base: '2rem', md: '0rem', lg: '2rem' }}
        // bg={{base: 'red', md: 'purple', lg: 'green'}}
        flexWrap={{ base: 'nowrap', md: 'wrap', lg: 'nowrap' }}
        justifyContent="space-between"
        alignItems="stretch"
        alignContent="center"
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
  image: string;
}

function CardItem({ title }: CardItemProps) {
  const boxShadowColor = useColorModeValue('#171923', '#f7fafc');
  return (
    <Box
      w={{ base: '100%', md: '48%', lg: '100%' }}
      mb={{ base: '0', md: '2%', lg: '0' }}
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
        color={boxShadowColor === '#171923' ? '#f7fafc' : '#171923'}
        bg={boxShadowColor}
        m="5rem 1rem 1rem 1rem"
      >
        {title}
      </Heading>
    </Box>
  );
}

const cardList: CardItemProps[] = [
  {
    title: 'Primeiro Card',
    image:
      'https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f4da.svg',
  },
  {
    title: 'Segundo Card',
    image:
      'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0812dad9-c634-471a-891a-fbe91aec4296%2Fjust-llama.png?table=block&id=b3bbe39f-0c60-4e81-b019-b9d31e4c7787&spaceId=ac9f4c1f-75da-4e1b-a9b4-5fe0876b33b4&width=250&userId=c43c8212-08e9-46c6-96f7-cd3888cbe6c9&cache=v2',
  },
  {
    title: 'Terceiro Card',
    image:
      'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0812dad9-c634-471a-891a-fbe91aec4296%2Fjust-llama.png?table=block&id=b3bbe39f-0c60-4e81-b019-b9d31e4c7787&spaceId=ac9f4c1f-75da-4e1b-a9b4-5fe0876b33b4&width=250&userId=c43c8212-08e9-46c6-96f7-cd3888cbe6c9&cache=v2',
  },
  {
    title: 'Quarto Card',
    image:
      'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0812dad9-c634-471a-891a-fbe91aec4296%2Fjust-llama.png?table=block&id=b3bbe39f-0c60-4e81-b019-b9d31e4c7787&spaceId=ac9f4c1f-75da-4e1b-a9b4-5fe0876b33b4&width=250&userId=c43c8212-08e9-46c6-96f7-cd3888cbe6c9&cache=v2',
  },
];
