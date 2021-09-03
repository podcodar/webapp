import {
  Grid,
  GridItem,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import Section from './Section';

export default function MentoringSection() {
  const bgColor = useColorModeValue('#f7f5f4', 'gray.700');
  return (
    <Section bg={bgColor} py="5rem">
      <Grid templateColumns="repeat(5, 1fr)" gap={{ basE: 0, md: 4 }}>
        <GridItem rowSpan={{ base: 1, md: 3 }} colSpan={{ base: 5, md: 2 }}>
          <Heading size="md" my="2rem" fontWeight={400} textAlign="center">
            Nossa metodologia
          </Heading>

          <Text color="gray.500" fontSize="3xl" textAlign="center" px="3rem">
            É estruturada por mentorias que são direcionadas por trilhas
            conforme a necessidade e o tempo de cada pessoa, focando no acesso
            ao mercado de trabalho.
          </Text>
        </GridItem>
        <CardItem
          title="Mentoria personalizada"
          description="A mentoria personalizada tem como objetivo um acompanhamento
          individual do mentorando, focado em trilhas introdutórias e exercícios
          especializados."
        />
        <CardItem
          title="Mentoria em dupla"
          description="A mentoria em dupla tem como objetivo a troca de experiência entre
          mais de um mentorado, pair programming e colaboração no
          desenvolvimento de exercícios e projetos."
        />
        <CardItem
          title="Mentoria de projetos"
          description="É focada em desenvolver projetos internos ou externos. O mentorando
          vivencia trabalho em equipe, pair programmings e code reviwes, todos
          estão 100% do tempo simulando o dia a dia do desenvolvedor."
        />
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
