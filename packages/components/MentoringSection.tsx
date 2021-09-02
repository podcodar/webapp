import { Grid, GridItem, Text, Heading, Container } from '@chakra-ui/react';

export default function MentoringSection() {
  return (
    <Container maxW="5xl" my="5rem">
      <Grid
        h="600px"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        py="5rem"
      >
        <GridItem rowSpan={{ base: 1, md: 3 }} colSpan={{ base: 5, md: 2 }}>
          <Heading
            size="md"
            fontWeight={400}
            pb="2rem"
            marginTop="2rem"
            maxWidth="30rem"
            textAlign="center"
          >
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
    </Container>
  );
}

interface CardItemProps {
  title: string;
  description: string;
}

function CardItem({ title, description }: CardItemProps) {
  return (
    <GridItem rowSpan={1} colSpan={{ base: 5, md: 3 }} padding="2">
      <Heading
        size="md"
        fontWeight={400}
        pb="2rem"
        marginTop="2rem"
        maxWidth="30rem"
      >
        {title}
      </Heading>
      <Text color="gray.500">{description}</Text>
    </GridItem>
  );
}
