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
        py="3rem"
      >
        E como funciona?
      </Heading>
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
      <Heading size="sm" marginBottom="1rem">
        {title}
      </Heading>
      <Text color="gray.500">{description}</Text>
    </Box>
  );
}

const cardList: CardItemProps[] = [
  {
    icon: ConversationIcon,
    title: 'Participe da comunidade',
    description:
      'Parcicipe de meetups semanais com diversos outros profissionais da área de tecnologia e expanda seus conhecimentos.',
  },
  {
    icon: CodeIcon,
    title: 'Aprenda a programar',
    description:
      'Aprenda a programar de uma forma dinâmica através do compartilhamento de conhecimento e participe de nossas mentorias pesonalizadas ou em grupo.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Entre no mercado de trabalho',
    description:
      'Prepare-se para o mercado através de simulações de entrevistas com profissionais já consolidados na área de tecnologia.',
  },
];
