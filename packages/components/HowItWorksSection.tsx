import React from 'react';
import { Box, useColorModeValue, Text, Heading } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import {
  CodeIcon,
  BriefcaseIcon,
  ConversationIcon,
} from '@packages/components/icons';

const HowItWorksSection = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      p="1rem"
      mt="3rem"
      borderTop="5px solid"
      borderColor="purple.500"
    >
      <SimpleGrid
        minChildWidth="150px"
        spacing="50px"
        textAlign="center"
        margin={20}
      >
        <Text as="span">
          <ConversationIcon
            w={10}
            h={10}
            marginBottom="1rem"
            color="purple.500"
          />
          <Heading size="sm" marginBottom="1rem">
            Participe da comunidade
          </Heading>
          <Text color={'gray.500'}>
            Parcicipe de meetups semanais com diversos outros profissionais da
            área de tecnologia e expanda seus conhecimentos.
          </Text>
        </Text>
        <Text as="span">
          <CodeIcon w={10} h={10} marginBottom="1rem" color="purple.500" />
          <Heading size="sm" marginBottom="1rem">
            Aprenda a programar
          </Heading>
          <Text color={'gray.500'}>
            Aprenda a programar de uma forma dinâmica através do
            compartilhamento de conhecimento e participe de nossas mentorias
            pesonalizadas ou em grupo.
          </Text>
        </Text>
        <Text as="span">
          <BriefcaseIcon w={10} h={10} marginBottom="1rem" color="purple.500" />

          <Heading size="sm" marginBottom="1rem">
            Entre no mercado de trabalho
          </Heading>
          <Text color={'gray.500'}>
            Prepare-se para o mercado através de simulações de entrevistas com
            profissionais já consolidados na área de tecnologia.
          </Text>
        </Text>
      </SimpleGrid>
    </Box>
  );
};

export default HowItWorksSection;
