import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  CodeIcon,
  BriefcaseIcon,
  ConversationIcon,
} from '@packages/components/icons';

const HowItWorksSection = () => {
  const ColumnSection = () => {
    const content = [
      {
        icon: ConversationIcon,
        heading: 'Participe da comunidade',
        text: 'Parcicipe de meetups semanais com diversos outros profissionais da área de tecnologia e expanda seus conhecimentos.',
      },
      {
        icon: CodeIcon,
        heading: 'Aprenda a programar',
        text: 'Aprenda a programar de uma forma dinâmica através do compartilhamento de conhecimento e participe de nossas mentorias pesonalizadas ou em grupo.',
      },
      {
        icon: BriefcaseIcon,
        heading: 'Entre no mercado de trabalho',
        text: 'Prepare-se para o mercado através de simulações de entrevistas com profissionais já consolidados na área de tecnologia.',
      },
    ];
    return (
      <>
        {content &&
          content.map((item) => (
            <Box as="span" key={item.heading}>
              <Icon
                as={item.icon}
                w="2rem"
                h="2rem"
                marginBottom="1rem"
                color="purple.500"
              />
              <Heading size="sm" marginBottom="1rem">
                {item.heading}
              </Heading>
              <Text color={'gray.500'}>{item.text}</Text>
            </Box>
          ))}
      </>
    );
  };

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      p="1rem"
      mt="3rem"
      borderTop="0.25rem solid"
      borderColor="purple.500"
    >
      <SimpleGrid
        minChildWidth="9rem"
        spacing="3rem"
        textAlign="center"
        margin="5rem"
      >
        {ColumnSection()}
      </SimpleGrid>
    </Box>
  );
};

export default HowItWorksSection;
