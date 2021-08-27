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
  CodeIcon,
  BriefcaseIcon,
  ConversationIcon,
} from '@packages/components/icons';

export default function WhyItWorksSection() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box
      bg={bgColor}
      p="1rem"
      mt="3rem"
      borderTop="0.25rem solid"
      borderColor="purple.500"
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl' }}
        lineHeight="110%"
        textAlign="center"
        py="2rem"
      >
        E por quê funciona?
      </Heading>
      <Text
        color="gray.500"
        textAlign="center"
        fontSize={{ base: '1xl', sm: '2xl' }}
        marginBottom="2rem"
      >
        {' '}
        porque aqui você...
      </Text>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        p="1rem"
        spacing="2rem"
      >
        {cardList.map((cardProps) => (
          <CardItem key={cardProps.title} {...cardProps} />
        ))}
      </Stack>
    </Box>
  );
}

interface CardItemProps {
  title: string;
  icon: ComponentWithAs<'svg', IconProps>;
  description: string;
}

function CardItem({ title, icon, description }: CardItemProps) {
  return (
    <Box>
      <Icon
        as={icon}
        w="2rem"
        h="2rem"
        marginBottom="1rem"
        color="purple.500"
      />
      <Heading size="sm">{title}</Heading>
      <Text color="gray.500" marginTop="1rem" maxWidth="30rem">
        {description}
      </Text>
    </Box>
  );
}

const cardList: CardItemProps[] = [
  {
    icon: CodeIcon,
    title: 'Tem um ensino personalizado',
    description:
      'Na PodCodar não existe um só caminho de ensino que todos devem seguir. Aqui acreditamos que cada indivíduo é único e por isso é necessário que o processo de aprendizado seja moldado de acordo com as necessidades e desejos de cada um.',
  },
  {
    icon: ConversationIcon,
    title: 'Faz parte de uma comunidade',
    description:
      'Além de poder participar dos meetups semanais com profissionais estabelicidos da área de tecnologia, a idéia é te ajudar a expandir seu conhecimento através do compartilhamento de informação e das mentorias personalizadas individuais ou focadas em projetos em grupo. Mas é você quem escolhe como irá interagir, nós só te ajudamos a chegar lá!',
  },
  {
    icon: BriefcaseIcon,
    title: 'Entra para o mercado de trabalho',
    description:
      'Aqui você tem nosso apoio integral para entrar no mercado de trabalho como um excelente profissional. Através de simulações de entrevistas guiadas por experts da área, você é testado em um cenário o mais próximo possível do mundo real e do mercado de trabalho, ficando consideravelmente mais bem preparado  para lidar com este desafio.',
  },
];
